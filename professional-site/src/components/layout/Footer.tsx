import Link from "next/link";
import { getSiteProfile } from "@/lib/site-profile";

export async function Footer() {
  const profile = await getSiteProfile();

  return (
    <footer className="site-footer">
      <div className="container-wide py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            Copyright © {new Date().getFullYear()} {profile.name} | All Rights Reserved
          </p>
          <div className="flex gap-5 text-sm font-semibold">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="footer-link">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
