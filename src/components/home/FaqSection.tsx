"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { FAQ_ITEMS } from "@/data/home";
import { HeadingReveal } from "@/components/motion/TextReveal";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
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
      aria-labelledby="faq-heading"
      className="section-pad hairline-t"
    >
      <div className="container-editorial grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4 space-y-4">
          <p className="text-eyebrow">09 · Questions</p>
          <HeadingReveal as="h2" id="faq-heading" className="text-h2">
            Straight answers before we start.
          </HeadingReveal>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Clear expectations around pricing, sprint timelines, revisions, platforms, and
            how the vetted team works.
          </p>
        </div>

        <div className="lg:col-span-8 border-t border-[var(--border-subtle)]">
          {FAQ_ITEMS.map((item) => {
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
                  style={{ height: item.id === FAQ_ITEMS[0].id ? "auto" : 0, overflow: "hidden" }}
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
