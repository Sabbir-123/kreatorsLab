"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Search,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface ProgramFinderProps {
  onOpenInquiry?: (prefilled?: Record<string, string>) => void;
}

// 1. Child's Grade Level options from reference screenshot
const GRADE_OPTIONS = [
  { id: "all", label: "All Grades" },
  { id: "k-5", label: "Grades K–5" },
  { id: "6-8", label: "Grades 6–8" },
  { id: "camps", label: "Break Camps" },
] as const;

// 2. Area of Creative Interest options from reference screenshot
const INTEREST_OPTIONS = [
  { id: "all", label: "Open to Explore" },
  { id: "game", label: "Game Design" },
  { id: "stories", label: "Interactive Stories" },
  { id: "ai", label: "AI & Logic Systems" },
  { id: "making", label: "Creative Making" },
  { id: "beginner", label: "Curious Beginner" },
] as const;

// 3. Preferred Learning Format options from reference screenshot
const FORMAT_OPTIONS = [
  { id: "all", label: "Any Format" },
  { id: "studio", label: "In-Person Studio" },
  { id: "camp", label: "Camp Week" },
  { id: "homeschool", label: "Homeschool / Online" },
] as const;

// Authentic Studio Photos Carousel (human childs having fun in studio)
const STUDIO_CAROUSEL_IMAGES = [
  {
    src: "/images/founder/gallary1.JPG",
    alt: "Young students smiling and coding robotics in the lab",
    title: "Hands-on Maker Sessions",
    tag: "Austin & Lake Travis Studio",
  },
  {
    src: "/images/hero/building-laptop.jpg",
    alt: "Happy student building game mechanics with guided AI",
    title: "Creative Block Code & Logic",
    tag: "Grades K–5 Elementary",
  },
  {
    src: "/images/programs/thanksgiving-camp.jpg",
    alt: "Children collaborating and having fun during break camp",
    title: "Holiday Camp Game Sprints",
    tag: "Thanksgiving & Summer Camps",
  },
  {
    src: "/images/founder/camp.JPG",
    alt: "Summer camp cohort collaborating around the maker table",
    title: "Small Cohorts: 8 Students / Mentor",
    tag: "Welcoming & Engaging",
  },
  {
    src: "/images/students/collaborative-learning.jpg",
    alt: "Students sharing creative ideas and laughing together",
    title: "Peer Collaboration & Fun",
    tag: "All Skill Levels Welcome",
  },
];

interface ProgramCardData {
  id: string;
  gradeLabel: string;
  badge: string;
  title: string;
  description: string;
  gradeCategory: "k-5" | "6-8" | "camps" | "all";
  interestCategory: "game" | "stories" | "ai" | "making" | "beginner" | "all";
  formatCategory: "studio" | "camp" | "homeschool" | "all";
}

const ALL_PROGRAMS: ProgramCardData[] = [
  {
    id: "prog-elem",
    gradeLabel: "Grades K–5",
    badge: "Currently Enrolling",
    title: "Elementary Programs",
    description: "An inviting introduction to AI and creative technology through age-appropriate guided projects.",
    gradeCategory: "k-5",
    interestCategory: "beginner",
    formatCategory: "studio",
  },
  {
    id: "prog-middle",
    gradeLabel: "Grades 6–8",
    badge: "Currently Enrolling",
    title: "Middle School Programs",
    description: "Students explore more involved projects while practicing design, problem-solving, and independent thinking.",
    gradeCategory: "6-8",
    interestCategory: "game",
    formatCategory: "studio",
  },
  {
    id: "prog-camps",
    gradeLabel: "Elementary & Middle School",
    badge: "Seasonal Schedules",
    title: "Break Camps",
    description: "Dynamic 3–5 day immersive maker camps during Thanksgiving, Spring, and Summer breaks.",
    gradeCategory: "camps",
    interestCategory: "making",
    formatCategory: "camp",
  },
  {
    id: "prog-homeschool",
    gradeLabel: "Grades K–8",
    badge: "Flexible Schedule",
    title: "Homeschool & Virtual Labs",
    description: "Small-group live labs and daytime sessions designed for self-paced creators and homeschool schedules.",
    gradeCategory: "all",
    interestCategory: "ai",
    formatCategory: "homeschool",
  },
];

