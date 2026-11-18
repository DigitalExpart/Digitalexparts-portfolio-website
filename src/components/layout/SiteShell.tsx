"use client";

import React from "react";
import { MotionRootProvider } from "@/components/motion/MotionRootContext";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { PageTransitionProvider } from "@/components/motion/PageTransitionProvider";
import { Preloader } from "@/components/motion/Preloader";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionRootProvider>
      <SmoothScrollProvider>
        <PageTransitionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2.5 focus:text-xs focus:font-semibold focus:text-[var(--accent-ink)]"
          >
            Skip to main content
          </a>
          <Preloader />
          <ScrollProgressBar />
          <SiteHeader />
          <CustomCursor />
          <div className="relative">
            <div className="relative z-[var(--z-content)] min-h-[100dvh] bg-[var(--bg-primary)] shadow-[0_24px_60px_rgba(0,0,0,0.9)]">
              <main id="main-content" tabIndex={-1} className="outline-none">
                {children}
              </main>
            </div>
            <SiteFooter />
          </div>
        </PageTransitionProvider>
      </SmoothScrollProvider>
    </MotionRootProvider>
  );
}
