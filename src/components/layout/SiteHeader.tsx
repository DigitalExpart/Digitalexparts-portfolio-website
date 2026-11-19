"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { NAV_LINKS, PLATFORM_PROFILES, SITE, SOCIAL_LINKS } from "@/data/site";
import { useMotionRoot } from "@/components/motion/MotionRootContext";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface ClipOrigin {
  x: number;
  y: number;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { isMenuOpen, setMenuOpen } = useMotionRoot();
  const { stop, start } = useSmoothScroll();
  const { prefersReducedMotion } = useMediaCapabilities();

  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const sideColRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [localTime, setLocalTime] = useState<string>("");
  const [clipOrigin, setClipOrigin] = useState<ClipOrigin>({ x: 0, y: 38 });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const lastScrollY = useRef(0);
  const isHiddenRef = useRef(false);
  const hasOpenedMenuRef = useRef(false);

  // Visitor local time live ticker
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }).format(now);
        setLocalTime(formatted);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };

    updateClock();
    const id = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Header hide on scroll down / show on scroll up
  useEffect(() => {
    ensureGsapRegistered();
    const header = headerRef.current;
    if (!header) return;

    const showHeader = () => {
      if (!isHiddenRef.current) return;
      isHiddenRef.current = false;
      gsap.to(header, {
        yPercent: 0,
        duration: prefersReducedMotion ? 0.15 : 0.42,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const hideHeader = () => {
      if (isHiddenRef.current || isMenuOpen) return;
      isHiddenRef.current = true;
      gsap.to(header, {
        yPercent: -105,
        duration: prefersReducedMotion ? 0.15 : 0.36,
        ease: "power3.inOut",
        overwrite: true,
      });
    };

    if (isMenuOpen) {
      showHeader();
    }

    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 24);

      if (isMenuOpen || currentY < 72) {
        showHeader();
        lastScrollY.current = currentY;
        return;
      }

      const delta = currentY - lastScrollY.current;
      if (delta > 6) {
        hideHeader();
      } else if (delta < -6) {
        showHeader();
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen, prefersReducedMotion]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  // Menu open/close clip-path + staggered link reveal + scroll lock + focus trap
  useEffect(() => {
    ensureGsapRegistered();
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isMenuOpen) {
      hasOpenedMenuRef.current = true;
      stop();

      const origin = `${clipOrigin.x}px ${clipOrigin.y}px`;
      const linkItems = navListRef.current?.querySelectorAll("[data-menu-line]") ?? [];
      const sideItems = sideColRef.current?.querySelectorAll("[data-menu-meta]") ?? [];

      gsap.killTweensOf([overlay, linkItems, sideItems]);
      gsap.set(overlay, {
        visibility: "visible",
        pointerEvents: "auto",
      });

      if (prefersReducedMotion) {
        gsap.set(overlay, {
          clipPath: `circle(150vmax at ${origin})`,
          opacity: 1,
        });
        gsap.set(linkItems, { yPercent: 0, opacity: 1 });
        gsap.set(sideItems, { y: 0, opacity: 1 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(
          overlay,
          { clipPath: `circle(0px at ${origin})` },
          {
            clipPath: `circle(155vmax at ${origin})`,
            duration: 0.72,
            ease: "expo.inOut",
          }
        )
          .fromTo(
            linkItems,
            { yPercent: 115, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.055,
              ease: "expo.out",
            },
            "-=0.38"
          )
          .fromTo(
            sideItems,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.05,
              ease: "power3.out",
            },
            "-=0.5"
          );
      }

      // Move focus inside dialog cleanly
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    } else {
      if (!hasOpenedMenuRef.current) return;
      start();
      const origin = `${clipOrigin.x}px ${clipOrigin.y}px`;

      if (prefersReducedMotion) {
        gsap.set(overlay, {
          visibility: "hidden",
          pointerEvents: "none",
          clipPath: `circle(0px at ${origin})`,
        });
      } else {
        gsap.to(overlay, {
          clipPath: `circle(0px at ${origin})`,
          duration: 0.54,
          ease: "expo.inOut",
          overwrite: true,
          onComplete: () => {
            gsap.set(overlay, {
              visibility: "hidden",
              pointerEvents: "none",
            });
          },
        });
      }
    }
  }, [isMenuOpen, clipOrigin, prefersReducedMotion, stop, start]);

  // Escape key & focus trap while menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => menuBtnRef.current?.focus());
        return;
      }

      if (e.key !== "Tab") return;
      const dialog = overlayRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !dialog.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !dialog.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, setMenuOpen]);

  const handleOpenMenu = () => {
    if (menuBtnRef.current) {
      const rect = menuBtnRef.current.getBoundingClientRect();
      setClipOrigin({
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      });
    }
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    if (closeBtnRef.current) {
      const rect = closeBtnRef.current.getBoundingClientRect();
      setClipOrigin({
        x: Math.round(rect.left + rect.width / 2),
        y: Math.round(rect.top + rect.height / 2),
      });
    }
    setMenuOpen(false);
    requestAnimationFrame(() => menuBtnRef.current?.focus());
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[var(--z-header)] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          isScrolled
            ? "bg-[var(--bg-glass)] backdrop-blur-md border-b border-[var(--border-subtle)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-editorial flex h-[var(--header-height)] items-center justify-between gap-3">
          {/* Brand Logo */}
          <TransitionLink
            href="/"
            className="group inline-flex min-h-[44px] items-center text-[var(--text-primary)] active:scale-95 transition-transform duration-200"
            aria-label={`${SITE.brand} — Home`}
          >
            <Image
              src="/brand/logo-nav-dark.svg"
              alt={SITE.brand}
              width={628}
              height={120}
              priority
              unoptimized
              className="h-[22px] min-[390px]:h-7 sm:h-8 lg:h-9 w-auto transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </TransitionLink>

          {/* Right Controls: Let's talk + Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <MagneticButton
              href="/contact"
              variant="primary"
              size="sm"
              className="!px-3.5 sm:!px-5"
            >
              <span>Let&apos;s talk</span>
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-current"
              />
            </MagneticButton>

            <button
              ref={menuBtnRef}
              type="button"
              onClick={handleOpenMenu}
              aria-expanded={isMenuOpen}
              aria-controls="fullscreen-nav-menu"
              aria-label="Open navigation menu"
              className="group inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)]/80 px-3.5 sm:px-5 text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-primary)] transition-transform transition-colors duration-300 active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span className="hidden xs:inline sm:inline">Menu</span>
              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="block h-[1.5px] w-4 bg-current transition-transform duration-300 group-hover:translate-x-0.5" />
                <span className="block h-[1.5px] w-4 bg-current transition-transform duration-300 group-hover:-translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay Menu (M6) */}
      <div
        id="fullscreen-nav-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Primary site navigation"
        aria-hidden={!isMenuOpen}
        data-lenis-prevent
        className="fixed inset-0 z-[var(--z-menu)] flex flex-col justify-between overflow-y-auto bg-[#07090F] text-[var(--text-primary)]"
        style={{
          visibility: "hidden",
          pointerEvents: "none",
          clipPath: "circle(0px at 92% 38px)",
        }}
      >
        {/* Overlay Top Bar */}
        <div className="container-editorial flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-[var(--border-subtle)]">
          <TransitionLink
            href="/"
            onClick={() => setMenuOpen(false)}
            className="inline-flex min-h-[44px] items-center active:scale-95 transition-transform duration-200"
            aria-label={`${SITE.brand} — Home`}
          >
            <Image
              src="/brand/logo-nav-dark.svg"
              alt={SITE.brand}
              width={628}
              height={120}
              unoptimized
              className="h-[22px] min-[390px]:h-7 sm:h-8 w-auto"
            />
          </TransitionLink>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={handleCloseMenu}
            aria-label="Close navigation menu"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 sm:px-5 text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span>Close</span>
            <span aria-hidden="true" className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute h-[1.5px] w-3.5 rotate-45 bg-current" />
              <span className="absolute h-[1.5px] w-3.5 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* Main Overlay Grid */}
        <div className="container-editorial my-auto grid flex-1 grid-cols-1 gap-10 py-8 lg:grid-cols-12 lg:gap-12 lg:py-12">
          {/* Primary Numbered Links */}
          <nav aria-label="Menu links" className="lg:col-span-7 flex flex-col justify-center">
            <ul ref={navListRef} className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {NAV_LINKS.map((item, idx) => {
                const isActive = pathname === item.href;
                const isDimmed = hoveredIdx !== null && hoveredIdx !== idx;
                const isHighlighted = hoveredIdx === idx;

                return (
                  <li key={item.href} className="overflow-hidden">
                    <div data-menu-line>
                      <TransitionLink
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        onFocus={() => setHoveredIdx(idx)}
                        onBlur={() => setHoveredIdx(null)}
                        className={`group flex min-h-[52px] items-center justify-between gap-4 py-2 sm:py-2.5 transition-all duration-300 ${
                          isDimmed ? "opacity-25" : "opacity-100"
                        }`}
                      >
                        <div className="flex items-baseline gap-4 sm:gap-7">
                          <span
                            className={`font-mono text-xs sm:text-sm tracking-[0.14em] transition-colors duration-300 ${
                              isHighlighted || isActive
                                ? "text-[var(--accent)]"
                                : "text-[var(--text-muted)]"
                            }`}
                          >
                            {item.index}
                          </span>
                          <span
                            className={`font-display text-[clamp(1.7rem,4vw,3.35rem)] font-bold leading-[0.98] tracking-tight transition-transform duration-300 ${
                              isHighlighted ? "translate-x-2 text-[var(--accent)]" : ""
                            } ${isActive && !isHighlighted ? "text-[var(--accent)]" : ""}`}
                          >
                            {item.label}
                          </span>
                        </div>

                        <div className="hidden sm:flex items-center gap-4 text-right">
                          <span className="max-w-[210px] text-xs text-[var(--text-secondary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                            {item.description}
                          </span>
                          <span
                            aria-hidden="true"
                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                              isHighlighted || isActive
                                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] rotate-0"
                                : "border-[var(--border-subtle)] text-[var(--text-secondary)] -rotate-45"
                            }`}
                          >
                            →
                          </span>
                        </div>
                      </TransitionLink>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Side Column: Contact, Profiles, Socials, Visitor Local Time */}
          <div
            ref={sideColRef}
            className="lg:col-span-5 flex flex-col justify-between gap-8 lg:border-l lg:border-[var(--border-subtle)] lg:pl-10"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {/* Direct Email */}
              <div data-menu-meta className="space-y-2.5">
                <p className="text-eyebrow">Email</p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex min-h-[44px] items-center font-display text-lg sm:text-xl font-semibold text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                  >
                    {SITE.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--border-subtle)] px-3.5 text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {copiedEmail ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  {SITE.nameLine} · {SITE.timezoneNote}
                </p>
              </div>

              {/* Platforms: Fiverr & Upwork */}
              <div data-menu-meta className="space-y-2.5">
                <p className="text-eyebrow">Find us on</p>
                <div className="flex flex-wrap gap-2.5">
                  {PLATFORM_PROFILES.map((profile) => (
                    <a
                      key={profile.label}
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      <span>{profile.label}</span>
                      <span aria-hidden="true" className="text-xs">↗</span>
                    </a>
                  ))}
                  <a
                    href={SITE.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 text-sm font-medium text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
                  >
                    <span>Book 30-min call</span>
                    <span aria-hidden="true" className="text-xs">↗</span>
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div data-menu-meta className="space-y-2.5">
                <p className="text-eyebrow">Social</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Visitor Local Time + Availability */}
            <div
              data-menu-meta
              className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-5"
            >
              <div>
                <p className="text-eyebrow">Your local time</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-[var(--text-primary)]">
                  {localTime || "--:--:--"}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3.5 py-2 text-xs text-[var(--text-secondary)]">
                <span className="relative flex h-2 w-2">
                  <span className="status-dot-pulse absolute inline-flex h-full w-full rounded-full bg-[var(--accent)]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span>{SITE.availability.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
