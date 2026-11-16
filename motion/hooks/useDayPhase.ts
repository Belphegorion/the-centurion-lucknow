"use client";

import { useState, useEffect } from "react";

export interface DayPhase {
  phase: "day" | "evening";
  isEvening: boolean;
  tagline: string;
}

export function useDayPhase(): DayPhase {
  const [phase, setPhase] = useState<DayPhase>({
    phase: "day",
    isEvening: false,
    tagline: "Lunch & Afternoon Spread",
  });

  useEffect(() => {
    function computePhase() {
      try {
        const now = new Date();
        // Convert to Asia/Kolkata
        const istString = now.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "numeric",
          minute: "numeric",
        });

        const [hourStr, minStr] = istString.split(":");
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minStr, 10);
        const totalMinutes = hour * 60 + minute;

        // Evening starts at 5:30 PM (17:30 = 1050 minutes)
        const isEve = totalMinutes >= 1050 || totalMinutes < 300;

        setPhase({
          phase: isEve ? "evening" : "day",
          isEvening: isEve,
          tagline: isEve ? "Tonight's Lounge & Dinner" : "Lunch & Afternoon Spread",
        });
      } catch {
        // Fallback
        const h = new Date().getHours();
        const isEve = h >= 17;
        setPhase({
          phase: isEve ? "evening" : "day",
          isEvening: isEve,
          tagline: isEve ? "Tonight's Lounge & Dinner" : "Lunch & Afternoon Spread",
        });
      }
    }

    computePhase();
    const interval = setInterval(computePhase, 60000);
    return () => clearInterval(interval);
  }, []);

  return phase;
}
