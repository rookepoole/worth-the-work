"use client";

import { useMemo, useState } from "react";
import {
  CurrencyField,
  getCurrencySymbol,
  type CurrencyCode,
} from "../components/CurrencyField";
import {
  generateOverdueInvoiceEmail,
  type InvoiceFollowUpState,
} from "../lib/overdueInvoiceEmail";

const followUpStates: Array<{
  value: InvoiceFollowUpState;
  label: string;
}> = [
  { value: "no_response", label: "No response yet" },
  { value: "acknowledged", label: "Client acknowledged it" },
  { value: "promised_missed", label: "Promised date was missed" },
  { value: "partial_payment", label: "Partial payment received" },
  { value: "question_or_dispute", label: "Client raised a question" },
];

export function OverdueInvoiceEmailGenerator() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [clientName, setClientName] = useState("Morgan");
  const [senderName, setSenderName] = useState("Riley");
  const [invoiceReference, setInvoiceReference] = useState("INV-042");
  const [invoiceAmount, setInvoiceAmount] = useState(2500);
  const [daysOverdue, setDaysOverdue] = useState(8);
  const [followUpState, setFollowUpState] =
    useState<InvoiceFollowUpState>("no_response");
  const [promisedDate, setPromisedDate] = useState("Friday, July 31");
  const [partialPaymentAmount, setPartialPaymentAmount] = useState(1000);
  const [issueSummary, setIssueSummary] = useState(
    "the hours listed for the final revision",
  );
  const [copied, setCopied] = useState(false);
  const currencySymbol = getCurrencySymbol(currency);

  const email = useMemo(
    () =>
      generateOverdueInvoiceEmail({
        clientName,
        senderName,
        invoiceReference,
        invoiceAmount,
        currency,
        daysOverdue,
        followUpState,
        promisedDate,
        partialPaymentAmount,
        issueSummary,
      }),
    [
      clientName,
      currency,
      daysOverdue,
      followUpState,
      invoiceAmount,
      invoiceReference,
      issueSummary,
      partialPaymentAmount,
      promisedDate,
      senderName,
    ],
  );

  const copyEmail = async () => {
    await navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      className="tool-workspace"
      aria-label="Freelance overdue invoice email generator"
    >
      <div className="tool-card tool-inputs">
        <div className="tool-card-heading">
          <span>01</span>
          <div>
            <h2>Describe the payment state</h2>
            <p>The message changes with the delay and the client’s last action.</p>
          </div>
        </div>
        <div className="tool-field-grid">
          <label className="field" htmlFor="overdue-client-name">
            <span className="field-label">Client name</span>
            <span className="input-shell">
              <input id="overdue-client-name" type="text" value={clientName} onChange={(event) => setClientName(event.target.value)} />
            </span>
          </label>
          <label className="field" htmlFor="overdue-sender-name">
            <span className="field-label">Your name</span>
            <span className="input-shell">
              <input id="overdue-sender-name" type="text" value={senderName} onChange={(event) => setSenderName(event.target.value)} />
            </span>
          </label>
          <CurrencyField id="overdue-email-currency" value={currency} onChange={setCurrency} />
          <label className="field" htmlFor="overdue-invoice-reference">
            <span className="field-label">Invoice reference</span>
            <span className="input-shell">
              <input id="overdue-invoice-reference" type="text" value={invoiceReference} onChange={(event) => setInvoiceReference(event.target.value)} />
            </span>
          </label>
          <label className="field" htmlFor="overdue-invoice-amount">
            <span className="field-label">Outstanding invoice amount</span>
            <span className="input-shell">
              <span className="input-affix">{currencySymbol}</span>
              <input id="overdue-invoice-amount" min="0" step="50" type="number" value={invoiceAmount} onChange={(event) => setInvoiceAmount(Number(event.target.value) || 0)} />
            </span>
          </label>
          <label className="field" htmlFor="overdue-days">
            <span className="field-label">Days overdue</span>
            <span className="input-shell">
              <input id="overdue-days" min="1" step="1" type="number" value={daysOverdue} onChange={(event) => setDaysOverdue(Math.max(1, Number(event.target.value) || 1))} />
              <span className="input-affix suffix">days</span>
            </span>
          </label>
          <label className="field field-wide" htmlFor="follow-up-state">
            <span className="field-label">What happened after the last invoice or reminder?</span>
            <span className="input-shell">
              <select id="follow-up-state" value={followUpState} onChange={(event) => setFollowUpState(event.target.value as InvoiceFollowUpState)}>
                {followUpStates.map((state) => <option key={state.value} value={state.value}>{state.label}</option>)}
              </select>
            </span>
          </label>
          {followUpState === "promised_missed" ? (
            <label className="field field-wide" htmlFor="promised-date">
              <span className="field-label">Promised payment date</span>
              <span className="input-shell">
                <input id="promised-date" type="text" value={promisedDate} onChange={(event) => setPromisedDate(event.target.value)} />
              </span>
            </label>
          ) : null}
          {followUpState === "partial_payment" ? (
            <label className="field field-wide" htmlFor="partial-payment-amount">
              <span className="field-label">Payment already received</span>
              <span className="input-shell">
                <span className="input-affix">{currencySymbol}</span>
                <input id="partial-payment-amount" min="0" max={invoiceAmount} step="50" type="number" value={partialPaymentAmount} onChange={(event) => setPartialPaymentAmount(Number(event.target.value) || 0)} />
              </span>
            </label>
          ) : null}
          {followUpState === "question_or_dispute" ? (
            <label className="field field-wide" htmlFor="issue-summary">
              <span className="field-label">Question or issue raised</span>
              <span className="input-shell">
                <input id="issue-summary" type="text" value={issueSummary} onChange={(event) => setIssueSummary(event.target.value)} />
              </span>
            </label>
          ) : null}
        </div>
      </div>
      <aside className="tool-card tool-output" aria-live="polite">
        <div className="tool-card-heading">
          <span>02</span>
          <div>
            <h2>Your overdue-invoice email</h2>
            <p>{email.stage}. Review every fact before sending.</p>
          </div>
        </div>
        <div className="tool-script">
          <span>SUBJECT</span>
          <p>{email.subject}</p>
        </div>
        <div className="tool-script">
          <span>MESSAGE</span>
          <p className="tool-email-body">{email.body}</p>
        </div>
        <button className="tool-copy-button" type="button" onClick={copyEmail}>
          {copied ? "Copied" : "Copy subject + email"}
        </button>
      </aside>
    </section>
  );
}
