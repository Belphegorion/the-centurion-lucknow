"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { t, viewportConfig } from "./tokens";

interface ArchRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ArchReveal({
  children,
  className = "",
  delay = 0,
}: ArchRevealProps) {
  return (
    <div className={`overflow-hidden rounded-t-[140px] rounded-b-[14px] ${className}`}>
      <motion.div
        initial={{
          clipPath: "inset(12% 0% 0% 0% round 140px 140px 14px 14px)",
          scale: 1.08,
          opacity: 0.8,
        }}
        whileInView={{
          clipPath: "inset(0% 0% 0% 0% round 140px 140px 14px 14px)",
          scale: 1,
          opacity: 1,
        }}
        viewport={viewportConfig}
        transition={{
          duration: t.dur.image,
          ease: t.ease,
          delay,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
