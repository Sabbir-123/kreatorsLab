"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Zap,
  Play,
} from "lucide-react";
import {
  FEATURED_PROJECTS,
  ProjectItem,
  CONFIRMED_PROJECT_CATEGORIES,
} from "@/data/siteContent";

// Real photographs from Kreators Lab projects & workshops for cursor trail
const TRAIL_PHOTOS = [
  {
    src: "/images/founder/actually_knows.JPG",
    alt: "Students learning AI and technology in studio",
  },
  {
    src: "/images/founder/camp.JPG",
    alt: "Collaborative robotics and maker camp session",
  },
  {
    src: "/images/founder/gallary1.JPG",
    alt: "Young creator coding a custom game",
  },
  {
    src: "/images/founder/gallary2.JPG",
    alt: "Personalized mentor guidance during build phase",
  },
  {
    src: "/images/founder/gallary5.JPG",
    alt: "Visual logic experiments and team collaboration",
  },
  {
    src: "/images/founder/gallary7.JPG",
    alt: "Hands-on tech exploration in Austin lab",
  },
  {
    src: "/images/hero/sketching-ideas.jpg",
    alt: "Ideating and paper sketching game mechanics",
  },
  {
    src: "/images/hero/presenting-project.jpg",
    alt: "Student showcasing demo project on big screen",
  },
  {
    src: "/images/students/collaborative-learning.jpg",
    alt: "Pair programming and debugging session",
  },
];

interface TrailItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  imageIndex: number;
  floatX: number;
  floatY: number;
}

interface ProjectShowcaseProps {
  onSelectProject?: (project: ProjectItem) => void;
  onExploreAll?: () => void;
}

