"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Play,
  RotateCcw,
  Code,
  Users,
  ShieldCheck,
  MapPin,
  ExternalLink,
  MessageSquareQuote,
  Video,
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Lightbulb,
  Layers,
  Award,
  Check,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryModal } from "@/components/InquiryModal";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectItem } from "@/data/siteContent";

interface ProjectDetailClientProps {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
  prevProject?: ProjectItem;
  nextProject?: ProjectItem;
}

export function ProjectDetailClient({
  project,
  relatedProjects,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  // Hero Video State
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState(false);

  // Presentation Video State
  const [isPlayingPresentationVideo, setIsPlayingPresentationVideo] = useState(false);

  // Interactive Gallery State
  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.thumbnail];
  const galleryCaptions = project.galleryCaptions || [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lightbox Modal State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Inquiry Modal State
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Lightbox navigation helpers
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const handlePrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleNextLightbox, handlePrevLightbox]);

  // Gallery slider handlers
  const handleNextGallery = () => {
    setActiveImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handlePrevGallery = () => {
    setActiveImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FE]">
      <Header />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ========================================================= */}
          {/* 1. TOP BREADCRUMB & NEXT/PREV CASE STUDY NAVIGATOR        */}
          {/* ========================================================= */}
          <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#35309B] hover:text-[#473DEA] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Student Projects Gallery</span>
            </Link>

            {/* Next / Previous Project Quick Navigator */}
            {(prevProject || nextProject) && (
              <div className="flex items-center gap-2 text-xs font-bold text-[#55506E]">
                {prevProject && (
                  <Link
                    href={`/projects/${prevProject.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#EEECFF] text-[#35309B] border border-[#E8E6F1] shadow-2xs transition-all hover:scale-102"
                    title={`Previous case study: ${prevProject.name}`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev: {prevProject.name}</span>
                    <span className="sm:hidden">Prev</span>
                  </Link>
                )}

                {nextProject && (
                  <Link
                    href={`/projects/${nextProject.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#EEECFF] text-[#35309B] border border-[#E8E6F1] shadow-2xs transition-all hover:scale-102"
                    title={`Next case study: ${nextProject.name}`}
                  >
                    <span className="hidden sm:inline">Next: {nextProject.name}</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* 2. PROJECT HERO SECTION (Featured Media, Title & CTAs)    */}
          {/* ========================================================= */}
          <section className="bg-white rounded-3xl border border-[#E4E0F4] shadow-[0_12px_40px_rgba(53,48,155,0.08)] overflow-hidden mb-12 sm:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Media Player Column (7 cols) */}
              <div className="lg:col-span-7 bg-[#140F33] relative flex flex-col justify-center min-h-[340px] sm:min-h-[440px] lg:min-h-[520px]">
                {!isPlayingHeroVideo ? (
                  <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] lg:min-h-[520px] group">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.name} featured preview`}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

                    {/* Top Status Overlays */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18123B]/85 text-[#DFFF00] text-xs font-black border border-white/20 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00] animate-pulse" />
                        <span>{project.category}</span>
                      </span>

                      <span className="px-3 py-1 rounded-full bg-white/95 text-[#18152B] text-xs font-black shadow-sm">
                        {project.grade}
                      </span>
                    </div>

                    {/* Centered Play Button (Only activates on user click) */}
                    {project.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button
                          type="button"
                          onClick={() => setIsPlayingHeroVideo(true)}
                          className="group/btn inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#35309B]/95 hover:bg-[#473DEA] text-white text-sm sm:text-base font-extrabold backdrop-blur-md border-2 border-white/30 shadow-[0_10px_30px_rgba(53,48,155,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          aria-label={`Play video demo for ${project.name}`}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#DFFF00] flex items-center justify-center">
                            <Play className="w-4 h-4 fill-[#18152B] text-[#18152B] ml-0.5 group-hover/btn:scale-110 transition-transform" />
                          </div>
                          <span>Watch Project Demo</span>
                        </button>
                      </div>
                    )}

                    {/* Bottom Status Pill */}
                    <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between text-white/90 text-xs">
                      <span className="font-semibold drop-shadow-sm">
                        Original Student Creation • Austin &amp; Lake Travis Studio
                      </span>
                      <span className="font-bold text-[#DFFF00] bg-black/60 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md">
                        Case Study Verified
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full min-h-[340px] sm:min-h-[440px] lg:min-h-[520px] bg-black flex items-center justify-center">
                    <video
                      src={project.videoUrl || "/videos/kreators-lab-studio-loop.mp4"}
                      poster={project.thumbnail}
                      autoPlay
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPlayingHeroVideo(false)}
                      className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18123B]/90 hover:bg-[#18123B] text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-md cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#DFFF00]" />
                      <span>Show Photo</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Information Column (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35309B] uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
                    <span>Student Creation Case Study</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18152B] tracking-tight leading-tight mb-2">
                    {project.name}
                  </h1>

                  {/* Subtitle */}
                  {project.subtitle && (
                    <p className="text-sm font-semibold text-[#473DEA] mb-4 leading-relaxed">
                      {project.subtitle}
                    </p>
                  )}

                  {/* Short Introduction / Summary */}
                  <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed mb-6 font-medium">
                    {project.summary}
                  </p>

                  {/* Student Creator Quote Card */}
                  {project.studentQuote && (
                    <div className="mb-6 p-4 rounded-2xl bg-[#F5F4FF] border border-[#35309B]/15 relative">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#35309B] mb-1">
                        Student Creator Note:
                      </p>
                      <blockquote className="text-xs sm:text-sm text-[#18152B] italic font-medium leading-relaxed">
                        &ldquo;{project.studentQuote}&rdquo;
                      </blockquote>
                      <p className="mt-1.5 text-[11px] font-semibold text-[#65617A]">
                        — {project.grade} Student, Kreators Lab Studio
                      </p>
                    </div>
                  )}

                  {/* Core Concepts & Skills Applied */}
                  <div className="mb-6">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#18152B]/80 mb-2">
                      Core Concepts &amp; Skills Applied:
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF9FE] text-[#18152B] border border-[#35309B]/20"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#35309B]" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-5 border-t border-[#F0EEF8] space-y-3">
                  {/* Clear CTA to Live Project if available */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <span>Try &amp; Play Live Project</span>
                      <ExternalLink className="w-4 h-4 text-[#18152B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(true)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <span>Inquire About Programs for {project.grade}</span>
                    <ArrowRight className="w-4 h-4 text-[#DFFF00]" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* 3. ABOUT THE PROJECT (Purpose, What It Does, Why It Matters) */}
          {/* ========================================================= */}
          {project.about && (
            <section className="mb-14 sm:mb-20">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-[#35309B]" />
                  <span>Case Study Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#18152B] tracking-tight">
                  About the Project
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#65617A]">
                  A breakdown of the project&apos;s inspiration, mechanics, and educational impact.
                </p>
              </div>

              {/* 3-Column Pillar Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Purpose & Inspiration */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6F1] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#EEECFF] text-[#35309B] flex items-center justify-center mb-4">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#18152B] mb-2">
                      Purpose &amp; Inspiration
                    </h3>
                    <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed font-medium">
                      {project.about.purpose}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#F0EEF8] flex items-center gap-1.5 text-xs font-bold text-[#35309B]">
                    <span>Original student idea</span>
                  </div>
                </div>

                {/* 2. What It Does */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6F1] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#137333] flex items-center justify-center mb-4">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#18152B] mb-2">
                      What It Does &amp; Mechanics
                    </h3>
                    <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed font-medium">
                      {project.about.whatItDoes}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#F0EEF8] flex items-center gap-1.5 text-xs font-bold text-[#137333]">
                    <span>Fully interactive logic</span>
                  </div>
                </div>

                {/* 3. Why It Matters */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E6F1] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[#FEF7E0] text-[#B06000] flex items-center justify-center mb-4">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-[#18152B] mb-2">
                      Why It Matters
                    </h3>
                    <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed font-medium">
                      {project.about.whyItMatters}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#F0EEF8] flex items-center gap-1.5 text-xs font-bold text-[#B06000]">
                    <span>Computational thinking</span>
                  </div>
                </div>
              </div>

              {/* Key Features Checklist */}
              {project.about.keyFeatures && project.about.keyFeatures.length > 0 && (
                <div className="mt-6 p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E6F1] shadow-xs">
                  <h4 className="text-sm font-black text-[#18152B] uppercase tracking-wider mb-4">
                    Key Features &amp; Technical Capabilities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.about.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#DFFF00] text-[#18152B] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#18152B]">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ========================================================= */}
          {/* 4. INTERACTIVE PROJECT IMAGE GALLERY & LIGHTBOX           */}
          {/* ========================================================= */}
          {screenshots.length > 0 && (
            <section className="mb-14 sm:mb-20">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-2">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Interactive Gallery</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#18152B] tracking-tight">
                  Project Image Gallery
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#65617A]">
                  Click any image or expand to fullscreen to explore screenshots, paper prototypes, and studio milestones.
                </p>
              </div>

              {/* Main Interactive Viewing Frame */}
              <div className="bg-white rounded-3xl border border-[#E4E0F4] shadow-md overflow-hidden p-3 sm:p-4">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#18123B] group">
                  <Image
                    src={screenshots[activeImageIndex]}
                    alt={`${project.name} gallery image ${activeImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 1200px) 100vw, 1100px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

                  {/* Left & Right Arrow Buttons on Main Frame */}
                  {screenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevGallery}
                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#35309B] text-white flex items-center justify-center backdrop-blur-md border border-white/25 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                        aria-label="Previous gallery image"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextGallery}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#35309B] text-white flex items-center justify-center backdrop-blur-md border border-white/25 shadow-lg transition-all hover:scale-110 active:scale-95 cursor-pointer"
                        aria-label="Next gallery image"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}

                  {/* Expand Fullscreen / Lightbox Trigger Button */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                    <button
                      type="button"
                      onClick={() => handleOpenLightbox(activeImageIndex)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-[#35309B] text-white text-xs font-bold border border-white/25 backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      aria-label="Open fullscreen image lightbox"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#DFFF00]" />
                      <span>Full View</span>
                    </button>
                  </div>

                  {/* Image Counter & Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white text-xs">
                    <p className="font-semibold drop-shadow-md text-xs sm:text-sm">
                      {galleryCaptions[activeImageIndex] ||
                        `Screen ${activeImageIndex + 1} of ${project.name} creative development`}
                    </p>
                    <span className="shrink-0 bg-black/65 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md font-bold text-[#DFFF00]">
                      {activeImageIndex + 1} / {screenshots.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnails Carousel Bar */}
                {screenshots.length > 1 && (
                  <div className="mt-3 sm:mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                    {screenshots.map((shot, idx) => {
                      const isActive = activeImageIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-[#18123B] transition-all cursor-pointer ${
                            isActive
                              ? "ring-3 ring-[#35309B] shadow-md scale-102 opacity-100"
                              : "opacity-60 hover:opacity-100 hover:scale-[1.01]"
                          }`}
                          aria-label={`View gallery image ${idx + 1}`}
                        >
                          <Image
                            src={shot}
                            alt={`${project.name} thumbnail ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-[#35309B]/20 pointer-events-none" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ========================================================= */}
          {/* 5. HOW THE PROJECT WAS CREATED (Process Timeline & Tech)  */}
          {/* ========================================================= */}
          <section className="mb-14 sm:mb-20">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-2">
                <Code className="w-3.5 h-3.5 text-[#35309B]" />
                <span>Development Process</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#18152B] tracking-tight">
                How This Project Was Created
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#65617A]">
                The step-by-step student journey: from initial paper sketches to debugging logic and live demonstration.
              </p>
            </div>

            {/* Visual 4-Stage Step-by-Step Timeline */}
            {project.processSteps && project.processSteps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {project.processSteps.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-[#E8E6F1] shadow-xs relative flex flex-col justify-between hover:shadow-md hover:border-[#35309B]/30 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-8 h-8 rounded-full bg-[#35309B] text-[#DFFF00] text-xs font-black flex items-center justify-center">
                          {stepItem.step}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF9FE] text-[#35309B] text-[10px] font-black border border-[#35309B]/15">
                          {stepItem.badge}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-[#18152B] mb-2">
                        {stepItem.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed font-medium">
                        {stepItem.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F0EEF8] flex items-center gap-1.5 text-[11px] font-bold text-[#65617A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35309B]" />
                      <span>Stage {idx + 1} Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Technical Implementation Breakdown Box */}
            {project.howItWasMade && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E6F1] shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#35309B] text-[#DFFF00] flex items-center justify-center shrink-0 mt-0.5">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#18152B] mb-1.5">
                      Technical Implementation &amp; Mentorship Breakdown
                    </h4>
                    <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed font-medium">
                      {project.howItWasMade}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ========================================================= */}
          {/* 6. PROJECT PRESENTATION VIDEO (Student Demo at Demo Day) */}
          {/* ========================================================= */}
          {/* Gracefully hidden if no presentation video URL is provided */}
          {project.presentationVideoUrl && (
            <section className="mb-14 sm:mb-20 bg-white rounded-3xl border border-[#E4E0F4] shadow-md p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Responsive Video Player (7 cols) */}
                <div className="lg:col-span-7 bg-[#140F33] rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[16/10] border-2 border-white shadow-xl">
                  {!isPlayingPresentationVideo ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={screenshots[screenshots.length > 2 ? 2 : 0] || project.thumbnail}
                        alt={`${project.name} presentation video cover`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-102"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                      {/* Centered Big Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <button
                          type="button"
                          onClick={() => setIsPlayingPresentationVideo(true)}
                          className="group/btn inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] text-sm sm:text-base font-black shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          aria-label="Play student presentation video"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#18152B] flex items-center justify-center">
                            <Play className="w-4 h-4 fill-[#DFFF00] text-[#DFFF00] ml-0.5 group-hover/btn:scale-110 transition-transform" />
                          </div>
                          <span>Play Student Presentation</span>
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-10 text-white text-xs flex items-center justify-between">
                        <span className="font-bold drop-shadow-sm">
                          Friday Demo Day Showcase • Austin Studio
                        </span>
                        <span className="text-[#DFFF00] font-extrabold bg-black/60 px-2.5 py-0.5 rounded-full border border-white/20">
                          Live Presentation
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      <video
                        src={project.presentationVideoUrl}
                        poster={project.thumbnail}
                        autoPlay
                        controls
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPlayingPresentationVideo(false)}
                        className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18123B]/90 hover:bg-[#18123B] text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-md cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-[#DFFF00]" />
                        <span>Back to Cover</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Context & Details (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35309B] uppercase tracking-wider mb-2">
                    <Video className="w-3.5 h-3.5 text-[#35309B]" />
                    <span>Demo Day Tradition</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#18152B] tracking-tight mb-3">
                    Watch the Student Demo Their Project
                  </h3>

                  <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed mb-5 font-medium">
                    At the conclusion of each Kreators Lab sprint, students stand before their peers and families to explain how their code works, answer live audience questions, and celebrate what they built.
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-[#18152B]">
                      <CheckCircle2 className="w-4 h-4 text-[#35309B] shrink-0" />
                      <span>Explains independent design &amp; logic choices</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-[#18152B]">
                      <CheckCircle2 className="w-4 h-4 text-[#35309B] shrink-0" />
                      <span>Demonstrates debugging resilience under real questions</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-[#18152B]">
                      <CheckCircle2 className="w-4 h-4 text-[#35309B] shrink-0" />
                      <span>Builds genuine public speaking confidence</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPlayingPresentationVideo(true)}
                    className="inline-flex items-center justify-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#DFFF00] text-[#DFFF00]" />
                    <span>Watch Presentation Video</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ========================================================= */}
          {/* 7. FINAL OUTCOME AND KEY HIGHLIGHTS                       */}
          {/* ========================================================= */}
          {project.outcomes && project.outcomes.length > 0 && (
            <section className="mb-14 sm:mb-20">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5 text-[#35309B]" />
                  <span>Project Deliverables</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#18152B] tracking-tight">
                  Final Outcome &amp; Key Highlights
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#65617A]">
                  Verified milestones and tangible results achieved by the student in this cohort.
                </p>
              </div>

              {/* 4 Outcome Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {project.outcomes.map((out, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E6F1] shadow-xs text-center flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#65617A] uppercase tracking-wider mb-1">
                        {out.title}
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-[#35309B] my-2">
                        {out.value}
                      </p>
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#55506E] font-medium leading-relaxed">
                      {out.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ========================================================= */}
          {/* 8. WHAT THE PARENTS SAY (Parent Testimonials)              */}
          {/* ========================================================= */}
          {/* Gracefully hidden if no parent review is provided */}
          {project.parentReview && (
            <section className="mb-14 sm:mb-20 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#EEECFF] to-[#FAF9FE] border-2 border-[#35309B]/15 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35309B] uppercase tracking-wider">
                      <MessageSquareQuote className="w-4 h-4 text-[#35309B]" />
                      <span>What Parents Observed</span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-base sm:text-lg md:text-xl font-bold text-[#18152B] leading-relaxed italic">
                    &ldquo;{project.parentReview.quote}&rdquo;
                  </blockquote>

                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="text-sm font-black text-[#35309B]">
                      {project.parentReview.parentName}
                    </span>
                    <span className="text-xs text-[#65617A]">•</span>
                    <span className="text-xs font-semibold text-[#65617A]">
                      {project.parentReview.location}
                    </span>
                    <span className="text-xs text-[#65617A]">•</span>
                    <span className="text-[11px] font-bold text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded-full">
                      Verified Family
                    </span>
                  </div>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsInquiryOpen(true)}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    <span>Inquire for {project.grade}</span>
                    <ArrowRight className="w-4 h-4 text-[#DFFF00]" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ========================================================= */}
          {/* 9. TRUST GUARANTEES BANNER                                */}
          {/* ========================================================= */}
          <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#35309B] to-[#252080] text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center gap-3.5 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#DFFF00]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">1:8 Mentor Ratio</h4>
                  <p className="text-xs text-white/80">Every student gets personalized hands-on guidance</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#DFFF00]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Safe AI Guardrails</h4>
                  <p className="text-xs text-white/80">Curated, child-safe AI environments with zero ads</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#DFFF00]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Austin &amp; Lake Travis</h4>
                  <p className="text-xs text-white/80">Local in-person studios &amp; holiday camps</p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 10. EXPLORE MORE CASE STUDIES GALLERY                     */}
          {/* ========================================================= */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#18152B] tracking-tight">
                  Explore More Student Case Studies
                </h3>
                <p className="text-xs sm:text-sm text-[#65617A]">
                  Discover what other students in our Austin cohorts built and coded
                </p>
              </div>

              <Link
                href="/projects"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#35309B] hover:underline"
              >
                <span>View Full Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#35309B]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <ProjectCard key={rel.id} project={rel} />
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* ========================================================= */}
      {/* 11. FULLSCREEN LIGHTBOX MODAL                             */}
      {/* ========================================================= */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={handleCloseLightbox}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <span className="text-[#DFFF00] font-black">{project.name}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/80">
                Image {lightboxIndex + 1} of {screenshots.length}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCloseLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Center Image Container with Left / Right Arrows */}
          <div
            className="relative w-full max-w-5xl flex-1 flex items-center justify-center py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={handlePrevLightbox}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#35309B] text-white flex items-center justify-center border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
              <Image
                src={screenshots[lightboxIndex]}
                alt={`${project.name} lightbox image ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>

            {screenshots.length > 1 && (
              <button
                type="button"
                onClick={handleNextLightbox}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-[#35309B] text-white flex items-center justify-center border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Image Caption */}
          <div
            className="w-full max-w-3xl text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-white/90 font-medium bg-black/50 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md inline-block">
              {galleryCaptions[lightboxIndex] ||
                `${project.name} — Screen ${lightboxIndex + 1} of ${screenshots.length}`}
            </p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. INQUIRY MODAL                                         */}
      {/* ========================================================= */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        prefilled={{
          grade: project.grade,
          program: `Project Interest: ${project.name} (${project.category})`,
        }}
      />
    </div>
  );
}