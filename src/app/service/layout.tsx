import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";


export const metadata: Metadata = {
  title: "サービス内容",
  description:
    "海外積み立て投資のポートフォリオ確認、ファンド入れ替えの考え方、IFA変更・減額・解約などの各種手続きを、IFAスイッチが中立の立場でサポートします。",
  alternates: { canonical: "/service" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "サービス内容", path: "/service" },
          ])
        )}
      />
      {children}
    </>
  );
}
