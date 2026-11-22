// 記事の探し方の2つの軸。
// 1. 困っていること（テーマ）… 読む人の状況から入る入り口
// 2. 持っているもの（会社・銀行・金）… 契約先や口座から入る入り口
// どちらも記事の slug・カテゴリから決める。1本の記事が複数のテーマに入ってよい。
import type { PostMeta } from "./blog";

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
    lead: "暴落したら続けるか、長期投資の考え方、毎日の市況",
    featured: ["stop-saving-in-crash", "down-30-percent-what-to-do", "real-risk-is-quitting", "lehman-covid-recovery", "dollar-cost-averaging-crash", "ignore-market-noise"],
    match: (p) => p.category === "long-term" || p.category === "market",
  },
  {
    id: "portfolio",
    name: "資産の持ち方を見直したい",
    lead: "ファンドの選び方・配分・分散、金（ゴールド）の持ち方",
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
    lead: "海外積み立ての仕組みと手数料、保険会社や銀行の安全性、金の基本",
    featured: ["offshore-plan-fees-explained", "initial-vs-accumulation-units", "offshore-pros-cons", "provider-comparison", "provider-insolvency-protection", "isle-of-man"],
    match: (p) => p.category === "basics" || p.category === "products",
  },
];

export const getTheme = (id: string) => THEMES.find((t) => t.id === id);
export const postsForTheme = (posts: PostMeta[], id: ThemeId) => {
  const t = getTheme(id)!;
  return posts.filter(t.match);
};

// ---- 持っているもの（会社・銀行・金） ----
export type HoldingGroup = "plan" | "bank" | "gold";
export type Holding = { id: string; name: string; group: HoldingGroup; match: RegExp };

export const HOLDING_GROUPS: { id: HoldingGroup; name: string }[] = [
  { id: "plan", name: "海外積み立て・保険の会社" },
  { id: "bank", name: "海外の銀行" },
  { id: "gold", name: "金（ゴールド）" },
];

export const HOLDINGS: Holding[] = [
  { id: "rl360", name: "RL360", group: "plan", match: /^(what-is-)?rl360/ },
  { id: "hansard", name: "ハンサード", group: "plan", match: /^(what-is-)?hansard/ },
  { id: "friends-provident", name: "フレンズプロビデント", group: "plan", match: /^(what-is-)?friends/ },
  { id: "investors-trust", name: "インベスターズトラスト", group: "plan", match: /^(what-is-)?investors-trust/ },
  { id: "standard-life", name: "スタンダードライフ", group: "plan", match: /^(what-is-)?standard-life/ },
  { id: "zurich", name: "チューリッヒ", group: "plan", match: /^(what-is-)?zurich/ },
  { id: "utmost", name: "ユートモスト（旧ジェネラリ等）", group: "plan", match: /^(what-is-)?(utmost|generali)/ },
  { id: "sun-life", name: "サンライフ（香港）", group: "plan", match: /^(what-is-)?sun-life/ },
  { id: "ftlife", name: "周大福人壽（旧FTLife）", group: "plan", match: /^(what-is-)?ftlife/ },
  { id: "hsbc-life", name: "HSBC Life", group: "plan", match: /^hsbc-life/ },
  { id: "hsbc", name: "HSBC（香港）", group: "bank", match: /^hsbc-hk/ },
  { id: "standard-chartered-hk", name: "スタンダードチャータード（香港）", group: "bank", match: /^standard-chartered-hk/ },
  { id: "hang-seng", name: "ハンセン銀行", group: "bank", match: /^hang-seng/ },
  { id: "bochk", name: "中国銀行（香港）", group: "bank", match: /^bochk/ },
  { id: "citibank-hk", name: "シティバンク（香港）", group: "bank", match: /^citibank-hk/ },
  { id: "dbs-sg", name: "DBS（シンガポール）", group: "bank", match: /^dbs-sg/ },
  { id: "ocbc-sg", name: "OCBC（シンガポール）", group: "bank", match: /^ocbc-sg/ },
  { id: "uob-sg", name: "UOB（シンガポール）", group: "bank", match: /^uob-sg/ },
  { id: "citibank-sg", name: "シティバンク（シンガポール）", group: "bank", match: /^citibank-sg/ },
  { id: "gold", name: "金（ゴールド）", group: "gold", match: /gold/ },
];

export const getHolding = (id: string) => HOLDINGS.find((h) => h.id === id);
export const postsForHolding = (posts: PostMeta[], id: string) => {
  const h = getHolding(id)!;
  return posts.filter((p) => h.match.test(p.slug));
};
