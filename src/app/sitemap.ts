import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { categories } from "@/lib/categories";
import { absUrl } from "@/lib/site";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date;
  const pages = ["", "/service", "/pricing", "/about", "/faq", "/contact", "/blog", "/chat", "/legal/tokushoho", "/privacy", "/terms"].map((p) => ({
    url: absUrl(p || "/"),
    lastModified: p === "/blog" ? latest : undefined,
    changeFrequency: (p === "/blog" ? "daily" : "monthly") as "daily" | "monthly",
    priority: p === "" ? 1 : 0.8,
  }));
  const cats = categories
    .filter((c) => posts.some((p) => p.category === c.slug))
    .map((c) => ({
      url: absUrl(`/blog/category/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  const articles = posts.map((p) => ({
    url: absUrl(`/blog/${p.slug}`),
    lastModified: p.updated ?? p.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...cats, ...articles];
}
