import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            ブログ
          </h1>
          <p className="text-text-light text-base sm:text-lg max-w-2xl mx-auto">
            海外投資やIFAに関するお役立ち情報をお届けします。
          </p>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <time className="text-text-light text-xs">
                      {new Date(post.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="font-bold text-lg text-text mb-3 leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-text-light text-sm leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center gap-1 transition-colors"
                  >
                    続きを読む
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
