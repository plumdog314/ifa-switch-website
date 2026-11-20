import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE.name,
    url: "/",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: SITE.ogImage }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} font-sans antialiased`}>
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
