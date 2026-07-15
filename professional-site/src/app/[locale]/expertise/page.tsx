import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { ExpertiseGrid } from "@/components/sections/ExpertiseGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/ui/PageHero";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.expertise" });
  return buildMetadata({
    title: t("title"),
    description: t("subtitle"),
    path: "/expertise",
  });
}

export default async function ExpertisePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.expertise");

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="section-block section-alt !pt-0">
        <div className="container-wide">
          <ExpertiseGrid showServices />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
