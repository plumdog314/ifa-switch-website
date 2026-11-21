import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";
import NewsletterForm from "@/components/NewsletterForm";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { absUrl } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ブログ｜海外積み立て投資と長期投資の教科書",
  description:
    "海外積み立て投資（RL360・インベスターズトラスト等）の仕組み、手続き、暴落に振り回されない長期投資の考え方を、毎日わかりやすく解説します。",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "ブログ", path: "/blog" },
          ]),
          {
            "@type": "Blog",
            "@id": `${absUrl("/blog")}#blog`,
            name: "IFAスイッチ ブログ",
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
      <PageHero
        tag="BLOG"
        title="ブログ"
        description="海外投資やIFAに関するお役立ち情報をお届けします。"
        illustration="blog"
      />

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <CategoryNav />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="mt-16 rounded-2xl border border-border bg-bg-gray p-6 sm:p-8">
            <h3 className="font-bold text-text mb-2">毎週の市況まとめをメールで受け取る</h3>
            <p className="text-text-light text-sm mb-4">
              1週間の市況と新しい記事を、毎週メールでお届けします。登録は無料で、いつでも解除できます。
            </p>
            <NewsletterForm compact />
          </div>

        </div>
      </section>
    </>
  );
}
