// 料金プランと申込みリンク（Stripe Payment Links）の一元管理。
// link が null のプランは「準備中」として表示され、申し込めない。

export type Billing = "monthly" | "yearly";

export type Plan = {
  id: "free" | "lite" | "support";
  name: string;
  lead: string;
  price: Record<Billing, number | null>;
  links: Record<Billing, string | null>;
  includes: string[];
  status: "available" | "coming-soon";
  note?: string;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "無料",
    lead: "まずは記事とAIチャットで、今の状況を整理したい方に",
    price: { monthly: 0, yearly: 0 },
    links: { monthly: null, yearly: null },
    includes: [
      "毎日の市況レポートと、100本以上の解説記事",
      "AIチャット（1日20問まで）",
      "毎週土曜のニュースレター",
      "初回のご相談（メール）",
    ],
    status: "available",
  },
  {
    id: "lite",
    name: "ライト",
    lead: "AIと手続きガイドで、自分で進めたい方に",
    price: { monthly: 980, yearly: 9800 },
    // 会員機能は Vercel の環境変数（docs/members-setup.md）に依存する。
    // 価格ID: 月 price_1Ue8ovA8BpLOBDx9QbiwXUzq ／ 年 price_1Ue8pVA8BpLOBDx96ygSvYvX
    links: {
      monthly: "https://buy.stripe.com/6oUaEWcbz3qEcK8dNu8bS05",
      yearly: "https://buy.stripe.com/8x2aEW1wV4uIaC038Q8bS06",
    },
    includes: [
      "AIチャットを会員枠で利用（1日50問まで）",
      "保険会社別の詳しい手続きガイド",
      "英文レターのひな形集（住所変更・明細の請求など）",
    ],
    status: "available",
    note: "お支払いが終わると、そのまま会員ページが開きます。別の端末で読みたいときは ifa.switch@gmail.com までご連絡ください。",
  },
  {
    id: "support",
    name: "サポート",
    lead: "英語の手続きを、人に相談しながら進めたい方に",
    price: { monthly: 2980, yearly: 29800 },
    links: {
      monthly: "https://buy.stripe.com/4gM3cu6RfgdqbG45gY8bS01",
      yearly: "https://buy.stripe.com/aFaeVcb7vaT69xW24M8bS02",
    },
    includes: [
      "担当者によるメール回答（月3件まで・原則2営業日以内）",
      "保険会社から届いた英文の書類・レターの翻訳と解説",
      "年1回、契約内容と手続きの棚卸し（30分・オンライン）",
      "スポット手続きが30%引き",
      "無料プランの内容すべて",
    ],
    status: "available",
  },
];

export type Spot = { id: string; name: string; price: number; examples: string; link: string | null };

export const SPOTS: Spot[] = [
  {
    id: "spot-basic",
    name: "かんたんな手続き",
    price: 9800,
    examples: "住所・連絡先の変更、クレジットカードの更新、運用明細や証券の取り寄せ など",
    link: "https://buy.stripe.com/6oU28qdfDe5i5hGdNu8bS03",
  },
  {
    id: "spot-complex",
    name: "複雑な手続き",
    price: 19800,
    examples: "減額・一時停止、一部引き出し、解約、満期の受け取り、担当IFAの変更 など",
    link: "https://buy.stripe.com/8x2bJ0fnL9P26lKgZG8bS04",
  },
];

// Stripe のカスタマーポータル（契約の確認・カード変更・解約）
export const BILLING_PORTAL_URL: string | null = "https://billing.stripe.com/p/login/00w6oGdfDd1edOc7p68bS00";

export const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;
