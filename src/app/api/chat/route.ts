import Anthropic from "@anthropic-ai/sdk";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-prompt";
import { memberFromCookieHeader } from "@/lib/member-auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = "claude-sonnet-5-5"; // コスト優先。有料会員向けに品質を上げるなら claude-opus-5-5
const MAX_TURNS = 20; // 1会話で送れるメッセージ数の上限
const MAX_CHARS = 4000; // 1メッセージの文字数上限
const DAILY_LIMIT = 20; // IPごとの1日の質問数（インスタンス単位のベストエフォート）
const MEMBER_DAILY_LIMIT = 50; // ライトプラン会員（有効な会員クッキーあり）の1日の質問数

type ChatMessage = { role: "user" | "assistant"; content: string };

// 簡易レート制限。サーバーレスのインスタンスごとに別カウントなので厳密ではない。
// 会員機能を入れる際に、ユーザー単位の制限（KVやDB）に置き換える。
const hits = new Map<string, { day: string; count: number }>();
function overLimit(key: string, limit: number): boolean {
  const day = new Date().toISOString().slice(0, 10);
  const h = hits.get(key);
  if (!h || h.day !== day) {
    hits.set(key, { day, count: 1 });
    return false;
  }
  h.count += 1;
  return h.count > limit;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_TURNS) return null;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS) return null;
    out.push({ role, content: text });
  }
  if (out[0].role !== "user" || out[out.length - 1].role !== "user") return null;
  return out;
}

const plain = (msg: string, status: number) =>
  new Response(msg, { status, headers: { "Content-Type": "text/plain; charset=utf-8" } });

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return plain("AIチャットは現在準備中です。しばらくしてからお試しください。", 503);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  // 会員は顧客IDごと、それ以外はIPごとに数える
  const member = memberFromCookieHeader(req.headers.get("cookie"));
  const limited = member
    ? overLimit(`member:${member.customerId}`, MEMBER_DAILY_LIMIT)
    : overLimit(`ip:${ip}`, DAILY_LIMIT);
  if (limited) {
    return plain("本日の利用上限に達しました。明日またお試しください。", 429);
  }

  let messages: ChatMessage[] | null = null;
  try {
    messages = parseMessages(await req.json());
  } catch {
    messages = null;
  }
  if (!messages) {
    return plain(`メッセージの形式が正しくないか、長すぎます（1回あたり${MAX_CHARS}文字まで）。`, 400);
  }

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    system: [{ type: "text", text: CHAT_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode("\n\nこのご質問にはお答えできません。内容を変えてお試しいただくか、お問い合わせページからご相談ください。"),
          );
        } else if (final.stop_reason === "max_tokens") {
          controller.enqueue(encoder.encode("\n\n（回答が長くなったため途中で終了しました）"));
        }
      } catch (error) {
        let msg = "エラーが発生しました。時間をおいて再度お試しください。";
        if (error instanceof Anthropic.RateLimitError) {
          msg = "ただいま混み合っています。少し時間をおいて再度お試しください。";
        } else if (error instanceof Anthropic.APIError) {
          console.error("chat api error", error.status, error.message);
        } else {
          console.error("chat error", error);
        }
        controller.enqueue(encoder.encode(`\n\n${msg}`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
