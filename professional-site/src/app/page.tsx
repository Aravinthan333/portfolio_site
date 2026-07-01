import { HeroHome } from "@/components/sections/HeroHome";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getSiteProfile } from "@/lib/site-profile";

export default async function HomePage() {
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
