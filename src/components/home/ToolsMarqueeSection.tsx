"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { TOOLS_MARQUEE } from "@/data/home";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface ToolsMarqueeSectionProps {
  isLightTheme?: boolean;
}

function ToolGlyph({ name }: { name: string }) {
  // Minimal geometric custom glyphs per tool so there are zero external broken icon links
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#05060A] font-mono text-[11px] font-semibold text-[var(--accent)]"
    >
      {initials}
    </span>
  );
}

export function ToolsMarqueeSection({ isLightTheme = false }: ToolsMarqueeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { isDesktopFinePointer, prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section || prefersReducedMotion) return;

    let xPercent = 0;
    let direction = -1; // -1 moves left on scroll down, +1 reverses on scroll up
    let speedBoost = 0;
    let isHovered = false;

    const baseSpeed = 0.032; // % per 16ms frame (~31s full seamless cycle)

    const onEnter = () => {
      if (isDesktopFinePointer) isHovered = true;
    };
    const onLeave = () => {
      isHovered = false;
    };

    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const vel = self.getVelocity();
          if (Math.abs(vel) > 15) {
            direction = vel > 0 ? -1 : 1;
            speedBoost = Math.min(0.16, Math.abs(vel) / 4200);
          }
        },
      });
    }, sectionRef);

    const tick = (_time: number, deltaTime: number) => {
      const dtFactor = Math.min(2.5, deltaTime / 16.667);
      speedBoost *= Math.pow(0.92, dtFactor);

      if (!isHovered) {
        xPercent += direction * (baseSpeed + speedBoost) * dtFactor;
        if (xPercent <= -50) {
          xPercent += 50;
        } else if (xPercent > 0) {
          xPercent -= 50;
        }
        track.style.transform = `translate3d(${xPercent}%, 0, 0)`;
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, [isDesktopFinePointer, prefersReducedMotion]);

  const borderClass = isLightTheme
    ? "border-[var(--border-on-light)]"
    : "border-[var(--border-subtle)]";
  const mutedClass = isLightTheme
    ? "text-[var(--text-muted-on-light)]"
    : "text-[var(--text-secondary)]";
  const chipBgClass = isLightTheme
    ? "bg-white/85 border-[var(--border-on-light)] text-[#05060A]"
    : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]";

  return (
    <section
      id="platforms"
      ref={sectionRef}
      aria-label="Platforms and tools"
      className={`overflow-hidden border-y py-14 sm:py-20 transition-colors duration-500 ${borderClass}`}
    >
      <div className="container-editorial mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className={`font-mono text-xs uppercase tracking-[0.14em] ${mutedClass}`}>
          06 · Platforms &amp; Tooling Stack
        </p>
        <p className={`text-xs sm:text-sm ${mutedClass}`}>
          Code, no-code, commerce, retention email &amp; AI video pipelines
        </p>
      </div>

      {prefersReducedMotion ? (
        <div className="container-editorial flex flex-wrap gap-3">
          {TOOLS_MARQUEE.map((tool) => (
            <div
              key={tool.name}
              className={`inline-flex items-center gap-3 rounded-full border px-4 py-2.5 ${chipBgClass}`}
            >
              <ToolGlyph name={tool.name} />
              <div>
                <span className="font-display text-sm font-semibold">{tool.name}</span>
                <span className={`ml-2 font-mono text-[11px] uppercase ${mutedClass}`}>
                  {tool.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full overflow-hidden select-none">
          <div
            ref={trackRef}
            className="flex w-max items-center will-change-transform"
          >
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1}
                className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
              >
                {TOOLS_MARQUEE.map((tool) => (
                  <div
                    key={`${dup}-${tool.name}`}
                    className={`inline-flex shrink-0 items-center gap-3.5 rounded-full border px-5 py-3 transition-transform duration-300 hover:scale-[1.03] ${chipBgClass}`}
                  >
                    <ToolGlyph name={tool.name} />
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-base sm:text-lg font-bold tracking-tight whitespace-nowrap">
                        {tool.name}
                      </span>
                      <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${mutedClass}`}>
                        {tool.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
