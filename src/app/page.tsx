import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { getAllPosts, getPost, formatDateJa } from "@/lib/blog";
import { PLANS, SPOTS, yen } from "@/lib/plans";
import NewsletterForm from "@/components/NewsletterForm";
import ProcedureNavigator from "@/components/home-navi/ProcedureNavigator";
import { allNaviSlugs, type ArticleMap } from "@/components/home-navi/navi-data";

export const revalidate = 3600;

// このページだけの配色（手続きナビ型）。globals.css のトークンは変えない。
const NAVI_VARS = {
  "--nv-bg": "#eef2f7",
  "--nv-soft": "#e3eaf3",
  "--nv-line": "#d3dce7",
  "--nv-line-strong": "#9fb0c4",
  "--nv-navy": "#12305a",
  "--nv-navy-2": "#1d4479",
  "--nv-muted": "#4a5b70",
} as CSSProperties;

export default function Home() {
  const posts = getAllPosts();
  const market = posts.find((p) => p.category === "market");

  const articles: ArticleMap = {};
  for (const slug of allNaviSlugs()) {
    const p = getPost(slug);
    if (p) articles[slug] = { title: p.title, description: p.description };
  }

  const lite = PLANS.find((p) => p.id === "lite");
  const support = PLANS.find((p) => p.id === "support");
  const free = PLANS.find((p) => p.id === "free");
  const spotMin = Math.min(...SPOTS.map((s) => s.price));

  const helps = [
    {
      label: "無料",
      name: "記事とAIチャット",
      price: "0円",
      body: `${free?.lead ?? ""}。${free?.includes.find((i) => i.startsWith("AIチャット")) ?? "AIチャット"}を無料で使えます。`,
      href: "/chat",
      cta: "AIチャットを使う",
    },
    lite && {
      label: "月額",
      name: `${lite.name}プラン`,
      price: `${yen(lite.price.monthly ?? 0)}／月`,
      body: `${lite.lead}。${lite.includes[1] ?? ""}が読めます。`,
      href: "/pricing",
      cta: "プランを見る",
    },
    support && {
      label: "月額",
      name: `${support.name}プラン`,
      price: `${yen(support.price.monthly ?? 0)}／月`,
      body: `${support.lead}。${support.includes[0] ?? ""}。`,
      href: "/pricing",
      cta: "プランを見る",
    },
    {
      label: "1件ごと",
      name: "スポット手続き",
      price: `${yen(spotMin)}から`,
      body: "解約や住所変更など、1件の手続きを書類の準備から提出まで日本語でお手伝いします。",
      href: "/pricing#spot",
      cta: "料金を見る",
    },
  ].filter(Boolean) as { label: string; name: string; price: string; body: string; href: string; cta: string }[];

  return (
    <div style={NAVI_VARS} className="bg-[var(--nv-bg)] text-[var(--nv-navy)] font-sans">
      {/* 1画面目：手続きナビ */}
      <section className="border-b border-[var(--nv-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-12 sm:pb-16">
          <p className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--nv-line)] px-3 py-1 text-xs font-bold whitespace-nowrap">
            手続きナビ
          </p>
          <h1 className="mt-4 text-2xl sm:text-3xl lg:text-[2.25rem] font-bold leading-snug [overflow-wrap:anywhere]">
            海外積み立ての手続きを、
            <br className="hidden sm:block" />
            3つのステップで確認できます。
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[var(--nv-muted)]">
            保険会社と手続きを選ぶと、流れと必要書類を説明した記事をご案内します。記事はすべて無料で読めます。
          </p>
          <div className="mt-8">
            <ProcedureNavigator articles={articles} />
          </div>
        </div>
      </section>

      {/* IFAスイッチでできること */}
      <section className="border-b border-[var(--nv-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
          <h2 className="text-xl sm:text-2xl font-bold">IFAスイッチでできること</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--nv-muted)]">
            まずは無料の記事とAIチャットで調べて、自分で進めるのが難しいところだけ人に頼めます。
          </p>
          <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-3">
            {helps.map((h) => (
              <li key={h.name} className="min-w-0 flex flex-col rounded-lg border border-[var(--nv-line)] bg-white p-5">
                <p className="text-xs font-bold text-[var(--nv-muted)]">{h.label}</p>
                <p className="mt-1 font-bold">{h.name}</p>
                <p className="mt-1 text-lg font-bold tabular whitespace-nowrap">{h.price}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--nv-muted)]">{h.body}</p>
                <Link
                  href={h.href}
                  className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold underline underline-offset-4 hover:no-underline"
                >
                  {h.cta} <ArrowRight size={14} aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-[var(--nv-muted)]">
            サポートプランの方は、スポット手続きが30%引きになります。料金は税込みです。
          </p>
        </div>
      </section>

      {/* 今日の市況 + メルマガ */}
      <section className="border-b border-[var(--nv-line)] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
          {market && (
            <div className="min-w-0">
              <p className="text-xs font-bold text-[var(--nv-muted)] flex flex-wrap gap-x-3">
                <span>毎日の市況</span>
                <time dateTime={market.date} className="tabular font-normal">{formatDateJa(market.date)}</time>
              </p>
              <h2 className="mt-2 text-lg font-bold leading-relaxed [overflow-wrap:anywhere]">
                <Link href={`/blog/${market.slug}`} className="underline-offset-4 hover:underline">
                  {market.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--nv-muted)] line-clamp-3">{market.description}</p>
              <Link
                href="/blog/category/market"
                className="mt-3 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold underline underline-offset-4 hover:no-underline"
              >
                市況の記事一覧 <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          )}
          <div className="min-w-0 lg:border-l lg:border-[var(--nv-line)] lg:pl-10">
            <h2 className="text-lg font-bold">ニュースレター（毎週土曜）</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--nv-muted)]">
              1週間の相場の動きと新しい記事をメールでお届けします。登録は無料で、いつでも解除できます。
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
          <div className="rounded-lg bg-[var(--nv-navy)] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold">どの手続きに当てはまるか分からないとき</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                届いた書類や今の状況をお知らせください。必要な手続きと進め方を、メールでご案内します。初回のご相談は無料です。
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap rounded-md bg-white px-5 py-3 text-sm font-bold text-[var(--nv-navy)] hover:bg-[var(--nv-soft)]"
            >
              <Mail size={16} aria-hidden /> 問い合わせる
            </Link>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[var(--nv-muted)]">
            ※当サイトの情報は一般的な情報提供と手続きのご案内を目的としたもので、特定の金融商品の勧誘や、解約・継続などの個別の投資助言を行うものではありません。
          </p>
        </div>
      </section>
    </div>
  );
}
