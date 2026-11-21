// Server Component から会員かどうかを調べる。
import { cookies } from "next/headers";
import { MEMBER_COOKIE, verifyMemberToken, type MemberSession } from "./member-auth";

export async function getCurrentMember(): Promise<MemberSession | null> {
  const jar = await cookies();
  return verifyMemberToken(jar.get(MEMBER_COOKIE)?.value);
}
