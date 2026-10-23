import type { Metadata } from "next";
import WorkIndex from "@/components/dossier/WorkIndex";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Seven case studies: what the system was, how it worked, and what came out of it. Including a page cited directly inside Google's AI Overview.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected work",
    description:
      "Seven case studies: what the system was, how it worked, and what came out of it.",
    type: "website",
    url: "/work",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Selected work" }],
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
      <WorkIndex index="01" heading="Selected work" />
    </article>
  );
}
