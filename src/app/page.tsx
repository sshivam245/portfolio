import Masthead from "@/components/dossier/Masthead";
import Specimen from "@/components/dossier/Specimen";
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
      <Specimen index="01" />
      <WorkIndex index="02" limit={3} />
      <ToolsTeaser index="03" />
      <Writing index="04" limit={2} />
      <AboutTeaser index="05" />
      <Contact index="06" />
      <Wordmark />
    </>
  );
}
