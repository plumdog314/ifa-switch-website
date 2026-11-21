import Link from "next/link";
import { ArrowUp } from "lucide-react";

// トップの質問ボックス。JSなしでも動くよう、/chat への GET フォームにしている。
// /chat 側（ChatClient）が ?q= を読み取り、1回だけ自動で送信する。
export const EXAMPLE_QUESTIONS = [
  "RL360を解約したら、いくら戻る？",
  "担当のIFAと連絡が取れません",
  "暴落したとき、積み立てで確認したいことは？",
  "住所変更の書類の書き方",
];

export default function AskBox({ dailyLimit, postCount }: { dailyLimit: number | null; postCount: number }) {
  return (
    <div className="w-full">
      <form action="/chat" method="get" role="search" aria-label="AIチャットに質問する">
        <label htmlFor="home-ask" className="sr-only">
          海外積み立てについての質問
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--hc-line-strong)] bg-white p-2 pl-4 sm:pl-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_30px_-14px_rgba(0,0,0,0.14)] transition-shadow focus-within:border-[var(--hc-accent)] focus-within:ring-4 focus-within:ring-[var(--hc-accent-ring)]">
          <input
            id="home-ask"
            name="q"
            type="text"
            required
            maxLength={500}
            autoComplete="off"
            enterKeyHint="send"
            placeholder="質問を入力してください"
            className="min-w-0 flex-1 bg-transparent py-3 text-base text-[var(--hc-ink)] placeholder:text-[var(--hc-muted)] outline-none"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl bg-[var(--hc-accent)] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--hc-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hc-accent)]"
          >
            <ArrowUp size={16} aria-hidden />
            聞く
          </button>
        </div>
      </form>

      <p className="mt-3 text-center text-xs leading-relaxed text-[var(--hc-muted)]">
        証券番号やパスワードは書かないでください。売買や解約の判断はお伝えしません。
      </p>

      <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="質問の例">
        {EXAMPLE_QUESTIONS.map((q) => (
          <li key={q} className="max-w-full">
            <Link
              href={`/chat?q=${encodeURIComponent(q)}`}
              className="inline-block max-w-full rounded-full border border-[var(--hc-line)] bg-white px-4 py-2 text-sm text-[var(--hc-ink-soft)] transition-colors hover:border-[var(--hc-accent)] hover:text-[var(--hc-accent-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hc-accent)]"
            >
              {q}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm leading-relaxed text-[var(--hc-muted)]">
        {dailyLimit != null && <span className="whitespace-nowrap">無料で1日{dailyLimit}問まで</span>}
        {dailyLimit != null && <span aria-hidden className="mx-2">·</span>}
        <span className="whitespace-nowrap">登録なしで使えます</span>
        <span aria-hidden className="mx-2">·</span>
        <span className="whitespace-nowrap">解説記事は{postCount}本</span>
      </p>
    </div>
  );
}
