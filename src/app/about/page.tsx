import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COMPANY: { label: string; value: string; href?: string; external?: boolean }[] = [
  { label: "サービス名", value: "IFAスイッチ（IFA Switch）" },
  { label: "サービス開始", value: "2015年" },
  { label: "資本金", value: "720,000 HKD" },
  { label: "事業内容", value: "ファイナンシャル教育及びサポート事業" },
  {
    label: "所在地",
    value: "9th floor, Amtel Building, 148 Des Voeux Rd Central, Central, Hong Kong",
  },
  { label: "メールアドレス", value: "ifa.switch@gmail.com", href: "mailto:ifa.switch@gmail.com" },
  { label: "ウェブサイト", value: "https://ifa-switch.com", href: "https://ifa-switch.com", external: true },
];

const DISCLAIMER = [
  {
    title: "情報提供について",
    body: "当サービスで提供する情報は、あくまで情報提供を目的としたものであり、特定の金融商品の売買や投資行動を推奨・勧誘するものではありません。",
  },
  {
    title: "投資助言について",
    body: "IFAスイッチ自身は投資助言業を行っておらず、投資判断に関する助言は行いません。個別のポートフォリオアドバイスは、提携するライセンス保有アドバイザーが提供します。投資に関する最終的な判断は、お客様ご自身の責任において行ってください。",
  },
  {
    title: "過去の実績について",
    body: "過去の運用実績は、将来の運用成果を保証するものではありません。投資には元本割れを含むリスクが伴います。",
  },
  {
    title: "専門家への相談",
    body: "投資判断にあたっては、必要に応じてファイナンシャルアドバイザー、税理士、弁護士等の専門家にご相談されることをおすすめします。当サービスの利用により生じた損害について、当社は一切の責任を負いかねます。",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink">
      {/* 見出し＋ミッション */}
      <section className="border-b border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 min-w-0">
            <p className="text-sm font-bold text-primary">会社概要</p>
            <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">
              国や言葉の垣根を超え、
              <br />
              誰もが自立してオカネを運用できる時代を創る
            </h1>
          </div>
          <div className="lg:col-span-7 min-w-0 lg:border-l lg:border-border lg:pl-12 text-[15px] leading-loose text-text-light">
            <p className="text-sm font-bold text-ink">私たちの使命</p>
            <p className="mt-3">
              IFAスイッチは、海外積み立て投資をしている方のためのサポートサービスを提供しています。
            </p>
            <p className="mt-4">
              海外積み立て投資を始めたものの、紹介者やIFAとの連絡が途絶えてしまい、自分の投資がどうなっているのか分からない。そんなお悩みを抱える方を一人でも減らしたい。IFAスイッチは、誰もが自分の投資を理解し、自らコントロールできるようサポートすることを使命としています。
            </p>
          </div>
        </div>
      </section>

      {/* 会社情報 */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">会社情報</h2>
            <p className="mt-3 text-sm text-text-light leading-relaxed">
              香港を拠点に、日本のお客様に向けたサービスを提供しています。
            </p>
          </div>
          <dl className="lg:col-span-8 min-w-0 border-t border-ink">
            {COMPANY.map((item) => (
              <div
                key={item.label}
                className="py-4 border-b border-border grid grid-cols-1 sm:grid-cols-[9rem_minmax(0,1fr)] gap-x-6 gap-y-1"
              >
                <dt className="text-sm text-text-light">{item.label}</dt>
                <dd className="text-[15px] leading-relaxed min-w-0 [overflow-wrap:anywhere]">
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-primary hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 免責条項 */}
      <section className="border-b border-border bg-paper-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">免責条項</h2>
          </div>
          <dl className="lg:col-span-8 min-w-0 border-t border-ink">
            {DISCLAIMER.map((d) => (
              <div key={d.title} className="py-5 border-b border-border">
                <dt className="font-bold">{d.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-light">{d.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">まずはお気軽にご相談ください</h2>
            <p className="mt-3 text-[15px] leading-loose text-text-light">
              IFAスイッチのサービスについてのご質問や、現在の投資状況についてのご相談など、お気軽にどうぞ。
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
              href="/service"
              className="flex items-center justify-between gap-3 border border-ink px-5 py-3.5 hover:bg-paper-2 transition-colors"
            >
              <span className="text-sm font-bold whitespace-nowrap">サービスの詳細を見る</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
