import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildOfferUrl,
  sourceFromReferrer,
} from "../app/lib/offerAttribution.ts";
import {
  calculateRushFee,
  suggestedMarkupForCompression,
  timelineCompression,
} from "../app/lib/rushFee.ts";
import { calculateProjectCost } from "../app/lib/projectCost.ts";

const outputRoot = new URL("../out/", import.meta.url);

test("exports the calculator and its conversion path", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /Freelance Project Decision Calculator/);
  assert.match(html, /Minimum worth accepting/);
  assert.match(html, /https:\/\/prairiegrantscout\.gumroad\.com\/l\/worth-the-work/);
  assert.match(html, /utm_source=github_pages/);
  assert.match(html, /google-site-verification/);
  assert.match(html, /3KQkOn5rdkAvtEkfnpouShjQW5QMP5XCZxt92zt3sYc/);
  assert.match(html, /free-checklist-cta|free_checklist_cta/);
  assert.match(html, /\/worth-the-work\/_next\/static\//);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /https:\/\/rookepoole\.github\.io\/worth-the-work\//);
  assert.match(html, /property="og:image"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /worth-the-work-preview\.jpg/);
  assert.match(html, /MIT-licensed source/);
  assert.match(html, /no analytics, cookies, or accounts/i);
  assert.match(html, /EUR — euro/);
  assert.match(html, /NZD — New Zealand dollar/);
  assert.doesNotMatch(html, /â|Ã|Â/);
});

test("exports a usable 404 page and static assets", async () => {
  await access(new URL("404.html", outputRoot));
  await access(new URL("_next/static/", outputRoot));
  await access(new URL("robots.txt", outputRoot));
  await access(new URL("sitemap.xml", outputRoot));
  await access(new URL("worth-the-work-preview.jpg", outputRoot));
  await access(
    new URL("e57ce0b65a8245aa8612e10aa870ab1d.txt", outputRoot),
  );
});

test("classifies acquisition referrers without collecting page inputs", () => {
  assert.equal(sourceFromReferrer("https://public.tools/tool/worth-the-work", "github_pages"), "public_tools");
  assert.equal(sourceFromReferrer("https://toolcommons.org/", "github_pages"), "tool_commons");
  assert.equal(sourceFromReferrer("https://zearches.com/software-saas", "github_pages"), "zearches");
  assert.equal(sourceFromReferrer("https://freenosignup.com/tools/worth-the-work/", "github_pages"), "free_no_signup");
  assert.equal(sourceFromReferrer("https://fossy.dev/rookepoole/worth-the-work", "github_pages"), "fossy");
  assert.equal(sourceFromReferrer("https://curlship.com/", "github_pages"), "curlship");
  assert.equal(sourceFromReferrer("https://prairiegrantscout.gumroad.com/p/how-to-calculate-your-minimum-freelance-project-fee-without-guessing", "github_pages"), "gumroad_post");
  assert.equal(sourceFromReferrer("https://github.com/etnbrd/awesome-freelance-fr", "github_pages"), "github_referral");
  assert.equal(sourceFromReferrer("https://example.com/", "github_pages"), "github_pages");
  assert.match(
    buildOfferUrl({ offer: "paid", source: "public_tools", medium: "calculator", content: "paid_kit_cta" }),
    /utm_source=public_tools/,
  );
});

test("exports five distinct conversion-focused utility pages", async () => {
  const tools = [
    ["freelance-project-cost-calculator/index.html", /A fixed fee still needs an honest cost model/],
    ["scope-creep-clause-generator/index.html", /Define the boundary before you need to defend it/],
    ["freelance-revision-cost-calculator/index.html", /probability × hours × target hourly return/],
    ["freelance-quote-response-generator/index.html", /If the price changes, another real variable should change too/],
    ["freelance-rush-fee-calculator/index.html", /Price urgency as capacity, not as annoyance/],
  ];

  for (const [path, title] of tools) {
    const html = await readFile(new URL(path, outputRoot), "utf8");
    assert.match(html, title);
    assert.match(html, /utm_medium=tool/);
    assert.match(html, /worth-the-work/);
    assert.match(html, /Open-source MIT code/);
    assert.match(html, /no analytics, cookies, or accounts/i);
    assert.match(html, /EUR — euro/);
    assert.match(html, /application\/ld\+json/);
    assert.match(html, /WebApplication/);
    assert.match(html, /"price":0/);
    assert.match(html, /property="og:image"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /name="twitter:image"/);
    assert.match(html, /worth-the-work-preview\.jpg/);
    assert.doesNotMatch(html, /â|Ã|Â/);
  }

  const sitemap = await readFile(new URL("sitemap.xml", outputRoot), "utf8");
  assert.match(sitemap, /freelance-project-cost-calculator/);
  assert.match(sitemap, /scope-creep-clause-generator/);
  assert.match(sitemap, /freelance-revision-cost-calculator/);
  assert.match(sitemap, /freelance-quote-response-generator/);
  assert.match(sitemap, /freelance-rush-fee-calculator/);
});

test("project estimator protects labor, direct costs, contingency, and margin", () => {
  const result = calculateProjectCost({
    deliveryHours: 28,
    discoveryHours: 4,
    adminHours: 6,
    targetHourlyRate: 100,
    directCosts: 200,
    contingencyPercent: 15,
    operatingMarginPercent: 20,
    depositPercent: 40,
  });

  assert.equal(result.totalHours, 38);
  assert.equal(result.laborValue, 3800);
  assert.equal(result.protectedCost, 4600);
  assert.equal(result.recommendedQuote, 5750);
  assert.equal(result.operatingMarginAmount, 1150);
  assert.equal(result.deposit, 2300);
});

test("rush fee protects the largest core cost and genuine off-hours work", () => {
  assert.equal(timelineCompression(10, 3), 0.7);
  assert.equal(suggestedMarkupForCompression(0.7), 50);

  const result = calculateRushFee({
    basePrice: 1200,
    estimatedHours: 10,
    minimumHourlyRate: 90,
    markupPercent: 50,
    displacedWork: 250,
    offHoursRequired: true,
    offHoursPercent: 15,
  });

  assert.equal(result.percentageSurcharge, 600);
  assert.equal(result.floorGap, 0);
  assert.equal(result.offHoursSurcharge, 180);
  assert.equal(result.surcharge, 800);
  assert.equal(result.total, 2000);
  assert.equal(result.effectiveHourlyRate, 200);
});