export function ProgramFinder({ onOpenInquiry }: ProgramFinderProps) {
  // Selected filter states
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedInterest, setSelectedInterest] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");

  // Picture Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Lead Form inputs
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-advance picture carousel every 4 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % STUDIO_CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + STUDIO_CAROUSEL_IMAGES.length) % STUDIO_CAROUSEL_IMAGES.length);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % STUDIO_CAROUSEL_IMAGES.length);
  };

  // Filter matching programs
  const matchingPrograms = useMemo(() => {
    return ALL_PROGRAMS.filter((prog) => {
      if (selectedGrade !== "all") {
        if (selectedGrade === "camps" && prog.gradeCategory !== "camps") return false;
        if (selectedGrade === "k-5" && prog.gradeCategory !== "k-5" && prog.gradeCategory !== "all") return false;
        if (selectedGrade === "6-8" && prog.gradeCategory !== "6-8" && prog.gradeCategory !== "all") return false;
      }

      if (selectedFormat !== "all") {
        if (selectedFormat === "camp" && prog.formatCategory !== "camp") return false;
        if (selectedFormat === "studio" && prog.formatCategory !== "studio" && prog.formatCategory !== "all") return false;
        if (selectedFormat === "homeschool" && prog.formatCategory !== "homeschool" && prog.formatCategory !== "all") return false;
      }

      return true;
    });
  }, [selectedGrade, selectedFormat]);

  // Handle lead submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!parentName.trim() || !parentEmail.trim()) {
      setErrorMessage("Please enter both parent's name and email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: parentName.trim(),
          email: parentEmail.trim(),
          grade: selectedGrade === "all" ? "All Grades" : selectedGrade,
          interest: selectedInterest === "all" ? "Open to Explore" : selectedInterest,
          learningFormat: selectedFormat === "all" ? "Any Format" : selectedFormat,
        }),
      });

      if (!res.ok) throw new Error("Could not submit inquiry. Please try again.");

      trackEvent("parent_inquiry_submit", { category: "contact_matching_section" });
      setSubmissionSuccess(true);
      setParentName("");
      setParentEmail("");
    } catch {
      setErrorMessage("Unable to submit right now. Please try again or email hello@kreatorslab.ai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInquireProgram = (progTitle: string) => {
    if (onOpenInquiry) {
      onOpenInquiry({ program: progTitle });
    } else {
      const el = document.getElementById("advisor-form");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-[#FAF9FE] border-t border-[#E8E6F1] relative overflow-hidden"
      aria-label="Contact and Program Matching Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Header, Carousel & Interactive Filters       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badge (Ref: YOUR CHILD'S NEXT CREATIVE STEP) */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold uppercase tracking-wider mb-3.5 border border-[#35309B]/15 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#35309B]" />
                <span>YOUR CHILD&apos;S NEXT CREATIVE STEP</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18152B] tracking-tight leading-tight">
                Not Sure Where to Begin?
              </h2>
            </div>

            {/* ========================================================= */}
            {/* SIDE-BY-SIDE: CAROUSEL (HALF WIDTH) + GRADE & INTEREST     */}
            {/* ========================================================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start">
              {/* Picture Carousel (Half width) */}
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#18123B] border border-[#35309B]/15 shadow-md group"
              >
                {STUDIO_CAROUSEL_IMAGES.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Top Location Pill */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#18123B]/85 text-[#DFFF00] text-[11px] font-bold border border-white/20 backdrop-blur-md">
                        {img.tag}
                      </span>
                    </div>

                    {/* Bottom Caption Title */}
                    <div className="absolute bottom-3 left-3 right-12 z-20 text-white">
                      <p className="text-xs sm:text-sm font-black drop-shadow-sm line-clamp-1">
                        {img.title}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Prev / Next Navigation Arrows */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/60 hover:bg-[#35309B] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-md"
                  aria-label="Previous studio picture"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/60 hover:bg-[#35309B] text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-md"
                  aria-label="Next studio picture"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Indicator Dots */}
                <div className="absolute bottom-2.5 right-2.5 z-30 flex items-center gap-1">
                  {STUDIO_CAROUSEL_IMAGES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveSlide(dotIdx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeSlide === dotIdx ? "w-3 bg-[#DFFF00]" : "w-1.5 bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Filters Beside Carousel: Grade Level & Creative Interest */}
              <div className="space-y-4">
                {/* Filter 1: CHILD'S GRADE LEVEL */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#18152B] mb-2">
                    CHILD&apos;S GRADE LEVEL
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {GRADE_OPTIONS.map((opt) => {
                      const isSelected = selectedGrade === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedGrade(opt.id)}
                          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#2E2882] text-white shadow-xs scale-102"
                              : "bg-white hover:bg-[#F9F8FE] text-[#18152B] border border-gray-200 hover:border-[#35309B]/40"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filter 2: AREA OF CREATIVE INTEREST */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#18152B] mb-2">
                    AREA OF CREATIVE INTEREST
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {INTEREST_OPTIONS.map((opt) => {
                      const isSelected = selectedInterest === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedInterest(opt.id)}
                          className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#2E2882] text-white shadow-xs scale-102"
                              : "bg-white hover:bg-[#F9F8FE] text-[#18152B] border border-gray-200 hover:border-[#35309B]/40"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Filter 3: PREFERRED LEARNING FORMAT (Spans below the side-by-side row) */}
            <div className="pt-1">
              <label className="block text-xs font-black uppercase tracking-wider text-[#18152B] mb-2">
                PREFERRED LEARNING FORMAT
              </label>
              <div className="flex flex-wrap gap-2">
                {FORMAT_OPTIONS.map((opt) => {
                  const isSelected = selectedFormat === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedFormat(opt.id)}
                      className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#2E2882] text-white shadow-xs scale-102"
                          : "bg-white hover:bg-[#F9F8FE] text-[#18152B] border border-gray-200 hover:border-[#35309B]/40"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons at bottom of left column */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("advisor-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-[#2E2882] hover:bg-[#231E68] text-white text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Find Your Child&apos;s Program</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenInquiry && onOpenInquiry({ program: "General Creative Question" })}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F9F8FE] text-[#18152B] border border-gray-200 hover:border-[#35309B]/40 text-xs sm:text-sm font-extrabold px-6 py-3 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#35309B]" />
                <span>Ask Us a Question</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Matching Programs Card + Advisor Form       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-gray-100 space-y-5">
              {/* Header Bar: MATCHING PROGRAMS (4) / Lake Travis / Austin */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F0EEF8]">
                <span className="text-xs font-black uppercase tracking-wider text-[#1E40AF]">
                  MATCHING PROGRAMS ({matchingPrograms.length})
                </span>
                <span className="text-xs text-[#65617A] font-semibold">
                  Lake Travis / Austin
                </span>
              </div>

              {/* Scrollable list of program cards */}
              <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                {matchingPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 rounded-2xl bg-white border border-[#E8E6F1] hover:border-[#35309B]/40 hover:shadow-xs transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1E40AF]">
                        {prog.gradeLabel}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FAF9FE] text-[#18152B] text-[10px] font-bold border border-gray-200">
                        {prog.badge}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-[#18152B] group-hover:text-[#35309B] transition-colors">
                      {prog.title}
                    </h4>

                    <p className="text-xs text-[#55506E] leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-xs border-t border-[#F0EEF8]/60">
                      <span className="text-[11px] text-[#65617A] font-medium">
                        Active Cohorts
                      </span>
                      <button
                        type="button"
                        onClick={() => handleInquireProgram(prog.title)}
                        className="inline-flex items-center gap-1 font-bold text-[#35309B] hover:text-[#473DEA] transition-colors cursor-pointer"
                      >
                        <span>Inquire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Section */}
              <div id="advisor-form" className="pt-3 border-t border-[#F0EEF8] space-y-3">
                <p className="text-xs font-bold text-[#18152B]">
                  Request cohort schedules directly from an advisor:
                </p>

                {submissionSuccess ? (
                  <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-1.5 animate-fade-in">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-black text-[#065F46]">
                      Thank you! An advisor will reach out shortly.
                    </p>
                    <p className="text-[11px] text-[#065F46]/80">
                      We will share the recommended cohort schedules for your child.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmissionSuccess(false)}
                      className="text-[11px] font-bold text-[#065F46] underline mt-1 cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                    <div>
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Parent's Name"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF9FE] focus:bg-white text-xs sm:text-sm text-[#18152B] placeholder:text-[#65617A] focus:outline-none focus:border-[#35309B] transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        placeholder="Parent's Email Address"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-[#FAF9FE] focus:bg-white text-xs sm:text-sm text-[#18152B] placeholder:text-[#65617A] focus:outline-none focus:border-[#35309B] transition-all"
                      />
                    </div>

                    {errorMessage && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#18152B] hover:bg-[#2E2882] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#DFFF00]" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <span>Send Parent Inquiry</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
