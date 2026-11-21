import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph, servicesSchema } from "@/lib/schema";


export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "IFAスイッチの料金。無料プラン、ライトプラン（月980円／年9,800円）、サポートプラン（月2,980円／年29,800円）、1回ごとのスポット手続き（9,800円・19,800円）。すべて税込。",
  alternates: { canonical: "/pricing" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "料金プラン", path: "/pricing" },
          ]),
          servicesSchema()
        )}
      />
      {children}
    </>
  );
}
