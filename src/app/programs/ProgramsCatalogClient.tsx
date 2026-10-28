"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Filter,
  X,
  Search,
  RotateCcw,
  GraduationCap,
  Hourglass,
  Layers,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import {
  AFTER_SCHOOL_PROGRAMS,
  DAY_CAMPS,
  SectionProgramItem,
} from "@/data/siteContent";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryModal } from "@/components/InquiryModal";

type FormatFilter = "all" | "after-school" | "camps";
type GradeFilter = "all" | "elementary" | "middle";
type DurationFilter = "all" | "12-weeks" | "sprint";
type LocationFilter = "all" | "in-person" | "virtual";

export function ProgramsCatalogClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse filter directly from URL query params
  const typeParam = searchParams.get("type");
  const gradeParam = searchParams.get("grade");
  const durationParam = searchParams.get("duration");

  const selectedFormat: FormatFilter = useMemo(() => {
    if (typeParam === "after-school" || typeParam === "enrichment") return "after-school";
    if (typeParam === "camps" || typeParam === "day-camp") return "camps";
    return "all";
  }, [typeParam]);

  const selectedGrade: GradeFilter = useMemo(() => {
    if (gradeParam === "elementary" || gradeParam === "k-5") return "elementary";
    if (gradeParam === "middle" || gradeParam === "6-8") return "middle";
    return "all";
  }, [gradeParam]);

  const selectedDuration: DurationFilter = useMemo(() => {
    if (durationParam === "12-weeks" || durationParam === "semester") return "12-weeks";
    if (durationParam === "sprint" || durationParam === "days") return "sprint";
    return "all";
  }, [durationParam]);

  const [selectedLocation, setSelectedLocation] = useState<LocationFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Inquiry modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryPrefill, setInquiryPrefill] = useState<Record<string, string>>({});

  // Combine all programs
  const allPrograms: SectionProgramItem[] = useMemo(() => {
    return [...AFTER_SCHOOL_PROGRAMS, ...DAY_CAMPS];
  }, []);

  // Filtered programs
  const filteredPrograms = useMemo(() => {
    return allPrograms.filter((program) => {
      // 1. Format / Category filter
      if (selectedFormat === "after-school" && program.category !== "after-school") {
        return false;
      }
      if (selectedFormat === "camps" && program.category !== "day-camp") {
        return false;
      }

      // 2. Grade filter
      if (selectedGrade === "elementary") {
        const g = program.grades.toLowerCase();
        const matchesElem =
          g.includes("k–5") ||
          g.includes("1–5") ||
          g.includes("2–6") ||
          g.includes("3–8") ||
          g.includes("4–8");
        if (!matchesElem) return false;
      } else if (selectedGrade === "middle") {
        const g = program.grades.toLowerCase();
        const matchesMiddle =
          g.includes("6–8") ||
          g.includes("4–8") ||
          g.includes("3–8") ||
          g.includes("2–6");
        if (!matchesMiddle) return false;
      }

      // 3. Duration filter
      if (selectedDuration === "12-weeks") {
        if (!program.classCount.toLowerCase().includes("12") && program.category !== "after-school") {
          return false;
        }
      } else if (selectedDuration === "sprint") {
        if (!program.classCount.toLowerCase().includes("day") && program.category !== "day-camp") {
          return false;
        }
      }

      // 4. Location filter
      if (selectedLocation === "virtual") {
        if (!program.title.toLowerCase().includes("virtual")) return false;
      } else if (selectedLocation === "in-person") {
        if (program.title.toLowerCase().includes("virtual")) return false;
      }

      // 5. Keyword Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesText =
          program.title.toLowerCase().includes(query) ||
          (program.description ? program.description.toLowerCase().includes(query) : false) ||
          program.grades.toLowerCase().includes(query) ||
          program.scheduleDays.toLowerCase().includes(query);
        if (!matchesText) return false;
      }

      return true;
    });
  }, [allPrograms, selectedFormat, selectedGrade, selectedDuration, selectedLocation, searchQuery]);

  // Handle filter changes and update URL cleanly
  const updateUrlParams = (format: FormatFilter, grade: GradeFilter, duration: DurationFilter) => {
    const params = new URLSearchParams();
    if (format !== "all") params.set("type", format);
    if (grade !== "all") params.set("grade", grade);
    if (duration !== "all") params.set("duration", duration);

    const newQuery = params.toString();
    const newUrl = newQuery ? `/programs?${newQuery}` : `/programs`;
    router.replace(newUrl, { scroll: false });
  };

  const handleFormatChange = (format: FormatFilter) => {
    updateUrlParams(format, selectedGrade, selectedDuration);
  };

  const handleGradeChange = (grade: GradeFilter) => {
    updateUrlParams(selectedFormat, grade, selectedDuration);
  };

  const handleDurationChange = (duration: DurationFilter) => {
    updateUrlParams(selectedFormat, selectedGrade, duration);
  };

  const handleResetFilters = () => {
    setSelectedLocation("all");
    setSearchQuery("");
    router.replace("/programs", { scroll: false });
  };

  const isAnyFilterActive =
    selectedFormat !== "all" ||
    selectedGrade !== "all" ||
    selectedDuration !== "all" ||
    selectedLocation !== "all" ||
    searchQuery.trim().length > 0;

  const handleEnrollClick = (program: SectionProgramItem) => {
    setInquiryPrefill({
      program: program.title,
      grade: program.grades,
    });
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FE]">
      {/* Header */}
      <Header />

      <main className="flex-1 pt-24 sm:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb Navigation */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/#programs"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#35309B] hover:text-[#473DEA] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <span className="text-xs font-semibold text-[#65617A]">
              Austin &amp; Lake Travis, TX + Live Virtual
            </span>
          </div>

          {/* 1. HERO BANNER WITH AUTHENTIC PICTURE OF CHILDREN HAVING FUN */}
          <div className="bg-gradient-to-br from-[#1F184A] via-[#18123B] to-[#2B1B69] rounded-3xl p-6 sm:p-8 lg:p-10 text-white relative overflow-hidden shadow-[0_16px_50px_rgba(31,24,74,0.18)] mb-8 sm:mb-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#473DEA]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#DFFF00]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Title, Subtitle & Highlights (lg: 7 cols) */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#DFFF00] text-[11px] font-extrabold uppercase tracking-wider mb-3 border border-white/15">
                  <Sparkles className="w-3 h-3 text-[#DFFF00]" />
                  <span>Creative Technology Cohort Catalog</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-3">
                  Explore All Programs &amp; Camps
                </h1>

                <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-xl mb-5">
                  Hands-on AI, game design, and creative technology cohorts for kids in grades K–8. Filter by grade level, program duration, or cohort format below:
                </p>

                {/* Quick Summary Badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/95 font-semibold">
                  <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                    ⚡ 12-Week Semesters
                  </span>
                  <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                    🏕️ 3–5 Day Break Sprints
                  </span>
                  <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                    🎯 Grades K–8
                  </span>
                  <span className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                    💡 Max 8 Students / Mentor
                  </span>
                </div>
              </div>

              {/* Right Column: Authentic Picture of Children Having Fun & Creating (lg: 5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[16/11] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-white/5 group">
                  <Image
                    src="/images/founder/actually_knows.JPG"
                    alt="Happy Kreators Lab students smiling together with mentor in studio"
                    fill
                    priority
                    className="object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                  {/* Overlaid Location & Ratio Badge */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#DFFF00]" />
                      <span>Austin &amp; Lake Travis Studios</span>
                    </span>
                    <span className="text-[11px] font-black text-[#DFFF00] bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/15">
                      1:8 Ratio
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SIDEBAR FILTER + CARDS GRID LAYOUT (Filters placed by the side of the cards, minimized width) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* LEFT SIDEBAR: FILTERS BESIDE THE CARDS (Minimized to lg:col-span-3) */}
            <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E5F3] shadow-[0_4px_24px_rgba(53,48,155,0.06)] p-4 sm:p-4.5 space-y-4">
                {/* Filter Header & Reset Button */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EEF8]">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#18152B]">
                    <Filter className="w-3.5 h-3.5 text-[#5438DC]" />
                    <span>Filter Cohorts</span>
                  </div>

                  {isAnyFilterActive && (
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-[11px] font-bold text-[#5438DC] hover:text-[#3820B3] inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Search Bar Input */}
                <div>
                  <label className="block text-[10px] font-bold text-[#55506E] uppercase tracking-wider mb-1">
                    Keyword Search
                  </label>
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-[#8A84A6] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Topic, day, or grade..."
                      className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-[#E3DFEE] bg-[#FAF9FE] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5438DC]/30 focus:border-[#5438DC] transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter 1: Program Format */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#55506E] mb-1.5 uppercase tracking-wide">
                    <Layers className="w-3 h-3 text-[#5438DC]" />
                    <span>Program Format</span>
                  </label>
                  <div className="flex flex-col gap-1">
                    {[
                      { key: "all", label: "All Programs" },
                      { key: "after-school", label: "After-School (12 Wks)" },
                      { key: "camps", label: "Break Camps (3–5 Days)" },
                    ].map((fmt) => (
                      <button
                        key={fmt.key}
                        type="button"
                        onClick={() => handleFormatChange(fmt.key as FormatFilter)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                          selectedFormat === fmt.key
                            ? "bg-[#35309B] text-white shadow-xs font-extrabold"
                            : "bg-[#F3F0FA] text-[#4E4870] hover:bg-[#EAE4F7]"
                        }`}
                      >
                        <span>{fmt.label}</span>
                        {selectedFormat === fmt.key && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#DFFF00]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 2: Grade Level */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#55506E] mb-1.5 uppercase tracking-wide">
                    <GraduationCap className="w-3 h-3 text-[#5438DC]" />
                    <span>Grade Level</span>
                  </label>
                  <div className="flex flex-col gap-1">
                    {[
                      { key: "all", label: "All Grades (K–8)" },
                      { key: "elementary", label: "Grades K–5 (Elem)" },
                      { key: "middle", label: "Grades 6–8 (Middle)" },
                    ].map((grd) => (
                      <button
                        key={grd.key}
                        type="button"
                        onClick={() => handleGradeChange(grd.key as GradeFilter)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                          selectedGrade === grd.key
                            ? "bg-[#35309B] text-white shadow-xs font-extrabold"
                            : "bg-[#F3F0FA] text-[#4E4870] hover:bg-[#EAE4F7]"
                        }`}
                      >
                        <span>{grd.label}</span>
                        {selectedGrade === grd.key && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#DFFF00]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 3: Duration Wise */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#55506E] mb-1.5 uppercase tracking-wide">
                    <Hourglass className="w-3 h-3 text-[#5438DC]" />
                    <span>Duration Wise</span>
                  </label>
                  <div className="flex flex-col gap-1">
                    {[
                      { key: "all", label: "All Durations" },
                      { key: "12-weeks", label: "12 Weeks (Semester)" },
                      { key: "sprint", label: "3–5 Days (Sprints)" },
                    ].map((dur) => (
                      <button
                        key={dur.key}
                        type="button"
                        onClick={() => handleDurationChange(dur.key as DurationFilter)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                          selectedDuration === dur.key
                            ? "bg-[#35309B] text-white shadow-xs font-extrabold"
                            : "bg-[#F3F0FA] text-[#4E4870] hover:bg-[#EAE4F7]"
                        }`}
                      >
                        <span>{dur.label}</span>
                        {selectedDuration === dur.key && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#DFFF00]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 4: Location Format */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#55506E] mb-1.5 uppercase tracking-wide">
                    <MapPin className="w-3 h-3 text-[#5438DC]" />
                    <span>Format Location</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { key: "all", label: "All" },
                      { key: "in-person", label: "Studio" },
                      { key: "virtual", label: "Virtual" },
                    ].map((loc) => (
                      <button
                        key={loc.key}
                        type="button"
                        onClick={() => setSelectedLocation(loc.key as LocationFilter)}
                        className={`text-[10px] py-1 rounded-md font-bold transition-all text-center cursor-pointer ${
                          selectedLocation === loc.key
                            ? "bg-[#5438DC] text-white shadow-xs"
                            : "bg-[#F3F0FA] text-[#4E4870] hover:bg-[#EAE4F7]"
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Contact Card */}
              <div className="bg-[#FAF9FE] rounded-2xl border border-[#E8E5F3] p-4 text-center">
                <p className="text-xs font-bold text-[#18152B] mb-0.5">
                  Need Schedule Advice?
                </p>
                <p className="text-[10px] text-[#65617A] mb-2.5 leading-snug">
                  Our Austin education director matches your child&apos;s grade and interest.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInquiryPrefill({
                      program: "Catalog Schedule Advisor Request",
                      grade: "Grades K–8",
                    });
                    setIsInquiryModalOpen(true);
                  }}
                  className="w-full py-1.5 px-3 text-[11px] font-extrabold rounded-lg bg-white border border-[#35309B]/20 text-[#35309B] hover:bg-[#35309B] hover:text-white transition-all shadow-2xs cursor-pointer"
                >
                  Request Advisor Callback
                </button>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT: PROGRAM CARDS BESIDE THE FILTERS (Expanded to lg:col-span-9) */}
            <section className="lg:col-span-9">
              {/* Results Top Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white rounded-2xl border border-[#E8E5F3] p-4 shadow-2xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-[#18152B]">
                    Showing {filteredPrograms.length} {filteredPrograms.length === 1 ? "Cohort" : "Cohorts"}
                  </span>

                  {isAnyFilterActive && (
                    <div className="flex flex-wrap items-center gap-1.5 ml-2">
                      {selectedFormat !== "all" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EDE8FA] text-[#35309B] text-[11px] font-bold">
                          {selectedFormat === "after-school" ? "After-School" : "Camps"}
                          <button
                            type="button"
                            onClick={() => handleFormatChange("all")}
                            className="hover:text-black cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {selectedGrade !== "all" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EDE8FA] text-[#35309B] text-[11px] font-bold">
                          {selectedGrade === "elementary" ? "Grades K–5" : "Grades 6–8"}
                          <button
                            type="button"
                            onClick={() => handleGradeChange("all")}
                            className="hover:text-black cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {selectedDuration !== "all" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EDE8FA] text-[#35309B] text-[11px] font-bold">
                          {selectedDuration === "12-weeks" ? "12 Weeks" : "3–5 Days"}
                          <button
                            type="button"
                            onClick={() => handleDurationChange("all")}
                            className="hover:text-black cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}

                      {searchQuery && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EDE8FA] text-[#35309B] text-[11px] font-bold">
                          &quot;{searchQuery}&quot;
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="hover:text-black cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {isAnyFilterActive && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-[#5438DC] hover:text-[#3820B3] inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear Filters</span>
                  </button>
                )}
              </div>

              {/* Program Cards Grid (2 columns beside sidebar) */}
              {filteredPrograms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {filteredPrograms.map((program) => {
                    const isCamp =
                      program.category === "day-camp" ||
                      program.title.toLowerCase().includes("camp");
                    const isMiddle =
                      program.grades.includes("6–8") ||
                      program.grades.includes("6-8") ||
                      program.title.toLowerCase().includes("middle");

                    const theme = isCamp
                      ? {
                          bgGradient: "from-[#F0F8FF] via-[#E1F3FE] to-[#F5FAFF]",
                          border: "border-[#CFE9FC]",
                          badgeText: "text-[#0A568C]",
                          accentDot: "bg-[#0284C7]",
                          badgeLabel: "School Break Camp",
                          glowColor: "rgba(2, 132, 199, 0.10)",
                        }
                      : isMiddle
                      ? {
                          bgGradient: "from-[#F4F0FE] via-[#E8DDFD] to-[#FAF8FF]",
                          border: "border-[#DFD2FA]",
                          badgeText: "text-[#40209C]",
                          accentDot: "bg-[#6D3DF2]",
                          badgeLabel: "Middle School Studio",
                          glowColor: "rgba(109, 61, 242, 0.10)",
                        }
                      : {
                          bgGradient: "from-[#F6FCEB] via-[#EAF7D3] to-[#F1FCE4]",
                          border: "border-[#D7EBB2]",
                          badgeText: "text-[#365011]",
                          accentDot: "bg-[#70B01D]",
                          badgeLabel: "Elementary Studio",
                          glowColor: "rgba(112, 176, 29, 0.10)",
                        };

                    return (
                      <article
                        key={program.id}
                        className={`group relative h-full flex flex-col justify-between rounded-[32px] sm:rounded-[36px] bg-gradient-to-br ${theme.bgGradient} border ${theme.border} p-5 sm:p-6 shadow-[0_10px_30px_rgba(53,48,155,0.05)] hover:shadow-[0_20px_45px_rgba(53,48,155,0.13)] transition-all duration-400 hover:-translate-y-2 overflow-hidden`}
                        style={{
                          boxShadow: `0 12px 35px -8px ${theme.glowColor}`,
                        }}
                        aria-label={`${program.title} cohort card`}
                      >
                        <div>
                          {/* 1. TOP ROW: Category Capsule Badge & Savings Indicator */}
                          <div className="flex items-center justify-between gap-2 mb-3 z-10">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 ${theme.badgeText} text-xs font-black shadow-xs border border-white/80 backdrop-blur-md`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${theme.accentDot}`}
                              />
                              <span>{theme.badgeLabel}</span>
                            </span>

                            {program.savingsBadge ? (
                              <span className="px-3 py-1 rounded-full bg-[#18152B] text-[#DFFF00] text-xs font-black shadow-2xs">
                                {program.savingsBadge}
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full bg-white/85 text-[#18152B] text-xs font-bold border border-white/60 shadow-2xs">
                                {program.grades}
                              </span>
                            )}
                          </div>

                          {/* 2. PROMINENT TYPOGRAPHY: Left-aligned bold title & details */}
                          <div className="mb-4 z-10">
                            <Link href={`/programs/${program.id}`}>
                              <h2 className="text-xl sm:text-2xl font-black text-[#18152B] tracking-tight leading-snug group-hover:text-[#35309B] transition-colors mb-1.5 line-clamp-2 hover:underline">
                                {program.title}
                              </h2>
                            </Link>

                            <p className="text-xs sm:text-sm text-[#4E4870] font-medium line-clamp-2 leading-relaxed mb-3">
                              {program.description}
                            </p>

                            {/* Clean Rounded Schedule Pills */}
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-[#18152B]">
                              <span className="bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/70 shadow-2xs">
                                {program.grades}
                              </span>
                              <span className="bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/70 shadow-2xs">
                                {program.scheduleDays}
                              </span>
                              <span className="bg-white/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/70 shadow-2xs">
                                {program.classCount}
                              </span>
                            </div>
                          </div>

                          {/* 3. CENTER HERO IMAGE / INTERACTIVE FRAME */}
                          <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#18123B] shadow-md border-2 border-white/90 mb-5 group/img">
                            <Image
                              src={program.image}
                              alt={`${program.title} session preview`}
                              fill
                              className="object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                            {/* Overlaid Date Range Pill */}
                            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                                <Calendar className="w-3 h-3 text-[#DFFF00]" />
                                <span>{program.dateRange}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 4. SIGNATURE FLOATING FROSTED GLASS BOTTOM BAR */}
                        <div className="bg-white/90 backdrop-blur-md rounded-full p-2 pl-4 sm:pl-5 pr-2 flex items-center justify-between border border-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] z-10">
                          <div className="flex flex-col min-w-0 pr-2">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl sm:text-2xl font-black text-[#18152B] tracking-tight">
                                {program.promoPrice}
                              </span>
                              <span className="text-xs text-[#8A84A6] line-through font-bold">
                                {program.regularPrice}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold text-[#65617A] uppercase tracking-wider leading-none">
                              Tuition (1:8 Ratio)
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <Link
                              href={`/programs/${program.id}`}
                              className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF9FE] text-[#18152B] border border-[#18152B]/10 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xs"
                              title="View Curriculum"
                            >
                              <ArrowUpRight className="w-4 h-4 text-[#18152B]" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleEnrollClick(program)}
                              className="h-10 px-4 rounded-full bg-[#18152B] hover:bg-[#35309B] text-white font-black text-xs inline-flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer group/btn"
                            >
                              <span>{program.ctaText}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00] group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="bg-white rounded-3xl border border-[#E8E5F3] p-12 text-center max-w-lg mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#EEECFF] text-[#5438DC] flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-[#18152B] mb-2">
                    No Programs Found
                  </h3>
                  <p className="text-xs sm:text-sm text-[#65617A] mb-5">
                    We couldn&apos;t find any cohorts matching your selected filters. Try broadening your criteria or reset filters.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#35309B] text-white text-xs font-extrabold hover:bg-[#473DEA] transition-all cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Need Custom Cohort Help Footer */}
          <div className="mt-14 bg-[#EEECFF]/60 rounded-3xl border border-[#35309B]/15 p-6 text-center max-w-2xl mx-auto">
            <h3 className="text-sm font-extrabold text-[#18152B] mb-1">
              Need a Custom Schedule or Private Pod Cohort?
            </h3>
            <p className="text-xs text-[#55506E] mb-3">
              We create tailored schedules for homeschool co-ops, private school cohorts, and neighborhood groups in Austin &amp; Lake Travis.
            </p>
            <button
              type="button"
              onClick={() => {
                setInquiryPrefill({
                  program: "Custom Cohort / Private Pod Request",
                  grade: "Grades K–8",
                });
                setIsInquiryModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#35309B] text-white text-xs font-extrabold hover:bg-[#473DEA] transition-all cursor-pointer shadow-xs"
            >
              <span>Inquire for Custom Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        prefilled={inquiryPrefill}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
