import type { Metadata } from "next";
import Link from "next/link";
import { socialPreviewImage, socialPreviewUrl } from "../lib/socialPreview";

const pageUrl = "https://rookepoole.github.io/worth-the-work/affiliate-program/";
const signupUrl =
  "https://prairiegrantscout.gumroad.com/affiliates?utm_source=github_pages&utm_medium=partner_page&utm_campaign=worth_the_work&utm_content=affiliate_signup";

export const metadata: Metadata = {
  title: "Worth the Work Affiliate Program | 30% Commission",
  description:
    "Apply to promote practical freelance pricing and invoice-recovery resources for a 30% direct commission on qualifying sales.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Worth the Work Affiliate Program | 30% Commission",
    description:
      "A direct affiliate program for publishers serving freelancers and independent professionals.",
    images: [socialPreviewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worth the Work Affiliate Program | 30% Commission",
    description:
      "Promote practical freelancer tools through a transparent, Gumroad-managed partner program.",
    images: [socialPreviewUrl],
  },
};

const faqs = [
  {
    question: "Does it cost anything to apply?",
    answer:
      "No. The direct affiliate application is free. Worth the Work does not charge an application, listing, or access fee.",
  },
  {
    question: "How long does affiliate attribution last?",
    answer:
      "Gumroad currently documents a 30-day cookie for affiliates approved directly by a creator. Browser and later-referral conditions can affect attribution.",
  },
  {
    question: "How are commissions paid?",
    answer:
      "Gumroad records qualifying sales and handles affiliate payouts under its current payout, fee, refund, and account-eligibility rules.",
  },
  {
    question: "Can an affiliate promise a particular financial outcome?",
    answer:
      "No. Partners must describe the products accurately, disclose the affiliate relationship, and avoid income, recovery, legal, or performance guarantees.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Worth the Work Affiliate Program",
      description:
        "A direct affiliate program for publishers serving freelancers and independent professionals.",
      url: pageUrl,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
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
          name: "Affiliate program",
          item: pageUrl,
        },
      ],
    },
  ],
};

export default function AffiliateProgramPage() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Worth the Work home">
          <span className="brand-mark">W/W</span>
          <span>Worth the Work</span>
        </Link>
        <nav aria-label="Partner navigation">
          <Link href="/#calculator">Free tools</Link>
          <a className="nav-cta" href={signupUrl}>Apply on Gumroad</a>
        </nav>
      </header>
      <main className="tool-page">
        <section className="tool-hero">
          <p className="eyebrow"><span>Worth the Work partners</span> Direct affiliate program</p>
          <h1>Earn 30% by helping freelancers protect their margins.</h1>
          <p>
            A transparent partner program for educators, publishers, consultants,
            and creators whose audience needs calmer project-pricing and invoice-recovery systems.
          </p>
          <div className="trust-row" aria-label="Affiliate program features">
            <span>30% direct commission</span>
            <span>30-day attribution window</span>
            <span>Gumroad-managed payouts</span>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <article className="tool-guide" aria-labelledby="program-heading">
          <div className="tool-guide-heading">
            <p className="kicker">THE PROGRAM</p>
            <h2 id="program-heading">Useful products, honest positioning, no earnings theater.</h2>
            <p>
              Approved direct affiliates may promote two focused digital products.
              The free browser tools remain available for audiences that want to
              evaluate the approach before buying anything.
            </p>
          </div>

          <div className="tool-guide-grid">
            <article>
              <span>01 / RECOVERY</span>
              <h3>Invoice Recovery Pack · $9</h3>
              <p>
                Thirteen calm-to-firm messages, a 100-row tracker, aging dashboard,
                promise-to-pay records, and an editable escalation cadence.
              </p>
            </article>
            <article>
              <span>02 / PROJECTS</span>
              <h3>Decision Kit · $19</h3>
              <p>
                An editable project-decision workbook plus 24 client-ready scripts
                for scope, deposits, counters, delays, declines, and follow-up.
              </p>
            </article>
            <article>
              <span>03 / COMMISSION</span>
              <h3>30% of qualifying sales</h3>
              <p>
                Gumroad applies the direct-affiliate commission and handles
                attribution, fees, refunds, eligibility, and payouts under its
                current rules.
              </p>
            </article>
          </div>

          <div className="tool-guide-split">
            <article>
              <p className="kicker">GOOD FIT</p>
              <h3>Serve an audience already doing client work.</h3>
              <ul>
                <li>Freelance educators and independent-work newsletters</li>
                <li>Bookkeepers and cash-flow educators</li>
                <li>Consultants teaching proposals, pricing, or client operations</li>
                <li>Creator-resource libraries with an editorial review process</li>
              </ul>
            </article>
            <article>
              <p className="kicker">PARTNER STANDARD</p>
              <h3>Recommend only where the tool genuinely fits.</h3>
              <ul>
                <li>Disclose the affiliate relationship clearly</li>
                <li>Use accurate product descriptions and current prices</li>
                <li>No spam, fake reviews, coupon misrepresentation, or self-referrals</li>
                <li>No guarantees about income, collections, legality, or results</li>
              </ul>
            </article>
          </div>

          <aside className="tool-related" aria-label="Affiliate resources">
            <strong>Review before applying:</strong>
            <Link href="/freelance-invoice-follow-up-schedule/">Invoice recovery guide</Link>
            <Link href="/">Project decision calculator</Link>
            <a href="https://gumroad.com/help/article/333-affiliates-on-gumroad.html">Gumroad affiliate rules</a>
          </aside>

          <div className="tool-guide-heading" style={{ marginTop: "64px" }}>
            <p className="kicker">STRAIGHT ANSWERS</p>
            <h2>Affiliate program FAQ</h2>
          </div>
          <div className="tool-guide-grid">
            {faqs.map(({ question, answer }, index) => (
              <article key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{question}</h3>
                <p>{answer}</p>
              </article>
            ))}
          </div>
        </article>

        <section className="tool-funnel">
          <div>
            <p className="kicker">APPLY DIRECTLY</p>
            <h2>Tell us how you would reach freelancers.</h2>
            <p>
              Gumroad collects the application and manages affiliate links.
              Applications are reviewed for audience fit and promotional method;
              approval and earnings are not guaranteed.
            </p>
          </div>
          <div className="tool-funnel-actions">
            <a className="checkout-link" href={signupUrl}>Apply for the 30% program</a>
            <Link className="secondary-offer-link" href="/">Review the free tools first</Link>
          </div>
        </section>
        <p className="tool-disclaimer">
          This page describes creator-approved direct affiliates, not Gumroad&apos;s
          separate platform-wide affiliate rate. Commission credit, fees, refunds,
          eligibility, and payout timing are governed by Gumroad&apos;s current terms. {" "}
          <a href="https://gumroad.com/help/article/333-affiliates-on-gumroad.html">
            Read Gumroad&apos;s affiliate documentation
          </a>.
        </p>
      </main>
    </>
  );
}
