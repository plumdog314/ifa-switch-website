import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Globe,
  Building2,
  AlertTriangle,
} from "lucide-react";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="ABOUT"
        title="会社概要"
        description="IFAスイッチは、海外積み立て投資をしている方のためのサポートサービスを提供しています。"
        illustration="about"
      />

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-light to-accent-light rounded-2xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" size={32} />
              </div>
              <p className="text-primary font-medium text-sm tracking-wide mb-4">
                OUR MISSION
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text mb-6 leading-relaxed">
                国や言葉の垣根を超え、
                <br />
                誰もが自立してオカネを
                <br className="sm:hidden" />
                運用できる時代を創る
              </h2>
              <p className="text-text-light leading-relaxed max-w-2xl mx-auto">
                海外積み立て投資を始めたものの、紹介者やIFAとの連絡が途絶えてしまい、
                自分の投資がどうなっているのか分からない。そんなお悩みを抱える方を
                一人でも減らしたい。IFAスイッチは、誰もが自分の投資を理解し、
                自らコントロールできるようサポートすることを使命としています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16 sm:py-20 bg-bg-gray">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="w-14 h-14 bg-primary-light rounded-xl flex items-center justify-center mx-auto mb-6">
              <Building2 className="text-primary" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              会社情報
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <tbody>
                {[
                  {
                    label: "サービス名",
                    value: "IFAスイッチ（IFA Switch）",
                  },
                  {
                    label: "サービス開始",
                    value: "2015年",
                  },
                  {
                    label: "資本金",
                    value: "720,000 HKD",
                  },
                  {
                    label: "事業内容",
                    value: "ファイナンシャル教育及びサポート事業",
                  },
                  {
                    label: "所在地",
                    value:
                      "9th floor, Amtel Building, 148 Des Voeux Rd Central, Central, Hong Kong",
                  },
                  {
                    label: "メールアドレス",
                    value: "ifa.switch@gmail.com",
                  },
                  {
                    label: "ウェブサイト",
                    value: "https://ifa-switch.com",
                  },
                ].map((item, i) => (
                  <tr
                    key={i}
                    className={
                      i < 6 ? "border-b border-border" : ""
                    }
                  >
                    <th className="text-left text-sm font-medium text-text-light bg-bg-gray px-6 py-4 w-1/3 align-top">
                      {item.label}
                    </th>
                    <td className="text-sm text-text px-6 py-4">
                      {item.label === "メールアドレス" ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="text-primary hover:text-primary-dark transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : item.label === "ウェブサイト" ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="max-w-3xl mx-auto mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-text-light text-sm">
              <Globe size={16} />
              香港を拠点に、日本のお客様に向けたサービスを提供しています
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-amber-500" size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-text">
                免責条項
              </h2>
            </div>

            <div className="bg-bg-gray rounded-2xl p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-medium text-text text-sm mb-2">
                  情報提供について
                </h3>
                <p className="text-text-light text-sm leading-relaxed">
                  当サービスで提供する情報は、あくまで情報提供を目的としたものであり、
                  特定の金融商品の売買や投資行動を推奨・勧誘するものではありません。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-text text-sm mb-2">
                  投資助言について
                </h3>
                <p className="text-text-light text-sm leading-relaxed">
                  当サービスは投資助言業ではなく、投資判断に関する助言を行うものではありません。
                  投資に関する最終的な判断は、お客様ご自身の責任において行ってください。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-text text-sm mb-2">
                  過去の実績について
                </h3>
                <p className="text-text-light text-sm leading-relaxed">
                  過去の運用実績は、将来の運用成果を保証するものではありません。
                  投資には元本割れを含むリスクが伴います。
                </p>
              </div>

              <div>
                <h3 className="font-medium text-text text-sm mb-2">
                  専門家への相談
                </h3>
                <p className="text-text-light text-sm leading-relaxed">
                  投資判断にあたっては、必要に応じてファイナンシャルアドバイザー、
                  税理士、弁護士等の専門家にご相談されることをおすすめします。
                  当サービスの利用により生じた損害について、当社は一切の責任を負いかねます。
                </p>
              </div>
            </div>
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
            IFAスイッチのサービスについてのご質問や、
            現在の投資状況についてのご相談など、お気軽にどうぞ。
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
