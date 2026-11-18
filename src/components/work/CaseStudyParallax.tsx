"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface CaseStudyParallaxProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function CaseStudyParallax({
  src,
  alt,
  priority = false,
}: CaseStudyParallaxProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, frameRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={frameRef}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
    >
      <div
        ref={innerRef}
        className="absolute inset-x-0 -top-[9%] h-[118%] w-full will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 90vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
