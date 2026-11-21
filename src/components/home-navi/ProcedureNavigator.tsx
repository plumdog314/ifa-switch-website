"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileText, MessageSquare, RotateCcw, Check } from "lucide-react";
import { SPOTS, yen } from "@/lib/plans";
import {
  INSURERS,
  TASKS,
  DEFAULT_ARTICLES,
  INSURER_BACKGROUND,
  KYC_SLUG,
  resolveArticles,
  type ArticleMap,
  type InsurerId,
  type TaskId,
} from "./navi-data";

// 手続きナビ本体。選択はページ内の状態だけで切り替える（再読み込みなし）。
// JavaScript が動かないときは、選択前の「手続きごとの基本の記事」がそのままリンクとして読める。

function StepBadge({ n, done }: { n: number; done: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular ${
        done ? "bg-[var(--nv-navy)] text-white" : "border-2 border-[var(--nv-navy)] text-[var(--nv-navy)] bg-white"
      }`}
    >
      {done ? <Check size={15} strokeWidth={3} /> : n}
    </span>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-4 py-2.5 text-sm font-bold transition-colors ${
        pressed
          ? "border-[var(--nv-navy)] bg-[var(--nv-navy)] text-white"
          : "border-[var(--nv-line-strong)] bg-white text-[var(--nv-navy)] hover:border-[var(--nv-navy)] hover:bg-[var(--nv-soft)]"
      }`}
    >
      {pressed && <Check size={14} strokeWidth={3} aria-hidden />}
      {children}
    </button>
  );
}

