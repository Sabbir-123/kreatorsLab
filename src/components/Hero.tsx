"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Play,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface HeroProps {
  onExplorePrograms?: () => void;
  onSeeProjects?: () => void;
  onWatchVideo?: () => void;
}

// Authentic Kreators Lab classroom images for the Inside Kreators Lab slider
const INSIDE_SLIDES = [
  {
    image: "/images/founder/actually_knows.JPG",
    title: "HANDS-ON AI & CODING STUDIO",
  },
  {
    image: "/images/founder/camp.JPG",
    title: "MAKER CAMP & ROBOTICS LAB",
  },
  {
    image: "/images/founder/gallary1.JPG",
    title: "COLLABORATIVE GAME DESIGN",
  },
  {
    image: "/images/founder/gallary2.JPG",
    title: "REAL-WORLD TECH CREATION",
  },
  {
    image: "/images/founder/gallary5.JPG",
    title: "VISUAL LOGIC & AI EXPERIMENTS",
  },
];

// Rotating verbs: THINK -> CREATE -> EXPERIMENT
const ROTATING_WORDS = ["THINK", "CREATE", "EXPERIMENT"];
const LINE1_CHARS = "THE AI PROGRAM".split("");
const LINE2_CHARS = "WHERE".split("");
const LINE3_KIDS = "KIDS".split("");
const LINE4_LETTERS = "BUILD REAL THINGS".split("");

