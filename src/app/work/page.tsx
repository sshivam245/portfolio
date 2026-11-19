import type { Metadata } from "next";
import WorkIndex from "@/components/dossier/WorkIndex";
import { caseStudies } from "@/content/caseStudies";
import { CollectionSchema } from "@/components/dossier/StructuredData";
import { SITE_URL } from "@/lib/site";
import PageHero from "@/components/dossier/PageHero";

export const metadata: Metadata = {
  title: "Growth, GTM & AEO case studies",
  description:
    `${caseStudies.length} case studies in growth, GTM, SEO and AEO: the system, how it worked, and the results, including a page named in Google's AI Overview.`,
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected work",
    description:
      `${caseStudies.length} case studies: what the system was, how it worked, and what came out of it.`,
    type: "website",
    url: "/work",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Selected work" }],
  },
};

/**
 * The full index.
 *
 * It exists because the homepage now shows three. The reader there is deciding
 * whether to open anything at all, and seven identically weighted rows is seven
 * ways to open the wrong one. This is the page for someone who has decided and
 * wants the rest.
 */
export default function WorkPage() {
  return (
    <article>
      <CollectionSchema
        path="/work"
        name="Case studies"
        description="Growth, GTM, SEO and AEO case studies by Shivam Goel."
        items={caseStudies.map((cs) => ({ name: cs.title, url: `${SITE_URL}/work/${cs.id}` }))}
      />
      <PageHero
        back={{ href: "/", label: "Home" }}
        kicker="Work"
        title="Every system, and what it produced."
      />
      <WorkIndex tag="Case studies" title="Each one opens with its evidence." tone="stone" />
    </article>
  );
}
