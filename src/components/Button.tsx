"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const variantStyles = {
    // Neon Lime CTA button with dark text for maximum contrast on purple/dark backgrounds
    primary:
      "bg-[#DFFF00] hover:bg-[#d4f200] text-[#18152B] shadow-md hover:shadow-lg hover:scale-[1.02] focus-visible:ring-[#DFFF00]",
    // Primary Purple button with white text
    secondary:
      "bg-[#35309B] hover:bg-[#302A91] text-white shadow-xs hover:shadow-md hover:scale-[1.02] focus-visible:ring-[#35309B]",
    // Clean outline button with backdrop blur
    outline:
      "bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-xs hover:scale-[1.01] focus-visible:ring-white",
    // Ghost button with subtle hover
    ghost:
      "text-[#35309B] hover:bg-[#F5F4FF] focus-visible:ring-[#35309B]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
