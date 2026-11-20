import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";


export const metadata: Metadata = {
  title: "会社概要",
  description:
    "IFAスイッチの運営者情報。2015年から香港を拠点に、海外積み立て投資をしている日本人投資家のサポートを行っています。",
  alternates: { canonical: "/about" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "会社概要", path: "/about" },
          ])
        )}
      />
      {children}
    </>
  );
}
