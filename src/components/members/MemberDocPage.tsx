import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getMemberDoc, getMemberDocs, MEMBER_KINDS, type MemberKind } from "@/lib/members";
import { membersConfigured } from "@/lib/member-auth";
import { getCurrentMember } from "@/lib/member-session";
import LockedNotice from "./LockedNotice";
import CopyLetterButton from "./CopyLetterButton";

// ガイド・レター共通の詳細ページ。タイトル・説明・目次は誰にでも見せ、本文は会員にだけ出す。
export default async function MemberDocPage({ kind, slug }: { kind: MemberKind; slug: string }) {
  const doc = getMemberDoc(kind, slug);
  if (!doc) notFound();

  const member = await getCurrentMember();
  const configured = membersConfigured();
  const docs = getMemberDocs(kind);
  const idx = docs.findIndex((d) => d.slug === doc.slug);
  const nextDoc = docs[idx + 1];
  const section = MEMBER_KINDS[kind];

  return (
    <>
      <section className="border-b border-ink">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <nav aria-label="パンくずリスト" className="text-xs text-text-light flex flex-wrap gap-x-1 gap-y-1">
            <Link href="/members" className="hover:text-ink whitespace-nowrap">会員ページ</Link>
            <span>/</span>
            <Link href={`/members#${kind}`} className="hover:text-ink whitespace-nowrap">{section.name}</Link>
          </nav>
          <p className="mt-6 text-sm font-bold text-primary">{section.name}</p>
          <h1 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl md:text-4xl leading-snug [overflow-wrap:anywhere]">
            {doc.title}
          </h1>
          <p className="mt-4 text-[15px] leading-loose text-text-light">{doc.description}</p>
        </div>
      </section>

      <section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {doc.headings.length >= 3 && (
            <nav aria-label="目次" className="mb-10">
              <p className="text-sm font-bold">この{kind === "guides" ? "ガイド" : "ひな形"}の内容</p>
              <ol className="mt-3 border-t border-ink">
                {doc.headings.map((h, i) => (
                  <li key={h.id} className="border-b border-border">
                    {member ? (
                      <a href={`#${h.id}`} className="flex gap-4 py-3 text-[15px] hover:text-primary transition-colors">
                        <span className="tabular text-text-light w-6 shrink-0">{i + 1}</span>
                        <span className="min-w-0">{h.text}</span>
                      </a>
                    ) : (
                      <span className="flex gap-4 py-3 text-[15px]">
                        <span className="tabular text-text-light w-6 shrink-0">{i + 1}</span>
                        <span className="min-w-0">{h.text}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {member ? (
            <>
              {kind === "letters" && (
                <div className="mb-6">
                  <CopyLetterButton />
                </div>
              )}
              <article
                id={kind === "letters" ? "letter-body" : undefined}
                className="prose prose-slate max-w-none [overflow-wrap:anywhere] prose-headings:font-display prose-headings:text-ink prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border prose-p:leading-loose prose-li:leading-relaxed prose-a:text-primary prose-table:text-sm prose-pre:bg-paper-2 prose-pre:text-ink prose-pre:border prose-pre:border-border prose-pre:rounded-none prose-pre:whitespace-pre-wrap prose-pre:text-[13px] prose-pre:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: doc.html }}
              />
            </>
          ) : (
            <LockedNotice configured={configured} compact />
          )}

          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row sm:justify-between gap-4 text-sm font-bold">
            <Link href="/members" className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft size={16} />
              <span className="whitespace-nowrap">会員ページに戻る</span>
            </Link>
            {nextDoc && (
              <Link
                href={`/members/${kind}/${nextDoc.slug}`}
                className="inline-flex items-center gap-2 text-primary hover:underline min-w-0"
              >
                <span className="min-w-0">次：{nextDoc.title}</span>
                <ArrowRight size={16} className="shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
