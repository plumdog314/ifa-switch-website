// 過去記事100本の点検: frontmatter・日付・カテゴリ・免責文・内部リンク・助言表現
// 使い方: node content/plan/check_articles.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const blogDir = path.join(root, "content/blog");
const csv = fs.readFileSync(path.join(root, "content/plan/articles-100.csv"), "utf8").trim().split("\n").slice(1);

// 簡易CSVパーサ（ダブルクォート対応）
const parse = (line) => {
  const out = []; let cur = ""; let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === "," && !q) { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
};
const CAT = { 暴落に負けない長期投資: "long-term", 投資の基礎知識: "basics", "手続き・トラブル対応": "procedures", "商品・保険会社別ガイド": "products", IFAについて: "ifa", "税金・確定申告": "tax", ポートフォリオ: "portfolio" };
const rows = csv.map(parse).map(([no, date, cat, title, slug]) => ({ no: +no, date, cat: CAT[cat], title, slug }));
const allSlugs = new Set(fs.readdirSync(blogDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")));

// 助言と取られやすい表現（文脈で問題ないものも拾うので、ヒットは目で確認する）
const RISKY = [/買い時/, /売り時/, /今がチャンス/, /おすすめ(の|する)ファンド/, /(売却|解約|乗り換え|スイッチ|購入)(す|し)?(る)?べき(です|でしょう)/, /(を|に)推奨します/, /必ず(回復|上が|儲か)/, /保証され(ます|ています)/, /%(に|へ)すべき/];
const DISCLAIMER = "※本記事は一般的な情報提供を目的としたもので、特定の金融商品の売買を推奨するものではありません。";

let missing = 0, problems = 0;
for (const r of rows) {
  const file = path.join(blogDir, `${r.slug}.md`);
  if (!fs.existsSync(file)) { missing++; continue; }
  const issues = [];
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  if (date !== r.date) issues.push(`date ${date} != ${r.date}`);
  if (data.category !== r.cat) issues.push(`category ${data.category} != ${r.cat}`);
  if (!data.title || !data.description) issues.push("title/description missing");
  if (!Array.isArray(data.summary) || data.summary.length !== 3) issues.push(`summary ${data.summary?.length ?? 0}`);
  if (!Array.isArray(data.faq) || data.faq.length < 2 || data.faq.some((f) => !f.q || !f.a)) issues.push("faq invalid");
  if (!content.includes(DISCLAIMER)) issues.push("disclaimer missing");
  const len = content.replace(/\]\([^)]*\)/g, "]").replace(/\s/g, "").length;
  if (len < 1800 || len > 4500) issues.push(`length ${len}`);
  for (const m of content.matchAll(/\]\(\/blog\/([^)#\s]+)\)/g)) if (!allSlugs.has(m[1])) issues.push(`broken link /blog/${m[1]}`);
  const text = [data.title, data.description, ...(data.summary ?? []), ...(data.faq ?? []).flatMap((f) => [f.q, f.a]), content].join("\n");
  for (const re of RISKY) {
    const m = text.match(new RegExp(`.{0,25}${re.source}.{0,25}`));
    if (m) issues.push(`risky: …${m[0].replace(/\n/g, " ")}…`);
  }
  if (issues.length) { problems++; console.log(`#${r.no} ${r.slug}\n  - ${issues.join("\n  - ")}`); }
}
console.log(`\n${rows.length - missing}/${rows.length} written, ${problems} with issues, ${missing} missing`);
