"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isLight, setIsLight] = useState<boolean>(false);

  useEffect(() => {
    // Check saved or default
    const saved = localStorage.getItem("centurion-theme");
    if (saved === "light") {
      setIsLight(true);
      document.documentElement.classList.add("light");
    } else {
      setIsLight(false);
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("centurion-theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("centurion-theme", "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to Obsidian dark theme" : "Switch to Ivory light theme"}
      className={`relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-full border border-white/10 hover:border-gold/40 text-ivory transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`}
    >
      <motion.div
        key={isLight ? "sun" : "moon"}
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        exit={{ rotate: 90, scale: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center text-gold"
      >
        {isLight ? <Icon name="Sun" size={18} /> : <Icon name="Moon" size={18} />}
      </motion.div>
    </button>
  );
}
