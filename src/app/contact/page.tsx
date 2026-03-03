"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary-light via-white to-accent-light py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            お問い合わせ
          </h1>
          <p className="text-text-light text-base sm:text-lg max-w-2xl mx-auto">
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold text-text mb-6">
                お問い合わせ先
              </h2>

              <div className="bg-bg-gray rounded-2xl p-6 sm:p-8 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-text-light">メール</p>
                    <a
                      href="mailto:admin@ifa-switch.com"
                      className="text-primary hover:text-primary-dark font-medium transition-colors text-sm"
                    >
                      admin@ifa-switch.com
                    </a>
                  </div>
                </div>
                <p className="text-text-light text-sm leading-relaxed">
                  通常1〜2営業日以内にご返信いたします。お急ぎの場合はメールで直接ご連絡ください。
                </p>
              </div>

              <div className="bg-primary-light rounded-2xl p-6 sm:p-8">
                <h3 className="font-bold text-text mb-3">初回相談無料</h3>
                <p className="text-text-light text-sm leading-relaxed">
                  現在の投資状況の確認やサービス内容のご説明など、初回のご相談は無料で承っております。まずはお気軽にお問い合わせください。
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <div className="bg-accent-light rounded-2xl p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white" size={32} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-text mb-4">
                    お問い合わせありがとうございます
                  </h2>
                  <p className="text-text-light leading-relaxed mb-6">
                    内容を確認次第、1〜2営業日以内にご返信いたします。
                    <br />
                    しばらくお待ちください。
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        subject: "サービスについて",
                        message: "",
                      });
                    }}
                    className="text-primary hover:text-primary-dark font-medium transition-colors text-sm"
                  >
                    新しいお問い合わせを送る
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-red-700 text-sm">
                        送信に失敗しました。お手数ですが、もう一度お試しいただくか、
                        <a href="mailto:admin@ifa-switch.com" className="underline font-medium">admin@ifa-switch.com</a>
                        まで直接ご連絡ください。
                      </p>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-text mb-2"
                    >
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="山田 太郎"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-text mb-2"
                    >
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-text mb-2"
                    >
                      お問い合わせ種別 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    >
                      <option value="サービスについて">サービスについて</option>
                      <option value="料金について">料金について</option>
                      <option value="ポートフォリオについて">
                        ポートフォリオについて
                      </option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text mb-2"
                    >
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="ご質問やご相談の内容をご記入ください"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-medium transition-colors inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        送信中...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        送信する
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
