"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionRoot } from "@/components/motion/MotionRootContext";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";
import { SITE } from "@/data/site";

interface TransitionContextValue {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { setMenuOpen, setIsTransitioning, bumpEnterCycle } = useMotionRoot();
  const { scrollTo, stop, start } = useSmoothScroll();
  const { prefersReducedMotion } = useMediaCapabilities();

  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pendingPathRef = useRef<string | null>(null);
  const safetyTimerRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  const wipeOut = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      isAnimatingRef.current = false;
      setIsTransitioning(false);
      start();
      bumpEnterCycle();
      return;
    }

    if (safetyTimerRef.current) {
      window.clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
        onStart: () => {
          bumpEnterCycle();
        },
        onComplete: () => {
          gsap.set(overlay, { yPercent: 100, pointerEvents: "none" });
          if (labelRef.current) {
            gsap.set(labelRef.current, { opacity: 0, y: 12 });
          }
          isAnimatingRef.current = false;
          setIsTransitioning(false);
          start();
        },
      });
    });
  }, [bumpEnterCycle, setIsTransitioning, start]);

  // Trigger wipe-out when Next.js finishes switching pathname
  useEffect(() => {
    if (!pendingPathRef.current) return;
    if (pathname === pendingPathRef.current) {
      pendingPathRef.current = null;
      scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      wipeOut();
    }
  }, [pathname, scrollTo, wipeOut]);

  useEffect(() => {
    ensureGsapRegistered();
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { yPercent: 100, pointerEvents: "none" });
    }
    return () => {
      if (safetyTimerRef.current) {
        window.clearTimeout(safetyTimerRef.current);
      }
    };
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setMenuOpen(false);

      // Handle hash links on the current page without full wipe
      if (href.startsWith("#")) {
        scrollTo(href);
        return;
      }

      const [targetPath, targetHash] = href.split("#");
      const normalizedTarget = targetPath || "/";

      if (normalizedTarget === pathname) {
        if (targetHash) {
          scrollTo(`#${targetHash}`);
        } else {
          scrollTo(0);
        }
        return;
      }

      if (prefersReducedMotion || !overlayRef.current) {
        router.push(href);
        window.scrollTo(0, 0);
        scrollTo(0, { immediate: true });
        bumpEnterCycle();
        return;
      }

      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      setIsTransitioning(true);
      stop();

      const overlay = overlayRef.current;
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { yPercent: 100, pointerEvents: "auto" });

      const tl = gsap.timeline({
        onComplete: () => {
          pendingPathRef.current = normalizedTarget;
          router.push(href);
          scrollTo(0, { immediate: true });
          window.scrollTo(0, 0);

          // Failsafe in case pathname match doesn't fire within 1.2s
          safetyTimerRef.current = window.setTimeout(() => {
            if (pendingPathRef.current) {
              pendingPathRef.current = null;
              wipeOut();
            }
          }, 1200);
        },
      });

      tl.to(overlay, {
        yPercent: 0,
        duration: 0.42,
        ease: "power4.inOut",
      });

      if (labelRef.current) {
        tl.fromTo(
          labelRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
          "-=0.18"
        );
      }
    },
    [
      pathname,
      prefersReducedMotion,
      router,
      scrollTo,
      setIsTransitioning,
      setMenuOpen,
      stop,
      bumpEnterCycle,
      wipeOut,
    ]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      {/* Full-Screen Route Wipe Overlay (M14) */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[var(--z-transition)] flex items-center justify-center bg-[#0B0D14] border-t-2 border-[var(--accent)] pointer-events-none select-none will-change-transform"
        style={{ transform: "translateY(100%)" }}
      >
        <div
          ref={labelRef}
          className="flex items-center gap-3 opacity-0"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="font-display text-lg sm:text-2xl font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
            {SITE.brandUpper}
          </span>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

export interface TransitionLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      rest.target === "_blank"
    ) {
      return;
    }

    const hrefStr = typeof href === "string" ? href : href.pathname || "/";
    if (
      hrefStr.startsWith("http") ||
      hrefStr.startsWith("mailto:") ||
      hrefStr.startsWith("tel:") ||
      hrefStr.startsWith("[")
    ) {
      return;
    }

    e.preventDefault();
    navigate(hrefStr);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
