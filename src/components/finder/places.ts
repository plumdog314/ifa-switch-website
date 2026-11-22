// 地球儀に出す場所。記事で扱っている保険会社・銀行の、契約を引き受けている会社・口座のある場所。
// provider の id は home-navi/navi-data.ts の providers と同じものを使う（押すとナビでその会社が選ばれる）。
export type PlaceEntry = { domain: "plan" | "bank"; provider: string; name: string };
export type Place = { id: string; name: string; location: [number, number]; entries: PlaceEntry[] };

export const JAPAN: [number, number] = [35.68, 139.69];

export const PLACES: Place[] = [
  {
    id: "iom",
    name: "マン島",
    location: [54.23, -4.55],
    entries: [
      { domain: "plan", provider: "rl360", name: "RL360" },
      { domain: "plan", provider: "hansard", name: "ハンサード" },
      { domain: "plan", provider: "friends", name: "フレンズプロビデント" },
      { domain: "plan", provider: "zurich", name: "チューリッヒ" },
      { domain: "plan", provider: "utmost", name: "ユートモスト" },
    ],
  },
  {
    id: "guernsey",
    name: "ガーンジー",
    location: [49.45, -2.58],
    entries: [{ domain: "plan", provider: "utmost", name: "ユートモスト（旧ジェネラリ）" }],
  },
  {
    id: "dublin",
    name: "ダブリン",
    location: [53.35, -6.26],
    entries: [{ domain: "plan", provider: "standard-life", name: "スタンダードライフ" }],
  },
  {
    id: "cayman",
    name: "ケイマン諸島",
    location: [19.31, -81.25],
    entries: [{ domain: "plan", provider: "investors", name: "インベスターズトラスト" }],
  },
  {
    id: "hk",
    name: "香港",
    location: [22.32, 114.17],
    entries: [
      { domain: "bank", provider: "hsbc", name: "HSBC" },
      { domain: "bank", provider: "standard-chartered-hk", name: "スタンダードチャータード" },
      { domain: "bank", provider: "hang-seng", name: "ハンセン銀行" },
      { domain: "bank", provider: "bochk", name: "中国銀行（香港）" },
      { domain: "bank", provider: "citibank-hk", name: "シティバンク（香港）" },
      { domain: "plan", provider: "sun-life", name: "サンライフ" },
      { domain: "plan", provider: "ftlife", name: "周大福人壽（旧FTLife）" },
      { domain: "plan", provider: "hsbc-life", name: "HSBC Life" },
      { domain: "plan", provider: "standard-life", name: "スタンダードライフ（香港）" },
    ],
  },
  {
    id: "sg",
    name: "シンガポール",
    location: [1.35, 103.82],
    entries: [
      { domain: "bank", provider: "dbs-sg", name: "DBS" },
      { domain: "bank", provider: "ocbc-sg", name: "OCBC" },
      { domain: "bank", provider: "uob-sg", name: "UOB" },
      { domain: "bank", provider: "citibank-sg", name: "シティバンク（シンガポール）" },
    ],
  },
];

export const FINDER_SELECT = "finder:select";
export type FinderSelect = { domain: "plan" | "bank"; provider: string };
