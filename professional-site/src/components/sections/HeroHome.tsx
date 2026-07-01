"use client";

import Image from "next/image";
import Link from "next/link";
import type { SiteProfileData } from "@/lib/site-profile";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";

type Props = {
  profile: SiteProfileData;
};

export function HeroHome({ profile }: Props) {
  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ").slice(1).join(" ");

  return (
    <section className="hero-portfolio section-block min-h-[90vh] flex items-center">
      <div className="container-wide">
        <div className="hero-split">
          <div className="hero-split-content">
            <FadeUp>
              <p className="hero-greeting">Hello, I&apos;m</p>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="hero-name">
                {firstName}{" "}
                <span className="text-accent">{lastName.charAt(0)}</span>
                {lastName.slice(1)}
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="hero-typed-line">
                And I&apos;m a{" "}
                <span className="text-accent">{profile.title}</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="hero-intro">{profile.tagline}</p>
              <p className="hero-intro-muted">{profile.availability}</p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="hero-social">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hero-social-link"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hero-social-link"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.22}>
              <div className="hero-actions">
                <Button href="/contact">Get in touch</Button>
                <Link href="/work" className="btn-secondary">
                  View my work
                </Link>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.12} className="hero-split-media">
            <div className="hero-profile-ring">
              <Image
                src="/images/profile.jpg"
                alt={profile.name}
                width={420}
                height={420}
                priority
                className="hero-profile-img"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.754-1.335-1.754-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
