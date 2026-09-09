import Masthead from "@/components/dossier/Masthead";
import Work from "@/components/dossier/Work";
import Writing from "@/components/dossier/Writing";
import { Experience, Capabilities } from "@/components/dossier/Track";
import { About, Credentials } from "@/components/dossier/About";
import Contact from "@/components/dossier/Contact";
import Wordmark from "@/components/dossier/Wordmark";
import Ticker from "@/components/dossier/Ticker";

export default function Home() {
  return (
    <>
      <Masthead />
      <Ticker />
      <Work />
      <Writing />
      <Experience />
      <Capabilities />
      <About />
      <Credentials />
      <Contact />
      <Wordmark />
    </>
  );
}
