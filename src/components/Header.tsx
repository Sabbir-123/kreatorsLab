"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

interface HeaderProps {
  onExplorePrograms?: () => void;
}

export function Header({ onExplorePrograms }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // EXACTLY FIVE NAVIGATION LINKS: Home, Programs, Student Projects, How It Works, Gallery
  const navLinks = [
    { name: "Home", href: "/#top" },
    { name: "Programs", href: "/programs" },
    { name: "Student Projects", href: "/#projects" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Gallery", href: "/gallery" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? "bg-white/92 backdrop-blur-2xl border border-sky-200/90 shadow-[0_16px_45px_-6px_rgba(14,165,233,0.16)] ring-1 ring-sky-300/30 py-2 sm:py-2.5 px-4 sm:px-6"
            : "bg-white/85 backdrop-blur-xl border border-sky-200/60 shadow-[0_12px_40px_-8px_rgba(14,165,233,0.12)] ring-1 ring-sky-300/20 py-2.5 sm:py-3 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo on the Left - Dark wordmark on light navbar */}
          <div className="flex items-center">
            <Logo variant="dark" size="md" />
          </div>

          {/* Desktop: Navigation Links with Sky Blue Hover */}
          <nav
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-700"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-slate-700 hover:text-sky-600 hover:bg-sky-50 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Separate CTA Button on the Right: Radiant Orange Gradient */}
          <div className="hidden md:flex items-center">
            <Link
              href="/programs"
              onClick={onExplorePrograms}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E36] via-[#FF7A00] to-[#FFA024] hover:from-[#FF4E22] hover:to-[#FF9014] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full shadow-[0_4px_18px_rgba(255,94,54,0.38)] hover:shadow-[0_6px_24px_rgba(255,94,54,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </Link>
          </div>

          {/* Mobile: Accessible Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <Link
              href="/programs"
              className="inline-flex items-center text-xs font-bold bg-gradient-to-r from-[#FF5E36] to-[#FFA024] text-white px-3.5 py-1.5 rounded-full shadow-xs"
            >
              Programs
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-slate-700 hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-orange-500" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Drawer in Frosted Glass */}
      {mobileMenuOpen && (
        <div className="max-w-md mx-auto mt-2.5 rounded-3xl bg-white/95 backdrop-blur-2xl border border-sky-200 shadow-[0_20px_50px_rgba(14,165,233,0.2)] p-5 pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100">
            <Link
              href="/programs"
              onClick={handleNavClick}
              className="w-full inline-flex items-center justify-center gap-2 text-center bg-gradient-to-r from-[#FF5E36] to-[#FFA024] text-white font-extrabold py-2.5 px-4 rounded-full shadow-md transition-all text-sm"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
