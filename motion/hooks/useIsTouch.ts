"use client";

import { useState, useEffect } from "react";

export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState<boolean>(true); // default mobile/touch first

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return isTouch;
}
