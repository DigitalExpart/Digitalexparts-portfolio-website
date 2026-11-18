"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface MotionRootContextValue {
  isPreloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isTransitioning: boolean;
  setIsTransitioning: (active: boolean) => void;
  enterCycle: number;
  bumpEnterCycle: () => void;
}

const MotionRootContext = createContext<MotionRootContextValue | null>(null);

export function MotionRootProvider({ children }: { children: React.ReactNode }) {
  const [isPreloaderDone, setPreloaderDone] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [enterCycle, setEnterCycle] = useState(0);

  const bumpEnterCycle = useCallback(() => {
    setEnterCycle((c) => c + 1);
  }, []);

  return (
    <MotionRootContext.Provider
      value={{
        isPreloaderDone,
        setPreloaderDone,
        isMenuOpen,
        setMenuOpen,
        isTransitioning,
        setIsTransitioning,
        enterCycle,
        bumpEnterCycle,
      }}
    >
      {children}
    </MotionRootContext.Provider>
  );
}

export function useMotionRoot(): MotionRootContextValue {
  const ctx = useContext(MotionRootContext);
  if (!ctx) {
    throw new Error("useMotionRoot must be used within MotionRootProvider");
  }
  return ctx;
}
