"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  SunMedium,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { SectionProgramItem, ProgramItem } from "@/data/siteContent";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProgramsSectionProps {
  onSelectProgram?: (program: SectionProgramItem | ProgramItem) => void;
  onViewAll?: () => void;
}

export function ProgramsSection({
  onSelectProgram,
  onViewAll,
}: ProgramsSectionProps) {
  void onSelectProgram;
  void onViewAll;

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  return (
    <section
      id="programs"
      className="scroll-mt-28 sm:scroll-mt-32 pt-14 sm:pt-18 md:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-white via-sky-50/25 to-white relative overflow-hidden"
    >
      {/* Decorative Background Accents */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Heading & Subheading */}
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-7 sm:mb-10 reveal-fade-up ${
            headerVisible ? "is-visible" : ""
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-sky-50 text-sky-700 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 border border-sky-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Programs &amp; Formats</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Programs
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed px-2">
            Hands-on AI &amp; creative technology cohorts in Austin &amp; Lake Travis. Every child has their own kind of genius — choose a format to explore:
          </p>
        </div>

        {/* Full Two-Card System with Proper Images, Titles, Subtitles & Direct Links */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto reveal-fade-up ${
            cardsVisible ? "is-visible" : ""
          }`}
        >
          {/* Card 1: After-School Enrichment */}
          <Link
            href="/programs?type=after-school"
            className="group relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-white via-sky-50/60 to-sky-100/40 border border-sky-200/80 p-4.5 xs:p-5 sm:p-7 shadow-[0_10px_35px_rgba(14,165,233,0.08)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.18)] transition-all duration-400 overflow-hidden flex flex-col justify-between hover:-translate-y-2"
            aria-label="Explore After-School Enrichment Programs"
          >
            <div>
              {/* Top Row Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 text-sky-800 text-[11px] sm:text-xs font-black shadow-xs border border-sky-100 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>12-Week Enrichment</span>
                </span>

                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#FF5E36] to-[#FFAE00] text-white text-[11px] sm:text-xs font-black shadow-sm">
                  Now Enrolling
                </span>
              </div>

              {/* Title & Highlights */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors mb-3">
                  After-School Enrichment
                </h3>

                {/* Feature Highlights */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Weekly 60–90 min mentor-guided studio sessions</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Proven 5-stage framework: Ideate, code, test &amp; present</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Austin &amp; Lake Travis studios plus live virtual cohorts</span>
                  </div>
                </div>
              </div>

              {/* Integrated Center Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md border-2 border-white/90 mb-5 group/img">
                <Image
                  src="/images/programs/fall-enrichment.jpg"
                  alt="After-School Enrichment hands-on AI cohort"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>Fall &amp; Spring • 12 Classes</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Floating Frosted Glass Bottom Bar (No Price) */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-2 pl-3.5 sm:pl-5 pr-2 flex items-center justify-between gap-2 border border-sky-100 shadow-[0_8px_24px_rgba(14,165,233,0.08)] z-10">
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-xs sm:text-base font-black text-slate-900 tracking-tight truncate">
                  Spring &amp; Fall Cohorts
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none truncate">
                  Grades K–8 • Austin &amp; Virtual
                </span>
              </div>

              <div className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] text-white font-black text-[11px] sm:text-xs inline-flex items-center gap-1.5 shadow-md shadow-orange-500/20 group-hover:scale-105 active:scale-95 transition-all shrink-0">
                <span>Explore Enrichment</span>
                <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
              </div>
            </div>
          </Link>

          {/* Card 2: Holiday & Summer Camps */}
          <Link
            href="/programs?type=camps"
            className="group relative rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-white via-sky-50/50 to-orange-50/30 border border-sky-200/80 p-4.5 xs:p-5 sm:p-7 shadow-[0_10px_35px_rgba(14,165,233,0.08)] hover:shadow-[0_20px_50px_rgba(255,107,0,0.15)] transition-all duration-400 overflow-hidden flex flex-col justify-between hover:-translate-y-2"
            aria-label="Explore Holiday and Summer Camp Sprints"
          >
            <div>
              {/* Top Row Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 text-sky-800 text-[11px] sm:text-xs font-black shadow-xs border border-sky-100 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>School Break Camps</span>
                </span>

                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-gradient-to-r from-[#FF5E36] to-[#FFAE00] text-white text-[11px] sm:text-xs font-black shadow-sm">
                  Limited Spots
                </span>
              </div>

              {/* Title & Highlights */}
              <div className="mb-4">
                <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors mb-3">
                  Holiday &amp; Summer Camps
                </h3>

                {/* Feature Highlights */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Flexible full-day &amp; half-day cohorts (9 AM – 3 PM)</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Fast-paced creation: From paper sketch to playable game</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>Friday Demo Day showcase with family presentations</span>
                  </div>
                </div>
              </div>

              {/* Integrated Center Image */}
              <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md border-2 border-white/90 mb-5 group/img">
                <Image
                  src="/images/programs/summer-camp.jpg"
                  alt="Holiday and Summer Camps creative tech sprint"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    <SunMedium className="w-3 h-3 text-orange-400" />
                    <span>Thanksgiving • Winter • Spring • Summer</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Floating Frosted Glass Bottom Bar (No Price) */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-2 pl-3.5 sm:pl-5 pr-2 flex items-center justify-between gap-2 border border-sky-100 shadow-[0_8px_24px_rgba(14,165,233,0.08)] z-10">
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-xs sm:text-base font-black text-slate-900 tracking-tight truncate">
                  Holiday &amp; Summer Sprints
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none truncate">
                  Full-Day &amp; Half-Day Options
                </span>
              </div>

              <div className="h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] text-white font-black text-[11px] sm:text-xs inline-flex items-center gap-1.5 shadow-md shadow-orange-500/20 group-hover:scale-105 active:scale-95 transition-all shrink-0">
                <span>Explore Camps</span>
                <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
              </div>
            </div>
          </Link>
        </div>

        {/* Catalog Redirect Callout */}
        <div className="mt-8 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-sky-200 text-sky-700 hover:text-white hover:bg-gradient-to-r hover:from-[#FF5E36] hover:to-[#FFAE00] hover:border-transparent text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Explore All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Organic Curved Wave Section Transition */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-white"
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C360,64 720,16 1080,48 C1240,60 1360,40 1440,32 L1440,64 L0,64 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
