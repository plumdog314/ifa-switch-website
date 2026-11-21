import { getAllPosts, type Post } from "@/lib/blog";
import { SITE, absUrl } from "@/lib/site";

export const revalidate = 3600;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// メール配信（Mailchimp の RSS キャンペーン）で使う本文。要点と続きを読むリンク。
const itemHtml = (p: Post) => {
  const url = absUrl(`/blog/${p.slug}`);
  const points = p.summary.length
    ? `<ul>${p.summary.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`
    : "";
  return `<p>${esc(p.description)}</p>${points}<p><a href="${url}">記事を読む →</a></p>`.replace(/]]>/g, "]]&gt;");
};

export function GET() {
  const posts = getAllPosts().slice(0, 50);
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absUrl(`/blog/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T07:00:00+09:00`).toUTCString()}</pubDate>
      <category>${esc(p.categoryName)}</category>
      <description>${esc(p.description)}</description>
      <content:encoded><![CDATA[${itemHtml(p)}]]></content:encoded>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${esc(SITE.name)} ブログ</title>
    <link>${absUrl("/blog")}</link>
    <description>${esc(SITE.description)}</description>
    <language>ja</language>
    <atom:link href="${absUrl("/feed.xml")}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
