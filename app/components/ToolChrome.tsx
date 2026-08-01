import Link from "next/link";
import type { ReactNode } from "react";
import { TrackedOfferLink } from "./TrackedOfferLink";

export function ToolChrome({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Worth the Work home">
          <span className="brand-mark">W/W</span>
          <span>Worth the Work</span>
        </Link>
        <nav aria-label="Tool navigation">
          <Link href="/#calculator">Project calculator</Link>
          <TrackedOfferLink
            className="nav-cta"
            offer="paid"
            medium="tool"
            content="tool_header"
          >
            Decision Kit
          </TrackedOfferLink>
        </nav>
      </header>
      <main className="tool-page">
        <section className="tool-hero">
          <p className="eyebrow"><span>{eyebrow}</span> Free browser tool</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="trust-row" aria-label="Tool features">
            <span>No signup</span>
            <span>Private in your browser</span>
            <span>Copy-ready output</span>
          </div>
        </section>
        {children}
        <section className="tool-funnel">
          <div>
            <p className="kicker">NEED THE COMPLETE SYSTEM?</p>
            <h2>Use one decision process across every project.</h2>
            <p>
              Worth the Work includes the editable 20-project workbook and 24
              client-ready counteroffer, scope, deposit, and decline scripts.
            </p>
          </div>
          <div className="tool-funnel-actions">
            <TrackedOfferLink
              className="checkout-link"
              offer="paid"
              medium="tool"
              content="tool_footer_paid"
            >
              Get the $19 Decision Kit
            </TrackedOfferLink>
            <TrackedOfferLink
              className="secondary-offer-link"
              offer="free"
              medium="tool"
              content="tool_footer_free"
            >
              Get the free red-flag checklist
            </TrackedOfferLink>
          </div>
        </section>
        <p className="tool-disclaimer">
          General planning information only—not legal, tax, or financial
          advice. Review contract language with a qualified professional for
          your jurisdiction and circumstances. Inputs stay in your browser;
          this site uses no analytics, cookies, or accounts. {" "}
          <a href="https://github.com/rookepoole/worth-the-work">
            Open-source MIT code
          </a>
          .
        </p>
      </main>
    </>
  );
}
