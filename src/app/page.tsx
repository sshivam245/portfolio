import FunnelHero from "@/components/funnel/FunnelHero";
import StatsBand from "@/components/dossier/StatsBand";
import WorkIndex from "@/components/dossier/WorkIndex";
import ToolsTeaser from "@/components/dossier/ToolsTeaser";
import AboutTeaser from "@/components/dossier/AboutTeaser";
import Writing from "@/components/dossier/Writing";
import Contact from "@/components/dossier/Contact";
import { HomeSchema } from "@/components/dossier/StructuredData";

/**
 * The homepage is the funnel.
 *
 * The hero walks the visitor through four stages, one real result each. The
 * rest of the page is what a funnel does next: the numbers at a glance,
 * then touchpoints (the work, the tools, the person, the reading), then the
 * close, painted in the hero's "this stage is live" yellow.
 *
 * Blocks alternate cream and blue so no two neighbours share a colour.
 */
export default function Home() {
  return (
    <>
      <HomeSchema />
      <FunnelHero />
      <StatsBand />
      <WorkIndex limit={3} />
      <ToolsTeaser />
      <AboutTeaser />
      <Writing limit={2} />
      <Contact />
    </>
  );
}
