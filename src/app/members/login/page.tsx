import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LOGIN_LINK_MINUTES, findLiteCustomerByEmail, membersConfigured, signLoginToken } from "@/lib/member-auth";
import { memberMailConfigured, sendLoginLinkEmail } from "@/lib/member-mail";
import { getCurrentMember } from "@/lib/member-session";
import { SITE } from "@/lib/site";

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
      const url = `${SITE.url}/members/verify?token=${encodeURIComponent(signLoginToken(customerId))}`;
      await sendLoginLinkEmail(email, url);
    }
  } catch (e) {
    console.error("member login link failed", e instanceof Error ? e.message : e);
  }
  // 登録の有無が他人に分からないよう、結果にかかわらず同じ案内を出す
  redirect("/members/login?sent=1");
}

export default async function MemberLoginPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;
  const member = await getCurrentMember();
  const configured = membersConfigured() && memberMailConfigured();

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
          ご入力のメールアドレスがライトプランにご登録のものであれば、ログイン用リンクをお送りしました。メールのリンクを、ログインしたい端末で開いてください。リンクの有効期限は{LOGIN_LINK_MINUTES}分です。
          <br />
          数分たっても届かない場合は、迷惑メールのフォルダもご確認ください。それでも届かないときは ifa.switch@gmail.com までご連絡ください。
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
          {error === "expired" && (
            <p role="alert" className="mt-2 text-sm text-primary">
              ログイン用リンクの有効期限が切れているか、リンクが正しくありません。もう一度メールアドレスを入力してください。
            </p>
          )}
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
