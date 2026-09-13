import Masthead from "@/components/dossier/Masthead";
import Ticker from "@/components/dossier/Ticker";
import WorkIndex from "@/components/dossier/WorkIndex";
import ToolsTeaser from "@/components/dossier/ToolsTeaser";
import Writing from "@/components/dossier/Writing";
import AboutTeaser from "@/components/dossier/AboutTeaser";
import Contact from "@/components/dossier/Contact";
import Wordmark from "@/components/dossier/Wordmark";
import { HomeSchema } from "@/components/dossier/StructuredData";

/**
 * The homepage is now an index, not the whole site. Case studies live at
 * /work/<slug>, the full history at /about, all posts at /writing.
 */
export default function Home() {
  return (
    <>
      <HomeSchema />
      <Masthead />
      <Ticker />
      <WorkIndex />
      <ToolsTeaser index="02" />
      <Writing index="03" limit={2} />
      <AboutTeaser index="04" />
      <Contact index="05" />
      <Wordmark />
    </>
  );
}
