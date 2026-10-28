"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight, RotateCcw } from "lucide-react";
import { ProjectItem } from "@/data/siteContent";

interface ProjectCardProps {
  project: ProjectItem;
  projectNumber?: number;
  totalProjects?: number;
  onViewProject?: (project: ProjectItem) => void;
  staggerClass?: string;
}

// Category-specific pastel color palettes inspired by modern design references
const CATEGORY_STYLES: Record<
  string,
  {
    bgGradient: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    accentDot: string;
    glowColor: string;
  }
> = {
  Game: {
    bgGradient: "from-[#F6FCEB] via-[#EAF7D3] to-[#F1FCE4]",
    badgeBg: "bg-white/95",
    badgeText: "text-[#365011]",
    border: "border-[#D7EBB2]/70",
    accentDot: "bg-[#70B01D]",
    glowColor: "rgba(112, 176, 29, 0.12)",
  },
  Animation: {
    bgGradient: "from-[#FFF0F5] via-[#FFE4ED] to-[#FFF5FA]",
    badgeBg: "bg-white/95",
    badgeText: "text-[#91164C]",
    border: "border-[#FCD2E2]/70",
    accentDot: "bg-[#E0357F]",
    glowColor: "rgba(224, 53, 127, 0.12)",
  },
  Music: {
    bgGradient: "from-[#F3EFFE] via-[#E7DDFD] to-[#FAF8FF]",
    badgeBg: "bg-white/95",
    badgeText: "text-[#40209C]",
    border: "border-[#DED0FA]/70",
    accentDot: "bg-[#6D3DF2]",
    glowColor: "rgba(109, 61, 242, 0.12)",
  },
  "Mobile App": {
    bgGradient: "from-[#F0F8FF] via-[#E0F2FE] to-[#F5FAFF]",
    badgeBg: "bg-white/95",
    badgeText: "text-[#0A568C]",
    border: "border-[#CFE9FC]/70",
    accentDot: "bg-[#0284C7]",
    glowColor: "rgba(2, 132, 199, 0.12)",
  },
  Website: {
    bgGradient: "from-[#FFF8EB] via-[#FEF0D4] to-[#FFFBF5]",
    badgeBg: "bg-white/95",
    badgeText: "text-[#854E0A]",
    border: "border-[#FCE4BD]/70",
    accentDot: "bg-[#D97706]",
    glowColor: "rgba(217, 119, 6, 0.12)",
  },
};

export function ProjectCard({
  project,
  onViewProject,
  staggerClass = "",
}: ProjectCardProps) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const style = CATEGORY_STYLES[project.category] || {
    bgGradient: "from-[#FAF9FE] via-[#F1EEFB] to-[#FDFCFF]",
    badgeBg: "bg-white/95",
    badgeText: "text-[#35309B]",
    border: "border-[#E4E0F4]/70",
    accentDot: "bg-[#35309B]",
    glowColor: "rgba(53, 48, 155, 0.12)",
  };

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
      className={`group relative h-full flex flex-col justify-between rounded-[32px] sm:rounded-[36px] bg-gradient-to-br ${style.bgGradient} border ${style.border} p-5 sm:p-6 shadow-[0_10px_30px_rgba(53,48,155,0.05)] hover:shadow-[0_20px_45px_rgba(53,48,155,0.12)] transition-all duration-400 hover:-translate-y-2 overflow-hidden ${staggerClass}`}
      style={{
        boxShadow: `0 12px 35px -8px ${style.glowColor}`,
      }}
      aria-label={`${project.name} project case study card`}
    >
      {/* 1. TOP HEADER ROW: Category Pill Badge & Grade Indicator */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${style.badgeBg} ${style.badgeText} text-xs font-black shadow-xs border border-white/80 backdrop-blur-md`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${style.accentDot}`} />
          <span>{project.category}</span>
        </span>

        <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#18152B] text-xs font-bold border border-white/60 shadow-2xs">
          {project.grade}
        </span>
      </div>

      {/* 2. PROMINENT TYPOGRAPHY: Left-aligned bold title & short summary */}
      <div className="mb-4 z-10">
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl sm:text-2xl font-black text-[#18152B] tracking-tight leading-tight group-hover:text-[#35309B] transition-colors line-clamp-1 mb-1.5 hover:underline">
            {project.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-[#4E4870] font-medium line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
      </div>

      {/* 3. CENTER HERO IMAGE / INTERACTIVE MEDIA FRAME */}
      <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#18123B] shadow-md border-2 border-white/90 mb-5 group/media">
        {!isPlayingVideo ? (
          <div className="relative w-full h-full">
            <Image
              src={project.thumbnail}
              alt={`${project.name} preview`}
              fill
              className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

            {/* Optional Play Video Pill */}
            {project.videoUrl && (
              <div className="absolute bottom-2.5 right-2.5 z-10">
                <button
                  type="button"
                  onClick={handleStartVideo}
                  aria-label={`Watch video demo for ${project.name}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-[#35309B] text-white text-[11px] font-bold backdrop-blur-md border border-white/25 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-2.5 h-2.5 fill-[#DFFF00] text-[#DFFF00] ml-0.5" />
                  <span>Demo</span>
                </button>
              </div>
            )}
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
                aria-label="Back to clear project thumbnail"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black text-white text-[10px] font-semibold backdrop-blur-md border border-white/20 shadow-md cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#DFFF00]" />
                <span>Photo</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. SIGNATURE FLOATING FROSTED GLASS BOTTOM BAR */}
      <div className="bg-white/85 backdrop-blur-md rounded-full p-2 pl-4 sm:pl-5 pr-2 flex items-center justify-between border border-white shadow-[0_8px_20px_rgba(0,0,0,0.06)] z-10">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-[10px] font-bold text-[#65617A] uppercase tracking-wider truncate">
            {project.tags[0] || "Student Build"}
          </span>
          <span className="text-xs sm:text-sm font-black text-[#18152B] truncate">
            {project.grade} • Austin Studio
          </span>
        </div>

        <Link
          href={`/projects/${project.id}`}
          onClick={() => onViewProject?.(project)}
          className="w-10 h-10 rounded-full bg-[#18152B] hover:bg-[#35309B] text-white flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md group/btn cursor-pointer"
          aria-label={`View case study for ${project.name}`}
        >
          <ArrowRight className="w-4 h-4 text-[#DFFF00] group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}