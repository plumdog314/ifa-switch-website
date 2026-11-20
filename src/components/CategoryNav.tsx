import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/blog";

export default function CategoryNav({ active }: { active?: string }) {
  const posts = getAllPosts();
  const counts = Object.fromEntries(
    categories.map((c) => [c.slug, posts.filter((p) => p.category === c.slug).length])
  );
  const base = "text-sm px-4 py-2 rounded-full border transition-colors";
  return (
    <nav aria-label="カテゴリ" className="flex flex-wrap gap-2 mb-10">
      <Link
        href="/blog"
        className={`${base} ${!active ? "bg-primary text-white border-primary" : "border-border text-text-light hover:border-primary hover:text-primary"}`}
      >
        すべて（{posts.length}）
      </Link>
      {categories
        .filter((c) => counts[c.slug] > 0)
        .map((c) => (
          <Link
            key={c.slug}
            href={`/blog/category/${c.slug}`}
            className={`${base} ${active === c.slug ? "bg-primary text-white border-primary" : "border-border text-text-light hover:border-primary hover:text-primary"}`}
          >
            {c.name}（{counts[c.slug]}）
          </Link>
        ))}
    </nav>
  );
}
