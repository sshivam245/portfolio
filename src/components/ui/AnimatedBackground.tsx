"use client";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-400/15 dark:bg-cyan-400/8 rounded-full blur-3xl animate-float-slow" />
    </div>
  );
}
