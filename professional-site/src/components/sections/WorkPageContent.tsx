import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { FadeUp } from "@/components/ui/FadeUp";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";

export async function WorkPageContent() {
  const t = await getTranslations("pages.work");
  const tCommon = await getTranslations("common");
  const [featured, ...rest] = projects;

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="section-block !pt-0">
        <div className="container-wide">
          <div className="work-stats">
            <div className="work-stat">
              <p className="work-stat-value">{projects.length}</p>
              <p className="work-stat-label">{t("projectsShipped")}</p>
            </div>
            <div className="work-stat">
              <p className="work-stat-value">4+</p>
              <p className="work-stat-label">{t("industryVerticals")}</p>
            </div>
            <div className="work-stat">
              <p className="work-stat-value">100%</p>
              <p className="work-stat-label">{t("remoteDelivery")}</p>
            </div>
          </div>

          {featured && (
            <FadeUp>
              <Link href={`/work/${featured.slug}`} className="work-featured group">
                <div className="work-featured-media">
                  <ProjectImage project={featured} priority sizes="(max-width: 1024px) 100vw, 60vw" />
                </div>
                <div className="work-featured-body">
                  <p className="work-card-meta">
                    {featured.subtitle} · {featured.year}
                  </p>
                  <h2 className="work-featured-title">{featured.title}</h2>
                  <p className="work-card-desc">{featured.description}</p>
                  <p className="mt-3 text-sm font-medium text-foreground">{featured.outcome}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featured.stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="work-card-link mt-6">
                    {tCommon("readCaseStudy")}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </FadeUp>
          )}

          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12">
            {rest.map((project, i) => (
              <FadeUp key={project.slug} delay={0.05 + i * 0.05}>
                <Link href={`/work/${project.slug}`} className="work-card group">
                  <ProjectImage project={project} sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="work-card-body">
                    <p className="work-card-meta">
                      {project.subtitle} · {project.year}
                    </p>
                    <h3 className="work-card-title">{project.title}</h3>
                    <p className="work-card-desc">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="work-card-link">
                      {tCommon("viewProject")}
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.15}>
            <div className="work-cta-band">
              <div>
                <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                  {t("haveProject")}
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  {t("projectCta")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">{tCommon("startConversation")}</Button>
                {featured?.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-accent/40 hover:text-accent sm:px-5 sm:py-2.5"
                  >
                    {tCommon("seeLiveWork")}
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
