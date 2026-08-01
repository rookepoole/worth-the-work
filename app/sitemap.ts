import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rookepoole.github.io/worth-the-work/",
      lastModified: new Date("2026-08-01T00:00:00Z"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
