"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  Code,
  Bug,
  Share2,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { METHOD_STEPS } from "@/data/siteContent";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface LearningMethodProps {
  onDiscoverMore?: () => void;
}

const STEP_ICONS = [Lightbulb, Code, Bug, Share2, Trophy];

const STAGE_THEMES = [
  {
    topBarBg: "bg-[#35309B] text-white",
    topBarBorder: "border-[#473DEA]/30",
    badgeNumber: "bg-[#DFFF00] text-[#18152B]",
    accentText: "text-[#35309B]",
    iconBg: "bg-[#35309B] text-[#DFFF00]",
    pillBorder: "border-[#35309B]/25",
    tagBg: "bg-[#F4F2FF] text-[#35309B]",
  },
  {
    topBarBg: "bg-[#1E40AF] text-white",
    topBarBorder: "border-[#3B82F6]/30",
    badgeNumber: "bg-[#67E8F9] text-[#0F172A]",
    accentText: "text-[#1E40AF]",
    iconBg: "bg-[#1E40AF] text-[#67E8F9]",
    pillBorder: "border-[#1E40AF]/25",
    tagBg: "bg-[#EFF6FF] text-[#1E40AF]",
  },
  {
    topBarBg: "bg-[#6B21A8] text-white",
    topBarBorder: "border-[#9333EA]/30",
    badgeNumber: "bg-[#F472B6] text-[#3B0764]",
    accentText: "text-[#6B21A8]",
    iconBg: "bg-[#6B21A8] text-[#F472B6]",
    pillBorder: "border-[#6B21A8]/25",
    tagBg: "bg-[#FAF5FF] text-[#6B21A8]",
  },
  {
    topBarBg: "bg-[#C2410C] text-white",
    topBarBorder: "border-[#EA580C]/30",
    badgeNumber: "bg-[#FDE047] text-[#451A03]",
    accentText: "text-[#C2410C]",
    iconBg: "bg-[#C2410C] text-[#FDE047]",
    pillBorder: "border-[#C2410C]/25",
    tagBg: "bg-[#FFF7ED] text-[#C2410C]",
  },
  {
    topBarBg: "bg-[#065F46] text-white",
    topBarBorder: "border-[#10B981]/30",
    badgeNumber: "bg-[#6EE7B7] text-[#064E3B]",
    accentText: "text-[#065F46]",
    iconBg: "bg-[#065F46] text-[#6EE7B7]",
    pillBorder: "border-[#065F46]/25",
    tagBg: "bg-[#ECFDF5] text-[#065F46]",
  },
];

export function LearningMethod({ onDiscoverMore }: LearningMethodProps) {
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#ECE9FE]/60 via-[#F4F2FF] to-[#ECE9FE]/40 border-y border-[#35309B]/15 relative"
      aria-label="The 5-stage project-building process"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-10 sm:mb-14 reveal-fade-up ${
            isHeaderVisible ? "is-visible" : ""
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#35309B] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs border border-[#35309B]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Our Learning Method</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18152B] tracking-tight leading-snug">
            How Ideas Become Real Projects
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#55506E] max-w-xl mx-auto leading-relaxed">
            Our 5-stage maker framework guides young creators from their first brainstorm all the way to a finished, shareable creation.
          </p>
        </div>

        {/* Scroll-Driven Stacking Cards Deck: Cards come from bottom and stack onto each other */}
        <div className="max-w-5xl mx-auto relative pb-20 sm:pb-32">
          {METHOD_STEPS.map((step, idx) => {
            const CurrentIcon = STEP_ICONS[idx % STEP_ICONS.length];
            const theme = STAGE_THEMES[idx % STAGE_THEMES.length];

            // Sticky top offset creates the layered stacked cards appearance
            // Each subsequent card sticks exactly 40px lower so previous stage header strips remain visible
            const stickyTopDesktop = 88 + idx * 40;

            return (
              <div
                key={step.step}
                id={`method-stage-card-${idx}`}
                style={{
                  top: `${stickyTopDesktop}px`,
                  zIndex: 10 + idx,
                }}
                className="sticky mb-28 sm:mb-36 lg:mb-44 last:mb-0 rounded-3xl bg-white border-2 border-[#35309B]/25 shadow-[0_-6px_25px_rgba(53,48,155,0.06),0_20px_50px_rgba(53,48,155,0.14)] overflow-hidden transition-all duration-300"
              >
                {/* Visible Stage Header Strip (Exactly 40px height so when stacked, all previous tabs remain visible!) */}
                <div
                  className={`h-10 px-5 sm:px-8 flex items-center justify-between border-b ${theme.topBarBg} ${theme.topBarBorder}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-black ${theme.badgeNumber}`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase">
                      Stage {step.step} • {step.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold opacity-90 hidden sm:inline">
                    {step.headline}
                  </span>
                </div>

                {/* Card Main Body (Original Image Left, Text Right layout for all stages) */}
                <div className="p-5 sm:p-7 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Photo Column - Image on Left */}
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#18152B] border border-[#35309B]/20 shadow-sm group">
                        <Image
                          src={step.image}
                          alt={`Stage ${step.step}: ${step.title}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          priority={idx === 0}
                        />
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18152B]/85 backdrop-blur-md border border-white/20 text-[#DFFF00] text-xs font-bold">
                          <span>{step.stageBadge}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Column - Text on Right */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={`w-7 h-7 rounded-lg ${theme.iconBg} flex items-center justify-center shadow-2xs`}>
                            <CurrentIcon className="w-4 h-4" />
                          </div>
                          <span className={`text-xs font-extrabold uppercase tracking-wider ${theme.accentText}`}>
                            Step {idx + 1} of {METHOD_STEPS.length}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#18152B] tracking-tight">
                          {step.title}: {step.headline}
                        </h3>

                        <p className="mt-2 text-sm text-[#55506E] leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Key Activity & Student Focus */}
                      <div className="pt-2.5 border-t border-[#E8E6F1] space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#18152B]/80">
                          Key Activity:
                        </p>
                        <p className="text-xs sm:text-sm text-[#18152B] font-medium bg-[#F8F7FD] p-2.5 rounded-xl border border-[#EBE7F6]">
                          {step.studentFocus}
                        </p>

                        {step.skills && step.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {step.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${theme.pillBorder} bg-white text-[#18152B] shadow-2xs`}
                              >
                                <CheckCircle2 className={`w-3.5 h-3.5 ${theme.accentText}`} />
                                <span>{skill}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom CTA */}
        {onDiscoverMore && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onDiscoverMore}
              className="inline-flex items-center justify-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <span>Explore Programs Using This Method</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
