import { setRequestLocale } from "next-intl/server";
import { HeroHome } from "@/components/sections/HeroHome";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getSiteProfile } from "@/lib/site-profile";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const profile = await getSiteProfile();

  return (
    <>
      <HeroHome profile={profile} />
      <WhyChooseSection profile={profile} />
      <SkillsSection />
      <FeaturedWork showViewAll />
      <CtaBanner />
    </>
  );
}