export function Hero({
  onExplorePrograms,
  onSeeProjects,
  onWatchVideo,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Loading screen states
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [loaderFading, setLoaderFading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(25);

  // Delay hero main text for the first 3 seconds while "Welcome to Kreators Lab" plays in video
  const [showMainText, setShowMainText] = useState(false);
  const textTriggeredRef = useRef(false);

  // Inside Kreators Lab photo slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic character-by-character typewriter effect for rotating keywords (THINK -> CREATE -> EXPERIMENT)
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("THINK");
  const [isDeleting, setIsDeleting] = useState(false);

  // Dismiss loader manually on click (also unlocks audio gesture)
  const dismissLoader = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {});
      setIsMuted(false);
      setAudioBlocked(false);
    }
    setLoaderFading(true);
    setTimeout(() => {
      setIsSiteLoading(false);
    }, 700);
  };

  // When video has buffered enough data to render smoothly
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setLoadProgress(100);
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }
    setTimeout(() => {
      setLoaderFading(true);
      setTimeout(() => {
        setIsSiteLoading(false);
      }, 600);
    }, 350);
  };

  // Smooth loading bar progression + max safety timeout
  useEffect(() => {
    if (!isSiteLoading) return;
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 120);

    const maxTimeout = setTimeout(() => {
      setLoadProgress(100);
      setLoaderFading(true);
      setTimeout(() => {
        setIsSiteLoading(false);
      }, 500);
    }, 1300);

    return () => {
      clearInterval(interval);
      clearTimeout(maxTimeout);
    };
  }, [isSiteLoading]);

  // Trigger main text after 2.8s in video playback
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || textTriggeredRef.current) return;
    if (video.currentTime >= 2.8) {
      textTriggeredRef.current = true;
      setShowMainText(true);
    }
  };

  // Fallback timer: guarantee reveal at 3 seconds after site loader finishes
  useEffect(() => {
    if (isSiteLoading) return;
    const timer = setTimeout(() => {
      if (!textTriggeredRef.current) {
        textTriggeredRef.current = true;
        setShowMainText(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSiteLoading]);

  useEffect(() => {
    if (!showMainText) return;

    const currentWord = ROTATING_WORDS[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 55);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex, showMainText]);

  // Auto-advance photo slider every 4.0 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % INSIDE_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + INSIDE_SLIDES.length) % INSIDE_SLIDES.length);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % INSIDE_SLIDES.length);
  };

  // Trigger entrance sequence when mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle 100% guaranteed automatic video playback on landing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start muted on DOM node for guaranteed automatic browser playback with zero block
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          video.defaultMuted = true;
          video.muted = true;
          video.play().catch(() => {});
        });
    }

    const unlockAudio = () => {
      const v = videoRef.current;
      if (v) {
        v.muted = false;
        v.volume = 1;
        v.play().catch(() => {});
        setIsMuted(false);
        setAudioBlocked(false);
      }
    };

    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("mousedown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("scroll", unlockAudio, { once: true, passive: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("mousedown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    setAudioBlocked(false);
    sessionStorage.setItem("kl_hero_audio_muted", String(nextMuted));
    trackEvent("cta_click", { label: nextMuted ? "Sound Muted" : "Sound Unmuted" });
  };

  return (
    <section
      id="top"
      className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between pt-20 sm:pt-22 md:pt-24 pb-12 sm:pb-8 md:pb-10 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden text-white bg-black select-none"
      aria-label="Kreators Lab Hero"
    >
      {/* ─────────────────────────────────────────────────────────────
          PRELOADER / BRANDED LOADING SCREEN (KREATORS LAB LOGO)
          Holds until video is buffered & ready to render instantly with sound
          ───────────────────────────────────────────────────────────── */}
      {isSiteLoading && (
        <div
          onClick={dismissLoader}
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ease-out select-none cursor-pointer ${
            loaderFading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Kreators Lab Loading Screen"
        >
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-r from-sky-500/20 via-[#FF6B00]/15 to-transparent blur-[130px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Kreators Lab Official Logo with gentle breathing pulse */}
            <div className="relative w-48 sm:w-60 h-14 sm:h-18 mb-6 flex items-center justify-center animate-pulse">
              <Image
                src="/brand/kreators-lab-logo-light.png"
                alt="Kreators Lab Logo"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Glowing High-Tech Loading Bar */}
            <div className="w-56 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-inner mb-3">
              <div
                className="h-full bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#0EA5E9] transition-all duration-300 ease-out rounded-full shadow-[0_0_12px_#FF8A00]"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Loading text status */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase text-slate-300/80">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              <span>PREPARING EXPERIENCE</span>
            </div>

            {/* Glowing CTA Button to Enter with Sound */}
            <button
              type="button"
              onClick={dismissLoader}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFA024] hover:from-[#FF4E22] hover:to-[#FF9014] text-white text-xs font-black uppercase tracking-wider shadow-[0_4px_22px_rgba(255,94,54,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
              <span>ENTER WITH SOUND</span>
            </button>
          </div>
        </div>
      )}
      {/* ─────────────────────────────────────────────────────────────
          1. FULL-SCREEN BACKGROUND VIDEO (NO COLOR OVERLAY / ZERO LAYER EFFECT)
          Video is 100% natural, clear and uninterrupted
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Poster Fallback Image while video is buffering */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out z-[1] ${
            isVideoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Image
            src="/videos/week-at-kreatorslab-poster.jpg"
            alt="Kreators Lab classroom hands-on learning environment"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Existing High-Definition Classroom Footage */}
        <video
          ref={videoRef}
          src="/videos/Kreator%20Club%20Trailer%20without%20text.mp4"
          poster="/videos/week-at-kreatorslab-poster.jpg"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onPlaying={handleVideoLoaded}
          onLoadedData={handleVideoLoaded}
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover object-[center_55%] md:object-center z-0 transition-opacity duration-1000"
        />

        {/* Soft, minimal dark shadow ONLY behind the left-aligned text for crisp legibility */}
        <div
          className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-black/55 via-black/20 to-transparent pointer-events-none z-[2]"
          aria-hidden="true"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN HERO CONTENT AREA (LEFT TYPOGRAPHY + CTAs)
          Main text moved down further via transform translate-y so the bottom
          trust bar and Inside Kreators Lab carousel remain 100% fixed in place.
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
        <div
          className={`max-w-4xl flex flex-col items-start text-left translate-y-6 sm:translate-y-10 md:translate-y-16 lg:translate-y-20 xl:translate-y-24 transition-opacity duration-700 ${
            showMainText ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* ─────────────────────────────────────────────────────────
              EXACT FORMAT FROM USER SPECIFICATION:
              Line 1: THE AI PROGRAM
              Line 2: WHERE (smaller size)
              Line 3: KIDS + CHARACTER EFFECT (THINK -> CREATE -> EXPERIMENT)
              Line 4: & BUILD REAL THINGS
              ───────────────────────────────────────────────────────── */}
          <h1 className="font-black tracking-tight leading-[1.0] sm:leading-[0.96] text-white text-[32px] xs:text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[68px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] uppercase">
            {/* Line 1: Character-by-character animated reveal */}
            <div className="flex flex-wrap overflow-hidden">
              {LINE1_CHARS.map((char, idx) => (
                <span
                  key={`l1-${idx}`}
                  className="inline-block transition-all duration-600 ease-out"
                  style={{
                    opacity: showMainText ? 1 : 0,
                    transform: showMainText
                      ? "translateY(0) scale(1)"
                      : "translateY(36px) scale(0.85)",
                    filter: showMainText ? "blur(0)" : "blur(8px)",
                    transitionDelay: `${idx * 26}ms`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>

            {/* Line 2: WHERE (distinctively smaller in font size) */}
            <div className="text-[17px] xs:text-[20px] sm:text-[25px] md:text-[28px] lg:text-[32px] xl:text-[34px] font-extrabold tracking-widest text-white/90 my-1 sm:my-1.5 opacity-90 flex flex-wrap overflow-hidden">
              {LINE2_CHARS.map((char, idx) => (
                <span
                  key={`l2-${idx}`}
                  className="inline-block transition-all duration-600 ease-out"
                  style={{
                    opacity: showMainText ? 1 : 0,
                    transform: showMainText
                      ? "translateY(0) scale(1)"
                      : "translateY(24px) scale(0.85)",
                    filter: showMainText ? "blur(0)" : "blur(6px)",
                    transitionDelay: `${380 + idx * 30}ms`,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Line 3: KIDS + Character Effect on THINK -> CREATE -> EXPERIMENT */}
            <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 flex-wrap">
              <span className="flex">
                {LINE3_KIDS.map((char, idx) => (
                  <span
                    key={`kids-${idx}`}
                    className="inline-block text-white transition-all duration-600 ease-out"
                    style={{
                      opacity: showMainText ? 1 : 0,
                      transform: showMainText
                        ? "translateY(0) scale(1)"
                        : "translateY(30px) scale(0.85)",
                      filter: showMainText ? "blur(0)" : "blur(6px)",
                      transitionDelay: `${560 + idx * 30}ms`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span
                className="inline-flex items-center transition-all duration-700 ease-out"
                style={{
                  opacity: showMainText ? 1 : 0,
                  transform: showMainText ? "translateY(0) scale(1)" : "translateY(24px) scale(0.9)",
                  filter: showMainText ? "blur(0)" : "blur(6px)",
                  transitionDelay: "700ms",
                }}
              >
                <span className="inline-flex bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(255,107,0,0.55)]">
                  {displayedText.split("").map((char, idx) => (
                    <span
                      key={`${wordIndex}-${idx}-${char}`}
                      className="inline-block animate-in fade-in zoom-in-75 duration-100"
                    >
                      {char}
                    </span>
                  ))}
                </span>
                {/* Blinking radiant orange pulse cursor */}
                <span
                  aria-hidden="true"
                  className="inline-block w-[3.5px] sm:w-[4.5px] md:w-[5px] h-[0.8em] bg-[#FF6B00] ml-1.5 sm:ml-2 animate-pulse align-middle rounded-full shadow-[0_0_14px_rgba(255,107,0,0.9)]"
                />
              </span>
            </div>

            {/* Line 4: & BUILD REAL THINGS */}
            <div className="mt-0.5 sm:mt-1 drop-shadow-[0_2px_24px_rgba(255,107,0,0.55)] flex flex-wrap overflow-hidden">
              <span
                className="text-white inline-block transition-all duration-600 ease-out"
                style={{
                  opacity: showMainText ? 1 : 0,
                  transform: showMainText ? "translateY(0)" : "translateY(28px)",
                  filter: showMainText ? "blur(0)" : "blur(6px)",
                  transitionDelay: "760ms",
                }}
              >
                &amp;&nbsp;
              </span>
              {LINE4_LETTERS.map((char, idx) => (
                <span
                  key={`l4-${idx}`}
                  className="inline-block bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] bg-clip-text text-transparent transition-all duration-600 ease-out"
                  style={{
                    opacity: showMainText ? 1 : 0,
                    transform: showMainText
                      ? "translateY(0) scale(1)"
                      : "translateY(28px) scale(0.9)",
                    filter: showMainText ? "blur(0)" : "blur(6px)",
                    transitionDelay: `${800 + idx * 22}ms`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </h1>

          {/* CTA Buttons: Compact, Side-by-Side (Pasha Pashi) on all screen sizes */}
          <div
            className={`mt-6 sm:mt-8 flex flex-row flex-wrap items-center gap-2.5 sm:gap-3.5 transition-all duration-700 ease-out ${
              showMainText
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-8 scale-95 pointer-events-none"
            }`}
            style={{
              transitionDelay: "1220ms",
            }}
          >
            {/* Primary CTA: EXPLORE THE PROGRAM ↗ (Radiant Orange Gradient) */}
            <Link
              href="/programs"
              onClick={onExplorePrograms}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#FF5E36] via-[#FF7A00] to-[#FFA024] hover:from-[#FF4E22] hover:to-[#FF9014] text-white text-xs sm:text-sm font-extrabold tracking-wide uppercase px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-[0_6px_25px_rgba(255,94,54,0.45)] hover:shadow-[0_8px_32px_rgba(255,94,54,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-3 focus-visible:ring-orange-400 shrink-0"
            >
              <span>EXPLORE THE PROGRAM</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5] text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Secondary CTA: SEE KREATORS LAB (Sky-tinted Frosted Glass) */}
            <a
              href="#projects"
              onClick={onSeeProjects}
              className="group inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-sky-950/45 hover:bg-sky-900/70 text-white text-xs sm:text-sm font-bold tracking-wide uppercase px-4.5 sm:px-5 py-2.5 sm:py-3 rounded-full border border-sky-300/40 hover:border-sky-300/70 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0 shadow-lg"
            >
              <span>SEE KREATORS LAB</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BOTTOM AREA:
          - Left: Sound icon toggle + Trust Pill + Badges (Trustpilot & Crunchbase)
          - Right: Inside Kreators Lab Carousel (placed directly in Austin Live Feed position)
          - Removed divider line & Austin live feed indicator per user instruction
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-4 pb-4 sm:pb-6 md:pb-8 text-xs text-white/70">
        {/* Left Side: Sound Icon Toggle + Trust Pill + Badges */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Minimized Icon-Only Sound Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            title={isMuted ? "Unmute video sound" : "Mute video sound"}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 shrink-0 ${
              !isMuted
                ? "bg-gradient-to-r from-[#FF5E36] to-[#FFA024] text-white border-transparent shadow-[0_2px_14px_rgba(255,94,54,0.5)]"
                : "bg-black/55 hover:bg-black/75 text-white/85 border-white/20 hover:border-white/40"
            }`}
          >
            {!isMuted ? (
              <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-white/70" />
            )}
          </button>

          {/* Trusted by GT & Discovery families Pill (Placed by the side of the sound icon) */}
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/90 font-medium px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-sky-400/30 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#FFA024] shrink-0" />
            <span>Trusted by GT &amp; Discovery families across Austin &amp; Lake Travis</span>
          </div>

          {/* Trustpilot Logo Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-bold text-white/90">
            {/* Trustpilot Green Star Icon */}
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="3" fill="#00B67A" />
              <path
                d="M12 4.5L14.3 9.2L19.5 9.9L15.7 13.6L16.6 18.8L12 16.3L7.4 18.8L8.3 13.6L4.5 9.9L9.7 9.2L12 4.5Z"
                fill="white"
              />
            </svg>
            <span className="tracking-tight">Trustpilot</span>
            <span className="text-[#00B67A] font-black">★ 4.9</span>
          </div>

          {/* Crunchbase Logo Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-bold text-white/90">
            {/* Crunchbase Official Cyan/Blue Icon */}
            <svg
              className="w-3.5 h-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" rx="4" fill="#0284C7" />
              <circle cx="9.5" cy="12" r="3.5" stroke="white" strokeWidth="2" fill="none" />
              <path
                d="M17.5 8.5C16.5 8.5 15 9.5 15 12C15 14.5 16.5 15.5 17.5 15.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="tracking-tight">crunchbase</span>
          </div>

          {audioBlocked && (
            <span className="text-[10px] font-semibold text-[#FFA024] hidden xl:inline animate-pulse">
              Click speaker to unmute
            </span>
          )}
        </div>

        {/* Right Side: Inside Kreators Lab Carousel (Apple-style Glassmorphism Card in Austin Live Feed position) */}
        <div
          className={`w-full sm:w-[320px] md:w-[340px] lg:w-[360px] xl:w-[380px] shrink-0 mt-8 sm:mt-10 lg:mt-0 transition-all duration-1000 delay-200 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* Apple UI Glass Card Container: pure picture, border-white/30, backdrop-blur-2xl */}
          <div
            onClick={onWatchVideo}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onWatchVideo?.();
              }
            }}
            aria-label="Inside Kreators Lab — Click to watch full studio video"
            className="group relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white/[0.12] backdrop-blur-2xl border border-sky-300/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] p-2 sm:p-2.5 transition-all duration-400 hover:scale-[1.02] hover:border-sky-300/70 cursor-pointer"
          >
            {/* Picture Slider Area */}
            <div className="relative aspect-[16/10] w-full rounded-[18px] sm:rounded-[20px] overflow-hidden bg-black/40">
              {INSIDE_SLIDES.map((slide, idx) => (
                <div
                  key={slide.image}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx === 0}
                  />
                  {/* Subtle bottom vignette inside photo to support the title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}

              {/* Overlaid Center Play Button with Apple Glass effect */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-[#FF5E36] group-hover:to-[#FFA024] group-hover:text-white group-hover:border-transparent transition-all shadow-xl">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Left/Right Apple Glass Slider Controls */}
              <button
                type="button"
                onClick={handlePrevSlide}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 hover:bg-black/65 text-white border border-white/25 flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dot Pagination inside picture */}
              <div className="absolute top-2 right-2 z-20 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15">
                {INSIDE_SLIDES.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIdx === currentSlide
                        ? "w-3 bg-gradient-to-r from-[#FF5E36] to-[#FFA024]"
                        : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Side: Pure H1 Title (No extra boxes, no clutter) */}
            <div className="pt-2 pb-0.5 px-1.5 flex items-center justify-between gap-2">
              <h1 className="text-xs sm:text-[13px] font-black text-white tracking-wider uppercase group-hover:text-[#FFA024] transition-colors truncate drop-shadow-md">
                {INSIDE_SLIDES[currentSlide].title}
              </h1>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/70 group-hover:text-[#FFA024] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
