"use client";

import { useMemo, useState } from "react";
import {
  CurrencyField,
  getCurrencySymbol,
  type CurrencyCode,
} from "../components/CurrencyField";
import {
  calculateLatePayment,
  type LatePaymentRatePeriod,
} from "../lib/latePayment";

type CopiedOutput = "reminder" | "breakdown" | null;

export function LatePaymentCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [invoiceReference, setInvoiceReference] = useState("INV-042");
  const [invoiceAmount, setInvoiceAmount] = useState(2500);
  const [daysOverdue, setDaysOverdue] = useState(45);
  const [gracePeriodDays, setGracePeriodDays] = useState(0);
  const [ratePercent, setRatePercent] = useState(18);
  const [ratePeriod, setRatePeriod] =
    useState<LatePaymentRatePeriod>("annual");
  const [flatFee, setFlatFee] = useState(0);
  const [internalAnnualCostPercent, setInternalAnnualCostPercent] = useState(12);
  const [copied, setCopied] = useState<CopiedOutput>(null);
  const currencySymbol = getCurrencySymbol(currency);
  const money = useMemo(
    () =>
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [currency],
  );

  const result = useMemo(
    () =>
      calculateLatePayment({
        invoiceAmount,
        daysOverdue,
        gracePeriodDays,
        ratePercent,
        ratePeriod,
        flatFee,
        internalAnnualCostPercent,
      }),
    [
      daysOverdue,
      flatFee,
      gracePeriodDays,
      internalAnnualCostPercent,
      invoiceAmount,
      ratePercent,
      ratePeriod,
    ],
  );

  const reference = invoiceReference.trim() || "the outstanding invoice";
  const reminder = `${reference} for ${money.format(result.invoiceAmount)} is ${result.daysOverdue} days overdue. Per our written payment terms, the late charge calculated for this overdue period is ${money.format(result.contractualCharge)}, bringing the updated balance to ${money.format(result.updatedBalance)}. Please confirm the payment date. This calculation uses the terms already entered above; our agreement and applicable law determine whether the charge may be applied.`;
  const breakdown = `${reference}: original balance ${money.format(result.invoiceAmount)} + ${money.format(result.interestCharge)} simple interest + ${money.format(result.appliedFlatFee)} flat fee = ${money.format(result.updatedBalance)} total. Chargeable period: ${result.chargeableDays} days after the ${result.gracePeriodDays}-day grace period. Annualized rate used: ${result.annualizedRatePercent.toFixed(2)}%.`;

  const copyOutput = async (
    kind: Exclude<CopiedOutput, null>,
    text: string,
  ) => {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1600);
  };

  const numberValue = (value: string) => Number(value) || 0;

  return (
    <section
      className="tool-workspace"
      aria-label="Freelance late payment fee calculator"
    >
      <div className="tool-card tool-inputs">
        <div className="tool-card-heading">
          <span>01</span>
          <div>
            <h2>Enter the written payment terms</h2>
            <p>
              Use only the rate, grace period, and fee your agreement and local
              law permit.
            </p>
          </div>
        </div>
        <div className="tool-field-grid">
          <CurrencyField
            id="late-payment-currency"
            value={currency}
            onChange={setCurrency}
          />
          <label className="field" htmlFor="invoice-reference">
            <span className="field-label">Invoice reference</span>
            <span className="input-shell">
              <input
                id="invoice-reference"
                type="text"
                value={invoiceReference}
                onChange={(event) => setInvoiceReference(event.target.value)}
              />
            </span>
          </label>
          <label className="field" htmlFor="invoice-amount">
            <span className="field-label">Outstanding invoice amount</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input
                id="invoice-amount"
                min="0"
                step="50"
                type="number"
                value={invoiceAmount}
                onChange={(event) =>
                  setInvoiceAmount(numberValue(event.target.value))
                }
              />
            </span>
          </label>
          <label className="field" htmlFor="days-overdue">
            <span className="field-label">Days overdue</span>
            <span className="input-shell">
              <input
                id="days-overdue"
                min="0"
                step="1"
                type="number"
                value={daysOverdue}
                onChange={(event) =>
                  setDaysOverdue(numberValue(event.target.value))
                }
              />
              <span className="input-affix suffix">days</span>
            </span>
          </label>
          <label className="field" htmlFor="grace-period">
            <span className="field-label">Grace period after due date</span>
            <span className="input-shell">
              <input
                id="grace-period"
                min="0"
                step="1"
                type="number"
                value={gracePeriodDays}
                onChange={(event) =>
                  setGracePeriodDays(numberValue(event.target.value))
                }
              />
              <span className="input-affix suffix">days</span>
            </span>
          </label>
          <label className="field" htmlFor="rate-period">
            <span className="field-label">Interest rate period</span>
            <span className="input-shell">
              <select
                id="rate-period"
                value={ratePeriod}
                onChange={(event) =>
                  setRatePeriod(event.target.value as LatePaymentRatePeriod)
                }
              >
                <option value="annual">Annual rate</option>
                <option value="monthly">Monthly rate, prorated daily</option>
              </select>
            </span>
          </label>
          <label className="field" htmlFor="late-interest-rate">
            <span className="field-label">
              Written {ratePeriod === "monthly" ? "monthly" : "annual"} rate
            </span>
            <span className="input-shell">
              <input
                id="late-interest-rate"
                min="0"
                max="1000"
                step="0.1"
                type="number"
                value={ratePercent}
                onChange={(event) =>
                  setRatePercent(numberValue(event.target.value))
                }
              />
              <span className="input-affix suffix">%</span>
            </span>
            <span className="field-hint">
              Example value only—replace it with your permitted written rate.
              The calculator uses simple daily proration on a 365-day year.
            </span>
          </label>
          <label className="field" htmlFor="late-flat-fee">
            <span className="field-label">Written flat fee, if any</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input
                id="late-flat-fee"
                min="0"
                step="5"
                type="number"
                value={flatFee}
                onChange={(event) => setFlatFee(numberValue(event.target.value))}
              />
            </span>
          </label>
          <label className="field field-wide" htmlFor="internal-delay-cost">
            <span className="field-label">Your annual cost of delayed cash</span>
            <span className="input-shell">
              <input
                id="internal-delay-cost"
                min="0"
                max="1000"
                step="1"
                type="number"
                value={internalAnnualCostPercent}
                onChange={(event) =>
                  setInternalAnnualCostPercent(numberValue(event.target.value))
                }
              />
              <span className="input-affix suffix">%</span>
            </span>
            <span className="field-hint">
              An internal planning rate for financing, lost return, or cash-flow
              pressure. It is not added to the client balance.
            </span>
          </label>
        </div>
      </div>

      <aside className="tool-card tool-output" aria-live="polite">
        <div className="tool-card-heading">
          <span>02</span>
          <div>
            <h2>Overdue invoice readout</h2>
            <p>
              Separate the contractual calculation from the cost the delay
              creates inside your business.
            </p>
          </div>
        </div>
        <div className="tool-metric-grid">
          <div>
            <span>Chargeable days</span>
            <strong>{result.chargeableDays}</strong>
          </div>
          <div>
            <span>Prorated interest</span>
            <strong>{money.format(result.interestCharge)}</strong>
          </div>
          <div>
            <span>Flat fee applied</span>
            <strong>{money.format(result.appliedFlatFee)}</strong>
          </div>
          <div>
            <span>Total late charge</span>
            <strong>{money.format(result.contractualCharge)}</strong>
          </div>
          <div className="tool-metric-primary">
            <span>Updated balance</span>
            <strong>{money.format(result.updatedBalance)}</strong>
          </div>
          <div>
            <span>Internal cost of the delay</span>
            <strong>{money.format(result.economicDelayCost)}</strong>
          </div>
        </div>
        <div className="tool-script">
          <span>CLIENT-READY REMINDER</span>
          <p>{reminder}</p>
        </div>
        <button
          className="tool-copy-button"
          type="button"
          onClick={() => copyOutput("reminder", reminder)}
        >
          {copied === "reminder" ? "Copied" : "Copy payment reminder"}
        </button>
        <div className="tool-script">
          <span>CALCULATION RECORD</span>
          <p>{breakdown}</p>
        </div>
        <button
          className="tool-copy-button"
          type="button"
          onClick={() => copyOutput("breakdown", breakdown)}
        >
          {copied === "breakdown" ? "Copied" : "Copy calculation record"}
        </button>
      </aside>
    </section>
  );
}
