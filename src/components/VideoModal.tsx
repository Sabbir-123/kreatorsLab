"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Play, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  posterSrc?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoSrc = "/videos/KREATORS.mp4",
  posterSrc = "/videos/week-at-kreatorslab-poster.jpg",
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      trackEvent("camp_video_open");

      // Auto-play automatically when modal pops up
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser autoplay policy requires initial mute, mute and play
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
          });
        }
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
    >
      <div
        className="relative w-full max-w-4xl bg-[#18152B] rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DFFF00]" />
            <h3 id="video-modal-title" className="text-sm font-bold text-white tracking-wide">
              Kreators Lab — Student Experience &amp; Studio Preview
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close video player modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={posterSrc}
                alt="A Week at Kreators Lab poster preview"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />

              <div className="relative z-10 max-w-md p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DFFF00] text-[#18152B] mx-auto flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 fill-current ml-1 text-[#18152B]" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">
                    Official Video Slot Ready
                  </h4>
                  <p className="text-xs sm:text-sm text-[#EEECFF]/90 leading-relaxed">
                    Upload your verified Kreators Lab camp reel to{" "}
                    <code className="text-[#DFFF00] bg-white/10 px-2 py-0.5 rounded font-mono text-xs">
                      /public/videos/KREATORS.mp4
                    </code>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 text-xs text-left text-white/85 space-y-1 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-[#DFFF00]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Camp Journey Flow Featured:</span>
                  </div>
                  <p className="pl-5 text-[11px] text-white/80">
                    Monday (Ideation) &rarr; Wednesday (Building) &rarr; Friday (Showcase)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <span>Austin &amp; Lake Travis Camps • Authentic Student Learning Moments</span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#35309B] hover:bg-[#473DEA] text-white font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00] cursor-pointer"
          >
            Done Watching
          </button>
        </div>
      </div>
    </div>
  );
}
