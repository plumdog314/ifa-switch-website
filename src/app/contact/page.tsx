"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "サービスについて",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full min-w-0 px-4 py-3 border border-border bg-paper text-ink placeholder:text-text-light/60 focus:outline-none focus:border-ink transition-colors";
  const label = "flex items-baseline gap-2 text-sm font-bold mb-2";
  const req = <span className="text-xs font-normal text-primary">必須</span>;

  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="text-sm font-bold text-primary">お問い合わせ・無料相談</p>
          <h1 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl leading-snug">お問い合わせ</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-loose text-text-light">
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* お問い合わせ先 */}
          <aside className="lg:col-span-4 min-w-0">
            <h2 className="font-display font-extrabold text-2xl leading-snug">お問い合わせ先</h2>
            <dl className="mt-6 border-t border-ink">
              <div className="py-4 border-b border-border">
                <dt className="text-xs text-text-light">メール</dt>
                <dd className="mt-1">
                  <a href="mailto:ifa.switch@gmail.com" className="font-bold text-primary hover:underline [overflow-wrap:anywhere]">
                    ifa.switch@gmail.com
                  </a>
                  <p className="mt-2 text-sm leading-relaxed text-text-light">
                    通常1〜2営業日以内にご返信いたします。お急ぎの場合はメールで直接ご連絡ください。
                  </p>
                </dd>
              </div>
              <div className="py-4 border-b border-border">
                <dt className="font-bold">初回相談無料</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-light">
                  現在の投資状況の確認やサービス内容のご説明など、初回のご相談は無料で承っております。まずはお気軽にお問い合わせください。
                </dd>
              </div>
              <div className="py-4 border-b border-border">
                <dt className="font-bold">個別のアドバイスについて</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-light">
                  IFAスイッチ自身は、特定のファンドの売買・乗り換え・配分・解約の判断はお伝えしていません。個別のアドバイスをご希望の方には、提携するライセンス保有アドバイザーをご案内します（別料金）。
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
              <Link href="/faq" className="text-primary hover:underline whitespace-nowrap">よくあるご質問 →</Link>
              <Link href="/pricing" className="text-primary hover:underline whitespace-nowrap">料金 →</Link>
            </div>
          </aside>

          {/* フォーム */}
          <div className="lg:col-span-8 min-w-0 lg:border-l lg:border-border lg:pl-12">
            {status === "success" ? (
              <div className="border-t border-ink pt-8">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">
                  お問い合わせありがとうございます
                </h2>
                <p className="mt-4 text-[15px] leading-loose text-text-light">
                  内容を確認次第、1〜2営業日以内にご返信いたします。しばらくお待ちください。
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({
                      name: "",
                      email: "",
                      subject: "サービスについて",
                      message: "",
                    });
                  }}
                  className="mt-6 text-sm font-bold text-primary hover:underline whitespace-nowrap"
                >
                  新しいお問い合わせを送る →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border-t border-ink pt-8 space-y-6">
                {status === "error" && (
                  <p role="alert" className="border-l-2 border-primary pl-4 text-sm leading-relaxed">
                    送信に失敗しました。お手数ですが、もう一度お試しいただくか、
                    <a href="mailto:ifa.switch@gmail.com" className="underline font-bold">ifa.switch@gmail.com</a>
                    まで直接ご連絡ください。
                  </p>
                )}
                <div>
                  <label htmlFor="name" className={label}>
                    お名前 {req}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="山田 太郎"
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={label}>
                    メールアドレス {req}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={field}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={label}>
                    お問い合わせ種別 {req}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={field}
                  >
                    <option value="サービスについて">サービスについて</option>
                    <option value="料金について">料金について</option>
                    <option value="ポートフォリオについて">ポートフォリオについて</option>
                    <option value="その他">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={label}>
                    お問い合わせ内容 {req}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="ご質問やご相談の内容をご記入ください"
                    className={`${field} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto sm:min-w-[16rem] flex items-center justify-between gap-3 bg-ink text-paper px-5 py-3.5 hover:bg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <span className="text-sm font-bold whitespace-nowrap">送信中...</span>
                      <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-bold whitespace-nowrap">送信する</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
