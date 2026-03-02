import Link from "next/link";
import {
  TrendingUp,
  FileText,
  ArrowRight,
  AlertCircle,
  PhoneOff,
  HelpCircle,
  PiggyBank,
  ChevronRight,
  DollarSign,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary font-medium mb-4 text-sm tracking-wide">
            海外積み立て投資をしている方へ
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
            その投資の
            <br className="sm:hidden" />
            <span className="text-primary">コントロール</span>を
            <br />
            取り戻す
          </h1>
          <p className="text-text-light text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            IFAスイッチは、海外積み立て投資のポートフォリオ管理や
            各種手続きをサポートする定額制サービスです。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              無料で相談する
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/service"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              サービスを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-16 sm:py-20 bg-bg-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              こんな事でお困りではありませんか？
            </h2>
            <p className="text-text-light">
              多くの方が同じ悩みを抱えています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: HelpCircle,
                title: "投資の状況がわからない",
                description:
                  "数年前に始めた積み立て投資がどうなっているか、運用状況が把握できていない。",
              },
              {
                icon: PhoneOff,
                title: "紹介者・IFAと連絡が取れない",
                description:
                  "当初の紹介者やIFAと連絡が取れなくなり、相談先がなくなってしまった。",
              },
              {
                icon: AlertCircle,
                title: "聞いていた話と違う",
                description:
                  "運用リターンなどが当初IFAが言っていた内容と異なり、不安を感じている。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="text-red-400" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-lg font-medium text-text">
            自分の投資を<span className="text-primary">コントロールできていない</span>
            状態になっていませんか？
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              IFAスイッチにできること
            </h2>
            <p className="text-text-light">
              あなたの海外投資のコントロールを取り戻します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-light rounded-2xl p-8">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-4">ポートフォリオサポート</h3>
              <ul className="space-y-3 text-text-light">
                {[
                  "今のポートフォリオの確認・アドバイス",
                  "スイッチングのやり方をレクチャー",
                  "運用レポートの見方を解説",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight
                      size={18}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-accent-light rounded-2xl p-8">
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-xl mb-4">お手続きサポート</h3>
              <ul className="space-y-3 text-text-light">
                {[
                  "クレジットカードの変更手続き",
                  "住所変更などの各種変更手続き",
                  "プロバイダーからのレターの解説",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight
                      size={18}
                      className="text-accent mt-0.5 shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/service"
              className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors"
            >
              サービスの詳細を見る
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Merit */}
      <section className="py-16 sm:py-20 bg-bg-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              コストメリット
            </h2>
            <p className="text-text-light">
              定額制だから、長く続けるほどお得です
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-border text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-slate-400" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-text-light">
                一般的なIFA
              </h3>
              <p className="text-sm text-text-light mb-4">アドバイザリーフィー</p>
              <p className="text-2xl font-bold text-text">
                時価評価額の<span className="text-red-500">約1%</span>
              </p>
              <p className="text-xs text-text-light mt-2">
                ※資産が増えるとフィーも増加
              </p>
            </div>

            <div className="bg-primary rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                おすすめ
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">IFAスイッチ</h3>
              <p className="text-sm text-white/80 mb-4">定額制</p>
              <p className="text-2xl font-bold">
                年間 <span className="text-3xl">49,800</span>円
              </p>
              <p className="text-xs text-white/80 mt-2">
                ※資産が増えてもずっと定額
              </p>
            </div>
          </div>

          <p className="text-center mt-8 text-text-light text-sm">
            25年間で<span className="text-primary font-bold text-base">約190万円</span>
            のコストメリット
          </p>

          <div className="text-center mt-6">
            <Link
              href="/pricing"
              className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-1 transition-colors"
            >
              料金の詳細を見る
              <ArrowRight size={16} />
            </Link>
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
            運用状況がわからない、紹介者と連絡が取れない、
            本当に利益が出るのか不安...どんなことでもお気軽にどうぞ。
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
