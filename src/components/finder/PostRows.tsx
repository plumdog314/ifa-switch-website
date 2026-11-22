import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDateJa, type PostMeta } from "@/lib/blog";

// 記事を1行ずつ並べる一覧（カードにしない）。タイトル・カテゴリ・日付だけを出す。
export default function PostRows({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="divide-y divide-[var(--nv-line)] rounded-md border border-[var(--nv-line)] bg-white">
      {posts.map((p) => (
        <li key={p.slug}>
          <Link href={`/blog/${p.slug}`} className="group flex items-start gap-3 px-4 py-3.5 hover:bg-[var(--nv-soft)]">
            <span className="min-w-0 flex-1">
              <span className="block font-bold leading-relaxed text-[var(--nv-navy)] group-hover:underline underline-offset-4">
                {p.title}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--nv-muted)]">
                {p.categoryName}・{formatDateJa(p.updated ?? p.date)}
              </span>
            </span>
            <ArrowRight size={16} aria-hidden className="mt-1.5 shrink-0 text-[var(--nv-muted)]" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
