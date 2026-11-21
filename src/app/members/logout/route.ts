import { NextResponse, type NextRequest } from "next/server";
import { MEMBER_COOKIE } from "@/lib/member-auth";

export const dynamic = "force-dynamic";

// この端末の会員クッキーを消す（契約そのものは変わらない）
export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/members?logout=1", req.url), 303);
  res.cookies.delete(MEMBER_COOKIE);
  return res;
}
