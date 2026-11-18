"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { STATS } from "@/data/home";
import { HeadingReveal } from "@/components/motion/TextReveal";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface StatsSectionProps {
  isLightTheme?: boolean;
}

export function StatsSection({ isLightTheme = false }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isDesktopFinePointer, prefersReducedMotion } = useMediaCapabilities();

  // M9: Zero-padded count-up numbers (animate once on scroll enter)
  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const counters = section.querySelectorAll<HTMLElement>("[data-counter-target]");
    if (!counters.length) return;

    if (prefersReducedMotion) {
      counters.forEach((el) => {
        const target = Number(el.dataset.counterTarget || "0");
        const pad = Number(el.dataset.counterPad || "3");
        const suffix = el.dataset.counterSuffix || "";
        el.textContent = `${String(target).padStart(pad, "0")}${suffix}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      counters.forEach((el, idx) => {
        const target = Number(el.dataset.counterTarget || "0");
        const pad = Number(el.dataset.counterPad || "3");
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
            el.textContent = `${String(Math.round(obj.val)).padStart(pad, "0")}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Subtle desktop-only 3D hover tilt on stat cards
  useEffect(() => {
    if (!isDesktopFinePointer || prefersReducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-stat-card]"));
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
              Numbers built on shipped work, not slides.
            </HeadingReveal>
          </div>

          <p className={`max-w-md text-sm sm:text-base ${mutedTextClass}`}>
            Consistent velocity across solo sprints and multi-specialist launches for founders,
            small businesses, and partner agencies.
          </p>
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
                  data-counter-pad={stat.padLength}
                  data-counter-suffix={stat.suffix}
                  className="font-display tabular-nums text-[clamp(2.75rem,4.8vw,4.5rem)] font-bold leading-none tracking-tight"
                >
                  {`${String(0).padStart(stat.padLength, "0")}${stat.suffix}`}
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
