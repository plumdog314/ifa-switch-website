import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, MessageSquare, Mail, FileCheck2, Users } from "lucide-react";
import { getAllPosts, getPost, formatDateJa } from "@/lib/blog";
import { PLANS, SPOTS, yen } from "@/lib/plans";
import NewsletterForm from "@/components/NewsletterForm";
import TroubleChoice from "@/components/home-consult/TroubleChoice";

export const revalidate = 3600;

// このページだけの配色（相談窓口のような、落ち着いた深い緑）。globals.css は変えない。
const PALETTE = {
  "--cg": "oklch(42% 0.075 165)",
  "--cg-dark": "oklch(34% 0.065 165)",
  "--cg-soft": "oklch(95.5% 0.02 165)",
  "--cg-off": "oklch(98% 0.006 150)",
  "--cg-line": "oklch(89% 0.015 160)",
  "--cg-ink": "oklch(24% 0.015 200)",
  "--cg-muted": "oklch(45% 0.015 200)",
} as CSSProperties;

type SpotKind = "spot-basic" | "spot-complex";

// 相談で多いお困りごと → 答えになる記事。判断（解約するか等）ではなく、情報と手続きの案内にとどめる。
const TROUBLES: { label: string; hint: string; answer: string; slugs: string[]; spot?: SpotKind }[] = [
  {
    label: "解約したい・やめたい",
    hint: "解約のほかに、どんな選び方があるか知りたい",
    answer: "「やめる」には解約だけでなく、減額や一時停止などいくつかの形があります。それぞれの違いと、解約する前に確認しておきたいことをまとめています。",
    slugs: ["want-to-quit-options", "before-surrender"],
    spot: "spot-complex",
  },
  {
    label: "IFAと連絡が取れない",
    hint: "紹介者や担当IFAから返事がこない",
    answer: "担当者と連絡が取れなくても、契約は保険会社との間で続いています。まず確認することと、担当IFAを変える手順をご案内しています。",
    slugs: ["lost-contact-with-ifa", "how-to-change-ifa"],
    spot: "spot-complex",
  },
  {
    label: "暴落が不安で迷う",
    hint: "相場が下がって、続けるかどうか落ち着かない",
    answer: "相場が下がったときに積み立てがどう動くのか、考え方を整理した記事です。続けるかどうかの判断はご自身で、または有資格のアドバイザーとご検討ください。",
    slugs: ["stop-saving-in-crash", "dollar-cost-averaging-crash"],
  },
  {
    label: "減額・一時停止したい",
    hint: "毎月の積立額を減らしたい、しばらく止めたい",
    answer: "減額と一時停止は、できる条件や手続きが異なります。それぞれの流れと注意点をまとめています。",
    slugs: ["reduce-contributions", "pause-contributions"],
    spot: "spot-complex",
  },
  {
    label: "担当IFAを変えたい",
    hint: "今の担当者から別の担当者へ移りたい",
    answer: "担当IFAの変更は、保険会社へ書類を出して行います。必要な書類と流れをご案内しています。",
    slugs: ["how-to-change-ifa"],
    spot: "spot-complex",
  },
  {
    label: "住所・カードの変更",
    hint: "引っ越した、クレジットカードが新しくなった",
    answer: "住所やカードが変わったら、保険会社への届け出が必要です。英文での届け出の書き方をまとめています。",
    slugs: ["change-of-address", "update-credit-card"],
    spot: "spot-basic",
  },
  {
    label: "満期・引き出し",
    hint: "満期が近い、一部だけ引き出したい",
    answer: "満期の受け取りや一部引き出しには、保険会社への申請が必要です。受け取りまでの流れをご案内しています。",
    slugs: ["maturity-payout", "partial-withdrawal"],
    spot: "spot-complex",
  },
  {
    label: "税金・確定申告",
    hint: "解約や満期で受け取ったお金の税金が気になる",
    answer: "受け取ったお金にかかる税金と、確定申告の基本をまとめています。個別の申告内容は、税理士や税務署にご確認ください。",
    slugs: ["tax-on-surrender", "tax-loss-on-surrender"],
  },
];

