"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface HeroProps {
  onExplorePrograms?: () => void;
  onSeeProjects?: () => void;
  onWatchVideo?: () => void;
}

export function Hero({ onExplorePrograms, onSeeProjects, onWatchVideo }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Auto-play video with sound ON by default
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // If the browser autoplay policy blocks unmuted audio on first load,
        // start playback muted and unmute upon first user interaction
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {
            setIsPlaying(false);
          });
        }
      });
    }

    // Automatically unmute on first user interaction if blocked initially
    const handleFirstInteraction = () => {
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="top"
      className="relative min-h-[660px] sm:min-h-[820px] lg:min-h-[920px] flex flex-col justify-start pt-24 pb-16 sm:pt-32 sm:pb-32 lg:pt-36 lg:pb-36 scroll-mt-28 overflow-hidden text-white bg-[#281F72]"
    >
      {/* 1. Background Video Layer (Clickable to open full video modal) */}
      <div
        onClick={onWatchVideo}
        role="button"
        tabIndex={0}
        aria-label="Click to play full video"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onWatchVideo?.();
          }
        }}
        className="absolute inset-0 w-full h-full overflow-hidden cursor-pointer z-0 group"
      >
        <video
          ref={videoRef}
          src="/videos/KREATORS.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-bottom sm:object-[center_70%] scale-100 group-hover:scale-105 transition-transform duration-700"
        />

        {/* 2. Gradient Overlay Matching the Screenshot:
            Deep rich purple covering the top nav and text,
            fading smoothly down into the video of the classroom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#261C68] via-[#2F2582]/95 via-[38%] to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#261C68]/40 via-transparent to-[#261C68]/40 pointer-events-none" />

        {/* Floating badge indicating video is clickable (hidden on mobile to prevent overlapping trust badge) */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 pointer-events-none opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all hidden sm:flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-semibold shadow-2xl">
          <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#DFFF00] flex items-center justify-center text-[#18152B] shrink-0 shadow-md">
            <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
          </span>
          <span>Click to watch full video</span>
        </div>
      </div>

      {/* 3. Hero Content (Centered, Immersive, High Impact) */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20 text-center flex flex-col items-center pointer-events-none">
        {/* Eyebrow: Brand tagline & grade span */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-md mb-3 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-[#DFFF00] shrink-0 ring-2 ring-[#DFFF00]/40 animate-pulse" />
          <span className="text-[11px] sm:text-sm font-black tracking-wide text-[#DFFF00]">
            Think. Innovate. Explore.
          </span>
          <span className="text-white/40 text-xs">•</span>
          <span className="text-[11px] sm:text-sm font-bold text-white/95">
            Grades K–12
          </span>
        </div>

        {/* Core Headline */}
        <h1 className="text-[28px] xs:text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-black tracking-tight leading-[1.12] sm:leading-[1.08] text-white max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
          The AI program where kids{" "}
          <span className="text-[#DFFF00] inline sm:inline-block drop-shadow-[0_4px_24px_rgba(223,255,0,0.45)]">
            think and build real things.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-3 sm:mt-5 text-sm sm:text-lg lg:text-xl text-[#F2F0FF] max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] px-2">
          Hands-on AI and creative tech programs turning curiosity into working games, websites, animations, and real-world projects.
        </p>

        {/* Action CTAs */}
        <div className="pointer-events-auto mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link
            href="/programs"
            onClick={onExplorePrograms}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] text-sm sm:text-base font-extrabold px-7 sm:px-8 py-3 sm:py-4 rounded-full shadow-[0_8px_30px_rgba(223,255,0,0.35)] hover:shadow-[0_12px_40px_rgba(223,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00]/50"
          >
            <span>Explore Programs</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#18152B]" />
          </Link>

          <a
            href="#projects"
            onClick={onSeeProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm sm:text-base font-bold px-6 sm:px-7 py-3 sm:py-4 rounded-full border border-white/30 hover:border-white/50 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>See What Kids Built</span>
          </a>
        </div>

        {/* Community Trust Statement */}
        <div className="pointer-events-auto mt-5 sm:mt-10 inline-flex items-center gap-2 text-[11px] sm:text-sm text-white/90 font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 max-w-sm sm:max-w-none text-center">
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DFFF00] shrink-0" />
          <span>Trusted by GT and Discovery families across Austin &amp; Lake Travis</span>
        </div>
      </div>

      {/* 4. Floating Ambient Video Controls in Bottom Right Corner */}
      <div className="absolute bottom-8 right-6 z-20 hidden sm:flex items-center gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={onWatchVideo}
          aria-label="Open full video modal"
          title="Watch full video"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#18123B]/80 hover:bg-[#18123B] text-white border border-white/25 backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00]"
        >
          <Play className="w-3.5 h-3.5 text-[#DFFF00] fill-[#DFFF00]" />
          <span>Watch Video</span>
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute background video" : "Mute background video"}
          className="p-2.5 rounded-full bg-[#18123B]/80 hover:bg-[#18123B] text-white border border-white/25 backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00]"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white/80" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#DFFF00]" />
          )}
        </button>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="p-2.5 rounded-full bg-[#18123B]/80 hover:bg-[#18123B] text-white border border-white/25 backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00]"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white" />
          ) : (
            <Play className="w-4 h-4 text-[#DFFF00] fill-[#DFFF00]" />
          )}
        </button>
      </div>

      {/* 5. Organic Curved Wave Section Transition into ProjectShowcase (#FAF9FE) */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#FAF9FE]"
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,24 C320,56 640,64 960,32 C1200,8 1360,28 1440,36 L1440,64 L0,64 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
