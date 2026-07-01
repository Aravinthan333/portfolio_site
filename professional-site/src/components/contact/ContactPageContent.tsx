"use client";

import { useState } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { CallRequestForm } from "@/components/contact/CallRequestForm";
import { FadeUp } from "@/components/ui/FadeUp";
import { Globe2, FileSignature, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

type LinkItem = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

type Props = {
  availability: string;
  location: string;
  links: LinkItem[];
};

type Tab = "message" | "call";

export function ContactPageContent({ availability, location, links }: Props) {
  const [tab, setTab] = useState<Tab>("message");

  return (
    <>
      <FadeUp>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="section-heading !mb-4">Contact Me</h1>
          <p className="section-subtitle">
            Share your project requirements or request a call — I&apos;ll respond within 24 hours.
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={0.05}>
        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <span className="availability-badge">
            <Globe2 size={16} className="shrink-0 text-accent" />
            Remote work worldwide
          </span>
          <span className="availability-badge">
            <FileSignature size={16} className="shrink-0 text-accent" />
            Contract-based engagements
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted">
          {availability}
        </p>
      </FadeUp>

      <div className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,280px)_1fr]">
        <FadeUp delay={0.08}>
          <aside className="contact-sidebar space-y-4">
            <div className="contact-panel">
              <h2 className="contact-panel-title">Direct contact</h2>
              <ul className="mt-5 space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {link.label}
                    </p>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                    >
                      {link.value}
                      {link.external && <ExternalLink size={12} />}
                    </a>
                  </li>
                ))}
                <li>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Location</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-foreground">
                    <MapPin size={14} className="text-accent" />
                    {location}
                  </p>
                </li>
              </ul>
            </div>
          </aside>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="contact-panel">
            <div className="contact-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "message"}
                className={`contact-tab ${tab === "message" ? "is-active" : ""}`}
                onClick={() => setTab("message")}
              >
                <Mail size={16} />
                Send a message
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "call"}
                className={`contact-tab ${tab === "call" ? "is-active" : ""}`}
                onClick={() => setTab("call")}
              >
                <Phone size={16} />
                Request a call
              </button>
            </div>

            <div className="mt-8">
              {tab === "message" ? (
                <div role="tabpanel">
                  <p className="mb-6 text-sm text-muted">
                    Tell me about the service you need and your project goals.
                  </p>
                  <ContactForm />
                </div>
              ) : (
                <div role="tabpanel">
                  <p className="mb-6 text-sm text-muted">
                    Pick a preferred date and time in your timezone — I&apos;ll see the IST equivalent.
                  </p>
                  <CallRequestForm />
                </div>
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </>
  );
}
