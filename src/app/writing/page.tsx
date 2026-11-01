import type { Metadata } from "next";
import Writing from "@/components/dossier/Writing";
import PageHero from "@/components/dossier/PageHero";
import { publishedPosts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on generative-search optimisation, GTM automation, and building acquisition systems.",
  alternates: { canonical: "/writing" },
  openGraph: {
    title: "Writing",
    description:
      "Notes on generative-search optimisation, GTM automation, and building acquisition systems.",
    type: "website",
    url: "/writing",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Shivam Goel · Writing" }],
  },
};

export default function WritingIndexPage() {
  return (
    <>
      <PageHero
        back={{ href: "/", label: "Home" }}
        kicker={`${publishedPosts.length} post${publishedPosts.length === 1 ? "" : "s"}`}
        title="Writing."
        lede="Notes on generative-search optimisation, GTM automation and building acquisition systems."
      />
      <Writing tag="All posts" title="Everything I have published." />
    </>
  );
}
