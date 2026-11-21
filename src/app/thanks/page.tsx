import type { Metadata } from "next";
import Link from "next/link";
import { BILLING_PORTAL_URL } from "@/lib/plans";

export const metadata: Metadata = {
  title: "お申し込みありがとうございました",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <div className="bg-paper text-ink">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <p className="text-sm font-bold text-primary">お申し込み完了</p>
        <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">
          お申し込みありがとうございました。
        </h1>
        <div className="mt-6 text-[15px] leading-loose text-text-light space-y-4">
          <p>お支払いの確認メールを、ご入力のメールアドレスにお送りしました。</p>
          <p>
            2営業日以内に、担当者（ifa.switch@gmail.com）からご連絡します。ご契約中のプラン名と保険会社名、お困りの手続きを簡単にお書き添えいただくと、スムーズにご案内できます。
          </p>
          <p>証券番号やパスワードなどは、メールの本文に書かずにお待ちください。安全な送り方を別途ご案内します。</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
          <Link href="/" className="text-primary hover:underline">トップに戻る →</Link>
          <Link href="/chat" className="text-primary hover:underline">AIチャットを使う →</Link>
          {BILLING_PORTAL_URL && (
            <a href={BILLING_PORTAL_URL} className="text-primary hover:underline">契約内容を確認する →</a>
          )}
        </div>
      </section>
    </div>
  );
}
