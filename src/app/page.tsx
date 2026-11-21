import Link from "next/link";
import { ArrowRight, MessageSquare, FileText, UserCheck } from "lucide-react";
import { getAllPosts, getPost, formatDateJa } from "@/lib/blog";
import { categories } from "@/lib/categories";
import NewsletterForm from "@/components/NewsletterForm";

export const revalidate = 3600;

// 「困ったときに読む」— 相談で特に多い悩みから、答えになる記事へ直接つなぐ
const TROUBLES: { q: string; slug: string }[] = [
  { q: "株価が下がって、積み立てを続けるか迷っている", slug: "stop-saving-in-crash" },
  { q: "紹介者やIFAと連絡が取れなくなった", slug: "lost-contact-with-ifa" },
  { q: "解約したら、いくら戻るのか知りたい", slug: "before-surrender" },
  { q: "積み立てを減らしたい・一時停止したい", slug: "reduce-contributions" },
  { q: "担当のIFAを変えたい", slug: "how-to-change-ifa" },
  { q: "満期になったのに、何の連絡もない", slug: "maturity-payout" },
  { q: "解約したときの税金と確定申告が不安", slug: "tax-on-surrender" },
  { q: "保険会社から本人確認の書類を求められた", slug: "kyc-documents" },
];

export default function Home() {
  const posts = getAllPosts();
  const lead = posts.find((p) => p.category === "market") ?? posts[0];
  const latest = posts.filter((p) => p.slug !== lead?.slug && p.category !== "market").slice(0, 6);
  const troubles = TROUBLES.map((t) => ({ ...t, post: getPost(t.slug) })).filter((t) => t.post);
  const counts = Object.fromEntries(categories.map((c) => [c.slug, posts.filter((p) => p.category === c.slug).length]));

  return (
    <div className="bg-paper text-ink">
      {/* 1面：今日の市況（リード記事）＋このサイトについて */}
      <section className="border-b border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="py-3 border-b border-border text-xs text-text-light flex flex-wrap gap-x-4 gap-y-1">
            <span className="tabular">{lead ? `${formatDateJa(lead.date)} 更新` : ""}</span>
            <span>海外積み立て投資をしている人のための、毎日の市況と長期投資の教科書</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 py-10 sm:py-14">
            {lead && (
              <article className="lg:col-span-8 min-w-0">
                <Link
                  href={`/blog/category/${lead.category}`}
                  className="text-sm font-bold text-primary hover:underline"
                >
                  {lead.categoryName}
                </Link>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.3] mt-3 [overflow-wrap:anywhere]">
                  <Link href={`/blog/${lead.slug}`} className="hover:text-primary transition-colors">
                    {lead.title}
                  </Link>
                </h1>
                <p className="mt-5 text-base sm:text-lg leading-loose text-text-light">{lead.description}</p>
                {lead.summary.length > 0 && (
                  <ul className="mt-6 border-t border-border">
                    {lead.summary.map((s) => (
                      <li key={s} className="py-3 border-b border-border text-[15px] leading-relaxed flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-primary" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={`/blog/${lead.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all whitespace-nowrap"
                >
                  記事を読む <ArrowRight size={16} />
                </Link>
              </article>
            )}

            <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10 min-w-0">
              <p className="font-display font-extrabold text-2xl leading-snug">
                相場が荒れても、
                <br />
                慌てないために。
              </p>
              <p className="mt-4 text-[15px] leading-loose text-text-light">
                IFAスイッチは、RL360・ハンサード・インベスターズトラストなどの海外積み立て投資をしている方のための情報サイトです。毎朝の市況と、長期投資・手続きの解説をお届けしています。
              </p>
              <dl className="mt-6 grid grid-cols-3 border-y border-border divide-x divide-border text-center">
                <div className="py-4 px-1">
                  <dt className="text-[11px] text-text-light">香港で</dt>
                  <dd className="font-display font-extrabold text-xl tabular mt-1">10年以上</dd>
                </div>
                <div className="py-4 px-1">
                  <dt className="text-[11px] text-text-light">相談実績</dt>
                  <dd className="font-display font-extrabold text-xl tabular mt-1">500件超</dd>
                </div>
                <div className="py-4 px-1">
                  <dt className="text-[11px] text-text-light">解説記事</dt>
                  <dd className="font-display font-extrabold text-xl tabular mt-1">{posts.length}本</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/chat"
                  className="flex items-center justify-between gap-3 bg-ink text-paper px-5 py-3.5 hover:bg-primary transition-colors"
                >
                  <span className="text-sm font-bold whitespace-nowrap">保有ファンドをAIで整理する</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between gap-3 border border-ink px-5 py-3.5 hover:bg-paper-2 transition-colors"
                >
                  <span className="text-sm font-bold whitespace-nowrap">手続きについて無料で相談する</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 困ったときに読む */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">困ったときに読む</h2>
          <p className="mt-2 text-sm text-text-light">これまでの相談で特に多かったお悩みです。当てはまるものから読んでください。</p>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 border-t border-ink">
            {troubles.map((t, i) => (
              <li key={t.slug} className={`border-b border-border ${i % 2 === 0 ? "md:border-r md:pr-6" : "md:pl-6"}`}>
                <Link href={`/blog/${t.slug}`} className="group flex items-start gap-4 py-5">
                  <span className="font-display font-extrabold text-primary text-lg tabular leading-7 w-7 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-7 group-hover:text-primary transition-colors">{t.q}</span>
                    <span className="block mt-1 text-sm text-text-light leading-relaxed line-clamp-1">{t.post!.title}</span>
                  </span>
                  <ArrowRight size={18} className="mt-1.5 shrink-0 text-text-light group-hover:text-primary transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 新しい記事 */}
      <section className="border-b border-border bg-paper-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl">新しい記事</h2>
            <Link href="/blog" className="text-sm font-bold text-primary hover:underline whitespace-nowrap">
              すべての記事を見る →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[repeat(3,minmax(0,1fr))] border-t border-ink">
            {latest.map((p, i) => (
              <article
                key={p.slug}
                className={`py-6 border-b border-border md:px-6 ${i % 3 === 0 ? "md:pl-0" : ""} ${i % 3 === 2 ? "md:pr-0" : "md:border-r"}`}
              >
                <p className="text-xs text-text-light flex gap-3">
                  <Link href={`/blog/category/${p.category}`} className="font-bold text-primary hover:underline">
                    {p.categoryName}
                  </Link>
                  <time dateTime={p.date} className="tabular">{formatDateJa(p.date)}</time>
                </p>
                <h3 className="mt-3 font-display font-extrabold text-lg leading-relaxed">
                  <Link href={`/blog/${p.slug}`} className="hover:text-primary transition-colors">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-light line-clamp-3">{p.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* テーマから探す */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl">テーマから探す</h2>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))] gap-x-8 border-t border-ink">
            {categories
              .filter((c) => counts[c.slug] > 0)
              .map((c) => (
                <li key={c.slug} className="border-b border-border">
                  <Link href={`/blog/category/${c.slug}`} className="group block py-5">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-bold group-hover:text-primary transition-colors">{c.name}</span>
                      <span className="text-sm text-text-light tabular whitespace-nowrap">{counts[c.slug]}本</span>
                    </span>
                    <span className="block mt-2 text-sm text-text-light leading-relaxed line-clamp-2">{c.description}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* AIチャットとサポート */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-bold text-primary">
              <MessageSquare size={16} /> AIチャット（無料）
            </p>
            <h2 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-snug">
              自分のファンドの中身を、
              <br className="hidden sm:block" />
              AIに整理してもらう
            </h2>
            <p className="mt-4 text-[15px] leading-loose text-text-light">
              保有しているファンドと配分を書き込むと、株式と債券の割合、地域や通貨の偏りを表にまとめて解説します。手続きの疑問にもその場で答えます。
            </p>
            <figure className="mt-6 border-l-2 border-primary pl-5">
              <blockquote className="text-[15px] leading-relaxed">
                「米国株式ファンド60%、新興国株式30%、債券10%です。今の構成を整理して、偏りを教えてください。」
              </blockquote>
              <figcaption className="mt-2 text-xs text-text-light">質問の例。売買や解約の判断はお伝えしません。</figcaption>
            </figure>
            <Link
              href="/chat"
              className="mt-6 inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 text-sm font-bold hover:bg-primary transition-colors whitespace-nowrap"
            >
              AIチャットを使う <ArrowRight size={16} />
            </Link>
          </div>

          <div className="min-w-0 lg:border-l lg:border-border lg:pl-12">
            <p className="text-sm font-bold text-primary">IFAスイッチのサポート</p>
            <h2 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-snug">
              英語の手続きも、
              <br className="hidden sm:block" />
              日本語で最後まで。
            </h2>
            <ul className="mt-6 border-t border-border">
              {[
                { icon: FileText, t: "各種手続きのサポート", d: "住所やカードの変更、減額・停止、一部引き出し、解約、満期の受け取りまで、書類の書き方と提出の流れをご案内します。" },
                { icon: MessageSquare, t: "保有ファンドの見える化", d: "運用レポートや保険会社からの書類の読み方を解説し、今の状況を把握できるようにします。" },
                { icon: UserCheck, t: "個別アドバイスのご案内", d: "個別のポートフォリオアドバイスをご希望の方には、提携するライセンス保有アドバイザーをご案内します。" },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="py-5 border-b border-border flex gap-4">
                  <Icon size={20} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="font-bold">{t}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-light">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold">
              <Link href="/service" className="text-primary hover:underline whitespace-nowrap">サービスの詳細 →</Link>
              <Link href="/pricing" className="text-primary hover:underline whitespace-nowrap">料金 →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* メルマガ */}
      <section className="bg-paper-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 min-w-0">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-snug">毎週土曜の朝、1週間の市況をメールで</h2>
            <p className="mt-3 text-[15px] leading-loose text-text-light">
              1週間の相場の動きと新しい記事をまとめてお届けします。登録は無料で、いつでも解除できます。
            </p>
          </div>
          <div className="lg:col-span-5 min-w-0">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <p className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-xs text-text-light leading-relaxed">
        ※当サイトの情報は一般的な情報提供と投資教育を目的としたもので、特定の金融商品の勧誘や個別の投資助言を行うものではありません。
      </p>
    </div>
  );
}
