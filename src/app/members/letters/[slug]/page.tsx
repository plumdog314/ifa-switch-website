import type { Metadata } from "next";
import { getMemberDoc } from "@/lib/members";
import MemberDocPage from "@/components/members/MemberDocPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getMemberDoc("letters", slug);
  if (!doc) return {};
  return { title: `${doc.title}｜英語の手紙のひな形`, description: doc.description };
}

export default async function LetterPage({ params }: Props) {
  const { slug } = await params;
  return <MemberDocPage kind="letters" slug={slug} />;
}
