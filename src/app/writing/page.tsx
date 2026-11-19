import type { Metadata } from "next";
import Writing from "@/components/dossier/Writing";
import PageHero from "@/components/dossier/PageHero";
import { publishedPosts } from "@/content/writing";
import { CollectionSchema } from "@/components/dossier/StructuredData";

export const metadata: Metadata = {
  title: "Writing on AEO, GEO and GTM automation",
  description:
    "Shivam Goel's notes on answer engine optimisation, generative search, GTM automation, and building acquisition systems.",
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
      <CollectionSchema
        path="/writing"
        name="Writing"
        description="Shivam Goel's writing on AEO, GEO, GTM automation and acquisition systems."
        items={publishedPosts.filter((p) => p.href).map((p) => ({ name: p.title, url: p.href! }))}
      />
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
