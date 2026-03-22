"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GlassCard from "./GlassCard";

interface MetricCardProps {
  value: string;
  label: string;
  delay?: number;
}

export default function MetricCard({ value, label, delay = 0 }: MetricCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    if (isNaN(numericPart)) {
      setDisplayValue(value);
      return;
    }

    let current = 0;
    const duration = 1500;
    const steps = 40;
    const increment = numericPart / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericPart) {
        current = numericPart;
        clearInterval(timer);
      }
      setDisplayValue(Math.round(current) + suffix);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <GlassCard className="text-center p-8" hover>
        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
          {displayValue}
        </div>
        <div className="text-[var(--muted)] text-sm">{label}</div>
      </GlassCard>
    </motion.div>
  );
}
