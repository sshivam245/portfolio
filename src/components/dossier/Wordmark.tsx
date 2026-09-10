/**
 * Oversized name set as a graphic element, bleeding to the container edges.
 * Borrowed from the 166px "PORTFOLIO" on abhijeet-patil.com — at this scale
 * type stops being text and becomes the page's only real ornament, which is
 * how a dossier gets personality without adding decoration.
 *
 * aria-hidden: it repeats the name already in the header and masthead.
 */
export default function Wordmark() {
  return (
    <div className="rule-t overflow-hidden">
      <div className="shell py-6 sm:py-8">
        <p
          aria-hidden
          className="select-none whitespace-nowrap font-display text-[15vw] font-normal leading-[0.85] tracking-[-0.04em] text-ink/[0.09]"
        >
          Shivam Goel
        </p>
      </div>
    </div>
  );
}
