"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Star,
  CreditCard,
  ChevronDown,
  TrendingDown,
  PiggyBank,
  DollarSign,
  Calculator,
} from "lucide-react";

const faqItems = [
  {
    question: "途中で解約できますか？",
    answer:
      "はい、いつでも解約可能です。年額プランの場合も、お申し出いただいた月の翌月末で解約となります。違約金などは一切かかりません。",
  },
  {
    question: "相談回数に制限はありますか？",
    answer:
      "ありません。定額制なので、何度でもお気軽にご相談いただけます。メールでのご質問はもちろん、オンラインミーティングでの相談も回数制限なくご利用いただけます。",
  },
  {
    question: "支払い方法は何がありますか？",
    answer:
      "クレジットカード（Visa、Mastercard、American Express、JCB）でのお支払いとなります。決済にはStripeを使用しており、安全にお支払いいただけます。",
  },
  {
    question: "月額と年額、どちらがおすすめですか？",
    answer:
      "年額プランがおすすめです。月額プランと比較して年間で約10,000円お得になります。海外積み立て投資は長期的なサポートが重要ですので、年額プランでじっくりサポートをご利用いただくことをおすすめしています。",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-bg-gray transition-colors"
      >
        <span className="font-medium text-text pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-text-light shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-text-light text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary font-medium mb-4 text-sm tracking-wide">
            PRICING
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
            料金プラン
          </h1>
          <p className="text-text-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            シンプルな定額制。相談回数に制限なく、
            安心してサポートをご利用いただけます。
          </p>
        </div>
      </section>

      {/* Flat-rate emphasis */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent-dark px-5 py-2 rounded-full text-sm font-medium mb-6">
              <Check size={16} />
              相談回数に制限なし、定額制
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              わかりやすい料金体系
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              月額・年額のどちらかをお選びいただけます。
              どちらのプランでも、すべてのサポートをご利用いただけます。
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center">
                <h3 className="font-bold text-lg text-text mb-2">月額プラン</h3>
                <p className="text-text-light text-sm mb-6">
                  まずはお試しで始めたい方に
                </p>
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-bold text-text">
                    4,980
                  </span>
                  <span className="text-text-light text-lg ml-1">円/月</span>
                </div>
                <p className="text-text-light text-xs mb-8">（税込）</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "ポートフォリオサポート",
                  "お手続きサポート",
                  "相談回数無制限",
                  "メール・オンライン対応",
                  "いつでも解約可能",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-accent shrink-0" />
                    <span className="text-text-light">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                お問い合わせ
              </Link>
            </div>

            {/* Yearly */}
            <div className="bg-primary rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg">
              <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
                <Star size={12} />
                おすすめ
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">年額プラン</h3>
                <p className="text-white/80 text-sm mb-6">
                  長期的にサポートを受けたい方に
                </p>
                <div className="mb-2">
                  <span className="text-4xl sm:text-5xl font-bold">49,800</span>
                  <span className="text-white/80 text-lg ml-1">円/年</span>
                </div>
                <p className="text-white/60 text-sm mb-2">
                  月あたり <span className="text-white font-bold">4,150</span>円
                </p>
                <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-6">
                  <TrendingDown size={12} />
                  月額より年間 約10,000円お得
                </div>
                <p className="text-white/60 text-xs mb-8">（税込）</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "ポートフォリオサポート",
                  "お手続きサポート",
                  "相談回数無制限",
                  "メール・オンライン対応",
                  "いつでも解約可能",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-accent-light shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-white text-primary hover:bg-slate-50 px-8 py-3 rounded-full font-medium transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          {/* Payment method */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-text-light text-sm">
              <CreditCard size={16} />
              お支払いはStripeによるクレジットカード決済です
            </div>
          </div>
        </div>
      </section>

      {/* Cost Merit Simulation */}
      <section className="py-16 sm:py-20 bg-bg-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary-dark px-5 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator size={16} />
              コストシミュレーション
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              25年間のコスト比較
            </h2>
            <p className="text-text-light max-w-2xl mx-auto">
              一般的なIFAのアドバイザリーフィーとIFAスイッチの料金を
              25年間で比較してみましょう。
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* General IFA */}
              <div className="bg-white rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="text-slate-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text">一般的なIFA</h3>
                    <p className="text-text-light text-xs">アドバイザリーフィー</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-light text-sm">料金体系</span>
                    <span className="font-medium text-sm">時価評価額の約1%/年</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-light text-sm">計算例</span>
                    <span className="font-medium text-sm">
                      平均資産500万円の場合
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-text-light text-sm">年間コスト</span>
                    <span className="font-medium text-sm">約5万円〜</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-light text-sm">
                      25年間の合計
                    </span>
                    <span className="font-bold text-lg text-red-500">
                      約315万円
                    </span>
                  </div>
                </div>
                <p className="text-text-light text-xs mt-4 leading-relaxed">
                  ※資産の増加に伴いフィーも増加するため、実際の負担はさらに大きくなる可能性があります。
                </p>
              </div>

              {/* IFA Switch */}
              <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                  コスト削減
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <PiggyBank className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">IFAスイッチ</h3>
                    <p className="text-white/70 text-xs">定額制</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-white/80 text-sm">料金体系</span>
                    <span className="font-medium text-sm">年額 49,800円（定額）</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-white/80 text-sm">計算式</span>
                    <span className="font-medium text-sm">
                      49,800円 x 25年
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-white/80 text-sm">年間コスト</span>
                    <span className="font-medium text-sm">49,800円（固定）</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white/80 text-sm">
                      25年間の合計
                    </span>
                    <span className="font-bold text-lg">約125万円</span>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-4 leading-relaxed">
                  ※資産がいくら増えても料金は変わりません。
                </p>
              </div>
            </div>

            {/* Savings highlight */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border text-center">
              <p className="text-text-light text-sm mb-2">
                25年間のコストメリット
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                約190万円
              </p>
              <p className="text-text-light text-sm">
                の節約が見込めます（上記シミュレーションの場合）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              料金に関するよくあるご質問
            </h2>
            <p className="text-text-light">
              お客様からよくいただくご質問をまとめました
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
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
            料金プランについてのご質問や、サービスについて詳しく知りたい方は、
            お気軽にお問い合わせください。初回のご相談は無料です。
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
