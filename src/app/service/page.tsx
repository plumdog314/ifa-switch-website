import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLANS, SPOTS, yen } from "@/lib/plans";

const SUPPORT = PLANS.find((p) => p.id === "support")!;

const PORTFOLIO = [
  {
    title: "保有ファンドの見える化",
    description:
      "現在のファンド構成・費用・リスク区分を一覧にし、それぞれの意味を解説します。どのファンドを選ぶかはお客様ご自身で判断していただきます。",
  },
  {
    title: "ファンドの入れ替え方の説明",
    description:
      "ファンドの入れ替え（スイッチング）の操作方法をわかりやすくお伝えし、お客様自身で操作できるようサポートします。どのファンドに切り替えるかの判断はお伝えしません。",
  },
  {
    title: "運用レポートの解説",
    description:
      "保険会社から届く運用レポートの見方を丁寧に解説し、投資の現状を把握できるようにします。",
  },
  {
    title: "個別の資産配分のアドバイスのご案内",
    description:
      "個別のアドバイスをご希望の方には、IFAスイッチが窓口となり、提携するライセンス保有アドバイザーをご案内します（別料金）。",
  },
];

const PORTFOLIO_FOR = [
  "自分の資産の配分が今どうなっているか分からない",
  "スイッチングの操作方法が分からない",
  "運用レポートが届いても、内容が理解できない",
  "IFAに任せきりだったが、自分で状況を把握できるようになりたい",
  "ファンド資料の読み方を身につけたい",
];

const ADMIN = [
  {
    title: "クレジットカードの変更手続き",
    description: "カードの有効期限切れや変更に伴う、保険会社への届出手続きをサポートします。",
  },
  {
    title: "住所変更などの各種変更手続き",
    description: "住所・連絡先・受取人など、各種変更手続きのやり方をご案内します。",
  },
  {
    title: "保険会社から届いた英語の手紙の解説",
    description: "英語で届く手紙やメールの内容を日本語でわかりやすく解説し、必要な手続きをお伝えします。",
  },
];

const ADMIN_FOR = [
  "クレジットカードの有効期限が切れて更新が必要",
  "住所や連絡先が変わったが、変更手続きの仕方が分からない",
  "保険会社から英語の手紙が届いたが、内容が分からない",
  "紹介者やIFAと連絡が取れず、手続きを頼める人がいない",
  "減額や停止の手続きをしたいが、どうすればいいか分からない",
];

const FLOW = [
  {
    title: "お問い合わせ",
    description:
      "お問い合わせフォームまたはメールでお気軽にご連絡ください。現在の状況やお悩みをお聞かせください。",
  },
  {
    title: "お話を伺う",
    description: "オンラインミーティングで、お客様の投資プランの詳細や現在の状況を詳しくお伺いします。",
  },
  {
    title: "サポート開始",
    description:
      "お申し込み後、すぐにサポートを開始します。保有ファンドの確認や各種手続きをサポートします。",
  },
  {
    title: "定期フォロー",
    description: "継続的にフォローアップを行い、契約内容の状況確認や新たなご質問にお答えします。",
  },
];

function Dot() {
  return <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-primary" />;
}

