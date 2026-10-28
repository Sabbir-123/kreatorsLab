"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  FEATURED_PROJECTS,
  ProjectItem,
  CONFIRMED_PROJECT_CATEGORIES,
} from "@/data/siteContent";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProjectShowcaseProps {
  onSelectProject?: (project: ProjectItem) => void;
  onExploreAll?: () => void;
}

export function ProjectShowcase({
  onSelectProject,
  onExploreAll,
}: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  const filteredProjects =
    selectedCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  const total = filteredProjects.length;

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setActiveIndex(0);
    setIsPlayingPreview(false);
  };

  const handlePrev = () => {
    if (total === 0) return;
    setIsPlayingPreview(false);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    if (total === 0) return;
    setIsPlayingPreview(false);
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  if (total === 0) return null;

  const currentProject = filteredProjects[activeIndex];
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const prevProject = filteredProjects[prevIndex];
  const nextProject = filteredProjects[nextIndex];

  return (
    <section
      id="projects"
      className="scroll-mt-20 py-16 sm:py-20 md:py-24 bg-[#FAF9FE] relative overflow-hidden border-b border-[#35309B]/15"
      aria-label="Student Projects Cover Flow Showcase"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#473DEA]/8 blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-[#DFFF00]/12 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 reveal-fade-up ${
            headerVisible ? "is-visible" : ""
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-3 border border-[#35309B]/15 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Student Projects &amp; Live Creations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18152B] tracking-tight leading-tight">
            Projects Built by Kreators Lab Students
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#65617A] max-w-2xl mx-auto leading-relaxed">
            Real playable games, animations, mobile apps, and creative tech built by our young Austin &amp; Lake Travis makers. Slide to explore projects and click to view full details.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-8">
            {CONFIRMED_PROJECT_CATEGORIES.map((category) => {
              const label = category === "All" ? "All Projects (8)" : category;
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleSelectCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#35309B] text-white shadow-md scale-105"
                      : "bg-white hover:bg-white/90 text-[#55506E] hover:text-[#35309B] border border-[#35309B]/15 shadow-2xs"
                  }`}
                >
                  <span>{label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Cover Flow Carousel Container with Outer Arrows (Both side cards fully visible) */}
        <div className="relative max-w-6xl mx-auto px-3 sm:px-8 md:px-12 lg:px-14 mt-6 sm:mt-10 select-none">
          {/* Circular Left Arrow (Positioned comfortably beside the fully visible left card) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="absolute left-0 sm:-left-2 md:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-[#18152B] shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-[#35309B]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B]"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#18152B]" />
          </button>

          {/* Circular Right Arrow (Positioned comfortably beside the fully visible right card) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="absolute right-0 sm:-right-2 md:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-[#18152B] shadow-xl backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-[#35309B]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B]"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#18152B]" />
          </button>

          {/* 3-Card Carousel Track (overflow-visible so all cards & rounded corners are 100% visible) */}
          <div
            className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 py-4 sm:py-6 overflow-visible"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 1. LEFT PREVIEW CARD (Fully visible with complete rounded borders) */}
            {total > 1 && (
              <div
                onClick={handlePrev}
                className="group relative shrink-0 w-[85px] sm:w-[150px] md:w-[200px] lg:w-[260px] aspect-[3/3.8] rounded-[18px] sm:rounded-[28px] lg:rounded-[36px] overflow-hidden scale-[0.90] sm:scale-92 lg:scale-95 opacity-75 hover:opacity-100 transition-all duration-500 ease-out cursor-pointer shadow-lg hover:shadow-2xl border-2 border-white/90 hover:border-[#DFFF00] bg-[#18123B]"
                aria-label={`View previous: ${prevProject.name}`}
              >
                <Image
                  src={prevProject.thumbnail}
                  alt={prevProject.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 150px, 260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 z-10 hidden sm:flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-[#DFFF00] text-[10px] font-black border border-white/20 backdrop-blur-md">
                    {prevProject.category}
                  </span>
                </div>

                {/* Overlaid Title on Preview Card */}
                <div className="absolute inset-x-2 sm:inset-x-3 bottom-3 sm:bottom-5 z-10 text-center text-white">
                  <p className="text-[9px] sm:text-[11px] font-bold text-[#DFFF00] uppercase tracking-wider mb-0.5">
                    {prevProject.grade}
                  </p>
                  <h4 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-snug drop-shadow-md line-clamp-2">
                    {prevProject.name}
                  </h4>
                </div>
              </div>
            )}

            {/* 2. CENTER HERO CARD (Active / Focused) */}
            <div className="relative shrink-0 w-[240px] sm:w-[320px] md:w-[370px] lg:w-[420px] aspect-[3/3.8] rounded-[24px] sm:rounded-[34px] lg:rounded-[40px] overflow-hidden scale-100 opacity-100 transition-all duration-500 ease-out z-20 shadow-[0_20px_60px_rgba(35,28,84,0.35)] border-2 sm:border-3 border-white group bg-[#18123B]">
              {/* Media: Image (Default) or Video (Only when user presses play) */}
              {!isPlayingPreview ? (
                <Image
                  src={currentProject.thumbnail}
                  alt={currentProject.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 270px, 460px"
                />
              ) : (
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={videoRef}
                    src={currentProject.videoUrl || "/videos/kreators-lab-studio-loop.mp4"}
                    poster={currentProject.thumbnail}
                    autoPlay
                    controls
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPlayingPreview(false)}
                    className="absolute top-4 right-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-black text-white text-xs font-bold border border-white/30 backdrop-blur-md shadow-md cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-[#DFFF00]" />
                    <span>Show Photo</span>
                  </button>
                </div>
              )}

              {/* Scrim for Typographic Legibility (hidden when video is playing for full video visibility) */}
              {!isPlayingPreview && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0A24]/95 via-[#0E0A24]/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0E0A24]/60 via-transparent to-transparent pointer-events-none" />
                </>
              )}

              {/* Top Badges (Category, Grade & Manual Play Trigger) */}
              {!isPlayingPreview && (
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18123B]/90 backdrop-blur-md border border-white/20 text-[#DFFF00] text-xs font-black shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
                      <span>{currentProject.category}</span>
                    </span>

                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#18152B] text-[11px] font-black shadow-xs">
                      {currentProject.grade}
                    </span>
                  </div>

                  {/* Play Video Trigger Button (Only plays when clicked) */}
                  {currentProject.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setIsPlayingPreview(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 hover:bg-[#35309B] text-white text-[11px] font-bold border border-white/25 backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Play video preview for this project"
                    >
                      <Play className="w-3 h-3 fill-[#DFFF00] text-[#DFFF00]" />
                      <span>Play Video</span>
                    </button>
                  )}
                </div>
              )}

              {/* Overlaid Title and Info (Shown over image) */}
              {!isPlayingPreview && (
                <div className="absolute inset-x-4 sm:inset-x-6 bottom-5 sm:bottom-7 z-20 text-center flex flex-col items-center">
                  <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#DFFF00] drop-shadow-sm mb-1">
                    Built by a {currentProject.grade} Student
                  </span>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                    {currentProject.name}
                  </h3>

                  {currentProject.studentQuote && (
                    <p className="mt-1.5 text-xs sm:text-sm text-white/90 line-clamp-2 max-w-sm font-medium leading-relaxed drop-shadow-sm italic">
                      &ldquo;{currentProject.studentQuote}&rdquo;
                    </p>
                  )}

                  {/* Action CTA Button */}
                  <div className="mt-4 flex items-center gap-2.5">
                    <Link
                      href={`/projects/${currentProject.id}`}
                      onClick={() => onSelectProject?.(currentProject)}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] text-xs sm:text-sm font-extrabold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#18152B]" />
                    </Link>

                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 sm:py-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 text-xs sm:text-sm font-bold shadow-md hover:scale-105 transition-all"
                      >
                        <span>Try Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. RIGHT PREVIEW CARD (Fully visible with complete rounded borders) */}
            {total > 1 && (
              <div
                onClick={handleNext}
                className="group relative shrink-0 w-[85px] sm:w-[150px] md:w-[200px] lg:w-[260px] aspect-[3/3.8] rounded-[18px] sm:rounded-[28px] lg:rounded-[36px] overflow-hidden scale-[0.90] sm:scale-92 lg:scale-95 opacity-75 hover:opacity-100 transition-all duration-500 ease-out cursor-pointer shadow-lg hover:shadow-2xl border-2 border-white/90 hover:border-[#DFFF00] bg-[#18123B]"
                aria-label={`View next: ${nextProject.name}`}
              >
                <Image
                  src={nextProject.thumbnail}
                  alt={nextProject.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 150px, 260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 z-10 hidden sm:flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-[#DFFF00] text-[10px] font-black border border-white/20 backdrop-blur-md">
                    {nextProject.category}
                  </span>
                </div>

                {/* Overlaid Title on Preview Card */}
                <div className="absolute inset-x-2 sm:inset-x-3 bottom-3 sm:bottom-5 z-10 text-center text-white">
                  <p className="text-[9px] sm:text-[11px] font-bold text-[#DFFF00] uppercase tracking-wider mb-0.5">
                    {nextProject.grade}
                  </p>
                  <h4 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-snug drop-shadow-md line-clamp-2">
                    {nextProject.name}
                  </h4>
                </div>
              </div>
            )}
          </div>

          {/* Minimalist Pagination Pill Dots */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8 z-20">
            {filteredProjects.map((proj, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => {
                    setIsPlayingPreview(false);
                    setActiveIndex(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}: ${proj.name}`}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 sm:w-10 bg-[#35309B] shadow-sm"
                      : "w-2 sm:w-2.5 bg-[#35309B]/25 hover:bg-[#35309B]/60"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Primary Call-to-Action: Explore All Projects Page */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/projects"
            onClick={onExploreAll}
            className="inline-flex items-center justify-center gap-3 bg-[#35309B] hover:bg-[#2A247A] text-white text-sm sm:text-base font-extrabold px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(53,48,155,0.3)] hover:shadow-[0_16px_45px_rgba(71,61,234,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          >
            <span>Explore All 8 Student Projects</span>
            <ArrowRight className="w-4 h-4 text-[#DFFF00] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
