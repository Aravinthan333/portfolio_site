import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";
import { getSiteProfile } from "@/lib/site-profile";

export async function CtaBanner() {
  const profile = await getSiteProfile();

  return (
    <section className="section-block" id="contact">
      <div className="container-wide">
        <FadeUp>
          <h2 className="section-heading">Contact Me</h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-base leading-relaxed text-muted">
            Open to remote and contract work. Tell me about your project and I&apos;ll respond
            within 24 hours.
          </p>
          <div className="text-center">
            <Button href="/contact">Send a message</Button>
          </div>
          <p className="mt-6 text-center text-sm text-muted">{profile.location}</p>
        </FadeUp>
      </div>
    </section>
  );
}
