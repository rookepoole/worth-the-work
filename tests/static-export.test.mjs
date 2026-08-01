import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);

test("exports the calculator and its conversion path", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /Freelance Project Decision Calculator/);
  assert.match(html, /Minimum worth accepting/);
  assert.match(html, /https:\/\/prairiegrantscout\.gumroad\.com\/l\/worth-the-work/);
  assert.match(html, /utm_source=github_pages/);
  assert.match(html, /free-checklist-cta|free_checklist_cta/);
  assert.match(html, /\/worth-the-work\/_next\/static\//);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /https:\/\/rookepoole\.github\.io\/worth-the-work\//);
  assert.match(html, /MIT-licensed source/);
  assert.match(html, /no analytics, cookies, or accounts/i);
  assert.doesNotMatch(html, /â|Ã|Â/);
});

test("exports a usable 404 page and static assets", async () => {
  await access(new URL("404.html", outputRoot));
  await access(new URL("_next/static/", outputRoot));
  await access(new URL("robots.txt", outputRoot));
  await access(new URL("sitemap.xml", outputRoot));
  await access(
    new URL("e57ce0b65a8245aa8612e10aa870ab1d.txt", outputRoot),
  );
});

test("exports three distinct conversion-focused utility pages", async () => {
  const tools = [
    ["scope-creep-clause-generator/index.html", /Scope Creep Clause Generator/],
    ["freelance-revision-cost-calculator/index.html", /Freelance Revision Cost Calculator/],
    ["freelance-quote-response-generator/index.html", /Freelance Quote Response Generator/],
  ];

  for (const [path, title] of tools) {
    const html = await readFile(new URL(path, outputRoot), "utf8");
    assert.match(html, title);
    assert.match(html, /utm_medium=tool/);
    assert.match(html, /worth-the-work/);
    assert.match(html, /Open-source MIT code/);
    assert.match(html, /no analytics, cookies, or accounts/i);
    assert.doesNotMatch(html, /â|Ã|Â/);
  }

  const sitemap = await readFile(new URL("sitemap.xml", outputRoot), "utf8");
  assert.match(sitemap, /scope-creep-clause-generator/);
  assert.match(sitemap, /freelance-revision-cost-calculator/);
  assert.match(sitemap, /freelance-quote-response-generator/);
});
