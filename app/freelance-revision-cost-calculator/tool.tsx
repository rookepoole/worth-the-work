"use client";

import { useMemo, useState } from "react";
import {
  createMoneyFormatter,
  CurrencyField,
  getCurrencySymbol,
  type CurrencyCode,
} from "../components/CurrencyField";

export function RevisionCostCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [chance, setChance] = useState(60);
  const [hours, setHours] = useState(4);
  const [rate, setRate] = useState(75);
  const [includedRounds, setIncludedRounds] = useState(2);
  const [buffer, setBuffer] = useState(15);
  const [copied, setCopied] = useState(false);
  const money = useMemo(() => createMoneyFormatter(currency), [currency]);
  const currencySymbol = getCurrencySymbol(currency);

  const result = useMemo(() => {
    const baseCost = Math.max(0, hours * rate);
    const expectedCost = (Math.max(0, Math.min(100, chance)) / 100) * baseCost;
    const extraRoundFee = Math.ceil((baseCost * (1 + Math.max(0, buffer) / 100)) / 25) * 25;
    return { baseCost, expectedCost, extraRoundFee };
  }, [buffer, chance, hours, rate]);

  const message = `The project includes ${includedRounds} consolidated revision ${includedRounds === 1 ? "round" : "rounds"}. We have now completed the included rounds. I can make the additional changes as a new revision round for ${money.format(result.extraRoundFee)}, with the delivery date confirmed after approval. Reply with written approval and I will add it to the schedule.`;

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="tool-workspace" aria-label="Freelance revision cost calculator">
      <div className="tool-card tool-inputs">
        <div className="tool-card-heading">
          <span>01</span>
          <div><h2>Model one revision round</h2><p>Use the expected work, not the best case.</p></div>
        </div>
        <div className="tool-field-grid">
          <CurrencyField id="revision-currency" value={currency} onChange={setCurrency} />
          <label className="field" htmlFor="revision-chance">
            <span className="field-label">Chance the round happens</span>
            <span className="input-shell"><input id="revision-chance" min="0" max="100" type="number" value={chance} onChange={(event) => setChance(Number(event.target.value) || 0)} /><span className="input-affix suffix">%</span></span>
          </label>
          <label className="field" htmlFor="revision-hours">
            <span className="field-label">Hours the round takes</span>
            <span className="input-shell"><input id="revision-hours" min="0" step="0.5" type="number" value={hours} onChange={(event) => setHours(Number(event.target.value) || 0)} /><span className="input-affix suffix">hrs</span></span>
          </label>
          <label className="field" htmlFor="revision-rate">
            <span className="field-label">Target hourly return</span>
            <span className="input-shell"><span className="input-affix">{currencySymbol}</span><input id="revision-rate" min="0" step="5" type="number" value={rate} onChange={(event) => setRate(Number(event.target.value) || 0)} /></span>
          </label>
          <label className="field" htmlFor="included-rounds">
            <span className="field-label">Rounds already included</span>
            <span className="input-shell"><input id="included-rounds" min="0" max="10" type="number" value={includedRounds} onChange={(event) => setIncludedRounds(Math.max(0, Number(event.target.value) || 0))} /></span>
          </label>
          <label className="field field-wide" htmlFor="revision-buffer">
            <span className="field-label">Extra-round coordination buffer</span>
            <span className="input-shell"><input id="revision-buffer" min="0" max="100" type="number" value={buffer} onChange={(event) => setBuffer(Number(event.target.value) || 0)} /><span className="input-affix suffix">%</span></span>
            <span className="field-hint">Covers rescheduling, communication, invoicing, and context switching.</span>
          </label>
        </div>
      </div>
      <aside className="tool-card tool-output" aria-live="polite">
        <div className="tool-card-heading">
          <span>02</span>
          <div><h2>Revision pricing readout</h2><p>Round prices are rounded up to the nearest 25 in {currency}.</p></div>
        </div>
        <div className="tool-metric-grid">
          <div><span>Expected cost inside the quote</span><strong>{money.format(result.expectedCost)}</strong></div>
          <div><span>Full labor cost if it happens</span><strong>{money.format(result.baseCost)}</strong></div>
          <div className="tool-metric-primary"><span>Suggested extra-round fee</span><strong>{money.format(result.extraRoundFee)}</strong></div>
        </div>
        <div className="tool-script"><span>READY-TO-SEND MESSAGE</span><p>{message}</p></div>
        <button className="tool-copy-button" type="button" onClick={copyMessage}>{copied ? "Copied" : "Copy message"}</button>
      </aside>
    </section>
  );
}
