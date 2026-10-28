"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface MentorsSectionProps {
  onMeetTeam?: () => void;
}

export function MentorsSection({ onMeetTeam }: MentorsSectionProps = {}) {
  void onMeetTeam;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start entering when section top is at 95% of viewport
      const startOffset = windowHeight * 0.95;
      // Reach fully assembled resting position when top is at 38% of viewport
      const endOffset = windowHeight * 0.38;

      const current = rect.top;
      // Progress 0 when starting to enter, 1 when assembled in view
      let progress = (startOffset - current) / (startOffset - endOffset);
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Compute interpolation values for smooth bi-directional scroll animation
  // When scrolling down: progress 0 -> 1 (comes in from opposite sides)
  // When scrolling up: progress 1 -> 0 (moves back toward opposite sides)
  const leftXProgress = Math.min(1, Math.max(0, scrollProgress / 0.85));
  const rightXProgress = Math.min(1, Math.max(0, Math.max(0, scrollProgress - 0.05) / 0.85));

  // Horizontal translation offsets
  const leftTranslateX = isMobile
    ? (1 - leftXProgress) * -60
    : (1 - leftXProgress) * -26; // in vw on desktop, px on mobile

  const rightTranslateX = isMobile
    ? (1 - rightXProgress) * 60
    : (1 - rightXProgress) * 26; // in vw on desktop, px on mobile

  const leftOpacity = Math.min(1, Math.max(0, scrollProgress * 1.6));
  const rightOpacity = Math.min(1, Math.max(0, Math.max(0, scrollProgress - 0.05) * 1.6));

  const leftScale = 0.88 + 0.12 * leftXProgress;
  const rightScale = 0.88 + 0.12 * rightXProgress;

  // Title subtle vertical parallax
  const titleY = (1 - Math.min(1, scrollProgress * 1.8)) * 24;
  const titleOpacity = 0.2 + 0.8 * Math.min(1, scrollProgress * 1.5);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="overflow-x-hidden bg-white scroll-mt-[5.5rem] py-14 sm:py-20 md:py-28 relative"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-4 sm:gap-14 sm:px-6">
        {/* Section Heading */}
        <h2
          className="w-full shrink-0 self-stretch text-center text-[clamp(2.25rem,5vw,3rem)] md:text-[48px] font-normal leading-[110%] tracking-[-0.8px] text-[#18152B] transition-all duration-75"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          Founder&apos;s letter
        </h2>

        {/* Interactive Overlapping Canvas */}
        <div className="relative mx-auto w-full max-w-[1008px] md:min-h-[584px]">
          {/* Left Element: Classroom Mentorship Photo */}
          <div
            className="relative z-10 mx-auto aspect-square w-full max-w-[min(100%,481px)] shrink-0 will-change-transform md:absolute md:left-px md:mx-0 md:top-[24px] md:h-[481px] md:w-[481px] md:max-w-none md:-rotate-[5deg] transition-transform duration-75 ease-out"
            style={{
              transform: isMobile
                ? `translateX(${leftTranslateX}px) scale(${leftScale})`
                : `translateX(${leftTranslateX}vw) scale(${leftScale}) rotate(-5deg)`,
              opacity: leftOpacity,
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[32px] shadow-[inset_0_0_20px_8px_rgba(255,255,255,0.95)]"
              style={{
                maskImage:
                  "radial-gradient(ellipse 92% 92% at 50% 50%, #000 58%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 92% 92% at 50% 50%, #000 58%, transparent 100%)",
              }}
            >
              <Image
                src="/images/founder/actually_knows.JPG"
                alt="Karina mentoring students building projects at Kreators Lab"
                width={481}
                height={481}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 481px"
                priority
              />
            </div>
            {/* Vignette edge blending */}
            <div
              className="pointer-events-none absolute inset-[-6%] rounded-[36px]"
              aria-hidden={true}
              style={{
                background:
                  "radial-gradient(ellipse 88% 88% at 50% 50%, transparent 45%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.92) 100%)",
              }}
            />
          </div>

          {/* Right Element: Founder's Letter Card */}
          <article
            className="relative z-20 mx-auto mt-8 md:mt-0 box-border flex w-full max-w-[520px] flex-col items-start rounded-[32px] border-2 border-[#F2F2F2] bg-white p-6 sm:p-8 shadow-[inset_0_0_20px_8px_rgba(226,226,226,0.25),0_18px_40px_-16px_rgba(0,0,0,0.08)] will-change-transform md:absolute md:left-[calc(50%-520px/2+198px)] md:top-0 md:min-h-[541px] md:w-[520px] md:max-w-none md:shrink-0 md:rotate-[5deg] transition-transform duration-75 ease-out"
            style={{
              transform: isMobile
                ? `translateX(${rightTranslateX}px) scale(${rightScale})`
                : `translateX(${rightTranslateX}vw) scale(${rightScale}) rotate(5deg)`,
              opacity: rightOpacity,
            }}
          >
            <div className="flex w-full max-w-[456px] flex-col items-start gap-6 md:-rotate-[5deg]">
              {/* Letter Paragraphs */}
              <div className="flex w-full max-w-[456px] flex-col items-start gap-4">
                <p className="w-full text-[14px] sm:text-[15px] font-medium leading-[150%] text-[#4D4D4D]">
                  Hi, I&apos;m Karina.
                </p>

                <p className="w-full text-[14px] sm:text-[15px] font-medium leading-[150%] text-[#4D4D4D]">
                  Founder of Kreators Lab, a mom of two, and a LTISD parent.
                </p>

                <p className="w-full text-[14px] sm:text-[15px] font-medium leading-[150%] text-[#4D4D4D]">
                  Watching kids today, I realized something important: they&apos;re surrounded by AI,
                  but they&apos;re not being taught how to use it thoughtfully. Most go straight to
                  the answer, prompt, copy, done, without ever learning how to think, question, or
                  create.
                  <br />
                  <br />
                  That&apos;s why I built Kreators Lab. It&apos;s a place where kids don&apos;t just
                  use AI, they learn how to think with it, turn ideas into real projects, and build
                  with intention.
                </p>

                <p className="w-full text-[14px] sm:text-[15px] font-medium leading-[150%] text-[#4D4D4D]">
                  I&apos;m a graduate of the Georgia Institute of Technology with a focus on AI, have
                  worked in Big Tech, and have won multiple hackathons, including a Facebook
                  Hackathon. Those experiences shaped how I see innovation — not just as tools, but
                  as a way of thinking.
                  <br />
                  <br />
                  My goal is simple: to raise a generation who don&apos;t just consume technology but
                  create with it purposefully.
                </p>
              </div>

              {/* Signature, Location & Social */}
              <div className="flex w-full max-w-[456px] flex-row items-end justify-between pt-1">
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <p
                    className="w-full text-[36px] sm:text-[40px] leading-[130%] text-[#000102]"
                    style={{ fontFamily: "var(--font-great-vibes), cursive" }}
                  >
                    Karina Islam
                  </p>
                  <p className="w-full text-[16px] sm:text-[18px] font-medium leading-[150%] text-[#000102]">
                    Austin, USA
                  </p>
                </div>

                <a
                  href="https://www.linkedin.com/in/karinaislam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-6 shrink-0 items-center justify-center text-[#0A66C2] hover:opacity-80 transition-opacity"
                  aria-label="Karina Islam on LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
