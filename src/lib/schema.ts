import { SITE, absUrl } from "./site";
import type { Post, FaqEntry } from "./blog";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export const organizationSchema = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: SITE.url,
  logo: absUrl(SITE.logo),
  email: SITE.email,
  foundingDate: SITE.foundingYear,
  description: SITE.description,
  address: { "@type": "PostalAddress", ...SITE.address },
  knowsAbout: [
    "海外積み立て投資",
    "オフショア投資",
    "RL360",
    "インベスターズトラスト",
    "フレンズプロビデント",
    "ハンサード",
    "ポートフォリオ管理",
    "長期分散投資",
    "ドルコスト平均法",
  ],
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE.url,
  name: SITE.name,
  alternateName: SITE.nameEn,
  inLanguage: "ja-JP",
  publisher: { "@id": ORG_ID },
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absUrl(it.path),
  })),
});

export const faqSchema = (faq: { question: string; answer: string }[] | FaqEntry[]) => ({
  "@type": "FAQPage",
  mainEntity: faq.map((f) => {
    const q = "q" in f ? f.q : f.question;
    const a = "a" in f ? f.a : f.answer;
    return {
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    };
  }),
});

export const articleSchema = (post: Post) => ({
  "@type": "BlogPosting",
  "@id": `${absUrl(`/blog/${post.slug}`)}#article`,
  headline: post.title,
  description: post.description,
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  inLanguage: "ja-JP",
  mainEntityOfPage: absUrl(`/blog/${post.slug}`),
  image: absUrl(SITE.ogImage),
  articleSection: post.categoryName,
  keywords: post.tags.join(", "),
  wordCount: post.plainText.length,
  author: {
    "@type": "Organization",
    name: SITE.author.name,
    url: absUrl(SITE.author.url),
    description: SITE.author.description,
  },
  publisher: { "@id": ORG_ID },
  isPartOf: { "@id": SITE_ID },
  ...(post.summary.length ? { abstract: post.summary.join(" ") } : {}),
});

export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
