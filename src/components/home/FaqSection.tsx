"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { FAQ_ITEMS } from "@/data/home";
import { HeadingReveal } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface FaqSectionProps {
  limit?: number;
  showHeader?: boolean;
}

export function FaqSection({ limit, showHeader = true }: FaqSectionProps) {
  const items = typeof limit === "number" ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    Object.entries(contentRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const isOpen = id === openId;

      if (prefersReducedMotion) {
        el.style.height = isOpen ? "auto" : "0px";
        el.style.opacity = isOpen ? "1" : "0";
        return;
      }

      if (isOpen) {
        gsap.killTweensOf(el);
        gsap.set(el, { height: "auto" });
        const fullH = el.offsetHeight;
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: fullH,
            opacity: 1,
            duration: 0.45,
            ease: "expo.out",
            onComplete: () => {
              el.style.height = "auto";
            },
          }
        );
      } else {
        gsap.killTweensOf(el);
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power3.inOut",
        });
      }
    });
  }, [openId, prefersReducedMotion]);

  return (
    <section
      id="faq"
      aria-labelledby={showHeader ? "faq-heading" : undefined}
      className={showHeader ? "section-pad hairline-t" : "py-4"}
    >
      <div className="container-editorial grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {showHeader ? (
          <div className="lg:col-span-4 space-y-5">
            <p className="text-eyebrow">09 · FAQ</p>
            <HeadingReveal as="h2" id="faq-heading" className="text-h2">
              Questions before you start?
            </HeadingReveal>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Clear answers about our studio names, pricing, timelines, platforms and working
              solo or with a team.
            </p>
            {typeof limit === "number" && limit < FAQ_ITEMS.length ? (
              <div className="pt-1">
                <MagneticButton href="/faq" variant="secondary" size="sm">
                  <span>Read the full FAQ</span>
                  <span aria-hidden="true">→</span>
                </MagneticButton>
              </div>
            ) : null}
          </div>
        ) : null}

        <div
          className={`${
            showHeader ? "lg:col-span-8" : "lg:col-span-12"
          } border-t border-[var(--border-subtle)]`}
        >
          {items.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="border-b border-[var(--border-subtle)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex min-h-[68px] w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                    <span className="inline-block w-fit rounded-full border border-[var(--border-subtle)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--accent)]">
                      {item.tag}
                    </span>
                    <span className="font-display text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                      {item.question}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] rotate-45"
                        : "border-[var(--border-strong)] text-[var(--text-primary)]"
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  ref={(node) => {
                    contentRefs.current[item.id] = node;
                  }}
                  style={{ height: idx === 0 ? "auto" : 0, overflow: "hidden" }}
                >
                  <p className="pb-6 pr-12 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
