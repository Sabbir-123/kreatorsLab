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
      className="group relative h-full flex flex-col rounded-3xl bg-white border-2 border-[#35309B]/20 hover:border-[#35309B]/60 shadow-[0_10px_30px_rgba(53,48,155,0.08)] hover:shadow-[0_20px_45px_rgba(53,48,155,0.18)] ring-1 ring-[#35309B]/10 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      aria-label={`${project.name} project showcase card`}
    >
      {/* Top accent gradient line */}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#35309B] via-[#473DEA] to-[#DFFF00] pointer-events-none z-10" />

      {/* Media Frame (Thumbnail or Inline Video) */}
      <div className="relative aspect-[16/10] w-full bg-[#18152B] overflow-hidden">
        {!isPlayingVideo ? (
          <div className="relative w-full h-full">
            <Image
              src={project.thumbnail}
              alt={`${project.name} (${project.grade}) project picture`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18152B]/90 backdrop-blur-md border border-white/20 text-[#DFFF00] text-xs font-bold shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
                <span>{project.grade}</span>
              </span>

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#18152B] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                {project.category}
              </span>
            </div>

            {/* Floating "Watch Demo" Pill on Hover / Idle */}
            <div className="absolute bottom-3 right-3 z-10">
              <button
                type="button"
                onClick={handleStartVideo}
                aria-label={`Watch video demo for ${project.name}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#18152B]/90 hover:bg-[#35309B] text-white text-xs font-bold backdrop-blur-md border border-white/30 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#DFFF00] text-[#18152B] flex items-center justify-center shadow-xs">
                  <Play className="w-2.5 h-2.5 fill-[#18152B] ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        ) : (
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
            <div className="absolute top-2.5 right-2.5 z-20">
              <button
                type="button"
                onClick={handleResetToThumbnail}
                aria-label="Back to clear picture thumbnail"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18152B]/90 hover:bg-[#18152B] text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 shadow-md transition-colors"
              >
                <RotateCcw className="w-3 h-3 text-[#DFFF00]" />
                <span>Picture</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#65617A] tracking-wider uppercase">
            <span>Student Creation</span>
            <span>#{String(projectNumber).padStart(2, "0")} / #{String(totalProjects).padStart(2, "0")}</span>
          </div>

          <h3 className="text-xl font-extrabold text-[#18152B] group-hover:text-[#35309B] transition-colors leading-snug line-clamp-1">
            {project.name}
          </h3>

          <p className="text-xs sm:text-sm text-[#55506E] leading-relaxed line-clamp-3">
            {project.summary}
          </p>

          {/* Student Quote Callout */}
          {project.studentQuote && (
            <div className="p-3 rounded-xl bg-[#F5F4FF] border border-[#E8E6F1] flex items-start gap-2">
              <Quote className="w-3.5 h-3.5 text-[#35309B] shrink-0 mt-0.5" />
              <p className="text-xs italic font-medium text-[#18152B]/85 leading-relaxed line-clamp-2">
                &ldquo;{project.studentQuote}&rdquo;
              </p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF9FE] border border-[#E8E6F1] text-[#35309B]"
              >
                <CheckCircle2 className="w-3 h-3 text-[#35309B]" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-[#E8E6F1] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleStartVideo}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#35309B] hover:text-[#473DEA] transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-[#35309B]" />
            <span>{isPlayingVideo ? "Playing" : "Watch Demo"}</span>
          </button>

          <button
            type="button"
            onClick={() => onViewProject?.(project)}
            className="inline-flex items-center gap-1.5 bg-[#35309B] hover:bg-[#2A247A] text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B] cursor-pointer"
          >
            <span>Project Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00]" />
          </button>
        </div>
      </div>
    </article>
  );
}
