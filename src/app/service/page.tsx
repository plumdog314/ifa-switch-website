import Link from "next/link";
import {
  TrendingUp,
  FileText,
  ArrowRight,
  ChevronRight,
  MessageSquare,
  Headphones,
  PlayCircle,
  CalendarCheck,
  BarChart3,
  CreditCard,
  MapPin,
  Languages,
  RefreshCw,
} from "lucide-react";

export default function ServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary font-medium mb-4 text-sm tracking-wide">
            SERVICE
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
            サービス紹介
          </h1>
          <p className="text-text-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            IFAスイッチは、海外積み立て投資をしている方のための
            ポートフォリオサポートとお手続きサポートを提供する定額制サービスです。
          </p>
        </div>
      </section>

      {/* Portfolio Support */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
                ポートフォリオサポート
              </h2>
              <p className="text-text-light leading-relaxed mb-8">
                現在の運用状況を一緒に確認し、お客様がご自身で投資のコントロールを取り戻せるようサポートします。
                ファンドの選び方やスイッチングの方法など、わかりやすくレクチャーいたします。
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: BarChart3,
                    title: "ポートフォリオの確認・アドバイス",
                    description:
                      "現在のファンド構成を確認し、お客様の投資方針に合ったポートフォリオについてアドバイスします。",
                  },
                  {
                    icon: RefreshCw,
                    title: "スイッチングのレクチャー",
                    description:
                      "ファンドの入れ替え（スイッチング）の方法をわかりやすくお伝えし、お客様自身で操作できるようサポートします。",
                  },
                  {
                    icon: BarChart3,
                    title: "運用レポートの解説",
                    description:
                      "プロバイダーから届く運用レポートの見方を丁寧に解説し、投資の現状を把握できるようにします。",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 bg-primary-light rounded-2xl p-5"
                  >
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-text mb-1">{item.title}</h3>
                      <p className="text-text-light text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary-light to-white rounded-2xl p-8 sm:p-10 border border-border">
              <h3 className="font-bold text-lg text-text mb-6">
                こんな方におすすめ
              </h3>
              <ul className="space-y-4">
                {[
                  "自分のポートフォリオが今どうなっているか分からない",
                  "スイッチングをしたいが、やり方が分からない",
                  "運用レポートが届いても、内容が理解できない",
                  "IFAに任せきりだったが、自分で判断できるようになりたい",
                  "ファンドの良し悪しを自分で判断できるようになりたい",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight
                      size={18}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="text-text-light text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Administrative Support */}
      <section className="py-16 sm:py-20 bg-bg-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-gradient-to-br from-accent-light to-white rounded-2xl p-8 sm:p-10 border border-border">
              <h3 className="font-bold text-lg text-text mb-6">
                こんな方におすすめ
              </h3>
              <ul className="space-y-4">
                {[
                  "クレジットカードの有効期限が切れて更新が必要",
                  "住所や連絡先が変わったが、変更手続きの仕方が分からない",
                  "プロバイダーから英語のレターが届いたが、内容が分からない",
                  "紹介者やIFAと連絡が取れず、手続きを頼める人がいない",
                  "減額や停止の手続きをしたいが、どうすればいいか分からない",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ChevronRight
                      size={18}
                      className="text-accent mt-0.5 shrink-0"
                    />
                    <span className="text-text-light text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 lg:order-2">
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6">
                <FileText className="text-white" size={28} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
                お手続きサポート
              </h2>
              <p className="text-text-light leading-relaxed mb-8">
                海外投資プランに関する各種手続きをサポートします。
                英語でのやり取りが必要な手続きも、日本語で丁寧にご案内いたします。
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: CreditCard,
                    title: "クレジットカードの変更手続き",
                    description:
                      "カードの有効期限切れや変更に伴う、プロバイダーへの届出手続きをサポートします。",
                  },
                  {
                    icon: MapPin,
                    title: "住所変更などの各種変更手続き",
                    description:
                      "住所・連絡先・受取人など、各種変更手続きのやり方をご案内します。",
                  },
                  {
                    icon: Languages,
                    title: "プロバイダーからのレターの解説",
                    description:
                      "英語で届くレターやメールの内容を日本語でわかりやすく解説し、必要な対応をお伝えします。",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 bg-accent-light rounded-2xl p-5"
                  >
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-text mb-1">{item.title}</h3>
                      <p className="text-text-light text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              ご利用の流れ
            </h2>
            <p className="text-text-light">
              4つのステップで、かんたんにスタートできます
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageSquare,
                step: "STEP 1",
                title: "お問い合わせ",
                description:
                  "お問い合わせフォームまたはメールでお気軽にご連絡ください。現在の状況やお悩みをお聞かせください。",
              },
              {
                icon: Headphones,
                step: "STEP 2",
                title: "ヒアリング",
                description:
                  "オンラインミーティングで、お客様の投資プランの詳細や現在の状況を詳しくお伺いします。",
              },
              {
                icon: PlayCircle,
                step: "STEP 3",
                title: "サポート開始",
                description:
                  "お申し込み後、すぐにサポートを開始します。ポートフォリオの確認や各種手続きをサポートします。",
              },
              {
                icon: CalendarCheck,
                step: "STEP 4",
                title: "定期フォロー",
                description:
                  "継続的にフォローアップを行い、ポートフォリオの状況確認や新たなご質問にお答えします。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border text-center relative"
              >
                <p className="text-primary text-xs font-bold tracking-widest mb-4">
                  {item.step}
                </p>
                <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  {item.description}
                </p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-primary" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            まずはお気軽にご相談ください
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            相談回数に制限はありません。現在の運用状況の確認から、
            手続きのサポートまで、どんなことでもお気軽にどうぞ。
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary hover:bg-slate-50 px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center gap-2"
          >
            無料で相談する
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
