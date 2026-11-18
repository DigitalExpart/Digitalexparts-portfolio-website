"use client";

import { useEffect, useState } from "react";

export interface MediaCapabilities {
  prefersReducedMotion: boolean;
  isDesktopFinePointer: boolean;
  isTouchDevice: boolean;
  mounted: boolean;
}

/**
 * Tracks reduced-motion preference and pointer capabilities reactively.
 * Used to disable custom cursors, magnetic pull, and heavy shaders on touch/reduced-motion.
 */
export function useMediaCapabilities(): MediaCapabilities {
  const [caps, setCaps] = useState<MediaCapabilities>({
    prefersReducedMotion: false,
    isDesktopFinePointer: false,
    isTouchDevice: false,
    mounted: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      const reduced = motionQuery.matches;
      const fine = finePointerQuery.matches;
      const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setCaps({
        prefersReducedMotion: reduced,
        isDesktopFinePointer: fine,
        isTouchDevice: !fine && hasTouch,
        mounted: true,
      });
    };

    update();
    motionQuery.addEventListener("change", update);
    finePointerQuery.addEventListener("change", update);

    return () => {
      motionQuery.removeEventListener("change", update);
      finePointerQuery.removeEventListener("change", update);
    };
  }, []);

  return caps;
}
