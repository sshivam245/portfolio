"use client";

import { FORM_ENDPOINT, normaliseUrl } from "@/lib/forms";
import { BASE_PATH } from "@/lib/basePath";

/**
 * The homepage audit box. It used to be a plain GET form that only opened the
 * full form with the URL prefilled, so a visitor who typed their site and
 * then left was never captured. Now the URL is sent to the inbox the moment
 * they press the button, and the full form still opens for the rest.
 *
 * The GET action stays as the fallback: with no JavaScript, or if the send
 * fails, the visitor still lands on the full form exactly as before. The
 * request uses keepalive so it survives the navigation that follows it.
 */
export default function AuditTeaserForm() {
  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    const data = new FormData(ev.currentTarget);
    const url = normaliseUrl(String(data.get("url") ?? ""));
    // Nothing worth sending: let the GET carry on to the full form.
    if (!url) return;

    try {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Audit interest from the homepage: ${new URL(url).hostname}`,
          _template: "table",
          Site: url,
          Source: "Homepage audit box (no email yet; the full form opened next)",
        }),
      }).catch(() => {});
    } catch {
      // Never block the visitor on the capture.
    }
  }

  return (
    // The action carries BASE_PATH by hand: next/link adds it, a raw form
    // action does not.
    <form action={`${BASE_PATH}/tools/aeo-audit`} method="get" onSubmit={onSubmit} className="mt-7">
      <label htmlFor="teaser-url" className="label block">
        Your site
      </label>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <input
          id="teaser-url"
          name="url"
          autoComplete="url"
          placeholder="yourcompany.com"
          className="field min-w-0 flex-1"
        />
        <button type="submit" className="btn shrink-0">
          Check it
        </button>
      </div>
    </form>
  );
}
