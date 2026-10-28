"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Brain, Bug, Compass } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ThinkingPillar {
  id: string;
  step: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  caption: string;
  image: string;
  imageAlt: string;
  shapeKey: "shape-1" | "shape-2" | "shape-3";
}

const PILLARS: ThinkingPillar[] = [
  {
    id: "ownership",
    step: "01",
    icon: Compass,
    title: "They Make the Decisions",
    description:
      "Kids choose what to create, decide how it should work, and make the key design choices themselves.",
    caption: "Students map out their own ideas and design choices before building.",
    image: "/images/students/planning-laptop.jpg",
    imageAlt: "Kreators Lab student sketching project design and planning ideas on paper",
    shapeKey: "shape-1",
  },
  {
    id: "debugging",
    step: "02",
    icon: Bug,
    title: "They Learn to Fix What's Broken",
    description:
      "When something doesn't work, they test ideas, find mistakes, and try different solutions instead of giving up.",
    caption: "When something doesn't work, students test solutions instead of giving up.",
    image: "/images/hero/building-laptop.jpg",
    imageAlt: "Student actively coding and troubleshooting a digital project on a laptop",
    shapeKey: "shape-2",
  },
  {
    id: "critical-thinking",
    step: "03",
    icon: Brain,
    title: "They Don't Just Trust AI",
    description:
      "Kids check AI's answers, ask questions, and decide for themselves whether a solution actually makes sense.",
    caption: "Students evaluate AI suggestions critically and verify their own solutions.",
    image: "/images/students/collaborative-learning.jpg",
    imageAlt: "Students reviewing and critically assessing project outputs together in the studio",
    shapeKey: "shape-3",
  },
];

// SVG path string definitions for clipPathUnits="objectBoundingBox" with wider curves
const SVG_SHAPES = {
  "shape-1":
    "M 0.35,0.02 C 0.52,-0.01 0.68,0.01 0.80,0.05 C 0.92,0.10 0.98,0.20 0.97,0.32 C 0.96,0.44 0.88,0.49 0.89,0.58 C 0.90,0.68 0.97,0.74 0.95,0.85 C 0.92,0.96 0.75,1.00 0.50,0.99 C 0.30,0.98 0.12,0.96 0.07,0.85 C 0.03,0.74 0.11,0.67 0.10,0.57 C 0.09,0.47 0.02,0.42 0.03,0.30 C 0.04,0.18 0.16,0.06 0.35,0.02 Z",
  "shape-2":
    "M 0.38,0.02 C 0.55,-0.01 0.72,0.01 0.82,0.06 C 0.93,0.11 0.97,0.22 0.95,0.34 C 0.93,0.46 0.89,0.51 0.90,0.60 C 0.91,0.70 0.96,0.77 0.93,0.87 C 0.89,0.97 0.72,1.00 0.48,0.99 C 0.28,0.98 0.10,0.95 0.06,0.84 C 0.02,0.73 0.09,0.65 0.08,0.55 C 0.07,0.45 0.03,0.39 0.05,0.28 C 0.07,0.17 0.19,0.06 0.38,0.02 Z",
  "shape-3":
    "M 0.32,0.02 C 0.49,-0.01 0.66,0.01 0.78,0.05 C 0.90,0.09 0.97,0.19 0.96,0.31 C 0.95,0.43 0.87,0.48 0.88,0.57 C 0.89,0.67 0.96,0.75 0.94,0.86 C 0.91,0.96 0.74,1.00 0.52,0.99 C 0.32,0.98 0.13,0.96 0.08,0.85 C 0.04,0.74 0.12,0.66 0.11,0.56 C 0.10,0.46 0.03,0.41 0.04,0.29 C 0.05,0.17 0.15,0.06 0.32,0.02 Z",
};

