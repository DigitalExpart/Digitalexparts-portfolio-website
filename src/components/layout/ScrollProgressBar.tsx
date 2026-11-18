"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15,
          },
        }
      );
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-progress)] h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[var(--accent)] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
