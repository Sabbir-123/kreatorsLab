"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface ShowcaseCard {
  id: string;
  title: string;
  tag: string;
  image: string;
  accentColor: string;
  borderColor: string;
}

// 8 unique cards for Row 1
const ROW_1_CARDS: ShowcaseCard[] = [
  {
    id: "r1-1",
    title: "Game Mechanics & Logic Studio",
    tag: "Game Development",
    image: "/images/hero/building-laptop.jpg",
    accentColor: "#FF6B00",
    borderColor: "border-[#FF6B00]",
  },
  {
    id: "r1-2",
    title: "Sketching Logic Before Code",
    tag: "Think Stage",
    image: "/images/students/planning-laptop.jpg",
    accentColor: "#10B981",
    borderColor: "border-[#10B981]",
  },
  {
    id: "r1-3",
    title: "Pair Programming & Collaboration",
    tag: "Team Cohort",
    image: "/images/students/collaborative-learning.jpg",
    accentColor: "#3B82F6",
    borderColor: "border-[#3B82F6]",
  },
  {
    id: "r1-4",
    title: "Holiday Camp Builder Sprint",
    tag: "Break Camps",
    image: "/images/founder/camp.JPG",
    accentColor: "#8B5CF6",
    borderColor: "border-[#8B5CF6]",
  },
  {
    id: "r1-5",
    title: "AI Storybooks & Young Explorers",
    tag: "Grades K–5",
    image: "/images/programs/elementary-program.jpg",
    accentColor: "#F43F5E",
    borderColor: "border-[#F43F5E]",
  },
  {
    id: "r1-6",
    title: "Brainstorming Original Game Worlds",
    tag: "Ideation Studio",
    image: "/images/hero/sketching-ideas.jpg",
    accentColor: "#F59E0B",
    borderColor: "border-[#F59E0B]",
  },
  {
    id: "r1-7",
    title: "Playtesting & Debugging Session",
    tag: "Test & Iterate",
    image: "/images/method/step-3-test.jpg",
    accentColor: "#06B6D4",
    borderColor: "border-[#06B6D4]",
  },
  {
    id: "r1-8",
    title: "Friday Maker Demo & Presentation",
    tag: "Showcase Day",
    image: "/images/hero/presenting-project.jpg",
    accentColor: "#EC4899",
    borderColor: "border-[#EC4899]",
  },
];

// 8 unique cards for Row 2
const ROW_2_CARDS: ShowcaseCard[] = [
  {
    id: "r2-1",
    title: "Austin & Lake Travis Studio",
    tag: "Hands-on Lab",
    image: "/images/programs/fall-enrichment.jpg",
    accentColor: "#3B82F6",
    borderColor: "border-[#3B82F6]",
  },
  {
    id: "r2-2",
    title: "Summer AI Maker Camp Sprint",
    tag: "Summer Camp",
    image: "/images/programs/summer-camp.jpg",
    accentColor: "#F59E0B",
    borderColor: "border-[#F59E0B]",
  },
  {
    id: "r2-3",
    title: "Bringing Digital Ideas to Life",
    tag: "Build Stage",
    image: "/images/method/step-2-build.jpg",
    accentColor: "#10B981",
    borderColor: "border-[#10B981]",
  },
  {
    id: "r2-4",
    title: "Middle School Creative Architecture",
    tag: "Grades 6–8",
    image: "/images/programs/middle-school-program.jpg",
    accentColor: "#8B5CF6",
    borderColor: "border-[#8B5CF6]",
  },
  {
    id: "r2-5",
    title: "Mentorship & Deep Guidance",
    tag: "1:8 Ratio",
    image: "/images/founder/actually_knows.JPG",
    accentColor: "#FF6B00",
    borderColor: "border-[#FF6B00]",
  },
  {
    id: "r2-6",
    title: "Polishing UI & Audio Mechanics",
    tag: "Polish Stage",
    image: "/images/method/step-4-publish.jpg",
    accentColor: "#06B6D4",
    borderColor: "border-[#06B6D4]",
  },
  {
    id: "r2-7",
    title: "Thanksgiving Game Prototype Lab",
    tag: "Holiday Sprint",
    image: "/images/programs/thanksgiving-camp.jpg",
    accentColor: "#F43F5E",
    borderColor: "border-[#F43F5E]",
  },
  {
    id: "r2-8",
    title: "Sharing Creations With Pride",
    tag: "Present Stage",
    image: "/images/method/step-5-present.jpg",
    accentColor: "#84CC16",
    borderColor: "border-[#84CC16]",
  },
];

