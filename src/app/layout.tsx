import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/dossier/Header";
import Footer from "@/components/dossier/Footer";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

/**
 * The display face. Plex Sans alone read as competent-but-anonymous; a serif
 * against the mono labels is what gives the page a voice, the same job Syne
 * does on kevinshelly.com and Instrument Serif does on abhijeet-patil.com.
 */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
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
    default: "Shivam Goel · Growth & GTM",
    template: "%s · Shivam Goel",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Shivam Goel", url: SITE_URL }],
  creator: "Shivam Goel",
  keywords: [
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
    title: "Shivam Goel · Growth & GTM",
    description: "I build acquisition engines, and the automation underneath them.",
    type: "website",
    url: SITE_URL,
    siteName: "Shivam Goel",
    locale: "en_GB",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Shivam Goel · Growth & GTM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Goel · Growth & GTM",
    description: "I build acquisition engines, and the automation underneath them.",
    images: ["/og.png"],
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
        className={`${plexSans.variable} ${plexMono.variable} ${instrument.variable} font-sans antialiased`}
      >
        {/* Dark by default — the design is built for the dark ground and it
            carries far more contrast. System preference still wins if set. */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-small"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
