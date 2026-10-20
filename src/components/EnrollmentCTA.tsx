"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, Calendar } from "lucide-react";

interface EnrollmentCTAProps {
  onExplorePrograms?: () => void;
  onOpenInquiry?: () => void;
}

export function EnrollmentCTA({
  onExplorePrograms,
  onOpenInquiry,
}: EnrollmentCTAProps) {
  const highlights = [
    "Grades K–12 Welcome",
    "Small Mentor-to-Student Ratios",
    "No Prior Coding Experience Needed",
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#2E2882] via-[#35309B] to-[#1E1954] text-white relative overflow-hidden">
      {/* Ambient decorative blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#473DEA]/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#DFFF00]/10 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFFF00] text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Currently Enrolling • Austin &amp; Lake Travis</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
          Ready to See What Your Child Can Create?
        </h2>

        {/* Supporting text */}
        <p className="text-base sm:text-lg text-[#EEECFF]/95 max-w-2xl mx-auto leading-relaxed">
          From after-school enrichment to school break camps, give your child the space to think, question, and turn their imagination into real projects.
        </p>

        {/* Value pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-white border border-white/15"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#DFFF00]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#programs"
            onClick={onExplorePrograms}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] text-base font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00]/50 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#18152B]" />
            <span>Explore Programs &amp; Schedules</span>
            <ArrowRight className="w-4 h-4 text-[#18152B]" />
          </a>

          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-base font-semibold px-7 py-4 rounded-full border border-white/25 hover:border-white/40 backdrop-blur-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>Ask Questions &amp; Inquire</span>
          </button>
        </div>
      </div>
    </section>
  );
}
