import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-01T00:00:00Z");

  return [
    ["", 1],
    ["freelance-project-cost-calculator/", 0.9],
    ["scope-creep-clause-generator/", 0.9],
    ["freelance-revision-cost-calculator/", 0.9],
    ["freelance-quote-response-generator/", 0.9],
    ["freelance-rush-fee-calculator/", 0.9],
    ["freelance-late-payment-calculator/", 0.9],
    ["freelance-overdue-invoice-email-generator/", 0.9],
    ["freelance-invoice-follow-up-schedule/", 0.85],
    ["affiliate-program/", 0.65],
  ].map(([path, priority]) => ({
    url: `https://rookepoole.github.io/worth-the-work/${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: Number(priority),
  }));
}
