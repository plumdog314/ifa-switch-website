import Link from "next/link";
import Image from "next/image";
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
  BookOpen,
  User,
  Building2,
  ArrowRightLeft,
  Mail,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero with background image */}
      <section className="relative min-h-[520px] sm:min-h-[600px] flex items-center">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 w-full">
          <div className="max-w-xl">
            <p className="text-primary-light font-medium mb-4 text-sm tracking-wide">
              海外積み立て投資をしている方へ
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              その投資の
              <br />
              <span className="text-primary">コントロール</span>を
              <br />
              取り戻す
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mb-10 leading-relaxed">
              IFAスイッチは、海外積み立て投資のポートフォリオ管理や
              各種手続きをサポートする定額制サービスです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                無料で相談する
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/service"
                className="border-2 border-white/60 text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                サービスを見る
              </Link>
            </div>
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

      {/* Before / After */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              IFAスイッチで変わること
            </h2>
            <p className="text-text-light">
              IFAを移管して、お客様がプロバイダーと直接やり取りできる体制へ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Before */}
            <div className="bg-red-50/60 rounded-2xl p-6 sm:p-8 border border-red-100">
              <h3 className="font-bold text-lg text-red-500 mb-6 text-center flex items-center justify-center gap-2">
                <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">Before</span>
                移管前
              </h3>
              <div className="bg-white rounded-xl p-6 sm:p-8">
                {/* Diagram */}
                <div className="flex flex-col items-center gap-5">
                  {/* お客様 */}
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-5 py-3 border border-slate-200">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <User size={20} className="text-slate-500" />
                    </div>
                    <span className="font-bold text-text">お客様</span>
                  </div>

                  {/* Arrow down */}
                  <div className="flex flex-col items-center text-red-300">
                    <svg width="20" height="32" viewBox="0 0 20 32"><path d="M10 0v24M4 20l6 8 6-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>

                  {/* IFA */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-red-100 rounded-xl px-5 py-3 border border-red-200">
                      <Building2 size={18} className="text-red-400" />
                      <span className="font-bold text-red-600 text-sm">IFA X社</span>
                    </div>
                    <div className="text-red-300 flex items-center gap-1">
                      <ArrowRightLeft size={16} />
                      <span className="text-xs text-red-400">移管</span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-100 rounded-xl px-5 py-3 border border-red-200">
                      <Building2 size={18} className="text-red-400" />
                      <span className="font-bold text-red-600 text-sm">IFA Y社</span>
                    </div>
                  </div>

                  {/* Arrow down */}
                  <div className="flex flex-col items-center text-red-300">
                    <svg width="20" height="32" viewBox="0 0 20 32"><path d="M10 0v24M4 20l6 8 6-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>

                  {/* Providers */}
                  <div className="w-full">
                    <p className="text-xs text-slate-400 text-center mb-2">商品プロバイダー</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {["Hansard", "RL360", "Investors Trust", "Friends Provident"].map((name) => (
                        <span key={name} className="bg-slate-100 text-slate-500 text-xs px-3 py-1.5 rounded-full border border-slate-200">
                          {name}
                        </span>
                      ))}
                      <span className="text-slate-400 text-xs px-2 py-1.5">など</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-text-light text-sm mt-5 text-center leading-relaxed">
                IFAを介してのやり取り。<br className="sm:hidden" />IFAと連絡が取れなくなると<span className="text-red-500 font-medium">コントロールを失います</span>。
              </p>
            </div>

            {/* After */}
            <div className="bg-blue-50/60 rounded-2xl p-6 sm:p-8 border border-blue-100">
              <h3 className="font-bold text-lg text-primary mb-6 text-center flex items-center justify-center gap-2">
                <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-full">After</span>
                移管後
              </h3>
              <div className="bg-white rounded-xl p-6 sm:p-8">
                {/* Diagram */}
                <div className="flex flex-col items-center gap-5">
                  {/* お客様 */}
                  <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-5 py-3 border border-blue-200">
                    <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                    <span className="font-bold text-text">お客様</span>
                  </div>

                  {/* Support icons row */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Mail size={16} />
                      <span className="text-xs font-medium">メール</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-primary">
                      <FileCheck size={16} />
                      <span className="text-xs font-medium">書類翻送</span>
                    </div>
                  </div>

                  {/* Arrow with label */}
                  <div className="flex items-center gap-4 w-full justify-center">
                    {/* IFA Switch support */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-primary text-white rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-sm">
                        <ShieldCheck size={18} />
                        <span className="font-bold text-sm">IFAスイッチ</span>
                      </div>
                      <span className="text-[11px] text-primary font-medium">サポート</span>
                    </div>

                    {/* Arrow */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex flex-col items-center text-primary">
                        <span className="text-[11px] font-medium text-primary mb-1">直接やり取り</span>
                        <svg width="100%" height="20" viewBox="0 0 120 20" className="w-full max-w-[120px]">
                          <path d="M0 10h108M102 4l8 6-8 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>

                    {/* Providers */}
                    <div>
                      <p className="text-xs text-slate-400 text-center mb-2">商品プロバイダー</p>
                      <div className="flex flex-col gap-1.5">
                        {["Hansard", "RL360", "Investors Trust"].map((name) => (
                          <span key={name} className="bg-primary/8 text-primary text-xs px-3 py-1 rounded-full border border-primary/15 text-center">
                            {name}
                          </span>
                        ))}
                        <span className="text-slate-400 text-[11px] text-center">ほか多数</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-text-light text-sm mt-5 text-center leading-relaxed">
                IFAスイッチのサポートのもと、お客様がプロバイダーと直接やり取り。<br className="sm:hidden" /><span className="text-primary font-medium">コントロールを取り戻します</span>。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 sm:py-20 bg-bg-gray">
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
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
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

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-border">
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
      <section className="py-16 sm:py-20">
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

      {/* eBook / Newsletter CTA */}
      <section className="py-16 sm:py-20 bg-bg-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="flex items-center justify-center p-8 bg-slate-50">
                <Image
                  src="/images/ebook.png"
                  alt="無料eBook: 海外投資における5つの誤解と真相、その対策"
                  width={280}
                  height={360}
                  className="rounded-lg shadow-lg"
                  unoptimized
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen size={20} className="text-primary" />
                  <span className="text-primary font-medium text-sm">無料eBook</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text mb-4">
                  海外投資における5つの誤解と真相、その対策
                </h3>
                <ul className="space-y-2 text-text-light text-sm mb-6">
                  <li>- IFAってすごい能力の持ち主なんでしょ？</li>
                  <li>- 年利10%はカタイって聞いたけど？</li>
                  <li>- 英語が分からなくても問題ないんでしょ？</li>
                  <li>- 積立は数年過ぎれば止められるんでしょ？</li>
                  <li>- とにかく長く契約すればいいんでしょ？</li>
                </ul>
                <p className="text-text-light text-sm mb-6">
                  無料ニュースレターにご登録いただくと、eBook（PDF）をプレゼント。
                  最新情報や推奨ポートフォリオなど、毎月お届けします。
                </p>
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2 self-start"
                >
                  無料で登録する
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA with background image */}
      <section className="relative py-20 sm:py-24">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
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
