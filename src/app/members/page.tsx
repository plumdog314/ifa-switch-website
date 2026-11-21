import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMemberDocs, MEMBER_KINDS, type MemberKind } from "@/lib/members";
import { membersConfigured } from "@/lib/member-auth";
import { getCurrentMember } from "@/lib/member-session";
import { BILLING_PORTAL_URL } from "@/lib/plans";
import LockedNotice from "@/components/members/LockedNotice";

export const metadata: Metadata = {
  title: "会員ページ（ライトプラン）",
  description: "海外積み立て投資のよくある手続きのガイドと、保険会社に送る英文レターのひな形。",
};

type Props = { searchParams: Promise<{ welcome?: string; error?: string; logout?: string }> };

const ERRORS: Record<string, string> = {
  unavailable: "会員機能は現在準備中です。お手数ですが ifa.switch@gmail.com までご連絡ください。",
  invalid:
    "お申し込みを確認できませんでした。お支払いが完了しているのにこの表示が出る場合は、ifa.switch@gmail.com までご連絡ください。",
  stripe: "お申し込みの確認中にエラーが発生しました。時間をおいて、もう一度お試しください。",
};

export default async function MembersPage({ searchParams }: Props) {
  const { welcome, error, logout } = await searchParams;
  const member = await getCurrentMember();
  const configured = membersConfigured();

  const sections: MemberKind[] = ["guides", "letters"];

  return (
    <>
      <section className="border-b border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-sm font-bold text-primary">会員ページ</p>
          <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">
            英語の手続きを、自分で進めるために。
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-loose text-text-light">
            海外の保険会社でよくある手続きの流れと、そのまま使える英文レターのひな形をまとめています。保険会社によって書式・手順は異なりますので、最新の書式は各社のサイトまたはサポート窓口でご確認ください。
          </p>

          {welcome && member && (
            <p className="mt-8 border-t border-ink border-b border-border py-4 text-[15px] leading-relaxed">
              ご登録ありがとうございます。この端末でログインしました。35日間アクセスがないとログアウトします。
            </p>
          )}
          {error && ERRORS[error] && (
            <p role="alert" className="mt-8 border-t border-ink border-b border-border py-4 text-[15px] leading-relaxed">
              {ERRORS[error]}
            </p>
          )}
          {logout && !member && (
            <p className="mt-8 border-t border-ink border-b border-border py-4 text-[15px] leading-relaxed">
              ログアウトしました。
            </p>
          )}

          <div className="mt-10">
            {member ? (
              <div className="border-t border-ink border-b border-border py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-[15px]">
                  <span className="font-bold">ライトプランでログイン中</span>
                  <span className="ml-2 text-sm text-text-light">AIチャットは1日50問までお使いいただけます。</span>
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
                  <Link href="/chat" className="text-primary hover:underline whitespace-nowrap">AIチャットを使う →</Link>
                  {BILLING_PORTAL_URL && (
                    <a href={BILLING_PORTAL_URL} className="text-primary hover:underline whitespace-nowrap">契約内容の確認・解約 →</a>
                  )}
                  <form action="/members/logout" method="post">
                    <button type="submit" className="text-text-light hover:text-ink whitespace-nowrap">ログアウト</button>
                  </form>
                </div>
              </div>
            ) : (
              <LockedNotice configured={configured} />
            )}
          </div>
        </div>
      </section>

      {sections.map((kind) => {
        const docs = getMemberDocs(kind);
        const info = MEMBER_KINDS[kind];
        return (
          <section key={kind} id={kind} className="border-b border-border scroll-mt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl">{info.name}</h2>
                <p className="text-sm text-text-light tabular">{docs.length}本</p>
              </div>
              <p className="mt-2 text-sm text-text-light leading-relaxed">{info.lead}</p>
              <ul className="mt-8 border-t border-ink">
                {docs.map((d, i) => (
                  <li key={d.slug} className="border-b border-border">
                    <Link
                      href={`/members/${kind}/${d.slug}`}
                      className="group grid grid-cols-[2rem_1fr_auto] md:grid-cols-12 gap-x-4 gap-y-1 py-5 items-baseline"
                    >
                      <span className="tabular text-sm text-text-light md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 md:col-span-10">
                        <span className="block font-bold text-lg leading-snug group-hover:text-primary transition-colors">{d.title}</span>
                        <span className="block mt-1 text-sm text-text-light leading-relaxed">{d.description}</span>
                      </span>
                      <ArrowRight size={16} className="md:col-span-1 justify-self-end text-text-light group-hover:text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs text-text-light leading-relaxed">
            ※会員ページの内容は一般的な情報提供を目的としたもので、特定の金融商品の売買を推奨するものではありません。解約・減額・乗り換えなどの判断は、ご自身で、必要に応じて専門家にご相談のうえ行ってください。
          </p>
        </div>
      </section>
    </>
  );
}
