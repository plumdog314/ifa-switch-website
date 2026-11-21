import { NextResponse, type NextRequest } from "next/server";
import {
  MEMBER_COOKIE,
  hasActiveLiteSubscription,
  memberCookieOptions,
  needsReverify,
  signMemberSession,
  verifyMemberToken,
} from "@/lib/member-auth";

// 会員ページを開くたびに、会員クッキーの有効期限を延ばす（35日）。
// 最後の確認から24時間以上たっていたら、Stripe で契約がまだ有効かを確かめ直し、
// 解約済みならクッキーを消す。Stripe に一時的につながらないときは、そのまま通す。
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/members/activate") ||
    pathname.startsWith("/members/verify") ||
    pathname.startsWith("/members/logout")) {
    return NextResponse.next();
  }
  const token = req.cookies.get(MEMBER_COOKIE)?.value;
  if (!token) return NextResponse.next();

  const session = verifyMemberToken(token);
  let next: string | null = null; // null = クッキーを消す
  if (session) {
    if (needsReverify(session)) {
      try {
        next = (await hasActiveLiteSubscription(session.customerId))
          ? signMemberSession(session.customerId)
          : null;
      } catch (e) {
        console.error("member reverify failed", e instanceof Error ? e.message : e);
        next = token;
      }
    } else {
      next = signMemberSession(session.customerId, session.verifiedAt);
    }
  }

  // このリクエストで描画するページにも、更新後の状態が見えるようにする
  if (next) req.cookies.set(MEMBER_COOKIE, next);
  else req.cookies.delete(MEMBER_COOKIE);
  const res = NextResponse.next({ request: { headers: req.headers } });
  if (next) res.cookies.set(MEMBER_COOKIE, next, memberCookieOptions());
  else res.cookies.delete(MEMBER_COOKIE);
  return res;
}

export const config = {
  matcher: ["/members/:path*"],
};
