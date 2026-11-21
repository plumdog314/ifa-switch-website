import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { findLiteCustomerByEmail, membersConfigured } from "@/lib/member-auth";
import { getCurrentMember } from "@/lib/member-session";

export const metadata: Metadata = {
  title: "会員ログイン",
};

type Props = { searchParams: Promise<{ sent?: string; error?: string }> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requestLogin(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) redirect("/members/login?error=email");

  try {
    const customerId = await findLiteCustomerByEmail(email);
    if (customerId) {
      // TODO(magic-link): ここでワンタイムのログインリンクをメールで送る。
      //   1) customerId と有効期限（15分程度）を HMAC で署名したトークンを作る（member-auth の仕組みを流用できる）
      //   2) https://www.ifa-switch.com/members/verify?token=... をメール送信サービスで送る
      //   3) /members/verify でトークンを検証し、会員クッキーを発行して /members へ
      // メールアドレスの入力だけでログインさせると、他人になりすませてしまうので、そうしないこと。
    }
  } catch (e) {
    console.error("member login lookup failed", e instanceof Error ? e.message : e);
  }
  // 登録の有無が他人に分からないよう、結果にかかわらず同じ案内を出す
  redirect("/members/login?sent=1");
}

export default async function MemberLoginPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;
  const member = await getCurrentMember();
  const configured = membersConfigured();

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <p className="text-sm font-bold text-primary">会員ログイン</p>
      <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">別の端末でログインする</h1>
      <p className="mt-4 text-[15px] leading-loose text-text-light">
        ライトプランにお申し込みいただいた端末では、お支払いの完了後に自動でログインしています。別のパソコンやスマートフォンでお使いになる場合は、お申し込みのときのメールアドレスを入力してください。
      </p>

      {member && (
        <p className="mt-8 border-t border-ink border-b border-border py-4 text-[15px] leading-relaxed">
          この端末ではすでにログインしています。
          <Link href="/members" className="ml-2 font-bold text-primary hover:underline whitespace-nowrap">会員ページへ →</Link>
        </p>
      )}

      {sent ? (
        <p role="status" className="mt-8 border-t border-ink border-b border-border py-5 text-[15px] leading-loose">
          ご登録のメールアドレス宛にログイン用リンクを送る機能は準備中です。お手数ですが ifa.switch@gmail.com までご連絡ください。
        </p>
      ) : !configured ? (
        <p className="mt-8 border-t border-ink border-b border-border py-5 text-[15px] leading-loose">
          準備中：会員ログインは現在準備しています。お手数ですが ifa.switch@gmail.com までご連絡ください。
        </p>
      ) : (
        <form action={requestLogin} className="mt-8 border-t border-ink pt-6">
          <label htmlFor="email" className="block text-sm font-bold">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            className="mt-2 w-full border border-ink bg-paper px-4 py-3 text-base"
          />
          {error === "email" && (
            <p role="alert" className="mt-2 text-sm text-primary">メールアドレスの形式をご確認ください。</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full sm:w-auto border border-ink px-6 py-3 text-sm font-bold hover:bg-ink hover:text-paper transition-colors"
          >
            <span className="whitespace-nowrap">ログイン用リンクを受け取る</span>
          </button>
        </form>
      )}

      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
        <Link href="/members" className="text-primary hover:underline whitespace-nowrap">会員ページに戻る →</Link>
        <Link href="/pricing" className="text-primary hover:underline whitespace-nowrap">料金プランを見る →</Link>
      </div>
    </section>
  );
}
