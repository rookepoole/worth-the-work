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
