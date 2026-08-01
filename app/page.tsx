"use client";

import { useMemo, useState } from "react";

type ProtectionKey =
  | "writtenScope"
  | "deposit"
  | "revisionCap"
  | "decisionMaker"
  | "realisticDeadline";

type ProtectionState = Record<ProtectionKey, boolean>;

const protectionLabels: Array<{ key: ProtectionKey; label: string }> = [
  { key: "writtenScope", label: "Written scope" },
  { key: "deposit", label: "Deposit secured" },
  { key: "revisionCap", label: "Revision cap" },
  { key: "decisionMaker", label: "One decision-maker" },
  { key: "realisticDeadline", label: "Realistic deadline" },
];

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Worth the Work",
  url: "https://rookepoole.github.io/worth-the-work/",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  description:
    "A free browser-based calculator for evaluating freelance project economics, hidden hours, scope risk, and minimum acceptable fees.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <span className="input-shell">
        {prefix ? <span className="input-affix">{prefix}</span> : null}
        <input
          id={id}
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value) || 0)}
        />
        {suffix ? <span className="input-affix suffix">{suffix}</span> : null}
      </span>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

export default function Home() {
  const [projectName, setProjectName] = useState("Website refresh");
  const [fee, setFee] = useState(4200);
  const [deliveryHours, setDeliveryHours] = useState(28);
  const [adminHours, setAdminHours] = useState(7);
  const [revisionHours, setRevisionHours] = useState(5);
  const [directCosts, setDirectCosts] = useState(180);
  const [targetRate, setTargetRate] = useState(110);
  const [creepChance, setCreepChance] = useState(35);
  const [creepHours, setCreepHours] = useState(10);
  const [paymentDelay, setPaymentDelay] = useState(14);
  const [protections, setProtections] = useState<ProtectionState>({
    writtenScope: true,
    deposit: true,
    revisionCap: false,
    decisionMaker: true,
    realisticDeadline: true,
  });
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    const protectionCount = Object.values(protections).filter(Boolean).length;
    const expectedCreepHours = (creepChance / 100) * creepHours;
    const expectedHours = Math.max(
      1,
      deliveryHours + adminHours + revisionHours + expectedCreepHours,
    );
    const rateAfterCosts = Math.max(0, fee - directCosts) / expectedHours;
    const riskScore = Math.max(
      0,
      Math.min(
        100,
        100 -
          (5 - protectionCount) * 10 -
          creepChance * 0.4 -
          Math.max(0, paymentDelay - 14) * 0.6,
      ),
    );
    const riskBuffer = 0.05 + (100 - riskScore) * 0.0025;
    const rawMinimum = (targetRate * expectedHours + directCosts) * (1 + riskBuffer);
    const minimumFee = Math.ceil(rawMinimum / 50) * 50;
    const priceGap = minimumFee - fee;
    const coverage = minimumFee > 0 ? fee / minimumFee : 0;

    let verdict: "TAKE" | "GUARDRAIL" | "COUNTER" | "PASS" = "COUNTER";
    if (riskScore < 42) verdict = "PASS";
    else if (coverage >= 0.95 && riskScore >= 65) verdict = "TAKE";
    else if (coverage >= 0.85 && riskScore >= 52) verdict = "GUARDRAIL";
    else if (coverage < 0.58) verdict = "PASS";

    const depositPct = riskScore < 60 || directCosts > fee * 0.15 ? 50 : 40;
    const deposit = Math.ceil((minimumFee * (depositPct / 100)) / 50) * 50;
    const verdictCopy = {
      TAKE: "The money clears your floor and the safeguards are credible.",
      GUARDRAIL:
        "The economics can work, but one weak protection could erase the margin.",
      COUNTER:
        "The project is close enough to repair. Change the price or the scope before saying yes.",
      PASS: "The current deal asks you to carry too much cost, time, or client risk.",
    }[verdict];

    return {
      expectedCreepHours,
      expectedHours,
      rateAfterCosts,
      riskScore,
      riskBuffer,
      minimumFee,
      priceGap,
      verdict,
      verdictCopy,
      deposit,
      depositPct,
    };
  }, [
    adminHours,
    creepChance,
    creepHours,
    deliveryHours,
    directCosts,
    fee,
    paymentDelay,
    protections,
    revisionHours,
    targetRate,
  ]);

  const counterMessage = `Thanks for sharing the details for ${projectName || "the project"}. Based on the delivery time, project overhead, and revision risk, I can take this on at ${money.format(result.minimumFee)}, with a ${result.depositPct}% deposit (${money.format(result.deposit)}) and the agreed scope and revision limit in writing. If the budget needs to remain at ${money.format(fee)}, I can reduce the scope so the project still lands cleanly.`;

  const copyCounter = async () => {
    await navigator.clipboard.writeText(counterMessage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const toggleProtection = (key: ProtectionKey) => {
    setProtections((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <main>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Worth the Work home">
          <span className="brand-mark">W/W</span>
          <span>Worth the Work</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#method">The math</a>
          <a href="#decision-kit">Decision Kit</a>
          <a className="nav-cta" href="#calculator">
            Run a project
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>Free decision calculator</span> For independent work</p>
          <h1>A project fee can look fine. The work can still be a bad deal.</h1>
          <p className="hero-lede">
            Price the hidden hours, client risk, and cash drag before you say yes.
            Get a clear take, counter, or pass decision in under three minutes.
          </p>
          <div className="trust-row" aria-label="Product features">
            <span>No signup</span>
            <span>Private in your browser</span>
            <span>Transparent math</span>
          </div>
          <a className="text-link" href="#calculator">
            Test the sample project <span aria-hidden="true">↓</span>
          </a>
        </div>

        <aside className="preview-card" aria-label="Sample decision preview">
          <div className="preview-topline">
            <span>PROJECT READOUT</span>
            <span className={`mini-verdict ${result.verdict.toLowerCase()}`}>
              {result.verdict}
            </span>
          </div>
          <p className="preview-name">{projectName || "Untitled project"}</p>
          <p className="preview-number">{money.format(result.minimumFee)}</p>
          <p className="preview-caption">minimum fee worth accepting</p>
          <div className="preview-metrics">
            <div>
              <strong>{money.format(result.rateAfterCosts)}</strong>
              <span>effective / hr</span>
            </div>
            <div>
              <strong>{result.riskScore.toFixed(0)}/100</strong>
              <span>deal strength</span>
            </div>
            <div>
              <strong>{result.expectedHours.toFixed(1)}h</strong>
              <span>expected work</span>
            </div>
          </div>
          <div className="preview-note">Your current fee is {result.priceGap > 0 ? `${money.format(result.priceGap)} short` : `${money.format(Math.abs(result.priceGap))} above`}.</div>
        </aside>
      </section>

      <section className="calculator-section" id="calculator">
        <div className="section-heading">
          <p className="kicker">01 / RUN THE DEAL</p>
          <h2>Put the whole project on the table.</h2>
          <p>Use estimates, not optimistic guesses. You can refine the numbers as the brief gets clearer.</p>
        </div>

        <div className="calculator-grid">
          <div className="calculator-panel">
            <div className="panel-heading">
              <span className="panel-number">A</span>
              <div>
                <h3>Money and time</h3>
                <p>The visible deal, plus the work that rarely appears in the quote.</p>
              </div>
            </div>

            <label className="field field-wide" htmlFor="project-name">
              <span className="field-label">Project name</span>
              <span className="input-shell">
                <input
                  id="project-name"
                  type="text"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                />
              </span>
            </label>

            <div className="field-grid">
              <NumberField id="fee" label="Fee offered" prefix="$" value={fee} onChange={setFee} step={50} />
              <NumberField id="costs" label="Direct costs" prefix="$" value={directCosts} onChange={setDirectCosts} step={25} />
              <NumberField id="delivery" label="Delivery work" suffix="hrs" value={deliveryHours} onChange={setDeliveryHours} />
              <NumberField id="admin" label="Meetings + admin" suffix="hrs" value={adminHours} onChange={setAdminHours} />
              <NumberField id="revisions" label="Included revisions" suffix="hrs" value={revisionHours} onChange={setRevisionHours} />
              <NumberField id="rate" label="Your target floor" prefix="$" suffix="/hr" value={targetRate} onChange={setTargetRate} step={5} />
            </div>

            <div className="panel-heading second-heading">
              <span className="panel-number">B</span>
              <div>
                <h3>What could move</h3>
                <p>Risk becomes useful when you translate it into expected time.</p>
              </div>
            </div>

            <div className="range-block">
              <div className="range-label">
                <span>Chance the scope expands</span>
                <strong>{creepChance}%</strong>
              </div>
              <input
                aria-label="Chance the scope expands"
                type="range"
                min="0"
                max="100"
                step="5"
                value={creepChance}
                onChange={(event) => setCreepChance(Number(event.target.value))}
              />
            </div>

            <div className="field-grid compact-grid">
              <NumberField
                id="creep-hours"
                label="Hours added if it does"
                suffix="hrs"
                value={creepHours}
                onChange={setCreepHours}
                hint={`${result.expectedCreepHours.toFixed(1)} expected hours added`}
              />
              <NumberField
                id="delay"
                label="Expected payment delay"
                suffix="days"
                value={paymentDelay}
                onChange={setPaymentDelay}
              />
            </div>

            <fieldset className="protections">
              <legend>Deal protections already confirmed</legend>
              <div className="protection-grid">
                {protectionLabels.map(({ key, label }) => (
                  <button
                    aria-pressed={protections[key]}
                    className={protections[key] ? "protection active" : "protection"}
                    key={key}
                    onClick={() => toggleProtection(key)}
                    type="button"
                  >
                    <span aria-hidden="true">{protections[key] ? "✓" : "+"}</span>
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <aside className={`result-panel verdict-${result.verdict.toLowerCase()}`} aria-live="polite">
            <div className="result-status">
              <span>DECISION</span>
              <strong>{result.verdict}</strong>
            </div>
            <h3>{result.verdictCopy}</h3>
            <p className="result-intro">
              At the current offer, you keep about <strong>{money.format(result.rateAfterCosts)}/hr</strong> after direct costs.
            </p>

            <div className="minimum-card">
              <span>Minimum worth accepting</span>
              <strong>{money.format(result.minimumFee)}</strong>
              <small>Includes a {(result.riskBuffer * 100).toFixed(0)}% risk buffer</small>
            </div>

            <div className="result-list">
              <div><span>Expected workload</span><strong>{result.expectedHours.toFixed(1)} hours</strong></div>
              <div><span>Target floor</span><strong>{money.format(targetRate)}/hr</strong></div>
              <div><span>Suggested deposit</span><strong>{money.format(result.deposit)}</strong></div>
              <div><span>Deal strength</span><strong>{result.riskScore.toFixed(0)} / 100</strong></div>
            </div>

            <div className="counter-block">
              <div className="counter-heading">
                <span>READY-TO-SEND COUNTER</span>
                <button type="button" onClick={copyCounter}>{copied ? "Copied" : "Copy"}</button>
              </div>
              <p>{counterMessage}</p>
            </div>
            <p className="privacy-note">Nothing you enter leaves this page.</p>
          </aside>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="section-heading inverse">
          <p className="kicker">02 / THE METHOD</p>
          <h2>No magic score. Just the parts of the deal people forget to price.</h2>
        </div>
        <div className="method-grid">
          <article>
            <span>01</span>
            <h3>Expected hours</h3>
            <p>Delivery, admin, included revisions, and the probability-weighted cost of scope expansion.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Your actual floor</h3>
            <p>Your target hourly return plus direct project costs. The fee is measured against your economics, not a market average.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Risk buffer</h3>
            <p>Weak scope, missing deposits, vague approvals, rushed timelines, and slow payment increase the margin you need.</p>
          </article>
        </div>
        <p className="formula-note">Minimum fee = (target rate × expected hours + direct costs) × risk buffer.</p>
      </section>

      <section className="kit-section" id="decision-kit">
        <div className="kit-card">
          <div className="kit-copy">
            <p className="kicker">THE PAID TOOLKIT</p>
            <h2>Turn one good decision into a repeatable client filter.</h2>
            <p>
              The Worth the Work Decision Kit compares up to 20 opportunities,
              keeps your pricing logic consistent, and gives you the exact words
              for a counter, scope reduction, deposit request, or clean decline.
            </p>
            <ul>
              <li>Formula-driven project comparison workbook</li>
              <li>24 counteroffer, boundary, and decline scripts</li>
              <li>Risk flag checklist and post-project review</li>
              <li>Editable forever; no subscription</li>
            </ul>
          </div>
          <div className="kit-offer">
            <span>LAUNCH PRICE</span>
            <strong>$19</strong>
            <p>One project priced correctly can cover it.</p>
            <a
              className="checkout-link"
              href="https://prairiegrantscout.gumroad.com/l/worth-the-work"
              rel="noreferrer"
              target="_blank"
            >
              Get the Decision Kit
            </a>
            <small>Instant digital download</small>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-heading">
          <p className="kicker">A FEW STRAIGHT ANSWERS</p>
          <h2>Use the result as a guardrail, not a fortune teller.</h2>
        </div>
        <div className="faq-grid">
          <article>
            <h3>Is the score objective?</h3>
            <p>The arithmetic is consistent; your estimates are still judgment calls. Update the result when the scope changes.</p>
          </article>
          <article>
            <h3>What if I want the project for strategic reasons?</h3>
            <p>Take it knowingly. A lower rate can be rational when the learning, proof, or relationship value is specific—not vague “exposure.”</p>
          </article>
          <article>
            <h3>Does this replace a contract?</h3>
            <p>No. It is a planning tool, not legal, tax, or financial advice. Put the final scope and terms in an agreement appropriate to your situation.</p>
          </article>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark">W/W</span><span>Worth the Work</span></a>
        <p>Make the decision before the project makes it for you.</p>
        <p className="footer-small">© 2026 Worth the Work. Planning estimates only.</p>
      </footer>
    </main>
  );
}
