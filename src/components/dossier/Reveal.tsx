/**
 * A section reveal that cannot fail.
 *
 * This used to be an IntersectionObserver client component that set
 * `opacity: 0` until it fired — which meant the whole page was blank until
 * React hydrated (~3s on a slow connection). Now it's a plain wrapper: the
 * animation lives entirely in CSS behind `@supports (animation-timeline)`,
 * so browsers without support simply render the content, immediately.
 *
 * No "use client", no JS, no blank-page risk.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
