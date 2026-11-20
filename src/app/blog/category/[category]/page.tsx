import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/blog";
import PageHero from "@/components/PageHero";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";

export const revalidate = 3600;

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.name}｜ブログ`,
    description: c.description,
    alternates: { canonical: `/blog/category/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const posts = getPostsByCategory(c.slug);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "ブログ", path: "/blog" },
            { name: c.name, path: `/blog/category/${c.slug}` },
          ])
        )}
      />
      <PageHero tag="BLOG" title={c.name} description={c.description} illustration="blog" />
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <CategoryNav active={c.slug} />
          {posts.length === 0 ? (
            <p className="text-text-light">このカテゴリの記事は準備中です。</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
