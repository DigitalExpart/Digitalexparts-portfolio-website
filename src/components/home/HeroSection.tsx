"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";
import { HERO_COPY } from "@/data/home";
import { SITE } from "@/data/site";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const HERO_MORPH_PHRASES = [
  "win clients.",
  "launch apps.",
  "automate work.",
  "stand out.",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);

  const [isHolding, setIsHolding] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const { scrollTo } = useSmoothScroll();
  const { prefersReducedMotion } = useMediaCapabilities();

  // Subtle scrubbed depth parallax on scroll out
  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    const inner = parallaxRef.current;
    if (!section || !inner || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        yPercent: 10,
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

  // Smooth kinetic word cycling ("Built to / [win clients. / launch apps. / ...]")
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      const el = phraseRef.current;
      if (!el) return;

      gsap.to(el, {
        yPercent: -60,
        opacity: 0,
        duration: 0.34,
        ease: "power2.in",
        onComplete: () => {
          setPhraseIndex((prev) => (prev + 1) % HERO_MORPH_PHRASES.length);
          gsap.fromTo(
            el,
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.55, ease: "expo.out" }
          );
        },
      });
    }, 2800);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-[calc(var(--header-height)+1.25rem)] pb-7 sm:pb-10"
    >
      {/* Dynamic Interactive 3D Sculpted DE Emblem & Spring Lines (M7) */}
      <HeroCanvas onHoldingChange={setIsHolding} />

      {/* Subtle readability gradient vignette without blocking canvas hold gestures */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 22% 38%, rgba(5, 6, 10, 0.72) 0%, rgba(5, 6, 10, 0.16) 62%, rgba(5, 6, 10, 0.84) 100%)",
        }}
      />

      {/* Top-Left Editorial Headline & Primary CTAs (pointer-events-none wrapper lets center touches pass to 3D sculpture) */}
      <div
        ref={parallaxRef}
        className="container-editorial pointer-events-none relative z-10 my-auto py-4 sm:py-8 will-change-transform"
      >
        <div className="max-w-xl space-y-5 sm:space-y-6">
          <FadeUp trigger="enter" delay={0.04} className="pointer-events-auto inline-block">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/85 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--accent)]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              <span>{HERO_COPY.availabilityLabel}</span>
            </div>
          </FadeUp>

          <h1 className="font-display text-[clamp(2.5rem,6.4vw,5.4rem)] font-bold leading-[0.94] tracking-[-0.04em] text-[var(--text-primary)]">
            <span className="block">Built to</span>
            <span className="mt-1 block overflow-hidden">
              <span
                ref={phraseRef}
                className="inline-block text-[var(--accent)] will-change-transform"
              >
                {HERO_MORPH_PHRASES[phraseIndex]}
              </span>
            </span>
          </h1>

          <FadeUp trigger="enter" delay={0.28} className="pointer-events-auto flex flex-wrap items-center gap-3 pt-1">
            <MagneticButton href="#contact" variant="primary" size="lg">
              <span>{HERO_COPY.primaryCta}</span>
              <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton href={SITE.calendlyUrl} external variant="secondary" size="lg">
              <span>{HERO_COPY.secondaryCta}</span>
              <span aria-hidden="true">↗</span>
            </MagneticButton>
          </FadeUp>
        </div>
      </div>

      {/* Bottom Telemetry, Interactive Line Hint & Corner Proof Block */}
      <div className="container-editorial pointer-events-none relative z-10 space-y-4">
        {/* Bottom-Center Hold Prompt matching Trionn layout */}
        <div className="flex justify-center">
          <div
            aria-hidden="true"
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] transition-all duration-300 backdrop-blur-sm ${
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
            <span>
              {isHolding
                ? "Expanding 3D DE Emblem"
                : "Hold to ignite · Touch & sweep the lines"}
            </span>
          </div>
        </div>

        {/* Bottom Split: Left Scroll Circle + Marketplace Strip | Right Trionn-Style Boxed Summary */}
        <div className="grid grid-cols-1 gap-6 border-t border-[var(--border-subtle)] pt-5 lg:grid-cols-12 lg:items-end">
          {/* Bottom Left: Scroll Button + Proof & Name Clarity */}
          <div className="pointer-events-auto lg:col-span-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <button
              type="button"
              onClick={() => scrollTo("#intro")}
              aria-label="Scroll to introduction"
              className="group inline-flex min-h-[44px] w-fit items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-secondary)] hover:text-[var(--accent)] active:scale-95 transition-transform"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] transition-colors duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)]">
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </span>
              <span className="lg:hidden">Explore Studio</span>
            </button>

            <div className="space-y-1 text-xs">
              <p className="font-mono uppercase tracking-[0.1em] text-[var(--text-primary)]">
                <span className="text-[var(--accent)]">200+ orders</span> · 4.7 rating (57 reviews) · 416 Upwork hrs
              </p>
              <p className="text-[var(--text-secondary)]">
                {HERO_COPY.nameClarityLine}{" "}
                <TransitionLink
                  href="/about#names"
                  className="font-medium text-[var(--accent)] underline underline-offset-4 hover:text-[var(--text-primary)]"
                >
                  {HERO_COPY.nameClarityCta} →
                </TransitionLink>
              </p>
            </div>
          </div>

          {/* Bottom Right: Hairline Boxed Experience Marker + Short Capability Copy */}
          <div className="pointer-events-auto lg:col-span-5 flex flex-col gap-3 lg:ml-auto lg:max-w-sm">
            <div className="grid grid-cols-12 border border-[var(--border-strong)] bg-[var(--bg-elevated)]/75 backdrop-blur-sm">
              <div className="col-span-4 flex flex-col items-center justify-center gap-1 border-r border-[var(--border-strong)] px-3 py-2.5 text-center">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-[var(--accent)]"
                >
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <ellipse cx="12" cy="12" rx="4.2" ry="9" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M3.5 12h17" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--text-primary)]">
                  6+ Years
                </span>
              </div>
              <div className="col-span-8 flex flex-col justify-center px-3.5 py-2.5">
                <span className="font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-[var(--text-secondary)]">
                  25+ specialists building web, mobile apps &amp; AI.
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
              Websites, iOS &amp; Android apps, AI automation, 2D/3D animation and AI video built for
              clarity, speed and growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
