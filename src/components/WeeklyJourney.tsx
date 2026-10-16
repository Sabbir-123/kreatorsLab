"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Play,
  Lightbulb,
  Zap,
  Rocket,
  Gamepad2,
  Trophy,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Volume2,
} from "lucide-react";

interface WeeklyJourneyProps {
  onWatchVideo?: () => void;
}

interface DayExperience {
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
  color: string;
  icon: React.ElementType;
}

const JOURNEY_DAYS: DayExperience[] = [
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
    color: "#7C3AED",
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
    color: "#3B82F6",
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
    color: "#10B981",
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
    color: "#F59E0B",
    icon: Gamepad2,
  },
  {
    day: "Friday",
    dayNumber: "Day 05",
    title: "Show & Celebrate.",
    tagline: "The Big Friday Showcase: 'I Built This!'",
    summary:
      "Family and friends arrive for the live Student Showcase. Kids grab the microphone, demonstrate their working creations, and explain their engineering decisions with beaming pride.",
    vibe: "Friday Demo Day & Parent Cheers",
    studentQuote: "“Everyone played my game, and even the parents wanted another turn on Level 3!”",
    skillsLearned: ["Public Presentation", "Creative Confidence", "Pride of Ownership"],
    image: "/images/hero/presenting-project.jpg",
    badge: "🏆 Demo Day & Medals",
    color: "#EC4899",
    icon: Trophy,
  },
];

