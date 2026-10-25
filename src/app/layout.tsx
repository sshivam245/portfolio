import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Anton } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/dossier/Header";
import Footer from "@/components/dossier/Footer";

/*
 * The body grotesque. Plex Sans was the old dossier's voice: neutral,
 * IBM-issue, and the reason the page read as a competent template. Archivo
 * is cut for signage and small sizes, carries real weight at 700, and sits
 * under Anton without arguing with it.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * The plate. Every piece of display type on this site is ink pressed onto
 * stock, and Anton is the only face here that reads as a solid area of it
 * rather than as lettering — which is what makes the two-plate offset in
 * the hero legible as printing instead of as a drop shadow.
 *
 * One weight, by design. A condensed poster face with a weight axis invites
 * a hierarchy built from weight, and this system builds hierarchy from size
 * and from which plate a thing is printed on.
 */
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
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
        className={`${archivo.variable} ${plexMono.variable} ${anton.variable} font-sans antialiased`}
      >
        {/* Dark by default — the design is built for the dark ground and it
            carries far more contrast. System preference still wins if set. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
