"use client";

import React from "react";
import { Sparkles, MapPin, Mail, ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { SITE_CONFIG } from "@/data/siteContent";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B132B] text-white pt-16 pb-12 border-t border-sky-900/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Identity & Location */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed pt-2">
              Kreators Lab helps young creators think independently, explore AI responsibly, and bring original ideas to life.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-semibold tracking-wide border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>{SITE_CONFIG.tagline}</span>
            </div>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{SITE_CONFIG.geographicFocus}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>hello@kreatorslab.ai</span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#top" className="hover:text-sky-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-sky-400 transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-sky-400 transition-colors">
                  Student Projects
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-sky-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-orange-400 font-bold transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#parents" className="hover:text-sky-400 transition-colors">
                  Parent Resources
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sky-400 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#program-finder" className="hover:text-sky-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Kreators Lab. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <a href="#top" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#top" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#top" className="hover:text-white transition-colors">
              Registration &amp; Cancellation Policy
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 hover:underline focus:outline-none cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
