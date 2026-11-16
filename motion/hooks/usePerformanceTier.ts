"use client";

import { useState, useEffect } from "react";

export type PerformanceTier = "low" | "high";

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>("high");

  useEffect(() => {
    try {
      const isLowCore =
        typeof navigator !== "undefined" &&
        navigator.hardwareConcurrency !== undefined &&
        navigator.hardwareConcurrency <= 4;

      const isLowMemory =
        typeof navigator !== "undefined" &&
        "deviceMemory" in navigator &&
        Number((navigator as unknown as { deviceMemory?: number }).deviceMemory) <= 4;

      const isSaveData =
        typeof navigator !== "undefined" &&
        "connection" in navigator &&
        Boolean((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData);

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isLowCore || isLowMemory || isSaveData || prefersReduced) {
        setTier("low");
        document.documentElement.classList.add("low-power");
      } else {
        setTier("high");
        document.documentElement.classList.remove("low-power");
      }
    } catch {
      setTier("high");
    }
  }, []);

  return tier;
}
