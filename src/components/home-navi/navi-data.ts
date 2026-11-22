// 手続きナビの対応表。分野 → 会社 → 手続き → 読む記事の slug。
// slug は content/blog/ にあるものだけを使う（page.tsx で存在を確かめてから渡し、無いものは出さない）。
// 記事が1本もない「会社 × 手続き」の組み合わせは、手続きのボタン自体を出さない。

import { companyName } from "@/lib/company-names";

export type SpotId = "spot-basic" | "spot-complex";
export type Task = { id: string; name: string; spot?: SpotId };
export type Provider = { id: string; name: string };

export type Domain = {
  id: "plan" | "bank" | "gold";
  name: string; // 分野のボタン
  providerLabel: string | null; // 「保険会社」「銀行」。金は会社を選ばないので null
  tasks: Task[];
  providers: Provider[];
  // どの会社でも共通の記事（会社を選んでいないとき・会社別の記事の後ろに出す）
  common: Record<string, string[]>;
  // 会社ごと・手続きごとの記事（共通の記事より先に並べる）
  own: Record<string, Record<string, string[]>>;
  // 会社そのものの解説
  background: Record<string, string[]>;
  // 何も選んでいないときの記事
  defaults: { label: string; slug: string }[];
  spot: boolean; // スポット手続きの料金を出すか（保険の手続きだけ）
};

const PLAN: Domain = {
  id: "plan",
  name: "積み立て・保険",
  providerLabel: "保険会社",
  spot: true,
  tasks: [
    { id: "surrender", name: "解約", spot: "spot-complex" },
    { id: "reduce", name: "減額・一時停止", spot: "spot-complex" },
    { id: "withdraw", name: "一部引き出し", spot: "spot-complex" },
    { id: "premium", name: "保険料の支払い", spot: "spot-basic" },
    { id: "ifa", name: "担当IFAの変更", spot: "spot-complex" },
    { id: "address", name: "住所・カードの変更", spot: "spot-basic" },
    { id: "maturity", name: "満期の受け取り", spot: "spot-complex" },
  ],
  providers: [
    { id: "rl360", name: companyName("rl360") },
    { id: "hansard", name: companyName("hansard") },
    { id: "friends", name: companyName("friends") },
    { id: "investors", name: companyName("investors") },
    { id: "standard-life", name: companyName("standard-life") },
    { id: "zurich", name: companyName("zurich") },
    { id: "utmost", name: companyName("utmost") },
    { id: "sun-life", name: companyName("sun-life") },
    { id: "ftlife", name: companyName("ftlife") },
    { id: "hsbc-life", name: companyName("hsbc-life") },
  ],
  common: {
    surrender: ["before-surrender", "surrender-within-2-years", "want-to-quit-options", "tax-on-surrender"],
    reduce: ["reduce-contributions", "pause-contributions", "want-to-quit-options"],
    withdraw: ["partial-withdrawal"],
    premium: ["double-payment", "lump-payment-after-pause", "hsbc-hk-offshore-plan-payment"],
    ifa: ["how-to-change-ifa", "ifa-transfer-penalty"],
    address: ["change-of-address", "update-credit-card"],
    maturity: ["maturity-payout", "tax-on-maturity"],
  },
  own: {
    rl360: {
      surrender: ["rl360-surrender-procedure", "rl360-surrender-after-2-years"],
      reduce: ["rl360-reduce-pause"],
      withdraw: ["rl360-quantum"],
      ifa: ["rl360-change-ifa"],
      address: ["rl360-change-address-card"],
      maturity: ["rl360-maturity"],
    },
    hansard: {
      surrender: ["hansard-surrender-procedure"],
      reduce: ["hansard-reduce-pause-cost"],
      ifa: ["hansard-change-ifa"],
      address: ["hansard-change-address-card", "hansard-online-account"],
      maturity: ["hansard-maturity"],
    },
    friends: {
      surrender: ["friends-provident-surrender-procedure", "friends-surrender-value", "friends-policy-document"],
      reduce: ["friends-provident-reduce-pause"],
      ifa: ["friends-provident-change-ifa"],
      address: ["friends-provident-change-address-card"],
      maturity: ["friends-provident-maturity", "friends-policy-document"],
    },
    investors: {
      surrender: ["investors-trust-surrender-procedure"],
      reduce: ["investors-trust-reduce-pause"],
      address: ["investors-trust-change-address-card"],
      maturity: ["investors-trust-maturity"],
    },
    "standard-life": {
      surrender: ["standard-life-surrender-procedure"],
      reduce: ["standard-life-reduce-pause"],
      withdraw: ["standard-life-procedures"],
      ifa: ["standard-life-procedures"],
      address: ["standard-life-procedures"],
    },
    zurich: {
      surrender: ["zurich-international-surrender-procedure"],
      reduce: ["zurich-international-reduce-pause"],
      address: ["zurich-international-change-address-card"],
    },
    utmost: {
      surrender: ["utmost-surrender-procedure"],
      reduce: ["utmost-reduce-pause"],
      address: ["utmost-change-address-card"],
    },
    "sun-life": {
      surrender: ["sun-life-hk-surrender-procedure"],
      premium: ["sun-life-hk-premium-payment"],
      address: ["sun-life-hk-change-address"],
    },
    ftlife: {
      surrender: ["ftlife-surrender-procedure"],
      premium: ["ftlife-premium-payment"],
      address: ["ftlife-change-address"],
    },
    "hsbc-life": {
      surrender: ["hsbc-life-policy-procedures"],
      premium: ["hsbc-life-policy-procedures"],
      address: ["hsbc-life-policy-procedures"],
    },
  },
  background: {
    rl360: ["what-is-rl360", "rl360-quantum"],
    hansard: ["what-is-hansard", "hansard-online-account"],
    friends: ["what-is-friends-provident", "friends-policy-document"],
    investors: ["what-is-investors-trust", "investors-trust-sp500"],
    "standard-life": ["what-is-standard-life", "standard-life-procedures"],
    zurich: ["what-is-zurich-international"],
    utmost: ["what-is-utmost", "generali-plan-basics"],
    "sun-life": ["what-is-sun-life-hk"],
    ftlife: ["what-is-ftlife"],
    "hsbc-life": ["hsbc-life-policy-procedures"],
  },
  defaults: [
    { label: "解約", slug: "before-surrender" },
    { label: "減額", slug: "reduce-contributions" },
    { label: "一時停止", slug: "pause-contributions" },
    { label: "一部引き出し", slug: "partial-withdrawal" },
    { label: "担当IFAの変更", slug: "how-to-change-ifa" },
    { label: "住所の変更", slug: "change-of-address" },
    { label: "カードの変更", slug: "update-credit-card" },
    { label: "満期の受け取り", slug: "maturity-payout" },
  ],
};

