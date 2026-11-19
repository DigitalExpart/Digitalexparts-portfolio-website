"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { ENGAGEMENT_MODELS, TEAM_ROLES } from "@/data/home";
import { SITE } from "@/data/site";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
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
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-eyebrow">04 · Solo or Team</p>
            <HeadingReveal as="h2" id="engagement-heading" className="text-h1">
              Hire one expert or a full team
            </HeadingReveal>
            <FadeUp>
              <p className="max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
                Small project? You work directly with one specialist. Bigger build? We bring in
                specialist designers, developers, motion artists and email experts from our
                team, and you still have one person to talk to.
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
          className="grid grid-cols-1 gap-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12"
        >
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

          <div className="lg:col-span-5 flex flex-col justify-between gap-6 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10">
            <div data-morph-item className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-eyebrow">
                  {mode === "solo"
                    ? "Lead + expandable team roles"
                    : "Roles we can bring in"}
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
                      className={`rounded-xl border p-3.5 transition-colors duration-300 ${
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
                      <p className="mt-1 pl-4.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                        {role.focus}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div data-morph-item className="flex flex-wrap items-center justify-between gap-4 pt-2">
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
