import type { Metadata } from "next";
import AboutFaq from "@/components/dossier/AboutFaq";
import { Experience, Capabilities } from "@/components/dossier/Track";
import { About, Credentials } from "@/components/dossier/About";
import { profile } from "@/content/profile";
import { AboutSchema } from "@/components/dossier/StructuredData";
import PageHero from "@/components/dossier/PageHero";

export const metadata: Metadata = {
  title: { absolute: "About Shivam Goel · Marketing Engineer, SEO & GTM" },
  description:
    "Who Shivam Goel is, what he has built and delivered in growth, GTM, SEO, AEO and GEO, the tools he uses, and how to work with him.",
  alternates: { canonical: "/about" },
};

/**
 * Everything the homepage doesn't need in order to make its case: the full
 * role-by-role history, the tool list, education and publications. A hiring
 * manager who wants this detail will come looking for it; one who doesn't
 * shouldn't have to scroll past it.
 */
export default function AboutPage() {
  return (
    <>
      <AboutSchema />
      <PageHero
        kicker={`${profile.role} · ${profile.location}`}
        title="Shivam Goel, the long version."
        lede="The full track record, the toolbox, and where the work has been picked up by others."
      />

      <About />
      <Experience />
      <Capabilities />
      <Credentials />
      <AboutFaq />
    </>
  );
}
