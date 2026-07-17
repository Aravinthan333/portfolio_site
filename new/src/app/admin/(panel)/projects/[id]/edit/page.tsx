import { notFound } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

type Props = { params: Promise<{ id: string }> };

function parseList(value: string) {
  try {
    const parsed = JSON.parse(value) as string[];
    return Array.isArray(parsed) ? parsed.join("\n") : "";
  } catch {
    return "";
  }
}

function parseGallery(value: string) {
  try {
    const parsed = JSON.parse(value) as string[];
    return Array.isArray(parsed) ? [...parsed, "", "", ""].slice(0, 3) : ["", "", ""];
  } catch {
    return ["", "", ""];
  }
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.projectCaseStudy.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div>
      <AdminPageHeader
        icon={BriefcaseBusiness}
        title="Edit project"
        description={project.title}
        backHref="/admin/projects"
        backLabel="All projects"
      />
      <div className="mt-8">
        <ProjectForm
          initial={{
            id: project.id,
            slug: project.slug,
            title: project.title,
            subtitle: project.subtitle,
            description: project.description,
            overview: project.overview,
            role: project.role,
            challenge: project.challenge,
            solution: project.solution,
            highlights: parseList(project.highlights),
            outcome: project.outcome,
            stack: parseList(project.stack),
            tags: parseList(project.tags),
            liveUrl: project.liveUrl ?? "",
            year: project.year,
            image: project.image,
            accent: project.accent ?? "",
            hasCaseStudy: project.hasCaseStudy,
            galleryImages: parseGallery(project.galleryImages),
            published: project.published,
          }}
        />
      </div>
    </div>
  );
}
