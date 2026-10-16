"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteContent";

interface FinalCTAProps {
  onExplorePrograms?: () => void;
  onSeeProjects?: () => void;
}

export function FinalCTA({ onExplorePrograms, onSeeProjects }: FinalCTAProps) {
  return (
    <section className="py-20 md:py-28 bg-hero-gradient text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7">
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFFF00] text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xs">
          <Sparkles className="w-4 h-4 text-[#DFFF00]" />
          <span>{SITE_CONFIG.tagline}</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
          The Next Big Idea Could Be{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#EEECFF] to-[#DFFF00]">
            Your Child&apos;s.
          </span>
        </h2>

        {/* Copy */}
        <div className="text-base sm:text-lg lg:text-xl text-[#EEECFF]/95 leading-relaxed max-w-2xl mx-auto space-y-2">
          <p>
            A simple sketch. A creative question. A game they can&apos;t stop thinking about.
          </p>
          <p>Every creation starts somewhere.</p>
          <p className="font-medium text-white">
            Give your child the opportunity to explore what&apos;s possible when imagination meets technology.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#programs"
            onClick={onExplorePrograms}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] text-base font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00]/50"
          >
            <span>Explore Programs</span>
            <ArrowRight className="w-5 h-5 text-[#18152B]" />
          </a>

          <a
            href="#projects"
            onClick={onSeeProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-base font-semibold px-7 py-4 rounded-full border border-white/30 backdrop-blur-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>See Student Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
}
