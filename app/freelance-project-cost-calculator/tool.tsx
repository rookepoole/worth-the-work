"use client";

import { useMemo, useState } from "react";
import {
  createMoneyFormatter,
  CurrencyField,
  getCurrencySymbol,
  type CurrencyCode,
} from "../components/CurrencyField";
import { calculateProjectCost } from "../lib/projectCost";

export function ProjectCostCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [projectName, setProjectName] = useState("Website redesign");
  const [deliveryHours, setDeliveryHours] = useState(28);
  const [discoveryHours, setDiscoveryHours] = useState(4);
  const [adminHours, setAdminHours] = useState(6);
  const [targetHourlyRate, setTargetHourlyRate] = useState(100);
  const [directCosts, setDirectCosts] = useState(200);
  const [contingencyPercent, setContingencyPercent] = useState(15);
  const [operatingMarginPercent, setOperatingMarginPercent] = useState(20);
  const [depositPercent, setDepositPercent] = useState(40);
  const [copied, setCopied] = useState(false);
  const money = useMemo(() => createMoneyFormatter(currency), [currency]);
  const currencySymbol = getCurrencySymbol(currency);

  const result = useMemo(
    () =>
      calculateProjectCost({
        deliveryHours,
        discoveryHours,
        adminHours,
        targetHourlyRate,
        directCosts,
        contingencyPercent,
        operatingMarginPercent,
        depositPercent,
      }),
    [
      adminHours,
      contingencyPercent,
      deliveryHours,
      depositPercent,
      directCosts,
      discoveryHours,
      operatingMarginPercent,
      targetHourlyRate,
    ],
  );

  const quoteSummary = `For ${projectName || "the project"}, my project fee is ${money.format(result.recommendedQuote)}. This covers the agreed deliverables, approximately ${result.totalHours} working hours, and the direct project costs in the estimate. A ${depositPercent}% booking deposit of ${money.format(result.deposit)} is due before work begins, with the remaining balance due under the agreed payment schedule. This quote assumes one defined scope, timely materials and consolidated feedback. New deliverables or material scope changes will be estimated separately.`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(quoteSummary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const numberValue = (value: string) => Number(value) || 0;

  return (
    <section
      className="tool-workspace"
      aria-label="Freelance project cost calculator"
    >
      <div className="tool-card tool-inputs">
        <div className="tool-card-heading">
          <span>01</span>
          <div>
            <h2>Estimate the complete workload</h2>
            <p>Count delivery, coordination, project costs, and uncertainty.</p>
          </div>
        </div>
        <div className="tool-field-grid">
          <CurrencyField
            id="project-cost-currency"
            value={currency}
            onChange={setCurrency}
          />
          <label className="field" htmlFor="project-name">
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
          <label className="field" htmlFor="delivery-hours">
            <span className="field-label">Delivery and production</span>
            <span className="input-shell">
              <input id="delivery-hours" min="0" step="0.5" type="number" value={deliveryHours} onChange={(event) => setDeliveryHours(numberValue(event.target.value))} />
              <span className="input-affix suffix">hrs</span>
            </span>
          </label>
          <label className="field" htmlFor="discovery-hours">
            <span className="field-label">Discovery and meetings</span>
            <span className="input-shell">
              <input id="discovery-hours" min="0" step="0.5" type="number" value={discoveryHours} onChange={(event) => setDiscoveryHours(numberValue(event.target.value))} />
              <span className="input-affix suffix">hrs</span>
            </span>
          </label>
          <label className="field" htmlFor="admin-hours">
            <span className="field-label">Admin and communication</span>
            <span className="input-shell">
              <input id="admin-hours" min="0" step="0.5" type="number" value={adminHours} onChange={(event) => setAdminHours(numberValue(event.target.value))} />
              <span className="input-affix suffix">hrs</span>
            </span>
          </label>
          <label className="field" htmlFor="target-rate">
            <span className="field-label">Target hourly return</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input id="target-rate" min="0" step="5" type="number" value={targetHourlyRate} onChange={(event) => setTargetHourlyRate(numberValue(event.target.value))} />
              <span className="input-affix suffix">/hr</span>
            </span>
          </label>
          <label className="field" htmlFor="direct-costs">
            <span className="field-label">Direct project costs</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input id="direct-costs" min="0" step="25" type="number" value={directCosts} onChange={(event) => setDirectCosts(numberValue(event.target.value))} />
            </span>
            <span className="field-hint">Contractors, stock, travel, licenses, hosting, or materials.</span>
          </label>
          <label className="field" htmlFor="contingency-percent">
            <span className="field-label">Estimate contingency</span>
            <span className="input-shell">
              <input id="contingency-percent" min="0" max="200" step="5" type="number" value={contingencyPercent} onChange={(event) => setContingencyPercent(numberValue(event.target.value))} />
              <span className="input-affix suffix">%</span>
            </span>
            <span className="field-hint">Protects normal uncertainty, not unlimited scope.</span>
          </label>
          <label className="field" htmlFor="operating-margin">
            <span className="field-label">Operating / reinvestment margin</span>
            <span className="input-shell">
              <input id="operating-margin" min="0" max="90" step="5" type="number" value={operatingMarginPercent} onChange={(event) => setOperatingMarginPercent(numberValue(event.target.value))} />
              <span className="input-affix suffix">%</span>
            </span>
            <span className="field-hint">Optional margin after the protected project cost; this is not a tax estimate.</span>
          </label>
          <label className="field" htmlFor="deposit-percent">
            <span className="field-label">Booking deposit</span>
            <span className="input-shell">
              <input id="deposit-percent" min="0" max="100" step="5" type="number" value={depositPercent} onChange={(event) => setDepositPercent(numberValue(event.target.value))} />
              <span className="input-affix suffix">%</span>
            </span>
          </label>
        </div>
      </div>

      <aside className="tool-card tool-output" aria-live="polite">
        <div className="tool-card-heading">
          <span>02</span>
          <div>
            <h2>Project quote estimate</h2>
            <p>The client quote is rounded up to the nearest 50 in {currency}.</p>
          </div>
        </div>
        <div className="tool-metric-grid">
          <div><span>Total working time</span><strong>{result.totalHours} hrs</strong></div>
          <div><span>Labor value</span><strong>{money.format(result.laborValue)}</strong></div>
          <div><span>Direct project costs</span><strong>{money.format(result.directCosts)}</strong></div>
          <div><span>Contingency reserve</span><strong>{money.format(result.contingencyReserve)}</strong></div>
          <div><span>Protected project cost</span><strong>{money.format(result.protectedCost)}</strong></div>
          <div><span>Operating margin in quote</span><strong>{money.format(result.operatingMarginAmount)}</strong></div>
          <div className="tool-metric-primary"><span>Recommended client quote</span><strong>{money.format(result.recommendedQuote)}</strong></div>
          <div><span>Effective return after costs</span><strong>{money.format(result.effectiveHourlyRate)}/hr</strong></div>
          <div><span>Deposit to request</span><strong>{money.format(result.deposit)}</strong></div>
        </div>
        <div className="tool-script"><span>CLIENT-READY QUOTE SUMMARY</span><p>{quoteSummary}</p></div>
        <button className="tool-copy-button" type="button" onClick={copySummary}>{copied ? "Copied" : "Copy quote summary"}</button>
      </aside>
    </section>
  );
}
