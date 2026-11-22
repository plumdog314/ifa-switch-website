import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import PostRows from "@/components/finder/PostRows";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { NAVI_VARS } from "@/lib/navi-style";
import { THEMES, HOLDINGS, getTheme, postsForTheme } from "@/lib/themes";

export const revalidate = 3600;
type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return THEMES.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = getTheme(id);
  if (!t) return {};
  return {
    title: `${t.name}｜記事を探す`,
    description: `${t.lead}。海外積み立て・保険、海外の銀行口座、金（ゴールド）について、関係する解説記事をまとめています。`,
    alternates: { canonical: `/blog/theme/${t.id}` },
  };
}

export default async function ThemePage({ params }: Props) {
  const { id } = await params;
  const t = getTheme(id);
  if (!t) notFound();
  const posts = postsForTheme(getAllPosts(), t.id);

  // 会社ごとにまとめる。どの会社にも当てはまらない記事は「共通」として先に出す。
  const groups: { key: string; name: string; posts: PostMeta[] }[] = [];
  const common = posts.filter((p) => !HOLDINGS.some((h) => h.match.test(p.slug)));
  if (common.length) groups.push({ key: "common", name: "どの会社・銀行にも共通", posts: common });
  for (const h of HOLDINGS) {
    const ps = posts.filter((p) => h.match.test(p.slug));
    if (ps.length) groups.push({ key: h.id, name: h.name, posts: ps });
  }

  return (
    <div style={NAVI_VARS} className="bg-[var(--nv-bg)] text-[var(--nv-navy)]">
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "記事を探す", path: "/blog" },
            { name: t.name, path: `/blog/theme/${t.id}` },
          ])
        )}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pt-12">
        <nav aria-label="パンくず" className="text-sm text-[var(--nv-muted)]">
          <Link href="/blog" className="underline underline-offset-4 hover:no-underline">記事を探す</Link>
          <span aria-hidden> / </span>
          <span>{t.name}</span>
        </nav>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold leading-snug">{t.name}</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--nv-muted)]">
          {t.lead}。
        </p>

        {groups.length > 1 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {groups.map((g) => (
              <li key={g.key}>
                <a
                  href={`#g-${g.key}`}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-[var(--nv-line-strong)] bg-white px-3 py-2 text-sm font-bold hover:border-[var(--nv-navy)]"
                >
                  {g.name}
                  <span className="text-xs font-normal tabular text-[var(--nv-muted)]">{g.posts.length}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 space-y-10">
          {groups.map((g) => (
            <section key={g.key} id={`g-${g.key}`} aria-labelledby={`h-${g.key}`} className="scroll-mt-24">
              <h2 id={`h-${g.key}`} className="text-lg font-bold">
                {g.name}
              </h2>
              <div className="mt-3">
                <PostRows posts={g.posts} />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-sm font-bold text-[var(--nv-muted)]">ほかの困りごと</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {THEMES.filter((x) => x.id !== t.id).map((x) => (
              <li key={x.id}>
                <Link
                  href={`/blog/theme/${x.id}`}
                  className="inline-block whitespace-nowrap rounded-md border border-[var(--nv-line-strong)] bg-white px-3 py-2 text-sm font-bold hover:border-[var(--nv-navy)]"
                >
                  {x.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
