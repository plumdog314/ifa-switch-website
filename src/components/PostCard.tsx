import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDateJa, type PostMeta } from "@/lib/blog";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <Link
            href={`/blog/category/${post.category}`}
            className="bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            {post.categoryName}
          </Link>
          <time dateTime={post.date} className="text-text-light text-xs">
            {formatDateJa(post.date)}
          </time>
        </div>

        <h2 className="font-bold text-lg text-text mb-3 leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h2>

        <p className="text-text-light text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
          {post.description}
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
  );
}
