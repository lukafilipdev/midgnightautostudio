import type { MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://midnightautostudio.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const languageAlternates = (path: string) => ({
    languages: {
      "x-default": `${SITE_URL}${path}`,
      sl: `${SITE_URL}${path}`,
      en: `${SITE_URL}${path}`,
      de: `${SITE_URL}${path}`,
    },
  });

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: languageAlternates("/"),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: languageAlternates("/privacy"),
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: languageAlternates("/cookies"),
    },
  ];
}
