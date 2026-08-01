import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { socialPreviewImage, socialPreviewUrl } from "@/app/lib/socialPreview";
import { RushFeeCalculator } from "./tool";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/freelance-rush-fee-calculator/";
const pageTitle = "Free Freelance Rush Fee Calculator";
const pageDescription =
  "Calculate a defensible rush surcharge, protect displaced work and your minimum effective rate, then copy a client quote and rush clause.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
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
  name: "Freelance Rush Fee Calculator",
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

export default function RushFeePage() {
  return (
    <ToolChrome
      eyebrow="Urgency pricing"
      title="Charge for the schedule you are being asked to disrupt."
      description="Turn a compressed deadline into a clear rush surcharge, a client-ready quote, and a reusable policy clause."
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <RushFeeCalculator />
      <section className="tool-guide" aria-labelledby="rush-guide-heading">
        <div className="tool-guide-heading">
          <p className="kicker">THE RUSH PRICING METHOD</p>
          <h2 id="rush-guide-heading">Price urgency as capacity, not as annoyance.</h2>
          <p>
            A rushed deadline can displace booked work, force off-hours delivery,
            and compress the same risk into fewer days. The fee should protect
            those costs before the client receives priority access to your calendar.
          </p>
        </div>

        <div className="tool-formula" aria-label="Rush fee formula">
          <span>RUSH SURCHARGE</span>
          <strong>max(policy markup, displaced work, rate-floor gap) + off-hours premium</strong>
          <p>The result is rounded up to a clean quote. Your own written policy remains the final rule.</p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>01</span>
            <h3>Start from the normal price</h3>
            <p>
              Price the exact deliverable at a normal pace first. A rush fee
              should add to a sound base quote, not repair an underpriced project.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Count what leaves the calendar</h3>
            <p>
              Include paid work you must delay or decline. If the rush premium
              is smaller than that opportunity cost, the client is not actually
              paying for priority.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Require approval before the sprint</h3>
            <p>
              Put the revised fee, delivery date, material deadline, and revision
              limit in writing before work starts. Availability should never be implied.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">WORKED EXAMPLE</p>
            <h3>A 10-day project requested in three days.</h3>
            <p>
              A 1,200 base quote with a 50% policy creates a 600 surcharge.
              If 250 of other work is displaced and the job still clears the
              hourly floor, the policy amount protects the larger core cost.
              A genuine 15% off-hours premium adds 180, producing a rounded
              800 surcharge and a 2,000 client total.
            </p>
          </article>
          <article>
            <p className="kicker">WHEN TO DECLINE</p>
            <h3>A premium does not create impossible capacity.</h3>
            <p>
              Decline when the deadline removes essential review time, depends
              on materials the client has not supplied, jeopardizes existing
              commitments, or makes your quality promise unrealistic. Rush work
              is an optional service, not guaranteed availability.
            </p>
          </article>
        </div>

        <aside className="tool-related" aria-label="Related freelance tools">
          <strong>Protect the rest of the deal:</strong>
          <Link href="/scope-creep-clause-generator/">Set the scope, revisions, and change approval rule</Link>
          <Link href="/freelance-quote-response-generator/">Offer the client a price, scope, or schedule tradeoff</Link>
          <Link href="/">Check whether the full project is worth accepting</Link>
        </aside>
      </section>
    </ToolChrome>
  );
}
