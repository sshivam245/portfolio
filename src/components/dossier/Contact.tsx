import Section from "./Section";
import { profile } from "@/content/profile";
import { asset } from "@/lib/basePath";

/**
 * The close. The bottom of the funnel, painted signal orange, the colour
 * YOU is in the hero, and the one loud block on the page. One ask, and the
 * buttons to act on it.
 */
export default function Contact() {
  return (
    <Section
      id="contact"
      tag="Contact"
      title="Let's talk."
      tone="signal"
    >
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="max-w-[46ch] text-lg leading-relaxed sm:text-xl">
            I&apos;m looking for a remote founding-GTM or growth-engineering role,
            early enough that building the acquisition machine is the job. Email
            me and I&apos;ll reply the same day.
          </p>
          {/* No address set in large type here: the Email me button is the
              one way to write, and the address beside it read as clutter. */}
        </div>

        {/* Two by two. As a wrapping row four buttons left "Download CV"
            alone on a second line under the other three. */}
        <div className="grid content-end gap-3 sm:grid-cols-2 lg:col-span-5">
          <a href={`mailto:${profile.email}`} className="btn">
            Email me
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="btn-ghost">
            LinkedIn ↗
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer noopener" className="btn-ghost">
            GitHub ↗
          </a>
          <a href={asset(profile.resumePath)} download className="btn-ghost">
            Download CV
          </a>
        </div>
      </div>
    </Section>
  );
}
