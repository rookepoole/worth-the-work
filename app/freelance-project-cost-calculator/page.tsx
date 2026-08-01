import type { Metadata } from "next";
import Link from "next/link";
import { ToolChrome } from "@/app/components/ToolChrome";
import { ProjectCostCalculator } from "./tool";

const pageUrl =
  "https://rookepoole.github.io/worth-the-work/freelance-project-cost-calculator/";
const pageTitle = "Free Freelance Project Cost Calculator & Estimator";
const pageDescription =
  "Estimate a freelance project quote from delivery hours, meetings, admin, direct costs, contingency, and operating margin, then copy a client-ready summary.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pageUrl },
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
  name: "Freelance Project Cost Calculator",
  alternateName: "Freelance Project Estimator",
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

export default function ProjectCostPage() {
  return (
    <ToolChrome
      eyebrow="Project estimator"
      title="Estimate a project quote from the work it actually takes."
      description="Build a fixed project price from production time, hidden coordination, direct costs, uncertainty, and a deliberate operating margin."
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        type="application/ld+json"
      />
      <ProjectCostCalculator />
      <section className="tool-guide" aria-labelledby="project-cost-guide-heading">
        <div className="tool-guide-heading">
          <p className="kicker">THE PROJECT COST METHOD</p>
          <h2 id="project-cost-guide-heading">A fixed fee still needs an honest cost model.</h2>
          <p>
            A project estimate is more than production hours multiplied by a
            rate. Discovery, meetings, administration, tools, contractors, and
            ordinary uncertainty all consume the fee. Model those costs first;
            then decide what margin the project must leave behind.
          </p>
        </div>

        <div className="tool-formula" aria-label="Freelance project price formula">
          <span>PROJECT QUOTE</span>
          <strong>(labor value + direct costs) × (1 + contingency) ÷ (1 − margin)</strong>
          <p>
            The calculator rounds the result up. It treats margin as a share of
            the final quote, which is different from simply adding the same
            percentage as a markup.
          </p>
        </div>

        <div className="tool-guide-grid">
          <article>
            <span>01</span>
            <h3>Estimate every working hour</h3>
            <p>
              Separate delivery from discovery, meetings, email, scheduling,
              invoicing, and handoff. Those hours may not appear in the final
              deliverable, but the project still uses them.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Pass through real project costs</h3>
            <p>
              Include approved contractors, stock assets, travel, licenses,
              hosting, and materials. A deposit should at least keep those costs
              from becoming credit you extend to the client.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Keep contingency bounded by scope</h3>
            <p>
              A contingency covers ordinary estimating uncertainty. It does not
              purchase unlimited revisions or new deliverables; those still need
              a written scope and change process.
            </p>
          </article>
        </div>

        <div className="tool-guide-split">
          <article>
            <p className="kicker">WORKED EXAMPLE</p>
            <h3>A 38-hour website project.</h3>
            <p>
              At a 100 hourly target, 38 total hours create 3,800 of labor
              value. Add 200 of direct costs and a 15% contingency to protect
              4,600. A 20% final operating margin requires a 5,750 quote—not
              5,520—because margin is measured against the client price.
            </p>
          </article>
          <article>
            <p className="kicker">ESTIMATE, THEN TEST</p>
            <h3>A calculated price can still be a bad deal.</h3>
            <p>
              After you build the quote, test the payment timing, revision cap,
              decision-maker, deadline, and scope-creep probability. Project
              economics and client risk belong in the same decision.
            </p>
          </article>
        </div>

        <aside className="tool-related" aria-label="Related freelance tools">
          <strong>Next steps:</strong>
          <Link href="/">Test whether the finished quote is worth accepting</Link>
          <Link href="/scope-creep-clause-generator/">Protect the estimate with a scope-creep clause</Link>
          <Link href="/freelance-rush-fee-calculator/">Price an accelerated deadline separately</Link>
        </aside>
      </section>
    </ToolChrome>
  );
}
