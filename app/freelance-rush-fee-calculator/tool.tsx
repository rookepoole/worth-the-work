"use client";

import { useMemo, useState } from "react";
import {
  createMoneyFormatter,
  CurrencyField,
  getCurrencySymbol,
  type CurrencyCode,
} from "../components/CurrencyField";
import {
  calculateRushFee,
  suggestedMarkupForCompression,
  timelineCompression,
} from "../lib/rushFee";

type CopiedOutput = "quote" | "clause" | null;

export function RushFeeCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [basePrice, setBasePrice] = useState(1200);
  const [normalDays, setNormalDays] = useState(10);
  const [requestedDays, setRequestedDays] = useState(3);
  const [estimatedHours, setEstimatedHours] = useState(10);
  const [minimumHourlyRate, setMinimumHourlyRate] = useState(90);
  const [markupPercent, setMarkupPercent] = useState(50);
  const [displacedWork, setDisplacedWork] = useState(250);
  const [offHoursRequired, setOffHoursRequired] = useState(true);
  const [offHoursPercent, setOffHoursPercent] = useState(15);
  const [copied, setCopied] = useState<CopiedOutput>(null);
  const money = useMemo(() => createMoneyFormatter(currency), [currency]);
  const currencySymbol = getCurrencySymbol(currency);

  const compression = timelineCompression(normalDays, requestedDays);
  const suggestedMarkup = suggestedMarkupForCompression(compression);
  const result = useMemo(
    () =>
      calculateRushFee({
        basePrice,
        estimatedHours,
        minimumHourlyRate,
        markupPercent,
        displacedWork,
        offHoursRequired,
        offHoursPercent,
      }),
    [
      basePrice,
      displacedWork,
      estimatedHours,
      markupPercent,
      minimumHourlyRate,
      offHoursPercent,
      offHoursRequired,
    ],
  );

  const quoteMessage = `Thanks for checking the accelerated timeline. My standard fee is ${money.format(basePrice)} for a ${normalDays}-day schedule. I can prioritize a ${requestedDays}-day delivery for ${money.format(result.total)}, including the rush surcharge of ${money.format(result.surcharge)}. This is subject to availability, written approval, receipt of final materials, and the agreed revision limit. If you prefer the standard fee, the original ${normalDays}-day schedule remains available.`;

  const clause = `Rush work means any request requiring delivery in fewer than ${normalDays} calendar days or work outside normal business hours. Rush scheduling is subject to availability and written approval. Approved rush work carries a ${markupPercent}% surcharge on the base project fee${offHoursRequired ? ` plus ${offHoursPercent}% when evening, weekend, or holiday work is required` : ""}. The revised fee and delivery date must be approved before expedited work begins.`;

  const copyOutput = async (kind: Exclude<CopiedOutput, null>, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1600);
  };

  const numberValue = (value: string) => Number(value) || 0;

  return (
    <section className="tool-workspace rush-workspace" aria-label="Freelance rush fee calculator">
      <div className="tool-card tool-inputs">
        <div className="tool-card-heading">
          <span>01</span>
          <div>
            <h2>Price the schedule disruption</h2>
            <p>Start with your normal quote, then protect the work the rush displaces.</p>
          </div>
        </div>
        <div className="tool-field-grid">
          <CurrencyField id="rush-currency" value={currency} onChange={setCurrency} />
          <label className="field" htmlFor="rush-base-price">
            <span className="field-label">Standard project fee</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input id="rush-base-price" min="0" step="50" type="number" value={basePrice} onChange={(event) => setBasePrice(numberValue(event.target.value))} />
            </span>
          </label>
          <label className="field" htmlFor="normal-days">
            <span className="field-label">Normal delivery time</span>
            <span className="input-shell">
              <input id="normal-days" min="1" type="number" value={normalDays} onChange={(event) => setNormalDays(Math.max(1, numberValue(event.target.value)))} />
              <span className="input-affix suffix">days</span>
            </span>
          </label>
          <label className="field" htmlFor="requested-days">
            <span className="field-label">Requested turnaround</span>
            <span className="input-shell">
              <input id="requested-days" min="1" type="number" value={requestedDays} onChange={(event) => setRequestedDays(Math.max(1, numberValue(event.target.value)))} />
              <span className="input-affix suffix">days</span>
            </span>
          </label>
          <label className="field" htmlFor="rush-hours">
            <span className="field-label">Hours the rush work takes</span>
            <span className="input-shell">
              <input id="rush-hours" min="0" step="0.5" type="number" value={estimatedHours} onChange={(event) => setEstimatedHours(numberValue(event.target.value))} />
              <span className="input-affix suffix">hrs</span>
            </span>
          </label>
          <label className="field" htmlFor="minimum-rate">
            <span className="field-label">Minimum effective rate</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input id="minimum-rate" min="0" step="5" type="number" value={minimumHourlyRate} onChange={(event) => setMinimumHourlyRate(numberValue(event.target.value))} />
              <span className="input-affix suffix">/hr</span>
            </span>
          </label>
          <label className="field" htmlFor="rush-markup">
            <span className="field-label">Your rush policy markup</span>
            <span className="input-shell">
              <input id="rush-markup" min="0" max="500" step="5" type="number" value={markupPercent} onChange={(event) => setMarkupPercent(numberValue(event.target.value))} />
              <span className="input-affix suffix">%</span>
            </span>
            <span className="field-hint">
              This timeline is {Math.round(compression * 100)}% shorter. A neutral planning start is {suggestedMarkup}%; use your own written policy.
            </span>
          </label>
          <label className="field" htmlFor="displaced-work">
            <span className="field-label">Billable work displaced</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input id="displaced-work" min="0" step="25" type="number" value={displacedWork} onChange={(event) => setDisplacedWork(numberValue(event.target.value))} />
            </span>
            <span className="field-hint">Revenue you delay, decline, or reschedule to make room.</span>
          </label>
          <label className="field field-wide rush-toggle" htmlFor="off-hours-required">
            <span>
              <input id="off-hours-required" type="checkbox" checked={offHoursRequired} onChange={(event) => setOffHoursRequired(event.target.checked)} />
              <span>
                <strong>Evening, weekend, or holiday work required</strong>
                <small>Add the off-hours policy only when the deadline actually forces it.</small>
              </span>
            </span>
            <span className="input-shell rush-off-hours-rate">
              <input aria-label="Off-hours surcharge" disabled={!offHoursRequired} min="0" max="500" step="5" type="number" value={offHoursPercent} onChange={(event) => setOffHoursPercent(numberValue(event.target.value))} />
              <span className="input-affix suffix">%</span>
            </span>
          </label>
        </div>
      </div>

      <aside className="tool-card tool-output" aria-live="polite">
        <div className="tool-card-heading">
          <span>02</span>
          <div>
            <h2>Rush quote readout</h2>
            <p>The surcharge protects the largest core cost, then adds genuine off-hours work.</p>
          </div>
        </div>
        <div className="tool-metric-grid">
          <div><span>Policy markup amount</span><strong>{money.format(result.percentageSurcharge)}</strong></div>
          <div><span>Minimum-rate shortfall</span><strong>{money.format(result.floorGap)}</strong></div>
          <div><span>Displaced billable work</span><strong>{money.format(result.displacedWork)}</strong></div>
          <div><span>Off-hours surcharge</span><strong>{money.format(result.offHoursSurcharge)}</strong></div>
          <div><span>Rush surcharge</span><strong>{money.format(result.surcharge)}</strong></div>
          <div className="tool-metric-primary"><span>Client quote total</span><strong>{money.format(result.total)}</strong></div>
          <div><span>Rush effective rate</span><strong>{money.format(result.effectiveHourlyRate)}/hr</strong></div>
        </div>
        <div className="tool-script"><span>READY-TO-SEND QUOTE</span><p>{quoteMessage}</p></div>
        <button className="tool-copy-button" type="button" onClick={() => copyOutput("quote", quoteMessage)}>{copied === "quote" ? "Copied" : "Copy client quote"}</button>
        <div className="tool-script"><span>REUSABLE RUSH CLAUSE</span><p>{clause}</p></div>
        <button className="tool-copy-button" type="button" onClick={() => copyOutput("clause", clause)}>{copied === "clause" ? "Copied" : "Copy rush clause"}</button>
      </aside>
    </section>
  );
}
