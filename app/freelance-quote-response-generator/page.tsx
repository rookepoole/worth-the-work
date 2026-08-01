import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { socialPreviewImage, socialPreviewUrl } from "@/app/lib/socialPreview";
import { QuoteResponseGenerator } from "./tool";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/freelance-quote-response-generator/";
const pageTitle = "Free Freelance Quote Response Generator";
const pageDescription =
  "Generate a concise response when a client says your freelance quote is too high—without reflexively discounting the same scope.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: pageTitle,
    description: pageDescription,
    images: [socialPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [socialPreviewUrl],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Freelance Quote Response Generator",
  url: pageUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript and a modern web browser",
  isAccessibleForFree: true,
  description: pageDescription,
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
  },
};

export default function QuoteResponsePage() {
  return (
    <ToolChrome
      eyebrow="Price negotiation"
      title="Respond to ‘your quote is too high’ without negotiating against yourself."
      description="Choose the tradeoff you are willing to make. The generator keeps price, scope, timing, and revision limits connected in one clear reply."
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <QuoteResponseGenerator />
      <section className="tool-guide" aria-labelledby="quote-guide-heading">
        <div className="tool-guide-heading">
          <p className="kicker">THE NEGOTIATION RULE</p>
          <h2 id="quote-guide-heading">If the price changes, another real variable should change too.</h2>
          <p>
            A lower budget is useful information, not an instruction to deliver
            the same project for less. Connect price to scope, sequence,
            schedule, or revision allowance so the revised offer remains a
            deliberate business decision.
          </p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>01</span>
            <h3>Hold the original offer</h3>
            <p>
              Use this when the scope and timeline already match the client’s
              stated outcome. Restate what the fee covers and invite a smaller
              alternative without defending every line item.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Reduce the scope</h3>
            <p>
              Remove deliverables, formats, meetings, or revision rounds until
              the work fits the budget. Name what remains and save excluded work
              for a separately priced second phase.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Offer a paid first phase</h3>
            <p>
              Discovery, strategy, an audit, or one core deliverable can reduce
              uncertainty without pretending the entire project fits. The phase
              should produce a useful standalone result.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>Decline cleanly</h3>
            <p>
              Decline when the budget cannot support a responsible version of
              the work. A concise no protects the relationship better than an
              underpriced yes followed by missed expectations.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">THE HIDDEN DISCOUNT</p>
            <h3>Same scope, lower fee means a lower effective rate.</h3>
            <p>
              A quote reduced from 3,500 to 2,000 is a 43% discount. Unless the
              workload also falls by roughly the same amount, the freelancer is
              funding the gap with unpaid time, reduced quality, or both.
            </p>
          </article>
          <article>
            <p className="kicker">BEFORE YOU SEND</p>
            <h3>Make the revised boundary explicit.</h3>
            <ul>
              <li>State the fee and the deliverables together.</li>
              <li>Name the included revision allowance.</li>
              <li>Separate later phases from the current commitment.</li>
              <li>Avoid apologizing for a price you can explain.</li>
            </ul>
          </article>
        </div>

        <aside className="tool-related" aria-label="Related freelance tools">
          <strong>Strengthen the revised offer:</strong>
          <Link href="/">Recalculate the project’s minimum acceptable fee</Link>
          <Link href="/scope-creep-clause-generator/">Generate the scope and change-request boundary</Link>
          <Link href="/freelance-rush-fee-calculator/">Quote a faster timeline without absorbing the disruption</Link>
        </aside>
      </section>
    </ToolChrome>
  );
}
