"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileText, MessageSquare, Check } from "lucide-react";
import ProcedureNavigator from "@/components/home-navi/ProcedureNavigator";
import type { ArticleMap } from "@/components/home-navi/navi-data";

export type ThemeBlock = {
  id: string;
  name: string;
  lead: string;
  count: number;
  items: { slug: string; title: string }[];
};

// トップページの入り口。まず「困っていること」を選び、
// 「手続きをしたい」のときだけ、持っているもの（会社・銀行・金）と手続きで絞り込むナビを出す。
export default function HomeFinder({ articles, themes }: { articles: ArticleMap; themes: ThemeBlock[] }) {
  const [themeId, setThemeId] = useState<string>("procedures");
  const theme = themes.find((t) => t.id === themeId)!;

  return (
    <div className="space-y-6">
      <section role="group" aria-labelledby="finder-themes">
        <h2 id="finder-themes" className="text-lg font-bold text-[var(--nv-navy)]">
          困っていることを選ぶ
        </h2>
        <div className="mt-3 grid grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-2">
          {themes.map((t) => {
            const on = t.id === themeId;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => setThemeId(t.id)}
                className={`min-w-0 rounded-lg border px-3 py-3 text-left transition-colors ${
                  on
                    ? "border-[var(--nv-navy)] bg-[var(--nv-navy)] text-white"
                    : "border-[var(--nv-line-strong)] bg-white text-[var(--nv-navy)] hover:border-[var(--nv-navy)] hover:bg-[var(--nv-soft)]"
                }`}
              >
                <span className="flex items-center gap-1.5 text-[15px] font-bold leading-snug [overflow-wrap:anywhere]">
                  {on && <Check size={15} strokeWidth={3} aria-hidden className="shrink-0" />}
                  {t.name}
                </span>
                <span
                  className={`mt-1 hidden sm:block text-xs leading-relaxed ${on ? "text-white/80" : "text-[var(--nv-muted)]"}`}
                >
                  {t.lead}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {themeId === "procedures" ? (
        <ProcedureNavigator articles={articles} />
      ) : (
        <section
          aria-labelledby="finder-result"
          className="rounded-xl border border-[var(--nv-line)] bg-white p-4 sm:p-6 lg:p-8 shadow-[0_1px_2px_rgba(15,42,74,0.06)]"
        >
          <h2 id="finder-result" className="text-lg font-bold text-[var(--nv-navy)]">
            {theme.name}
          </h2>
          <p aria-live="polite" className="mt-1 text-sm text-[var(--nv-muted)]">
            {theme.lead}。関係する記事は{theme.count}本あります。
          </p>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] gap-5">
            <div className="min-w-0">
              <ul className="divide-y divide-[var(--nv-line)] rounded-md border border-[var(--nv-line)]">
                {theme.items.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/blog/${a.slug}`} className="group flex items-start gap-3 px-4 py-3.5 hover:bg-[var(--nv-soft)]">
                      <FileText size={18} aria-hidden className="mt-0.5 shrink-0 text-[var(--nv-navy)]" />
                      <span className="min-w-0 flex-1 font-bold leading-relaxed text-[var(--nv-navy)] group-hover:underline underline-offset-4">
                        {a.title}
                      </span>
                      <ArrowRight size={16} aria-hidden className="mt-1 shrink-0 text-[var(--nv-muted)]" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/blog/theme/${theme.id}`}
                className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--nv-navy)] underline underline-offset-4 hover:no-underline"
              >
                「{theme.name}」の記事をすべて見る（{theme.count}本） <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
            <aside className="min-w-0 flex flex-col gap-3" aria-label="質問する">
              <p className="text-xs font-bold tracking-wide text-[var(--nv-muted)]">記事で見つからないとき</p>
              <Link
                href="/chat"
                className="flex items-center gap-3 rounded-md bg-[var(--nv-navy)] px-4 py-3.5 text-white hover:bg-[var(--nv-navy-2)]"
              >
                <MessageSquare size={18} aria-hidden className="shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold whitespace-nowrap">AIチャットで質問する</span>
                  <span className="block text-xs text-white/80">無料・その場で回答</span>
                </span>
                <ArrowRight size={16} aria-hidden className="shrink-0" />
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-3 rounded-md border border-[var(--nv-line-strong)] bg-white px-4 py-3.5 text-[var(--nv-navy)] hover:border-[var(--nv-navy)]"
              >
                <span className="min-w-0 flex-1 text-sm font-bold whitespace-nowrap">記事を検索する</span>
                <ArrowRight size={16} aria-hidden className="shrink-0" />
              </Link>
            </aside>
          </div>
        </section>
      )}
    </div>
  );
}
