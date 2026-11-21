import type { Metadata } from "next";

// 会員エリアは検索結果に出さない
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-paper text-ink">{children}</div>;
}
