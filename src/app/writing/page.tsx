import type { Metadata } from "next";
import Writing from "@/components/dossier/Writing";
import { publishedPosts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing — Shivam Goel",
  description:
    "Notes on generative-search optimisation, GTM automation, and building acquisition systems.",
};

export default function WritingIndexPage() {
  return (
    <>
      <header className="shell py-12 sm:py-16">
        <p className="label mb-6">
          {publishedPosts.length} post{publishedPosts.length === 1 ? "" : "s"}
          <span className="mx-2 text-accent">/</span>
          Growth, GTM, automation
        </p>
        <h1 className="max-w-[16ch] font-display text-[2.5rem] font-normal leading-[1.02] tracking-[-0.02em] sm:text-[4rem]">
          Writing.
        </h1>
      </header>

      {/* `compact` is off here — this page is the full list. */}
      <Writing index="01" />
    </>
  );
}
