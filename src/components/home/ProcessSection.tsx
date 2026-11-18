"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { PROCESS_STEPS } from "@/data/home";
import { HeadingReveal } from "@/components/motion/TextReveal";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { prefersReducedMotion } = useMediaCapabilities();

  // M12: Pinned 3-step process with SVG line draw on desktop; stacks vertically on mobile
  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    const pathEl = progressPathRef.current;
    if (!section || !pinWrap) return;

    if (prefersReducedMotion) {
      if (pathEl) {
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${len}`;
        pathEl.style.strokeDashoffset = "0";
      }
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (pathEl) {
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        gsap.to(pathEl, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: pinWrap,
            start: "top top",
            end: "+=1500",
            scrub: 0.4,
          },
        });
      }

      const st = ScrollTrigger.create({
        trigger: pinWrap,
        start: "top top",
        end: "+=1500",
        pin: true,
        anticipatePin: 1,
        scrub: 0.3,
        onUpdate: (self) => {
          const p = self.progress;
          const nextIdx = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
          setActiveStep((prev) => (prev === nextIdx ? prev : nextIdx));
        },
      });

      return () => {
        st.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = pinWrap.querySelectorAll<HTMLElement>("[data-process-card]");
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
              onEnter: () => setActiveStep(idx),
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative hairline-t bg-[var(--bg-primary)]"
    >
      <div
        ref={pinWrapRef}
        className="flex min-h-[100dvh] flex-col justify-center py-16 sm:py-20 lg:py-16"
      >
        <div className="container-editorial space-y-10 sm:space-y-14">
          {/* Header + Progress Readout */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4 max-w-3xl">
              <p className="text-eyebrow">07 · Process</p>
              <HeadingReveal as="h2" id="process-heading" className="text-h1">
                From first call to live launch in three crisp stages.
              </HeadingReveal>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              <span>Stage</span>
              <span className="rounded-full border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]">
                0{activeStep + 1} / 03
              </span>
            </div>
          </div>

          {/* Desktop SVG Draw Connector Line (M12) */}
          <div aria-hidden="true" className="hidden lg:block relative h-8 w-full">
            <svg
              viewBox="0 0 1200 32"
              fill="none"
              preserveAspectRatio="none"
              className="h-8 w-full overflow-visible"
            >
              {/* Base Guide Line */}
              <path
                d="M 12 16 C 240 16, 360 4, 600 16 C 840 28, 960 16, 1188 16"
                stroke="rgba(244,245,247,0.14)"
                strokeWidth="1.5"
              />
              {/* Animated Accent Path */}
              <path
                ref={progressPathRef}
                d="M 12 16 C 240 16, 360 4, 600 16 C 840 28, 960 16, 1188 16"
                stroke="#B6FF4A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Step Nodes */}
              <circle
                cx="12"
                cy="16"
                r="5"
                fill={activeStep >= 0 ? "#B6FF4A" : "#111521"}
                stroke="#B6FF4A"
                strokeWidth="1.5"
              />
              <circle
                cx="600"
                cy="16"
                r="5"
                fill={activeStep >= 1 ? "#B6FF4A" : "#111521"}
                stroke={activeStep >= 1 ? "#B6FF4A" : "rgba(244,245,247,0.3)"}
                strokeWidth="1.5"
              />
              <circle
                cx="1188"
                cy="16"
                r="5"
                fill={activeStep >= 2 ? "#B6FF4A" : "#111521"}
                stroke={activeStep >= 2 ? "#B6FF4A" : "rgba(244,245,247,0.3)"}
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* 3 Process Step Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <article
                  key={step.index}
                  data-process-card
                  className={`flex flex-col justify-between gap-6 rounded-2xl border p-6 sm:p-8 transition-all duration-500 ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--bg-elevated)] shadow-[0_0_40px_rgba(182,255,74,0.08)]"
                      : isPassed
                        ? "border-[var(--border-strong)] bg-[var(--bg-elevated)]/65"
                        : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 opacity-80 lg:opacity-55"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs tracking-[0.14em] ${
                          isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                        }`}
                      >
                        STEP {step.index}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                          isActive
                            ? "bg-[var(--accent)] text-[var(--accent-ink)] font-semibold"
                            : "border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {step.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            isPassed ? "bg-[var(--accent)]" : "bg-[var(--text-muted)]"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
