import type { Metadata } from "next";
import { ToolChrome } from "@/app/components/ToolChrome";
import { RevisionCostCalculator } from "./tool";

export const metadata: Metadata = {
  title: "Free Freelance Revision Cost Calculator",
  description:
    "Estimate the hidden expected cost of client revisions and price additional revision rounds with a consistent rule.",
  alternates: {
    canonical:
      "https://rookepoole.github.io/worth-the-work/freelance-revision-cost-calculator/",
  },
};

export default function RevisionCostPage() {
  return (
    <ToolChrome
      eyebrow="Revision pricing"
      title="Price revision risk before it becomes unpaid work."
      description="Estimate the probability-weighted cost already hiding in a fixed fee, then calculate a defensible price for additional revision rounds."
    >
      <RevisionCostCalculator />
    </ToolChrome>
  );
}
