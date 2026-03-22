"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { personalInfo } from "@/lib/data";

const rotatingWords = [
  "GTM Strategies",
  "AI-Led Growth",
  "Acquisition Funnels",
  "Market Expansion",
  "Brand Launches",
  "AEO & GEO",
];

function TypingRotator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = rotatingWords[currentIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayed === word) {
      setTimeout(() => setIsDeleting(true), 1800);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayed(
        isDeleting ? word.substring(0, displayed.length - 1) : word.substring(0, displayed.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentIndex]);

  return (
    <span className="gradient-text">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[1em] bg-indigo-500 ml-1 align-middle"
      />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <AnimatedBackground />

      {/* Floating keyword pills */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["AI", "GTM", "B2B", "AEO", "GEO", "SaaS", "HPAIR", "🏓"].map((word, i) => (
          <motion.div
            key={word}
            className="absolute text-xs font-mono px-3 py-1 rounded-full border border-indigo-500/20 text-indigo-400/30"
            style={{
              top: `${15 + i * 14}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : `${75 + i * 3}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-[var(--muted)] mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-lg md:text-xl text-[var(--muted)] mb-2"
        >
          I build growth engines powered by
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-2xl md:text-4xl font-bold mb-10 h-[1.3em]"
        >
          <TypingRotator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
        >
          <Button href="#contact">
            <span className="relative z-10">Let&apos;s Build Something</span>
          </Button>
          <Button href={personalInfo.resumePath} variant="secondary" download>
            Download Resume
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[var(--muted)] tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-indigo-500 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
