import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getEmail, getLinkedIn, getGitHub, getCalendly } from "@/lib/site";
import { getSiteProfile } from "@/lib/site-profile";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  const profile = await getSiteProfile();
  return buildMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const profile = await getSiteProfile();
  const t = await getTranslations("common");
  const tProfile = await getTranslations("profile");

  const contactLinks = [
    { label: t("email"), value: getEmail(), href: `mailto:${getEmail()}` },
    {
      label: t("linkedIn"),
      value: "linkedin.com/in/aravinthanbalaji",
      href: getLinkedIn(),
      external: true,
    },
    {
      label: t("github"),
      value: "github.com/Aravinthan333",
      href: getGitHub(),
      external: true,
    },
    {
      label: t("schedule"),
      value: t("bookCall"),
      href: getCalendly(),
      external: true,
    },
  ];

  return (
    <div className="hero-section section-block pt-16 sm:pt-20">
      <div className="container-wide">
        <ContactPageContent
          availability={tProfile("availability")}
          location={profile.location}
          links={contactLinks}
        />
      </div>
    </div>
  );
}
