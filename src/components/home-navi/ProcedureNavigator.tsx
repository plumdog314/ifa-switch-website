"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, FileText, MessageSquare, RotateCcw, Check } from "lucide-react";
import { SPOTS, yen } from "@/lib/plans";
import { DOMAINS, KYC_SLUG, resolveArticles, availableTasks, type ArticleMap, type Domain } from "./navi-data";

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

export default function ProcedureNavigator({
  articles,
  preset,
}: {
  articles: ArticleMap;
  preset?: { domain: Domain["id"]; provider: string; n: number } | null;
}) {
  const [domainId, setDomainId] = useState<Domain["id"]>("plan");
  const [insurer, setInsurer] = useState<string | null>(null);
  const [task, setTask] = useState<string | null>(null);

  // 地球儀などから会社を指定されたとき（描画中に一度だけ反映する）
  const [seenPreset, setSeenPreset] = useState<number | null>(null);
  if (preset && preset.n !== seenPreset) {
    setSeenPreset(preset.n);
    setDomainId(preset.domain);
    setInsurer(preset.provider);
    setTask(null);
  }

  const domain = DOMAINS.find((d) => d.id === domainId)!;
  const has = (s: string) => !!articles[s];
  const hasProviders = domain.providers.length > 0;
  const tasks = availableTasks(domain, insurer, has);
  const insurerName = domain.providers.find((i) => i.id === insurer)?.name;
  const taskDef = domain.tasks.find((t) => t.id === task);
  const slugs = resolveArticles(domain, insurer, task).filter(has);
  const background =
    insurer && task ? (domain.background[insurer] ?? []).filter((s) => has(s) && !slugs.includes(s)) : [];
  const defaultLabels = Object.fromEntries(domain.defaults.map((d) => [d.slug, d.label]));
  const isDefault = !insurer && !task;
  const recommendedSpot = domain.spot ? taskDef?.spot : undefined;
  const pickDomain = (id: Domain["id"]) => {
    setDomainId(id);
    setInsurer(null);
    setTask(null);
  };
  const pickInsurer = (id: string) => {
    const next = insurer === id ? null : id;
    setInsurer(next);
    if (task && !availableTasks(domain, next, has).some((t) => t.id === task)) setTask(null);
  };

  const heading = insurer && taskDef
    ? `${insurerName}の${taskDef.name}`
    : insurerName
      ? `${insurerName}の手続き`
      : taskDef
        ? hasProviders
          ? `${taskDef.name}（${domain.providerLabel}共通）`
          : taskDef.name
        : `${domain.name}の基本の記事`;

  const status = isDefault
    ? hasProviders
      ? `${domain.providerLabel}と手続きを選ぶと、関係する記事に絞り込みます。`
      : "知りたいことを選ぶと、関係する記事に絞り込みます。"
    : `${heading}に関係する記事を${slugs.length}本表示しています。`;
  const steps = hasProviders
    ? [
        { label: domain.providerLabel!, done: !!insurer },
        { label: "手続き", done: !!task },
        { label: "読む記事", done: !!insurer && !!task },
      ]
    : [
        { label: "知りたいこと", done: !!task },
        { label: "読む記事", done: !!task },
      ];

  return (
    <div className="rounded-xl border border-[var(--nv-line)] bg-white shadow-[0_1px_2px_rgba(15,42,74,0.06)]">
      {/* 進み具合 */}
      {/* 分野 */}
      <div role="group" aria-label="持っているものを選ぶ" className="grid grid-cols-[repeat(3,minmax(0,1fr))] border-b border-[var(--nv-line)]">
        {DOMAINS.map((d, i) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={domainId === d.id}
            onClick={() => pickDomain(d.id)}
            className={`px-1 sm:px-2 py-3.5 text-[12px] min-[375px]:text-[13px] sm:text-base font-bold whitespace-nowrap ${i > 0 ? "border-l border-[var(--nv-line)]" : ""} ${
              domainId === d.id
                ? "bg-[var(--nv-navy)] text-white"
                : "bg-white text-[var(--nv-navy)] hover:bg-[var(--nv-soft)]"
            } ${i === 0 ? "rounded-tl-xl" : ""} ${i === DOMAINS.length - 1 ? "rounded-tr-xl" : ""}`}
          >
            {d.name}
          </button>
        ))}
      </div>
      <ol
        className={`grid ${steps.length === 3 ? "grid-cols-[repeat(3,minmax(0,1fr))]" : "grid-cols-[repeat(2,minmax(0,1fr))]"} border-b border-[var(--nv-line)] text-xs sm:text-sm`}
      >
        {steps.map((s, i) => (
          <li
            key={s.label}
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
        {/* ① 会社 */}
        {hasProviders && (
          <section role="group" aria-labelledby="navi-step1">
            <h2 id="navi-step1" className="flex items-center gap-3 text-lg font-bold text-[var(--nv-navy)]">
              <StepBadge n={1} done={!!insurer} />
              {domain.providerLabel}を選ぶ
            </h2>
            <div className="mt-4 flex flex-wrap gap-2 sm:pl-10">
              {domain.providers.map((i) => (
                <Chip key={i.id} pressed={insurer === i.id} onClick={() => pickInsurer(i.id)}>
                  {i.name}
                </Chip>
              ))}
            </div>
          </section>
        )}

        {/* ② 手続き */}
        <section role="group" aria-labelledby="navi-step2">
          <h2 id="navi-step2" className="flex items-center gap-3 text-lg font-bold text-[var(--nv-navy)]">
            <StepBadge n={hasProviders ? 2 : 1} done={!!task} />
            {hasProviders ? "手続きを選ぶ" : "知りたいことを選ぶ"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2 sm:pl-10">
            {tasks.map((t) => (
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
              <StepBadge n={hasProviders ? 3 : 2} done={hasProviders ? !!insurer && !!task : !!task} />
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
              <p className="text-xs font-bold tracking-wide text-[var(--nv-muted)]">解説記事</p>
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

              {domain.id === "plan" && articles[KYC_SLUG] && (
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
              {domain.spot && (
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
              )}
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
