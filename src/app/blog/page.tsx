import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import NewsletterForm from "@/components/NewsletterForm";
import JsonLd from "@/components/JsonLd";
import BlogSearch, { type SearchItem } from "@/components/finder/BlogSearch";
import PostRows from "@/components/finder/PostRows";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { absUrl } from "@/lib/site";
import { NAVI_VARS } from "@/lib/navi-style";
import { THEMES, HOLDINGS, HOLDING_GROUPS } from "@/lib/themes";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "記事を探す｜海外積み立て・海外の銀行口座・ゴールドの解説",
  description:
    "海外積み立て・保険、香港やシンガポールの銀行口座、ゴールドについて、手続き・税金・相続・トラブルの解説記事を、困っていることや契約先の会社から探せます。",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const holdingOf = (slug: string) => HOLDINGS.find((h) => h.match.test(slug));

  const searchItems: SearchItem[] = posts.map((p) => {
    const h = holdingOf(p.slug);
    return {
      slug: p.slug,
      title: p.title,
      meta: [h?.name, p.categoryName].filter(Boolean).join("・"),
      text: [p.title, p.description, p.tags.join(" "), h?.name ?? "", p.categoryName].join(" ").toLowerCase(),
    };
  });

  return (
    <div style={NAVI_VARS} className="bg-[var(--nv-bg)] text-[var(--nv-navy)]">
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "記事を探す", path: "/blog" },
          ]),
          {
            "@type": "Blog",
            "@id": `${absUrl("/blog")}#blog`,
            name: "IFAスイッチ 解説記事",
            url: absUrl("/blog"),
            inLanguage: "ja-JP",
            blogPost: posts.slice(0, 30).map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: absUrl(`/blog/${p.slug}`),
              datePublished: p.date,
            })),
          }
        )}
      />

      <section className="border-b border-[var(--nv-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-10 sm:pt-12">
          <h1 className="text-2xl sm:text-3xl font-bold leading-snug">記事を探す</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--nv-muted)]">
            言葉で検索するか、困っていること・契約先の会社から探してください。
          </p>
          <div className="mt-6 rounded-xl border border-[var(--nv-line)] bg-white p-4 sm:p-6">
            <BlogSearch items={searchItems} />
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--nv-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-lg font-bold">困っていることから探す</h2>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-2">
            {THEMES.map((t) => (
              <li key={t.id} className="min-w-0">
                <Link
                  href={`/blog/theme/${t.id}`}
                  className="group flex h-full flex-col rounded-lg border border-[var(--nv-line-strong)] bg-white px-4 py-3.5 hover:border-[var(--nv-navy)] hover:bg-[var(--nv-soft)]"
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="min-w-0 font-bold [overflow-wrap:anywhere] group-hover:underline underline-offset-4">{t.name}</span>
                    <span className="shrink-0 text-xs tabular text-[var(--nv-muted)]">{posts.filter(t.match).length}本</span>
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-[var(--nv-muted)]">{t.lead}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-[var(--nv-line)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-lg font-bold">会社・銀行・ゴールドから探す</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-[repeat(3,minmax(0,1fr))] gap-4">
            {HOLDING_GROUPS.map((g) => (
              <div key={g.id} className="min-w-0 rounded-lg border border-[var(--nv-line)] bg-white p-4">
                <h3 className="text-sm font-bold text-[var(--nv-muted)]">{g.name}</h3>
                <ul className="mt-2 divide-y divide-[var(--nv-line)]">
                  {HOLDINGS.filter((h) => h.group === g.id).map((h) => {
                    const n = posts.filter((p) => h.match.test(p.slug)).length;
                    if (!n) return null;
                    return (
                      <li key={h.id}>
                        <Link
                          href={`/blog/company/${h.id}`}
                          className="group flex items-center justify-between gap-3 py-2.5 hover:bg-[var(--nv-soft)]"
                        >
                          <span className="min-w-0 font-bold [overflow-wrap:anywhere] group-hover:underline underline-offset-4">{h.name}</span>
                          <span className="shrink-0 text-xs tabular text-[var(--nv-muted)]">{n}本</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold">新しい記事</h2>
            <Link href="/feed.xml" className="text-sm underline underline-offset-4 hover:no-underline whitespace-nowrap">
              RSSで受け取る
            </Link>
          </div>
          <div className="mt-3">
            <PostRows posts={posts.slice(0, 20)} />
          </div>
          <p className="mt-3 text-sm text-[var(--nv-muted)]">
            もっと前の記事は、上の「困っていること」「会社・銀行・ゴールド」か、検索から探せます。
            <Link href="/blog/theme/market" className="ml-1 inline-flex items-center gap-1 font-bold text-[var(--nv-navy)] underline underline-offset-4 hover:no-underline whitespace-nowrap">
              毎日の相場はこちら <ArrowRight size={14} aria-hidden />
            </Link>
          </p>

          <div className="mt-12 rounded-xl border border-[var(--nv-line)] bg-white p-6 sm:p-8">
            <h3 className="font-bold mb-2">毎週の相場まとめをメールで受け取る</h3>
            <p className="text-[var(--nv-muted)] text-sm mb-4">
              1週間の相場の動きと新しい記事を、毎週メールでお届けします。登録は無料で、いつでも解除できます。
            </p>
            <NewsletterForm compact />
          </div>
        </div>
      </section>
    </div>
  );
}
