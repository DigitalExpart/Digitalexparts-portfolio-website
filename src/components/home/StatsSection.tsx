"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { STATS } from "@/data/home";
import { SITE } from "@/data/site";
import { HeadingReveal } from "@/components/motion/TextReveal";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface StatsSectionProps {
  isLightTheme?: boolean;
}

function formatCounter(
  val: number,
  decimals: number,
  padLength: number,
  suffix: string
): string {
  if (decimals > 0) {
    return `${val.toFixed(decimals)}${suffix}`;
  }
  const rounded = Math.round(val);
  const core = padLength > 0 ? String(rounded).padStart(padLength, "0") : String(rounded);
  return `${core}${suffix}`;
}

export function StatsSection({ isLightTheme = false }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDesktopFinePointer, prefersReducedMotion } = useMediaCapabilities();

  // M9: Animated count-up numbers (integers and decimals) once on scroll enter
  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const counters = section.querySelectorAll<HTMLElement>("[data-counter-target]");
    if (!counters.length) return;

    if (prefersReducedMotion) {
      counters.forEach((el) => {
        const target = Number(el.dataset.counterTarget || "0");
        const decimals = Number(el.dataset.counterDecimals || "0");
        const pad = Number(el.dataset.counterPad || "0");
        const suffix = el.dataset.counterSuffix || "";
        el.textContent = formatCounter(target, decimals, pad, suffix);
      });
      return;
    }

    const ctx = gsap.context(() => {
      counters.forEach((el, idx) => {
        const target = Number(el.dataset.counterTarget || "0");
        const decimals = Number(el.dataset.counterDecimals || "0");
        const pad = Number(el.dataset.counterPad || "0");
        const suffix = el.dataset.counterSuffix || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.4,
          delay: idx * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = formatCounter(obj.val, decimals, pad, suffix);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 3D depth tilt: pointer-following on desktop + scrubbed 3D scroll tilt & touch press on mobile
  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-stat-card]"));
    if (!cards.length) return;

    if (isDesktopFinePointer) {
      const cleanups: Array<() => void> = [];

      cards.forEach((card) => {
        const onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
          const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
          gsap.to(card, {
            rotateY: nx * 7,
            rotateX: -ny * 7,
            y: -4,
            transformPerspective: 900,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("pointermove", onMove, { passive: true });
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    }

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          {
            y: 26,
            scale: 0.95,
            rotateX: 9,
            rotateY: idx % 2 === 0 ? -5 : 5,
            transformPerspective: 900,
          },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "center 64%",
              scrub: 0.45,
            },
          }
        );

        const onDown = (e: PointerEvent) => {
          if (e.pointerType === "mouse") return;
          const rect = card.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
          const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
          gsap.to(card, {
            rotateY: nx * 8,
            rotateX: -ny * 8,
            scale: 0.98,
            transformPerspective: 900,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onRelease = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.65,
            ease: "elastic.out(1, 0.45)",
            overwrite: "auto",
          });
        };

        card.addEventListener("pointerdown", onDown, { passive: true });
        card.addEventListener("pointerup", onRelease, { passive: true });
        card.addEventListener("pointercancel", onRelease, { passive: true });
        cleanups.push(() => {
          card.removeEventListener("pointerdown", onDown);
          card.removeEventListener("pointerup", onRelease);
          card.removeEventListener("pointercancel", onRelease);
        });
      });
    }, sectionRef);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [isDesktopFinePointer, prefersReducedMotion]);

  const mutedTextClass = isLightTheme
    ? "text-[var(--text-muted-on-light)]"
    : "text-[var(--text-secondary)]";
  const borderClass = isLightTheme
    ? "border-[var(--border-on-light)]"
    : "border-[var(--border-subtle)]";
  const cardBgClass = isLightTheme
    ? "bg-white/75 hover:border-[#05060A]/40"
    : "bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]";

  return (
    <section
      id="stats"
      ref={sectionRef}
      aria-labelledby="stats-heading"
      className={`section-pad border-t transition-colors duration-500 ${borderClass}`}
    >
      <div className="container-editorial space-y-12 sm:space-y-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p
              className={`font-mono text-xs uppercase tracking-[0.14em] ${mutedTextClass}`}
            >
              05 · Track Record
            </p>
            <HeadingReveal as="h2" id="stats-heading" className="text-h1">
              The track record
            </HeadingReveal>
          </div>

          <div className="max-w-md space-y-2">
            <p className={`text-sm sm:text-base ${mutedTextClass}`}>
              Real delivery numbers across Fiverr ({SITE.fiverrBrand}) and Upwork ({SITE.owner}).
            </p>
            <a
              href={SITE.fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] underline underline-offset-4 hover:opacity-75"
            >
              <span>4.7 from 57 reviews on Fiverr</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              data-stat-card
              className={`group flex flex-col justify-between gap-10 rounded-2xl border p-6 sm:p-8 transition-colors duration-300 will-change-transform ${borderClass} ${cardBgClass}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs uppercase tracking-[0.12em] ${mutedTextClass}`}>
                  0{idx + 1}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[#05060A]/10"
                />
              </div>

              <div className="space-y-2">
                <p
                  data-counter-target={stat.value}
                  data-counter-decimals={stat.decimals || 0}
                  data-counter-pad={stat.padLength || 0}
                  data-counter-suffix={stat.suffix}
                  className="font-display tabular-nums text-[clamp(2.75rem,4.8vw,4.5rem)] font-bold leading-none tracking-tight"
                >
                  {formatCounter(stat.value, stat.decimals || 0, stat.padLength || 0, stat.suffix)}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-semibold">
                  {stat.label}
                </h3>
                <p className={`text-sm leading-relaxed ${mutedTextClass}`}>
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
