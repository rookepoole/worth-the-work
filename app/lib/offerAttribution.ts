export type Offer = "paid" | "free";

const offerUrls: Record<Offer, string> = {
  paid: "https://prairiegrantscout.gumroad.com/l/worth-the-work",
  free: "https://prairiegrantscout.gumroad.com/l/freelance-project-red-flag-checklist",
};

const knownReferrers: Array<[RegExp, string]> = [
  [/(^|\.)public\.tools$/i, "public_tools"],
  [/(^|\.)toolcommons\.org$/i, "tool_commons"],
  [/(^|\.)zearches\.com$/i, "zearches"],
  [/(^|\.)freenosignup\.com$/i, "free_no_signup"],
  [/(^|\.)github\.com$/i, "github_referral"],
  [/(^|\.)google\./i, "organic_search"],
  [/(^|\.)bing\.com$/i, "organic_search"],
  [/(^|\.)duckduckgo\.com$/i, "organic_search"],
];

export function sourceFromReferrer(referrer: string, fallback: string) {
  if (!referrer) return fallback;

  try {
    const hostname = new URL(referrer).hostname;
    return knownReferrers.find(([pattern]) => pattern.test(hostname))?.[1] ?? fallback;
  } catch {
    return fallback;
  }
}

export function buildOfferUrl({
  offer,
  source,
  medium,
  content,
}: {
  offer: Offer;
  source: string;
  medium: string;
  content: string;
}) {
  const url = new URL(offerUrls[offer]);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", "worth_the_work");
  url.searchParams.set("utm_content", content);
  return url.toString();
}
