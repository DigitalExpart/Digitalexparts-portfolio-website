"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import type { ProjectItem } from "@/data/projects";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { ProjectHoverShader } from "@/components/shared/ProjectHoverShader";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  staggerOffset?: boolean;
  priority?: boolean;
}

export function ProjectCard({
  project,
  index,
  staggerOffset = false,
  priority = false,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [pointerUv, setPointerUv] = useState({ x: 0.5, y: 0.5 });

  const { isDesktopFinePointer, prefersReducedMotion } = useMediaCapabilities();
  const canUseHoverFx = isDesktopFinePointer && !prefersReducedMotion;

  // M10: Clip-path inset reveal + inner scrubbed parallax (yPercent -8 -> 8)
  useEffect(() => {
    ensureGsapRegistered();
    const card = cardRef.current;
    const frame = frameRef.current;
    const parallaxEl = parallaxRef.current;
    if (!card || !frame) return;

    if (prefersReducedMotion) {
      gsap.set(frame, { clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const isRightCol = index % 2 === 1;
      const slideOffset = staggerOffset
        ? window.innerWidth >= 768
          ? isRightCol
            ? 18
            : -18
          : isRightCol
            ? 12
            : -12
        : 0;

      gsap.fromTo(
        frame,
        {
          clipPath: "inset(14% 0% 14% 0% round 16px)",
          y: 36,
          x: slideOffset,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          y: 0,
          x: 0,
          duration: 1.05,
          ease: "expo.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        }
      );

      if (parallaxEl) {
        gsap.fromTo(
          parallaxEl,
          { yPercent: -8, scale: 1.07 },
          {
            yPercent: 8,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, staggerOffset, prefersReducedMotion]);

  const handleMouseEnter = () => {
    if (!canUseHoverFx) return;
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canUseHoverFx || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    setPointerUv({
      x: Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width))),
      y: Math.max(0, Math.min(1, (e.clientY - rect.top) / Math.max(1, rect.height))),
    });
  };

  return (
    <article
      ref={cardRef}
      className={`group relative ${
        staggerOffset && index % 2 === 1 ? "lg:mt-16" : ""
      }`}
    >
      <TransitionLink
        href={`/work/${project.slug}`}
        data-cursor="view"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="block focus-visible:outline-offset-4"
        aria-label={`View case study: ${project.title} — ${project.category}`}
      >
        {/* Masked Media Frame */}
        <div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] transition-all duration-300 active:scale-[0.985] active:border-[var(--accent)]/60 group-hover:border-[var(--border-strong)]"
        >
          {/* Inner Scrubbed Parallax Wrapper */}
          <div
            ref={parallaxRef}
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full will-change-transform"
          >
            <div
              className={`relative h-full w-full transition-transform duration-700 ease-[var(--ease-expo)] ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            >
              <Image
                src={project.posterImage}
                alt={`${project.title} — ${project.category} showcase`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Optional Muted Video Preview on Hover (M10) */}
          {project.videoPreview ? (
            <video
              ref={videoRef}
              src={project.videoPreview}
              poster={project.posterImage}
              muted
              playsInline
              loop
              preload="none"
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null}

          {/* M17 Desktop-Only WebGL Ripple Shader on Hover (mounts only while hovered) */}
          {canUseHoverFx && isHovered && !project.videoPreview ? (
            <ProjectHoverShader
              imageSrc={project.posterImage}
              active={isHovered}
              pointerUv={pointerUv}
            />
          ) : null}

          {/* Kinetic Telemetry Overlay Pill (visible on hover / subtle mobile corner tag) */}
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-t from-black/70 via-transparent to-black/25">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  {project.category}
                </span>
                {project.isConcept ? (
                  <span className="rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm">
                    Concept
                  </span>
                ) : null}
              </div>
              <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] backdrop-blur-sm">
                {project.engagementModel}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-black/60 px-2.5 py-0.5 text-[11px] text-white/80 backdrop-blur-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs text-white/75">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Project Copy Row with Title Slide */}
        <div className="mt-4 flex items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {project.index}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2 group-hover:text-[var(--accent)]">
                {project.title}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] line-clamp-2">
              {project.tagline}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]"
          >
            ↗
          </span>
        </div>
      </TransitionLink>
    </article>
  );
}
