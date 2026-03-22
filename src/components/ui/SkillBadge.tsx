"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  delay?: number;
}

export default function SkillBadge({ name, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="inline-block px-4 py-2 rounded-full text-sm font-medium border-l-2 border-indigo-500 glass-card hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-300 cursor-default"
    >
      {name}
    </motion.span>
  );
}
