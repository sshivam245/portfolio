/**
 * Inline marks for the contact rows. Drawn here rather than pulled from a
 * CDN so the site stays self-contained and the icons inherit currentColor,
 * which matters because the accent and ink both change with the theme.
 *
 * Simple recognisable glyphs, sized to the 16px mono labels beside them.
 */

type Props = { className?: string };

const base = "h-4 w-4 shrink-0";

export function LinkedInIcon({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.5 4.4 5.9V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.45-2.2 3v5.7h-4V9Z" />
    </svg>
  );
}

export function GitHubIcon({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M12 1.5A10.5 10.5 0 0 0 1.5 12c0 4.64 3 8.57 7.18 9.96.52.1.71-.23.71-.5v-1.77c-2.92.64-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.08 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.42-2.33-.27-4.78-1.17-4.78-5.19 0-1.15.41-2.08 1.09-2.82-.11-.27-.47-1.34.1-2.8 0 0 .88-.28 2.89 1.08a10 10 0 0 1 5.26 0c2-1.36 2.89-1.08 2.89-1.08.57 1.46.21 2.53.1 2.8.68.74 1.09 1.67 1.09 2.82 0 4.03-2.46 4.92-4.8 5.18.38.33.72.97.72 1.96v2.9c0 .28.19.61.72.5A10.5 10.5 0 0 0 22.5 12 10.5 10.5 0 0 0 12 1.5Z" />
    </svg>
  );
}

export function MailIcon({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className}`}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  );
}

export function DownloadIcon({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`${base} ${className}`}>
      <path d="M12 3v11" />
      <path d="m7.5 10 4.5 4.5 4.5-4.5" />
      <path d="M4 20h16" />
    </svg>
  );
}
