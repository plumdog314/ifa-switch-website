// 記事の探し方の2つの軸。
// 1. 困っていること（テーマ）… 読む人の状況から入る入り口
// 2. 持っているもの（会社・銀行・ゴールド）… 契約先や口座から入る入り口
// どちらも記事の slug・カテゴリから決める。1本の記事が複数のテーマに入ってよい。
import type { PostMeta } from "./blog";
import { companyName } from "./company-names";

export type ThemeId = "procedures" | "ifa" | "tax" | "family" | "market" | "portfolio" | "trouble" | "basics";

export type Theme = {
  id: ThemeId;
  name: string; // ボタン・見出し
  lead: string; // 1行の説明
  featured: string[]; // トップページで先に出す記事（あるものだけ使う）
  match: (p: PostMeta) => boolean;
};

const has = (p: PostMeta, re: RegExp) => re.test(p.slug);
const inList = (p: PostMeta, list: string[]) => list.includes(p.slug);

const TROUBLE = [
  "guaranteed-return-scam",
  "gold-scams",
  "provider-not-responding",
  "double-payment",
  "plans-to-avoid",
  "bad-ifa-checklist",
  "suspended-fund",
  "lump-payment-after-pause",
  "lost-contact-with-ifa",
  "avoid-opaque-funds",
  "cancel-right-after-signing",
  "provider-insolvency-protection",
  "urgent-cash-need",
  "hsbc-hk-account-frozen-kyc",
  "hsbc-hk-cannot-login",
  "hsbc-hk-dormant-account",
  "kyc-documents",
];

const PORTFOLIO_EXTRA = [
  "gold-as-an-asset",
  "what-moves-gold-price",
  "gold-physical-vs-etf",
  "gold-in-offshore-plan",
  "gold-accumulation-plan",
  "how-to-choose-funds",
  "underperforming-funds",
  "how-to-switch-funds",
];

export const THEMES: Theme[] = [
  {
    id: "procedures",
    name: "手続きをしたい",
    lead: "解約・減額・一時停止・住所やカードの変更・送金・口座を閉じるなど",
    featured: ["before-surrender", "reduce-contributions", "pause-contributions", "change-of-address", "update-credit-card", "maturity-payout"],
    match: (p) => p.category === "procedures",
  },
  {
    id: "ifa",
    name: "IFA・担当者のこと",
    lead: "連絡がつかない、担当を変えたい、信用できるか確かめたい",
    featured: ["lost-contact-with-ifa", "how-to-change-ifa", "without-ifa", "verify-ifa-license", "when-to-change-ifa", "bad-ifa-checklist"],
    match: (p) => p.category === "ifa" || has(p, /(^|-)ifa(-|$)|change-ifa|without-ifa|advisory-fee/),
  },
  {
    id: "tax",
    name: "税金・確定申告",
    lead: "解約・満期・預金の利息・金の売却、国外財産調書やCRS",
    featured: ["tax-on-surrender", "tax-on-maturity", "tax-on-offshore-savings", "hsbc-hk-tax-japan", "tax-on-selling-gold", "crs-explained"],
    match: (p) => p.category === "tax" || has(p, /tax|crs-|my-number|payment-record/),
  },
  {
    id: "family",
    name: "家族・相続",
    lead: "契約者や口座の名義人が亡くなった、受取人を決めておきたい",
    featured: ["if-policyholder-dies", "nominate-beneficiary", "hsbc-hk-account-holder-death", "saving-for-children"],
    match: (p) => has(p, /dies|death|beneficiar|inherit|children/),
  },
  {
    id: "market",
    name: "相場が下がって不安",
    lead: "暴落したら続けるか、長期投資の考え方、毎日の相場",
    featured: ["stop-saving-in-crash", "down-30-percent-what-to-do", "real-risk-is-quitting", "lehman-covid-recovery", "dollar-cost-averaging-crash", "ignore-market-noise"],
    match: (p) => p.category === "long-term" || p.category === "market",
  },
  {
    id: "portfolio",
    name: "資産の持ち方を見直したい",
    lead: "ファンドの選び方・配分・分散、ゴールドの持ち方",
    featured: ["how-to-choose-funds", "stock-bond-allocation", "geographic-diversification", "rebalancing", "gold-as-an-asset", "portfolio-review-timing"],
    match: (p) => p.category === "portfolio" || inList(p, PORTFOLIO_EXTRA),
  },
  {
    id: "trouble",
    name: "トラブル・詐欺",
    lead: "返事が来ない、二重の引き落とし、口座が止まった、元本保証の勧誘",
    featured: ["provider-not-responding", "double-payment", "guaranteed-return-scam", "gold-scams", "suspended-fund", "hsbc-hk-account-frozen-kyc"],
    match: (p) => inList(p, TROUBLE) || has(p, /dormant-login|scam/),
  },
  {
    id: "basics",
    name: "そもそもの仕組み",
    lead: "海外積み立ての仕組みと手数料、保険会社や銀行の安全性、ゴールドの基本",
    featured: ["offshore-plan-fees-explained", "initial-vs-accumulation-units", "offshore-pros-cons", "provider-comparison", "provider-insolvency-protection", "isle-of-man"],
    match: (p) => p.category === "basics" || p.category === "products",
  },
];

