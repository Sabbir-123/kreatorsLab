"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  AFTER_SCHOOL_PROGRAMS,
  DAY_CAMPS,
  SectionProgramItem,
  ProgramItem,
} from "@/data/siteContent";

interface ProgramsSectionProps {
  onSelectProgram?: (program: SectionProgramItem | ProgramItem) => void;
  onViewAll?: () => void;
}

export function ProgramsSection({
  onSelectProgram,
  onViewAll,
}: ProgramsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"after-school" | "day-camps">("after-school");

  const currentPrograms =
    selectedCategory === "after-school" ? AFTER_SCHOOL_PROGRAMS : DAY_CAMPS;

  return (
    <section id="programs" className="py-20 md:py-28 bg-[#FAF9FE] border-b border-[#E8E6F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find Your Creative Adventure</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Every Child Has Their Own Kind of Genius.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#65617A] leading-relaxed">
            Some kids love games. Others are full of stories, questions, inventions, or ideas that are difficult to put into words.
            At Kreators Lab, different interests can become starting points for creative exploration.
          </p>
        </div>

        {/* Prominent High-Visibility Program Category Switcher */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="w-full max-w-2xl p-2 rounded-2xl sm:rounded-3xl bg-[#F0EEFB] border-2 border-[#35309B]/25 shadow-[0_8px_30px_rgba(53,48,155,0.08)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("after-school")}
                className={`flex flex-col items-center justify-center py-3.5 sm:py-4 px-5 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer text-center ${
                  selectedCategory === "after-school"
                    ? "bg-[#35309B] text-white shadow-md ring-2 ring-[#35309B]/30 scale-[1.01]"
                    : "bg-white/80 hover:bg-white text-[#18152B] hover:text-[#35309B] border border-transparent hover:border-[#35309B]/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      selectedCategory === "after-school"
                        ? "bg-[#DFFF00] text-[#18152B]"
                        : "bg-[#EAE6F8] text-[#55506E]"
                    }`}
                  >
                    Weekly Cohorts
                  </span>
                </div>
                <span className="text-base sm:text-lg font-black tracking-tight">
                  After-School Enrichment
                </span>
                <span
                  className={`text-xs mt-0.5 ${
                    selectedCategory === "after-school"
                      ? "text-[#EEECFF]"
                      : "text-[#65617A]"
                  }`}
                >
                  12-Week Sessions • Fall &amp; Spring
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory("day-camps")}
                className={`flex flex-col items-center justify-center py-3.5 sm:py-4 px-5 rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer text-center ${
                  selectedCategory === "day-camps"
                    ? "bg-[#35309B] text-white shadow-md ring-2 ring-[#35309B]/30 scale-[1.01]"
                    : "bg-white/80 hover:bg-white text-[#18152B] hover:text-[#35309B] border border-transparent hover:border-[#35309B]/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      selectedCategory === "day-camps"
                        ? "bg-[#DFFF00] text-[#18152B]"
                        : "bg-[#EAE6F8] text-[#55506E]"
                    }`}
                  >
                    School Breaks
                  </span>
                </div>
                <span className="text-base sm:text-lg font-black tracking-tight">
                  Holiday &amp; Summer Camps
                </span>
                <span
                  className={`text-xs mt-0.5 ${
                    selectedCategory === "day-camps"
                      ? "text-[#EEECFF]"
                      : "text-[#65617A]"
                  }`}
                >
                  Thanksgiving, Winter &amp; Summer Sprints
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Clear Active Category Header & Subtext */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E6F1] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label="category indicator">
              {selectedCategory === "after-school" ? "🎉" : "🏕️"}
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#18152B] tracking-tight">
                {selectedCategory === "after-school"
                  ? "After-School Enrichment (12-Week Programs)"
                  : "Holiday & Summer Camps (Multi-Day Immersive Sprints)"}
              </h3>
              <p className="text-xs sm:text-sm text-[#65617A] mt-0.5">
                {selectedCategory === "after-school"
                  ? "Weekly structured mentorship guiding students through design, logic, and creative AI mastery."
                  : "Full-day school break maker camps from blank paper brainstorm to the Friday showcase."}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full bg-[#F3EFFC] text-[#35309B] self-start sm:self-center">
            {currentPrograms.length} Sessions Available
          </div>
        </div>

        {/* Unified Equal Glassmorphism Cards Grid (Picture 2 & 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {currentPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white/95 backdrop-blur-md rounded-[28px] border border-[#EBE8F5] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(84,56,220,0.12)] hover:border-[#D0C5FA] transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group"
            >
              {/* Top Section */}
              <div>
                {/* Photo / Visual Frame with Link to Curriculum */}
                <Link
                  href={`/programs/${program.id}`}
                  className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 mb-5 border border-[#F0EEF8] group/img"
                  aria-label={`View curriculum and details for ${program.title}`}
                >
                  <Image
                    src={program.image}
                    alt={`${program.title} interactive session`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-104"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#35309B] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1 shadow-md">
                    <span>Explore Curriculum</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

                {/* Date Pill with Calendar Icon */}
                <div className="inline-flex items-center gap-2 bg-[#F3EFFC] text-[#5B46B5] text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-3.5">
                  <Calendar className="w-3.5 h-3.5 text-[#5B46B5]" />
                  <span>•</span>
                  <span>{program.dateRange}</span>
                </div>

                {/* Title Linking to Detail Page */}
                <Link href={`/programs/${program.id}`} className="block">
                  <h4 className="text-xl sm:text-[22px] font-black text-[#151226] tracking-tight leading-snug mb-4 group-hover:text-[#5438DC] transition-colors min-h-[58px] flex items-center">
                    {program.title}
                  </h4>
                </Link>

                {/* 4 Metadata Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-[#F5F3FB] text-[#4E4870] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#EDE8F7]">
                    {program.scheduleDays}
                  </span>
                  <span className="bg-[#F5F3FB] text-[#4E4870] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#EDE8F7]">
                    {program.scheduleTime}
                  </span>
                  <span className="bg-[#F5F3FB] text-[#4E4870] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#EDE8F7]">
                    {program.classCount}
                  </span>
                  <span className="bg-[#F5F3FB] text-[#4E4870] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#EDE8F7]">
                    {program.grades}
                  </span>
                </div>
              </div>

              {/* Bottom Section: Dual Pricing Boxes + Actions */}
              <div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {/* Regular Price Box */}
                  <div className="bg-[#F8F7FD] rounded-2xl p-3 text-center border border-[#EFEBF8] flex flex-col justify-center">
                    <div className="text-2xl sm:text-[26px] font-black text-[#18152B] tracking-tight">
                      {program.regularPrice}
                    </div>
                    <div className="text-[11px] font-medium text-[#736E8F] mt-0.5 leading-tight">
                      Regular Tuition
                    </div>
                  </div>

                  {/* Limited-Time Price Box with "Save $X" Badge */}
                  <div className="bg-white rounded-2xl p-3 text-center border-2 border-[#D8CEFA] relative flex flex-col justify-center shadow-xs">
                    <div className="absolute -top-2.5 -right-2 bg-[#7C3AED] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs tracking-tight">
                      {program.savingsBadge}
                    </div>
                    <div className="text-2xl sm:text-[26px] font-black text-[#18152B] tracking-tight">
                      {program.promoPrice}
                    </div>
                    <div className="text-[11px] font-medium text-[#736E8F] mt-0.5 leading-tight">
                      Limited-Time Tuition
                    </div>
                  </div>
                </div>

                {/* Dual Action Buttons: View Curriculum & Details + Direct Enroll Now */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/programs/${program.id}`}
                    className="py-3.5 px-3 rounded-2xl bg-[#F0EEFB] hover:bg-[#E4DCFC] text-[#35309B] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all text-center border border-[#DED7FD]"
                  >
                    <span>Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#35309B]" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onSelectProgram?.(program)}
                    className="py-3.5 px-4 rounded-2xl bg-[#5438DC] hover:bg-[#4329C7] active:bg-[#3820B3] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(84,56,220,0.3)] hover:shadow-[0_6px_20px_rgba(84,56,220,0.4)] transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                  >
                    <span>{program.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Helper */}
        <div className="mt-14 pt-8 border-t border-dashed border-[#E5E1F2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-bold text-[#18152B]">
              Need a personalized schedule or private cohort for your group?
            </p>
            <p className="text-xs text-[#65617A] mt-0.5">
              We offer tailored sessions for homeschool groups and friend cohorts in West Austin.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#F3EFFC] text-[#35309B] text-sm font-bold px-6 py-3 rounded-full border border-[#DED7FD] shadow-xs transition-all hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B] cursor-pointer"
          >
            <span>Ask Questions &amp; Inquire</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
