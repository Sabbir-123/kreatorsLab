"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ExternalLink, Tag } from "lucide-react";
import { FEATURED_PROJECTS, ProjectItem } from "@/data/siteContent";

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
            A fishing game. An imaginative digital experience. An idea nobody else thought of.
            You might be surprised by what kids can create when they&apos;re encouraged to explore their own ideas.
            At Kreators Lab, students don&apos;t just follow instructions. They imagine, experiment, make decisions, and work on projects they can call their own.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-brand-border/70 hover:border-brand-purple/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] bg-brand-subtle overflow-hidden border-b border-gray-100">
                <Image
                  src={project.thumbnail}
                  alt={`${project.name} (${project.grade}) project preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Grade Badge */}
                <div className="absolute top-3 left-3 bg-brand-dark/90 backdrop-blur-sm text-brand-lime text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {project.grade}
                </div>

                {project.isPlaceholder && (
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] text-brand-muted px-2 py-0.5 rounded border border-gray-200">
                    Replaceable Asset
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-brand-purple uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-purple transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-2.5 text-sm text-brand-muted line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Card Footer / CTA */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    {project.tags[0]}
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectProject?.(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-purple hover:text-brand-purple-deep group-hover:translate-x-0.5 transition-all focus:outline-none"
                    aria-label={`View project details for ${project.name}`}
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
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
