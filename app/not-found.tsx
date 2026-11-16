"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/motion/tokens";

export default function NotFound() {
  return (
    <div className="min-h-[80svh] flex items-center justify-center bg-obsidian text-ivory px-5 py-20 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center">
        {/* Animated Gold Arch Drawing with Lantern */}
        <div className="relative w-48 h-64 mx-auto mb-8">
          <svg className="w-full h-full" viewBox="0 0 200 300">
            {/* Arch path */}
            <motion.path
              d="M 20 280 L 20 120 C 20 40, 180 40, 180 120 L 180 280"
              fill="none"
              stroke="#C9A24B"
              strokeWidth="2.5"
              strokeDasharray="600"
              initial={{ strokeDashoffset: 600 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.2, ease: t.ease }}
            />
            {/* Ground line */}
            <motion.line
              x1="0"
              y1="280"
              x2="200"
              y2="280"
              stroke="#C9A24B"
              strokeWidth="1.5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: t.ease }}
            />
          </svg>

          {/* Lantern appearing inside arch with warm amber glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: t.ease }}
            className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none"
          >
            <div className="w-12 h-16 rounded-[10px] border border-gold/60 bg-gradient-to-b from-charcoal via-amber-950/40 to-charcoal flex flex-col items-center justify-center shadow-glow">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping mb-1" />
              <Icon name="Flame" size={18} className="text-gold" />
            </div>
            <div className="w-4 h-1 bg-gold/40 rounded-full mt-1" />
          </motion.div>
        </div>

        <span className="font-cinzel text-xs tracking-eyebrow text-gold uppercase block mb-2">
          404 Error • Enclave Not Found
        </span>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ivory mb-3">
          This Table is Not on the Menu
        </h1>

        <p className="text-smoke text-sm leading-relaxed mb-8 max-w-sm">
          The requested doorway does not exist on the 3rd floor. Allow us to escort you back to the main room.
        </p>

        <Link href="/">
          <Button
            size="md"
            variant="primary"
            icon={<Icon name="Home" size={16} />}
          >
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
