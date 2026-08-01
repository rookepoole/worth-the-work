import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { RevisionCostCalculator } from "./tool";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/freelance-revision-cost-calculator/";
const pageTitle = "Free Freelance Revision Cost Calculator";
const pageDescription =
  "Estimate the hidden expected cost of client revisions and price additional revision rounds with a consistent rule.";

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
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Freelance Revision Cost Calculator",
  url: pageUrl,
  applicationCategory: "FinanceApplication",
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

export default function RevisionCostPage() {
  return (
    <ToolChrome
      eyebrow="Revision pricing"
      title="Price revision risk before it becomes unpaid work."
      description="Estimate the probability-weighted cost already hiding in a fixed fee, then calculate a defensible price for additional revision rounds."
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <RevisionCostCalculator />
      <section className="tool-guide" aria-labelledby="revision-guide-heading">
        <div className="tool-guide-heading">
          <p className="kicker">THE REVISION PRICING METHOD</p>
          <h2 id="revision-guide-heading">Price the expected cost before the round happens.</h2>
          <p>
            Included revisions are not free. Their expected labor belongs in
            the original quote; extra rounds need a separate fee that covers
            both production time and the disruption of reopening the project.
          </p>
        </div>

        <div className="tool-formula" aria-label="Revision cost formula">
          <span>EXPECTED REVISION COST</span>
          <strong>probability × hours × target hourly return</strong>
          <p>Extra-round fee = full labor cost × coordination buffer, rounded up to a usable quote.</p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>01</span>
            <h3>Estimate probability honestly</h3>
            <p>
              Use similar past projects. If six of ten projects use the full
              final round, 60% is a better planning input than assuming every
              client will approve the first version.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Count the whole round</h3>
            <p>
              Include the feedback call, file reopening, production work,
              quality check, export, delivery, and the message that closes the
              loop—not only the minutes spent editing.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Add a coordination buffer</h3>
            <p>
              An extra round interrupts the schedule and may require new
              invoicing or approvals. The buffer prices that friction instead
              of silently absorbing it.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">WORKED EXAMPLE</p>
            <h3>Four hours at 75, with a 60% chance.</h3>
            <p>
              The full labor cost is 300. The expected cost inside the original
              quote is 180. With a 15% coordination buffer, an extra round is
              345, rounded up to a clean 350 quote.
            </p>
          </article>
          <article>
            <p className="kicker">INCLUDE OR CHARGE?</p>
            <h3>Include learning; charge for reopened scope.</h3>
            <p>
              Include enough rounds to reach the agreed outcome under normal
              feedback. Charge when included rounds are exhausted, feedback is
              split across stakeholders, an approved direction is reversed, or
              the client introduces a new deliverable.
            </p>
          </article>
        </div>

        <aside className="tool-related" aria-label="Related freelance tools">
          <strong>Put the number into practice:</strong>
          <Link href="/scope-creep-clause-generator/">Write the revision limit and extra-round fee into the scope</Link>
          <Link href="/freelance-quote-response-generator/">Explain a price or scope tradeoff to the client</Link>
        </aside>
      </section>
    </ToolChrome>
  );
}
