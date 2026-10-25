import { asset } from "@/lib/basePath";
import { orgLogos } from "@/content/logos";

/**
 * Where he has worked, as a quiet row.
 *
 * This is what survives of the orbit. The ring carried real information —
 * five employers and nine tools — but it carried it as the largest element on
 * the first screen, in thirteen different brands' colours. The only saturated
 * colour anywhere on this site came from other companies' logos, which is a
 * strange thing for a portfolio to let happen.
 *
 * So: same facts, no spectacle. Desaturated, because the palette should be
 * his; names beside the marks, because a logo alone is a guessing game; and
 * no motion, because this is a credential list and not an attraction.
 */
export default function Marks() {
  return (
    <div className="mt-12">
      <p className="label">Previously</p>
      <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-5">
        {orgLogos.map((logo) => (
          <li key={logo.label} className="mark-item flex items-center gap-2.5">
            {logo.path ? (
              <svg
                viewBox={logo.viewBox ?? "0 0 24 24"}
                fill="currentColor"
                role="img"
                aria-label={logo.label}
                className="mark h-5 w-5 shrink-0"
              >
                {/* The <path> was missing: a `path` logo rendered an empty
                    <svg>. Latent only because every current orgLogos entry
                    uses `file`. LogoChip.tsx had it right before it was
                    deleted. */}
                <path d={logo.path} />
              </svg>
            ) : logo.file ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={asset(`/logos/${logo.file}`)}
                alt=""
                width={20}
                height={20}
                decoding="async"
                className="mark h-5 w-5 shrink-0 object-contain"
              />
            ) : null}
            <span className="label text-ink">{logo.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
