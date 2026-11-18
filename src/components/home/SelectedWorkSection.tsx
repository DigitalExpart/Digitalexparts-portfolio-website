"use client";

import React from "react";
import { PROJECTS } from "@/data/projects";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProjectCard } from "@/components/shared/ProjectCard";

export function SelectedWorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="section-pad hairline-t"
    >
      <div className="container-editorial space-y-12 sm:space-y-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-eyebrow">03 · Selected Work</p>
            <HeadingReveal as="h2" id="selected-work-heading" className="text-h1">
              Recent ships across web, brand &amp; motion.
            </HeadingReveal>
          </div>

          <FadeUp className="flex flex-col items-start gap-4 lg:items-end">
            <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary)] lg:text-right">
              Six case studies spanning custom code, no-code platforms, UI/UX systems, branding,
              retention email, and AI video production.
            </p>
            <MagneticButton href="/work" variant="primary" size="md">
              <span>View all work</span>
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </FadeUp>
        </div>

        {/* Staggered 2-column editorial grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
          {PROJECTS.map((project, idx) => (
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
    </section>
  );
}
