"use client";

import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import { track } from "@vercel/analytics";
import { Send, Sparkles, RotateCcw } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const EXAMPLES = [
  "RL360クォンタムを月500ドルで15年積み立てています。ファンドは米国株式ファンド60%、新興国株式ファンド30%、債券ファンド10%です。今の構成を整理して、偏りを教えてください。",
  "株価が大きく下がっていて不安です。積み立てを続けるか考えるときに、どんな点を確認すればいいですか？",
  "ハンサードのクレジットカード情報を更新したいです。一般的な手続きの流れを教えてください。",
];

const render = (text: string) =>
  marked.parse(text.replace(/</g, "&lt;"), { async: false, breaks: true }) as string;

export default function ChatClient() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (res.status === 429) track("chat_limit_reached");
      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (!acc) setMessages([...next, { role: "assistant", content: "回答を取得できませんでした。" }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "通信エラーが発生しました。時間をおいて再度お試しください。" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {messages.length === 0 && (
        <div className="rounded-2xl border border-border bg-bg-gray p-6">
          <p className="font-bold text-text mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            こんな質問ができます
          </p>
          <div className="flex flex-col gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => send(ex)}
                className="text-left text-sm text-text-light bg-white border border-border rounded-xl px-4 py-3 hover:border-primary hover:text-primary transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((m, i) =>
        m.role === "user" ? (
          <div key={i} className="self-end max-w-[85%] bg-primary text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm whitespace-pre-wrap">
            {m.content}
          </div>
        ) : (
          <div key={i} className="self-start max-w-full w-full bg-white border border-border rounded-2xl rounded-bl-sm px-5 py-4">
            {m.content ? (
              <div
                onClick={(e) => {
                  const a = (e.target as HTMLElement).closest("a");
                  if (a?.getAttribute("href")?.startsWith("/pricing")) {
                    track("cta_click", { from: "chat", target: "pricing" });
                  }
                }}
                className="prose prose-sm prose-slate max-w-none prose-table:text-xs"
                dangerouslySetInnerHTML={{ __html: render(m.content) }}
              />
            ) : (
              <p className="text-sm text-text-light animate-pulse">考えています…</p>
            )}
          </div>
        )
      )}
      <div ref={bottomRef} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-4 bg-white border border-border rounded-2xl shadow-sm p-3 flex gap-2 items-end"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={3}
          maxLength={4000}
          placeholder="例：保有しているプラン名、ファンド名と配分（％）、積立額や経過年数などを書いてください。証券番号やパスワードは書かないでください。"
          className="flex-1 resize-none text-sm outline-none px-2 py-1"
        />
        <div className="flex flex-col gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => setMessages([])}
              disabled={loading}
              aria-label="会話をリセット"
              className="p-2 rounded-full text-text-light hover:text-primary disabled:opacity-40"
            >
              <RotateCcw size={18} />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="送信"
            className="p-3 rounded-full bg-primary text-white hover:bg-primary-dark disabled:opacity-40 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
