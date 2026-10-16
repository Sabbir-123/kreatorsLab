"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Brain,
  Cpu,
  Trophy,
  ShieldCheck,
  MessageSquareQuote,
  Rocket,
  Pause,
  Play,
  CheckCircle2,
} from "lucide-react";
import { PARENT_BENEFITS } from "@/data/siteContent";

// Meaningful Icon Map for the 6 core habits
const ICON_MAP: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    bgColor: string;
    badgeColor: string;
  }
> = {
  Brain: {
    icon: Brain,
    accentColor: "text-[#473DEA]",
    bgColor: "bg-[#EEECFF]",
    badgeColor: "bg-[#EEECFF] text-[#35309B]",
  },
  Cpu: {
    icon: Cpu,
    accentColor: "text-[#35309B]",
    bgColor: "bg-[#F0EEFF]",
    badgeColor: "bg-[#F0EEFF] text-[#35309B]",
  },
  Trophy: {
    icon: Trophy,
    accentColor: "text-[#35309B]",
    bgColor: "bg-[#F5F4FF]",
    badgeColor: "bg-[#F5F4FF] text-[#35309B]",
  },
  ShieldCheck: {
    icon: ShieldCheck,
    accentColor: "text-[#2A7E4F]",
    bgColor: "bg-[#EDF8F1]",
    badgeColor: "bg-[#EDF8F1] text-[#2A7E4F]",
  },
  MessageSquareQuote: {
    icon: MessageSquareQuote,
    accentColor: "text-[#35309B]",
    bgColor: "bg-[#EEECFF]",
    badgeColor: "bg-[#EEECFF] text-[#35309B]",
  },
  Rocket: {
    icon: Rocket,
    accentColor: "text-[#473DEA]",
    bgColor: "bg-[#F5F4FF]",
    badgeColor: "bg-[#F5F4FF] text-[#473DEA]",
  },
};

export function ParentBenefits() {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate the 6 items 4 times (24 cards total) to ensure completely seamless, gap-free infinite scrolling
  const marqueeItems = [
    ...PARENT_BENEFITS,
    ...PARENT_BENEFITS,
    ...PARENT_BENEFITS,
    ...PARENT_BENEFITS,
  ];

  return (
    <section
      id="parents"
      className="py-20 md:py-28 bg-[#F5F4FF] border-b border-[#E8E6F1] relative overflow-hidden"
    >
      {/* 
        Embedded Keyframes for Guaranteed Framer-Style Continuous Marquee:
        Translates continuously from right to left (0 to -50%), and pauses instantly on hover.
      */}
      <style>{`
        @keyframes framerContinuousSlide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .framer-slider-track {
          display: flex !important;
          width: max-content !important;
          animation: framerContinuousSlide 30s linear infinite !important;
          will-change: transform;
        }

        .framer-slider-container:hover .framer-slider-track {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#473DEA]/8 blur-3xl" />
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-[#35309B]/8 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#35309B]/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Habits Beyond the Screen</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            It&apos;s Not Just About What They Build.{" "}
            <span className="text-[#35309B]">It&apos;s About How They Think.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#65617A] leading-relaxed">
            We believe technology education should help children develop habits that matter beyond the screen.
          </p>

          {/* Interactive status pill */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#35309B] bg-white px-3 py-1.5 rounded-full border border-[#35309B]/20 shadow-xs">
            {isHovered ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#35309B] fill-[#35309B]" />
                <span>Paused on card • Move mouse away to resume sliding</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#35309B] fill-[#35309B]" />
                <span>Continuous motion right → left • Hover on any card to pause</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 
        FRAMER-STYLE CONTINUOUS SLIDER (RIGHT TO LEFT)
        - Continuously moves from right to left
        - Pauses when hovering on ANY card
        - Resumes when the mouse leaves
      */}
      <div
        className="framer-slider-container relative w-full overflow-hidden py-4 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-[#F5F4FF] via-[#F5F4FF]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-[#F5F4FF] via-[#F5F4FF]/90 to-transparent z-20 pointer-events-none" />

        {/* Sliding Marquee Track */}
        <div
          className="framer-slider-track flex gap-6 px-4"
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {marqueeItems.map((benefit, idx) => {
            const config = ICON_MAP[benefit.iconName] || {
              icon: Sparkles,
              accentColor: "text-[#35309B]",
              bgColor: "bg-[#EEECFF]",
              badgeColor: "bg-[#EEECFF] text-[#35309B]",
            };
            const IconComponent = config.icon;

            return (
              <div
                key={`${benefit.title}-${idx}`}
                className="w-[300px] sm:w-[350px] shrink-0 bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#35309B]/20 hover:border-[#35309B]/70 shadow-[0_10px_30px_-8px_rgba(53,48,155,0.12)] hover:shadow-[0_20px_40px_-10px_rgba(53,48,155,0.25)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Top Bar: Meaningful Icon Badge + Category Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${config.bgColor} ${config.accentColor} group-hover:bg-[#35309B] group-hover:text-white border-2 border-[#35309B]/15 flex items-center justify-center transition-colors duration-300 shadow-xs`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${config.badgeColor} group-hover:bg-[#35309B] group-hover:text-[#DFFF00] transition-colors duration-300`}
                    >
                      {benefit.tag || "Core Habit"}
                    </span>
                  </div>

                  {/* Habit Title */}
                  <h3 className="text-xl font-extrabold text-[#18152B] mb-2.5 group-hover:text-[#35309B] transition-colors">
                    {benefit.title}
                  </h3>

                  {/* Habit Description */}
                  <p className="text-xs sm:text-sm text-[#65617A] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Bottom Highlight Callout & Indicator */}
                <div className="mt-6 pt-4 border-t border-[#E8E6F1]">
                  {benefit.highlight && (
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#35309B]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35309B] shrink-0" />
                      <span className="line-clamp-1">{benefit.highlight}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-[#65617A] pt-1">
                    <span className="font-medium">{benefit.category || "Habits Beyond The Screen"}</span>
                    <span className="w-2 h-2 rounded-full bg-[#DFFF00] ring-2 ring-[#35309B]/20 shadow-xs" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
