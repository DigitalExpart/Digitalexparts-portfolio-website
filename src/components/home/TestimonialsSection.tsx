"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { TESTIMONIALS } from "@/data/home";
import { SITE } from "@/data/site";
import { HeadingReveal } from "@/components/motion/TextReveal";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

export function TestimonialsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef({
    down: false,
    startX: 0,
    startOffset: 0,
    currentX: 0,
    lastX: 0,
    velocity: 0,
    stride: 440,
  });

  const { prefersReducedMotion } = useMediaCapabilities();

  const getStride = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return 420;
    const first = track.children[0] as HTMLElement;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "24") || 24;
    return first.offsetWidth + gap;
  }, []);

  const snapToIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(TESTIMONIALS.length - 1, nextIndex));
      setActiveIndex(clamped);

      const track = trackRef.current;
      if (!track) return;

      const stride = getStride();
      dragStateRef.current.stride = stride;
      const targetX = -clamped * stride;
      dragStateRef.current.currentX = targetX;

      if (prefersReducedMotion) {
        track.style.transform = `translate3d(${targetX}px, 0, 0)`;
        return;
      }

      gsap.to(track, {
        x: targetX,
        duration: 0.72,
        ease: "expo.out",
        overwrite: true,
      });
    },
    [getStride, prefersReducedMotion]
  );

  useEffect(() => {
    ensureGsapRegistered();
    const onResize = () => snapToIndex(activeIndex);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex, snapToIndex]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.closest("button, a")) return;
    const track = trackRef.current;
    if (!track) return;

    gsap.killTweensOf(track);
    const stride = getStride();
    dragStateRef.current = {
      down: true,
      startX: e.clientX,
      startOffset: dragStateRef.current.currentX,
      currentX: dragStateRef.current.currentX,
      lastX: e.clientX,
      velocity: 0,
      stride,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragStateRef.current;
    if (!ds.down || !trackRef.current) return;

    const delta = e.clientX - ds.startX;
    ds.velocity = e.clientX - ds.lastX;
    ds.lastX = e.clientX;

    const maxOffset = 0;
    const minOffset = -(TESTIMONIALS.length - 1) * ds.stride;
    let nextX = ds.startOffset + delta;

    if (nextX > maxOffset) {
      nextX = (nextX - maxOffset) * 0.35;
    } else if (nextX < minOffset) {
      nextX = minOffset + (nextX - minOffset) * 0.35;
    }

    ds.currentX = nextX;
    gsap.set(trackRef.current, { x: nextX });
  };

  const handlePointerUp = () => {
    const ds = dragStateRef.current;
    if (!ds.down) return;
    ds.down = false;
    setIsDragging(false);

    const projectedX = ds.currentX + ds.velocity * 6;
    const rawIdx = Math.round(-projectedX / Math.max(1, ds.stride));
    snapToIndex(rawIdx);
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="overflow-hidden section-pad hairline-t"
    >
      <div className="container-editorial space-y-10 sm:space-y-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-4 max-w-3xl">
            <p className="text-eyebrow">08 · Reviews from Fiverr &amp; Upwork</p>
            <HeadingReveal as="h2" id="testimonials-heading" className="text-h1">
              What clients say
            </HeadingReveal>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              <a
                href={SITE.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 font-medium text-[var(--accent)] underline underline-offset-4 hover:text-[var(--text-primary)]"
              >
                <span>
                  {SITE.proof.fiverrRating} from {SITE.proof.fiverrReviews} reviews on Fiverr
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="mr-2 font-mono text-xs tabular-nums text-[var(--text-secondary)]">
              0{activeIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              type="button"
              onClick={() => snapToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-base text-[var(--text-primary)] transition-all active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-35 disabled:pointer-events-none"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => snapToIndex(activeIndex + 1)}
              disabled={activeIndex === TESTIMONIALS.length - 1}
              aria-label="Next testimonial"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-base text-[var(--text-primary)] transition-all active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-35 disabled:pointer-events-none"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          data-cursor="drag"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative select-none touch-pan-y ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div
            ref={trackRef}
            className="flex gap-5 sm:gap-7 will-change-transform"
          >
            {TESTIMONIALS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <article
                  key={item.id}
                  onClick={() => {
                    if (!isActive) snapToIndex(idx);
                  }}
                  className={`flex w-[86vw] max-w-[540px] shrink-0 flex-col justify-between gap-8 rounded-3xl border p-6 sm:p-9 transition-all duration-500 ${
                    isActive
                      ? "border-[var(--accent)]/50 bg-[var(--bg-elevated)] scale-100 opacity-100"
                      : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/55 scale-[0.96] opacity-70 hover:opacity-90"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      {item.source}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.metaNote ? (
                        <span className="rounded-full border border-[var(--accent)]/35 bg-[var(--accent-soft)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--accent)]">
                          {item.metaNote}
                        </span>
                      ) : null}
                      {item.price ? (
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {item.price}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <blockquote className="font-display text-lg sm:text-2xl font-medium leading-[1.35] tracking-tight text-[var(--text-primary)]">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
                    <div>
                      <p className="font-display text-base font-bold text-[var(--text-primary)]">
                        {item.author}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                        {item.country} · {item.projectType}
                      </p>
                    </div>
                    <span
                      aria-label="5 out of 5 rating"
                      className="font-mono text-xs tracking-[0.18em] text-[var(--accent)] shrink-0"
                    >
                      ★★★★★
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => snapToIndex(idx)}
              aria-label={`Go to review ${idx + 1} by ${item.author}`}
              aria-current={idx === activeIndex ? "true" : undefined}
              className="group flex min-h-[44px] items-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-10 bg-[var(--accent)]"
                    : "w-3 bg-[var(--border-strong)] group-hover:bg-[var(--text-secondary)]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
