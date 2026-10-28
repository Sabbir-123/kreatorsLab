"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowUpRight, Camera, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { GALLERY_ITEMS, GalleryMediaItem } from "@/data/galleryData";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function GalleryPreview() {
  const [activeItem, setActiveItem] = useState<GalleryMediaItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollReveal<HTMLDivElement>();

  const handleOpenItem = (item: GalleryMediaItem) => {
    setActiveItem(item);
    setIsLightboxOpen(true);
  };

  const handleSelectIndex = (idx: number) => {
    if (idx >= 0 && idx < GALLERY_ITEMS.length) {
      setActiveItem(GALLERY_ITEMS[idx]);
    }
  };

  return (
    <section
      id="gallery-preview"
      className="py-16 sm:py-20 lg:py-24 bg-[#FAFAFC] relative overflow-hidden border-b border-[#35309B]/10"
      aria-label="Kreators Lab Media Gallery Preview"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 reveal-fade-up ${
            isHeaderVisible ? "is-visible" : ""
          }`}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#35309B] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs border border-[#35309B]/20">
            <Camera className="w-3.5 h-3.5 text-[#35309B]" />
            <span>Studio &amp; Camps Showcase</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18152B] tracking-tight leading-snug">
            Life at Kreators Lab
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#55506E] max-w-xl mx-auto leading-relaxed">
            A glimpse into the projects, discoveries, and creative experiences happening at Kreators Lab.
          </p>
        </div>

        {/* Bento Grid exactly structured like Reference Picture (4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ========================================================= */}
          {/* LEFT SIDE (7 Columns): 3 Rows                            */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {/* 1. TOP LEFT CARD: Mint pastel wide banner (Ref: GET UP TO 50% OFF) */}
            <div
              onClick={() => handleOpenItem(GALLERY_ITEMS[0])}
              className="group relative rounded-[32px] sm:rounded-[36px] bg-[#DCF3E5] overflow-hidden p-6 sm:p-8 min-h-[220px] sm:min-h-[250px] flex items-center justify-between border border-[#c4e9d2] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Background student photo on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1/3 sm:w-2/5 overflow-hidden opacity-90 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={GALLERY_ITEMS[0].thumbnail}
                  alt={GALLERY_ITEMS[0].title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DCF3E5]/60 to-[#DCF3E5]" />
              </div>

              {/* Background student photo on the right */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 sm:w-2/5 overflow-hidden opacity-90 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={GALLERY_ITEMS[10]?.thumbnail || GALLERY_ITEMS[0].thumbnail}
                  alt="Summer Camp session"
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#DCF3E5]/60 to-[#DCF3E5]" />
              </div>

              {/* Center Content */}
              <div className="relative z-10 mx-auto text-center max-w-sm space-y-3">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#18152B] tracking-tight leading-tight">
                  Summer Camp: Robotics &amp; AI Lab
                </h3>
                {/* Rounded tag pill at bottom */}
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#18152B] text-xs font-black shadow-xs border border-[#18152B]/10">
                    <Sparkles className="w-3 h-3 text-[#35309B]" />
                    <span>Summer Camp • Grades 6–8</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 2. MIDDLE LEFT CARD: Soft yellow pastel wide card (Ref: Winter's weekend) */}
            <div
              onClick={() => handleOpenItem(GALLERY_ITEMS[6])}
              className="group relative rounded-[32px] sm:rounded-[36px] bg-[#FEF1B3] overflow-hidden p-6 sm:p-8 min-h-[220px] sm:min-h-[240px] flex items-center justify-between border border-[#fae799] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Left Text */}
              <div className="relative z-10 max-w-xs space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-[#18152B] tracking-tight leading-tight">
                  Friday Demo Day
                </h3>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#18152B] text-xs font-black shadow-xs border border-[#18152B]/10">
                    <span>Special Events • Demo Day</span>
                  </span>
                </div>
              </div>

              {/* Right Photo */}
              <div className="relative w-36 sm:w-48 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md shrink-0 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={GALLERY_ITEMS[6].thumbnail}
                  alt={GALLERY_ITEMS[6].title}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>

              {/* Top-Right Round Arrow Badge (Ref: Arrow circle in top-right) */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white text-[#18152B] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>

            {/* 3. BOTTOM LEFT ROW: 2 Cards Side-by-Side (Ref: Subcard A & Subcard B) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* 3A. Left Portrait Card (Ref: Smiling Model with frosted pill) */}
              <div
                onClick={() => handleOpenItem(GALLERY_ITEMS[3])}
                className="group relative rounded-[32px] sm:rounded-[36px] overflow-hidden min-h-[290px] sm:min-h-[320px] bg-white border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-5"
              >
                <Image
                  src={GALLERY_ITEMS[3].thumbnail}
                  alt={GALLERY_ITEMS[3].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top-Right Heart Pill (Ref: Top right heart pill) */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 text-[#18152B] flex items-center justify-center shadow-xs">
                  <Heart className="w-3.5 h-3.5 fill-[#E11D48] text-[#E11D48]" />
                </div>

                {/* Bottom Content: Title & Frosted Glass Tag Pill */}
                <div className="relative z-10 space-y-2">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#18152B]/85 text-[#DFFF00] text-xs font-bold border border-white/20 backdrop-blur-md shadow-xs">
                    Kindergarten (K) • Ideation
                  </span>
                  <h3 className="text-base font-black text-white drop-shadow-sm leading-snug">
                    {GALLERY_ITEMS[3].title}
                  </h3>
                </div>
              </div>

              {/* 3B. Right Peach Card (Ref: "Favourites < >" with 2 mini photos) */}
              <div
                onClick={() => handleOpenItem(GALLERY_ITEMS[2])}
                className="group relative rounded-[32px] sm:rounded-[36px] bg-[#FFF4ED] p-5 sm:p-6 min-h-[290px] sm:min-h-[320px] flex flex-col justify-between border border-[#fed7c7] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Header: "Student Creations" with < > arrows (Ref: Favourites < >) */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#18152B]">
                    Student Creations
                  </span>
                  <div className="flex items-center gap-1 text-[#65617A]">
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-2xs">
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-2xs">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Center 2 Mini Photos (Ref: 2 models side-by-side) */}
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xs group-hover:scale-102 transition-transform">
                    <Image
                      src={GALLERY_ITEMS[2].thumbnail}
                      alt="Student creation 1"
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xs group-hover:scale-102 transition-transform">
                    <Image
                      src={GALLERY_ITEMS[9]?.thumbnail || GALLERY_ITEMS[1].thumbnail}
                      alt="Student creation 2"
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                </div>

                {/* Bottom Tag Pill */}
                <div className="text-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#18152B] text-xs font-black shadow-xs border border-[#18152B]/10">
                    Student Projects • K–8
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE (5 Columns): 2 Tall Cards + 1 Wide Bottom Card */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
            {/* TOP ROW: Two Tall Portrait Cards (Ref: Sandals and Sneakers) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {/* 4. Top Right - Left Card (Ref: WMX Rubber Zebra sandal) */}
              <div
                onClick={() => handleOpenItem(GALLERY_ITEMS[1])}
                className="group relative rounded-[32px] sm:rounded-[36px] bg-white p-5 min-h-[360px] sm:min-h-[390px] flex flex-col justify-between border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Top dots & Heart (Ref: Color dots top left, heart top right) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#F472B6]" />
                    <span className="w-3 h-3 rounded-full bg-[#FDE047]" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#F3F4F6] text-[#18152B] flex items-center justify-center">
                    <Heart className="w-3 h-3 text-[#65617A]" />
                  </div>
                </div>

                {/* Center Photo */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden my-3 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={GALLERY_ITEMS[1].thumbnail}
                    alt={GALLERY_ITEMS[1].title}
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>

                {/* Bottom Info: Title & Tag pill */}
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-[#18152B] leading-tight">
                    Visual Block Code &amp; Logic
                  </h3>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#35309B] text-white text-[11px] font-bold shadow-2xs">
                      Classroom Activities • Grade 3
                    </span>
                  </div>
                </div>
              </div>

              {/* 5. Top Right - Right Card (Ref: Supper Skiny jogger) */}
              <div
                onClick={() => handleOpenItem(GALLERY_ITEMS[11])}
                className="group relative rounded-[32px] sm:rounded-[36px] bg-white p-5 min-h-[360px] sm:min-h-[390px] flex flex-col justify-between border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Top dots & Heart */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FDE047]" />
                    <span className="w-3 h-3 rounded-full bg-[#18152B]" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#F3F4F6] text-[#18152B] flex items-center justify-center">
                    <Heart className="w-3 h-3 text-[#65617A]" />
                  </div>
                </div>

                {/* Center Photo */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden my-3 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={GALLERY_ITEMS[11].thumbnail}
                    alt={GALLERY_ITEMS[11].title}
                    fill
                    className="object-cover"
                    sizes="250px"
                  />
                </div>

                {/* Bottom Info: Title & Tag pill */}
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-[#18152B] leading-tight">
                    Hardware &amp; Sensor Electronics
                  </h3>
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#35309B] text-white text-[11px] font-bold shadow-2xs">
                      Workshops • Grade 9
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. BOTTOM RIGHT CARD: Wide Horizontal Card (Ref: Bring Bold Fashion) */}
            <div
              onClick={() => handleOpenItem(GALLERY_ITEMS[7])}
              className="group relative rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-7 min-h-[200px] flex items-center justify-between border border-gray-200/70 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Left Text */}
              <div className="relative z-10 max-w-[200px] sm:max-w-xs space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-black text-[#18152B] tracking-tight leading-tight">
                  High School AI Lab
                </h3>
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEECFF] text-[#35309B] text-xs font-bold border border-[#35309B]/15">
                    Grades 9–12 • Advanced APIs
                  </span>
                </div>
              </div>

              {/* Right Photo */}
              <div className="relative w-28 sm:w-36 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={GALLERY_ITEMS[7].thumbnail}
                  alt={GALLERY_ITEMS[7].title}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>

              {/* Top-Right Round Arrow Badge (Ref: Arrow circle in top-right) */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F3F4F6] text-[#18152B] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Bottom CTA: "See Full Gallery" */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-2.5 bg-[#35309B] hover:bg-[#2A247A] text-white text-sm sm:text-base font-extrabold px-8 py-4 rounded-full shadow-[0_10px_30px_rgba(53,48,155,0.25)] hover:shadow-[0_14px_40px_rgba(53,48,155,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <span>See Full Gallery</span>
            <ArrowRight className="w-4 h-4 text-[#DFFF00] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Interactive Full-Screen Media Viewer Lightbox */}
      <GalleryLightbox
        item={activeItem}
        items={GALLERY_ITEMS}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onSelectIndex={handleSelectIndex}
      />
    </section>
  );
}
