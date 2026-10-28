"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play, Sparkles, Calendar, Tag } from "lucide-react";
import { GalleryMediaItem } from "@/data/galleryData";

interface GalleryLightboxProps {
  item: GalleryMediaItem | null;
  items: GalleryMediaItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function GalleryLightbox({
  item,
  items,
  isOpen,
  onClose,
  onSelectIndex,
}: GalleryLightboxProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const total = items.length;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onSelectIndex(currentIndex - 1);
      } else if (e.key === "ArrowLeft" && currentIndex === 0) {
        onSelectIndex(total - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < total - 1) {
        onSelectIndex(currentIndex + 1);
      } else if (e.key === "ArrowRight" && currentIndex === total - 1) {
        onSelectIndex(0);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, total, onClose, onSelectIndex]);

  if (!isOpen || !item) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + total) % total;
    onSelectIndex(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % total;
    onSelectIndex(next);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div
        className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30 pointer-events-none"
      >
        {/* Counter and Type Pill */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-md border border-white/20">
            {currentIndex + 1} / {total}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFFF00] text-[#18152B] text-xs font-black shadow-md">
            {item.type === "video" ? (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Video Demo</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                <span>Studio Photo</span>
              </>
            )}
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
          aria-label="Close fullscreen gallery viewer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Lightbox Frame */}
      <div
        className="relative w-full max-w-5xl bg-[#18123B] rounded-3xl border border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Container */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] md:min-h-[520px] bg-black flex items-center justify-center overflow-hidden">
          {item.type === "video" ? (
            <video
              src={item.src}
              poster={item.thumbnail}
              controls
              autoPlay
              playsInline
              className="w-full h-full max-h-[70vh] object-contain"
            />
          ) : (
            <div className="relative w-full h-full min-h-[300px] sm:min-h-[460px] md:min-h-[520px]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1100px"
              />
            </div>
          )}

          {/* Navigation Arrows (Prev / Next) */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#35309B] text-white flex items-center justify-center backdrop-blur-md border border-white/25 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#35309B] text-white flex items-center justify-center backdrop-blur-md border border-white/25 shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
                aria-label="Next media"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Media Information Footer */}
        <div className="p-4 sm:p-6 bg-[#18123B] border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            {/* Tag Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 text-[#DFFF00] text-xs font-bold border border-white/15">
                <Tag className="w-3 h-3" />
                <span>{item.category}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 text-xs font-bold border border-white/15">
                <span>{item.gradeBadge}</span>
              </span>

              {item.date && (
                <span className="inline-flex items-center gap-1 text-xs text-white/60 ml-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
              {item.caption}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-white/60">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white">ESC</kbd> to exit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

