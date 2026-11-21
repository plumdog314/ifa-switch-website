// Mailchimp の「IFAスイッチ | ニュースレター」リストへの登録フォーム。
// 送信すると Mailchimp の確認ページが新しいタブで開き、確認メール（ダブルオプトイン）が届く。
const MC_ACTION =
  "https://ifa-switch.us11.list-manage.com/subscribe/post?u=555444b9d34031a53fe5b2dd9&id=ddea2989eb";
const HONEYPOT = "b_555444b9d34031a53fe5b2dd9_ddea2989eb";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  return (
    <form
      action={MC_ACTION}
      method="post"
      target="_blank"
      className={compact ? "flex flex-col sm:flex-row gap-2" : "flex flex-col sm:flex-row gap-3"}
    >
      <label htmlFor="mce-EMAIL" className="sr-only">
        メールアドレス
      </label>
      <input
        id="mce-EMAIL"
        type="email"
        name="EMAIL"
        required
        autoComplete="email"
        placeholder="メールアドレス"
        className="flex-1 min-w-0 rounded-full border border-border bg-white px-5 py-3 text-sm text-text outline-none focus:border-primary"
      />
      {/* ボット対策（Mailchimp 標準のハニーポット） */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
        <input type="text" name={HONEYPOT} tabIndex={-1} defaultValue="" />
      </div>
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium text-sm transition-colors whitespace-nowrap"
      >
        無料で登録する
      </button>
    </form>
  );
}
