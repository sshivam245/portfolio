/**
 * Where the audit request form posts.
 *
 * The site is a static export on GitHub Pages, so there is no server to
 * receive a form. FormSubmit forwards a POST to an inbox with no account and
 * no key: the first submission triggers a one-time confirmation email, and
 * everything after that lands directly.
 *
 * Two things to know:
 * - The first real submission will sit unforwarded until the confirmation
 *   link is clicked. Trigger it yourself once so a lead is never the test.
 * - The address is in the built HTML. It is already published in the contact
 *   section, so this exposes nothing new, but FormSubmit issues an opaque
 *   alias after activation and swapping it in here is a one-line change.
 */
import { profile } from "@/content/profile";

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

export type SubmitState = "idle" | "sending" | "done" | "error";

/** Accepts bare hosts, since that is how people type their own site. */
export function normaliseUrl(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}
