"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";
import { SITE } from "@/data/site";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isHolding, setIsHolding] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    const inner = parallaxRef.current;
    if (!section || !inner || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        yPercent: 14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-[calc(var(--header-height)+1.5rem)] pb-8 sm:pb-10"
    >
      {/* Dynamic Interactive WebGL Canvas (M7) */}
      <HeroCanvas onHoldingChange={setIsHolding} />

      {/* Subtle radial readability vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 28% 50%, rgba(5, 6, 10, 0.72) 0%, rgba(5, 6, 10, 0.28) 65%, rgba(5, 6, 10, 0.78) 100%)",
        }}
      />

      {/* Main Hero Copy & CTAs */}
      <div
        ref={parallaxRef}
        className="container-editorial relative z-10 my-auto py-8 sm:py-12 will-change-transform"
      >
        <div className="max-w-4xl space-y-7 sm:space-y-9">
          <FadeUp trigger="enter" delay={0.04}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/85 px-4 py-2 text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--accent)]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span>{SITE.availability.label}</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-primary)]">Solo or Team</span>
            </div>
          </FadeUp>

          <HeadingReveal
            as="h1"
            trigger="enter"
            delay={0.12}
            className="text-display max-w-4xl"
          >
            Websites that move people.
          </HeadingReveal>

          <FadeUp trigger="enter" delay={0.26} className="max-w-2xl">
            <p className="text-lead text-[var(--text-secondary)]">
              One-stop digital partner for bespoke websites, no-code builds, UI/UX, branding,
              email marketing, and AI video — built solo by {SITE.owner} or scaled with a vetted team.
            </p>
          </FadeUp>

          <FadeUp trigger="enter" delay={0.34} className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
            <MagneticButton href="#contact" variant="primary" size="lg">
              <span>Discuss your project</span>
              <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton href={SITE.calendlyUrl} external variant="secondary" size="lg">
              <span>Book a 30-minute call</span>
              <span aria-hidden="true">↗</span>
            </MagneticButton>
          </FadeUp>
        </div>
      </div>

      {/* Bottom Hero Telemetry & Controls */}
      <div className="container-editorial relative z-10 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
        {/* Scroll Down Indicator */}
        <button
          type="button"
          onClick={() => scrollTo("#intro")}
          aria-label="Scroll to introduction"
          className="group inline-flex min-h-[44px] items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-secondary)] hover:text-[var(--accent)]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)]">
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </span>
          <span className="hidden sm:inline">Scroll to explore</span>
        </button>

        {/* Interactive Canvas Hint Label */}
        <div
          aria-hidden="true"
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
            isHolding
              ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] scale-105"
              : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 text-[var(--text-secondary)]"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              isHolding ? "bg-[var(--accent)]" : "bg-[var(--text-secondary)]"
            }`}
          />
          <span>{isHolding ? "Rippling field" : "Hold to ripple"}</span>
        </div>

        {/* Right Positioning Stamp */}
        <div className="hidden md:flex items-center gap-3 text-right">
          <div className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-muted)]">
            <span className="block text-[var(--text-primary)]">{SITE.timezoneNote}</span>
            <span>{SITE.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
