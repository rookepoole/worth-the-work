"use client";

import { useMemo, useState } from "react";

export function ScopeCreepClauseGenerator() {
  const [revisionRounds, setRevisionRounds] = useState(2);
  const [extraRoundFee, setExtraRoundFee] = useState(300);
  const [feedbackOwner, setFeedbackOwner] = useState("the designated client contact");
  const [deliverables, setDeliverables] = useState("the deliverables listed in this proposal");
  const [copied, setCopied] = useState(false);

  const clause = useMemo(
    () =>
      `The project fee covers ${deliverables || "the agreed deliverables"}, including up to ${revisionRounds} consolidated revision ${revisionRounds === 1 ? "round" : "rounds"}. A revision round means one complete set of feedback submitted at the same time by ${feedbackOwner || "the designated client contact"}. New deliverables, changes to an approved direction, additional revision rounds, or requests outside the listed scope will be treated as a change request. Additional revision rounds are billed at $${extraRoundFee.toLocaleString("en-US")} each unless otherwise quoted. Before beginning out-of-scope work, the freelancer will provide the added fee and any schedule adjustment in writing. Work on a change request begins only after written approval.`,
    [deliverables, extraRoundFee, feedbackOwner, revisionRounds],
  );

  const copyClause = async () => {
    await navigator.clipboard.writeText(clause);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="tool-workspace" aria-label="Scope creep clause generator">
      <div className="tool-card tool-inputs">
        <div className="tool-card-heading">
          <span>01</span>
          <div><h2>Choose the boundaries</h2><p>Use terms that match the actual proposal.</p></div>
        </div>
        <div className="tool-field-grid">
          <label className="field" htmlFor="revision-rounds">
            <span className="field-label">Included revision rounds</span>
            <span className="input-shell">
              <input id="revision-rounds" min="0" max="10" type="number" value={revisionRounds} onChange={(event) => setRevisionRounds(Math.max(0, Number(event.target.value) || 0))} />
            </span>
          </label>
          <label className="field" htmlFor="extra-round-fee">
            <span className="field-label">Fee for another round</span>
            <span className="input-shell"><span className="input-affix">$</span><input id="extra-round-fee" min="0" step="25" type="number" value={extraRoundFee} onChange={(event) => setExtraRoundFee(Math.max(0, Number(event.target.value) || 0))} /></span>
          </label>
          <label className="field field-wide" htmlFor="feedback-owner">
            <span className="field-label">Who consolidates feedback?</span>
            <span className="input-shell"><input id="feedback-owner" type="text" value={feedbackOwner} onChange={(event) => setFeedbackOwner(event.target.value)} /></span>
          </label>
          <label className="field field-wide" htmlFor="scope-deliverables">
            <span className="field-label">What does the fee cover?</span>
            <span className="input-shell"><input id="scope-deliverables" type="text" value={deliverables} onChange={(event) => setDeliverables(event.target.value)} /></span>
          </label>
        </div>
      </div>
      <aside className="tool-card tool-output" aria-live="polite">
        <div className="tool-card-heading">
          <span>02</span>
          <div><h2>Adapt the clause</h2><p>Review every term before putting it in an agreement.</p></div>
        </div>
        <blockquote>{clause}</blockquote>
        <button className="tool-copy-button" type="button" onClick={copyClause}>{copied ? "Copied" : "Copy clause"}</button>
      </aside>
    </section>
  );
}
