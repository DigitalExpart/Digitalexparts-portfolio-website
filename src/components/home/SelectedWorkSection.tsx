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
            <p className="text-eyebrow">03 · Recent Work</p>
            <HeadingReveal as="h2" id="selected-work-heading" className="text-h1">
              Recent work
            </HeadingReveal>
          </div>

          <FadeUp className="flex flex-col items-start gap-4 lg:items-end">
            <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary)] lg:text-right">
              Websites, brands and campaigns we have shipped for real clients — alongside
              studio concept case studies across custom code, no-code, email and AI video.
            </p>
            <MagneticButton href="/work" variant="primary" size="md">
              <span>See all work</span>
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </FadeUp>
        </div>

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
