import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import PostRows from "@/components/finder/PostRows";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { NAVI_VARS } from "@/lib/navi-style";
import { HOLDINGS, HOLDING_GROUPS, getHolding, postsForHolding } from "@/lib/themes";

export const revalidate = 3600;
type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return HOLDINGS.map((h) => ({ id: h.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const h = getHolding(id);
  if (!h) return {};
  return {
    title: `${h.name}の記事一覧｜記事を探す`,
    description: `${h.name}について、会社の概要と、解約・変更・送金などの手続き、税金の解説記事をまとめています。`,
    alternates: { canonical: `/blog/company/${h.id}` },
  };
}

export default async function CompanyPage({ params }: Props) {
  const { id } = await params;
  const h = getHolding(id);
  if (!h) notFound();
  // 会社の概要（what-is-）を先に、そのあとは新しい順
  const posts = postsForHolding(getAllPosts(), h.id).sort(
    (a, b) => Number(b.slug.startsWith("what-is-")) - Number(a.slug.startsWith("what-is-"))
  );
  const group = HOLDING_GROUPS.find((g) => g.id === h.group)!;
  const siblings = HOLDINGS.filter((x) => x.group === h.group && x.id !== h.id);

  return (
    <div style={NAVI_VARS} className="bg-[var(--nv-bg)] text-[var(--nv-navy)]">
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "記事を探す", path: "/blog" },
            { name: h.name, path: `/blog/company/${h.id}` },
          ])
        )}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:pt-12">
        <nav aria-label="パンくず" className="text-sm text-[var(--nv-muted)]">
          <Link href="/blog" className="underline underline-offset-4 hover:no-underline">記事を探す</Link>
          <span aria-hidden> / </span>
          <span>{group.name}</span>
        </nav>
        <h1 className="mt-3 text-2xl sm:text-3xl font-bold leading-snug [overflow-wrap:anywhere]">{h.name}の記事</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--nv-muted)]">
          {h.name}の会社の概要と、手続き・税金などの解説記事です。
        </p>
        <div className="mt-6">
          <PostRows posts={posts} />
        </div>

        {siblings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-sm font-bold text-[var(--nv-muted)]">{group.name}（ほか）</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {siblings.map((x) => (
                <li key={x.id}>
                  <Link
                    href={`/blog/company/${x.id}`}
                    className="inline-block whitespace-nowrap rounded-md border border-[var(--nv-line-strong)] bg-white px-3 py-2 text-sm font-bold hover:border-[var(--nv-navy)]"
                  >
                    {x.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
