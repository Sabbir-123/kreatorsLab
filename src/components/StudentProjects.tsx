"use client";

import React from "react";
import { Sparkles, ExternalLink } from "lucide-react";
import { FEATURED_PROJECTS, ProjectItem } from "@/data/siteContent";
import { ProjectCard } from "@/components/ProjectCard";

interface StudentProjectsProps {
  onSelectProject?: (project: ProjectItem) => void;
  onExploreAll?: () => void;
}

export function StudentProjects({
  onSelectProject,
  onExploreAll,
}: StudentProjectsProps) {
  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-white border-b border-gray-100 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purple-soft text-brand-purple text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Student Creations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight leading-tight">
            Small Ideas. Amazing Possibilities.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-brand-muted leading-relaxed">
            At Kreators Lab, students don&apos;t just follow instructions — they imagine, experiment, make decisions, and work on projects they can call their own.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewProject={onSelectProject}
            />
          ))}
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onExploreAll}
            className="inline-flex items-center justify-center gap-2 bg-brand-purple-soft hover:bg-brand-purple-soft/80 text-brand-purple text-sm sm:text-base font-bold px-8 py-3.5 rounded-full border border-brand-purple/20 transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
          >
            <span>Explore All Student Projects</span>
            <ExternalLink className="w-4 h-4" />
          </button>
          <p className="mt-2 text-xs text-brand-muted">
            All student work demonstrated with parent permission. Authentic creations built during Kreators Lab cohorts.
          </p>
        </div>
      </div>
    </section>
  );
}
