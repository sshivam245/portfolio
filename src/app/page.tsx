import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhatIDo from "@/components/sections/WhatIDo";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import BeyondWork from "@/components/sections/BeyondWork";
import Publications from "@/components/sections/Publications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhatIDo />
      <Experience />
      <Skills />
      <Education />
      <BeyondWork />
      <Publications />
      <Contact />
    </main>
  );
}
