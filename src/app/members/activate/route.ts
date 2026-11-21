import { NextResponse, type NextRequest } from "next/server";
import {
  MEMBER_COOKIE,
  customerFromCheckoutSession,
  memberCookieOptions,
  membersConfigured,
  signMemberSession,
} from "@/lib/member-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Stripe の Payment Link の完了後に戻ってくる先。
// 成功URL: https://www.ifa-switch.com/members/activate?session_id={CHECKOUT_SESSION_ID}
// Checkout Session を Stripe に問い合わせ、ライトプランの有効な契約なら会員クッキーを発行する。
export async function GET(req: NextRequest) {
  const to = (q: string) => {
    const res = NextResponse.redirect(new URL(`/members?${q}`, req.url), 303);
    res.headers.set("Cache-Control", "no-store");
    return res;
  };

  if (!membersConfigured()) return to("error=unavailable");

  const sessionId = req.nextUrl.searchParams.get("session_id") ?? "";
  let customerId: string | null = null;
  try {
    customerId = await customerFromCheckoutSession(sessionId);
  } catch (e) {
    console.error("member activate failed", e instanceof Error ? e.message : e);
    return to("error=stripe");
  }
  if (!customerId) return to("error=invalid");

  const res = to("welcome=1");
  res.cookies.set(MEMBER_COOKIE, signMemberSession(customerId), memberCookieOptions());
  return res;
}
