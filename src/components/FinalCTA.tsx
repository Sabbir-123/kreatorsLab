"use client";

import React from "react";
import { ArrowRight, Sparkles, MapPin, Lightbulb } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteContent";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface FinalCTAProps {
  onExplorePrograms?: () => void;
  onSeeProjects?: () => void;
}

export function FinalCTA({ onExplorePrograms, onSeeProjects }: FinalCTAProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-hero-gradient text-white relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
      {/* Top Organic Wave (from #FFFFFF of the preceding section) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-8 sm:h-12 md:h-14"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C380,55 960,60 1440,10 L1440,0 L0,0 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
      </div>

      {/* Floating badges (desktop) */}
      <div
        className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-lg animate-float-gentle absolute left-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <MapPin className="w-3.5 h-3.5 text-amber-300" />
        <span>Austin &amp; Lake Travis Cohorts</span>
      </div>

      <div
        className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold shadow-lg animate-float-delayed absolute right-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
        <span>Think • Build • Create</span>
      </div>

      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-7 reveal-fade-up ${
          isVisible ? "is-visible" : ""
        }`}
      >
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{SITE_CONFIG.tagline}</span>
        </div>

        {/* Headline with Papumba-inspired text highlight */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14] text-white">
          The Next Big Idea Could Be{" "}
          <span className="highlight-brush text-amber-200">
            Your Child&apos;s.
          </span>
        </h2>

        {/* Copy */}
        <div className="text-base sm:text-lg lg:text-xl text-sky-50 leading-relaxed max-w-2xl mx-auto space-y-2">
          <p>
            A simple sketch. A creative question. A game they can&apos;t stop thinking about.
          </p>
          <p>Every creation starts somewhere.</p>
          <p className="font-semibold text-white">
            Give your child the opportunity to explore what&apos;s possible when imagination meets technology.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#program-finder"
            onClick={onExplorePrograms}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] hover:opacity-95 text-white text-base font-extrabold px-8 py-4 rounded-full shadow-xl shadow-sky-950/20 hover:shadow-2xl hover:scale-105 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 cursor-pointer"
          >
            <span>Match Your Child&apos;s Program</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </a>

          <a
            href="#projects"
            onClick={onSeeProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white text-base font-semibold px-7 py-4 rounded-full border border-white/30 backdrop-blur-xs transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            <span>See Student Projects</span>
          </a>
        </div>
      </div>

      {/* Bottom Organic Wave leading into dark Footer (#0B132B) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-6 sm:h-9 md:h-11"
          preserveAspectRatio="none"
        >
          <path
            d="M0,25 C420,0 1020,45 1440,15 L1440,45 L0,45 Z"
            fill="#0B132B"
          />
        </svg>
      </div>
    </section>
  );
}
