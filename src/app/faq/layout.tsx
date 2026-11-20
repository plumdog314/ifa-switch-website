import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { faqSchema } from "@/lib/schema";
import { faqData } from "@/data/faq";

export const metadata: Metadata = {
  title: "よくあるご質問",
  description:
    "IFAスイッチのサービス内容、料金、海外積み立て投資の手続きなど、よくいただくご質問への回答をまとめました。",
  alternates: { canonical: "/faq" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "よくあるご質問", path: "/faq" },
          ]),
          faqSchema(faqData)
        )}
      />
      {children}
    </>
  );
}
