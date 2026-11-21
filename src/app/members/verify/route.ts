import { NextResponse, type NextRequest } from "next/server";
import {
  MEMBER_COOKIE,
  hasActiveLiteSubscription,
  memberCookieOptions,
  membersConfigured,
  signMemberSession,
  verifyLoginToken,
} from "@/lib/member-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// メールで送ったログイン用リンクの行き先。
// リンクが正しく期限内で、ライトプランの契約がまだ有効なら、この端末をログイン状態にする。
export async function GET(req: NextRequest) {
  const to = (path: string) => {
    const res = NextResponse.redirect(new URL(path, req.url), 303);
    res.headers.set("Cache-Control", "no-store");
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  };

  if (!membersConfigured()) return to("/members?error=unavailable");

  const customerId = verifyLoginToken(req.nextUrl.searchParams.get("token"));
  if (!customerId) return to("/members/login?error=expired");

  try {
    if (!(await hasActiveLiteSubscription(customerId))) return to("/members?error=invalid");
  } catch (e) {
    console.error("member verify failed", e instanceof Error ? e.message : e);
    return to("/members?error=stripe");
  }

  const res = to("/members?welcome=login");
  res.cookies.set(MEMBER_COOKIE, signMemberSession(customerId), memberCookieOptions());
  return res;
}
