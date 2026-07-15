import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Collaborators } from "@/components/Collaborators";
import { Process } from "@/components/Process";
import { WhyMe } from "@/components/WhyMe";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { HireCta } from "@/components/HireCta";
import { HomeFaq } from "@/components/HomeFaq";
import { SITE } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import {
  faqPageSchema,
  jsonLdScript,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/schema";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getLocalizedHomepageFaqs } from "@/lib/i18n-content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("seo");
  return buildMetadata({
    title: t("homeTitle", { name: SITE.name }),
    description: t("homeDescription"),
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const homepageFaqs = await getLocalizedHomepageFaqs();

  const schema = [
    personSchema(),
    professionalServiceSchema(),
    websiteSchema(),
    faqPageSchema(homepageFaqs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(schema)}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:shadow-lg"
      >
        {t("skipToContent")}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Metrics />
        <Services />
        <Projects />
        <Collaborators />
        <Process />
        <WhyMe />
        <Skills />
        <HomeFaq />
        <div className="section-wrap pb-20 sm:pb-28">
          <HireCta />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
