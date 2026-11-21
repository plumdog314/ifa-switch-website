import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlanCards from "@/components/PlanCards";
import { SPOTS, BILLING_PORTAL_URL, yen } from "@/lib/plans";

const FAQ = [
  {
    q: "サポートプランの「メール回答」では、どこまで相談できますか？",
    a: "保険会社の手続きの進め方、届いた英文書類の意味、オンライン口座の見方、記入する書類の確認などをお手伝いします。特定のファンドの売買・乗り換え・配分・解約の判断はお伝えしていません。個別のポートフォリオアドバイスをご希望の場合は、提携するライセンス保有アドバイザーをご案内します（別料金）。",
  },
  {
    q: "スポット手続きでは、何をしてもらえますか？",
    a: "お申し込み後、担当者からご連絡し、手続きに必要な書類の確認、英文の記入方法、提出先と提出の流れを、完了までご案内します。書類への署名と提出はご本人にお願いしています。",
  },
  {
    q: "途中で解約できますか？",
    a: "いつでも解約できます。解約は、その時点の契約期間（月払いは1か月、年払いは1年）の終わりで終了し、それ以降の請求は発生しません。期間途中の日割り返金はございません。違約金はかかりません。",
  },
  {
    q: "支払い方法は何がありますか？",
    a: "クレジットカード（Visa、Mastercard、American Express、JCB）です。決済はStripeで行い、カード情報が当社に保存されることはありません。",
  },
  {
    q: "今、年額49,800円で契約しています。どうなりますか？",
    a: "次回の更新時に、サポートプランの年払い（29,800円）へ切り替えます。移行の特典として、スポット手続き2回分を無料にします。切り替えの方法は、更新前に個別にご案内します。",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-sm font-bold text-primary">料金</p>
          <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">
            必要なときに、必要な分だけ。
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-loose text-text-light">
            記事とAIチャットは無料でお使いいただけます。英語の手続きを人に相談しながら進めたいときは、月額のサポートプランか、1回ごとのスポット手続きをお選びください。
          </p>
          <div className="mt-10">
            <PlanCards />
          </div>
        </div>
      </section>

      {/* スポット手続き */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">スポット手続き（1回ごと）</h2>
          <p className="mt-2 text-sm text-text-light leading-relaxed">
            会員にならなくても、手続き1件からご依頼いただけます。書類の確認から提出までを、日本語でご案内します。サポート会員の方は30%引きです（会員向けのクーポンコードをお送りします）。
          </p>
          <ul className="mt-8 border-t border-ink">
            {SPOTS.map((s) => (
              <li key={s.id} className="py-6 border-b border-border grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 min-w-0">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="mt-1 text-sm text-text-light leading-relaxed">{s.examples}</p>
                </div>
                <p className="md:col-span-2 font-display font-extrabold text-2xl tabular whitespace-nowrap">
                  {yen(s.price)}
                  <span className="ml-1 text-xs font-sans font-normal text-text-light">税込</span>
                </p>
                <div className="md:col-span-3">
                  {s.link ? (
                    <a
                      href={s.link}
                      className="flex items-center justify-between gap-3 border border-ink px-5 py-3 text-sm font-bold hover:bg-ink hover:text-paper transition-colors"
                    >
                      <span className="whitespace-nowrap">この手続きを依頼する</span>
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <span className="flex items-center justify-center border border-border px-5 py-3 text-sm text-text-light">
                      まもなく受付開始
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-text-light leading-relaxed">
            どちらに当てはまるか分からない場合は、<Link href="/contact" className="underline">お問い合わせ</Link>
            からご相談ください。お申し込み後、2営業日以内に担当者からメールでご連絡します。
          </p>
        </div>
      </section>

      {/* 個別アドバイス */}
      <section className="border-b border-border bg-paper-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">個別のポートフォリオアドバイス</h2>
          </div>
          <div className="lg:col-span-7 min-w-0 text-[15px] leading-loose text-text-light">
            <p>
              IFAスイッチ自身は、特定のファンドの売買・乗り換え・配分・解約の判断はお伝えしていません。個別のアドバイスをご希望の方には、IFAスイッチが窓口となり、提携するライセンス保有アドバイザーをご案内します。料金は内容によって異なりますので、お問い合わせください。
            </p>
            <Link href="/contact" className="mt-4 inline-flex items-center gap-2 font-bold text-primary hover:underline">
              個別アドバイスについて問い合わせる <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">料金についてのよくある質問</h2>
          <dl className="mt-8 border-t border-ink">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-3">
                <dt className="lg:col-span-5 font-bold leading-relaxed">{f.q}</dt>
                <dd className="lg:col-span-7 text-[15px] leading-loose text-text-light">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-text-light leading-relaxed">
            お支払いと解約の条件は
            <Link href="/legal/tokushoho" className="underline">特定商取引法に基づく表記</Link>
            をご覧ください。
            {BILLING_PORTAL_URL && (
              <>
                ご契約中の方は、
                <a href={BILLING_PORTAL_URL} className="underline">
                  こちらから契約内容の確認・カードの変更・解約
                </a>
                ができます。
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}
