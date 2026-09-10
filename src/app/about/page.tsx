import type { Metadata } from "next";
import { Experience, Capabilities } from "@/components/dossier/Track";
import { About, Credentials } from "@/components/dossier/About";
import { profile } from "@/content/profile";
import { AboutSchema } from "@/components/dossier/StructuredData";

export const metadata: Metadata = {
  title: "About — Shivam Goel",
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
      <header className="shell py-12 sm:py-16">
        <p className="label mb-6">
          {profile.role}
          <span className="mx-2 text-accent">/</span>
          {profile.yearsExperience} yrs
          <span className="mx-2 text-accent">/</span>
          {profile.location}
        </p>
        <h1 className="t-title max-w-[16ch]">
          The long version.
        </h1>
      </header>

      <About />
      <Experience />
      <Capabilities />
      <Credentials />
    </>
  );
}
