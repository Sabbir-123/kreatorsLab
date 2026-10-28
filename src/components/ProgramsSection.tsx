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
      className="scroll-mt-20 sm:scroll-mt-24 py-10 sm:py-14 md:py-16 bg-[#FAF9FE] relative overflow-hidden"
    >
      {/* Decorative Background Accents */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-[#473DEA]/6 blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 rounded-full bg-[#DFFF00]/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Heading & Subheading */}
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-8 sm:mb-10 reveal-fade-up ${
            headerVisible ? "is-visible" : ""
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-2.5 border border-[#35309B]/15 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Programs &amp; Formats</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18152B] tracking-tight leading-tight">
            Programs
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#65617A] max-w-xl mx-auto leading-relaxed">
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
            className="group relative rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#F4F0FE] via-[#E8DDFD] to-[#FAF8FF] border border-[#DFD2FA] p-6 sm:p-7 shadow-[0_10px_35px_rgba(84,56,220,0.08)] hover:shadow-[0_20px_50px_rgba(84,56,220,0.18)] transition-all duration-400 overflow-hidden flex flex-col justify-between hover:-translate-y-2"
            aria-label="Explore After-School Enrichment Programs"
          >
            <div>
              {/* Top Row Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#40209C] text-xs font-black shadow-xs border border-white/80 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6D3DF2]" />
                  <span>12-Week Enrichment</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-[#18152B] text-[#DFFF00] text-xs font-black shadow-2xs">
                  Now Enrolling
                </span>
              </div>

              {/* Title & Description */}
              <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl font-black text-[#151226] tracking-tight leading-snug group-hover:text-[#473DEA] transition-colors mb-2">
                  After-School Enrichment
                </h3>

                <p className="text-xs sm:text-sm text-[#4E4870] font-medium leading-relaxed mb-4">
                  Weekly hands-on cohorts where students master creative technology, design playable games, and build original AI projects guided step-by-step by passionate mentors.
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2 text-xs font-semibold text-[#18152B]">
                    <CheckCircle2 className="w-4 h-4 text-[#5438DC] shrink-0 mt-0.5" />
                    <span>Weekly 60–90 min mentor-guided studio sessions</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-[#18152B]">
                    <CheckCircle2 className="w-4 h-4 text-[#5438DC] shrink-0 mt-0.5" />
                    <span>Proven 5-stage framework: Ideate, code, test &amp; present</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-[#18152B]">
                    <CheckCircle2 className="w-4 h-4 text-[#5438DC] shrink-0 mt-0.5" />
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
                    <Clock className="w-3 h-3 text-[#DFFF00]" />
                    <span>Fall &amp; Spring • 12 Classes</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Floating Frosted Glass Bottom Bar (No Price) */}
            <div className="bg-white/90 backdrop-blur-md rounded-full p-2 pl-5 pr-2 flex items-center justify-between border border-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] z-10">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-black text-[#18152B] tracking-tight">
                  Spring &amp; Fall Cohorts
                </span>
                <span className="text-[10px] font-bold text-[#65617A] uppercase tracking-wider leading-none">
                  Grades K–8 • Austin &amp; Virtual
                </span>
              </div>

              <div className="h-10 px-4 rounded-full bg-[#18152B] group-hover:bg-[#35309B] text-white font-black text-xs inline-flex items-center gap-1.5 shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <span>Explore Enrichment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00]" />
              </div>
            </div>
          </Link>

          {/* Card 2: Holiday & Summer Camps */}
          <Link
            href="/programs?type=camps"
            className="group relative rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#F0F8FF] via-[#E1F3FE] to-[#F5FAFF] border border-[#CFE9FC] p-6 sm:p-7 shadow-[0_10px_35px_rgba(2,132,199,0.08)] hover:shadow-[0_20px_50px_rgba(2,132,199,0.18)] transition-all duration-400 overflow-hidden flex flex-col justify-between hover:-translate-y-2"
            aria-label="Explore Holiday and Summer Camp Sprints"
          >
            <div>
              {/* Top Row Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#0A568C] text-xs font-black shadow-xs border border-white/80 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>School Break Camps</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-[#18152B] text-[#DFFF00] text-xs font-black shadow-2xs">
                  Limited Spots
                </span>
              </div>

              {/* Title & Description */}
              <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl font-black text-[#151226] tracking-tight leading-snug group-hover:text-[#473DEA] transition-colors mb-2">
                  Holiday &amp; Summer Camps
                </h3>

                <p className="text-xs sm:text-sm text-[#4E4870] font-medium leading-relaxed mb-4">
                  Immersive break experiences turning school vacations into creative adventures where kids collaborate, code custom video games, and build working robotics.
                </p>

                {/* Feature Highlights */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2 text-xs font-semibold text-[#18152B]">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Flexible full-day &amp; half-day cohorts (9 AM – 3 PM)</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-[#18152B]">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                    <span>Fast-paced creation: From paper sketch to playable game</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-[#18152B]">
                    <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
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
                    <SunMedium className="w-3 h-3 text-[#DFFF00]" />
                    <span>Thanksgiving • Winter • Spring • Summer</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Signature Floating Frosted Glass Bottom Bar (No Price) */}
            <div className="bg-white/90 backdrop-blur-md rounded-full p-2 pl-5 pr-2 flex items-center justify-between border border-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] z-10">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-black text-[#18152B] tracking-tight">
                  Holiday &amp; Summer Sprints
                </span>
                <span className="text-[10px] font-bold text-[#65617A] uppercase tracking-wider leading-none">
                  Full-Day &amp; Half-Day Options
                </span>
              </div>

              <div className="h-10 px-4 rounded-full bg-[#18152B] group-hover:bg-[#35309B] text-white font-black text-xs inline-flex items-center gap-1.5 shadow-md group-hover:scale-105 active:scale-95 transition-all">
                <span>Explore Camps</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00]" />
              </div>
            </div>
          </Link>
        </div>

        {/* Catalog Redirect Callout */}
        <div className="mt-8 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#35309B]/20 text-[#35309B] hover:text-[#473DEA] hover:border-[#35309B]/50 hover:bg-[#EEECFF]/40 text-xs sm:text-sm font-extrabold shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Explore All Programs</span>
            <ArrowRight className="w-4 h-4 text-[#35309B]" />
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
