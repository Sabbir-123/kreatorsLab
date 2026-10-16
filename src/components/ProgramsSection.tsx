"use client";

import React, { useState } from "react";
import Image from "next/image";
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

        {/* Centered Segmented Options Switcher (Picture 2) */}
        <div className="flex justify-center mb-12 sm:mb-14">
          <div className="inline-flex p-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#EAE6F5] shadow-[0_4px_24px_rgba(53,48,155,0.06)]">
            <button
              type="button"
              onClick={() => setSelectedCategory("after-school")}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === "after-school"
                  ? "bg-[#DED7FD] text-[#35309B] shadow-xs"
                  : "text-[#696387] hover:text-[#18152B] bg-transparent"
              }`}
            >
              After School Enrichment
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("day-camps")}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === "day-camps"
                  ? "bg-[#DED7FD] text-[#35309B] shadow-xs"
                  : "text-[#696387] hover:text-[#18152B] bg-transparent"
              }`}
            >
              Holiday &amp; Summer Camps
            </button>
          </div>
        </div>

        {/* Category Header with Icon (Picture 2) */}
        <div className="flex items-center gap-3 mb-8">
          {selectedCategory === "after-school" ? (
            <>
              <span className="text-2xl sm:text-3xl" role="img" aria-label="party">
                🎉
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#151226] tracking-tight">
                After School Enrichment (12 Week)
              </h3>
            </>
          ) : (
            <>
              <span className="text-2xl sm:text-3xl" role="img" aria-label="camp">
                🏕️
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#151226] tracking-tight">
                Holiday &amp; Summer Day-Camps
              </h3>
            </>
          )}
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
                {/* Photo / Visual Frame */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 mb-5 border border-[#F0EEF8]">
                  <Image
                    src={program.image}
                    alt={`${program.title} interactive session`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-104"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Date Pill with Calendar Icon */}
                <div className="inline-flex items-center gap-2 bg-[#F3EFFC] text-[#5B46B5] text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-3.5">
                  <Calendar className="w-3.5 h-3.5 text-[#5B46B5]" />
                  <span>•</span>
                  <span>{program.dateRange}</span>
                </div>

                {/* Title */}
                <h4 className="text-xl sm:text-[22px] font-black text-[#151226] tracking-tight leading-snug mb-4 group-hover:text-[#5438DC] transition-colors min-h-[58px] flex items-center">
                  {program.title}
                </h4>

                {/* 4 Metadata Badges (Equal Look-alike) */}
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

              {/* Bottom Section: Dual Pricing Boxes + Action CTA (Picture 3) */}
              <div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {/* Regular Price Box */}
                  <div className="bg-[#F8F7FD] rounded-2xl p-3 text-center border border-[#EFEBF8] flex flex-col justify-center">
                    <div className="text-2xl sm:text-[26px] font-black text-[#18152B] tracking-tight">
                      {program.regularPrice}
                    </div>
                    <div className="text-[11px] font-medium text-[#736E8F] mt-0.5 leading-tight">
                      Regular-Time Tuition fee
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
                      Limited-Time Tuition fee
                    </div>
                  </div>
                </div>

                {/* Primary CTA Button (Full Width, diagonal arrow) */}
                <button
                  type="button"
                  onClick={() => onSelectProgram?.(program)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#5438DC] hover:bg-[#4329C7] active:bg-[#3820B3] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(84,56,220,0.35)] hover:shadow-[0_6px_20px_rgba(84,56,220,0.45)] transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <span>{program.ctaText}</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </button>
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
