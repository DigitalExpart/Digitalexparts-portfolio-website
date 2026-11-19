"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { PROCESS_STEPS } from "@/data/home";
import { HeadingReveal } from "@/components/motion/TextReveal";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const travelerDotRef = useRef<SVGCircleElement>(null);
  const mobileProgressBarRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const { prefersReducedMotion } = useMediaCapabilities();

  // M12: Pinned scrubbed 3D focus-wave choreography across the 3 steps + traveling SVG orb
  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    const pathEl = progressPathRef.current;
    const dotEl = travelerDotRef.current;
    const mobileBar = mobileProgressBarRef.current;
    if (!section || !pinWrap) return;

    if (prefersReducedMotion) {
      if (pathEl) {
        const len = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = `${len}`;
        pathEl.style.strokeDashoffset = "0";
      }
      if (mobileBar) {
        mobileBar.style.transform = "scaleX(1)";
      }
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const pathLen = pathEl ? pathEl.getTotalLength() : 0;
      if (pathEl) {
        gsap.set(pathEl, {
          strokeDasharray: pathLen,
          strokeDashoffset: pathLen,
        });
      }

      const updateFocusWave = (p: number) => {
        // Move focus spotlight continuously from card 0 -> 1 -> 2 across p in [0, 1]
        const center = p * 2;
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const dist = idx - center;
          const absDist = Math.abs(dist);
          const focus = Math.max(0, 1 - absDist * 0.85);

          const y = -20 * focus + absDist * 14;
          const scale = 0.92 + focus * 0.1;
          const rotateY = Math.max(-14, Math.min(14, dist * -9.5));
          const rotateX = (1 - focus) * 5.5;
          const opacity = 0.45 + focus * 0.55;

          gsap.set(card, {
            y,
            scale,
            rotateY,
            rotateX,
            opacity,
            transformPerspective: 1100,
          });
        });

        if (pathEl && pathLen > 0) {
          pathEl.style.strokeDashoffset = `${pathLen * (1 - p)}`;
          if (dotEl) {
            const pt = pathEl.getPointAtLength(Math.min(pathLen, Math.max(0, p * pathLen)));
            dotEl.setAttribute("cx", `${pt.x}`);
            dotEl.setAttribute("cy", `${pt.y}`);
          }
        }

        if (watermarkRef.current) {
          gsap.set(watermarkRef.current, {
            rotation: -18 + p * 42,
            xPercent: -6 + p * 12,
          });
        }
      };

      updateFocusWave(0);

      const st = ScrollTrigger.create({
        trigger: pinWrap,
        start: "top top",
        end: "+=1050",
        pin: true,
        anticipatePin: 1,
        scrub: 0.35,
        onUpdate: (self) => {
          const p = self.progress;
          updateFocusWave(p);
          const nextIdx = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
          setActiveStep((prev) => (prev === nextIdx ? prev : nextIdx));
        },
      });

      return () => {
        st.kill();
        cardRefs.current.forEach((card) => {
          if (card) gsap.set(card, { clearProps: "transform,opacity" });
        });
      };
    });

    mm.add("(max-width: 1023px)", () => {
      if (mobileBar) {
        gsap.fromTo(
          mobileBar,
          { scaleX: 0.08 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              end: "bottom 72%",
              scrub: 0.35,
            },
          }
        );
      }

      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { rotation: -15 },
          {
            rotation: 24,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      const triggers: ScrollTrigger[] = [];
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0.42,
            y: 38,
            scale: 0.93,
            rotateX: 10,
            rotateY: idx % 2 === 0 ? -5 : 5,
            transformPerspective: 950,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "center 64%",
              scrub: 0.4,
            },
          }
        );

        const activeTrigger = ScrollTrigger.create({
          trigger: card,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
        triggers.push(activeTrigger);
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="relative overflow-hidden hairline-t bg-[linear-gradient(180deg,#05060A_0%,#0B101D_52%,#05060A_100%)]"
    >
      {/* Scrubbed Rotating Brand Kit Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[380px] w-[380px] sm:h-[520px] sm:w-[520px] opacity-[0.045] will-change-transform"
      >
        <Image
          src="/brand/monogram-lime.svg"
          alt=""
          width={520}
          height={520}
          unoptimized
          className="h-full w-full"
        />
      </div>

      <div
        ref={pinWrapRef}
        className="relative z-10 flex min-h-[100dvh] flex-col justify-center py-16 sm:py-20 lg:py-16"
      >
        <div className="container-editorial space-y-10 sm:space-y-12">
          {/* Header + Progress Readout */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4 max-w-3xl">
              <p className="text-eyebrow">07 · Process</p>
              <HeadingReveal as="h2" id="process-heading" className="text-h1">
                How a project runs
              </HeadingReveal>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              <span>Stage</span>
              <span className="rounded-full border border-[var(--accent)]/50 bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)] tabular-nums">
                0{activeStep + 1} / 03
              </span>
            </div>
          </div>

          {/* Desktop SVG Draw Connector Wave + Traveling Neon Orb (M12) */}
          <div aria-hidden="true" className="hidden lg:block relative h-10 w-full">
            <svg
              viewBox="0 0 1200 32"
              fill="none"
              preserveAspectRatio="none"
              className="h-10 w-full overflow-visible"
            >
              {/* Base Guide Line */}
              <path
                d="M 12 16 C 240 16, 360 4, 600 16 C 840 28, 960 16, 1188 16"
                stroke="rgba(244,245,247,0.14)"
                strokeWidth="1.5"
              />
              {/* Animated Accent Wave */}
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
                r="4.5"
                fill={activeStep >= 0 ? "#B6FF4A" : "#111521"}
                stroke="#B6FF4A"
                strokeWidth="1.5"
              />
              <circle
                cx="600"
                cy="16"
                r="4.5"
                fill={activeStep >= 1 ? "#B6FF4A" : "#111521"}
                stroke={activeStep >= 1 ? "#B6FF4A" : "rgba(244,245,247,0.3)"}
                strokeWidth="1.5"
              />
              <circle
                cx="1188"
                cy="16"
                r="4.5"
                fill={activeStep >= 2 ? "#B6FF4A" : "#111521"}
                stroke={activeStep >= 2 ? "#B6FF4A" : "rgba(244,245,247,0.3)"}
                strokeWidth="1.5"
              />
              {/* Live Scrubbed Glowing Traveler Dot */}
              <circle
                ref={travelerDotRef}
                cx="12"
                cy="16"
                r="7.5"
                fill="#B6FF4A"
                fillOpacity="0.32"
                stroke="#B6FF4A"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Mobile & Tablet Scrubbed Step Progress Rail */}
          <div aria-hidden="true" className="lg:hidden space-y-2">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div
                ref={mobileProgressBarRef}
                className="h-full w-full origin-left rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(182,255,74,0.45)] will-change-transform"
                style={{ transform: "scaleX(0.08)" }}
              />
            </div>
          </div>

          {/* 3 Kinetic Process Step Cards */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <article
                  key={step.index}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  data-process-card
                  className={`flex flex-col justify-between gap-6 rounded-2xl border p-6 sm:p-8 will-change-transform transition-colors duration-300 ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--bg-elevated)] shadow-[0_24px_64px_rgba(182,255,74,0.1)]"
                      : isPassed
                        ? "border-[var(--border-strong)] bg-[var(--bg-elevated)]/75"
                        : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/45"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
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
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)] transition-transform duration-300"
                        style={{ transform: isActive ? "translateX(3px)" : "translateX(0px)" }}
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
