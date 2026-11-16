"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site.config";
import { useDayPhase } from "@/motion/hooks/useDayPhase";
import { usePerformanceTier } from "@/motion/hooks/usePerformanceTier";
import { useIsTouch } from "@/motion/hooks/useIsTouch";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { t } from "@/motion/tokens";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dayPhase = useDayPhase();
  const tier = usePerformanceTier();
  const isTouch = useIsTouch();

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Parallax: 8% on mobile, 12% on desktop
  const { scrollY } = useScroll();
  const parallaxOffset = isTouch ? ["0%", "8%"] : ["0%", "12%"];
  const yParallax = useTransform(scrollY, [0, 800], parallaxOffset);

  // Desktop Pointer Spotlight Gating (WCAG and hardware-safe)
  useEffect(() => {
    if (isTouch || tier === "low") return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        setMousePos({ x: xPercent, y: yPercent });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouch, tier]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92svh] md:min-h-svh flex items-center justify-center overflow-hidden bg-obsidian text-ivory"
      style={{
        backgroundImage:
          !isTouch && tier === "high"
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201, 162, 75, 0.12) 0%, transparent 60%)`
            : undefined,
      }}
    >
      {/* Background Hero Image with Slow Ken Burns & Scroll Parallax */}
      <motion.div
        style={{ y: tier === "low" ? 0 : yParallax }}
        className="absolute inset-0 w-full h-[115%] -top-[7%] z-0 pointer-events-none"
      >
        <motion.div
          animate={
            tier === "low"
              ? {}
              : {
                  scale: [1, 1.06, 1],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/placeholders/hero-centurion.svg"
            alt="The Centurion Restaurant and Rooftop Lounge interior at Wave Mall, Lucknow"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-75 contrast-[1.08]"
          />
        </motion.div>

        {/* Multi-layered Vignette Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/75" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />

        {/* Evening Twilight Mood Glow (fades in after 5:30 PM IST) */}
        <motion.div
          animate={{ opacity: dayPhase.isEvening ? 0.35 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-b from-oxblood/40 via-transparent to-amber-950/30 mix-blend-color-dodge pointer-events-none"
        />

        {/* Light Sweep (CSS transform-only, paused in low tier) */}
        {tier !== "low" && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 bottom-0 left-0 w-1/3 animate-sweep"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(201, 162, 75, 0.14) 50%, transparent 100%)",
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Hero Content Stage */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-20 text-center flex flex-col items-center">
        {/* Eyebrow: Cinzel uppercase with 0.28em letter spacing */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: t.dur.base, ease: t.ease }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="w-8 h-[1px] bg-gold/50" />
          <span className="font-cinzel text-xs sm:text-sm tracking-eyebrow text-gold uppercase">
            3rd Floor (Top Floor) • Wave Mall, Lucknow
          </span>
          <span className="w-8 h-[1px] bg-gold/50" />
        </motion.div>

        {/* Masked Cormorant Garamond Headline Unveil */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: t.ease, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-ivory tracking-tightest leading-[1.08]"
          >
            An Evening Worth
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: t.ease, delay: 0.2 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-gold-champagne tracking-tightest leading-[1.08]"
          >
            The Climb
          </motion.h2>
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: t.dur.base, ease: t.ease, delay: 0.35 }}
          className="font-body text-base sm:text-lg text-ivory/85 max-w-2xl leading-relaxed mb-8"
        >
          Step through the arch into Lucknow’s grandest dining destination. Expansive live cooking
          counters, rooftop open sky, and an attentive children’s play area.
        </motion.p>

        {/* CTAs: Gold Primary & Hairline Outline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: t.dur.base, ease: t.ease, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
        >
          <Link href="/reserve" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              isFullWidth
              icon={<Icon name="Calendar" size={18} />}
            >
              Reserve a Table
            </Button>
          </Link>

          <Link href="/menu" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              isFullWidth
              icon={<Icon name="UtensilsCrossed" size={18} />}
            >
              View Menu
            </Button>
          </Link>
        </motion.div>

        {/* Status Pill & Day Mood Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: t.dur.base, ease: t.ease, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <StatusPill />
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="font-cinzel text-xs tracking-eyebrow text-gold/90 uppercase">
            {dayPhase.tagline}
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-xs text-smoke font-body">
            Rated 4.1 in Gomti Nagar
          </span>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue Hairline */}
      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center pointer-events-none z-10">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-cinzel text-[10px] tracking-eyebrow text-gold/70 uppercase">
            Discover
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
