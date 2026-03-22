"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { personalInfo } from "@/lib/data";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Hi Shivam,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, "_self");
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Let's Talk Growth"
          subtitle="Got a challenge? I've probably solved something like it before."
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <p className="text-lg text-[var(--muted)]">
                Whether you need a <span className="text-[var(--foreground)] font-medium">GTM strategy from scratch</span>,
                want to <span className="text-[var(--foreground)] font-medium">scale your acquisition engine</span>,
                or just want to geek out about <span className="gradient-text font-semibold">AI in marketing</span> —
                I&apos;m all ears.
              </p>

              <div className="space-y-3 pt-4">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 glass-card p-4 rounded-xl text-[var(--muted)] hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300 group"
                  whileHover={{ x: 4 }}
                >
                  <EnvelopeIcon className="w-5 h-5 group-hover:text-indigo-400" />
                  <span className="text-sm">{personalInfo.email}</span>
                </motion.a>
                <motion.a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 glass-card p-4 rounded-xl text-[var(--muted)] hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300 group"
                  whileHover={{ x: 4 }}
                >
                  <PhoneIcon className="w-5 h-5 group-hover:text-indigo-400" />
                  <span className="text-sm">{personalInfo.phone}</span>
                </motion.a>
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass-card p-4 rounded-xl text-[var(--muted)] hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-300 group"
                  whileHover={{ x: 4 }}
                >
                  <svg className="w-5 h-5 group-hover:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm">LinkedIn Profile</span>
                </motion.a>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="glass-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="glass-input"
                />
                <textarea
                  name="message"
                  placeholder="Tell me about your growth challenge..."
                  rows={4}
                  required
                  className="glass-input resize-none"
                />
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-60"
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                    ? "Message Sent! ✓"
                    : "Send Message →"}
                </motion.button>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
