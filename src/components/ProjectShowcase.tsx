"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FEATURED_PROJECTS, ProjectItem } from "@/data/siteContent";
import { ProjectCard } from "./ProjectCard";

interface ProjectShowcaseProps {
  onSelectProject?: (project: ProjectItem) => void;
  onExploreAll?: () => void;
}

export function ProjectShowcase({
  onSelectProject,
  onExploreAll,
}: ProjectShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = FEATURED_PROJECTS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left -> Next
      handleNext();
    } else if (diff < -50) {
      // Swiped right -> Prev
      handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-28 bg-gradient-to-b from-[#EBE8FC] via-[#F3F1FE] to-[#EBE8FC] border-y border-[#35309B]/15 relative overflow-hidden"
    >
      {/* Ambient background glows for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-36 w-96 h-96 rounded-full bg-[#473DEA]/12 blur-3xl" />
        <div className="absolute bottom-1/4 -right-36 w-96 h-96 rounded-full bg-[#35309B]/12 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Centered in the middle per requirements */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border-2 border-[#35309B]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Real Student Creations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Small Ideas. Amazing Possibilities.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#55506E] leading-relaxed">
            A fishing game. An imaginative digital experience. An idea nobody else thought of.
            You might be surprised by what kids can create when they&apos;re encouraged to explore their own ideas.
            At Kreators Lab, students don&apos;t just follow instructions. They imagine, experiment, make decisions, and work on projects they can call their own.
          </p>
        </div>

        {/* Sliding Cards Container with High-Contrast Left/Right Controls */}
        <div className="relative max-w-5xl mx-auto px-2 sm:px-6">
          {/* Left Arrow Button: High-Contrast Solid Purple with White Rim & Deep Shadow */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous student project"
            className="absolute -left-2 sm:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#35309B] hover:bg-[#473DEA] text-white hover:text-[#DFFF00] border-2 border-white ring-4 ring-[#35309B]/25 shadow-[0_10px_30px_rgba(53,48,155,0.45)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00] cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 -ml-0.5" strokeWidth={2.5} />
          </button>

          {/* Right Arrow Button: High-Contrast Solid Purple with White Rim & Deep Shadow */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next student project"
            className="absolute -right-2 sm:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#35309B] hover:bg-[#473DEA] text-white hover:text-[#DFFF00] border-2 border-white ring-4 ring-[#35309B]/25 shadow-[0_10px_30px_rgba(53,48,155,0.45)] flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00] cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 ml-0.5" strokeWidth={2.5} />
          </button>

          {/* Sliding Track Viewport */}
          <div
            className="overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {FEATURED_PROJECTS.map((project, index) => (
                <div key={project.id} className="w-full shrink-0 p-1">
                  <ProjectCard
                    project={project}
                    projectNumber={index + 1}
                    totalProjects={total}
                    onViewProject={onSelectProject}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* High-Contrast Tactile Slider Dock: Dots + Current Count */}
          <div className="flex items-center justify-center mt-10">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border-2 border-[#35309B]/20 shadow-md">
              <span className="text-xs font-bold text-[#35309B] tracking-wider uppercase pr-1">
                Project {currentIndex + 1} of {total}
              </span>
              <div className="h-4 w-px bg-[#35309B]/20" />
              <div className="flex items-center gap-2">
                {FEATURED_PROJECTS.map((project, idx) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Jump to project ${idx + 1}: ${project.name}`}
                    className={`transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B] cursor-pointer ${
                      currentIndex === idx
                        ? "w-8 h-3 bg-[#35309B] shadow-sm ring-2 ring-[#35309B]/30"
                        : "w-3 h-3 bg-[#35309B]/30 hover:bg-[#35309B]/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={onExploreAll}
            className="inline-flex items-center justify-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white text-base font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B] cursor-pointer"
          >
            <span>Explore All Student Projects</span>
            <ArrowRight className="w-4 h-4 text-[#DFFF00]" />
          </button>
        </div>
      </div>
    </section>
  );
}