export function WhyKreatorsLab() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();

  // Scroll listener that updates activeIndex as user scrolls through the 3 cards
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top <= viewportHeight * 0.75 && rect.bottom >= viewportHeight * 0.2) {
        let closestIndex = 0;
        let minDistance = Infinity;
        const middleY = viewportHeight * 0.5;

        pillarRefs.current.forEach((el, index) => {
          if (!el) return;
          const elRect = el.getBoundingClientRect();
          const elCenter = elRect.top + elRect.height / 2;
          const distance = Math.abs(middleY - elCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activePillar = PILLARS[activeIndex];

  return (
    <section
      id="critical-thinking"
      ref={sectionRef}
      className="py-16 md:py-24 bg-white border-b border-[#E8E6F1] relative overflow-hidden"
      aria-label="Critical thinking and learning approach"
    >
      {/* Hidden SVG Definitions for the 3 Organic Wavy Clip Paths */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="organic-wavy-shape-1" clipPathUnits="objectBoundingBox">
            <path d={SVG_SHAPES["shape-1"]} />
          </clipPath>
          <clipPath id="organic-wavy-shape-2" clipPathUnits="objectBoundingBox">
            <path d={SVG_SHAPES["shape-2"]} />
          </clipPath>
          <clipPath id="organic-wavy-shape-3" clipPathUnits="objectBoundingBox">
            <path d={SVG_SHAPES["shape-3"]} />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Statement & The 3 Cards */}
          <div
            ref={headerRef}
            className={`lg:col-span-6 space-y-6 reveal-fade-up ${
              headerVisible ? "is-visible" : ""
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider border border-[#35309B]/15 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
              <span>Critical Thinking &amp; Ownership</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#18152B] tracking-tight leading-tight">
              It&apos;s Not Just What They Build.{" "}
              <span className="text-[#35309B]">It&apos;s How They Think.</span>
            </h2>

            {/* Human-centered, parent-friendly supporting paragraph */}
            <p className="text-base sm:text-lg text-[#3A3554] font-medium leading-relaxed max-w-2xl">
              Kids come up with their own ideas, test what works, fix mistakes, and use AI to help bring their projects to life.
            </p>

            {/* The 3 Cards: Interactive, Responsive, and Accessible */}
            <div className="pt-2 space-y-3.5" role="list">
              {PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={pillar.id}
                    ref={(el) => {
                      pillarRefs.current[idx] = el;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`${pillar.step}: ${pillar.title}`}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIndex(idx);
                      }
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 outline-none focus-visible:ring-2 focus-visible:ring-[#473DEA] ${
                      isActive
                        ? "bg-[#F7F5FE] border-[#473DEA] shadow-[0_4px_20px_rgba(71,61,234,0.08)] scale-[1.008]"
                        : "bg-white border-[#E8E6F1] hover:border-[#35309B]/35 hover:bg-[#FAF9FE] shadow-2xs"
                    }`}
                  >
                    {/* Step Number Badge & Icon */}
                    <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                          isActive
                            ? "bg-[#35309B] text-[#DFFF00] shadow-xs"
                            : "bg-[#EEECFF] text-[#35309B]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[11px] font-black uppercase tracking-wider ${
                          isActive ? "text-[#35309B]" : "text-[#8A84A6]"
                        }`}
                      >
                        {pillar.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`text-base sm:text-lg font-bold tracking-tight leading-snug transition-colors ${
                          isActive ? "text-[#18123B]" : "text-[#2B2648]"
                        }`}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#5B5675] mt-1.5 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Clean, Wider Organic Image Presentation */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              {/* Clean Student Experience Progress Indicator */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-[#55506E] uppercase tracking-wider">
                  Student Experience {activeIndex + 1} of {PILLARS.length}
                </span>
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Student experience tabs">
                  {PILLARS.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === i
                          ? "w-6 bg-[#35309B]"
                          : "w-2 bg-[#35309B]/20 hover:bg-[#35309B]/40"
                      }`}
                      aria-label={`View photo for: ${p.title}`}
                      aria-selected={activeIndex === i}
                    />
                  ))}
                </div>
              </div>

              {/* The Wider Organic Image Frame */}
              <div className="relative aspect-[1/1.28] w-full max-w-[480px] mx-auto filter drop-shadow-[0_16px_36px_rgba(53,48,155,0.12)]">
                {/* Clipped Image Container */}
                <div
                  className="absolute inset-0 bg-[#18123B] overflow-hidden transition-all duration-500"
                  style={{
                    clipPath: `url(#organic-wavy-${activePillar.shapeKey})`,
                  }}
                >
                  {/* Cross-fading authentic student photos */}
                  {PILLARS.map((pillar, idx) => (
                    <div
                      key={pillar.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        activeIndex === idx
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={pillar.image}
                        alt={pillar.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                        priority={idx === 0}
                      />
                      {/* Subtle gradient overlay at the base for caption contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                    </div>
                  ))}

                  {/* Grounded, Authentic Photo Caption */}
                  <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-[#18123B]/85 backdrop-blur-md border border-white/20 text-center shadow-lg transition-all duration-300 z-20">
                    <p className="text-xs sm:text-sm text-white/95 font-medium leading-snug">
                      {activePillar.caption}
                    </p>
                  </div>
                </div>

                {/* Clean, Refined Organic Border Outline Scaled to 100x128 ViewBox */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                  viewBox="0 0 100 128"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d={
                      activeIndex === 0
                        ? "M 35,3 C 52,-1 68,1 80,7 C 92,13 98,26 97,42 C 96,58 88,65 89,77 C 90,90 97,98 95,112 C 92,126 75,132 50,131 C 30,130 12,127 7,112 C 3,98 11,88 10,75 C 9,62 2,55 3,39 C 4,23 16,8 35,3 Z"
                        : activeIndex === 1
                        ? "M 38,3 C 55,-1 72,1 82,8 C 93,15 97,29 95,45 C 93,61 89,67 90,79 C 91,92 96,102 93,115 C 89,128 72,132 48,131 C 28,130 10,126 6,111 C 2,96 9,86 8,73 C 7,59 3,51 5,37 C 7,22 19,8 38,3 Z"
                        : "M 32,3 C 49,-1 66,1 78,7 C 90,12 97,25 96,41 C 95,57 87,63 88,75 C 89,88 96,99 94,113 C 91,127 74,132 52,131 C 32,130 13,127 8,112 C 4,98 12,87 11,74 C 10,61 3,54 4,38 C 5,22 15,8 32,3 Z"
                    }
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="3.5"
                    className="transition-all duration-500 ease-in-out"
                  />
                  <path
                    d={
                      activeIndex === 0
                        ? "M 35,3 C 52,-1 68,1 80,7 C 92,13 98,26 97,42 C 96,58 88,65 89,77 C 90,90 97,98 95,112 C 92,126 75,132 50,131 C 30,130 12,127 7,112 C 3,98 11,88 10,75 C 9,62 2,55 3,39 C 4,23 16,8 35,3 Z"
                        : activeIndex === 1
                        ? "M 38,3 C 55,-1 72,1 82,8 C 93,15 97,29 95,45 C 93,61 89,67 90,79 C 91,92 96,102 93,115 C 89,128 72,132 48,131 C 28,130 10,126 6,111 C 2,96 9,86 8,73 C 7,59 3,51 5,37 C 7,22 19,8 38,3 Z"
                        : "M 32,3 C 49,-1 66,1 78,7 C 90,12 97,25 96,41 C 95,57 87,63 88,75 C 89,88 96,99 94,113 C 91,127 74,132 52,131 C 32,130 13,127 8,112 C 4,98 12,87 11,74 C 10,61 3,54 4,38 C 5,22 15,8 32,3 Z"
                    }
                    fill="none"
                    stroke="rgba(53, 48, 155, 0.18)"
                    strokeWidth="1"
                    className="transition-all duration-500 ease-in-out"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
