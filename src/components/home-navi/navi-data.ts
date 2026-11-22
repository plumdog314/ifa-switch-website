// 手続きナビの対応表。保険会社 × 手続き → 読むべき記事の slug。
// slug はすべて content/blog/ に存在するものだけを使う（page.tsx 側でも存在確認してから渡す）。

export type InsurerId = "rl360" | "hansard" | "friends" | "investors" | "other";
export type TaskId = "surrender" | "reduce" | "pause" | "withdraw" | "ifa" | "address" | "maturity";

export const INSURERS: { id: InsurerId; name: string }[] = [
  { id: "rl360", name: "RL360" },
  { id: "hansard", name: "ハンサード" },
  { id: "friends", name: "フレンズプロビデント" },
  { id: "investors", name: "インベスターズトラスト" },
  { id: "other", name: "その他の会社" },
];

// spot: スポット手続きのどちらが目安になるか（SPOTS の id）
export const TASKS: { id: TaskId; name: string; spot: "spot-basic" | "spot-complex" }[] = [
  { id: "surrender", name: "解約", spot: "spot-complex" },
  { id: "reduce", name: "減額", spot: "spot-complex" },
  { id: "pause", name: "一時停止", spot: "spot-complex" },
  { id: "withdraw", name: "一部引き出し", spot: "spot-complex" },
  { id: "ifa", name: "担当IFAの変更", spot: "spot-complex" },
  { id: "address", name: "住所・カード変更", spot: "spot-basic" },
  { id: "maturity", name: "満期の受け取り", spot: "spot-complex" },
];

// どの保険会社でも共通の記事
export const TASK_ARTICLES: Record<TaskId, string[]> = {
  surrender: ["before-surrender", "surrender-within-2-years", "want-to-quit-options", "tax-on-surrender"],
  reduce: ["reduce-contributions", "want-to-quit-options"],
  pause: ["pause-contributions", "want-to-quit-options"],
  withdraw: ["partial-withdrawal"],
  ifa: ["how-to-change-ifa", "ifa-transfer-penalty"],
  address: ["change-of-address", "update-credit-card"],
  maturity: ["maturity-payout", "tax-on-surrender"],
};

// 保険会社ごとの記事（手続き別）。ここにある記事は共通の記事より先に並べる。
export const INSURER_TASK_ARTICLES: Record<InsurerId, Partial<Record<TaskId, string[]>>> = {
  rl360: {
    surrender: ["rl360-surrender-procedure", "rl360-surrender-after-2-years"],
    withdraw: ["rl360-quantum"],
  },
  hansard: {
    surrender: ["hansard-surrender-procedure"],
    reduce: ["hansard-reduce-pause-cost"],
    pause: ["hansard-reduce-pause-cost"],
    address: ["hansard-online-account"],
  },
  friends: {
    surrender: ["friends-provident-surrender-procedure", "friends-surrender-value", "friends-policy-document"],
    maturity: ["friends-policy-document"],
  },
  investors: {
    surrender: ["investors-trust-surrender-procedure"],
  },
  other: {
    withdraw: ["standard-life-procedures"],
    ifa: ["standard-life-procedures"],
    address: ["standard-life-procedures"],
  },
};

// 保険会社そのものの解説（手続きを選んでいないときと、最後の「会社について」に使う）
export const INSURER_BACKGROUND: Record<InsurerId, string[]> = {
  rl360: ["what-is-rl360", "rl360-quantum"],
  hansard: ["what-is-hansard", "hansard-online-account"],
  friends: ["what-is-friends-provident", "friends-policy-document"],
  investors: ["what-is-investors-trust", "investors-trust-sp500"],
  other: ["standard-life-procedures", "generali-plan-basics"],
};

// 何も選んでいないとき（JavaScript が動かないときも）に出す、手続きごとの基本の記事
export const DEFAULT_ARTICLES: { task: string; slug: string }[] = [
  { task: "解約", slug: "before-surrender" },
  { task: "減額", slug: "reduce-contributions" },
  { task: "一時停止", slug: "pause-contributions" },
  { task: "一部引き出し", slug: "partial-withdrawal" },
  { task: "担当IFAの変更", slug: "how-to-change-ifa" },
  { task: "住所の変更", slug: "change-of-address" },
  { task: "カードの変更", slug: "update-credit-card" },
  { task: "満期の受け取り", slug: "maturity-payout" },
];

export const KYC_SLUG = "kyc-documents";

// page.tsx が集めて渡す、記事のタイトルなど
export type ArticleInfo = { title: string; description: string };
export type ArticleMap = Record<string, ArticleInfo>;

const uniq = (xs: string[]) => [...new Set(xs)];

export function resolveArticles(insurer: InsurerId | null, task: TaskId | null): string[] {
  if (!insurer && !task) return DEFAULT_ARTICLES.map((d) => d.slug);
  if (insurer && !task) {
    const own = INSURER_TASK_ARTICLES[insurer];
    return uniq([...(own.surrender ?? []), ...INSURER_BACKGROUND[insurer]]);
  }
  if (!insurer && task) return TASK_ARTICLES[task];
  const own = INSURER_TASK_ARTICLES[insurer!][task!] ?? [];
  return uniq([...own, ...TASK_ARTICLES[task!]]);
}

// すべての slug（page.tsx で存在確認に使う）
export function allNaviSlugs(): string[] {
  return uniq([
    ...Object.values(TASK_ARTICLES).flat(),
    ...Object.values(INSURER_TASK_ARTICLES).flatMap((m) => Object.values(m).flat() as string[]),
    ...Object.values(INSURER_BACKGROUND).flat(),
    ...DEFAULT_ARTICLES.map((d) => d.slug),
    KYC_SLUG,
  ]);
}
