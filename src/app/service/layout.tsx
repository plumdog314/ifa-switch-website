import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph, servicesSchema } from "@/lib/schema";


export const metadata: Metadata = {
  title: "サービス内容",
  description:
    "海外積み立て投資の保有ファンドの見える化、運用レポートの読み方の解説、IFA変更・減額・解約などの各種手続きを、IFAスイッチがサポートします。特定のファンドの推奨は行いません。",
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
          ]),
          servicesSchema()
        )}
      />
      {children}
    </>
  );
}
