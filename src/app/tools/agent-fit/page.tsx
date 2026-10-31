import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "@/components/dossier/PageHero";
import AgentFit from "@/components/tools/AgentFit";
import Ledger from "@/components/dossier/Ledger";
import { AgentFitSchema } from "@/components/dossier/StructuredData";
import {
  ARCHETYPE_COUNT,
  QUESTION_COUNT,
  TOOL_COUNT,
} from "@/lib/agentfit/engine";

export const metadata: Metadata = {
  title: "Which GTM agent should you build?",
  description:
    "Answer five questions about your motion, deal size, team and stack. Get a ranked shortlist of GTM agents worth building, each with its trigger, its loop, and where it breaks.",
  alternates: { canonical: "/tools/agent-fit" },
  openGraph: {
    title: "Which GTM agent should you build?",
    description:
      "Five questions, a ranked shortlist of GTM agents worth building, and an honest note on where each one breaks.",
    type: "website",
    url: "/tools/agent-fit",
    images: [{ url: "/og/tools-agent-fit.png", width: 1200, height: 630, alt: "Which GTM agent should you build?" }],
  },
};

export default function AgentFitPage() {
  return (
    <article>
      <AgentFitSchema />
      <PageHero
        back={{ href: "/tools", label: "Tools" }}
        kicker="Five questions, no email, instant answer"
        title="Which GTM agent is worth building?"
        lede="Most teams start with the agent that is most fun to build and abandon it three weeks later. The one that survives sits on data you already trust and removes a task someone repeats every week. This says which that is, including when the answer is to build nothing yet."
      />

      <section className="rule-t">
        <div className="shell py-10">
          <Ledger
            items={[
              { value: String(QUESTION_COUNT), label: "questions, no email" },
              { value: String(ARCHETYPE_COUNT), label: "agent archetypes weighed" },
              { value: String(TOOL_COUNT), label: "tools it knows how to wire" },
              { value: "0", label: "of it leaves your browser" },
            ]}
          />
        </div>
      </section>

      <section className="rule-t">
        <div className="shell py-12">
          <AgentFit />
        </div>
      </section>

      <section className="rule-t">
        <div className="shell py-10">
          <Link href="/tools/aeo-audit" className="group block">
            <h2 className="label mb-2">Also here</h2>
            <p className="t-heading transition-colors duration-150 group-hover:text-ink-a">
              A free AEO audit of your site, written by a person
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
