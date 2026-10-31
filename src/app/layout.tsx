import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/dossier/Header";
import Footer from "@/components/dossier/Footer";

/*
 * One family for everything: Schibsted Grotesk, cut for a Scandinavian news
 * publisher. It is sober at text sizes and confident at display sizes, which
 * is the register a hiring manager trusts.
 *
 * It replaced Bricolage Grotesque, whose extra-bold, tightly tracked
 * headlines were the signature of the 2025 template landing page and the
 * single biggest reason the site read as generated. There is no monospace.
 */
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const DESCRIPTION =
  "I build acquisition engines, and the automation underneath them. Growth & GTM, 2 years, remote. Case studies in generative-search optimisation, 0→1 brand launch, demand generation, and pipeline automation.";

export const metadata: Metadata = {
  // Required for og:image and canonical URLs to resolve to absolute paths.
  // Without it Next emits relative URLs, which crawlers and social scrapers
  // cannot follow.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shivam Goel · Marketing Engineer, Growth & GTM",
    template: "%s · Shivam Goel",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Shivam Goel", url: SITE_URL }],
  creator: "Shivam Goel",
  keywords: [
    "marketing engineer",
    "AI builder",
    "building GTM systems",
    "GTM engineer",
    "growth engineer",
    "founding GTM",
    "go-to-market",
    "demand generation",
    "AEO",
    "generative engine optimisation",
    "outbound automation",
    "Clay",
    "Apollo",
    "HubSpot",
  ],
  openGraph: {
    title: "Shivam Goel · Marketing Engineer, Growth & GTM",
    description: "I build acquisition engines, and the automation underneath them.",
    type: "website",
    url: SITE_URL,
    siteName: "Shivam Goel",
    locale: "en_GB",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Shivam Goel · Marketing Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Goel · Marketing Engineer, Growth & GTM",
    description: "I build acquisition engines, and the automation underneath them.",
    images: ["/og/home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${schibsted.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-small"
        >
          Skip to content
        </a>
        {/* Hairline fill showing scroll depth. CSS-only, no listener. */}
        <div className="scroll-progress" aria-hidden />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
