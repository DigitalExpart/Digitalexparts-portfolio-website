"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { PROJECTS } from "@/data/projects";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

// Order showcase so Mobile App ("velo-mobile-app") and AI Automation ("nexaflow-automation") sit prominently up front
const FEATURED_ORDER = [
  "kinetik-pay",
  "velo-mobile-app",
  "nexaflow-automation",
  "vespera-atelier",
  "pulseboard-crm",
  "aether-robotics",
  "sora-roastery",
  "northline-logistics",
];

const ORDERED_PROJECTS = [
  ...FEATURED_ORDER.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  ),
  ...PROJECTS.filter((p) => !FEATURED_ORDER.includes(p.slug)),
];

const MOBILE_FEATURED = ORDERED_PROJECTS.slice(0, 6);

export function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const { prefersReducedMotion } = useMediaCapabilities();

  // Desktop: Trionn-inspired sticky left column + horizontally pinned staggered deck
  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    const pinStage = pinStageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !pinStage || !viewport || !track || prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getTravelDistance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth + 48);

      const tween = gsap.to(track, {
        x: () => -getTravelDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinStage,
          start: "top top",
          end: () => `+=${Math.max(1100, getTravelDistance() + 320)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.45,
          refreshPriority: 2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              ORDERED_PROJECTS.length - 1,
              Math.floor(self.progress * ORDERED_PROJECTS.length)
            );
            setActiveSlide((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "x" });
      };
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Recent work and solutions"
      className="relative hairline-t overflow-x-clip bg-[linear-gradient(180deg,#05060A_0%,#0A0F1A_50%,#05060A_100%)]"
    >
      {/* Subtle architectural radial lighting behind showcase */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(182,255,74,0.16) 0%, transparent 70%)",
        }}
      />

      {/* Desktop Pinned Horizontal Showcase Stage (min-width: 1024px) */}
      <div
        ref={pinStageRef}
        className="hidden lg:flex min-h-[100dvh] w-full items-center py-20"
      >
        <div className="container-editorial flex w-full items-center gap-12 xl:gap-16">
          {/* Left Sticky Copy Column */}
          <div className="w-[330px] xl:w-[375px] shrink-0 space-y-6">
            <div className="space-y-4">
              <p className="text-eyebrow">03 · Selected Work</p>
              <HeadingReveal as="h2" id="selected-work-heading-desktop" className="text-h1">
                Recent work &amp; solutions
              </HeadingReveal>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Custom websites, iOS &amp; Android mobile apps, AI automation systems, brand
                identities, email campaigns and AI video.
              </p>
            </div>

            {/* Horizontal Scrub Progress */}
            <div className="space-y-2.5 border-y border-[var(--border-subtle)] py-4">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em]">
                <span className="text-[var(--text-muted)]">Showcase Reel</span>
                <span className="tabular-nums text-[var(--accent)]">
                  0{activeSlide + 1} / 0{ORDERED_PROJECTS.length}
                </span>
              </div>
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
                  style={{
                    width: `${((activeSlide + 1) / ORDERED_PROJECTS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <MagneticButton href="/work" variant="primary" size="md">
              <span>See all {ORDERED_PROJECTS.length} projects</span>
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </div>

          {/* Right Scrubbed Horizontal Staggered Deck */}
          <div ref={viewportRef} className="min-w-0 flex-1 overflow-visible">
            <div
              ref={trackRef}
              className="flex items-start gap-8 xl:gap-10 will-change-transform"
            >
              {ORDERED_PROJECTS.map((project, idx) => (
                <div
                  key={project.slug}
                  className={`w-[390px] xl:w-[445px] shrink-0 ${
                    idx % 2 === 1 ? "mt-14" : ""
                  }`}
                >
                  <ProjectCard
                    project={project}
                    index={idx}
                    priority={idx < 2}
                  />
                </div>
              ))}

              {/* Closing Card CTA */}
              <div className="flex w-[320px] xl:w-[360px] shrink-0 mt-10 flex-col justify-between gap-6 rounded-2xl border border-[var(--accent)]/35 bg-[var(--bg-elevated)]/90 p-8">
                <div className="space-y-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                    Full Archive
                  </span>
                  <h3 className="font-display text-2xl font-bold leading-snug">
                    Want to filter by Mobile Apps, Web, AI or Video?
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Browse every case study with process notes, tools used and filter tabs.
                  </p>
                </div>
                <MagneticButton href="/work" variant="primary" size="md">
                  <span>Open full portfolio</span>
                  <span aria-hidden="true">→</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Staggered Vertical Showcase (< 1024px) */}
      <div className="lg:hidden section-pad">
        <div className="container-editorial space-y-10">
          <div className="flex flex-col gap-6">
            <div className="space-y-4 max-w-3xl">
              <p className="text-eyebrow">03 · Recent Work</p>
              <HeadingReveal as="h2" id="selected-work-heading" className="text-h1">
                Recent work &amp; solutions
              </HeadingReveal>
            </div>

            <FadeUp className="flex flex-col items-start gap-4">
              <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary)]">
                Websites, iOS &amp; Android mobile apps, AI automation systems, brands and video
                campaigns shipped for startups and growing businesses.
              </p>
              <MagneticButton href="/work" variant="primary" size="md">
                <span>See all {ORDERED_PROJECTS.length} projects</span>
                <span aria-hidden="true">→</span>
              </MagneticButton>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
            {MOBILE_FEATURED.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={idx}
                staggerOffset
                priority={idx < 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
