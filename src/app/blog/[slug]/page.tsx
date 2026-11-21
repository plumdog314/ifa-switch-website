import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { getAllPosts, getPost, getRelatedPosts, formatDateJa } from "@/lib/blog";
import { articleSchema, breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import ArticleCta from "@/components/ArticleCta";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.categoryName,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  const nodes: object[] = [
    articleSchema(post),
    breadcrumbSchema([
      { name: "ホーム", path: "/" },
      { name: "ブログ", path: "/blog" },
      { name: post.categoryName, path: `/blog/category/${post.category}` },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];
  if (post.faq.length) nodes.push(faqSchema(post.faq));

  return (
    <>
      <JsonLd data={graph(...nodes)} />

      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="パンくずリスト" className="text-xs text-text-light mb-6 flex flex-wrap gap-1">
            <Link href="/" className="hover:text-primary">ホーム</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary">ブログ</Link>
            <span>/</span>
            <Link href={`/blog/category/${post.category}`} className="hover:text-primary">
              {post.categoryName}
            </Link>
          </nav>

          <div className="flex items-center gap-3 mb-4 flex-wrap text-sm text-text-light">
            <Link
              href={`/blog/category/${post.category}`}
              className="bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full"
            >
              {post.categoryName}
            </Link>
            <time dateTime={post.date}>{formatDateJa(post.date)}</time>
            {post.updated && post.updated !== post.date && (
              <span className="inline-flex items-center gap-1">
                <RefreshCw size={12} />
                <time dateTime={post.updated}>{formatDateJa(post.updated)} 更新</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {post.readingMinutes}分で読めます
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-text-light text-sm sm:text-base leading-relaxed">
            {post.description}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {post.summary.length > 0 && (
            <aside className="mb-10 rounded-2xl border border-accent/30 bg-accent-light/40 p-6 sm:p-8">
              <h2 className="font-bold text-text mb-4">この記事の要点</h2>
              <ul className="space-y-3">
                {post.summary.map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm sm:text-base text-text leading-relaxed">
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {post.headings.length >= 3 && (
            <nav aria-label="目次" className="mb-10 rounded-2xl bg-bg-gray p-6">
              <p className="font-bold text-text mb-3 text-sm">目次</p>
              <ol className="list-decimal list-inside space-y-1.5 text-sm">
                {post.headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-primary hover:text-primary-dark">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article
            className="prose prose-slate max-w-none prose-headings:text-text prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border prose-p:leading-loose prose-a:text-primary prose-table:text-sm"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <ArticleCta category={post.category} slug={post.slug} />

          {post.faq.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold text-text mb-6 pb-2 border-b border-border">
                よくある質問
              </h2>
              <dl className="space-y-6">
                {post.faq.map((f, i) => (
                  <div key={i} className="rounded-xl border border-border p-5">
                    <dt className="font-bold text-text mb-2">Q. {f.q}</dt>
                    <dd className="text-text-light text-sm sm:text-base leading-relaxed">A. {f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <div className="mt-14 rounded-2xl border border-border p-6 flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center shrink-0 font-bold text-primary">
              IS
            </div>
            <div>
              <p className="text-xs text-text-light mb-1">この記事を書いた人</p>
              <p className="font-bold text-text mb-1">
                <Link href={SITE.author.url} className="hover:text-primary">{SITE.author.name}</Link>
              </p>
              <p className="text-sm text-text-light leading-relaxed">{SITE.author.description}</p>
            </div>
          </div>

          <p className="mt-8 text-xs text-text-light leading-relaxed">
            ※本記事は一般的な情報提供・投資教育を目的としたもので、特定の金融商品の勧誘や個別の投資助言を行うものではありません。投資判断はご自身の責任で行ってください。
          </p>

          <div className="mt-12 rounded-2xl border border-border bg-bg-gray p-6 sm:p-8">
            <h3 className="font-bold text-text mb-2">毎週の市況まとめをメールで受け取る</h3>
            <p className="text-text-light text-sm mb-4">
              1週間の市況と新しい記事を、毎週メールでお届けします。登録は無料で、いつでも解除できます。
            </p>
            <NewsletterForm compact />
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-xl font-bold text-text mb-6">関連記事</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </section>
          )}

          <Link
            href="/blog"
            className="mt-12 text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} />
            ブログ一覧に戻る
          </Link>
        </div>
      </section>
    </>
  );
}