export function ProjectShowcase({
  onSelectProject,
  onExploreAll,
}: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Cursor Image Trail State
  const [trailItems, setTrailItems] = useState<TrailItem[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const imageCounterRef = useRef<number>(0);
  const nextIdRef = useRef<number>(1);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    return selectedCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const total = filteredProjects.length;

  // Reset activeIndex if category changes and index is out of bounds
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Preload trail images
  useEffect(() => {
    if (typeof window !== "undefined") {
      TRAIL_PHOTOS.forEach((photo) => {
        const img = new window.Image();
        img.src = photo.src;
      });
    }
  }, []);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  // Cursor Image Trail around cards (suppressed when cursor is directly over cards)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isReducedMotion) return;

      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-no-trail="true"]')) {
        lastPosRef.current = null;
        return;
      }

      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const last = lastPosRef.current;
      const threshold = 75;
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        if (dist < threshold) return;
      }

      lastPosRef.current = { x, y };
      const id = nextIdRef.current++;
      const imageIndex = imageCounterRef.current % TRAIL_PHOTOS.length;
      imageCounterRef.current++;

      const rotation = (Math.random() - 0.5) * 22;
      const floatX = (Math.random() - 0.5) * 26;
      const floatY = -12 - Math.random() * 16;

      const newItem: TrailItem = {
        id,
        x,
        y,
        rotation,
        imageIndex,
        floatX,
        floatY,
      };

      setTrailItems((prev) => {
        const next = prev.length >= 7 ? prev.slice(prev.length - 6) : prev;
        return [...next, newItem];
      });

      setTimeout(() => {
        setTrailItems((prev) => prev.filter((item) => item.id !== id));
      }, 1200);
    },
    [isReducedMotion]
  );

  const handleMouseLeave = () => {
    lastPosRef.current = null;
  };

  // Dynamic Cursor-Following Spotlight & 3D Tilt on the Active Card
  const handleActiveCardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    const card = activeCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--spotlight-opacity", "1");

    // Restrained 3D tilt (max 4.5deg)
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;
    const tiltX = -normY * 4.5;
    const tiltY = normX * 5.5;

    card.style.setProperty("--tilt-x", `${tiltX}deg`);
    card.style.setProperty("--tilt-y", `${tiltY}deg`);
  };

  const handleActiveCardPointerLeave = () => {
    const card = activeCardRef.current;
    if (!card) return;
    card.style.setProperty("--spotlight-opacity", "0");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="scroll-mt-20 py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-sky-50/25 to-white relative overflow-hidden border-b border-sky-100 select-none text-slate-900"
      aria-label="Kreators Lab Student Projects 3D Showcase"
    >
      {/* Soft Ambient Radial Background Glows (Light Theme) */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 -right-36 w-[560px] h-[560px] rounded-full bg-sky-200/35 blur-[140px]" />
        <div className="absolute bottom-1/5 -left-36 w-[500px] h-[500px] rounded-full bg-orange-200/25 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sky-100/40 blur-[160px]" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE CURSOR IMAGE TRAIL LAYER
          Float photographs behind cursor in surrounding areas
          Disabled when hovering directly over project cards
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none z-15 overflow-hidden"
        aria-hidden="true"
      >
        {trailItems.map((item) => {
          const photo = TRAIL_PHOTOS[item.imageIndex];
          return (
            <div
              key={item.id}
              className="absolute pointer-events-none will-change-transform"
              style={{
                left: item.x,
                top: item.y,
                transform: `translate(-50%, -50%) translate3d(${item.floatX}px, ${item.floatY}px, 0) rotate(${item.rotation}deg)`,
                animation:
                  "trailPop 1.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              <div className="relative w-28 sm:w-36 h-20 sm:h-24 rounded-2xl overflow-hidden shadow-[0_14px_35px_rgba(14,165,233,0.18)] border-2 border-white bg-slate-900">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_#FFA024]" />
                  <span className="text-[9px] font-extrabold text-white tracking-wide uppercase">
                    Lab Moment
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* ─────────────────────────────────────────────────────────────
            1. SECTION HEADER (AT THE TOP) - "BIG IDEAS. REAL CREATIONS."
            ───────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>STUDENT CREATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            <span>BIG IDEAS. </span>
            <span className="bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] bg-clip-text text-transparent">
              REAL CREATIONS.
            </span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            A collection of ideas explored, experiments made, and projects
            brought to life by young creators.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6">
            {CONFIRMED_PROJECT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] text-white shadow-md shadow-orange-500/25 scale-102"
                      : "bg-white hover:bg-sky-50 text-slate-700 border border-sky-200/80 shadow-2xs hover:border-sky-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. CENTER-FOCUSED 3D DEPTH CAROUSEL VIEWPORT
            ───────────────────────────────────────────────────────────── */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[420px] xs:h-[450px] sm:h-[480px] md:h-[510px] lg:h-[530px] flex items-center justify-center overflow-visible perspective-1400 preserve-3d my-2"
        >
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project card"
            className="absolute left-2 sm:left-6 md:left-10 lg:left-16 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-sky-200/80 text-sky-700 shadow-[0_8px_25px_rgba(2,132,199,0.15)] hover:bg-sky-50 hover:text-sky-900 hover:border-sky-300 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project card"
            className="absolute right-2 sm:right-6 md:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-sky-200/80 text-sky-700 shadow-[0_8px_25px_rgba(2,132,199,0.15)] hover:bg-sky-50 hover:text-sky-900 hover:border-sky-300 hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* 3D Cards Stack Layer */}
          <div className="relative w-full h-full flex items-center justify-center preserve-3d">
            {filteredProjects.map((project, idx) => {
              if (total === 0) return null;

              // Compute cyclic offset relative to activeIndex
              let offset = idx - activeIndex;
              if (offset < -total / 2) offset += total;
              if (offset > total / 2) offset -= total;

              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const isOuter = Math.abs(offset) === 2;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Compute responsive positions for 3D depth
              let tx = 0;
              let tz = 0;
              let ry = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (isCenter) {
                tx = 0;
                tz = 40;
                ry = 0;
                scale = 1;
                opacity = 1;
                zIndex = 35;
              } else if (offset === -1) {
                // Immediate Left Neighbor
                tx = -285;
                tz = -55;
                ry = 12;
                scale = 0.91;
                opacity = 0.9;
                zIndex = 25;
              } else if (offset === 1) {
                // Immediate Right Neighbor
                tx = 285;
                tz = -55;
                ry = -12;
                scale = 0.91;
                opacity = 0.9;
                zIndex = 25;
              } else if (offset === -2) {
                // Outer Left Preview
                tx = -510;
                tz = -140;
                ry = 18;
                scale = 0.82;
                opacity = 0.58;
                zIndex = 15;
              } else if (offset === 2) {
                // Outer Right Preview
                tx = 510;
                tz = -140;
                ry = -18;
                scale = 0.82;
                opacity = 0.58;
                zIndex = 15;
              }

              const baseTransform = `translate3d(${tx}px, 0px, ${tz}px) rotateY(${ry}deg) scale(${scale})`;

              return (
                <div
                  key={project.id}
                  ref={isCenter ? activeCardRef : undefined}
                  data-no-trail="true"
                  onClick={() => {
                    if (isCenter) {
                      onSelectProject?.(project);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  onPointerMove={
                    isCenter ? handleActiveCardPointerMove : undefined
                  }
                  onPointerLeave={
                    isCenter ? handleActiveCardPointerLeave : undefined
                  }
                  style={{
                    transform: isCenter
                      ? `${baseTransform} rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`
                      : baseTransform,
                    opacity,
                    zIndex,
                    transition:
                      "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease-out",
                  }}
                  className={`absolute w-[250px] xs:w-[275px] sm:w-[310px] md:w-[340px] lg:w-[365px] h-[380px] xs:h-[410px] sm:h-[440px] md:h-[470px] lg:h-[490px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer group bg-slate-900 border ${
                    isCenter
                      ? "border-white/80 ring-2 ring-sky-400/40 shadow-[0_25px_60px_-15px_rgba(2,132,199,0.3),0_12px_25px_rgba(0,0,0,0.18)]"
                      : "border-white/60 shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:border-sky-300"
                  }`}
                >
                  {/* Dynamic Cursor-Following Spotlight Overlay (Active Card Only) */}
                  {isCenter && (
                    <div
                      className="absolute inset-0 rounded-[24px] sm:rounded-[28px] pointer-events-none transition-opacity duration-300 z-30"
                      style={{
                        opacity: "var(--spotlight-opacity, 0)",
                        background:
                          "radial-gradient(circle 280px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.28), rgba(2, 132, 199, 0.16), transparent 75%)",
                      }}
                    />
                  )}

                  {/* Full Card Project Image Background */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 275px, (max-width: 1024px) 340px, 365px"
                      priority={isCenter}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                    />

                    {/* Subtle overall dark tint for contrast + strong bottom gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-55% to-black/20 pointer-events-none" />
                  </div>

                  {/* Top Floating Badges */}
                  <div className="absolute top-2.5 sm:top-3.5 inset-x-2.5 sm:inset-x-3.5 flex items-center justify-between z-20 pointer-events-none">
                    {/* Category Badge (Upper-Left) */}
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-sky-900 text-[10px] font-black uppercase tracking-wider border border-white/60 shadow-md">
                      <Zap className="w-2.5 h-2.5 text-sky-600" />
                      <span>{project.category}</span>
                    </span>

                    {/* Grade Badge (Upper-Right) */}
                    <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 shadow-md">
                      {project.grade}
                    </span>
                  </div>

                  {/* Play Video Trigger Overlay (Centered) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-md text-sky-700 flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5 text-sky-600" />
                    </div>
                  </div>

                  {/* ─────────────────────────────────────────────────────────
                      TEXT OVERLAY ON PICTURE FOOTER SIDE (NOT IN SEPARATE BOX)
                      ───────────────────────────────────────────────────────── */}
                  <div className="absolute inset-x-0 bottom-0 pt-20 pb-3 sm:pb-4 px-3.5 sm:px-4.5 z-20 flex flex-col justify-end pointer-events-none">
                    {/* Project Title */}
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-amber-300 transition-colors drop-shadow-sm truncate">
                        {project.name}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-white/70 group-hover:text-amber-300 shrink-0 transition-colors" />
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-200/90 line-clamp-2 leading-relaxed drop-shadow-xs mt-1 mb-2.5">
                      {project.summary}
                    </p>

                    {/* Bottom Action Footer Row */}
                    <div className="pt-2 flex items-center justify-between border-t border-white/20">
                      <span className="text-[10px] sm:text-[11px] font-bold text-sky-300 uppercase tracking-wider drop-shadow-xs">
                        Interactive Project
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] text-white text-[11px] font-black shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform pointer-events-auto">
                        <span>View Project</span>
                        <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. BOTTOM ACTION & CATALOG REDIRECT
            ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            href="/projects"
            onClick={onExploreAll}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E36] via-[#FF8A00] to-[#FFAE00] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm px-7 py-3 rounded-full shadow-lg shadow-orange-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>EXPLORE ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes trailPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.65) rotate(0deg);
          }
          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.04);
          }
          40% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate3d(var(--fx, 0), var(--fy, -25px), 0) scale(0.85);
          }
        }
      `}</style>
    </section>
  );
}
