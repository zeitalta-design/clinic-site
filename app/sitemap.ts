/**
 * サイトマップ自動生成
 * Next.js App Router の sitemap 規約ファイル
 */

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllServiceSlugs } from "@/lib/services-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const now = new Date().toISOString();

  /* 固定ページ */
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/director`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/clinic`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/first`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/access`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  /* 診療詳細ページ */
  const servicePages: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [...staticPages, ...servicePages];
}