export default function ProcedureNavigator({ articles }: { articles: ArticleMap }) {
  const [insurer, setInsurer] = useState<InsurerId | null>(null);
  const [task, setTask] = useState<TaskId | null>(null);

  const insurerName = INSURERS.find((i) => i.id === insurer)?.name;
  const taskDef = TASKS.find((t) => t.id === task);
  const slugs = resolveArticles(insurer, task).filter((s) => articles[s]);
  const background =
    insurer && task ? INSURER_BACKGROUND[insurer].filter((s) => articles[s] && !slugs.includes(s)) : [];
  const defaultLabels = Object.fromEntries(DEFAULT_ARTICLES.map((d) => [d.slug, d.task]));
  const isDefault = !insurer && !task;
  const recommendedSpot = taskDef?.spot;

  const heading = insurer && taskDef
    ? `${insurerName}の${taskDef.name}`
    : insurerName
      ? `${insurerName}の手続き`
      : taskDef
        ? `${taskDef.name}の手続き（保険会社共通）`
        : "手続きごとの基本の記事";

  const status = isDefault
    ? "保険会社と手続きを選ぶと、関係する記事に絞り込みます。"
    : `${heading}に関係する記事を${slugs.length}本表示しています。`;

  return (
    <div className="rounded-xl border border-[var(--nv-line)] bg-white shadow-[0_1px_2px_rgba(15,42,74,0.06)]">
      {/* 進み具合 */}
      <ol className="grid grid-cols-[repeat(3,minmax(0,1fr))] border-b border-[var(--nv-line)] text-xs sm:text-sm">
        {[
          { n: 1, label: "保険会社", done: !!insurer },
          { n: 2, label: "手続き", done: !!task },
          { n: 3, label: "読む記事", done: !!insurer && !!task },
        ].map((s, i) => (
          <li
            key={s.n}
            className={`flex items-center justify-center gap-2 px-2 py-3 ${i > 0 ? "border-l border-[var(--nv-line)]" : ""} ${
              s.done ? "bg-[var(--nv-soft)] text-[var(--nv-navy)] font-bold" : "text-[var(--nv-muted)]"
            }`}
          >
            <span className="tabular" aria-hidden>{["①", "②", "③"][i]}</span>
            <span className="whitespace-nowrap">{s.label}</span>
            {s.done && <span className="sr-only">（選択済み）</span>}
          </li>
        ))}
      </ol>

      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* ① 保険会社 */}
        <section role="group" aria-labelledby="navi-step1">
          <h2 id="navi-step1" className="flex items-center gap-3 text-lg font-bold text-[var(--nv-navy)]">
            <StepBadge n={1} done={!!insurer} />
            保険会社を選ぶ
          </h2>
          <div className="mt-4 flex flex-wrap gap-2 sm:pl-10">
            {INSURERS.map((i) => (
              <Chip key={i.id} pressed={insurer === i.id} onClick={() => setInsurer(insurer === i.id ? null : i.id)}>
                {i.name}
              </Chip>
            ))}
          </div>
        </section>

        {/* ② 手続き */}
        <section role="group" aria-labelledby="navi-step2">
          <h2 id="navi-step2" className="flex items-center gap-3 text-lg font-bold text-[var(--nv-navy)]">
            <StepBadge n={2} done={!!task} />
            手続きを選ぶ
          </h2>
          <div className="mt-4 flex flex-wrap gap-2 sm:pl-10">
            {TASKS.map((t) => (
              <Chip key={t.id} pressed={task === t.id} onClick={() => setTask(task === t.id ? null : t.id)}>
                {t.name}
              </Chip>
            ))}
          </div>
        </section>

        {/* ③ 結果 */}
        <section aria-labelledby="navi-step3" className="rounded-lg bg-[var(--nv-bg)] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="navi-step3" className="flex items-center gap-3 text-lg font-bold text-[var(--nv-navy)] min-w-0">
              <StepBadge n={3} done={!!insurer && !!task} />
              <span className="min-w-0 [overflow-wrap:anywhere]">{heading}</span>
            </h2>
            {!isDefault && (
              <button
                type="button"
                onClick={() => {
                  setInsurer(null);
                  setTask(null);
                }}
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--nv-navy)] underline underline-offset-4 hover:no-underline"
              >
                <RotateCcw size={14} aria-hidden /> 選び直す
              </button>
            )}
          </div>
          <p aria-live="polite" className="mt-2 text-sm text-[var(--nv-muted)] sm:pl-10">
            {status}
          </p>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] gap-5">
            {/* 記事 */}
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-wide text-[var(--nv-muted)]">手続きの解説記事</p>
              <ul className="mt-2 divide-y divide-[var(--nv-line)] rounded-md border border-[var(--nv-line)] bg-white">
                {slugs.map((s) => (
                  <li key={s}>
                    <Link href={`/blog/${s}`} className="group flex items-start gap-3 px-4 py-3.5 hover:bg-[var(--nv-soft)]">
                      <FileText size={18} aria-hidden className="mt-0.5 shrink-0 text-[var(--nv-navy)]" />
                      <span className="min-w-0 flex-1">
                        {isDefault && defaultLabels[s] && (
                          <span className="block text-xs font-bold text-[var(--nv-muted)]">{defaultLabels[s]}</span>
                        )}
                        <span className="block font-bold leading-relaxed text-[var(--nv-navy)] group-hover:underline underline-offset-4">
                          {articles[s].title}
                        </span>
                      </span>
                      <ArrowRight size={16} aria-hidden className="mt-1 shrink-0 text-[var(--nv-muted)]" />
                    </Link>
                  </li>
                ))}
              </ul>

              {background.length > 0 && (
                <>
                  <p className="mt-5 text-xs font-bold tracking-wide text-[var(--nv-muted)]">{insurerName}について</p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {background.map((s) => (
                      <li key={s}>
                        <Link
                          href={`/blog/${s}`}
                          className="text-sm text-[var(--nv-navy)] underline underline-offset-4 hover:no-underline"
                        >
                          {articles[s].title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {articles[KYC_SLUG] && (
                <Link
                  href={`/blog/${KYC_SLUG}`}
                  className="mt-5 flex items-start gap-3 rounded-md border border-dashed border-[var(--nv-line-strong)] bg-white px-4 py-3.5 hover:border-[var(--nv-navy)]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-[var(--nv-muted)]">必要になりがちな書類</span>
                    <span className="block mt-0.5 font-bold leading-relaxed text-[var(--nv-navy)]">
                      {articles[KYC_SLUG].title}
                    </span>
                  </span>
                  <ArrowRight size={16} aria-hidden className="mt-1 shrink-0 text-[var(--nv-muted)]" />
                </Link>
              )}
            </div>

            {/* 有料・無料の手助け */}
            <aside className="min-w-0 flex flex-col gap-3" aria-label="手続きの手伝い">
              <p className="text-xs font-bold tracking-wide text-[var(--nv-muted)]">自分で進めるのが難しいとき</p>
              <div className="rounded-md border border-[var(--nv-line)] bg-white p-4">
                <p className="font-bold text-[var(--nv-navy)]">スポット手続き</p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--nv-muted)]">
                  書類の書き方から提出まで、1件ずつ日本語でお手伝いします。
                </p>
                <ul className="mt-3 divide-y divide-[var(--nv-line)] border-y border-[var(--nv-line)]">
                  {SPOTS.map((sp) => {
                    const match = recommendedSpot === sp.id;
                    return (
                      <li key={sp.id} className="flex items-baseline justify-between gap-3 py-2.5">
                        <span className="min-w-0 text-sm text-[var(--nv-navy)]">
                          <span className={match ? "font-bold" : ""}>{sp.name}</span>
                          {match && (
                            <span className="ml-2 inline-block whitespace-nowrap rounded bg-[var(--nv-navy)] px-1.5 py-0.5 text-[11px] font-bold text-white align-middle">
                              この手続き
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 whitespace-nowrap text-sm font-bold tabular text-[var(--nv-navy)]">
                          {yen(sp.price)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/pricing#spot"
                  className="mt-3 inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[var(--nv-navy)] underline underline-offset-4 hover:no-underline"
                >
                  内容と申し込み方法 <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
              <Link
                href="/chat"
                className="flex items-center gap-3 rounded-md bg-[var(--nv-navy)] px-4 py-3.5 text-white hover:bg-[var(--nv-navy-2)]"
              >
                <MessageSquare size={18} aria-hidden className="shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold whitespace-nowrap">AIチャットで質問する</span>
                  <span className="block text-xs text-white/80">無料・手続きの疑問にその場で回答</span>
                </span>
                <ArrowRight size={16} aria-hidden className="shrink-0" />
              </Link>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
