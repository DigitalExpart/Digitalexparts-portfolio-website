"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { ENGAGEMENT_MODELS, TEAM_ROLES } from "@/data/home";
import { SITE } from "@/data/site";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

export function SoloOrTeamSection() {
  const [mode, setMode] = useState<"solo" | "team">("solo");
  const panelRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  const current = ENGAGEMENT_MODELS[mode];

  useEffect(() => {
    ensureGsapRegistered();
    const panel = panelRef.current;
    if (!panel || prefersReducedMotion) return;

    const items = panel.querySelectorAll("[data-morph-item]");
    const roles = rosterRef.current?.querySelectorAll("[data-role-card]") ?? [];

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

      if (roles.length) {
        gsap.fromTo(
          roles,
          { scale: 0.98, opacity: 0.65 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            stagger: 0.04,
            ease: "power3.out",
            overwrite: true,
          }
        );
      }
    }, panelRef);

    return () => ctx.revert();
  }, [mode, prefersReducedMotion]);

  return (
    <section
      id="engagement"
      aria-labelledby="engagement-heading"
      className="section-pad hairline-t"
    >
      <div className="container-editorial space-y-12 sm:space-y-14">
        {/* Header + Interactive Solo/Team Toggle */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-eyebrow">04 · Engagement Model</p>
            <HeadingReveal as="h2" id="engagement-heading" className="text-h1">
              Work directly with me, or scale with my vetted team.
            </HeadingReveal>
          </div>

          {/* Animated Mode Switcher */}
          <FadeUp className="shrink-0">
            <div
              role="tablist"
              aria-label="Choose engagement model"
              className="relative inline-grid grid-cols-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-1.5"
            >
              {/* Sliding Active Pill */}
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
                Solo · Direct
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
                Vetted Team
              </button>
            </div>
          </FadeUp>
        </div>

        {/* Morphed Content Panel */}
        <div
          id="engagement-panel"
          role="tabpanel"
          aria-labelledby={mode === "solo" ? "tab-solo" : "tab-team"}
          ref={panelRef}
          className="grid grid-cols-1 gap-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left: Model Details */}
          <div className="lg:col-span-7 space-y-8">
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
              <p className="text-eyebrow">How this model works</p>
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
                  Typical scope
                </p>
                <p className="mt-1.5 text-sm text-[var(--text-primary)]">
                  {current.typicalScope}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Typical timeline
                </p>
                <p className="mt-1.5 font-display text-lg font-bold text-[var(--accent)]">
                  {current.turnaround}
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Best suited for
                </p>
                <p className="mt-1.5 text-sm text-[var(--text-primary)]">
                  {current.idealFor}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Roles Available & Single Point of Contact */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10">
            <div data-morph-item className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-eyebrow">
                  {mode === "solo"
                    ? "Lead + expandable bench"
                    : "Active vetted roles available"}
                </p>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Lead: {SITE.owner}
                </span>
              </div>

              <div ref={rosterRef} className="space-y-2.5">
                {TEAM_ROLES.map((role) => {
                  const isTeamActive = mode === "team";
                  return (
                    <div
                      key={role.title}
                      data-role-card
                      className={`rounded-xl border p-4 transition-colors duration-300 ${
                        isTeamActive
                          ? "border-[var(--accent)]/40 bg-[var(--bg-primary)]"
                          : "border-[var(--border-subtle)] bg-[var(--bg-primary)]/50"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                              isTeamActive ? "bg-[var(--accent)]" : "bg-[var(--text-muted)]"
                            }`}
                          />
                          <h4 className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                            {role.title}
                          </h4>
                        </div>
                        <span className="font-mono text-[11px] text-[var(--text-muted)]">
                          {role.tools}
                        </span>
                      </div>
                      <p className="mt-1.5 pl-4.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                        {role.focus}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div data-morph-item className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-[var(--text-muted)] max-w-[230px]">
                Not sure whether you need solo speed or a team pod? I&apos;ll recommend the lightest path.
              </p>
              <MagneticButton href="#contact" variant="primary" size="md">
                <span>Scope your build</span>
                <span aria-hidden="true">→</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
