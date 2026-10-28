"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Camera,
  Play,
  RotateCcw,
  Search,
  Filter,
  Check,
  ChevronDown,
  Layers,
  GraduationCap,
  Calendar,
  ArrowLeft,
  X,
  Maximize2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import {
  GALLERY_ITEMS,
  GRADE_FILTER_OPTIONS,
  PROGRAM_FILTER_OPTIONS,
  GalleryMediaItem,
  GradeLevel,
  ProgramCategory,
} from "@/data/galleryData";

export function GalleryCatalogClient() {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>("All Grades");
  const [selectedProgram, setSelectedProgram] = useState<ProgramCategory>("All Programs");
  const [mediaTypeFilter, setMediaTypeFilter] = useState<"all" | "photo" | "video">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // Lightbox state
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryMediaItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Filtered gallery items
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      // Grade filter
      if (selectedGrade !== "All Grades") {
        if (item.gradeLevel !== selectedGrade && !item.gradeBadge.includes(selectedGrade.replace("Grade ", ""))) {
          return false;
        }
      }

      // Program filter
      if (selectedProgram !== "All Programs") {
        if (item.category !== selectedProgram) {
          return false;
        }
      }

      // Media type filter
      if (mediaTypeFilter !== "all" && item.type !== mediaTypeFilter) {
        return false;
      }

      // Keyword search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCaption = item.caption.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesGrade = item.gradeLevel.toLowerCase().includes(query) || item.gradeBadge.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCaption && !matchesCategory && !matchesGrade) {
          return false;
        }
      }

      return true;
    });
  }, [selectedGrade, selectedProgram, mediaTypeFilter, searchQuery]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleResetFilters = () => {
    setSelectedGrade("All Grades");
    setSelectedProgram("All Programs");
    setMediaTypeFilter("all");
    setSearchQuery("");
    setVisibleCount(12);
  };

  const handleOpenLightbox = (item: GalleryMediaItem) => {
    setActiveLightboxItem(item);
    setIsLightboxOpen(true);
  };

  const handleSelectLightboxIndex = (idx: number) => {
    if (idx >= 0 && idx < filteredItems.length) {
      setActiveLightboxItem(filteredItems[idx]);
    }
  };

  const hasActiveFilters =
    selectedGrade !== "All Grades" ||
    selectedProgram !== "All Programs" ||
    mediaTypeFilter !== "all" ||
    searchQuery.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FE]">
      {/* 1. Header with Gallery active */}
      <Header />

      <main className="flex-1 pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Back Nav */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#35309B] hover:text-[#473DEA] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <span className="text-xs text-[#65617A] font-semibold hidden sm:inline">
              Austin &amp; Lake Travis Studios + Virtual Cohorts
            </span>
          </div>

          {/* Hero Banner Header (Title ONLY - No Subtitle) */}
          <div className="bg-gradient-to-br from-[#1F184A] via-[#2A2368] to-[#18123B] rounded-3xl sm:rounded-4xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden mb-8 sm:mb-10 border border-[#473DEA]/30">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#473DEA]/25 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-[#DFFF00]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#DFFF00] text-xs font-bold uppercase tracking-wider mb-3 border border-white/15 backdrop-blur-md">
                <Camera className="w-3.5 h-3.5 text-[#DFFF00]" />
                <span>Kreators Lab Media Gallery</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Moments of Discovery, Creation &amp; Celebration
              </h1>

              {/* Status Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 text-xs text-white/90">
                <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md font-bold">
                  ✨ 18+ Authentic Moments
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md font-bold">
                  🎒 Grades K–12
                </span>
                <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md font-bold">
                  🏕️ Summer &amp; Break Camps
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* Interactive Filters Bar (All in 1 Row)                    */}
          {/* ========================================================= */}
          <div className="bg-white rounded-3xl lg:rounded-full border border-[#E4E0F4] shadow-xs p-3 sm:p-3.5 mb-8 sm:mb-10">
            {/* Unified 1-Row Filter Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 sm:gap-3">
              {/* 1. Search Bar */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-[#65617A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search moments, topics, games, or camps..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#FAF9FE] border border-[#E4E0F4] text-xs sm:text-sm text-[#18152B] placeholder:text-[#65617A] focus:outline-none focus:ring-2 focus:ring-[#35309B] focus:bg-white transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#65617A] hover:text-[#18152B]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* 2. Filter by Program or Event: Dropdown */}
              <div className="relative w-full lg:w-auto lg:min-w-[195px]">
                <select
                  id="program-category-select"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value as ProgramCategory)}
                  aria-label="Filter by Program or Event"
                  className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-full bg-[#FAF9FE] hover:bg-white border border-[#E4E0F4] hover:border-[#35309B] focus:border-[#35309B] text-xs sm:text-sm font-bold text-[#18152B] focus:outline-none focus:ring-2 focus:ring-[#35309B]/20 transition-all cursor-pointer shadow-2xs"
                >
                  {PROGRAM_FILTER_OPTIONS.map((prog) => (
                    <option key={prog} value={prog} className="text-[#18152B] font-medium py-1">
                      {prog === "All Programs" ? "🎪 All Programs & Events" : prog}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#35309B]">
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* 3. Filter by Grade Level: Dropdown */}
              <div className="relative w-full lg:w-auto lg:min-w-[175px]">
                <select
                  id="grade-level-select"
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value as GradeLevel)}
                  aria-label="Filter by Grade Level"
                  className="w-full appearance-none pl-4 pr-9 py-2.5 rounded-full bg-[#FAF9FE] hover:bg-white border border-[#E4E0F4] hover:border-[#35309B] focus:border-[#35309B] text-xs sm:text-sm font-bold text-[#18152B] focus:outline-none focus:ring-2 focus:ring-[#35309B]/20 transition-all cursor-pointer shadow-2xs"
                >
                  {GRADE_FILTER_OPTIONS.map((grade) => (
                    <option key={grade} value={grade} className="text-[#18152B] font-medium py-1">
                      {grade === "All Grades" ? "🎓 All Grades (K–12)" : grade}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#35309B]">
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* 4. Type Switcher (All / Photos / Videos) */}
              <div className="inline-flex items-center p-1 rounded-full bg-[#FAF9FE] border border-[#E4E0F4] shrink-0 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => setMediaTypeFilter("all")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    mediaTypeFilter === "all"
                      ? "bg-[#35309B] text-white shadow-2xs"
                      : "text-[#65617A] hover:text-[#18152B]"
                  }`}
                >
                  All Media
                </button>
                <button
                  type="button"
                  onClick={() => setMediaTypeFilter("photo")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    mediaTypeFilter === "photo"
                      ? "bg-[#35309B] text-white shadow-2xs"
                      : "text-[#65617A] hover:text-[#18152B]"
                  }`}
                >
                  Photos
                </button>
                <button
                  type="button"
                  onClick={() => setMediaTypeFilter("video")}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    mediaTypeFilter === "video"
                      ? "bg-[#35309B] text-white shadow-2xs"
                      : "text-[#65617A] hover:text-[#18152B]"
                  }`}
                >
                  Videos
                </button>
              </div>
            </div>

            {/* Active Filters Row (only shown when filters/search are active) */}
            {hasActiveFilters && (
              <div className="pt-2.5 mt-2.5 border-t border-[#F0EEF8] flex flex-wrap items-center justify-between gap-3 text-xs px-2">
                <div className="flex flex-wrap items-center gap-2 text-[#55506E]">
                  <span className="font-semibold">
                    Showing <strong className="text-[#18152B]">{filteredItems.length}</strong> moments
                  </span>

                  {selectedProgram !== "All Programs" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EEECFF] text-[#35309B] font-bold">
                      <span>{selectedProgram}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedProgram("All Programs")}
                        className="hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  {selectedGrade !== "All Grades" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DFFF00]/60 text-[#18152B] font-bold">
                      <span>{selectedGrade}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedGrade("All Grades")}
                        className="hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  )}

                  {mediaTypeFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F0EEF8] text-[#18152B] font-bold">
                      <span>{mediaTypeFilter === "photo" ? "Photos Only" : "Videos Only"}</span>
                      <button
                        type="button"
                        onClick={() => setMediaTypeFilter("all")}
                        className="hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-[#35309B] hover:text-[#473DEA] font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
          {/* ========================================================= */}
          {/* Main Media Grid (Asymmetric Editorial Mixed-Size Layout) */}
          {/* ========================================================= */}
          {filteredItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 auto-rows-[170px] sm:auto-rows-[200px] md:auto-rows-[230px] lg:auto-rows-[260px] grid-flow-dense">
                {displayedItems.map((item, index) => {
                  let size = item.bentoSize;
                  if (!size) {
                    const mod = index % 6;
                    if (mod === 0) size = "featured";
                    else if (mod === 1) size = "tall";
                    else if (mod === 2) size = "wide";
                    else if (mod === 3) size = "standard";
                    else if (mod === 4) size = "tall";
                    else size = "standard";
                  }

                  let spanClasses = "col-span-1 md:col-span-1 row-span-1";
                  let isFeatured = false;
                  let isWide = false;
                  let isTall = false;

                  if (filteredItems.length === 1) {
                    spanClasses = "col-span-2 md:col-span-3 row-span-2";
                    isFeatured = true;
                  } else if (filteredItems.length === 2) {
                    if (index === 0) {
                      spanClasses = "col-span-2 md:col-span-2 row-span-2";
                      isFeatured = true;
                    } else {
                      spanClasses = "col-span-2 md:col-span-1 row-span-2";
                      isTall = true;
                    }
                  } else {
                    switch (size) {
                      case "featured":
                        spanClasses = "col-span-2 md:col-span-2 row-span-2";
                        isFeatured = true;
                        break;
                      case "tall":
                        spanClasses = "col-span-1 md:col-span-1 row-span-2";
                        isTall = true;
                        break;
                      case "wide":
                        spanClasses = "col-span-2 md:col-span-2 row-span-1";
                        isWide = true;
                        break;
                      case "standard":
                      case "square":
                      default:
                        spanClasses = "col-span-1 md:col-span-1 row-span-1";
                        break;
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleOpenLightbox(item)}
                      className={`group relative rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-[#18123B] border-2 border-[#35309B]/15 hover:border-[#35309B] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between p-3.5 sm:p-5 lg:p-6 ${spanClasses}`}
                    >
                      {/* Background Image / Thumbnail with smooth zoom on hover */}
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        sizes={
                          isFeatured
                            ? "(max-width: 768px) 100vw, 66vw"
                            : isWide
                            ? "(max-width: 768px) 100vw, 66vw"
                            : "(max-width: 768px) 50vw, 33vw"
                        }
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:from-black/95 transition-colors" />

                      {/* Top Bar for Badges, Dates & Hover Expand Indicator */}
                      <div className="relative z-10 mb-auto flex items-center justify-between gap-1.5">
                        {item.type === "video" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#18123B]/85 text-[#DFFF00] text-[10px] sm:text-xs font-black border border-white/20 backdrop-blur-md shadow-sm">
                            <Play className="w-3 h-3 fill-current" />
                            <span>Video Demo</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/50 text-white text-[10px] sm:text-xs font-bold border border-white/20 backdrop-blur-md">
                            <Camera className="w-3 h-3 text-[#DFFF00]" />
                            <span>Photo</span>
                          </span>
                        )}

                        <div className="flex items-center gap-1.5">
                          {item.date && (
                            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/40 text-white/80 text-[10px] sm:text-[11px] font-semibold border border-white/10 backdrop-blur-md">
                              {item.date}
                            </span>
                          )}

                          <div
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#18123B] flex items-center justify-center backdrop-blur-md border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-200 shrink-0"
                            title="Open full-screen viewer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Center Play Button for Videos */}
                      {item.type === "video" && (
                        <div className="relative z-10 flex items-center justify-center my-auto py-2">
                          <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-[#35309B]/40 animate-ping opacity-60" />
                            <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#35309B]/90 group-hover:bg-[#473DEA] text-white flex items-center justify-center backdrop-blur-md border-2 border-white/40 shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                              <Play className="w-4 h-4 sm:w-6 sm:h-6 fill-[#DFFF00] text-[#DFFF00] ml-0.5" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Info: Tag Pills & Title & Caption (on featured) */}
                      <div className="relative z-10 space-y-1.5 sm:space-y-2 mt-auto pt-2">
                        {/* Tag Pills as requested: K-12, Summer Camp, Grade tags in rounded shapes */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 text-[#18152B] text-[10px] sm:text-xs font-black shadow-xs">
                            {item.category}
                          </span>

                          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#18123B]/85 text-[#DFFF00] text-[10px] sm:text-xs font-bold border border-white/20 backdrop-blur-md">
                            {item.gradeBadge}
                          </span>
                        </div>

                        <h3
                          className={`font-black text-white drop-shadow-md leading-snug line-clamp-2 ${
                            isFeatured
                              ? "text-sm sm:text-lg lg:text-xl"
                              : isWide
                              ? "text-xs sm:text-base lg:text-lg"
                              : "text-xs sm:text-sm lg:text-base"
                          }`}
                        >
                          {item.title}
                        </h3>

                        {/* Description / Caption snippet for Featured Cards */}
                        {isFeatured && item.caption && (
                          <p className="text-white/80 line-clamp-2 text-xs sm:text-sm font-medium leading-relaxed hidden sm:block pt-0.5">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Load More Button */}
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF9FE] text-[#35309B] text-sm font-extrabold px-8 py-3.5 rounded-full border-2 border-[#35309B]/30 hover:border-[#35309B] shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span>Load More Moments</span>
                    <ChevronDown className="w-4 h-4 text-[#35309B]" />
                  </button>
                  <p className="mt-2 text-xs text-[#65617A]">
                    Showing {displayedItems.length} of {filteredItems.length} total media items
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E4E0F4] shadow-xs max-w-xl mx-auto my-12">
              <div className="w-14 h-14 rounded-full bg-[#EEECFF] text-[#35309B] flex items-center justify-center mx-auto mb-4">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-[#18152B] mb-2">
                No Media Found Matching Your Filter
              </h3>
              <p className="text-xs sm:text-sm text-[#55506E] mb-6">
                Try selecting &quot;All Grades&quot; or &quot;All Programs&quot; to see all available photos and video demonstrations.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#DFFF00]" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* Interactive Lightbox Viewer */}
      <GalleryLightbox
        item={activeLightboxItem}
        items={filteredItems}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectIndex={handleSelectLightboxIndex}
      />
    </div>
  );
}