// 銀行は、各行とも「口座開設・手数料」「休眠・ログイン」「日本への送金」「口座を閉じる・相続」の記事がある。
const BANKS: { id: string; name: string; prefix: string }[] = [
  { id: "standard-chartered-hk", name: companyName("standard-chartered-hk"), prefix: "standard-chartered-hk" },
  { id: "hang-seng", name: companyName("hang-seng"), prefix: "hang-seng" },
  { id: "bochk", name: companyName("bochk"), prefix: "bochk" },
  { id: "citibank-hk", name: companyName("citibank-hk"), prefix: "citibank-hk" },
  { id: "dbs-sg", name: companyName("dbs-sg"), prefix: "dbs-sg" },
  { id: "ocbc-sg", name: companyName("ocbc-sg"), prefix: "ocbc-sg" },
  { id: "uob-sg", name: companyName("uob-sg"), prefix: "uob-sg" },
  { id: "citibank-sg", name: companyName("citibank-sg"), prefix: "citibank-sg" },
];

const bankOwn = (p: string) => ({
  open: [`${p}-open-account-fees`],
  fees: [`${p}-open-account-fees`],
  dormant: [`${p}-dormant-login`],
  login: [`${p}-dormant-login`],
  transfer: [`${p}-transfer-to-japan`],
  close: [`${p}-close-account-death`],
  death: [`${p}-close-account-death`],
});

