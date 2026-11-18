"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";
import { StatsSection } from "@/components/home/StatsSection";
import { ToolsMarqueeSection } from "@/components/home/ToolsMarqueeSection";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

/**
 * M13 Scroll Extra: Smooth dark-to-light theme contrast band as it scrolls into view,
 * shifting back to dark as it exits toward the pinned Process section.
 */
export function LightContrastBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const [isLight, setIsLight] = useState(false);
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const el = bandRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 64%",
      end: "bottom 36%",
      onEnter: () => setIsLight(true),
      onEnterBack: () => setIsLight(true),
      onLeave: () => setIsLight(false),
      onLeaveBack: () => setIsLight(false),
    });

    return () => {
      trigger.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={bandRef}
      className="transition-colors duration-700 ease-out"
      style={{
        backgroundColor: isLight ? "var(--bg-light)" : "var(--bg-primary)",
        color: isLight ? "var(--text-on-light)" : "var(--text-primary)",
      }}
    >
      <StatsSection isLightTheme={isLight} />
      <ToolsMarqueeSection isLightTheme={isLight} />
    </div>
  );
}
