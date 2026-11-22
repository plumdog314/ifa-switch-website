"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";

export type SearchItem = { slug: string; title: string; text: string; meta: string };

// 記事の検索。タイトル・説明・タグ・会社名から、スペース区切りの言葉をすべて含む記事に絞り込む。
export default function BlogSearch({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");
  const words = q.trim().toLowerCase().split(/[\s　]+/).filter(Boolean);
  const hits = useMemo(
    () => (words.length ? items.filter((it) => words.every((w) => it.text.includes(w))) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, items]
  );

  return (
    <div>
      <label htmlFor="blog-q" className="text-lg font-bold text-[var(--nv-navy)]">
        言葉で探す
      </label>
      <div className="mt-3 flex items-center gap-2 rounded-lg border-2 border-[var(--nv-navy)] bg-white px-3">
        <Search size={20} aria-hidden className="shrink-0 text-[var(--nv-navy)]" />
        <input
          id="blog-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="例：HSBC 送金、RL360 解約、相続、確定申告"
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-[var(--nv-navy)] placeholder:text-[var(--nv-muted)] focus:outline-none"
        />
      </div>
      {words.length > 0 && (
        <div className="mt-3">
          <p aria-live="polite" className="text-sm text-[var(--nv-muted)]">
            {hits.length ? `${hits.length}本の記事が見つかりました。` : "見つかりませんでした。言葉を変えるか、下の一覧から探してください。"}
          </p>
          {hits.length > 0 && (
            <ul className="mt-2 max-h-[28rem] overflow-y-auto divide-y divide-[var(--nv-line)] rounded-md border border-[var(--nv-line)] bg-white">
              {hits.map((h) => (
                <li key={h.slug}>
                  <Link href={`/blog/${h.slug}`} className="group flex items-start gap-3 px-4 py-3 hover:bg-[var(--nv-soft)]">
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold leading-relaxed text-[var(--nv-navy)] group-hover:underline underline-offset-4">
                        {h.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--nv-muted)]">{h.meta}</span>
                    </span>
                    <ArrowRight size={16} aria-hidden className="mt-1.5 shrink-0 text-[var(--nv-muted)]" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
