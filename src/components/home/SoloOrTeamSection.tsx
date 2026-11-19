"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { ENGAGEMENT_MODELS, TEAM_ROLES } from "@/data/home";
import { SITE } from "@/data/site";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

const ROLE_SHORT_LABELS = [
  "UI/UX",
  "Web & Apps",
  "No-Code",
  "AI Auto",
  "Branding",
  "2D/3D & Edit",
  "AI Video",
  "Email",
];

export function SoloOrTeamSection() {
  const [mode, setMode] = useState<"solo" | "team">("solo");
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const spotlightCardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  const current = ENGAGEMENT_MODELS[mode];
  const activeRole = TEAM_ROLES[activeRoleIdx] ?? TEAM_ROLES[0];

  // Mode toggle animation
  useEffect(() => {
    ensureGsapRegistered();
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion) return;

    const items = panel.querySelectorAll("[data-morph-item]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.52,
          stagger: 0.045,
          ease: "expo.out",
          overwrite: true,
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [mode, prefersReducedMotion]);

  // Kinetic 3D card swap whenever activeRoleIdx changes
  useEffect(() => {
    ensureGsapRegistered();
    const card = spotlightCardRef.current;
    if (!card || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 22,
          rotateX: -8,
          scale: 0.96,
          transformPerspective: 900,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.58,
          ease: "expo.out",
          clearProps: "transform",
          overwrite: true,
        }
      );
    }, spotlightCardRef);

    return () => ctx.revert();
  }, [activeRoleIdx, prefersReducedMotion]);

  const goToRole = useCallback((idx: number) => {
    const normalized = (idx + TEAM_ROLES.length) % TEAM_ROLES.length;
    setActiveRoleIdx(normalized);
  }, []);

  // Auto-cycle single specialist spotlight every 3.4s with live lime progress bar
  useEffect(() => {
    ensureGsapRegistered();
    const bar = progressBarRef.current;

    if (prefersReducedMotion || isPaused) {
      if (bar) gsap.killTweensOf(bar);
      return;
    }

    if (bar) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 3.4,
          ease: "none",
          overwrite: true,
        }
      );
    }

    const timer = window.setTimeout(() => {
      setActiveRoleIdx((prev) => (prev + 1) % TEAM_ROLES.length);
    }, 3400);

    return () => {
      window.clearTimeout(timer);
      if (bar) gsap.killTweensOf(bar);
    };
  }, [activeRoleIdx, isPaused, prefersReducedMotion]);

  return (
    <section
      id="engagement"
      aria-labelledby="engagement-heading"
      className="relative overflow-hidden section-pad hairline-t bg-[linear-gradient(180deg,#05060A_0%,#0C1220_52%,#05060A_100%)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 h-[420px] w-[420px] sm:h-[580px] sm:w-[580px] opacity-[0.05]"
      >
        <Image
          src="/brand/logo-mark-dark.svg"
          alt=""
          width={580}
          height={580}
          unoptimized
          className="h-full w-full -rotate-12"
        />
      </div>

      <div className="container-editorial relative z-10 space-y-10 sm:space-y-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-eyebrow">04 · Solo or Team</p>
            <HeadingReveal as="h2" id="engagement-heading" className="text-h1">
              Hire one expert or a full team
            </HeadingReveal>
            <FadeUp>
              <p className="max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
                Small project? Work directly with one specialist. Bigger build? Tap into our{" "}
                {SITE.teamSize} across web, mobile apps, AI automation, 2D/3D animation,
                illustration, video editing, email and AI video — backed by {SITE.yearsExperience}{" "}
                working together, with one point of contact.
              </p>
            </FadeUp>
          </div>

          <FadeUp className="flex flex-wrap items-center gap-4 shrink-0">
            <div
              role="tablist"
              aria-label="Choose engagement model"
              className="relative inline-grid grid-cols-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-1.5"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-[var(--accent)] transition-transform duration-500 ease-[var(--ease-expo)] ${
                  mode === "team" ? "translate-x-full" : "translate-x-0"
                }`}
              />

              <button
                type="button"
                role="tab"
                id="tab-solo"
                aria-selected={mode === "solo"}
                aria-controls="engagement-panel"
                onClick={() => setMode("solo")}
                className={`relative z-10 min-h-[44px] rounded-full px-4 sm:px-6 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                  mode === "solo"
                    ? "text-[var(--accent-ink)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                One Expert
              </button>

              <button
                type="button"
                role="tab"
                id="tab-team"
                aria-selected={mode === "team"}
                aria-controls="engagement-panel"
                onClick={() => setMode("team")}
                className={`relative z-10 min-h-[44px] rounded-full px-4 sm:px-6 text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                  mode === "team"
                    ? "text-[var(--accent-ink)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Full Team
              </button>
            </div>

            <TransitionLink
              href="/how-we-work"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-[var(--accent)] underline underline-offset-4 hover:text-[var(--text-primary)]"
            >
              <span>See how we work</span>
              <span aria-hidden="true">→</span>
            </TransitionLink>
          </FadeUp>
        </div>

        <div
          id="engagement-panel"
          role="tabpanel"
          aria-labelledby={mode === "solo" ? "tab-solo" : "tab-team"}
          ref={panelRef}
          className="grid grid-cols-1 gap-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/75 p-6 sm:p-10 lg:grid-cols-12 lg:items-stretch lg:gap-12"
        >
          {/* Left Engagement Model Summary */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-7">
            <div data-morph-item className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                <span>{current.label}</span>
                <span aria-hidden="true">·</span>
                <span>{current.badge}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                {current.headline}
              </h3>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {current.summary}
              </p>
            </div>

            <div data-morph-item className="space-y-3 border-t border-[var(--border-subtle)] pt-6">
              <p className="text-eyebrow">How it works</p>
              <ul className="space-y-3">
                {current.howItWorks.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-3.5 text-sm sm:text-base text-[var(--text-primary)]"
                  >
                    <span className="mt-0.5 font-mono text-xs text-[var(--accent)]">
                      0{i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-morph-item
              className="grid grid-cols-1 gap-4 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-3"
            >
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Best for
                </p>
                <p className="mt-1.5 text-sm text-[var(--text-primary)]">
                  {current.typicalScope}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Speed
                </p>
                <p className="mt-1.5 font-display text-base font-bold text-[var(--accent)]">
                  {current.speedLabel}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Ideal for
                </p>
                <p className="mt-1.5 text-sm text-[var(--text-primary)]">
                  {current.idealFor}
                </p>
              </div>
            </div>
          </div>

          {/* Right Compact Single-Role Kinetic Spotlight Stage (displays one specialist at a time!) */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="lg:col-span-5 flex flex-col justify-between gap-6 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10"
          >
            <div data-morph-item className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-eyebrow">
                  Specialist Spotlight · Lead: {SITE.owner}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tabular-nums text-[var(--accent)]">
                    0{activeRoleIdx + 1} / 0{TEAM_ROLES.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToRole(activeRoleIdx - 1)}
                    aria-label="Previous specialist role"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-primary)]/80 text-sm text-[var(--text-primary)] transition-all active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => goToRole(activeRoleIdx + 1)}
                    aria-label="Next specialist role"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-primary)]/80 text-sm text-[var(--text-primary)] transition-all active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Single Animated Specialist Showcase Card */}
              <div
                ref={spotlightCardRef}
                className="relative overflow-hidden rounded-2xl border border-[var(--accent)]/40 bg-[linear-gradient(145deg,#0B101D_0%,#07090F_100%)] p-6 sm:p-7 shadow-[0_18px_48px_rgba(5,6,10,0.45)] will-change-transform"
              >
                {/* Live cycling progress line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10">
                  <div
                    ref={progressBarRef}
                    className="h-full w-full origin-left bg-[var(--accent)]"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/35 bg-[var(--accent-soft)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    ROLE 0{activeRoleIdx + 1}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                    {activeRole.tools}
                  </span>
                </div>

                <h4 className="mt-5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                  {activeRole.title}
                </h4>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {activeRole.focus}.
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-mono uppercase tracking-[0.12em]">
                  <span className="text-[var(--text-muted)]">
                    {mode === "solo" ? "Direct 1-on-1 option" : "Backed by 25+ team"}
                  </span>
                  <span className="text-[var(--accent)]">100% Remote</span>
                </div>
              </div>

              {/* Compact Interactive Role Switcher Pills */}
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Select specialist role">
                {TEAM_ROLES.map((role, idx) => {
                  const isActive = idx === activeRoleIdx;
                  return (
                    <button
                      key={role.title}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => goToRole(idx)}
                      className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 font-mono text-[11px] transition-all active:scale-95 ${
                        isActive
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] font-semibold"
                          : "border-[var(--border-subtle)] bg-[var(--bg-primary)]/60 text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span className="opacity-70">0{idx + 1}</span>
                      <span>{ROLE_SHORT_LABELS[idx] ?? role.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div data-morph-item className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
              <p className="text-xs text-[var(--text-muted)] max-w-[230px]">
                Not sure whether you need one expert or a team? We will recommend the simplest option.
              </p>
              <MagneticButton href="#contact" variant="primary" size="md">
                <span>Tell us about your project</span>
                <span aria-hidden="true">→</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
