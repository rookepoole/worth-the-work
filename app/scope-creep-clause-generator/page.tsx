import type { Metadata } from "next";
import { ToolChrome } from "@/app/components/ToolChrome";
import { ScopeCreepClauseGenerator } from "./tool";

export const metadata: Metadata = {
  title: "Free Scope Creep Clause Generator for Freelancers",
  description:
    "Generate plain-language freelance scope, revision, and change-order wording you can adapt before sending a proposal.",
  alternates: {
    canonical:
      "https://rookepoole.github.io/worth-the-work/scope-creep-clause-generator/",
  },
};

export default function ScopeCreepClausePage() {
  return (
    <ToolChrome
      eyebrow="Scope protection"
      title="Generate a scope-creep clause before the ‘quick changes’ begin."
      description="Set the revision limit, feedback owner, extra-round fee, and change-order rule. The tool turns your choices into plain-language wording you can review and adapt."
    >
      <ScopeCreepClauseGenerator />
    </ToolChrome>
  );
}
