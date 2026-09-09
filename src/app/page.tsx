import Masthead from "@/components/dossier/Masthead";
import Work from "@/components/dossier/Work";
import { Experience, Capabilities } from "@/components/dossier/Track";
import { About, Credentials } from "@/components/dossier/About";
import Contact from "@/components/dossier/Contact";

export default function Home() {
  return (
    <>
      <Masthead />
      <Work />
      <Experience />
      <Capabilities />
      <About />
      <Credentials />
      <Contact />
    </>
  );
}
