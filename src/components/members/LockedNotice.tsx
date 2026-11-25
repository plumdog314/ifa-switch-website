import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLANS, yen } from "@/lib/plans";

// 会員でない人に見せる案内。ライトプランがまだ申し込めない間は「準備中」と出す。
export default function LockedNotice({ configured, compact = false }: { configured: boolean; compact?: boolean }) {
  const lite = PLANS.find((p) => p.id === "lite");
  const open = configured && lite?.status === "available";

  return (
    <div className="border-t border-ink border-b border-border py-6 sm:py-8">
      <p className="text-sm font-bold text-primary">ライトプラン会員向け</p>
      <p className="mt-2 font-display font-extrabold text-xl sm:text-2xl leading-snug">
        {compact ? "本文はライトプランの会員の方がお読みいただけます。" : "ガイドとひな形の本文は、会員の方がお読みいただけます。"}
      </p>
      {lite?.price.monthly != null && lite.price.yearly != null && (
        <p className="mt-3 text-[15px] leading-loose text-text-light">
          ライトプランは月額<span className="tabular">{yen(lite.price.monthly)}</span>、年額
          <span className="tabular">{yen(lite.price.yearly)}</span>（税込）です。手続きガイドと英語の手紙のひな形をすべて読めるほか、AIチャットを会員枠でお使いいただけます。
        </p>
      )}
      {!open && (
        <p className="mt-3 text-sm leading-relaxed text-text-light">
          準備中：ライトプランは現在お申し込みの準備をしています。公開したらメールでお知らせします。
        </p>
      )}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link
          href="/pricing"
          className="flex items-center justify-between gap-3 border border-ink px-5 py-3 text-sm font-bold hover:bg-ink hover:text-paper transition-colors"
        >
          <span className="whitespace-nowrap">料金プランを見る</span>
          <ArrowRight size={16} />
        </Link>
        {configured && (
          <Link
            href="/members/login"
            className="flex items-center justify-between gap-3 border border-border px-5 py-3 text-sm font-bold hover:border-ink transition-colors"
          >
            <span className="whitespace-nowrap">会員の方はこちら</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
