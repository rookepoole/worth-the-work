"use client";

import { useMemo, useState } from "react";

type ResponseMode = "hold" | "reduce" | "phase" | "decline";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const modeLabels: Array<{ value: ResponseMode; label: string }> = [
  { value: "hold", label: "Hold scope + price" },
  { value: "reduce", label: "Reduce the scope" },
  { value: "phase", label: "Offer a paid first phase" },
  { value: "decline", label: "Decline cleanly" },
];

export function QuoteResponseGenerator() {
  const [mode, setMode] = useState<ResponseMode>("reduce");
  const [quotedFee, setQuotedFee] = useState(3500);
  const [clientBudget, setClientBudget] = useState(2000);
  const [reducedScope, setReducedScope] = useState("strategy and one core deliverable");
  const [revisionRounds, setRevisionRounds] = useState(1);
  const [copied, setCopied] = useState(false);

  const response = useMemo(() => {
    const quote = money.format(quotedFee);
    const budget = money.format(clientBudget);
    const scope = reducedScope || "a smaller defined deliverable";
    const rounds = `${revisionRounds} revision ${revisionRounds === 1 ? "round" : "rounds"}`;

    if (mode === "hold") {
      return `Thanks for letting me know. The ${quote} fee reflects the deliverables, timeline, and revision allowance we discussed. I can hold that scope at ${quote}. If that is outside the current budget, I am happy to suggest a smaller version rather than reduce the same scope.`;
    }
    if (mode === "phase") {
      return `Rather than compress the full ${quote} project into a ${budget} budget, I recommend a paid first phase covering ${scope} for ${budget}, with ${rounds}. You will have a useful standalone deliverable, and we can price the remaining work with better information afterward.`;
    }
    if (mode === "decline") {
      return `Thank you for considering me. I cannot deliver the proposed scope responsibly within the ${budget} budget, so I will step back from this version of the project. If the scope, schedule, or budget changes, I would be glad to revisit it.`;
    }
    return `I can work within ${budget} by narrowing the project to ${scope}, with ${rounds}. The remaining items from the ${quote} proposal can become a second phase when the budget allows. If you would like the full original scope now, the fee remains ${quote}.`;
  }, [clientBudget, mode, quotedFee, reducedScope, revisionRounds]);

  const copyResponse = async () => {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="tool-workspace" aria-label="Freelance quote response generator">
      <div className="tool-card tool-inputs">
        <div className="tool-card-heading">
          <span>01</span>
          <div><h2>Choose the tradeoff</h2><p>Change a real variable—not just the price.</p></div>
        </div>
        <fieldset className="tool-mode-picker">
          <legend>Response strategy</legend>
          <div>
            {modeLabels.map((option) => (
              <button key={option.value} aria-pressed={mode === option.value} type="button" onClick={() => setMode(option.value)}>{option.label}</button>
            ))}
          </div>
        </fieldset>
        <div className="tool-field-grid">
          <label className="field" htmlFor="quoted-fee">
            <span className="field-label">Your quoted fee</span>
            <span className="input-shell"><span className="input-affix">$</span><input id="quoted-fee" min="0" step="50" type="number" value={quotedFee} onChange={(event) => setQuotedFee(Number(event.target.value) || 0)} /></span>
          </label>
          <label className="field" htmlFor="client-budget">
            <span className="field-label">Client budget</span>
            <span className="input-shell"><span className="input-affix">$</span><input id="client-budget" min="0" step="50" type="number" value={clientBudget} onChange={(event) => setClientBudget(Number(event.target.value) || 0)} /></span>
          </label>
          <label className="field field-wide" htmlFor="reduced-scope">
            <span className="field-label">Smaller scope or first phase</span>
            <span className="input-shell"><input id="reduced-scope" type="text" value={reducedScope} onChange={(event) => setReducedScope(event.target.value)} /></span>
          </label>
          <label className="field" htmlFor="quote-revisions">
            <span className="field-label">Revisions in the smaller option</span>
            <span className="input-shell"><input id="quote-revisions" min="0" max="10" type="number" value={revisionRounds} onChange={(event) => setRevisionRounds(Math.max(0, Number(event.target.value) || 0))} /></span>
          </label>
        </div>
      </div>
      <aside className="tool-card tool-output" aria-live="polite">
        <div className="tool-card-heading">
          <span>02</span>
          <div><h2>Your response</h2><p>Edit names, dates, and deliverables before sending.</p></div>
        </div>
        <blockquote>{response}</blockquote>
        <button className="tool-copy-button" type="button" onClick={copyResponse}>{copied ? "Copied" : "Copy response"}</button>
      </aside>
    </section>
  );
}
