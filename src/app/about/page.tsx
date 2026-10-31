import type { Metadata } from "next";
import { Experience, Capabilities } from "@/components/dossier/Track";
import { About, Credentials } from "@/components/dossier/About";
import { profile } from "@/content/profile";
import { AboutSchema } from "@/components/dossier/StructuredData";
import PageHero from "@/components/dossier/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Growth & GTM, two years, remote. Track record, capabilities, education and publications.",
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
        title="The long version."
        lede="The full track record, the toolbox, and where the work has been picked up by others."
      />

      <About />
      <Experience />
      <Capabilities />
      <Credentials />
    </>
  );
}
