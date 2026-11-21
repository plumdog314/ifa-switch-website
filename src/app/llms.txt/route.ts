import { getAllPosts } from "@/lib/blog";
import { categories } from "@/lib/categories";
import { faqData } from "@/data/faq";
import { SITE, absUrl } from "@/lib/site";

export const revalidate = 3600;

// https://llmstxt.org/ 形式。AIがサイトの全体像を素早く把握するための目次。
export function GET() {
  const posts = getAllPosts();
  const lines: string[] = [
    `# ${SITE.name}（${SITE.nameEn}）`,
    "",
    `> ${SITE.description}`,
    "",
    `- 運営拠点: 香港（${SITE.address.streetAddress}, ${SITE.address.addressLocality}）`,
    `- サービス開始: ${SITE.foundingYear}年`,
    `- 実績: ${SITE.credentials.join("、")}`,
    "- 対象: RL360、インベスターズトラスト、フレンズプロビデント、ハンサード、ジェネラリ、スタンダードライフ等の海外積み立て投資プランを保有する日本人投資家",
    "- 提供内容: 長期投資の教育コンテンツ、保有ファンドの見える化と資料の読み方の解説、各種手続きのサポート（書き方の解説・書類チェック）、提携するライセンス保有アドバイザーによる個別ポートフォリオアドバイスの窓口",
    "- 立場: IFAスイッチ自身は一般的な情報提供・投資教育と手続きサポートを行い、特定商品の勧誘・推奨や個別の投資助言は行わない。個別のポートフォリオアドバイスは提携するライセンス保有アドバイザーが提供し、IFAスイッチは窓口を務める",
    `- 連絡先: ${SITE.email}`,
    `- 全文版: ${absUrl("/llms-full.txt")}`,
    "",
    "## 主要ページ",
    `- [サービス内容](${absUrl("/service")}): 保有ファンドの見える化と手続きサポートの内容`,
    `- [料金](${absUrl("/pricing")}): 料金プラン`,
    `- [よくある質問](${absUrl("/faq")}): サービスと海外積み立て投資に関するQ&A`,
    `- [会社概要](${absUrl("/about")}): 運営者情報`,
    `- [AIチャット](${absUrl("/chat")}): 保有ファンドの見える化と手続きの疑問に答えるAIアシスタント（一般情報のみ、投資助言は行わない）`,
    `- [お問い合わせ](${absUrl("/contact")}): 無料相談の窓口`,
    "",
  ];

  for (const c of categories) {
    const inCat = posts.filter((p) => p.category === c.slug);
    if (!inCat.length) continue;
    lines.push(`## ${c.name}`, "", c.description, "");
    for (const p of inCat) {
      lines.push(`- [${p.title}](${absUrl(`/blog/${p.slug}`)}): ${p.description}`);
    }
    lines.push("");
  }

  lines.push("## よくある質問（抜粋）", "");
  for (const f of faqData.slice(0, 10)) {
    lines.push(`- Q. ${f.question}`, `  A. ${f.answer}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
