import Masthead from "@/components/dossier/Masthead";
import Work from "@/components/dossier/Work";
import Writing from "@/components/dossier/Writing";
import { Experience, Capabilities } from "@/components/dossier/Track";
import { About, Credentials } from "@/components/dossier/About";
import Contact from "@/components/dossier/Contact";
import Wordmark from "@/components/dossier/Wordmark";

export default function Home() {
  return (
    <>
      <Masthead />
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
