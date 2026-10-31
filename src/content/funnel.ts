import { headlineMetrics } from "./profile";

/**
 * The four funnel stages the homepage walks a visitor down.
 *
 * Each stage borrows its figure from headlineMetrics rather than restating
 * it, so a number corrected in profile.ts is corrected here too. Looked up
 * by label and thrown on a miss: a renamed metric should fail the build,
 * not quietly put "undefined" in the hero.
 *
 * The order is the funnel's, not the metrics': the checkable AI Overview
 * citation comes first because awareness is where a stranger meets you.
 */
function metric(label: string) {
  const m = headlineMetrics.find((x) => x.label === label);
  if (!m) throw new Error(`funnel.ts: no headline metric labelled "${label}"`);
  return { value: `${m.value}${m.unit}`, verified: Boolean(m.verified) };
}

export type FunnelStage = {
  name: string;
  value: string;
  verified: boolean;
  note: string;
};

export const FUNNEL_STAGES: FunnelStage[] = [
  {
    name: "Awareness",
    ...metric("Google + AI Overview"),
    note: "on Google, and cited inside its AI Overview, for “salesforce partner miami”. Go and check.",
  },
  {
    name: "Interest",
    ...metric("Qualified leads"),
    note: "qualified leads in six months as the first GTM hire at Nuvia AI.",
  },
  {
    name: "Consideration",
    ...metric("Conversion lift"),
    note: "conversion lift from multi-channel campaigns.",
  },
  {
    name: "Conversation",
    ...metric("Brand launched"),
    note: "Descipher OS, launched from nothing. The next brand on the list is yours.",
  },
];
