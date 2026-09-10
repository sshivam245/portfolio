import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="rule-t">
      <div className="shell flex flex-wrap items-center justify-between gap-3 py-8">
        <p className="label">
          {profile.name} · {profile.role}, {profile.roleAlt}
        </p>
        <p className="label">
          Built with Next.js
          <span className="mx-2 text-accent">·</span>
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
