import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { socialPreviewImage, socialPreviewUrl } from "@/app/lib/socialPreview";
import { OverdueInvoiceEmailGenerator } from "./tool";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/freelance-overdue-invoice-email-generator/";
const pageTitle = "Freelance Overdue Invoice Email Generator | Free";
const pageDescription =
  "Generate a professional overdue-invoice email for a silent client, missed payment promise, partial payment, or invoice dispute. Free and no signup.";

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
  name: "Freelance Overdue Invoice Email Generator",
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

export default function OverdueInvoiceEmailPage() {
  return (
    <ToolChrome
      eyebrow="Payment follow-up"
      title="Write the overdue-invoice email that fits what happened next."
      description="Move from a gentle check-in to a firm follow-up without guessing at the tone. The message adapts to silence, acknowledgement, a missed promise, partial payment, or a client question."
      funnel={{
        kicker: "NEED THE COMPLETE RECOVERY SEQUENCE?",
        title: "Stop recreating the chase after every reminder.",
        description:
          "The Invoice Recovery Pack adds 13 calm-to-firm messages, a 100-row invoice tracker, aging dashboard, follow-up dates, promise-to-pay records, and an editable escalation cadence.",
        paidOffer: "recovery",
        paidLabel: "Get the Invoice Recovery Pack — $9",
        paidContent: "overdue_email_recovery_pack",
        freeOffer: "followup_starter",
        freeLabel: "Get the free invoice follow-up starter",
        freeContent: "overdue_email_followup_starter",
      }}
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <OverdueInvoiceEmailGenerator />
      <section className="tool-guide" aria-labelledby="overdue-email-guide-heading">
        <div className="tool-guide-heading">
          <p className="kicker">THE FOLLOW-UP RULE</p>
          <h2 id="overdue-email-guide-heading">
            Get more specific before you get more severe.
          </h2>
          <p>
            A useful late-payment email names the invoice, amount, delay, and
            next action. Escalation should respond to the record you actually
            have—not just the frustration you feel.
          </p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>01</span>
            <h3>Start with delivery and routing</h3>
            <p>
              In the first few overdue days, confirm that the invoice reached
              the right person. Reattach it or copy accounts payable before you
              assume the client is refusing to pay.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Ask for a date, not an update</h3>
            <p>
              “We are looking into it” does not create a usable commitment. Ask
              for the scheduled payment date and, once sent, the remittance
              reference.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Document the changed state</h3>
            <p>
              A missed promise, partial payment, or invoice question needs a
              different response. State the new fact and the exact action that
              would close the loop.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">EVERY EMAIL NEEDS</p>
            <h3>A short factual record.</h3>
            <ul>
              <li>Invoice reference and outstanding amount</li>
              <li>How many days the payment is overdue</li>
              <li>The client’s last promise, payment, or question</li>
              <li>One specific reply or payment action</li>
            </ul>
          </article>
          <article>
            <p className="kicker">LEAVE OUT</p>
            <h3>Threats you are not prepared or entitled to carry out.</h3>
            <p>
              Keep the email aligned with your agreement and local rules. Do
              not add a late fee, legal threat, collections claim, or work-stop
              consequence unless it is accurate and available in your situation.
            </p>
          </article>
        </div>

        <aside className="tool-related" aria-label="Related freelance tools">
          <strong>Handle the numbers and the next project:</strong>
          <Link href="/freelance-late-payment-calculator/">
            Calculate a written late-payment charge
          </Link>
          <Link href="/scope-creep-clause-generator/">
            Put scope and change approval in writing
          </Link>
          <Link href="/">Check a freelance project before accepting it</Link>
        </aside>
      </section>
    </ToolChrome>
  );
}
