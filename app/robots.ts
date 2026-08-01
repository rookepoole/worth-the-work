import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/worth-the-work/",
    },
    sitemap: "https://rookepoole.github.io/worth-the-work/sitemap.xml",
  };
}
