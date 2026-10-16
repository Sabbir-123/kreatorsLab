"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Code,
  Bug,
  Share2,
  Trophy,
  ChevronDown,
} from "lucide-react";
import { METHOD_STEPS } from "@/data/siteContent";

interface LearningMethodProps {
  onDiscoverMore?: () => void;
}

const STEP_ICONS = [Lightbulb, Code, Bug, Share2, Trophy];

export function LearningMethod({ onDiscoverMore }: LearningMethodProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Check user motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Compute scroll progress through the shared 5-stage container
  const updateScrollProgress = useCallback(() => {
    if (isReducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Total scrollable track distance
    const totalDistance = container.offsetHeight - viewportHeight;
    if (totalDistance <= 0) return;

    // How far container top has scrolled past viewport top
    const currentProgress = -rect.top / totalDistance;
    const clamped = Math.max(0, Math.min(1, currentProgress));
    setScrollProgress(clamped);

    // Synchronize active stage with hold zones:
    // Stage 0: [0.00, 0.18]
    // Stage 1: [0.18, 0.38]
    // Stage 2: [0.38, 0.58]
    // Stage 3: [0.58, 0.78]
    // Stage 4: [0.78, 1.00]
    let current = 0;
    if (clamped >= 0.78) {
      current = 4;
    } else if (clamped >= 0.58) {
      current = 3;
    } else if (clamped >= 0.38) {
      current = 2;
    } else if (clamped >= 0.18) {
      current = 1;
    } else {
      current = 0;
    }
    setActiveStage(current);
  }, [isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion) return;

    const onScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateScrollProgress, isReducedMotion]);

  // Click navigation: smoothly scrolls directly into the middle of that stage's Hold Zone
  const scrollToStage = (stageIndex: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const totalDistance = container.offsetHeight - viewportHeight;

    // Target the center of the stage's settled reading window
    const targetFraction =
      stageIndex === 0
        ? 0.04
        : stageIndex === 4
        ? 0.92
        : stageIndex * 0.2 + 0.05;

    const targetScroll = window.scrollY + rect.top + targetFraction * totalDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-[#ECE9FE] via-[#F4F2FF] to-[#ECE9FE] border-y border-[#35309B]/15 relative"
      aria-label="The Kreators Lab Method five-stage learning process"
    >
      {/* 
        Scroll Track Container:
        Provides generous scroll runway (400vh) so each stage has a dedicated
        settled "Hold / Reading" window before the next card begins its slide up.
      */}
      <div
        ref={containerRef}
        className="relative"
        style={{
          height: isReducedMotion ? "auto" : "400vh",
        }}
      >
        {/* 
          Sticky Card Viewport:
          Tightly budgeted so the header and the ENTIRE card (top to bottom border)
          fit comfortably inside any laptop or mobile screen without clipping.
        */}
        <div
          className={`${
            isReducedMotion
              ? "relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
              : "sticky top-16 sm:top-20 h-[calc(100vh-4.5rem)] max-h-[760px] flex flex-col justify-start py-2 sm:py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible"
          }`}
        >
          {/* Section Header: Compact & balanced vertical footprint */}
          <div className="text-center max-w-3xl mx-auto shrink-0 mb-2 sm:mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-[#35309B] text-[11px] font-bold uppercase tracking-wider mb-1.5 shadow-xs border-2 border-[#35309B]/20">
              <Sparkles className="w-3 h-3 text-[#35309B]" />
              <span>The Kreators Lab Method</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#18152B] tracking-tight leading-snug">
              From &ldquo;What If?&rdquo; to &ldquo;Look What I Made!&rdquo;
            </h2>

            <p className="hidden md:block mt-1 text-xs text-[#55506E] max-w-xl mx-auto leading-normal">
              Great creations don&apos;t begin with the perfect prompt. They begin with curiosity.
              We encourage students to think first, plan their ideas, and use technology with purpose.
            </p>

            {/* Synchronized Stage Navigation Pill Bar */}
            <div className="mt-2.5 inline-flex items-center justify-center p-1 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#35309B]/20 shadow-sm">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {METHOD_STEPS.map((step, idx) => {
                  const isActive = activeStage === idx;
                  const isCompleted = activeStage > idx;

                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => scrollToStage(idx)}
                      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#35309B] text-white shadow-xs ring-2 ring-[#35309B]/30 scale-102"
                          : isCompleted
                          ? "bg-[#EEECFF] text-[#35309B] hover:bg-[#35309B]/15"
                          : "text-[#65617A] hover:bg-gray-100"
                      }`}
                      aria-label={`Jump to Stage ${step.step}: ${step.title}`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-black ${
                          isActive
                            ? "bg-[#DFFF00] text-[#18152B]"
                            : isCompleted
                            ? "bg-[#35309B] text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span>{step.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Synchronized Progress Track Bar */}
            {!isReducedMotion && (
              <div className="w-44 sm:w-56 h-1 bg-[#35309B]/15 rounded-full mx-auto mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#35309B] via-[#473DEA] to-[#DFFF00] transition-all duration-150 ease-out"
                  style={{
                    width: `${Math.max(8, scrollProgress * 100)}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* 
            PINNED CARD STACKING ARENA:
            - Fits completely within the viewport budget (height 380px-440px).
            - Each stage has a clear HOLD ZONE so Card 1 is seen properly & fully.
            - Only after scrolling through the hold zone does the next card slide up.
          */}
          <div className="relative w-full flex-1 max-w-5xl xl:max-w-6xl mx-auto min-h-[360px] max-h-[480px] mt-1 sm:mt-2">
            {METHOD_STEPS.map((step, idx) => {
              const StepIcon = STEP_ICONS[idx % STEP_ICONS.length];
              const isCurrent = activeStage === idx;

              let translateY = "0%";
              let opacity = 1;
              let scale = 1;
              let pointerEvents: "auto" | "none" = "auto";

              if (!isReducedMotion) {
                if (idx === 0) {
                  // Stage 0:
                  // Holds 100% visible from 0.00 to 0.12 (Hold Zone).
                  // When p > 0.12, as Card 1 slides in, Card 0 subtly scales down.
                  if (scrollProgress > 0.12) {
                    const depth = (scrollProgress - 0.12) / 0.88;
                    scale = Math.max(0.92, 1 - depth * 0.06);
                    opacity = Math.max(0.65, 1 - depth * 0.25);
                  }
                } else {
                  // For cards 1, 2, 3, 4:
                  // Stage (idx - 1) holds still from (idx-1)*0.20 to (idx-1)*0.20 + 0.11.
                  // Card idx transition begins at tStart and completes at tEnd:
                  const tStart = (idx - 1) * 0.2 + 0.11;
                  const tEnd = idx * 0.2;

                  if (scrollProgress < tStart) {
                    // Waiting below the stage while previous card is held in full view
                    translateY = "100%";
                    opacity = 0;
                    scale = 0.96;
                    pointerEvents = "none";
                  } else if (scrollProgress <= tEnd) {
                    // Actively sliding upward from bottom over previous card
                    const tau = (scrollProgress - tStart) / (tEnd - tStart);
                    // Smooth quadratic ease-out
                    const ease = 1 - Math.pow(1 - tau, 2);
                    translateY = `${(1 - ease) * 100}%`;
                    opacity = Math.min(1, tau * 1.5);
                    scale = 0.96 + ease * 0.04;
                  } else {
                    // Card has fully settled into position!
                    // Holds still, and gently scales down if later cards stack over it
                    const laterDepth = Math.max(0, scrollProgress - (idx * 0.2 + 0.11));
                    translateY = "0%";
                    scale = Math.max(0.92, 1 - laterDepth * 0.06);
                    opacity = Math.max(0.65, 1 - laterDepth * 0.25);
                  }
                }
              }

              return (
                <div
                  key={step.step}
                  id={`stage-${step.step}`}
                  className={`${
                    isReducedMotion
                      ? "relative mb-8 last:mb-0"
                      : "absolute inset-0 w-full h-full transition-transform duration-75 ease-out will-change-transform"
                  }`}
                  style={
                    !isReducedMotion
                      ? {
                          zIndex: (idx + 1) * 10,
                          transform: `translateY(${translateY}) scale(${scale})`,
                          transformOrigin: "top center",
                          opacity,
                          pointerEvents,
                        }
                      : undefined
                  }
                >
                  <article
                    className={`relative w-full h-full rounded-2xl sm:rounded-3xl bg-white border-2 shadow-[0_20px_50px_-12px_rgba(53,48,155,0.22),0_8px_24px_rgba(24,21,43,0.08)] ring-1 ring-[#35309B]/20 overflow-hidden flex flex-col justify-between ${
                      isCurrent
                        ? "border-[#35309B] ring-2 ring-[#35309B]/30"
                        : "border-[#35309B]/35"
                    }`}
                  >
                    {/* Top gradient boundary accent bar */}
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#35309B] via-[#473DEA] to-[#35309B] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-7 items-center flex-1 overflow-hidden">
                      {/* Left Column: Real Student Photographic Picture (proportioned to prevent height overflow) */}
                      <div className="lg:col-span-6 w-full">
                        <div className="relative aspect-[16/10] sm:aspect-[4/3] max-h-[200px] sm:max-h-[260px] lg:max-h-[290px] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#18152B] border-2 border-[#35309B]/20 shadow-sm group">
                          <Image
                            src={step.image}
                            alt={`Students during ${step.title} stage: ${step.headline}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-102"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={idx === 0}
                          />

                          {/* Top Stage Indicator Pill */}
                          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18152B]/85 backdrop-blur-md border border-white/20 text-[#DFFF00] text-[10px] sm:text-[11px] font-bold shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]" />
                            <span>{step.stageBadge || `Stage ${step.step} • ${step.title}`}</span>
                          </div>

                          {/* Bottom Real Activity Tag */}
                          {step.studentFocus && (
                            <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3">
                              <div className="p-1.5 sm:p-2 rounded-lg bg-[#18152B]/85 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-medium shadow-xs flex items-center gap-2">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-[#35309B] text-[#DFFF00] flex items-center justify-center shrink-0">
                                  <StepIcon className="w-3 h-3" />
                                </div>
                                <span className="line-clamp-1">{step.studentFocus}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column: Stage Narrative, Takeaway, and Tags */}
                      <div className="lg:col-span-6 flex flex-col justify-between space-y-2 sm:space-y-3">
                        {/* Stage Number & Title Header */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="inline-flex items-center gap-2">
                              <span className="text-xl sm:text-2xl lg:text-3xl font-black text-[#35309B] tracking-tight">
                                {step.step}
                              </span>
                              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#35309B] bg-[#EEECFF] px-2 py-0.5 rounded-full border border-[#35309B]/20">
                                {step.title}
                              </span>
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#65617A]">
                              STEP {idx + 1} OF {METHOD_STEPS.length}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#18152B] tracking-tight leading-snug">
                            {step.headline}
                          </h3>

                          <p className="mt-1 text-xs text-[#55506E] leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {step.description}
                          </p>
                        </div>

                        {/* Highlighted Learning Insight / Takeaway Callout Box */}
                        {step.takeaway && (
                          <div className="p-2 sm:p-2.5 rounded-xl bg-[#F5F4FF] border border-[#35309B]/20 relative">
                            <div className="flex items-start gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-[#35309B] shrink-0 mt-0.5" />
                              <p className="text-[10px] sm:text-xs font-semibold text-[#18152B]/90 leading-relaxed">
                                {step.takeaway}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Skills and Mindsets Practiced Tag Pills */}
                        {step.skills && step.skills.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#18152B]/75 mb-1">
                              Skills & Mindsets Practiced:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {step.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white border border-[#35309B]/20 text-[#18152B] shadow-2xs"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-[#35309B]" />
                                  <span>{skill}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Step Navigation Footer */}
                        <div className="pt-1.5 border-t border-[#E8E6F1] flex items-center justify-between text-[10px] sm:text-xs text-[#65617A]">
                          <span className="font-bold text-[#35309B]">Stage 0{idx + 1} • {step.title}</span>
                          {idx < METHOD_STEPS.length - 1 ? (
                            <button
                              type="button"
                              onClick={() => scrollToStage(idx + 1)}
                              className="inline-flex items-center gap-1 font-semibold text-[#35309B] hover:text-[#473DEA] transition-colors cursor-pointer"
                            >
                              <span>Next: Stage 0{idx + 2}</span>
                              <ChevronDown className="w-3 h-3 ml-0.5" />
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-bold text-[#35309B]">
                              <span>Ready to Create</span>
                              <Sparkles className="w-3 h-3 text-[#35309B]" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section Bottom CTA (placed below the scroll track so it is reached naturally at completion) */}
      <div className="py-12 text-center bg-gradient-to-b from-transparent to-[#ECE9FE]/40">
        <a
          href="#about"
          onClick={onDiscoverMore}
          className="inline-flex items-center justify-center gap-2 bg-[#35309B] hover:bg-[#2A247A] text-white text-sm font-bold px-7 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35309B] cursor-pointer"
        >
          <span>Discover How We Teach</span>
          <ArrowRight className="w-4 h-4 text-[#DFFF00]" />
        </a>
      </div>
    </section>
  );
}
