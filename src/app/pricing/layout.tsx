import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";


export const metadata: Metadata = {
  title: "料金プラン",
  description:
    "IFAスイッチの料金プラン。海外積み立て投資のサポートを定額でご利用いただけます。",
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
          ])
        )}
      />
      {children}
    </>
  );
}
