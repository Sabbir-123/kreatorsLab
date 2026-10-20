"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";

interface HeroProps {
  onExplorePrograms?: () => void;
  onSeeProjects?: () => void;
}

export function Hero({ onExplorePrograms, onSeeProjects }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play video on mount (muted by default for browser autoplay policy)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy prevented playback, keep paused state
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="top"
      className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden bg-hero-gradient text-white"
      style={{
        background: "linear-gradient(135deg, #473DEA 0%, #473DEA 80%, #F5F4FF 95%, #FFFFFF 100%)",
      }}
    >
      {/* Pure background rendering of the specified 4-stop gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle top scrim to enhance floating navbar legibility */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Core Positioning, Headline, and Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 sm:space-y-6">
            {/* Eyebrow: Official Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#DFFF00]" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-[#DFFF00]">
                Think. Innovate. Explore.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
              The AI program where kids{" "}
              <span className="text-[#DFFF00]">
                think and build real things.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-[#F5F4FF] leading-relaxed max-w-2xl font-normal">
              At Kreators Lab, kids think creatively, innovate with AI, and turn their ideas into games, websites, animations, and projects they’re excited to share.
            </p>

            {/* Supporting Line: Grade Eligibility */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFFF00]/15 border border-[#DFFF00]/30 text-[#DFFF00] text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#DFFF00] shrink-0" />
              <span>For students in grades K–12.</span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href="#programs"
                onClick={onExplorePrograms}
                className="inline-flex items-center justify-center gap-2.5 bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] text-base font-extrabold px-7 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00]/50"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-5 h-5 text-[#18152B]" />
              </a>

              <a
                href="#projects"
                onClick={onSeeProjects}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-base font-semibold px-6 py-4 rounded-full border border-white/25 hover:border-white/40 backdrop-blur-xs transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>See What Kids Built</span>
              </a>
            </div>

            {/* Microcopy & Local Context / Trust Statement */}
            <div className="pt-4 border-t border-white/15 w-full">
              <p className="text-xs sm:text-sm text-[#EEECFF]/95 flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-[#DFFF00] shrink-0" />
                <span>Trusted by GT and Discovery families in the Austin Lake Travis area.</span>
              </p>
            </div>
          </div>

          {/* Right Column: Hero Media Composition — Middle Video with 2 Supporting Pictures */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Dominant Center Element: Hands-on Studio Video */}
              <div
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    togglePlay();
                  }
                }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/25 bg-[#201B68] aspect-[4/3] group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFFF00]"
                aria-label={isPlaying ? "Pause studio video" : "Play studio video"}
              >
                {/* HTML5 Video */}
                <video
                  ref={videoRef}
                  src="/videos/kreators-lab-studio-loop.mp4"
                  poster="/images/hero/building-laptop.jpg"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Subtle vignette gradient for crisp badge and controls visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#18152B]/85 via-transparent to-black/20 pointer-events-none" />

                {/* Micro-label: Build It (with pulsating live indicator) */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18152B]/90 backdrop-blur-md border border-white/20 shadow-md text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFFF00] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DFFF00]" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Build It • Studio
                  </span>
                </div>

                {/* Interactive Player Controls: Play/Pause & Mute Toggle */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="p-2 rounded-full bg-[#18152B]/80 hover:bg-[#18152B] text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00]"
                  >
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 text-[#EEECFF]" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-[#DFFF00]" />
                    )}
                  </button>

                  <div className="p-2 rounded-full bg-[#18152B]/80 group-hover:bg-[#35309B] text-white border border-white/20 backdrop-blur-md transition-colors">
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-[#DFFF00] fill-[#DFFF00]" />
                    )}
                  </div>
                </div>

                {/* Center Play Indicator on Hover / Paused */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-[#DFFF00] text-[#18152B] flex items-center justify-center shadow-xl transform scale-110">
                      <Play className="w-6 h-6 fill-[#18152B] ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Supporting Picture 1 (Top Left): Student Sketching on Paper */}
              <div className="absolute -top-7 -left-5 sm:-left-8 z-20 w-32 sm:w-40 aspect-square rounded-2xl overflow-hidden shadow-xl border-2 border-white/30 bg-[#282272] hidden sm:block">
                <Image
                  src="/images/hero/sketching-ideas.jpg"
                  alt="Student sketching and planning project ideas on paper"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                {/* Micro-label: Dream It */}
                <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18152B]/90 backdrop-blur-md border border-white/20 text-white shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFFF00]">
                    Dream It
                  </span>
                </div>
              </div>

              {/* Supporting Picture 2 (Bottom Right): Student Demonstrating Finished Creation */}
              <div className="absolute -bottom-7 -right-4 sm:-right-7 z-20 w-40 sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-[#282272]">
                <Image
                  src="/images/hero/presenting-project.jpg"
                  alt="Student demonstrating a finished creative creation"
                  fill
                  className="object-cover"
                  sizes="190px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                {/* Micro-label: Share It */}
                <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18152B]/90 backdrop-blur-md border border-white/20 text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                    Share It
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
