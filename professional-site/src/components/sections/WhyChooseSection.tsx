import type { SiteProfileData } from "@/lib/site-profile";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";

type Props = {
  profile: SiteProfileData;
};

export function WhyChooseSection({ profile }: Props) {
  return (
    <section className="section-block" id="about">
      <div className="container-wide">
        <FadeUp>
          <h2 className="section-heading">About Me</h2>
        </FadeUp>

        <div className="about-panel mx-auto max-w-3xl text-center">
          <FadeUp delay={0.06}>
            <h3 className="text-2xl font-bold text-accent sm:text-3xl">{profile.title}</h3>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m {profile.name}, a {profile.title.toLowerCase()} focused on delivering
              reliable, scalable software for businesses — from customer-facing applications
              and APIs to cloud infrastructure and production deployments.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {profile.availability}
            </p>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div className="mt-8">
              <Button href="/about">Learn more about me</Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
