import Link from "next/link";
import type { ReactNode } from "react";
import type { Offer } from "../lib/offerAttribution";
import { TrackedOfferLink } from "./TrackedOfferLink";

export function ToolChrome({
  eyebrow,
  title,
  description,
  funnel,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  funnel?: {
    kicker?: string;
    title?: string;
    description?: string;
    paidOffer?: Offer;
    paidLabel?: string;
    paidContent?: string;
    freeLabel?: string;
    freeContent?: string;
  };
  children: ReactNode;
}) {
  const funnelCopy = {
    kicker: funnel?.kicker ?? "NEED THE COMPLETE SYSTEM?",
    title: funnel?.title ?? "Use one decision process across every project.",
    description:
      funnel?.description ??
      "Worth the Work includes the editable 20-project workbook and 24 client-ready counteroffer, scope, deposit, payment-delay, decline, and follow-up scripts.",
    paidOffer: funnel?.paidOffer ?? "paid",
    paidLabel: funnel?.paidLabel ?? "Get the $19 Decision Kit",
    paidContent: funnel?.paidContent ?? "tool_footer_paid",
    freeLabel: funnel?.freeLabel ?? "Get the free red-flag checklist",
    freeContent: funnel?.freeContent ?? "tool_footer_free",
  };

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
            <p className="kicker">{funnelCopy.kicker}</p>
            <h2>{funnelCopy.title}</h2>
            <p>{funnelCopy.description}</p>
          </div>
          <div className="tool-funnel-actions">
            <TrackedOfferLink
              className="checkout-link"
              offer={funnelCopy.paidOffer}
              medium="tool"
              content={funnelCopy.paidContent}
            >
              {funnelCopy.paidLabel}
            </TrackedOfferLink>
            <TrackedOfferLink
              className="secondary-offer-link"
              offer="free"
              medium="tool"
              content={funnelCopy.freeContent}
            >
              {funnelCopy.freeLabel}
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
