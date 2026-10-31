import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/dossier/Header";
import Footer from "@/components/dossier/Footer";

/*
 * One family for everything. Bricolage Grotesque has an optical-size axis,
 * so the same face is tight and loud at 90px and open and calm at 16px —
 * which is what lets a campaign-weight headline and a readable case study
 * share one voice instead of a display face bolted onto a body face.
 *
 * There is no monospace any more. Mono labels, a terminal prompt and
 * bracketed citations were exactly what made the last version read as a
 * developer's site.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} font-sans antialiased`}
      >
        {/* Light by default: the funnel's home is cream stock with blue colour
            blocks. The blocks stay brand blue in dark mode too; only the cream
            becomes night navy. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          /* Without this every colour transition fires at once on toggle. */
          disableTransitionOnChange
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
        </ThemeProvider>
      </body>
    </html>
  );
}
