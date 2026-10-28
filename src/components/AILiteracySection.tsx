"use client";

import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface AILiteracySectionProps {
  onLearnMore?: () => void;
}

export function AILiteracySection({ onLearnMore }: AILiteracySectionProps) {
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="ai-literacy" className="py-16 md:py-24 bg-[#FAF9FE] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -right-36 w-96 h-96 rounded-full bg-[#473DEA]/8 blur-3xl" />
        <div className="absolute bottom-1/3 -left-36 w-96 h-96 rounded-full bg-[#35309B]/8 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Approach Callout */}
        <div
          ref={headerRef}
          className={`text-center reveal-fade-up ${
            isHeaderVisible ? "is-visible" : ""
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Understanding AI Beyond Just the Prompt.
          </h2>

          {/* Client's exact text callout - concise and high impact */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#35309B]/20 shadow-[0_10px_35px_rgba(53,48,155,0.06)] text-left relative">
            <div className="absolute top-0 left-6 -translate-y-1/2 px-3.5 py-1 rounded-full bg-[#35309B] text-[#DFFF00] text-xs font-black uppercase tracking-wider shadow-xs">
              Our Educational Approach
            </div>

            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#18152B] leading-relaxed">
              &ldquo;Our students do not just write stories or create images with AI. They understand how AI works, what happens behind the tools, how AI generates its outputs, the role of data and models, and responsible AI use.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Organic Bottom Wave into Mentors Section (#FFFFFF) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1440 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative block w-full h-5 sm:h-8"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C480,36 960,36 1440,0 L1440,36 L0,36 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
}
