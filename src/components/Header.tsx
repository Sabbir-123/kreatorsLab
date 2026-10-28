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
            ? "bg-[#18123B]/92 backdrop-blur-2xl border border-[#473DEA]/40 shadow-[0_16px_45px_-6px_rgba(71,61,234,0.35)] ring-1 ring-[#473DEA]/30 py-2 sm:py-2.5 px-4 sm:px-6"
            : "bg-[#1F184A]/88 backdrop-blur-xl border border-[#473DEA]/35 shadow-[0_12px_40px_-8px_rgba(71,61,234,0.28)] ring-1 ring-[#473DEA]/20 py-2.5 sm:py-3 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo on the Left - Larger size & light wordmark */}
          <div className="flex items-center">
            <Logo variant="light" size="md" />
          </div>

          {/* Desktop: Exactly Five Navigation Links with Electric Purple Hover */}
          <nav
            className="hidden md:flex items-center gap-1 text-sm font-semibold text-white/90"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-white/85 hover:text-[#DFFF00] hover:bg-[#473DEA]/20 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Separate CTA Button on the Right: Electric Purple #473DEA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/programs"
              onClick={onExplorePrograms}
              className="inline-flex items-center gap-2 bg-[#473DEA] hover:bg-[#3D33CE] text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-full shadow-[0_4px_18px_rgba(71,61,234,0.45)] hover:shadow-[0_6px_24px_rgba(71,61,234,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00]"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFFF00]" />
            </Link>
          </div>

          {/* Mobile: Accessible Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <Link
              href="/programs"
              className="inline-flex items-center text-xs font-bold bg-[#473DEA] text-white px-3.5 py-1.5 rounded-full shadow-xs"
            >
              Programs
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00] min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#DFFF00]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Drawer in Electric Purple Glass */}
      {mobileMenuOpen && (
        <div className="max-w-md mx-auto mt-2.5 rounded-3xl bg-[#18123B]/98 backdrop-blur-2xl border border-[#473DEA]/35 shadow-[0_20px_50px_rgba(71,61,234,0.35)] p-5 pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="px-4 py-2.5 rounded-2xl text-sm font-semibold text-white/90 hover:bg-[#473DEA]/20 hover:text-[#DFFF00] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-white/10">
            <Link
              href="/programs"
              onClick={handleNavClick}
              className="w-full inline-flex items-center justify-center gap-2 text-center bg-[#473DEA] hover:bg-[#3D33CE] text-white font-extrabold py-2.5 px-4 rounded-full shadow-xs transition-all text-sm"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4 text-[#DFFF00]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
