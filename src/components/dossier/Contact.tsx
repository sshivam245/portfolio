import Section from "./Section";
import { profile } from "@/content/profile";
import { asset } from "@/lib/basePath";

/**
 * The close. The bottom of the funnel, painted in the colour the hero uses
 * for "this stage is live", with one ask and the address in type big enough
 * to copy from across the room.
 */
export default function Contact() {
  return (
    <Section
      id="contact"
      tag="Stage 4 · Conversation"
      title="Status: converted. Let's talk."
      tone="zap"
    >
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="max-w-[46ch] text-lg leading-relaxed sm:text-xl">
            I&apos;m looking for a remote founding-GTM or growth-engineering role,
            early enough that building the acquisition machine is the job. Email
            me and I&apos;ll reply the same day.
          </p>
          {/* break-all: an email address is one unbreakable token, and at 200%
              text it pushed the page past the viewport. */}
          <a
            href={`mailto:${profile.email}`}
            className="t-heading mt-8 block break-all underline decoration-[3px] underline-offset-[6px] hover:decoration-[6px]"
          >
            {profile.email}
          </a>
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
