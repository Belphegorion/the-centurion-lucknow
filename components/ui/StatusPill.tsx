"use client";

import { useEffect, useState } from "react";
import { getISTStatus, ISTStatus } from "@/lib/time";
import { motion, AnimatePresence } from "framer-motion";

interface StatusPillProps {
  className?: string;
  showDetails?: boolean;
}

export function StatusPill({ className = "", showDetails = true }: StatusPillProps) {
  const [status, setStatus] = useState<ISTStatus>({
    isOpen: true,
    text: "Open daily",
    subtext: "12:00 PM – 11:30 PM",
    currentTimeIST: "12:00",
  });

  useEffect(() => {
    setStatus(getISTStatus());
    const interval = setInterval(() => {
      setStatus(getISTStatus());
    }, 60000); // Re-checked every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-charcoal/90 border border-gold/30 backdrop-blur-md text-xs font-body ${className}`}
    >
      {/* Pulsing Dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        {status.isOpen && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            status.isOpen ? "bg-gold" : "bg-smoke"
          }`}
        />
      </span>

      {/* Cross-fading status text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={status.text + status.subtext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5"
        >
          <span
            className={`font-medium ${
              status.isOpen ? "text-ivory" : "text-smoke"
            }`}
          >
            {status.text}
          </span>
          {showDetails && (
            <>
              <span className="text-white/20">•</span>
              <span className="text-smoke">{status.subtext}</span>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
