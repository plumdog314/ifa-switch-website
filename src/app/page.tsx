import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, formatDateJa } from "@/lib/blog";
import { categories } from "@/lib/categories";
import { PLANS, SPOTS, yen } from "@/lib/plans";
import NewsletterForm from "@/components/NewsletterForm";
import AskBox from "@/components/home-chat/AskBox";

export const revalidate = 3600;

// このページだけの配色。globals.css やヘッダー・フッターには影響させない。
const palette = {
  "--hc-bg": "oklch(99% 0.002 250)",
  "--hc-bg-soft": "oklch(97.5% 0.004 250)",
  "--hc-ink": "oklch(24% 0.012 250)",
  "--hc-ink-soft": "oklch(36% 0.012 250)",
  "--hc-muted": "oklch(52% 0.01 250)",
  "--hc-line": "oklch(91.5% 0.005 250)",
  "--hc-line-strong": "oklch(85% 0.008 250)",
  "--hc-accent": "oklch(48% 0.075 195)",
  "--hc-accent-dark": "oklch(40% 0.07 195)",
  "--hc-accent-ring": "oklch(48% 0.075 195 / 0.14)",
} as CSSProperties;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hc-accent)] rounded-sm";

export default function Home() {
  const posts = getAllPosts();
  const market = posts.find((p) => p.category === "market");
  const topCategories = categories
    .filter((c) => c.slug !== "market")
    .map((c) => ({ ...c, count: posts.filter((p) => p.category === c.slug).length }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 無料枠の問数は plans.ts の表記（「AIチャット（1日20問まで）」）から読む
  const free = PLANS.find((p) => p.id === "free");
  const limitMatch = free?.includes.join(" ").match(/1日(\d+)問/);
  const dailyLimit = limitMatch ? Number(limitMatch[1]) : null;

  const lite = PLANS.find((p) => p.id === "lite");
  const support = PLANS.find((p) => p.id === "support");
  const spotFrom = SPOTS.length ? Math.min(...SPOTS.map((s) => s.price)) : null;
  const helpRows = [
    lite?.price.monthly != null && { name: lite.name, price: `月${yen(lite.price.monthly)}`, lead: lite.lead },
    support?.price.monthly != null && { name: support.name, price: `月${yen(support.price.monthly)}`, lead: support.lead },
    spotFrom != null && { name: "スポット", price: `${yen(spotFrom)}〜`, lead: "1回の手続きだけ、まとめて任せたい方に" },
  ].filter(Boolean) as { name: string; price: string; lead: string }[];

  return (
    <div style={palette} className="bg-[var(--hc-bg)] font-sans text-[var(--hc-ink)]">
      {/* 1. 質問ボックス */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center pb-20 pt-16 sm:pb-28 sm:pt-28">
          <p className="text-xs font-bold tracking-wide text-[var(--hc-accent)]">IFAスイッチのAIチャット</p>
          <h1 className="mt-4 text-center text-[1.625rem] font-bold leading-snug tracking-tight sm:text-4xl lg:text-[2.625rem]">
            <span className="inline-block">海外積み立てのこと、</span>
            <span className="inline-block">何でも聞いてください</span>
          </h1>
          <p className="mt-4 text-center text-[15px] leading-relaxed text-[var(--hc-muted)]">
            RL360・ハンサード・インベスターズトラストなどの手続きや仕組みに、AIが日本語でお答えします。
          </p>
          <div className="mt-10 w-full">
            <AskBox dailyLimit={dailyLimit} postCount={posts.length} />
          </div>
        </div>
      </section>

      {/* 2. 3つの入口 */}
      <section className="border-t border-[var(--hc-line)] bg-[var(--hc-bg-soft)] px-4 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 py-16 sm:py-20 md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-10">
          {/* 記事から探す */}
          <div className="min-w-0">
            <h2 className="text-base font-bold">記事から探す</h2>
            <ul className="mt-4 border-t border-[var(--hc-line)]">
              {topCategories.map((c) => (
                <li key={c.slug} className="border-b border-[var(--hc-line)]">
                  <Link
                    href={`/blog/category/${c.slug}`}
                    className={`group flex items-baseline justify-between gap-3 py-3 text-sm ${focusRing}`}
                  >
                    <span className="min-w-0 text-[var(--hc-ink-soft)] group-hover:text-[var(--hc-accent-dark)]">
                      {c.name}
                    </span>
                    <span className="shrink-0 whitespace-nowrap tabular text-xs text-[var(--hc-muted)]">{c.count}本</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className={`mt-4 inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold text-[var(--hc-accent)] hover:text-[var(--hc-accent-dark)] ${focusRing}`}
            >
              すべての記事 <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          {/* 人に頼みたいとき */}
          <div className="min-w-0">
            <h2 className="text-base font-bold">人に頼みたいとき</h2>
            <ul className="mt-4 border-t border-[var(--hc-line)]">
              {helpRows.map((r) => (
                <li key={r.name} className="border-b border-[var(--hc-line)] py-3">
                  <p className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-bold text-[var(--hc-ink-soft)]">{r.name}</span>
                    <span className="shrink-0 whitespace-nowrap tabular text-xs text-[var(--hc-muted)]">{r.price}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--hc-muted)]">{r.lead}</p>
                </li>
              ))}
            </ul>
            <Link
              href="/pricing"
              className={`mt-4 inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold text-[var(--hc-accent)] hover:text-[var(--hc-accent-dark)] ${focusRing}`}
            >
              料金とプラン <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          {/* 今日の市況 */}
          {market && (
            <div className="min-w-0">
              <h2 className="text-base font-bold">毎日の市況</h2>
              <article className="mt-4 border-t border-[var(--hc-line)] pt-4">
                <time dateTime={market.date} className="tabular text-xs text-[var(--hc-muted)]">
                  {formatDateJa(market.date)}
                </time>
                <h3 className="mt-2 text-sm font-bold leading-relaxed [overflow-wrap:anywhere]">
                  <Link
                    href={`/blog/${market.slug}`}
                    className={`text-[var(--hc-ink-soft)] hover:text-[var(--hc-accent-dark)] ${focusRing}`}
                  >
                    {market.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[var(--hc-muted)]">{market.description}</p>
              </article>
              <Link
                href="/blog/category/market"
                className={`mt-4 inline-flex items-center gap-1 whitespace-nowrap text-sm font-bold text-[var(--hc-accent)] hover:text-[var(--hc-accent-dark)] ${focusRing}`}
              >
                市況の記事一覧 <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 3. ニュースレター */}
      <section className="border-t border-[var(--hc-line)] px-4 sm:px-6">
        <div className="mx-auto max-w-2xl py-16 text-center sm:py-20">
          <h2 className="text-xl font-bold leading-snug sm:text-2xl">毎週土曜の朝、1週間の市況をメールで</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--hc-muted)]">
            相場の動きと新しい記事をまとめてお届けします。登録は無料で、いつでも解除できます。
          </p>
          <div className="mx-auto mt-6 max-w-lg text-left">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* 4. 相談 */}
      <section className="border-t border-[var(--hc-line)] px-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold">手続きのことを、人に相談したいとき</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--hc-muted)]">
              英語の書類や保険会社とのやりとりを、日本語でご案内します。初回のご相談はメールで無料です。
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-xl border border-[var(--hc-ink)] px-5 py-3 text-sm font-bold transition-colors hover:bg-[var(--hc-ink)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hc-accent)] sm:self-auto"
          >
            相談する <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <p className="mx-auto max-w-5xl px-4 pb-8 text-xs leading-relaxed text-[var(--hc-muted)] sm:px-6">
        ※当サイトの情報は一般的な情報提供と投資教育を目的としたもので、特定の金融商品の勧誘や個別の投資助言を行うものではありません。
      </p>
    </div>
  );
}
