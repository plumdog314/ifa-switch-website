import type { Metadata } from "next";
import { getMemberDoc } from "@/lib/members";
import MemberDocPage from "@/components/members/MemberDocPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getMemberDoc("guides", slug);
  if (!doc) return {};
  return { title: `${doc.title}｜手続きガイド`, description: doc.description };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  return <MemberDocPage kind="guides" slug={slug} />;
}
