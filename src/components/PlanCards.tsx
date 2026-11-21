"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";
import { PLANS, yen, type Billing } from "@/lib/plans";

export default function PlanCards() {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <div>
      <div role="radiogroup" aria-label="お支払いの単位" className="inline-flex border border-ink">
        {(["yearly", "monthly"] as const).map((b) => (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={billing === b}
            onClick={() => setBilling(b)}
            className={`px-5 py-2 text-sm whitespace-nowrap transition-colors ${
              billing === b ? "bg-ink text-paper font-bold" : "text-ink hover:bg-paper-2"
            }`}
          >
            {b === "yearly" ? "年払い（2か月分おトク）" : "月払い"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[repeat(3,minmax(0,1fr))] border-t border-ink">
        {PLANS.map((plan, i) => {
          const price = plan.price[billing];
          const link = plan.links[billing];
          const featured = plan.id === "support";
          return (
            <section
              key={plan.id}
              aria-labelledby={`plan-${plan.id}`}
              className={`flex flex-col py-8 border-b border-border lg:px-8 ${i === 0 ? "lg:pl-0" : ""} ${
                i < PLANS.length - 1 ? "lg:border-r" : "lg:pr-0"
              } ${featured ? "lg:bg-paper-2 lg:-mt-px lg:border-t-4 lg:border-t-primary" : ""}`}
            >
              <div className="flex items-center gap-3">
                <h3 id={`plan-${plan.id}`} className="font-display font-extrabold text-2xl">
                  {plan.name}
                </h3>
                {plan.status === "coming-soon" && (
                  <span className="text-xs border border-text-light text-text-light px-2 py-0.5">準備中</span>
                )}
                {featured && <span className="text-xs bg-primary text-paper px-2 py-0.5">いちばん選ばれています</span>}
              </div>
              <p className="mt-2 text-sm text-text-light leading-relaxed min-h-[2.75rem]">{plan.lead}</p>

              <p className="mt-5 flex items-baseline gap-1">
                <span className="font-display font-extrabold text-4xl tabular">
                  {price === 0 ? "0円" : price != null ? yen(price) : "—"}
                </span>
                {price !== 0 && (
                  <span className="text-sm text-text-light">／{billing === "yearly" ? "年" : "月"}（税込）</span>
                )}
              </p>
              {price !== 0 && price != null && billing === "yearly" && (
                <p className="mt-1 text-xs text-text-light tabular">月あたり約{yen(Math.round(price / 12))}</p>
              )}

              <ul className="mt-6 flex-1 border-t border-border">
                {plan.includes.map((item) => (
                  <li key={item} className="py-3 border-b border-border text-sm leading-relaxed flex gap-3">
                    <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {plan.note && <p className="mt-4 text-xs text-text-light leading-relaxed">{plan.note}</p>}

              <div className="mt-6">
                {plan.id === "free" ? (
                  <Link
                    href="/chat"
                    className="flex items-center justify-between gap-3 border border-ink px-5 py-3.5 text-sm font-bold hover:bg-paper-2 transition-colors"
                  >
                    <span className="whitespace-nowrap">AIチャットを使ってみる</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : plan.status === "available" && link ? (
                  <a
                    href={link}
                    onClick={() => track("checkout_click", { plan: plan.id, billing, price })}
                    className="flex items-center justify-between gap-3 bg-ink text-paper px-5 py-3.5 text-sm font-bold hover:bg-primary transition-colors"
                  >
                    <span className="whitespace-nowrap">{plan.name}プランに申し込む</span>
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="flex items-center justify-center border border-border px-5 py-3.5 text-sm text-text-light cursor-not-allowed"
                  >
                    {plan.status === "coming-soon" ? "公開までお待ちください" : "まもなく受付開始"}
                  </span>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
