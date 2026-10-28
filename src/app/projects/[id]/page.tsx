import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FEATURED_PROJECTS, ProjectItem } from "@/data/siteContent";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Kreators Lab",
    };
  }

  return {
    title: `${project.name} (${project.grade}) | Student Project | Kreators Lab`,
    description: `${project.name}: ${project.summary} Built by a Kreators Lab student in Austin & Lake Travis.`,
    openGraph: {
      title: `${project.name} | Kreators Lab Student Project`,
      description: project.summary,
      images: [project.thumbnail],
    },
  };
}

async function ProjectDetailContent({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = FEATURED_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const currentIndex = FEATURED_PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject =
    FEATURED_PROJECTS[
      (currentIndex - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length
    ];
  const nextProject =
    FEATURED_PROJECTS[(currentIndex + 1) % FEATURED_PROJECTS.length];

  // Related projects in the same or adjacent category
  const relatedProjects: ProjectItem[] = FEATURED_PROJECTS.filter(
    (p) => p.id !== project.id
  ).slice(0, 3);

  return (
    <ProjectDetailClient
      project={project}
      relatedProjects={relatedProjects}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9FE]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#35309B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold text-[#55506E]">
              Loading Project Story...
            </p>
          </div>
        </div>
      }
    >
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}
