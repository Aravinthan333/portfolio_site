import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE, getEmail, getLinkedIn, getGitHub, getCalendly } from "@/lib/site";
import { getSiteProfile } from "@/lib/site-profile";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Contact ${SITE.name}, ${SITE.title}. ${SITE.availability}`,
  path: "/contact",
});

export default async function ContactPage() {
  const profile = await getSiteProfile();

  const contactLinks = [
    { label: "Email", value: getEmail(), href: `mailto:${getEmail()}` },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/aravinthanbalaji",
      href: getLinkedIn(),
      external: true,
    },
    {
      label: "GitHub",
      value: "github.com/Aravinthan333",
      href: getGitHub(),
      external: true,
    },
    {
      label: "Schedule",
      value: "Book a discovery call",
      href: getCalendly(),
      external: true,
    },
  ];

  return (
    <div className="hero-section section-block pt-20 md:pt-24">
      <div className="container-wide">
        <ContactPageContent
          availability={profile.availability}
          location={profile.location}
          links={contactLinks}
        />
      </div>
    </div>
  );
}
