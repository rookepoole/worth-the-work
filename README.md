# Worth the Work

A free, browser-only suite of six freelance pricing tools for evaluating
project economics and client risk before accepting the work.

The calculator estimates expected workload, effective hourly return, risk
buffer, minimum acceptable fee, suggested deposit, and a practical
`TAKE` / `GUARDRAIL` / `COUNTER` / `PASS` recommendation. Inputs remain in the
browser and are not transmitted or stored. All six utilities support USD,
EUR, GBP, CAD, AUD, and NZD without exchange-rate conversion.

## Privacy and licensing

- All calculations and generated text run locally in the browser.
- The site uses no analytics scripts, advertising scripts, cookies, accounts,
  or server-side input storage.
- Outbound product links include ordinary UTM query parameters so Gumroad can
  distinguish the on-site call to action and, when recognized locally, the
  immediate referring directory or search channel. This lookup runs only in
  the browser; no request is made until the visitor chooses a product link, and
  no page input is ever included.
- The source is available under the [MIT License](LICENSE).

## Live product funnel

- Calculator: https://rookepoole.github.io/worth-the-work/
- Project cost calculator:
  https://rookepoole.github.io/worth-the-work/freelance-project-cost-calculator/
- Scope-creep clause generator:
  https://rookepoole.github.io/worth-the-work/scope-creep-clause-generator/
- Revision cost calculator:
  https://rookepoole.github.io/worth-the-work/freelance-revision-cost-calculator/
- Quote response generator:
  https://rookepoole.github.io/worth-the-work/freelance-quote-response-generator/
- Rush fee calculator:
  https://rookepoole.github.io/worth-the-work/freelance-rush-fee-calculator/
- Free project red-flag checklist:
  https://prairiegrantscout.gumroad.com/l/freelance-project-red-flag-checklist?utm_source=github&utm_medium=repository&utm_campaign=worth_the_work
- Editable decision workbook and script library:
  https://prairiegrantscout.gumroad.com/l/worth-the-work?utm_source=github&utm_medium=repository&utm_campaign=worth_the_work

## Local development

Requires Node.js 22.13 or later.

```bash
npm ci
npm run dev
```

Use `npm test` to produce and verify the GitHub Pages static export. The site
contains general planning information, not legal, tax, or financial advice.
