import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { socialPreviewImage, socialPreviewUrl } from "@/app/lib/socialPreview";
import { ScopeCreepClauseGenerator } from "./tool";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/scope-creep-clause-generator/";
const pageTitle = "Free Scope Creep Clause Generator for Freelancers";
const pageDescription =
  "Generate plain-language freelance scope, revision, and change-order wording you can adapt before sending a proposal.";

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
  name: "Scope Creep Clause Generator",
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

export default function ScopeCreepClausePage() {
  return (
    <ToolChrome
      eyebrow="Scope protection"
      title="Generate a scope-creep clause before the ‘quick changes’ begin."
      description="Set the revision limit, feedback owner, extra-round fee, and change-order rule. The tool turns your choices into plain-language wording you can review and adapt."
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <ScopeCreepClauseGenerator />
      <section className="tool-guide" aria-labelledby="scope-guide-heading">
        <div className="tool-guide-heading">
          <p className="kicker">HOW TO USE THE CLAUSE</p>
          <h2 id="scope-guide-heading">Define the boundary before you need to defend it.</h2>
          <p>
            A useful scope clause does more than say “extra work costs extra.” It
            gives both sides a shared test for what the fee includes, who can
            approve feedback, and when a request becomes a separately priced
            change.
          </p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>01</span>
            <h3>Name the included deliverables</h3>
            <p>
              Refer to a concrete list in the proposal: pages, concepts,
              formats, integrations, meetings, or files. “Website design” is
              vague; “five page templates and one mobile layout” is testable.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Define one revision round</h3>
            <p>
              A round should mean one consolidated set of feedback on work that
              already exists. A new page, feature, direction, or deliverable is
              not a revision merely because it arrived in a feedback email.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Require written approval</h3>
            <p>
              State the added fee and schedule impact before starting. A clear
              written “yes” creates a practical record and prevents the client
              and freelancer from remembering different versions of the deal.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">REVISION OR CHANGE REQUEST?</p>
            <h3>Use this distinction consistently.</h3>
            <dl>
              <div><dt>Revision</dt><dd>Adjusts an agreed deliverable without changing its purpose, quantity, or approved direction.</dd></div>
              <div><dt>Change request</dt><dd>Adds a deliverable, reverses an approved direction, introduces a new stakeholder requirement, or changes the deadline.</dd></div>
            </dl>
          </article>
          <article>
            <p className="kicker">WHEN A REQUEST ARRIVES</p>
            <h3>Pause, price, approve, then schedule.</h3>
            <ol>
              <li>Compare the request with the written deliverables.</li>
              <li>Estimate the added work and coordination time.</li>
              <li>Send the fee and delivery-date impact in writing.</li>
              <li>Begin only after the authorized contact approves.</li>
            </ol>
          </article>
        </div>

        <aside className="tool-related" aria-label="Related freelance tools">
          <strong>Continue the decision:</strong>
          <Link href="/freelance-revision-cost-calculator/">Calculate what an extra revision round should cost</Link>
          <Link href="/freelance-quote-response-generator/">Respond when the client pushes back on price</Link>
          <Link href="/freelance-rush-fee-calculator/">Price an accelerated deadline before accepting it</Link>
        </aside>
      </section>
    </ToolChrome>
  );
}
