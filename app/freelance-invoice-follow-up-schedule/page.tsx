import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { socialPreviewImage, socialPreviewUrl } from "@/app/lib/socialPreview";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/freelance-invoice-follow-up-schedule/";
const pageTitle = "Freelance Invoice Follow-Up Schedule: Day 1 to 30";
const pageDescription =
  "Use a practical invoice follow-up cadence, then change the message after a missed promise, partial payment, acknowledgement, or dispute.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
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

const faq = [
  {
    question: "How soon should a freelancer follow up after an invoice is due?",
    answer:
      "If payment has not arrived, a short receipt and routing check within one to three business days is reasonable. Name the invoice, amount, and due date, and ask whether anything is blocking payment.",
  },
  {
    question: "How often should an overdue invoice be followed up?",
    answer:
      "Use a fixed cadence rather than emailing whenever anxiety spikes. A practical starting point is one to three days, seven to ten days, fourteen to twenty-one days, and thirty days overdue. Stop or reschedule the cadence when the client gives new information.",
  },
  {
    question: "What should I send after a promised payment date is missed?",
    answer:
      "Follow up on the next business day. Refer to the promised date as a fact, say that payment has not arrived, and ask for the new scheduled payment date or remittance reference.",
  },
  {
    question: "How should I respond to a partial invoice payment?",
    answer:
      "Acknowledge the amount received, state the remaining balance, and ask when that balance will be paid. Do not restart the email as if no payment occurred.",
  },
  {
    question: "Should a freelancer add a late fee during follow-up?",
    answer:
      "Only apply a fee that is supported by the written agreement and applicable rules. Keep an internal delay-cost estimate separate from any amount you are entitled to charge.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: pageTitle,
      description: pageDescription,
      url: pageUrl,
      datePublished: "2026-08-01",
      dateModified: "2026-08-01",
      author: { "@type": "Organization", name: "Worth the Work" },
      publisher: { "@type": "Organization", name: "Worth the Work" },
      image: socialPreviewUrl,
      mainEntityOfPage: pageUrl,
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Worth the Work",
          item: "https://rookepoole.github.io/worth-the-work/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Freelance invoice follow-up schedule",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function FreelanceInvoiceFollowUpSchedulePage() {
  return (
    <ToolChrome
      eyebrow="Invoice follow-up schedule"
      formatLabel="Practical guide"
      features={["No signup", "State-aware cadence", "Free tools included"]}
      title="Follow the calendar until the payment state changes."
      description="Use a predictable reminder schedule, then change the ask when the client acknowledges the invoice, promises a date, pays part of it, or raises a question."
      funnel={{
        kicker: "NEED THE COMPLETE RECOVERY SEQUENCE?",
        title: "Turn the schedule into a repeatable collection record.",
        description:
          "The Invoice Recovery Pack includes 13 calm-to-firm messages, a 100-row tracker, aging dashboard, follow-up dates, promise-to-pay records, and an editable escalation cadence.",
        paidOffer: "recovery",
        paidLabel: "Get the Invoice Recovery Pack — $9",
        paidContent: "followup_schedule_recovery_pack",
        freeOffer: "followup_starter",
        freeLabel: "Get the free invoice follow-up starter",
        freeContent: "followup_schedule_starter",
      }}
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />

      <article className="tool-guide" aria-labelledby="follow-up-schedule-heading">
        <div className="tool-guide-heading">
          <p className="kicker">THE TWO-PART RULE</p>
          <h2 id="follow-up-schedule-heading">
            Days determine when to check. State determines what to ask.
          </h2>
          <p>
            A calendar prevents avoidance and inconsistency. It should not make
            every invoice sound the same. Start with a fixed cadence, then leave
            it as soon as the client gives you a more useful fact.
          </p>
        </div>

        <div className="tool-formula" aria-label="Invoice follow-up rule">
          <span>FOLLOW-UP RULE</span>
          <strong>Scheduled checkpoint + current payment state = next action</strong>
          <p>
            Do not send a generic day-14 reminder when the real event is a
            broken promise, partial payment, routing problem, or invoice dispute.
          </p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>00 / WHEN SENT</span>
            <h3>Create the record before anything is late.</h3>
            <p>
              Save the invoice number, total, due date, payment instructions,
              client contact, accounts-payable contact, and the date you will
              check again. Confirm delivery when routing is uncertain.
            </p>
          </article>
          <article>
            <span>01 / BEFORE OR ON DUE DATE</span>
            <h3>Remove administrative friction.</h3>
            <p>
              A brief reminder can confirm that the invoice is in the payment
              run and that the payer has the correct document and payment link.
              Keep this note neutral; the invoice is not overdue yet.
            </p>
          </article>
          <article>
            <span>02 / 1–3 DAYS OVERDUE</span>
            <h3>Check receipt and routing.</h3>
            <p>
              Name the invoice, outstanding amount, and original due date. Ask
              whether anything is blocking processing and offer to resend the
              invoice or copy the appropriate payer.
            </p>
          </article>
          <article>
            <span>03 / 7–10 DAYS OVERDUE</span>
            <h3>Ask for the scheduled payment date.</h3>
            <p>
              Move beyond “any update?” Request a specific processing or payment
              date. If payment has already been sent, ask for the remittance
              reference so you can reconcile it.
            </p>
          </article>
          <article>
            <span>04 / 14–21 DAYS OVERDUE</span>
            <h3>Make the record firm and complete.</h3>
            <p>
              Restate the invoice, balance, due date, previous follow-up, and
              requested response date. Mention only consequences or fees that
              are accurate, documented, and available in your circumstances.
            </p>
          </article>
          <article>
            <span>05 / 30+ DAYS OVERDUE</span>
            <h3>Choose a real next step.</h3>
            <p>
              Review the agreement, preserve the correspondence, and decide
              whether to pause new work, escalate internally, seek qualified
              advice, or use an appropriate recovery option. Do not bluff.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">WHEN THE STATE CHANGES</p>
            <h3>Leave the generic schedule.</h3>
            <dl>
              <div>
                <dt>Acknowledged, no date</dt>
                <dd>Ask for the scheduled payment date and payer confirmation.</dd>
              </div>
              <div>
                <dt>Promised date missed</dt>
                <dd>Reference the missed date and request a replacement date.</dd>
              </div>
              <div>
                <dt>Partial payment received</dt>
                <dd>Acknowledge it, state the remaining balance, and ask when it clears.</dd>
              </div>
              <div>
                <dt>Question or dispute</dt>
                <dd>Define the exact disputed item and ask whether the undisputed balance can proceed.</dd>
              </div>
            </dl>
          </article>
          <article>
            <p className="kicker">THE MINIMUM RECORD</p>
            <h3>Keep enough detail to know what happens next.</h3>
            <ul>
              <li>Invoice reference, original amount, and remaining balance</li>
              <li>Original due date and current days overdue</li>
              <li>Last contact date, channel, and client response</li>
              <li>Promised payment date or issue requiring resolution</li>
              <li>Next follow-up date and the person responsible</li>
            </ul>
          </article>
        </div>

        <aside className="tool-related" aria-label="Free invoice follow-up tools">
          <strong>Use the schedule:</strong>
          <Link href="/freelance-overdue-invoice-email-generator/">
            Generate the state-aware email
          </Link>
          <Link href="/freelance-late-payment-calculator/">
            Calculate only what the written terms support
          </Link>
          <Link href="/">Protect the next project before accepting it</Link>
        </aside>

        <div className="tool-guide-heading" style={{ marginTop: "64px" }}>
          <p className="kicker">COMMON QUESTIONS</p>
          <h2>Freelance invoice follow-up FAQ</h2>
        </div>
        <div className="tool-guide-grid">
          {faq.map((item, index) => (
            <article key={item.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">SOURCE NOTE</p>
            <h3>Use the cadence as a starting point, not a legal rule.</h3>
            <p>
              Reminder schedules vary with the written payment terms, client
              process, relationship, jurisdiction, and amount at stake. The
              operational principle is consistency plus an accurate record.
            </p>
          </article>
          <article>
            <p className="kicker">FURTHER READING</p>
            <h3>Why promise dates deserve their own state.</h3>
            <p>
              Enterprise receivables systems separately track promises to pay,
              tolerated days, accepted amounts, and broken-promise actions. See
              the <a href="https://docs.oracle.com/en/applications/peoplesoft/financials-and-supply-chain-management/9.2.056/peoplesoft-order-to-cash-common-information/customer-promise-tracking.html">Oracle PeopleSoft documentation</a> and this <a href="https://www.upwork.com/resources/late-payment-follow-ups">Upwork overview of reminder cadence</a>.
            </p>
          </article>
        </div>
      </article>
    </ToolChrome>
  );
}
