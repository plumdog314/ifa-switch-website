import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getAllPosts } from "@/lib/blog";
import { faqData } from "@/data/faq";
import { SITE, absUrl } from "@/lib/site";

export const revalidate = 3600;

// 全記事の本文をMarkdownで連結したもの。AIが一度で全体を読み込める。
export function GET() {
  const posts = getAllPosts();
  const out: string[] = [`# ${SITE.name} 全コンテンツ`, "", `> ${SITE.description}`, ""];

  out.push("## よくある質問", "");
  for (const f of faqData) out.push(`### ${f.question}`, "", f.answer, "");

  for (const p of posts) {
    const raw = fs.readFileSync(path.join(process.cwd(), "content/blog", `${p.slug}.md`), "utf8");
    const { content } = matter(raw);
    out.push(
      "---",
      "",
      `## ${p.title}`,
      "",
      `URL: ${absUrl(`/blog/${p.slug}`)}`,
      `公開日: ${p.date}${p.updated ? ` / 更新日: ${p.updated}` : ""}`,
      `カテゴリ: ${p.categoryName}`,
      ""
    );
    if (p.summary.length) {
      out.push("要点:", ...p.summary.map((s) => `- ${s}`), "");
    }
    out.push(content.trim().replace(/^## /gm, "### "), "");
    if (p.faq.length) {
      out.push("よくある質問:", "");
      for (const f of p.faq) out.push(`- Q. ${f.q}`, `  A. ${f.a}`);
      out.push("");
    }
  }

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
