"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Lightweight, high-performance scroll reveal hook using IntersectionObserver.
 * Triggers once and unobserves so animations do not replay on micro-scrolls.
 * Automatically respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, isVisible]);

  return { ref, isVisible };
}

/**
 * Container reveal hook for staggered children.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold ?? 0.08,
        rootMargin: options.rootMargin ?? "0px 0px -30px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, isVisible]);

  return { containerRef, isVisible };
}
