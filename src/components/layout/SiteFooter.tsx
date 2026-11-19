"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { NAV_LINKS, PLATFORM_PROFILES, SITE, SOCIAL_LINKS } from "@/data/site";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

const WORDMARK_LETTERS = SITE.brandUpper.split("");
const FOOTER_MARQUEE_PHRASES = ["Let's talk", "Let's build", "Let's grow"];
const FOOTER_NAV = NAV_LINKS.filter((item) => item.href !== "/");

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  const { scrollTo } = useSmoothScroll();
  const { prefersReducedMotion } = useMediaCapabilities();

  // M15: Giant wordmark letters rise as main content lifts to reveal footer
  useEffect(() => {
    ensureGsapRegistered();
    const footer = footerRef.current;
    const wordmark = wordmarkRef.current;
    if (!footer || !wordmark || prefersReducedMotion) return;

    const letters = wordmark.querySelectorAll<HTMLElement>("[data-wordmark-char]");
    if (!letters.length) return;

    const prevContent = footer.previousElementSibling as HTMLElement | null;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letters,
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.026,
          ease: "expo.out",
          scrollTrigger: prevContent
            ? {
                trigger: prevContent,
                start: "bottom 96%",
                once: true,
              }
            : {
                trigger: wordmark,
                start: "top 95%",
                once: true,
              },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // M15: Looping footer strip
  useEffect(() => {
    ensureGsapRegistered();
    const track = marqueeTrackRef.current;
    if (!track || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer
      ref={footerRef}
      className="relative z-0 border-t border-[var(--border-subtle)] bg-[#030408] text-[var(--text-primary)] sticky-footer-reveal"
    >
      {/* Top Looping Strip: Let's talk · Let's build · Let's grow */}
      <div className="overflow-hidden border-b border-[var(--border-subtle)] py-4">
        <TransitionLink
          href="/contact"
          aria-label="Let's talk — start your project"
          className="block overflow-hidden"
        >
          <div
            ref={marqueeTrackRef}
            className="flex w-max items-center will-change-transform"
          >
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1}
                className="flex shrink-0 items-center gap-8 pr-8"
              >
                {Array.from({ length: 4 }).flatMap((_, rep) =>
                  FOOTER_MARQUEE_PHRASES.map((phrase, pIdx) => (
                    <span
                      key={`${dup}-${rep}-${pIdx}`}
                      className="inline-flex items-center gap-6 font-display text-lg sm:text-2xl font-bold uppercase tracking-tight text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                    >
                      <span>{phrase}</span>
                      <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
        </TransitionLink>
      </div>

      {/* Main Footer Grid */}
      <div className="container-editorial py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand Summary & Name Clarity */}
          <div className="md:col-span-5 space-y-4">
            <p className="text-eyebrow">{SITE.shortLockup} · Replies within {SITE.responseTime}</p>
            <p className="max-w-md font-display text-xl sm:text-2xl font-semibold leading-snug">
              {SITE.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
              {SITE.nameLine}{" "}
              <TransitionLink
                href="/about#names"
                className="inline-flex min-h-[44px] items-center font-medium text-[var(--accent)] underline underline-offset-4 hover:text-[var(--text-primary)]"
              >
                Read who is who →
              </TransitionLink>
            </p>
          </div>

          {/* Pages */}
          <div className="md:col-span-2 space-y-2">
            <p className="text-eyebrow">Pages</p>
            <ul>
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct & Marketplaces */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-eyebrow">Reach out</p>
            <div className="flex flex-col items-start text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-[44px] items-center font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center text-[var(--accent)] hover:underline"
              >
                Book a 30-minute call ↗
              </a>
              <div className="flex flex-col items-start pt-1">
                {PLATFORM_PROFILES.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    {p.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Social & Back to top */}
          <div className="md:col-span-2 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <p className="text-eyebrow">Profiles</p>
              <ul>
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <MagneticButton
                variant="secondary"
                size="sm"
                onClick={() => scrollTo(0)}
                ariaLabel="Back to top"
              >
                <span>Back to top</span>
                <span aria-hidden="true">↑</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Full-Width Wordmark (M15) */}
      <div className="container-editorial border-t border-[var(--border-subtle)] pt-5 pb-5">
        <div
          ref={wordmarkRef}
          aria-hidden="true"
          className="flex w-full items-center justify-between overflow-hidden select-none"
        >
          {WORDMARK_LETTERS.map((char, idx) => (
            <span
              key={`${char}-${idx}`}
              data-wordmark-char
              className="font-display text-[clamp(1.42rem,9vw,8.8rem)] font-extrabold leading-[0.86] tracking-[-0.04em] text-[var(--text-primary)] will-change-transform"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
          </span>
          <span>Fully remote · All time zones</span>
        </div>
      </div>
    </footer>
  );
}
