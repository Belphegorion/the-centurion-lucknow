"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, viewportConfig, t } from "./tokens";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  yOffset = 16,
  className = "",
}: RevealProps) {
  const variants = fadeUp(yOffset);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      transition={{ delay, duration: t.dur.base, ease: t.ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
