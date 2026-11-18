"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { INTRO_COPY } from "@/data/home";
import { WordScrubHighlight, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

export function IntroStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const gridShapeRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          yPercent: -24,
          xPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
      if (gridShapeRef.current) {
        gsap.to(gridShapeRef.current, {
          yPercent: 18,
          rotation: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="intro"
      ref={sectionRef}
      aria-labelledby="intro-heading"
      className="relative overflow-hidden section-pad hairline-t"
    >
      {/* M13 Background Parallax Shapes */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full opacity-20 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        }}
      />
      <div
        ref={gridShapeRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-12 h-56 w-56 rounded-3xl border border-[var(--border-subtle)] opacity-35 will-change-transform"
      />

      <div className="container-editorial relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3 space-y-4">
            <h2 id="intro-heading" className="text-eyebrow">
              {INTRO_COPY.eyebrow}
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              Built for founders, small businesses, and agencies who value clarity and velocity.
            </p>
          </div>

          <div className="lg:col-span-9 space-y-10">
            <WordScrubHighlight
              text={INTRO_COPY.statement}
              className="font-display text-[clamp(1.65rem,3.4vw,3.1rem)] font-semibold leading-[1.18] tracking-[-0.025em] text-[var(--text-primary)]"
            />

            <FadeUp className="flex flex-wrap items-center justify-between gap-6 border-t border-[var(--border-subtle)] pt-8">
              <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                <span className="rounded-full border border-[var(--border-subtle)] px-3.5 py-1.5">
                  Direct 1-on-1 Execution
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] px-3.5 py-1.5">
                  On-Demand Vetted Roster
                </span>
                <span className="rounded-full border border-[var(--border-subtle)] px-3.5 py-1.5">
                  Remote · Worldwide
                </span>
              </div>

              <MagneticButton href="/about" variant="secondary" size="md">
                <span>{INTRO_COPY.ctaLabel}</span>
                <span aria-hidden="true">→</span>
              </MagneticButton>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
