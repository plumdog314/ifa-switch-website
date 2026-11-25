// 記事の最後に出す、次の一歩の案内。記事のカテゴリに合わせて中身を変える。
// ・手続き／IFAの記事 → 手続きの代行（スポット）とサポートプラン
// ・それ以外 → AIチャットとライトプラン（手続きガイド・英語の手紙のひな形）
import { ArrowRight } from "lucide-react";
import TrackedLink from "@/components/TrackedLink";
import { PLANS, SPOTS, yen } from "@/lib/plans";

const PROCEDURE_CATEGORIES = new Set(["procedures", "ifa"]);

export default function ArticleCta({ category }: { category: string }) {
  const procedure = PROCEDURE_CATEGORIES.has(category);
  const lite = PLANS.find((p) => p.id === "lite");
  const support = PLANS.find((p) => p.id === "support");
  const minSpot = Math.min(...SPOTS.map((s) => s.price));
  // Pro プランのカスタムイベントはプロパティ2つまで。どのページで押されたかは Vercel 側で記録される
  const ev = (target: string) => ({ from: `article/${category}`, target });

  const primary = "flex items-center justify-between gap-3 bg-ink text-paper px-5 py-3.5 text-sm font-bold hover:bg-primary transition-colors";
  const secondary = "flex items-center justify-between gap-3 border border-ink px-5 py-3.5 text-sm font-bold hover:bg-paper-2 transition-colors";

  return (
    <aside aria-labelledby="article-cta" className="mt-14 border-t-4 border-ink border-b border-border bg-paper-2 px-5 py-8 sm:px-8">
      {procedure ? (
        <>
          <p className="text-sm font-bold text-primary">英語の手続きに困ったら</p>
          <h2 id="article-cta" className="mt-2 font-display font-extrabold text-2xl leading-snug">
            その手続き、英文のやりとりから一緒に進めます。
          </h2>
          <p className="mt-3 text-[15px] leading-loose text-text-light">
            保険会社への英文の書類づくりや問い合わせを、担当者がお手伝いします。1回ごとのご依頼は{yen(minSpot)}から。何度も相談したい方は、月{yen(support?.price.monthly ?? 0)}のサポートプランなら手続きが30%引きになります。
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrackedLink href="/pricing#spot" event="cta_click" data={ev("spot")} className={primary}>
              <span className="whitespace-nowrap">料金と依頼方法を見る</span>
              <ArrowRight size={16} />
            </TrackedLink>
            <TrackedLink href="/contact" event="cta_click" data={ev("contact")} className={secondary}>
              <span className="whitespace-nowrap">まず無料で相談する</span>
              <ArrowRight size={16} />
            </TrackedLink>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm font-bold text-primary">自分の場合はどうなる？</p>
          <h2 id="article-cta" className="mt-2 font-display font-extrabold text-2xl leading-snug">
            ご自身のケースは、AIチャットに聞いてみてください。
          </h2>
          <p className="mt-3 text-[15px] leading-loose text-text-light">
            海外積み立ての仕組みや手続きの流れを答えます。無料で1日20問まで。手続きガイドと英語の手紙のひな形まで使えるライトプランは、月{yen(lite?.price.monthly ?? 0)}です。
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <TrackedLink href="/chat" event="cta_click" data={ev("chat")} className={primary}>
              <span className="whitespace-nowrap">AIチャットで聞く</span>
              <ArrowRight size={16} />
            </TrackedLink>
            <TrackedLink href="/pricing" event="cta_click" data={ev("pricing")} className={secondary}>
              <span className="whitespace-nowrap">ライトプランを見る</span>
              <ArrowRight size={16} />
            </TrackedLink>
          </div>
        </>
      )}
    </aside>
  );
}
