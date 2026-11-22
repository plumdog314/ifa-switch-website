// 会社名の表記。契約者が手元の書類で見るのは英語の社名なので、英語を先に出し、日本語の説明を添える。
// ナビ・記事を探す画面・地球儀は、すべてここから名前を取る（表記をそろえるため）。
// id は home-navi/navi-data.ts の providers の id と同じ。
type Name = { en: string; ja?: string; region?: string };

export const COMPANY_NAMES: Record<string, Name> = {
  rl360: { en: "RL360" },
  hansard: { en: "Hansard", ja: "ハンサード" },
  friends: { en: "Friends Provident", ja: "フレンズプロビデント" },
  investors: { en: "Investors Trust", ja: "インベスターズトラスト" },
  "standard-life": { en: "Standard Life", ja: "スタンダードライフ" },
  zurich: { en: "Zurich", ja: "チューリッヒ" },
  utmost: { en: "Utmost", ja: "旧ジェネラリ・旧スカンディアなど" },
  "sun-life": { en: "Sun Life", ja: "サンライフ", region: "香港" },
  ftlife: { en: "CTF Life", ja: "周大福人壽・旧FTLife" },
  "hsbc-life": { en: "HSBC Life" },
  hsbc: { en: "HSBC", region: "香港" },
  "standard-chartered-hk": { en: "Standard Chartered", ja: "スタンダードチャータード", region: "香港" },
  "hang-seng": { en: "Hang Seng Bank", ja: "ハンセン銀行" },
  bochk: { en: "Bank of China (Hong Kong)", ja: "中国銀行・香港" },
  "citibank-hk": { en: "Citibank", ja: "シティバンク", region: "香港" },
  "dbs-sg": { en: "DBS", region: "シンガポール" },
  "ocbc-sg": { en: "OCBC", region: "シンガポール" },
  "uob-sg": { en: "UOB", region: "シンガポール" },
  "citibank-sg": { en: "Citibank", ja: "シティバンク", region: "シンガポール" },
};

const fmt = (en: string, parts: (string | undefined)[]) => {
  const p = parts.filter(Boolean);
  return p.length ? `${en}（${p.join("・")}）` : en;
};

// 例：「Sun Life（サンライフ・香港）」
export const companyName = (id: string) => {
  const n = COMPANY_NAMES[id];
  return n ? fmt(n.en, [n.ja, n.region]) : id;
};

// 場所がわかっている画面で使う短い名前。例：「Sun Life（サンライフ）」
export const companyShortName = (id: string) => {
  const n = COMPANY_NAMES[id];
  return n ? fmt(n.en, [n.ja]) : id;
};