export const getTheme = (id: string) => THEMES.find((t) => t.id === id);
export const postsForTheme = (posts: PostMeta[], id: ThemeId) => {
  const t = getTheme(id)!;
  return posts.filter(t.match);
};

// ---- 持っているもの（会社・銀行・ゴールド） ----
export type HoldingGroup = "plan" | "bank" | "gold";
export type Holding = { id: string; name: string; group: HoldingGroup; match: RegExp };

export const HOLDING_GROUPS: { id: HoldingGroup; name: string }[] = [
  { id: "plan", name: "海外積み立て・保険の会社" },
  { id: "bank", name: "海外の銀行" },
  { id: "gold", name: "ゴールド" },
];

export const HOLDINGS: Holding[] = [
  { id: "rl360", name: companyName("rl360"), group: "plan", match: /^(what-is-)?rl360/ },
  { id: "hansard", name: companyName("hansard"), group: "plan", match: /^(what-is-)?hansard/ },
  { id: "friends-provident", name: companyName("friends"), group: "plan", match: /^(what-is-)?friends/ },
  { id: "investors-trust", name: companyName("investors"), group: "plan", match: /^(what-is-)?investors-trust/ },
  { id: "standard-life", name: companyName("standard-life"), group: "plan", match: /^(what-is-)?standard-life/ },
  { id: "zurich", name: companyName("zurich"), group: "plan", match: /^(what-is-)?zurich/ },
  { id: "utmost", name: companyName("utmost"), group: "plan", match: /^(what-is-)?(utmost|generali)/ },
  { id: "sun-life", name: companyName("sun-life"), group: "plan", match: /^(what-is-)?sun-life/ },
  { id: "ftlife", name: companyName("ftlife"), group: "plan", match: /^(what-is-)?ftlife/ },
  { id: "hsbc-life", name: companyName("hsbc-life"), group: "plan", match: /^hsbc-life/ },
  { id: "hsbc", name: companyName("hsbc"), group: "bank", match: /^hsbc-hk/ },
  { id: "standard-chartered-hk", name: companyName("standard-chartered-hk"), group: "bank", match: /^standard-chartered-hk/ },
  { id: "hang-seng", name: companyName("hang-seng"), group: "bank", match: /^hang-seng/ },
  { id: "bochk", name: companyName("bochk"), group: "bank", match: /^bochk/ },
  { id: "citibank-hk", name: companyName("citibank-hk"), group: "bank", match: /^citibank-hk/ },
  { id: "dbs-sg", name: companyName("dbs-sg"), group: "bank", match: /^dbs-sg/ },
  { id: "ocbc-sg", name: companyName("ocbc-sg"), group: "bank", match: /^ocbc-sg/ },
  { id: "uob-sg", name: companyName("uob-sg"), group: "bank", match: /^uob-sg/ },
  { id: "citibank-sg", name: companyName("citibank-sg"), group: "bank", match: /^citibank-sg/ },
  { id: "gold", name: "ゴールド", group: "gold", match: /gold/ },
];

export const getHolding = (id: string) => HOLDINGS.find((h) => h.id === id);
export const postsForHolding = (posts: PostMeta[], id: string) => {
  const h = getHolding(id)!;
  return posts.filter((p) => h.match.test(p.slug));
};
