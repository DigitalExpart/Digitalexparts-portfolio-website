"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import Lenis from "lenis";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface SmoothScrollContextValue {
  getLenis: () => Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { immediate?: boolean; offset?: number; duration?: number }
  ) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  getLenis: () => null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const { isDesktopFinePointer, prefersReducedMotion, mounted } = useMediaCapabilities();

  useEffect(() => {
    if (!mounted) return;
    ensureGsapRegistered();
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (prefersReducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: isDesktopFinePointer ? 0.1 : 0.12,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.085,
      touchInertiaExponent: 1.55,
      touchMultiplier: 1,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshId);
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isDesktopFinePointer, prefersReducedMotion, mounted]);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: { immediate?: boolean; offset?: number; duration?: number }
    ) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          immediate: options?.immediate ?? false,
          offset: options?.offset ?? 0,
          duration: options?.duration,
        });
        return;
      }

      if (typeof target === "number") {
        window.scrollTo({
          top: target,
          behavior: options?.immediate ? "auto" : "smooth",
        });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: options?.immediate ? "auto" : "smooth" });
      }
    },
    []
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const start = useCallback(() => {
    document.documentElement.style.overflow = "";
    lenisRef.current?.start();
  }, []);

  const getLenis = useCallback(() => lenisRef.current, []);

  return (
    <SmoothScrollContext.Provider
      value={{ getLenis, scrollTo, stop, start }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
