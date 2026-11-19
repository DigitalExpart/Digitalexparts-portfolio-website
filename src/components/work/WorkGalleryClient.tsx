"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { ensureGsapRegistered, Flip, gsap, ScrollTrigger } from "@/lib/gsap";
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  type ProjectCategory,
} from "@/data/projects";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

type FilterCategory = "All" | ProjectCategory;

export function WorkGalleryClient() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  const handleFilterChange = (category: FilterCategory) => {
    if (category === activeCategory) return;

    if (!prefersReducedMotion && gridRef.current) {
      ensureGsapRegistered();
      const items = gridRef.current.querySelectorAll<HTMLElement>("[data-flip-card]");
      if (items.length) {
        flipStateRef.current = Flip.getState(items);
      }
    }

    setActiveCategory(category);
  };

  useLayoutEffect(() => {
    const state = flipStateRef.current;
    const grid = gridRef.current;
    if (!state || !grid) return;

    flipStateRef.current = null;
    ensureGsapRegistered();

    const items = grid.querySelectorAll<HTMLElement>("[data-flip-card]");
    if (!items.length) return;

    Flip.from(state, {
      targets: items,
      duration: 0.62,
      stagger: 0.04,
      ease: "expo.out",
      absolute: true,
      nested: true,
      onEnter: (elements) =>
        gsapFade(elements, 0, 1, 0.94, 1),
      onLeave: (elements) =>
        gsapFade(elements, 1, 0, 1, 0.94),
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });
  }, [activeCategory]);

  const counts: Record<FilterCategory, number> = {
    All: PROJECTS.length,
    Websites: PROJECTS.filter((p) => p.category === "Websites").length,
    "UI/UX": PROJECTS.filter((p) => p.category === "UI/UX").length,
    Branding: PROJECTS.filter((p) => p.category === "Branding").length,
    Email: PROJECTS.filter((p) => p.category === "Email").length,
    "AI Video": PROJECTS.filter((p) => p.category === "AI Video").length,
  };

  return (
    <div className="space-y-10 sm:space-y-14 overflow-x-clip">
      {/* Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2.5 border-y border-[var(--border-subtle)] py-5"
      >
        {PROJECT_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleFilterChange(category)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 sm:px-5 text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 ${
                isActive
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] font-semibold"
                  : "border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>{category}</span>
              <span
                className={`font-mono text-[11px] ${
                  isActive ? "text-[var(--accent-ink)]/75" : "text-[var(--text-muted)]"
                }`}
              >
                0{counts[category]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Animated Reflow Grid */}
      <div
        ref={gridRef}
        className="relative grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12 lg:gap-y-14"
      >
        {PROJECTS.map((project, idx) => {
          const visible =
            activeCategory === "All" || project.category === activeCategory;
          return (
            <div
              key={project.slug}
              data-flip-card
              data-flip-id={project.slug}
              className={visible ? "block" : "hidden"}
            >
              <ProjectCard
                project={project}
                index={idx}
                staggerOffset={false}
                priority={idx < 2}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Lightweight Flip enter/leave helper using GSAP core directly
function gsapFade(
  elements: Element[],
  fromOpacity: number,
  toOpacity: number,
  fromScale: number,
  toScale: number
) {
  return gsap.fromTo(
    elements,
    { opacity: fromOpacity, scale: fromScale },
    {
      opacity: toOpacity,
      scale: toScale,
      duration: 0.45,
      ease: "power3.out",
      clearProps: "scale,opacity",
    }
  );
}
