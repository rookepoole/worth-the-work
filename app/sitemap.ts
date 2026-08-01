import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-01T00:00:00Z");

  return [
    ["", 1],
    ["scope-creep-clause-generator/", 0.9],
    ["freelance-revision-cost-calculator/", 0.9],
    ["freelance-quote-response-generator/", 0.9],
    ["freelance-rush-fee-calculator/", 0.9],
  ].map(([path, priority]) => ({
    url: `https://rookepoole.github.io/worth-the-work/${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: Number(priority),
  }));
}
