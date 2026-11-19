"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { SITE } from "@/data/site";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface ArcCardItem {
  title: string;
  tag: string;
  src: string;
  href: string;
  isBrandTile?: boolean;
}

const ARC_ITEMS: ArcCardItem[] = [
  {
    title: "Kinetik Pay",
    tag: "Next.js Web",
    src: "/images/projects/kinetik-pay.jpg",
    href: "/work/kinetik-pay",
  },
  {
    title: "Velo Mobile",
    tag: "iOS & Android",
    src: "/images/projects/velo-mobile-app.jpg",
    href: "/work/velo-mobile-app",
  },
  {
    title: "NexaFlow AI",
    tag: "AI Automation",
    src: "/images/projects/nexaflow-automation.jpg",
    href: "/work/nexaflow-automation",
  },
  {
    title: "Brand System",
    tag: "Identity",
    src: "/brand/logo-stacked-light.png",
    href: "/services/graphic-design-branding",
    isBrandTile: true,
  },
  {
    title: "Pulseboard CRM",
    tag: "UI/UX System",
    src: "/images/projects/pulseboard-crm.jpg",
    href: "/work/pulseboard-crm",
  },
  {
    title: "Aether Robotics",
    tag: "AI Video",
    src: "/images/projects/aether-robotics.jpg",
    href: "/work/aether-robotics",
  },
  {
    title: "Vespera Atelier",
    tag: "Branding",
    src: "/images/projects/vespera-atelier.jpg",
    href: "/work/vespera-atelier",
  },
  {
    title: "Sora Roastery",
    tag: "Email Flows",
    src: "/images/projects/sora-roastery.jpg",
    href: "/work/sora-roastery",
  },
];

export function DesignInMotionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    if (!section) return;

    const layoutArc = (progress: number) => {
      const isCompact = window.innerWidth < 768;
      const cardSpacing = isCompact ? 168 : window.innerWidth < 1200 ? 225 : 272;
      const arcLift = isCompact ? 14 : 24;
      const centerShift = 3.5 + (0.5 - progress) * 4.2;

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const offset = idx - centerShift;
        const x = offset * cardSpacing;
        // Parabolic upward/downward arc with subtle asymmetric sweep matching orbital curves
        const y = offset * offset * arcLift - offset * (isCompact ? 6 : 12);
        const rotY = Math.max(-52, Math.min(52, -offset * 15.5));
        const rotZ = Math.max(-14, Math.min(14, offset * 3.6));
        const scale = Math.max(0.76, 1.02 - Math.abs(offset) * 0.055);
        const opacity = Math.max(0.28, 1 - Math.max(0, Math.abs(offset) - 2.2) * 0.35);

        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) perspective(1150px) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(Math.round(30 - Math.abs(offset) * 4));
      });
    };

    layoutArc(prefersReducedMotion ? 0.5 : 0.35);
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.35,
        refreshPriority: 1,
        onUpdate: (self) => {
          layoutArc(self.progress);
        },
      });

      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { rotate: -14, yPercent: 8 },
          {
            rotate: 22,
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    const onResize = () => layoutArc(0.5);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="craft-in-motion"
      ref={sectionRef}
      aria-label="Design in motion showcase"
      className="relative overflow-hidden border-t border-[var(--border-on-light)] bg-[#D9DDE4] py-20 sm:py-28 lg:py-32 text-[#05060A]"
    >
      {/* Subtle architectural orbital curve strokes */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 760"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
        preserveAspectRatio="none"
      >
        <path
          d="M -120 140 C 380 40, 620 260, 1560 90"
          stroke="rgba(5,6,10,0.12)"
          strokeWidth="1.2"
        />
        <path
          d="M -160 640 C 320 710, 960 440, 1560 660"
          stroke="rgba(5,6,10,0.12)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Brand Kit Watermark (Light Variant) */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] will-change-transform"
      >
        <Image
          src="/brand/logo-mark-light.svg"
          alt=""
          width={520}
          height={520}
          unoptimized
          className="h-[340px] w-[340px] sm:h-[520px] sm:w-[520px]"
        />
      </div>

      <div className="container-editorial relative z-10 flex flex-col items-center text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#535B69] mb-4">
          07 · Craft In Motion · Real Deliverables
        </p>

        <h2 className="font-display text-[clamp(3.1rem,9.5vw,8.4rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em] text-[#05060A]">
          CRAFT IN
        </h2>

        <p className="my-3 sm:my-4 max-w-md font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#454D5B]">
          Mobile Apps · Websites · AI Automation · 2D/3D · AI Video
        </p>

        <p
          aria-hidden="true"
          className="font-display text-[clamp(3.1rem,9.5vw,8.4rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.045em] text-[#05060A]/85"
        >
          MOTION
        </p>
      </div>

      {/* 3D Curved Perspective Showcase Ribbon (Trionn-inspired orbital arc) */}
      <div className="relative z-20 -mt-6 sm:-mt-12 h-[220px] sm:h-[290px] w-full">
        <div className="relative h-full w-full">
          {ARC_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="group absolute left-1/2 top-6 -ml-[108px] sm:-ml-[138px] lg:-ml-[162px] w-[216px] sm:w-[276px] lg:w-[324px] aspect-[16/10] overflow-hidden rounded-xl border border-[#05060A]/15 shadow-[0_24px_48px_rgba(5,6,10,0.22)] will-change-transform"
            >
              <TransitionLink
                href={item.href}
                aria-label={`${item.title} — ${item.tag}`}
                className="relative block h-full w-full focus-visible:outline-offset-4"
              >
                <div
                  className={`relative h-full w-full ${
                    item.isBrandTile ? "bg-white p-5 sm:p-7 flex items-center justify-center" : "bg-[#0B0E16]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill={!item.isBrandTile}
                    width={item.isBrandTile ? 320 : undefined}
                    height={item.isBrandTile ? 190 : undefined}
                    unoptimized={item.isBrandTile}
                    sizes="(max-width: 768px) 220px, 324px"
                    className={
                      item.isBrandTile
                        ? "h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        : "object-cover transition-transform duration-500 group-hover:scale-105"
                    }
                  />
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3.5 py-2.5 text-left">
                  <span className="font-display text-xs sm:text-sm font-semibold text-white truncate">
                    {item.title}
                  </span>
                  <span className="shrink-0 rounded-full bg-[#B6FF4A] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#05060A] font-semibold">
                    {item.tag}
                  </span>
                </div>
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Caption & Action Links */}
      <div className="container-editorial relative z-30 mt-10 sm:mt-14 flex flex-col gap-5 border-t border-[#05060A]/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-[#38404E]">
          Websites, iOS &amp; Android mobile apps, brand systems, 2D/3D visuals and AI video crafted
          with speed and attention to detail.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <TransitionLink
            href="/work"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] font-semibold text-[#05060A] underline underline-offset-4 hover:opacity-70"
          >
            <span>Explore Full Portfolio</span>
            <span aria-hidden="true">→</span>
          </TransitionLink>
          <a
            href={SITE.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] font-semibold text-[#05060A] underline underline-offset-4 hover:opacity-70"
          >
            <span>View on Behance</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
