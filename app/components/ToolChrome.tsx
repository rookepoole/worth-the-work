import Link from "next/link";
import type { ReactNode } from "react";

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
          <a
            className="nav-cta"
            href="https://prairiegrantscout.gumroad.com/l/worth-the-work?utm_source=github_pages&utm_medium=tool&utm_campaign=worth_the_work&utm_content=tool_header"
          >
            Decision Kit
          </a>
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
            <a
              className="checkout-link"
              href="https://prairiegrantscout.gumroad.com/l/worth-the-work?utm_source=github_pages&utm_medium=tool&utm_campaign=worth_the_work&utm_content=tool_footer_paid"
            >
              Get the $19 Decision Kit
            </a>
            <a
              className="secondary-offer-link"
              href="https://prairiegrantscout.gumroad.com/l/freelance-project-red-flag-checklist?utm_source=github_pages&utm_medium=tool&utm_campaign=worth_the_work&utm_content=tool_footer_free"
            >
              Get the free red-flag checklist
            </a>
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
