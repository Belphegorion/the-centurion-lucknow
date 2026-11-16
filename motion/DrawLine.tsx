"use client";

import { motion } from "framer-motion";
import { t, viewportConfig } from "./tokens";

interface DrawLineProps {
  direction?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
  duration?: number;
  color?: string;
}

export function DrawLine({
  direction = "horizontal",
  className = "",
  delay = 0.2,
  duration = t.dur.slow,
  color,
}: DrawLineProps) {
  const isHoriz = direction === "horizontal";

  return (
    <div
      className={`overflow-hidden ${
        isHoriz ? "h-[1px] w-full" : "w-[1px] h-full"
      } ${className}`}
    >
      <motion.div
        initial={isHoriz ? { scaleX: 0, originX: 0 } : { scaleY: 0, originY: 0 }}
        whileInView={isHoriz ? { scaleX: 1 } : { scaleY: 1 }}
        viewport={viewportConfig}
        transition={{
          duration,
          ease: t.ease,
          delay,
        }}
        className={`w-full h-full ${color ? "" : "bg-gold/40"}`}
        style={color ? { backgroundColor: color } : undefined}
      />
    </div>
  );
}
