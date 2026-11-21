import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ChatClient from "@/components/ChatClient";

export const metadata: Metadata = {
  title: "AIチャット｜海外積み立て投資のポートフォリオ見える化",
  description:
    "RL360・ハンサード・インベスターズトラストなど海外積み立て投資の保有ファンドを、AIが整理して偏りや費用の考え方を解説します。各種手続きの流れもすぐに確認できます。",
  alternates: { canonical: "/chat" },
};

export default function ChatPage() {
  return (
    <>
      <PageHero
        tag="AI CHAT"
        title="ポートフォリオ見える化AIチャット"
        description="保有しているファンドと配分を書くだけで、AIが構成や偏りを整理して解説します。手続きの疑問にもお答えします。"
        illustration="faq"
      />
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 leading-relaxed">
            <p className="font-bold mb-1">ご利用にあたって</p>
            <ul className="list-disc list-inside space-y-1">
              <li>このAIは一般的な情報と手続きの案内を行います。特定のファンドの売買・乗り換え・配分・解約をお勧めすることはありません（投資助言・税務相談ではありません）。</li>
              <li>証券番号・パスワード・カード番号などの個人情報は入力しないでください。</li>
              <li>AIの回答には誤りが含まれる場合があります。手数料や規定は、最新の契約書類または保険会社の窓口でご確認ください。</li>
              <li>
                個別のアドバイスをご希望の方は、
                <Link href="/contact" className="underline">お問い合わせ</Link>
                から、提携するライセンス保有アドバイザーをご案内します。
              </li>
            </ul>
          </div>
          <ChatClient />
        </div>
      </section>
    </>
  );
}