const BANK: Domain = {
  id: "bank",
  name: "海外の銀行口座",
  providerLabel: "銀行",
  spot: false,
  tasks: [
    { id: "open", name: "口座開設" },
    { id: "fees", name: "維持手数料・最低残高" },
    { id: "dormant", name: "休眠口座" },
    { id: "login", name: "ログインできない" },
    { id: "transfer", name: "日本への送金" },
    { id: "address", name: "住所・電話の変更" },
    { id: "kyc", name: "本人確認・口座の凍結" },
    { id: "card", name: "カードの再発行" },
    { id: "close", name: "口座を閉じる" },
    { id: "death", name: "名義人が亡くなった" },
    { id: "tax", name: "利息の税金" },
  ],
  providers: [{ id: "hsbc", name: companyName("hsbc") }, ...BANKS.map((b) => ({ id: b.id, name: b.name }))],
  common: {
    tax: ["hsbc-hk-tax-japan", "crs-explained"],
  },
  own: {
    hsbc: {
      open: ["hsbc-hk-open-account-from-japan", "hsbc-hk-without-visiting"],
      fees: ["hsbc-hk-fees-minimum-balance"],
      dormant: ["hsbc-hk-dormant-account"],
      login: ["hsbc-hk-cannot-login"],
      transfer: ["hsbc-hk-transfer-to-japan", "hsbc-hk-offshore-plan-payment"],
      address: ["hsbc-hk-change-address-phone", "hsbc-hk-without-visiting"],
      kyc: ["hsbc-hk-account-frozen-kyc"],
      card: ["hsbc-hk-card-replacement"],
      close: ["hsbc-hk-close-account"],
      death: ["hsbc-hk-account-holder-death"],
    },
    ...Object.fromEntries(BANKS.map((b) => [b.id, bankOwn(b.prefix)])),
  },
  background: {
    hsbc: ["hsbc-hk-without-visiting", "hsbc-life-policy-procedures"],
  },
  defaults: [
    { label: "口座開設", slug: "hsbc-hk-open-account-from-japan" },
    { label: "維持手数料", slug: "hsbc-hk-fees-minimum-balance" },
    { label: "休眠口座", slug: "hsbc-hk-dormant-account" },
    { label: "ログイン", slug: "hsbc-hk-cannot-login" },
    { label: "日本への送金", slug: "hsbc-hk-transfer-to-japan" },
    { label: "利息の税金", slug: "hsbc-hk-tax-japan" },
  ],
};

const GOLD: Domain = {
  id: "gold",
  name: "金（ゴールド）",
  providerLabel: null,
  spot: false,
  tasks: [
    { id: "basics", name: "金の特徴・値動き" },
    { id: "buy", name: "現物を買う" },
    { id: "accumulate", name: "純金積立" },
    { id: "etf", name: "ETF・投資信託との違い" },
    { id: "storage", name: "保管" },
    { id: "sell", name: "売るときの税金" },
    { id: "import", name: "海外から持ち込む" },
    { id: "scam", name: "詐欺・トラブル" },
    { id: "fund", name: "積み立てのファンドで持つ" },
  ],
  providers: [],
  common: {
    basics: ["gold-as-an-asset", "what-moves-gold-price"],
    buy: ["buy-physical-gold", "gold-bar-charge"],
    accumulate: ["gold-accumulation-plan"],
    etf: ["gold-physical-vs-etf"],
    storage: ["gold-storage"],
    sell: ["tax-on-selling-gold", "gold-payment-record"],
    import: ["gold-bring-into-japan"],
    scam: ["gold-scams"],
    fund: ["gold-in-offshore-plan"],
  },
  own: {},
  background: {},
  defaults: [
    { label: "金の特徴", slug: "gold-as-an-asset" },
    { label: "現物を買う", slug: "buy-physical-gold" },
    { label: "純金積立", slug: "gold-accumulation-plan" },
    { label: "売るときの税金", slug: "tax-on-selling-gold" },
    { label: "詐欺・トラブル", slug: "gold-scams" },
  ],
};

export const DOMAINS: Domain[] = [PLAN, BANK, GOLD];

export const KYC_SLUG = "kyc-documents";

// page.tsx が集めて渡す、記事のタイトルなど
export type ArticleInfo = { title: string; description: string };
export type ArticleMap = Record<string, ArticleInfo>;

const uniq = (xs: string[]) => [...new Set(xs)];

export function resolveArticles(d: Domain, provider: string | null, task: string | null): string[] {
  if (!provider && !task) return d.defaults.map((x) => x.slug);
  if (provider && !task) {
    const own = Object.values(d.own[provider] ?? {}).flat();
    return uniq([...own, ...(d.background[provider] ?? [])]);
  }
  if (!provider && task) {
    const fromProviders = d.common[task]?.length ? [] : Object.values(d.own).flatMap((m) => m[task] ?? []);
    return uniq([...(d.common[task] ?? []), ...fromProviders]);
  }
  return uniq([...(d.own[provider!]?.[task!] ?? []), ...(d.common[task!] ?? [])]);
}

// 会社を選んだときに出す手続き（記事がある手続きだけ）
export function availableTasks(d: Domain, provider: string | null, has: (slug: string) => boolean): Task[] {
  return d.tasks.filter((t) => resolveArticles(d, provider, t.id).some(has));
}

// すべての slug（page.tsx で存在確認に使う）
export function allNaviSlugs(): string[] {
  return uniq(
    DOMAINS.flatMap((d) => [
      ...Object.values(d.common).flat(),
      ...Object.values(d.own).flatMap((m) => Object.values(m).flat()),
      ...Object.values(d.background).flat(),
      ...d.defaults.map((x) => x.slug),
    ]).concat(KYC_SLUG)
  );
}
