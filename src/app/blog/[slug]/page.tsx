import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Article Header */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center gap-1 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            ブログ一覧に戻る
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full">
              {post.category}
            </span>
            <time className="text-text-light text-sm">
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-slate max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-text-light leading-relaxed mb-6 text-sm sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back to Blog & CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-bg-gray rounded-2xl p-8 text-center">
              <h3 className="font-bold text-lg text-text mb-3">
                投資についてお悩みですか？
              </h3>
              <p className="text-text-light text-sm mb-6">
                IFAスイッチでは、海外積み立て投資に関するご相談を無料で承っております。
              </p>
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2 text-sm"
              >
                無料で相談する
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