export function WeeklyJourney({ onWatchVideo }: WeeklyJourneyProps) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const activeDay = JOURNEY_DAYS[activeDayIndex];

  // Optional auto-tour effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveDayIndex((prev) => (prev + 1) % JOURNEY_DAYS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E6F1] relative overflow-hidden">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#DED7FD]/40 via-[#EEECFF]/30 to-[#DFFF00]/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#5438DC]" />
            <span>Interactive Learning Experience</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18152B] tracking-tight leading-tight">
            Five Days. One Big Creative Adventure.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#65617A] leading-relaxed">
            Click through each day below to experience the day-by-day creator momentum—from blank paper brainstorm to the Friday live showcase!
          </p>

          {/* Auto Tour Toggle & Day Navigator Pill */}
          <div className="mt-6 inline-flex items-center gap-2 bg-[#FAF9FE] border border-[#E8E6F1] rounded-full p-1.5 shadow-2xs">
            <span className="text-xs font-semibold text-[#65617A] pl-3 pr-2">
              Explore the Week:
            </span>
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isAutoPlaying
                  ? "bg-[#DFFF00] text-[#18152B] shadow-xs"
                  : "bg-white text-[#35309B] border border-[#E0DCF5] hover:bg-[#EEECFF]"
              }`}
            >
              <span>{isAutoPlaying ? "⏸ Pause Tour" : "▶ Play Auto Tour"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Stage Card (Live Stage Theater in Electric Purple #473DEA) */}
        <div className="bg-[#473DEA] text-white rounded-[32px] p-6 sm:p-8 lg:p-10 mb-10 shadow-[0_25px_60px_-12px_rgba(71,61,234,0.45)] relative overflow-hidden border-2 border-white/20">
          {/* Ambient Glow */}
          <div
            className="absolute -right-20 -top-20 w-96 h-96 rounded-full blur-3xl opacity-35 transition-colors duration-700 pointer-events-none"
            style={{ backgroundColor: activeDay.color || "#DFFF00" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Interactive Story & Energy */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Active Day Pill & Badge */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="bg-[#DFFF00] text-[#18152B] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                    {activeDay.dayNumber} • {activeDay.day.toUpperCase()}
                  </span>
                  <span className="bg-white/15 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/25">
                    {activeDay.badge}
                  </span>
                </div>

                {/* Day Headline */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                  {activeDay.title}{" "}
                  <span className="text-[#DFFF00] block text-xl sm:text-2xl font-bold mt-1">
                    {activeDay.tagline}
                  </span>
                </h3>

                {/* Detailed Narrative */}
                <p className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed">
                  {activeDay.summary}
                </p>

                {/* Kids Quote Box (Authentic Excitement Callout) */}
                <div className="mt-5 p-4 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-md">
                  <p className="text-xs sm:text-sm text-[#DFFF00] font-semibold italic">
                    {activeDay.studentQuote}
                  </p>
                </div>
              </div>

              {/* Skills Built Today */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-white/75 uppercase tracking-wider mr-1">
                  Skills:
                </span>
                {activeDay.skillsLearned.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-white/15 text-white text-xs font-medium px-2.5 py-1 rounded-lg border border-white/25"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#DFFF00]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDayIndex((prev) =>
                        prev === 0 ? JOURNEY_DAYS.length - 1 : prev - 1
                      )
                    }
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/25"
                    aria-label="Previous day"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDayIndex((prev) => (prev + 1) % JOURNEY_DAYS.length)
                    }
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer border border-white/25"
                    aria-label="Next day"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-white/80 ml-2 font-mono">
                    {activeDayIndex + 1} of 5
                  </span>
                </div>

                {/* Video Experience Trigger */}
                <button
                  type="button"
                  onClick={onWatchVideo}
                  className="inline-flex items-center gap-2 bg-[#DFFF00] hover:bg-[#cbe600] active:scale-98 text-[#18152B] font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-lg transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Camp Video</span>
                </button>
              </div>
            </div>

            {/* Right Column: Visual Stage with Video Play Portal */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                <Image
                  src={activeDay.image}
                  alt={`${activeDay.day} creative action`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-104"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Vibe Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-md text-[#DFFF00] border border-white/20 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {activeDay.vibe}
                  </span>
                </div>

                {/* Center Video Play Action */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <button
                    type="button"
                    onClick={onWatchVideo}
                    className="relative group/btn w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#DFFF00] text-[#18152B] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer"
                    aria-label="Play full video preview"
                  >
                    {/* Animated Pulsing Ring */}
                    <span className="absolute inset-0 rounded-full bg-[#DFFF00]/40 animate-ping pointer-events-none" />
                    <Play className="w-8 h-8 fill-current ml-1 text-[#18152B] group-hover/btn:scale-110 transition-transform" />
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-white font-extrabold text-sm sm:text-base drop-shadow-md">
                      Watch a Week in Action
                    </p>
                    <p className="text-white/80 text-xs font-medium">
                      See kids build, laugh, and present
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Interactive Pipeline Track (Clickable Timeline Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
          {JOURNEY_DAYS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === activeDayIndex;

            return (
              <button
                key={item.day}
                type="button"
                onClick={() => {
                  setActiveDayIndex(idx);
                  setIsAutoPlaying(false);
                }}
                className={`text-left rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                  isActive
                    ? "bg-white border-2 border-[#5438DC] shadow-[0_12px_28px_rgba(84,56,220,0.18)] -translate-y-1.5"
                    : "bg-[#F7F6FC] hover:bg-white border border-[#E8E6F1] hover:border-[#5438DC]/40 hover:shadow-md"
                }`}
              >
                {/* Active Indicator Top Stripe */}
                {isActive && (
                  <div className="absolute -top-1.5 left-6 right-6 h-1 bg-[#5438DC] rounded-full shadow-xs" />
                )}

                <div>
                  {/* Day Tag & Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors ${
                        isActive
                          ? "bg-[#5438DC] text-white"
                          : "bg-white text-[#65617A] border border-[#E8E6F1]"
                      }`}
                    >
                      {item.day}
                    </span>

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-[#5438DC]/10 text-[#5438DC] scale-110"
                          : "bg-white/80 text-[#8C88A5] group-hover:text-[#5438DC]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Day Title & Tagline */}
                  <h4
                    className={`text-base font-extrabold tracking-tight transition-colors ${
                      isActive ? "text-[#5438DC]" : "text-[#18152B]"
                    }`}
                  >
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-[#65617A] line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>

                {/* Milestone Pill */}
                <div className="mt-4 pt-3 border-t border-[#F0EEF8] flex items-center justify-between text-[11px]">
                  <span
                    className={`font-bold transition-colors ${
                      isActive ? "text-[#5438DC]" : "text-[#8C88A5]"
                    }`}
                  >
                    {item.dayNumber}
                  </span>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#5438DC] bg-[#EEECFF] px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5438DC] animate-ping" />
                      Active
                    </span>
                  ) : (
                    <span className="text-[#8C88A5] group-hover:text-[#5438DC] font-medium flex items-center gap-0.5">
                      Explore <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="mt-6 text-xs text-center text-[#65617A]">
          *This interactive timeline models our 5-day camp sprint format. After-school programs follow our 12-week comprehensive semester curriculum.
        </p>
      </div>
    </section>
  );
}
