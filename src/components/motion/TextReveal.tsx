"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap, SplitText } from "@/lib/gsap";
import { useMotionRoot } from "@/components/motion/MotionRootContext";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

interface HeadingRevealProps {
  children: React.ReactNode;
  as?: HeadingTag;
  id?: string;
  className?: string;
  trigger?: "scroll" | "enter";
  delay?: number;
  stagger?: number;
}

/**
 * M5 Heading reveal: splits heading into masked lines, animates yPercent 110 -> 0
 * with 0.06s stagger and expo.out easing.
 */
export function HeadingReveal({
  children,
  as: Tag = "h2",
  id,
  className = "",
  trigger = "scroll",
  delay = 0,
  stagger = 0.06,
}: HeadingRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { isPreloaderDone, isTransitioning, enterCycle } = useMotionRoot();
  const { prefersReducedMotion } = useMediaCapabilities();
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    ensureGsapRegistered();
    const el = ref.current;
    if (!el) return;

    if (trigger === "enter" && (!isPreloaderDone || isTransitioning)) {
      return;
    }

    if (trigger === "enter" && hasEnteredRef.current) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          delay,
          ease: "power2.out",
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: el, start: "top 88%", once: true }
              : undefined,
        }
      );
      if (trigger === "enter") hasEnteredRef.current = true;
      return;
    }

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      if (trigger === "enter") {
        hasEnteredRef.current = true;
      }

      split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line-item",
        onSplit: (self) => {
          if (!self.lines.length) return;
          if (trigger === "enter") {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 0.95,
              stagger,
              delay,
              ease: "expo.out",
              clearProps: "transform",
            });
          }
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            stagger,
            delay,
            ease: "expo.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          });
        },
      });
    }, ref);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [
    trigger,
    delay,
    stagger,
    isPreloaderDone,
    isTransitioning,
    enterCycle,
    prefersReducedMotion,
  ]);

  return (
    <Tag id={id} ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}

interface FadeUpProps {
  children: React.ReactNode;
  as?: "div" | "p" | "span";
  id?: string;
  className?: string;
  trigger?: "scroll" | "enter";
  delay?: number;
  y?: number;
}

/**
 * M5 Paragraph / block fade-up reveal.
 */
export function FadeUp({
  children,
  as: Tag = "div",
  id,
  className = "",
  trigger = "scroll",
  delay = 0,
  y = 22,
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);
  const { isPreloaderDone, isTransitioning, enterCycle } = useMotionRoot();
  const { prefersReducedMotion } = useMediaCapabilities();
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    ensureGsapRegistered();
    const el = ref.current;
    if (!el) return;

    if (trigger === "enter" && (!isPreloaderDone || isTransitioning)) {
      return;
    }
    if (trigger === "enter" && hasEnteredRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const fromVars = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y };
      const toVars = {
        opacity: 1,
        y: 0,
        duration: prefersReducedMotion ? 0.35 : 0.75,
        delay,
        ease: "expo.out",
        clearProps: "transform",
      };

      if (trigger === "enter") {
        hasEnteredRef.current = true;
        gsap.fromTo(el, fromVars, toVars);
      } else {
        gsap.fromTo(el, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [
    trigger,
    delay,
    y,
    isPreloaderDone,
    isTransitioning,
    enterCycle,
    prefersReducedMotion,
  ]);

  return (
    <Tag id={id} ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}

interface WordScrubHighlightProps {
  text: string;
  className?: string;
}

/**
 * M5 About statement highlight: splits into words and scrubs opacity 0.15 -> 1.
 */
export function WordScrubHighlight({ text, className = "" }: WordScrubHighlightProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    let split: SplitText | null = null;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: "words",
      });

      if (!split.words.length) return;

      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 42%",
            scrub: true,
          },
        }
      );
    }, ref);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [text, prefersReducedMotion]);

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
