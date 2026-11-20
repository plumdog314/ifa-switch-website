export const SITE = {
  url: "https://www.ifa-switch.com",
  name: "IFAスイッチ",
  nameEn: "IFA Switch",
  tagline: "その投資のコントロールを取り戻す",
  description:
    "IFAスイッチは、海外積み立て投資（RL360、インベスターズトラスト、フレンズプロビデント等）をしている方のための教育・サポートサービスです。相場の暴落に振り回されない長期投資の考え方と、ポートフォリオ管理・各種手続きをお手伝いします。",
  email: "ifa.switch@gmail.com",
  foundingYear: "2015",
  address: {
    streetAddress: "9th floor, Amtel Building, 148 Des Voeux Rd Central",
    addressLocality: "Central",
    addressRegion: "Hong Kong",
    addressCountry: "HK",
  },
  logo: "/images/logo-icon.png",
  ogImage: "/images/hero.jpg",
  // 記事の著者・監修者。実名・経歴を入れるとE-E-A-T評価が上がる。
  author: {
    name: "IFAスイッチ編集部",
    url: "/about",
    description:
      "2015年から香港を拠点に、海外積み立て投資をしている日本人投資家のサポートを続けている編集チーム。",
  },
} as const;

export const absUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;
