"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light" | "banner";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBadge?: boolean;
}

export function Logo({
  variant = "dark",
  size = "md",
  className = "",
}: LogoProps) {
  // variant="light" is for dark backgrounds (Footer, Dark Navbar) -> uses white wordmark + neon-lime S
  // variant="dark" is for light backgrounds -> uses dark navy wordmark + neon-lime S
  const isLight = variant === "light";
  const logoSrc = isLight
    ? "/brand/kreators-lab-logo-light.png"
    : "/brand/kreators-lab-logo-dark.png";

  const sizeClasses = {
    sm: "h-7 sm:h-8 w-28 sm:w-36",
    md: "h-9 sm:h-11 w-38 sm:w-48",
    lg: "h-11 sm:h-13 w-48 sm:w-56",
    xl: "h-14 sm:h-16 w-56 sm:w-68",
  }[size];

  return (
    <Link
      href="#top"
      className={`group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFFF00] rounded-xl transition-transform hover:scale-[1.03] ${className}`}
      aria-label="Kreators Lab — Home"
    >
      <div className={`relative ${sizeClasses} flex items-center justify-start`}>
        <Image
          src={logoSrc}
          alt="Kreators Lab — Think | Innovation | Excitement"
          width={1024}
          height={342}
          className="h-full w-auto object-contain object-left"
          priority
        />
      </div>
    </Link>
  );
}
