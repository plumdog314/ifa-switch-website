import Link from "next/link";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";

export type TroubleChoiceProps = {
  label: string;
  hint: string;
  answer: string;
  articles: { slug: string; title: string }[];
  spot?: { name: string; price: string };
};

// お困りごと1件。タップすると答えになる記事（と、必要ならスポット手続き）が開く。
// <details> を使うので JavaScript なしでも開閉でき、キーボードでも操作できる。
export default function TroubleChoice({ label, hint, answer, articles, spot }: TroubleChoiceProps) {
  return (
    <details className="group rounded-xl border border-[var(--cg-line)] bg-white open:border-[var(--cg)] open:shadow-[0_1px_0_var(--cg-line)] transition-colors">
      <summary className="flex cursor-pointer list-none items-center gap-4 rounded-xl px-5 py-5 sm:px-6 hover:bg-[var(--cg-soft)] [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <span className="block whitespace-nowrap text-[17px] font-bold leading-7 sm:text-lg">{label}</span>
          <span className="mt-0.5 block text-sm leading-relaxed text-[var(--cg-muted)]">{hint}</span>
        </span>
        <span
          aria-hidden
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--cg-soft)] text-[var(--cg)] transition-transform group-open:rotate-180"
        >
          <ChevronDown size={20} />
        </span>
      </summary>

      <div className="border-t border-[var(--cg-line)] px-5 pb-6 pt-5 sm:px-6">
        <p className="text-[15px] leading-loose">{answer}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/blog/${a.slug}`}
                className="group/link flex items-start gap-3 rounded-lg bg-[var(--cg-off)] px-4 py-3 hover:bg-[var(--cg-soft)]"
              >
                <FileText size={18} className="mt-0.5 shrink-0 text-[var(--cg)]" />
                <span className="min-w-0 flex-1 text-[15px] font-bold leading-relaxed group-hover/link:underline [overflow-wrap:anywhere]">
                  {a.title}
                </span>
                <ArrowRight size={16} className="mt-1 shrink-0 text-[var(--cg)]" />
              </Link>
            </li>
          ))}
        </ul>
        {spot && (
          <div className="mt-4 flex flex-col gap-3 rounded-lg border border-dashed border-[var(--cg-line)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-[var(--cg-muted)]">
              英語の書類や提出の流れを、一緒に進めることもできます。
            </p>
            <Link
              href="/pricing#spot"
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--cg)] px-4 py-2 text-sm font-bold text-[var(--cg)] hover:bg-[var(--cg)] hover:text-white"
            >
              {spot.name} {spot.price}
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </details>
  );
}
