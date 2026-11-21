import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqData } from "@/data/faq";

export default function FaqPage() {
  const categories = Array.from(new Set(faqData.map((item) => item.category)));

  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-sm font-bold text-primary">FAQ</p>
          <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">よくあるご質問</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-loose text-text-light">
            IFAスイッチのサービスについて、お客様からよくいただくご質問をまとめました。
          </p>
          <nav aria-label="質問の分類" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
            {categories.map((c, i) => (
              <a key={c} href={`#faq-${i + 1}`} className="text-primary hover:underline whitespace-nowrap">
                {c} →
              </a>
            ))}
          </nav>
        </div>
      </section>

      {categories.map((category, ci) => {
        const items = faqData.filter((item) => item.category === category);
        return (
          <section
            key={category}
            id={`faq-${ci + 1}`}
            className={`border-b border-border scroll-mt-20 ${ci % 2 === 1 ? "bg-paper-2" : ""}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4 min-w-0">
                <p className="font-display font-extrabold text-primary text-lg tabular">
                  {String(ci + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl leading-snug">{category}</h2>
              </div>
              <dl className="lg:col-span-8 min-w-0 border-t border-ink">
                {items.map((item) => (
                  <div key={item.question} className="py-6 border-b border-border">
                    <dt className="font-bold leading-relaxed flex gap-3">
                      <span aria-hidden className="font-display font-extrabold text-primary shrink-0">Q</span>
                      <span className="min-w-0">{item.question}</span>
                    </dt>
                    <dd className="mt-3 text-[15px] leading-loose text-text-light flex gap-3">
                      <span aria-hidden className="font-display font-extrabold text-ink shrink-0">A</span>
                      <span className="min-w-0">{item.answer}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">まだ疑問が解決しませんか？</h2>
            <p className="mt-3 text-[15px] leading-loose text-text-light">
              こちらに掲載されていないご質問がございましたら、お気軽にお問い合わせください。丁寧にお答えいたします。
            </p>
          </div>
          <div className="lg:col-span-5 min-w-0 flex flex-col gap-3">
            <Link
              href="/contact"
              className="flex items-center justify-between gap-3 bg-ink text-paper px-5 py-3.5 hover:bg-primary transition-colors"
            >
              <span className="text-sm font-bold whitespace-nowrap">お問い合わせはこちら</span>
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
    </div>
  );
}
