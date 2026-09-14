/**
 * Index-length copy.
 *
 * A case study's summary is written for the case study page, where three
 * lines are fine. Seven of them stacked on the homepage is a wall, and the
 * index only has to answer "is this worth a click".
 *
 * Deterministic so it cannot drift from the source: take the first sentence,
 * and if that is still long and contains a colon, keep only what precedes it.
 * The colon in these summaries always introduces a list of specifics, which
 * is exactly the detail the index does not need.
 */
export function indexLine(summary: string): string {
  const sentences = summary.match(/[^.?!]+[.?!](?=\s|$)/g) ?? [summary];
  let first = sentences[0].trim();
  /*
   * Some summaries open with a hook rather than a fact ("Nobody asked for
   * this."). On its own under a title that is a tone with no information,
   * so a very short opener keeps the sentence that follows it.
   */
  if (first.length < 40 && sentences[1]) first = `${first} ${sentences[1].trim()}`;
  if (first.length <= 130) return first;
  const colon = first.indexOf(": ");
  return colon > 40 ? `${first.slice(0, colon)}.` : first;
}
