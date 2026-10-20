"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Lightbulb,
  Zap,
  Rocket,
  Gamepad2,
  Trophy,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { SectionProgramItem } from "@/data/siteContent";

interface CampJourneyInteractiveProps {
  program?: SectionProgramItem;
}

interface CampDay {
  day: string;
  dayNumber: string;
  title: string;
  tagline: string;
  summary: string;
  vibe: string;
  studentQuote: string;
  skillsLearned: string[];
  image: string;
  badge: string;
  icon: React.ElementType;
}

const CAMP_DAYS: CampDay[] = [
  {
    day: "Monday",
    dayNumber: "Day 01",
    title: "Dream It.",
    tagline: "From Blank Paper to Wild Ideas",
    summary:
      "Kids grab markers, paper, and sticky notes. Before touching code, they imagine original characters, bizarre game worlds, and 'what if' possibilities with mentors cheering them on.",
    vibe: "Creative Spark & Storyboarding",
    studentQuote: "“Can my dragon shoot tacos instead of fire?” — “Yes, absolutely. Let's design the physics!”",
    skillsLearned: ["Visual Storyboarding", "Character Conception", "Creative Brainstorming"],
    image: "/images/hero/sketching-ideas.jpg",
    badge: "💡 Brainstorm Kickoff",
    icon: Lightbulb,
  },
  {
    day: "Tuesday",
    dayNumber: "Day 02",
    title: "Start Building.",
    tagline: "The Magic Moment: 'I Made That Move!'",
    summary:
      "Students jump into visual code and friendly AI tools. Within the first two hours, their hand-drawn characters take their first animated steps on screen—pure creator excitement.",
    vibe: "Hands-on Code & First Mechanics",
    studentQuote: "“Look! When I tap spacebar, the cat jumps and the score counter ticks up!”",
    skillsLearned: ["Block & Logic Architecture", "Sprite Animation", "Event-Driven Triggers"],
    image: "/images/hero/building-laptop.jpg",
    badge: "⚡ First Mechanics Live",
    icon: Zap,
  },
  {
    day: "Wednesday",
    dayNumber: "Day 03",
    title: "Keep Creating.",
    tagline: "Superpowers, Secret Levels & AI Prompts",
    summary:
      "The engine is running! Kids branch out: composing custom sound effects, building level 2 boss fights, and training child-safe AI assistants to craft clever dialog trees.",
    vibe: "Feature Explosion & Expansion",
    studentQuote: "“I trained the friendly AI bot to give funny pirate hints when you get stuck in the maze.”",
    skillsLearned: ["Prompt Crafting", "Game Balance", "Audio & Sound FX Integration"],
    image: "/images/students/planning-laptop.jpg",
    badge: "🚀 Leveling Up",
    icon: Rocket,
  },
  {
    day: "Thursday",
    dayNumber: "Day 04",
    title: "Test & Improve.",
    tagline: "Hilarious Bugs & Peer Playtesting",
    summary:
      "Classmates swap laptops to playtest each other's games! Laughter fills the room as kids spot unexpected glitches, hunt down edge cases, and tweak controls for maximum fun.",
    vibe: "Playtesting Arena & Bug Bounty",
    studentQuote: "“My fish was flying through walls! We added collision physics and now it's super smooth.”",
    skillsLearned: ["Collaborative Feedback", "Iterative Debugging", "User Experience (UX)"],
    image: "/images/students/collaborative-learning.jpg",
    badge: "🎮 Playtest Arena",
    icon: Gamepad2,
  },
  {
    day: "Friday",
    dayNumber: "Day 05",
    title: "Show & Celebrate.",
    tagline: "The Grand Friday Showcase for Parents",
    summary:
      "The room buzzes with pride! Parents, siblings, and friends gather as every young creator takes the stage to demo their playable game and share what they discovered.",
    vibe: "Showcase & Creator Pride",
    studentQuote: "“Mom, play my game! I drew this, I coded the jump, and I designed the whole world!”",
    skillsLearned: ["Public Speaking", "Creative Pride", "Demo Articulation"],
    image: "/images/hero/presenting-project.jpg",
    badge: "🏆 Grand Showcase",
    icon: Trophy,
  },
];

export function CampJourneyInteractive({
  program,
}: CampJourneyInteractiveProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const currentDay = CAMP_DAYS[activeDayIndex];
  const IconComp = currentDay.icon;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#F6F4FD] via-white to-[#F6F4FD] border-y border-[#35309B]/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4 border border-[#35309B]/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Interactive Camp Sprint Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18152B] tracking-tight leading-tight">
            From Blank Paper to the Friday Showcase.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#55506E] leading-relaxed">
            Every camp sprint is an immersive, hands-on maker experience where children transform curiosity into working projects.
            {program?.classCount ? ` Formatted for this program's ${program.classCount} schedule.` : ""}
          </p>

          {/* Day Navigation Tabs */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-white border-2 border-[#35309B]/20 shadow-sm gap-1.5">
            {CAMP_DAYS.map((item, idx) => {
              const isActive = activeDayIndex === idx;
              const TabIcon = item.icon;
              return (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => setActiveDayIndex(idx)}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#35309B] text-white shadow-xs"
                      : "text-[#65617A] hover:text-[#18152B] hover:bg-[#F4F1FC]"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{item.day}: {item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Day Detail Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border-2 border-[#35309B]/25 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
            {/* Visual Frame (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#18152B] border-2 border-[#35309B]/20 shadow-md">
                <Image
                  src={currentDay.image}
                  alt={`${currentDay.day} — ${currentDay.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-3 left-3 bg-[#18152B]/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#DFFF00] shadow-xs">
                  {currentDay.badge}
                </div>
              </div>
            </div>

            {/* Content Details (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#35309B] bg-[#EEECFF] px-3 py-1 rounded-full">
                  {currentDay.dayNumber} • {currentDay.day}
                </span>
                <span className="text-xs text-[#55506E] font-bold">
                  {currentDay.vibe}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18152B] tracking-tight leading-snug">
                {currentDay.title} <span className="text-[#35309B]">{currentDay.tagline}</span>
              </h3>

              <p className="text-sm sm:text-base text-[#55506E] leading-relaxed">
                {currentDay.summary}
              </p>

              {/* Student quote callout */}
              <div className="p-3.5 rounded-xl bg-[#F8F7FD] border border-[#E8E6F1] flex items-start gap-2.5">
                <Quote className="w-4 h-4 text-[#35309B] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm italic font-medium text-[#18152B]">
                  {currentDay.studentQuote}
                </p>
              </div>

              {/* Skills learned */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#65617A] mb-2">
                  Skills Built Today:
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentDay.skillsLearned.map((skill) => (
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
      </div>
    </section>
  );
}
