"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { tapScale } from "@/motion/tokens";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "goldOutline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isFullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconPosition = "left",
  isFullWidth = false,
  disabled,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-body font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[44px] rounded-[10px] select-none text-center";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm tracking-wide",
    md: "px-6 py-2.5 text-base tracking-wide",
    lg: "px-8 py-3.5 text-lg tracking-wider",
  };

  const variantClasses = {
    primary:
      "bg-gold text-obsidian font-semibold hover:bg-gold-light active:bg-gold shadow-sm",
    outline:
      "border border-ivory/20 text-ivory hover:border-gold/60 hover:text-gold active:bg-charcoal",
    goldOutline:
      "border border-gold text-gold hover:bg-gold hover:text-obsidian active:bg-gold-light",
    ghost:
      "text-ivory/80 hover:text-gold hover:bg-white/5 active:bg-white/10",
  };

  return (
    <motion.button
      type={type}
      whileTap={disabled ? undefined : tapScale}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isFullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...(props as any)}
    >
      {icon && iconPosition === "left" && <span className="mr-2.5 shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2.5 shrink-0">{icon}</span>}
    </motion.button>
  );
}