export function ClassShowcaseMarquee() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-[#FAF9FE] overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-[#473DEA]/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#DFFF00]/10 blur-3xl" />
      </div>

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12 z-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-2.5 border border-[#35309B]/15 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
          <span>Student Projects &amp; Studios</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#18152B] tracking-tight">
          Projects Built by Kreators Lab Students
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-[#65617A] max-w-xl mx-auto leading-relaxed">
          Real projects, playable games, and hands-on creations built in our Austin &amp; Lake Travis studios. Hover over any project to inspect.
        </p>
      </div>

      {/* Angled / Slanted Continuous Ticker Container (Inspired by Papumba showcase) */}
      <div className="relative -my-6 sm:-my-8 py-8 sm:py-12 overflow-hidden">
        {/* Soft Left & Right Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#FAF9FE] via-[#FAF9FE]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#FAF9FE] via-[#FAF9FE]/80 to-transparent z-20" />

        {/* Tilted Marquee Stage */}
        <div
          className="space-y-5 sm:space-y-6 md:space-y-8"
          style={{
            transform: "rotate(-2.5deg) scale(1.03)",
            transformOrigin: "center center",
          }}
        >
          {/* Row 1: Rolling Left Continuously • Pauses on Hover • Cards Zoom on Hover */}
          <div className="marquee-row relative flex overflow-hidden py-3">
            <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 shrink-0">
              {/* Duplicate array for seamless infinite loop */}
              {[...ROW_1_CARDS, ...ROW_1_CARDS].map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className={`group relative shrink-0 w-[270px] sm:w-[330px] md:w-[370px] aspect-[16/10] rounded-3xl overflow-hidden bg-white border-2 border-white/80 ${card.borderColor} border-b-[7px] sm:border-b-[8px] shadow-[0_10px_25px_rgba(53,48,155,0.08)] hover:shadow-[0_25px_50px_rgba(53,48,155,0.25)] transition-all duration-300 ease-out cursor-pointer hover:scale-105 sm:hover:scale-108 hover:-translate-y-2 hover:z-30`}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 270px, 370px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Tag Pill */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span className="text-[11px] font-extrabold text-[#18152B] tracking-tight">
                      {card.tag}
                    </span>
                  </div>

                  {/* Bottom Title Pill / Label */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xs sm:text-sm font-black tracking-tight leading-snug drop-shadow-sm line-clamp-1 group-hover:text-[#DFFF00] transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  {/* Hover Selected Highlight Ring */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rolling Right Continuously • Pauses on Hover • Cards Zoom on Hover */}
          <div className="marquee-row relative flex overflow-hidden py-3">
            <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 shrink-0">
              {/* Duplicate array for seamless infinite loop */}
              {[...ROW_2_CARDS, ...ROW_2_CARDS].map((card, idx) => (
                <div
                  key={`${card.id}-${idx}`}
                  className={`group relative shrink-0 w-[270px] sm:w-[330px] md:w-[370px] aspect-[16/10] rounded-3xl overflow-hidden bg-white border-2 border-white/80 ${card.borderColor} border-b-[7px] sm:border-b-[8px] shadow-[0_10px_25px_rgba(53,48,155,0.08)] hover:shadow-[0_25px_50px_rgba(53,48,155,0.25)] transition-all duration-300 ease-out cursor-pointer hover:scale-105 sm:hover:scale-108 hover:-translate-y-2 hover:z-30`}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 270px, 370px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Tag Pill */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: card.accentColor }}
                    />
                    <span className="text-[11px] font-extrabold text-[#18152B] tracking-tight">
                      {card.tag}
                    </span>
                  </div>

                  {/* Bottom Title Pill / Label */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-xs sm:text-sm font-black tracking-tight leading-snug drop-shadow-sm line-clamp-1 group-hover:text-[#DFFF00] transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  {/* Hover Selected Highlight Ring */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
