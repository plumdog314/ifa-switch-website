// 地球儀に出す場所。記事で扱っている保険会社・銀行の、契約を引き受けている会社・口座のある場所。
// provider の id は home-navi/navi-data.ts の providers と同じものを使う（押すとナビでその会社が選ばれる）。
import { companyShortName } from "@/lib/company-names";

export type PlaceEntry = { domain: "plan" | "bank"; provider: string; name: string };
export type Place = { id: string; name: string; location: [number, number]; entries: PlaceEntry[] };

export const JAPAN: [number, number] = [35.68, 139.69];

export const PLACES: Place[] = [
  {
    id: "iom",
    name: "マン島",
    location: [54.23, -4.55],
    entries: [
      { domain: "plan", provider: "rl360", name: companyShortName("rl360") },
      { domain: "plan", provider: "hansard", name: companyShortName("hansard") },
      { domain: "plan", provider: "friends", name: companyShortName("friends") },
      { domain: "plan", provider: "zurich", name: companyShortName("zurich") },
      { domain: "plan", provider: "utmost", name: companyShortName("utmost") },
    ],
  },
  {
    id: "guernsey",
    name: "ガーンジー",
    location: [49.45, -2.58],
    entries: [{ domain: "plan", provider: "utmost", name: companyShortName("utmost") }],
  },
  {
    id: "dublin",
    name: "ダブリン",
    location: [53.35, -6.26],
    entries: [{ domain: "plan", provider: "standard-life", name: companyShortName("standard-life") }],
  },
  {
    id: "cayman",
    name: "ケイマン諸島",
    location: [19.31, -81.25],
    entries: [{ domain: "plan", provider: "investors", name: companyShortName("investors") }],
  },
  {
    id: "hk",
    name: "香港",
    location: [22.32, 114.17],
    entries: [
      { domain: "bank", provider: "hsbc", name: companyShortName("hsbc") },
      { domain: "bank", provider: "standard-chartered-hk", name: companyShortName("standard-chartered-hk") },
      { domain: "bank", provider: "hang-seng", name: companyShortName("hang-seng") },
      { domain: "bank", provider: "bochk", name: companyShortName("bochk") },
      { domain: "bank", provider: "citibank-hk", name: companyShortName("citibank-hk") },
      { domain: "plan", provider: "sun-life", name: companyShortName("sun-life") },
      { domain: "plan", provider: "ftlife", name: companyShortName("ftlife") },
      { domain: "plan", provider: "hsbc-life", name: companyShortName("hsbc-life") },
      { domain: "plan", provider: "standard-life", name: companyShortName("standard-life") },
    ],
  },
  {
    id: "sg",
    name: "シンガポール",
    location: [1.35, 103.82],
    entries: [
      { domain: "bank", provider: "dbs-sg", name: companyShortName("dbs-sg") },
      { domain: "bank", provider: "ocbc-sg", name: companyShortName("ocbc-sg") },
      { domain: "bank", provider: "uob-sg", name: companyShortName("uob-sg") },
      { domain: "bank", provider: "citibank-sg", name: companyShortName("citibank-sg") },
    ],
  },
];

export const FINDER_SELECT = "finder:select";
export type FinderSelect = { domain: "plan" | "bank"; provider: string };
