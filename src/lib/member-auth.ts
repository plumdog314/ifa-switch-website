// ライトプラン会員の判定。
// ・会員かどうかは、署名付きの HttpOnly クッキー（HMAC-SHA256）で判定する。中身は Stripe の顧客ID と有効期限だけ。
// ・Stripe へは公式SDKを使わず REST API を fetch で呼ぶ。キーは読み取り専用の制限付きキーを想定。
// ・環境変数がそろっていないときは、常に「会員ではない」として扱う（ビルドも表示も止めない）。

import { createHmac, timingSafeEqual } from "node:crypto";

export const MEMBER_COOKIE = "ifas_member";
export const MEMBER_COOKIE_DAYS = 35;
// 最後に Stripe で契約を確認してから、この時間が過ぎたら次の訪問時に確認し直す
const REVERIFY_MS = 24 * 60 * 60 * 1000;

export type MemberSession = {
  customerId: string;
  expiresAt: number; // ms
  verifiedAt: number; // ms（最後に Stripe で有効な契約を確認した時刻）
};

const secret = () => process.env.MEMBER_COOKIE_SECRET?.trim() || "";
const stripeKey = () => process.env.STRIPE_SECRET_KEY?.trim() || "";
export const litePriceIds = () =>
  (process.env.LITE_PRICE_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

/** 会員機能に必要な環境変数がそろっているか */
export const membersConfigured = () =>
  secret().length >= 32 && stripeKey().length > 0 && litePriceIds().length > 0;

// ---- クッキーの署名と検証 ----

const b64url = (buf: Buffer) => buf.toString("base64url");
const hmac = (data: string) => createHmac("sha256", secret()).update(data).digest();

export function signMemberSession(customerId: string, verifiedAt = Date.now()): string {
  const payload: MemberSession = {
    customerId,
    expiresAt: Date.now() + MEMBER_COOKIE_DAYS * 24 * 60 * 60 * 1000,
    verifiedAt,
  };
  const body = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${body}.${b64url(hmac(body))}`;
}

export function verifyMemberToken(token: string | undefined | null): MemberSession | null {
  if (!token || !secret()) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = hmac(body);
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as Partial<MemberSession>;
    if (typeof p.customerId !== "string" || !p.customerId.startsWith("cus_")) return null;
    if (typeof p.expiresAt !== "number" || p.expiresAt < Date.now()) return null;
    return { customerId: p.customerId, expiresAt: p.expiresAt, verifiedAt: Number(p.verifiedAt) || 0 };
  } catch {
    return null;
  }
}

export const needsReverify = (s: MemberSession) => Date.now() - s.verifiedAt > REVERIFY_MS;

/** Cookie ヘッダー文字列から会員セッションを取り出す（Route Handler 用） */
export function memberFromCookieHeader(header: string | null): MemberSession | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    if (part.slice(0, i).trim() === MEMBER_COOKIE) {
      return verifyMemberToken(decodeURIComponent(part.slice(i + 1).trim()));
    }
  }
  return null;
}

export const memberCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MEMBER_COOKIE_DAYS * 24 * 60 * 60,
});

// ---- Stripe REST API ----

type StripeList<T> = { data: T[]; has_more: boolean };
type StripePrice = { id: string };
type StripeSubscription = {
  id: string;
  status: string;
  customer: string;
  items: { data: { price: StripePrice }[] };
};
type StripeCheckoutSession = {
  id: string;
  status: string | null;
  payment_status: string;
  mode: string;
  created: number;
  customer: string | { id: string } | null;
  subscription: string | StripeSubscription | null;
};

async function stripeGet<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${stripeKey()}` },
    cache: "no-store",
  });
  if (!res.ok) {
    // 本文にはキーが含まれないが、念のためステータスだけ残す
    throw new Error(`Stripe API ${res.status} on ${path.split("?")[0]}`);
  }
  return (await res.json()) as T;
}

const ACTIVE = new Set(["active", "trialing"]);

const isLiteSubscription = (sub: StripeSubscription) => {
  const ids = litePriceIds();
  return ACTIVE.has(sub.status) && sub.items.data.some((it) => ids.includes(it.price.id));
};

/** Checkout Session がライトプランの有効な申込みなら、その顧客IDを返す */
export async function customerFromCheckoutSession(sessionId: string): Promise<string | null> {
  if (!membersConfigured() || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  const s = await stripeGet<StripeCheckoutSession>(
    `checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=subscription`,
  );
  // 決済完了から時間がたった session_id の使い回しを防ぐ（48時間まで）
  if (Date.now() / 1000 - s.created > 48 * 60 * 60) return null;
  if (s.mode !== "subscription" || s.status !== "complete") return null;
  if (s.payment_status !== "paid" && s.payment_status !== "no_payment_required") return null;
  const sub = s.subscription;
  if (!sub || typeof sub === "string" || !isLiteSubscription(sub)) return null;
  const cid = typeof s.customer === "string" ? s.customer : s.customer?.id;
  return cid ?? null;
}

/** 顧客にライトプランの有効な契約があるか */
export async function hasActiveLiteSubscription(customerId: string): Promise<boolean> {
  if (!membersConfigured()) return false;
  const subs = await stripeGet<StripeList<StripeSubscription>>(
    `subscriptions?customer=${encodeURIComponent(customerId)}&status=all&limit=20`,
  );
  return subs.data.some(isLiteSubscription);
}

/** メールアドレスから、ライトプランの有効な契約を持つ顧客IDを探す */
export async function findLiteCustomerByEmail(email: string): Promise<string | null> {
  if (!membersConfigured()) return null;
  const customers = await stripeGet<StripeList<{ id: string }>>(
    `customers?email=${encodeURIComponent(email)}&limit=10`,
  );
  for (const c of customers.data) {
    if (await hasActiveLiteSubscription(c.id)) return c.id;
  }
  return null;
}
