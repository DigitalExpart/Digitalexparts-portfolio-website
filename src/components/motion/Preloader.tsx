"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useMotionRoot } from "@/components/motion/MotionRootContext";
import { SITE } from "@/data/site";

const SESSION_KEY = "de_preloader_seen";

export function Preloader() {
  const { setPreloaderDone, bumpEnterCycle } = useMotionRoot();
  const [shouldRender, setShouldRender] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const pulseAuraRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<SVGPathElement>(null);
  const innerRingRef = useRef<SVGCircleElement>(null);
  const dArchRef = useRef<SVGPathElement>(null);
  const bar1Ref = useRef<SVGPathElement>(null);
  const bar2Ref = useRef<SVGPathElement>(null);
  const bar3Ref = useRef<SVGPathElement>(null);
  const diamondRef = useRef<SVGPathElement>(null);
  const leftWordRef = useRef<HTMLSpanElement>(null);
  const rightWordRef = useRef<HTMLSpanElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    let finished = false;
    const complete = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Ignore storage restrictions
      }
      document.documentElement.dataset.preloader = "done";
      setPreloaderDone(true);
      bumpEnterCycle();
      setShouldRender(false);
    };

    if (alreadySeen || prefersReduced) {
      document.documentElement.dataset.preloader = "done";
      const rafId = window.requestAnimationFrame(complete);
      return () => window.cancelAnimationFrame(rafId);
    }

    const counter = { value: 0 };

    // Safety cap: never block content longer than 2.75s
    const hardTimeout = window.setTimeout(() => {
      complete();
    }, 2750);

    const ctx = gsap.context(() => {
      const prepStroke = (el: SVGGeometryElement | null) => {
        if (!el) return;
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      };

      prepStroke(outerRingRef.current);
      prepStroke(innerRingRef.current);
      prepStroke(dArchRef.current);

      const eBars = [bar1Ref.current, bar2Ref.current, bar3Ref.current].filter(Boolean);
      eBars.forEach((b) => prepStroke(b));

      gsap.set(outerRingRef.current, {
        transformOrigin: "60px 60px",
        rotation: -140,
        scale: 1.25,
        opacity: 0,
      });
      gsap.set(innerRingRef.current, {
        transformOrigin: "60px 60px",
        rotation: 95,
        scale: 0.78,
        opacity: 0,
      });
      gsap.set(dArchRef.current, { x: -24, opacity: 0 });
      gsap.set(bar1Ref.current, { x: 34, y: -10, opacity: 0 });
      gsap.set(bar2Ref.current, { x: 42, opacity: 0 });
      gsap.set(bar3Ref.current, { x: 34, y: 10, opacity: 0 });
      gsap.set(diamondRef.current, {
        transformOrigin: "60px 4.5px",
        y: -26,
        scale: 0,
        opacity: 0,
      });
      gsap.set(leftWordRef.current, { x: -32, opacity: 0 });
      gsap.set(rightWordRef.current, { x: 32, opacity: 0 });
      gsap.set(pulseAuraRef.current, { scale: 0.65, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: complete,
      });

      // Phase 1: Separated brand logo primitives draw & assemble into unified DE emblem
      tl.to(
        counter,
        {
          value: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.round(counter.value);
            if (counterTextRef.current) {
              counterTextRef.current.textContent = String(val).padStart(3, "0");
            }
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${val / 100})`;
            }
          },
        },
        0
      )
        .to(
          dArchRef.current,
          {
            x: 0,
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.75,
            ease: "expo.out",
          },
          0.05
        )
        .to(
          eBars,
          {
            x: 0,
            y: 0,
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "back.out(1.4)",
          },
          0.16
        )
        .to(
          [outerRingRef.current, innerRingRef.current],
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.92,
            stagger: 0.08,
            ease: "expo.out",
          },
          0.14
        )
        .to(
          [leftWordRef.current, rightWordRef.current],
          {
            x: 0,
            opacity: 1,
            duration: 0.72,
            ease: "expo.out",
          },
          0.35
        )
        .to(
          diamondRef.current,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.42,
            ease: "back.out(2.2)",
          },
          0.78
        )
        // Phase 2: Brief unified logo lockup pulse
        .to(
          logoWrapRef.current,
          {
            scale: 1.07,
            duration: 0.16,
            ease: "power2.out",
          },
          1.08
        )
        .to(
          pulseAuraRef.current,
          {
            scale: 1.55,
            opacity: 0.55,
            duration: 0.22,
            ease: "power2.out",
          },
          1.08
        )
        .to(
          logoWrapRef.current,
          {
            scale: 1,
            duration: 0.24,
            ease: "elastic.out(1, 0.5)",
          },
          1.24
        )
        .to(
          pulseAuraRef.current,
          {
            scale: 2.05,
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          1.24
        )
        // Phase 3: Curtain reveal into homepage
        .to(
          hudRef.current,
          {
            opacity: 0,
            y: -18,
            duration: 0.26,
            ease: "power2.in",
          },
          "+=0.04"
        )
        .add(() => {
          setPreloaderDone(true);
          bumpEnterCycle();
        })
        .to(
          topCurtainRef.current,
          {
            yPercent: -100,
            duration: 0.6,
            ease: "expo.inOut",
          },
          "<"
        )
        .to(
          bottomCurtainRef.current,
          {
            yPercent: 100,
            duration: 0.6,
            ease: "expo.inOut",
          },
          "<"
        );
    }, rootRef);

    return () => {
      window.clearTimeout(hardTimeout);
      ctx.revert();
    };
  }, [setPreloaderDone, bumpEnterCycle]);

  if (!shouldRender) return null;

  return (
    <div
      id="de-preloader"
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[var(--z-preloader)] pointer-events-auto select-none overflow-hidden"
    >
      {/* Top Curtain Half */}
      <div
        ref={topCurtainRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#05060A] border-b border-white/[0.06]"
      />
      {/* Bottom Curtain Half */}
      <div
        ref={bottomCurtainRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#05060A]"
      />

      {/* Centered Assembling Logo HUD */}
      <div
        ref={hudRef}
        className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 md:px-14 md:py-12"
      >
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <span>{SITE.brandUpper}</span>
          <span>6+ Yrs · 25+ Team</span>
        </div>

        <div className="my-auto flex flex-col items-center gap-7">
          {/* Assembling Official DE Monogram */}
          <div className="relative flex flex-col items-center gap-5">
            <div
              ref={pulseAuraRef}
              className="pointer-events-none absolute top-0 h-28 w-28 sm:h-32 sm:w-32 rounded-full border border-[var(--accent)]/70"
            />
            <div ref={logoWrapRef} className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center">
              <svg
                viewBox="0 0 120 120"
                width="128"
                height="128"
                className="h-full w-full overflow-visible"
              >
                <path
                  ref={outerRingRef}
                  d="M67.24 4.97A55.5 55.5 0 1 1 52.76 4.97"
                  fill="none"
                  stroke="#F4F5F7"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <circle
                  ref={innerRingRef}
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#F4F5F7"
                  strokeOpacity="0.22"
                  strokeWidth="0.9"
                />
                <path
                  ref={diamondRef}
                  d="M60 0.3L64.2 4.5L60 8.7L55.8 4.5Z"
                  fill="#B6FF4A"
                />
                <path
                  ref={dArchRef}
                  d="M41.69 37H55.31A23 23 0 0 1 55.31 83H41.69Z"
                  fill="none"
                  stroke="#B6FF4A"
                  strokeWidth="4.8"
                  strokeLinejoin="miter"
                />
                <path
                  ref={bar1Ref}
                  d="M41.69 48.5H65.98"
                  fill="none"
                  stroke="#B6FF4A"
                  strokeWidth="4.8"
                />
                <path
                  ref={bar2Ref}
                  d="M41.69 60H61.7"
                  fill="none"
                  stroke="#B6FF4A"
                  strokeWidth="4.8"
                />
                <path
                  ref={bar3Ref}
                  d="M41.69 71.5H65.98"
                  fill="none"
                  stroke="#B6FF4A"
                  strokeWidth="4.8"
                />
              </svg>
            </div>

            <div className="flex items-center gap-3 font-display text-xl sm:text-3xl font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
              <span ref={leftWordRef}>DIGITAL</span>
              <span ref={rightWordRef} className="text-[var(--accent)]">
                EXPERTS
              </span>
            </div>
          </div>

          {/* Synchronized Progress Rail */}
          <div className="w-full max-w-xl space-y-3">
            <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
              <span>Assembling studio workspace</span>
              <span
                ref={counterTextRef}
                className="font-display tabular-nums text-lg sm:text-2xl font-bold text-[var(--text-primary)]"
              >
                000
              </span>
            </div>
            <div className="relative h-[2px] w-full overflow-hidden bg-white/10">
              <div
                ref={barRef}
                className="h-full w-full origin-left bg-[var(--accent)]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span>{SITE.shortLockup}</span>
          <span>Solo &amp; Full Team</span>
        </div>
      </div>
    </div>
  );
}
