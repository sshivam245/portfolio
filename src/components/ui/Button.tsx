"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  download?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
  download,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-all duration-300 text-sm md:text-base";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105",
    secondary:
      "glass-card hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10",
  };

  const styles = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={styles} download={download || undefined}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
