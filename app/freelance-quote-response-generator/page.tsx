import type { Metadata } from "next";
import { ToolChrome } from "@/app/components/ToolChrome";
import { QuoteResponseGenerator } from "./tool";

export const metadata: Metadata = {
  title: "Free Freelance Quote Response Generator",
  description:
    "Generate a concise response when a client says your freelance quote is too high—without reflexively discounting the same scope.",
  alternates: {
    canonical:
      "https://rookepoole.github.io/worth-the-work/freelance-quote-response-generator/",
  },
};

export default function QuoteResponsePage() {
  return (
    <ToolChrome
      eyebrow="Price negotiation"
      title="Respond to ‘your quote is too high’ without negotiating against yourself."
      description="Choose the tradeoff you are willing to make. The generator keeps price, scope, timing, and revision limits connected in one clear reply."
    >
      <QuoteResponseGenerator />
    </ToolChrome>
  );
}
