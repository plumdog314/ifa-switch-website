// 会員向けコンテンツ（手続きガイド・英語の手紙のひな形）の読み込み。
// ブログと同じく gray-matter + marked で Markdown を HTML にする。
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type MemberKind = "guides" | "letters";

export const MEMBER_KINDS: Record<MemberKind, { name: string; lead: string }> = {
  guides: {
    name: "手続きガイド",
    lead: "よくある手続きの流れ、準備するもの、つまずきやすい点をまとめています。",
  },
  letters: {
    name: "英語の手紙のひな形",
    lead: "保険会社に送る英語の手紙のひな形です。［ ］の部分を書き換えてお使いください。",
  },
};

export type MemberDocMeta = {
  kind: MemberKind;
  slug: string;
  title: string;
  description: string;
  order: number;
  headings: { id: string; text: string }[];
};

export type MemberDoc = MemberDocMeta & { html: string };

const dirOf = (kind: MemberKind) => path.join(process.cwd(), "content/members", kind);

function readDoc(kind: MemberKind, file: string): MemberDoc {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(dirOf(kind), file), "utf8");
  const { data, content } = matter(raw);

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

  return {
    kind,
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    order: Number(data.order ?? 999),
    headings,
    html,
  };
}

const cache = new Map<MemberKind, MemberDoc[]>();

export function getMemberDocs(kind: MemberKind): MemberDoc[] {
  const hit = cache.get(kind);
  if (hit && process.env.NODE_ENV !== "development") return hit;
  const dir = dirOf(kind);
  const docs = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
        .map((f) => readDoc(kind, f))
        .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))
    : [];
  cache.set(kind, docs);
  return docs;
}

export const getMemberDoc = (kind: MemberKind, slug: string) =>
  getMemberDocs(kind).find((d) => d.slug === slug);

