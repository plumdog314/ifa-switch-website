import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { getCategory } from "./categories";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type FaqEntry = { q: string; a: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  category: string; // categories.ts の slug
  categoryName: string;
  tags: string[];
  summary: string[]; // 「この記事の要点」— AI検索に引用されやすい結論の箇条書き
  faq: FaqEntry[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & {
  html: string;
  headings: { id: string; text: string }[];
  plainText: string;
};

const toDateString = (v: unknown): string | undefined => {
  if (!v) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
};

// 公開日が今日（日本時間）以前の記事だけを出す。日付を未来にすれば予約投稿になる。
const todayJst = () =>
  new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const category = String(data.category ?? "basics");
  const headings: { id: string; text: string }[] = [];
  let h = 0;
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = renderer.parser.parseInline(tokens);
    if (depth === 2) {
      const id = `h-${++h}`;
      headings.push({ id, text: text.replace(/<[^>]+>/g, "") });
      return `<h2 id="${id}">${text}</h2>\n`;
    }
    return `<h${depth}>${text}</h${depth}>\n`;
  };
  const html = marked.parse(content, { renderer, async: false }) as string;
  const plainText = content.replace(/[#>*_`|\-]/g, "").replace(/\n{2,}/g, "\n").trim();

  if (!getCategory(category)) {
    throw new Error(`Unknown category "${category}" in content/blog/${file}`);
  }

  return {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: toDateString(data.date)!,
    updated: toDateString(data.updated),
    category,
    categoryName: getCategory(category)!.name,
    tags: (data.tags as string[]) ?? [],
    summary: (data.summary as string[]) ?? [],
    faq: (data.faq as FaqEntry[]) ?? [],
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(plainText.length / 500)),
    html,
    headings,
    plainText,
  };
}

let cache: Post[] | null = null;
let cacheDay = "";

export function getAllPosts(): Post[] {
  const today = todayJst();
  // 日付が変わったら読み直す（予約投稿が当日に出るように）
  if (!cache || cacheDay !== today || process.env.NODE_ENV === "development") {
    cacheDay = today;
    cache = fs
      .readdirSync(BLOG_DIR)
      .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_"))
      .map(readPost)
      .filter((p) => !p.draft && p.date <= today)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return cache;
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export const getPostsByCategory = (category: string) =>
  getAllPosts().filter((p) => p.category === category);

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const score = (p: Post) =>
    (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return others.sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export const formatDateJa = (d: string) =>
  new Date(d).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
