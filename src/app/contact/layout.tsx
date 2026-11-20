import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";


export const metadata: Metadata = {
  title: "お問い合わせ・無料相談",
  description:
    "海外積み立て投資（RL360・インベスターズトラスト・フレンズプロビデント等）に関するご相談を無料で承ります。",
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "ホーム", path: "/" },
            { name: "お問い合わせ・無料相談", path: "/contact" },
          ])
        )}
      />
      {children}
    </>
  );
}
