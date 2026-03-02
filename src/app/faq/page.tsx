"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { faqData } from "@/data/faq";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(faqData.map((item) => item.category)));

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let globalIndex = 0;

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            よくあるご質問
          </h1>
          <p className="text-text-light text-base sm:text-lg max-w-2xl mx-auto">
            IFAスイッチのサービスについて、お客様からよくいただくご質問をまとめました。
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {categories.map((category) => {
            const categoryItems = faqData.filter(
              (item) => item.category === category
            );

            return (
              <div key={category} className="mb-12 last:mb-0">
                <h2 className="text-xl sm:text-2xl font-bold text-text mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  {category}
                </h2>

                <div className="space-y-3">
                  {categoryItems.map((item) => {
                    const currentIndex = globalIndex++;
                    const isOpen = openIndex === currentIndex;

                    return (
                      <div
                        key={currentIndex}
                        className="bg-white rounded-2xl border border-border overflow-hidden transition-shadow hover:shadow-sm"
                      >
                        <button
                          onClick={() => toggle(currentIndex)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                        >
                          <span className="font-medium text-text text-sm sm:text-base">
                            {item.question}
                          </span>
                          <ChevronDown
                            size={20}
                            className={`text-text-light shrink-0 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-300 ${
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="px-6 pb-5 text-text-light text-sm leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            まだ疑問が解決しませんか？
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            こちらに掲載されていないご質問がございましたら、
            お気軽にお問い合わせください。丁寧にお答えいたします。
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary hover:bg-slate-50 px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center gap-2"
          >
            お問い合わせはこちら
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