export default function Home() {
  const posts = getAllPosts();
  const market = posts.find((p) => p.category === "market");
  const spots = Object.fromEntries(SPOTS.map((s) => [s.id, s]));
  const minSpot = Math.min(...SPOTS.map((s) => s.price));
  const plan = Object.fromEntries(PLANS.map((p) => [p.id, p]));
  const litePrice = plan.lite?.price.monthly;
  const supportPrice = plan.support?.price.monthly;
  const articleCount = posts.length >= 100 ? "100本以上" : `${posts.length}本`;

  const troubles = TROUBLES.map((t) => {
    const articles = t.slugs
      .map((s) => getPost(s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .slice(0, 3)
      .map((p) => ({ slug: p.slug, title: p.title }));
    const s = t.spot ? spots[t.spot] : undefined;
    return {
      ...t,
      articles,
      spot: s ? { name: "スポット手続き", price: yen(s.price) } : undefined,
    };
  }).filter((t) => t.articles.length > 0);

  return (
    <div
      style={PALETTE}
      className="bg-[var(--cg-off)] text-[var(--cg-ink)] [&_:focus-visible]:outline-[var(--cg)]"
    >
      {/* 1. 相談窓口：いま何に困っていますか？ */}
      <section className="border-b border-[var(--cg-line)] bg-white">
        <div className="mx-auto max-w-3xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
          <p className="text-sm font-bold text-[var(--cg)]">海外積み立ての相談窓口</p>
          <h1 className="mt-3 font-display text-[1.4rem] font-extrabold leading-[1.5] min-[360px]:text-[1.6rem] sm:text-4xl sm:leading-[1.4]">
            海外積み立てで、
            <br />
            いま何に困っていますか？
          </h1>
          <p className="mt-4 text-[15px] leading-loose text-[var(--cg-muted)] sm:text-base">
            当てはまるものを押すと、答えになる記事が開きます。RL360・ハンサード・インベスターズトラストなどの契約について、手続きと考え方を日本語でまとめています。
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {troubles.map((t) => (
              <TroubleChoice
                key={t.label}
                label={t.label}
                hint={t.hint}
                answer={t.answer}
                articles={t.articles}
                spot={t.spot}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-xl bg-[var(--cg-soft)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-[15px] leading-relaxed">当てはまるものがないときは</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--cg)] px-5 py-2.5 text-sm font-bold text-white hover:bg-[var(--cg-dark)]"
              >
                AIチャットで聞く <ArrowRight size={14} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--cg)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--cg)] hover:bg-[var(--cg-off)]"
              >
                記事を探す
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IFAスイッチのお手伝い */}
      <section className="border-b border-[var(--cg-line)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="font-display text-2xl font-extrabold leading-snug sm:text-3xl">IFAスイッチのお手伝い</h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-loose text-[var(--cg-muted)]">
            まずは無料の記事とAIチャットで状況を整理し、必要なときだけ人の手を借りる、という使い方ができます。商品やファンドのおすすめ、解約するかどうかの判断はお伝えしていません。
          </p>

          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[repeat(3,minmax(0,1fr))]">
            <li className="flex min-w-0 flex-col rounded-xl border border-[var(--cg-line)] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-[var(--cg)]">
                <BookOpen size={18} /> 無料
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug">記事とAIチャット</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--cg-muted)]">
                解説記事は{articleCount}。AIチャットでは、保有ファンドの整理や手続きの疑問にその場で答えます。
              </p>
              <Link href="/chat" className="mt-5 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--cg)] hover:underline">
                AIチャットを使う <ArrowRight size={14} />
              </Link>
            </li>
            <li className="flex min-w-0 flex-col rounded-xl border border-[var(--cg-line)] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-[var(--cg)]">
                <FileCheck2 size={18} />
                <span className="whitespace-nowrap">ライトプラン{litePrice != null && ` 月${yen(litePrice)}`}</span>
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug">自分で手続きを進める</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--cg-muted)]">
                保険会社別の詳しい手続きガイドと、英文レターのひな形が使えます。
              </p>
              <Link href="/pricing" className="mt-5 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--cg)] hover:underline">
                プランを見る <ArrowRight size={14} />
              </Link>
            </li>
            <li className="flex min-w-0 flex-col rounded-xl border border-[var(--cg)] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-[var(--cg)]">
                <Users size={18} />
                <span className="whitespace-nowrap">サポートプラン{supportPrice != null && ` 月${yen(supportPrice)}`}</span>
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug">人に相談しながら進める</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--cg-muted)]">
                担当者がメールで回答し、保険会社から届いた英文の書類を翻訳・解説します。1回だけ頼みたいときは、スポット手続き（{yen(minSpot)}から）もあります。
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                <Link href="/pricing" className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--cg)] hover:underline">
                  プランを見る <ArrowRight size={14} />
                </Link>
                <Link href="/pricing#spot" className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--cg)] hover:underline">
                  スポット手続き <ArrowRight size={14} />
                </Link>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 3. 今日の市況（小さく）＋ニュースレター */}
      <section className="border-b border-[var(--cg-line)] bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          {market && (
            <article className="min-w-0">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-bold text-[var(--cg)]">今日の市況</span>
                <time dateTime={market.date} className="tabular text-[var(--cg-muted)]">
                  {formatDateJa(market.date)}
                </time>
              </p>
              <h2 className="mt-3 text-xl font-bold leading-relaxed [overflow-wrap:anywhere]">
                <Link href={`/blog/${market.slug}`} className="hover:text-[var(--cg)] hover:underline">
                  {market.title}
                </Link>
              </h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--cg-muted)]">{market.description}</p>
              <Link
                href="/blog/category/market"
                className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--cg)] hover:underline"
              >
                市況の記事をもっと見る <ArrowRight size={14} />
              </Link>
            </article>
          )}

          <div className="min-w-0 rounded-xl bg-[var(--cg-off)] p-6 sm:p-7">
            <p className="flex items-center gap-2 text-sm font-bold text-[var(--cg)]">
              <Mail size={18} /> ニュースレター（無料）
            </p>
            <h2 className="mt-3 text-xl font-bold leading-relaxed">毎週土曜の朝、1週間の市況をメールで</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--cg-muted)]">
              相場の動きと新しい記事をまとめてお届けします。いつでも解除できます。
            </p>
            <div className="mt-5">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* 4. ご相談 */}
      <section>
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <MessageSquare size={28} className="mx-auto text-[var(--cg)]" aria-hidden />
          <h2 className="mt-4 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            どこから手をつけるか、
            <br />
            一緒に整理しましょう。
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-loose text-[var(--cg-muted)]">
            英語の書類や手続きで迷っていることを、日本語でお書きください。初回のご相談はメールで無料です。
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--cg)] px-7 py-3.5 text-[15px] font-bold text-white hover:bg-[var(--cg-dark)]"
          >
            メールで相談する <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <p className="mx-auto max-w-6xl px-4 pb-8 text-xs leading-relaxed text-[var(--cg-muted)] sm:px-6">
        ※当サイトの情報は一般的な情報提供を目的としたもので、特定の金融商品の勧誘や個別の投資助言を行うものではありません。個別のアドバイスをご希望の方には、提携するライセンス保有アドバイザーをご案内します。
      </p>
    </div>
  );
}
