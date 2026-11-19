"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { SERVICES, type ServiceItem } from "@/data/services";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string | null>(SERVICES[0].id);
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);

  const { isDesktopFinePointer, prefersReducedMotion } = useMediaCapabilities();
  const canFloatPreview = isDesktopFinePointer && !prefersReducedMotion;

  // M11: Floating preview image follows cursor smoothly on desktop
  useEffect(() => {
    ensureGsapRegistered();
    const preview = previewWrapRef.current;
    const list = listRef.current;
    if (!preview || !list || !canFloatPreview) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevX = 0;
    let isInside = false;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX + 28;
      targetY = e.clientY - 96;
      if (!isInside) {
        isInside = true;
        currentX = targetX;
        currentY = targetY;
        prevX = targetX;
      }
    };

    const onPointerLeave = () => {
      isInside = false;
      setHoveredService(null);
    };

    const tick = () => {
      rafId = window.requestAnimationFrame(tick);
      if (!isInside) return;

      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      const vx = currentX - prevX;
      prevX = currentX;
      const tilt = Math.max(-8, Math.min(8, vx * 0.35));

      preview.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${tilt}deg)`;
    };

    list.addEventListener("pointermove", onPointerMove, { passive: true });
    list.addEventListener("pointerleave", onPointerLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      list.removeEventListener("pointermove", onPointerMove);
      list.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [canFloatPreview]);

  // Animate capability bullets stagger & smooth panel expansion when activeId changes
  useEffect(() => {
    ensureGsapRegistered();
    if (!listRef.current || !activeId) return;

    const activeRow = listRef.current.querySelector<HTMLElement>(
      `[data-service-id="${activeId}"]`
    );
    if (!activeRow) return;

    const bullets = activeRow.querySelectorAll<HTMLElement>("[data-cap-bullet]");
    if (!bullets.length) return;

    if (prefersReducedMotion) {
      gsap.set(bullets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bullets,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.04,
          ease: "power3.out",
          overwrite: true,
        }
      );
    }, activeRow);

    return () => ctx.revert();
  }, [activeId, prefersReducedMotion]);

  const handleToggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="relative section-pad hairline-t"
    >
      <div className="container-editorial space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-eyebrow">02 · What We Do</p>
            <HeadingReveal as="h2" id="services-heading" className="text-h2">
              Everything your business needs to look good and get found online
            </HeadingReveal>
          </div>

          <FadeUp className="flex flex-col items-start gap-4 lg:items-end">
            <p className="max-w-md text-sm sm:text-base text-[var(--text-secondary)] lg:text-right">
              We recommend the platform that fits your budget — Wix, Squarespace, WordPress,
              Webflow or custom React code — plus brand, email and AI video under one roof.
            </p>
            <MagneticButton href="/services" variant="secondary" size="sm">
              <span>Explore all services</span>
              <span aria-hidden="true">→</span>
            </MagneticButton>
          </FadeUp>
        </div>

        {/* M11 Interactive Numbered Rows */}
        <div
          ref={listRef}
          className="relative border-t border-[var(--border-subtle)]"
        >
          {SERVICES.map((service) => {
            const isOpen = activeId === service.id;

            return (
              <div
                key={service.id}
                data-service-id={service.id}
                onMouseEnter={() => {
                  if (isDesktopFinePointer) {
                    setActiveId(service.id);
                    setHoveredService(service);
                  }
                }}
                onMouseLeave={() => {
                  if (isDesktopFinePointer) {
                    setHoveredService(null);
                  }
                }}
                className={`group border-b border-[var(--border-subtle)] transition-colors duration-300 ${
                  isOpen ? "bg-white/[0.025]" : "hover:bg-white/[0.015]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(service.id)}
                  onFocus={() => {
                    if (isDesktopFinePointer) setActiveId(service.id);
                  }}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                  className="flex min-h-[76px] w-full items-center justify-between gap-4 py-6 sm:py-8 text-left focus-visible:outline-offset-[-4px]"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8 min-w-0">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-[0.14em] transition-colors duration-300 ${
                        isOpen
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {service.index}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={`font-display text-[clamp(1.45rem,3.3vw,2.85rem)] font-bold leading-tight tracking-tight transition-transform duration-300 ${
                          isOpen
                            ? "text-[var(--text-primary)] lg:translate-x-2"
                            : "text-[var(--text-primary)]"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="mt-1 font-mono text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        {service.shortTag}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <span className="hidden md:inline-block rounded-full border border-[var(--border-subtle)] px-3.5 py-1.5 text-xs text-[var(--text-secondary)]">
                      {service.accentLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] rotate-45"
                          : "border-[var(--border-strong)] text-[var(--text-primary)]"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Expandable Details & Staggered Capabilities */}
                <div
                  id={`service-panel-${service.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-expo)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-6 pb-8 pl-0 sm:pl-14 lg:grid-cols-12 lg:gap-10">
                      <div className="lg:col-span-4 space-y-4">
                        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                          {service.description}
                        </p>
                        <TransitionLink
                          href={`/services/${service.slug}`}
                          className="inline-flex min-h-[44px] items-center gap-2 text-xs font-mono uppercase tracking-[0.12em] text-[var(--accent)] hover:underline"
                        >
                          <span>View {service.title} details</span>
                          <span aria-hidden="true">→</span>
                        </TransitionLink>
                        {/* Compact preview thumbnail on mobile/tablet when expanded */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)] lg:hidden">
                          <Image
                            src={service.previewImage}
                            alt={service.previewAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 320px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-8">
                        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          {service.capabilities.map((cap) => (
                            <li
                              key={cap}
                              data-cap-bullet
                              className="flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 px-4 py-3 text-sm text-[var(--text-primary)]"
                            >
                              <span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                              />
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Cursor-Following Preview Card (M11) */}
      {canFloatPreview ? (
        <div
          ref={previewWrapRef}
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-40 hidden lg:block w-[270px] overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] shadow-2xl transition-opacity duration-250 will-change-transform ${
            hoveredService ? "opacity-100" : "opacity-0"
          }`}
        >
          {hoveredService ? (
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={hoveredService.previewImage}
                alt=""
                fill
                sizes="270px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  {hoveredService.index} · Preview
                </span>
                <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white/90">
                  {hoveredService.shortTag.split("·")[0].trim()}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
