"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Lightbulb,
  Cpu,
  Bug,
  Trophy,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SectionProgramItem } from "@/data/siteContent";

interface EnrichmentJourney12WeekProps {
  program?: SectionProgramItem;
  onEnroll?: () => void;
}

interface EnrichmentPhase {
  phaseNumber: string;
  weeksSpan: string;
  title: string;
  headline: string;
  description: string;
  focus: string;
  skills: string[];
  image: string;
  badge: string;
}

const ENRICHMENT_PHASES: EnrichmentPhase[] = [
  {
    phaseNumber: "Phase 01",
    weeksSpan: "Weeks 1–3",
    title: "Idea Genesis & Creative Thinking",
    headline: "Paper-First Planning & Digital Foundations",
    description:
      "Students brainstorm original game concepts and interactive stories on paper. Before touching tools, they storyboard character behaviors, map out worlds, and explore age-appropriate AI sandbox environments.",
    focus: "Brainstorming, concept sketches, and formulating original ideas",
    skills: ["Creative Brainstorming", "Visual Storyboarding", "Concept Design"],
    image: "/images/hero/sketching-ideas.jpg",
    badge: "Weeks 1–3 • Ideation",
  },
  {
    phaseNumber: "Phase 02",
    weeksSpan: "Weeks 4–6",
    title: "Core Building & Mechanics",
    headline: "Visual Logic & Hands-on Coding",
    description:
      "Students begin constructing their digital projects using visual logic blocks and guided AI assistance. They code player movement, scoring rules, and interactive dialogue trees step by step.",
    focus: "Connecting mechanics, setting up trigger events, and crafting friendly prompts",
    skills: ["Visual Block Coding", "AI Prompt Crafting", "Computational Logic"],
    image: "/images/hero/building-laptop.jpg",
    badge: "Weeks 4–6 • Logic & Build",
  },
  {
    phaseNumber: "Phase 03",
    weeksSpan: "Weeks 7–9",
    title: "Playtesting & Iterative Debugging",
    headline: "Testing, Investigating & Edge Cases",
    description:
      "Students explore what works and resolve unexpected glitches. With peer feedback and mentor guidance, they learn to isolate bugs, optimize gameplay feel, and verify AI responses critically.",
    focus: "Collaborative playtesting, identifying bugs, and tweaking controls",
    skills: ["Playtesting & Feedback", "Debugging Mindset", "User Experience (UX)"],
    image: "/images/students/planning-laptop.jpg",
    badge: "Weeks 7–9 • Test & Refine",
  },
  {
    phaseNumber: "Phase 04",
    weeksSpan: "Weeks 10–12",
    title: "Polish & Final Showcase",
    headline: "Finishing Craft & Confident Presentation",
    description:
      "Students prepare their creations for the end-of-semester showcase. They polish UI menus, sound effects, and digital safety guardrails before presenting their working projects proudly to parents and peers.",
    focus: "Articulating technical decisions, live demonstration, and celebration",
    skills: ["UI / Audio Polish", "Public Speaking", "Creative Confidence"],
    image: "/images/hero/presenting-project.jpg",
    badge: "Weeks 10–12 • Showcase",
  },
];

export function EnrichmentJourney12Week({
  program,
  onEnroll,
}: EnrichmentJourney12WeekProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const currentPhase = ENRICHMENT_PHASES[activePhaseIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F6F4FD] via-white to-[#F6F4FD] border-y border-[#35309B]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#35309B]/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>12-Week Semester Learning Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18152B] tracking-tight leading-tight">
            How Students Progress Across 12 Weeks.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#55506E] leading-relaxed">
            Our after-school enrichment follows a structured semester progression—giving students ample time to move from raw brainstorming to complex, polished creations.
          </p>

          {/* Phase Selector Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-white border-2 border-[#35309B]/20 shadow-sm gap-1.5">
            {ENRICHMENT_PHASES.map((phase, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <button
                  key={phase.phaseNumber}
                  type="button"
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#35309B] text-white shadow-xs"
                      : "text-[#65617A] hover:text-[#18152B] hover:bg-[#F4F1FC]"
                  }`}
                >
                  <span className="opacity-70 mr-1.5">{phase.weeksSpan}:</span>
                  <span>{phase.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Phase Display Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border-2 border-[#35309B]/25 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
            {/* Visual Frame (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#18152B] border-2 border-[#35309B]/20 shadow-md">
                <Image
                  src={currentPhase.image}
                  alt={currentPhase.headline}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-3 left-3 bg-[#18152B]/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#DFFF00] shadow-xs">
                  {currentPhase.badge}
                </div>
              </div>
            </div>

            {/* Content Details (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#35309B] bg-[#EEECFF] px-3 py-1 rounded-full">
                  {currentPhase.phaseNumber} • {currentPhase.weeksSpan}
                </span>
                <span className="text-xs text-[#65617A] font-semibold">
                  12-Class Cohort
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18152B] tracking-tight leading-snug">
                {currentPhase.headline}
              </h3>

              <p className="text-sm sm:text-base text-[#55506E] leading-relaxed">
                {currentPhase.description}
              </p>

              <div className="p-3.5 rounded-xl bg-[#F8F7FD] border border-[#E8E6F1]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#35309B] mb-1">
                  Primary Learning Focus:
                </p>
                <p className="text-xs sm:text-sm text-[#18152B] font-medium">
                  {currentPhase.focus}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#65617A] mb-2">
                  Skills Built in this Phase:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentPhase.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#35309B]/20 text-[#18152B]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#35309B]" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer / Notice on verified syllabus */}
        <div className="mt-8 text-center text-xs text-[#65617A] max-w-2xl mx-auto">
          * Cohort sessions are held weekly for 12 weeks. Detailed weekly lesson outlines and prerequisites are provided upon cohort registration.
        </div>
      </div>
    </section>
  );
}
