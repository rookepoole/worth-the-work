import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { socialPreviewImage, socialPreviewUrl } from "@/app/lib/socialPreview";
import { LatePaymentCalculator } from "./tool";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/freelance-late-payment-calculator/";
const pageTitle = "Freelance Late Payment Fee Calculator | Free";
const pageDescription =
  "Calculate simple interest and a written flat fee on an overdue freelance invoice, see the hidden cash-flow cost, and copy a factual payment reminder.";

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
  name: "Freelance Late Payment Fee Calculator",
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

export default function LatePaymentPage() {
  return (
    <ToolChrome
      eyebrow="Overdue invoices"
      title="Calculate the balance before you chase the payment."
      description="Apply only the written rate and fee you are permitted to use, measure the business cost of waiting, and copy a calm payment reminder."
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <LatePaymentCalculator />
      <section className="tool-guide" aria-labelledby="late-payment-guide-heading">
        <div className="tool-guide-heading">
          <p className="kicker">THE LATE-PAYMENT METHOD</p>
          <h2 id="late-payment-guide-heading">
            Calculate what the terms say—not what the delay feels like.
          </h2>
          <p>
            An overdue invoice creates two different numbers: the charge your
            written terms may allow and the internal cash-flow cost the delay
            creates. Keeping them separate makes the follow-up clearer and avoids
            presenting an internal estimate as money the client owes.
          </p>
        </div>

        <div className="tool-formula" aria-label="Late payment formula">
          <span>SIMPLE INTEREST FORMULA</span>
          <strong>balance × annualized rate × chargeable days ÷ 365</strong>
          <p>
            A written flat fee is added only after the grace period. Your contract
            and applicable law—not this calculator—determine whether either charge
            is available.
          </p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>01</span>
            <h3>Use the agreed terms</h3>
            <p>
              Enter the rate, grace period, and flat fee already stated in the
              governing agreement. Do not invent a new charge after the invoice
              becomes overdue.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Keep a calculation record</h3>
            <p>
              Save the balance, day count, annualized rate, interest, fee, and
              calculation date with the invoice. A reproducible number is easier
              to explain than a rounded demand.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Ask for a payment date</h3>
            <p>
              Keep the reminder factual: identify the invoice, state the overdue
              period and updated balance, then ask the client to confirm when the
              payment will arrive.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">WORKED EXAMPLE</p>
            <h3>A 2,500 invoice that is 45 days overdue.</h3>
            <p>
              At an annual simple rate of 18% with no grace period or flat fee,
              the prorated charge is 55.48 and the updated balance is 2,555.48.
              A separate 12% internal cost-of-cash assumption values the delay at
              36.99; that second number informs future pricing but is not added to
              the client balance.
            </p>
          </article>
          <article>
            <p className="kicker">IMPORTANT BOUNDARY</p>
            <h3>The calculator proves arithmetic, not entitlement.</h3>
            <p>
              Late-payment rules vary by agreement, location, client type, and
              transaction. Confirm the permitted basis before applying a charge,
              and seek qualified advice for a disputed or material debt.
            </p>
          </article>
        </div>

        <aside className="tool-related" aria-label="Related freelance tools">
          <strong>Prevent the next payment problem:</strong>
          <Link href="/freelance-project-cost-calculator/">
            Price admin time and cash-flow risk into the quote
          </Link>
          <Link href="/scope-creep-clause-generator/">
            Put scope and change approval in writing
          </Link>
          <Link href="/">
            Check the full project before accepting it
          </Link>
        </aside>
      </section>
    </ToolChrome>
  );
}