function ServiceBlock({
  label,
  title,
  lead,
  items,
  audience,
  tone,
}: {
  label: string;
  title: string;
  lead: React.ReactNode;
  items: { title: string; description: string }[];
  audience: string[];
  tone?: "paper-2";
}) {
  return (
    <section className={`border-b border-border ${tone === "paper-2" ? "bg-paper-2" : ""}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 min-w-0">
          <p className="text-sm font-bold text-primary">{label}</p>
          <h2 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-snug">{title}</h2>
          <div className="mt-4 text-[15px] leading-loose text-text-light">{lead}</div>
        </div>
        <div className="lg:col-span-8 min-w-0">
          <ul className="border-t border-ink">
            {items.map((item, i) => (
              <li key={item.title} className="py-5 border-b border-border flex items-start gap-4">
                <span className="font-display font-extrabold text-primary text-lg tabular leading-7 w-7 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold leading-7">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-light">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display font-extrabold text-lg">こんな方に</h3>
          <ul className="mt-4 grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] gap-x-8 border-t border-border">
            {audience.map((a) => (
              <li key={a} className="py-3 border-b border-border text-[15px] leading-relaxed flex gap-3">
                <Dot />
                <span className="min-w-0">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function ServicePage() {
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-sm font-bold text-primary">サービス紹介</p>
          <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">
            英語の手続きも、
            <br className="hidden sm:block" />
            日本語で最後まで。
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-loose text-text-light">
            IFAスイッチは、海外積み立て投資をしている方のために、保有ファンドの見える化と各種手続きのサポートを提供しています。
          </p>
          <nav aria-label="このページの内容" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
            <a href="#portfolio" className="text-primary hover:underline whitespace-nowrap">保有ファンドの点検サポート →</a>
            <a href="#admin" className="text-primary hover:underline whitespace-nowrap">お手続きサポート →</a>
            <a href="#flow" className="text-primary hover:underline whitespace-nowrap">ご利用の流れ →</a>
          </nav>
        </div>
      </section>

      <div id="portfolio" className="scroll-mt-20">
        <ServiceBlock
          label="01"
          title="保有ファンドの点検サポート"
          lead={
            <>
              <p>
                現在の運用状況を一緒に確認し、お客様がご自身で投資の状況を把握し、コントロールできるようサポートします。ファンド資料の読み方やスイッチングの操作方法など、わかりやすくレクチャーいたします。
              </p>
              <p className="mt-4">
                IFAスイッチ自身は、特定のファンドの推奨や配分のご提案は行いません。個別の資産配分のアドバイスをご希望の方には、IFAスイッチが窓口となり、提携するライセンス保有アドバイザーによるアドバイスをご案内します（別料金・料金はお問い合わせください）。
              </p>
            </>
          }
          items={PORTFOLIO}
          audience={PORTFOLIO_FOR}
        />
      </div>

      <div id="admin" className="scroll-mt-20">
        <ServiceBlock
          label="02"
          title="お手続きサポート"
          lead={
            <p>
              海外投資プランに関する各種手続きをサポートします。英語でのやり取りが必要な手続きも、日本語で丁寧にご案内いたします。
            </p>
          }
          items={ADMIN}
          audience={ADMIN_FOR}
          tone="paper-2"
        />
      </div>

      {/* 料金の目安 */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">料金</h2>
            <p className="mt-4 text-[15px] leading-loose text-text-light">
              記事とAIチャットは無料です。手続きは、月額のサポートプランか、1回ごとの手続きサポートでお受けしています（いずれも税込）。
            </p>
          </div>
          <div className="lg:col-span-8 min-w-0">
            <dl className="border-t border-ink">
              <div className="py-5 border-b border-border grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1">
                <dt className="font-bold">サポートプラン</dt>
                <dd className="font-display font-extrabold text-xl tabular flex flex-wrap gap-x-4 gap-y-1">
                  <span className="whitespace-nowrap">
                    {yen(SUPPORT.price.monthly!)}
                    <span className="text-sm font-sans font-normal text-text-light">／月</span>
                  </span>
                  <span className="whitespace-nowrap">
                    {yen(SUPPORT.price.yearly!)}
                    <span className="text-sm font-sans font-normal text-text-light">／年</span>
                  </span>
                </dd>
              </div>
              {SPOTS.map((s) => (
                <div
                  key={s.id}
                  className="py-5 border-b border-border grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1"
                >
                  <dt className="min-w-0">
                    <span className="font-bold">1回ごとの手続きサポート：{s.name}</span>
                    <span className="block mt-1 text-sm text-text-light leading-relaxed">{s.examples}</span>
                  </dt>
                  <dd className="font-display font-extrabold text-xl tabular whitespace-nowrap">
                    {yen(s.price)}
                    <span className="text-sm font-sans font-normal text-text-light">／1回</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all whitespace-nowrap"
            >
              料金の詳細を見る <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ご利用の流れ */}
      <section id="flow" className="border-b border-border bg-paper-2 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">ご利用の流れ</h2>
          <p className="mt-2 text-sm text-text-light">4つのステップで、かんたんにスタートできます。</p>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))] border-t border-ink">
            {FLOW.map((item, i) => (
              <li
                key={item.title}
                className="py-6 border-b border-border min-w-0 md:pr-6"
              >
                <p className="text-xs font-bold text-primary tabular whitespace-nowrap">STEP {i + 1}</p>
                <h3 className="mt-2 font-display font-extrabold text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-light">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">まずはお気軽にご相談ください</h2>
            <p className="mt-3 text-[15px] leading-loose text-text-light">
              初回のご相談は無料です。現在の運用状況の確認から、手続きのサポートまで、どんなことでもお気軽にどうぞ。
            </p>
          </div>
          <div className="lg:col-span-5 min-w-0 flex flex-col gap-3">
            <Link
              href="/contact"
              className="flex items-center justify-between gap-3 bg-ink text-paper px-5 py-3.5 hover:bg-primary transition-colors"
            >
              <span className="text-sm font-bold whitespace-nowrap">無料で相談する</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/pricing"
              className="flex items-center justify-between gap-3 border border-ink px-5 py-3.5 hover:bg-paper-2 transition-colors"
            >
              <span className="text-sm font-bold whitespace-nowrap">料金を見る</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <p className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-text-light leading-relaxed">
        ※IFAスイッチは、特定の金融商品の勧誘や個別の投資助言を行うものではありません。個別のアドバイスは、提携するライセンス保有アドバイザーが提供します。
      </p>
    </div>
  );
}
