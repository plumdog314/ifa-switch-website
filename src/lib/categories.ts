export type Category = {
  slug: string;
  name: string;
  description: string;
};

// 記事の frontmatter `category` にはここの slug を書く
export const categories: Category[] = [
  {
    slug: "basics",
    name: "投資の基礎知識",
    description: "海外積み立て投資の仕組み、手数料、為替、税金など、始める前・続ける前に押さえておきたい基礎知識。",
  },
  {
    slug: "long-term",
    name: "暴落に負けない長期投資",
    description: "株価の暴落や指数の急落に振り回されないための、長期・分散・積立の考え方と行動のルール。",
  },
  {
    slug: "portfolio",
    name: "ポートフォリオ",
    description: "ファンドの選び方、配分の見直し、リバランスのタイミングなど、ポートフォリオ管理の実践。",
  },
  {
    slug: "products",
    name: "商品・保険会社別ガイド",
    description: "RL360、インベスターズトラスト、フレンズプロビデント、ハンサード等、プラン別の特徴と注意点。",
  },
  {
    slug: "procedures",
    name: "手続き・トラブル対応",
    description: "IFA変更、減額・停止、解約、引き出し、住所変更など、各種手続きとよくあるトラブルの対処法。",
  },
  {
    slug: "ifa",
    name: "IFAについて",
    description: "IFA（独立系ファイナンシャルアドバイザー）の役割、選び方、乗り換えの判断基準。",
  },
  {
    slug: "tax",
    name: "税金・確定申告",
    description: "海外投資の利益にかかる日本の税金、確定申告、満期・解約時の課税の考え方。",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
