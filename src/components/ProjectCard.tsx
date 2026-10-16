"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, ArrowRight, Quote, CheckCircle2, RotateCcw } from "lucide-react";
import { ProjectItem } from "@/data/siteContent";

interface ProjectCardProps {
  project: ProjectItem;
  projectNumber?: number;
  totalProjects?: number;
  onViewProject?: (project: ProjectItem) => void;
}

export function ProjectCard({
  project,
  projectNumber = 1,
  totalProjects = 4,
  onViewProject,
}: ProjectCardProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartVideo = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlayingVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  const handleResetToThumbnail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlayingVideo(false);
  };

  return (
    <article
      className="group relative w-full rounded-3xl bg-white border-2 border-[#35309B]/35 hover:border-[#35309B]/65 shadow-[0_25px_60px_-12px_rgba(53,48,155,0.22),0_10px_30px_rgba(24,21,43,0.08)] ring-1 ring-[#35309B]/20 overflow-hidden transition-all duration-300"
      aria-label={`${project.name} project showcase card`}
    >
      {/* Bold gradient accent line at top so the card has a clear boundary */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#35309B] via-[#473DEA] to-[#35309B] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10 items-center">
        {/* Left Column (col-span-7): Video-Based Project Media Frame */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#18152B] border-2 border-[#35309B]/20 shadow-lg group/media">
            {!isPlayingVideo ? (
              /* State A: Clear High-Resolution Picture Thumbnail with Apple-style "Watch Demo" button */
              <div className="relative w-full h-full">
                <Image
                  src={project.thumbnail}
                  alt={`${project.name} (${project.grade}) project picture`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={projectNumber === 1}
                />

                {/* Top Badge: Grade Level */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18152B]/85 backdrop-blur-md border border-white/20 text-[#DFFF00] text-xs font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
                  <span>{project.grade}</span>
                </div>

                {/* Floating "Watch Demo" Pill Button on the Picture */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    type="button"
                    onClick={handleStartVideo}
                    aria-label={`Watch video demo for ${project.name}`}
                    className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-[#18152B]/90 hover:bg-[#35309B] text-white text-xs sm:text-sm font-bold backdrop-blur-md border border-white/30 shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#DFFF00] text-[#18152B] flex items-center justify-center shadow-xs">
                      <Play className="w-3.5 h-3.5 fill-[#18152B] ml-0.5" />
                    </div>
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>
            ) : (
              /* State B: In-Place Video Player with Full Student Walkthrough */
              <div className="relative w-full h-full bg-black">
                <video
                  ref={videoRef}
                  src={project.videoUrl || "/videos/kreators-lab-studio-loop.mp4"}
                  poster={project.thumbnail}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Reset to clear picture thumbnail */}
                <div className="absolute top-3 right-3 z-20">
                  <button
                    type="button"
                    onClick={handleResetToThumbnail}
                    aria-label="Back to clear picture thumbnail"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18152B]/85 hover:bg-[#18152B] text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-md transition-colors"
                  >
                    <RotateCcw className="w-3 h-3 text-[#DFFF00]" />
                    <span>Back to Picture</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (col-span-5): Project Narrative & Metadata */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Top Info Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#35309B] bg-[#EEECFF] px-3 py-1 rounded-full">
                {project.category}
              </span>
              <span className="text-xs font-bold tracking-widest text-[#65617A]">
                PROJECT {String(projectNumber).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18152B] tracking-tight leading-snug">
              {project.name}
            </h3>

            {/* Student Voice Quote Callout */}
            {project.studentQuote && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#F5F4FF] border border-[#E8E6F1] relative">
                <div className="flex items-start gap-2.5">
                  <Quote className="w-4 h-4 text-[#35309B] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm italic font-medium text-[#18152B]/90 leading-relaxed">
                    &ldquo;{project.studentQuote}&rdquo;
                  </p>
                </div>
                <div className="mt-1.5 pl-6 text-[11px] font-bold text-[#35309B]">
                  — Student Creator ({project.grade})
                </div>
              </div>
            )}

            <p className="text-sm sm:text-base text-[#65617A] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Learning Skills Built */}
          <div className="pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#18152B]/75 mb-2.5">
              Skills Built:
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white border border-[#E8E6F1] text-[#18152B] shadow-2xs"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#35309B]" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#E8E6F1] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleStartVideo}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#35309B] hover:text-[#473DEA] transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-[#35309B] text-white flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
              </div>
              <span>{isPlayingVideo ? "Video Playing" : "Watch Demo"}</span>
            </button>

            <button
              type="button"
              onClick={() => onViewProject?.(project)}
              className="inline-flex items-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B]"
            >
              <span>Project Details</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00]" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
