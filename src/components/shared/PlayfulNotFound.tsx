"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

const FUN_STATUS_LINES = [
  "That page has moved or never existed. Head back home, see our work, or tell us what you were looking for.",
  "Lost? Let's get you back on track.",
  "Looks like this URL took a coffee break — pick a real destination below.",
];

export function PlayfulNotFound() {
  const stageRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);
  const [jokeIdx, setJokeIdx] = useState(0);
  const { isDesktopFinePointer, prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const stage = stageRef.current;
    const digits = digitsRef.current;
    if (!stage || !digits || !isDesktopFinePointer || prefersReducedMotion) return;

    const chars = digits.querySelectorAll<HTMLElement>("[data-404-digit]");
    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
      const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;

      chars.forEach((char, i) => {
        const factor = i === 1 ? -28 : 18;
        gsap.to(char, {
          x: nx * factor,
          y: ny * factor,
          rotation: nx * (i === 1 ? -10 : 6),
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    const onLeave = () => {
      gsap.to(chars, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave);

    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [isDesktopFinePointer, prefersReducedMotion]);

  return (
    <section
      ref={stageRef}
      className="relative flex min-h-[calc(100dvh-2rem)] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        }}
      />

      <div className="container-editorial relative z-10 flex flex-col items-center space-y-8">
        <button
          type="button"
          onClick={() => setJokeIdx((i) => (i + 1) % FUN_STATUS_LINES.length)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)] hover:border-[var(--accent)]"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span>HTTP 404 · Tap for status note</span>
        </button>

        {/* Interactive Kinetic 404 Digits */}
        <div
          ref={digitsRef}
          aria-hidden="true"
          className="flex items-center justify-center gap-2 sm:gap-5 select-none"
        >
          <span
            data-404-digit
            className="font-display text-[clamp(5.5rem,22vw,16rem)] font-extrabold leading-none tracking-tighter text-[var(--text-primary)] will-change-transform"
          >
            4
          </span>
          <span
            data-404-digit
            className="font-display text-[clamp(5.5rem,22vw,16rem)] font-extrabold leading-none tracking-tighter text-[var(--accent)] will-change-transform"
          >
            0
          </span>
          <span
            data-404-digit
            className="font-display text-[clamp(5.5rem,22vw,16rem)] font-extrabold leading-none tracking-tighter text-[var(--text-primary)] will-change-transform"
          >
            4
          </span>
        </div>

        <HeadingReveal as="h1" trigger="enter" className="text-h2 max-w-2xl">
          Page not found
        </HeadingReveal>

        <FadeUp trigger="enter" delay={0.18} className="max-w-lg">
          <p className="text-base text-[var(--text-secondary)]">
            {FUN_STATUS_LINES[jokeIdx]}
          </p>
        </FadeUp>

        <FadeUp trigger="enter" delay={0.26} className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <MagneticButton href="/" variant="primary" size="lg">
            <span>Back to home</span>
            <span aria-hidden="true">→</span>
          </MagneticButton>
          <MagneticButton href="/work" variant="secondary" size="lg">
            <span>See our work</span>
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost" size="lg">
            <span>Start your project</span>
          </MagneticButton>
        </FadeUp>
      </div>
    </section>
  );
}
