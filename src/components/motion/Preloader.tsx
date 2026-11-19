"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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

    // Hard safety cap: never block content longer than 2.4s (strictly < 2.5s)
    const hardTimeout = window.setTimeout(() => {
      complete();
    }, 2400);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: complete,
      });

      tl.to(counter, {
        value: 100,
        duration: 1.25,
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
      })
        .to(
          hudRef.current,
          {
            opacity: 0,
            y: -14,
            duration: 0.25,
            ease: "power2.in",
          },
          "+=0.06"
        )
        .add(() => {
          // Trigger hero text entrance right as the curtains start parting
          setPreloaderDone(true);
          bumpEnterCycle();
        })
        .to(
          topCurtainRef.current,
          {
            yPercent: -100,
            duration: 0.62,
            ease: "expo.inOut",
          },
          "<"
        )
        .to(
          bottomCurtainRef.current,
          {
            yPercent: 100,
            duration: 0.62,
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

      {/* Centered Editorial Loader HUD */}
      <div
        ref={hudRef}
        className="relative z-10 flex h-full w-full flex-col justify-between px-6 py-8 md:px-14 md:py-12"
      >
        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-mark-dark.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              priority
              className="h-7 w-7 sm:h-8 sm:w-8 shrink-0"
            />
            <span>{SITE.brandUpper}</span>
          </div>
          <span>6+ Yrs · 25+ Team</span>
        </div>

        <div className="my-auto flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-5">
            <Image
              src="/brand/logo-nav-dark.svg"
              alt={SITE.brand}
              width={628}
              height={120}
              unoptimized
              priority
              className="h-6 sm:h-9 w-auto max-w-[55%]"
            />
            <span
              ref={counterTextRef}
              className="font-display tabular-nums text-[clamp(3.25rem,11vw,8.5rem)] font-bold leading-none tracking-tighter text-[var(--text-primary)]"
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

        <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.16em] text-[var(--text-muted)]">
          <span>{SITE.shortLockup}</span>
          <span>Solo &amp; Full Team</span>
        </div>
      </div>
    </div>
  );
}
