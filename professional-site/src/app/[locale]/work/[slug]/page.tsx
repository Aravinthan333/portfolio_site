import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { getProject, projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { ProjectImage } from "@/components/ui/ProjectImage";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/work/${slug}`,
  });
}

export default async function WorkDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const sections = [
    { label: "Overview", content: project.overview },
    { label: "My role", content: project.role },
    { label: "The challenge", content: project.challenge },
    { label: "The solution", content: project.solution },
  ];

  return (
    <article className="section-block pt-16 sm:pt-20">
      <div className="container-wide case-study-hero">
        <ProjectImage
          project={project}
          priority
          sizes="100vw"
          className="!aspect-[21/9]"
        />
      </div>

      <div className="container-main">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <p className="section-label">{project.subtitle}</p>
            <h1 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 text-sm font-medium text-muted">{project.year}</p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted">
              {project.description}
            </p>
          </header>

          <div className="mt-14 space-y-10">
            {sections.map((section) => (
              <section key={section.label}>
                <h2 className="font-display text-xl font-bold text-accent md:text-2xl">
                  {section.label}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {section.content}
                </p>
              </section>
            ))}

            <section>
              <h2 className="font-display text-xl font-bold text-accent md:text-2xl">
                Key highlights
              </h2>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="gradient-border p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                Outcome
              </p>
              <p className="mt-3 text-base leading-relaxed">{project.outcome}</p>
            </div>

            <section>
              <h2 className="font-display text-lg font-bold">Technologies</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5 border-t border-border pt-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Visit live site
              </a>
            )}
            <Button href="/contact" variant="secondary">
              Discuss a similar project
            </Button>
          </div>

          <div className="mt-10 text-center">
            <Link href="/work" className="text-link">
              Back to all projects
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
