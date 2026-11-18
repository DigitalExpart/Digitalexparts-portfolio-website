"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

type CursorMode = "default" | "link" | "view" | "drag" | "play" | "hidden";

export function CustomCursor() {
  const { isDesktopFinePointer, prefersReducedMotion, mounted } = useMediaCapabilities();
  const active = mounted && isDesktopFinePointer && !prefersReducedMotion;
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", active);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const targetPos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let rafId = 0;
    let isVisible = false;

    const onPointerMove = (e: PointerEvent) => {
      targetPos.x = e.clientX;
      targetPos.y = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dotPos.x = e.clientX;
        dotPos.y = e.clientY;
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        setVisible(true);
      }
    };

    const resolveModeFromTarget = (target: EventTarget | null): CursorMode => {
      if (!(target instanceof Element)) return "default";
      const explicit = target.closest("[data-cursor]");
      if (explicit) {
        const val = explicit.getAttribute("data-cursor");
        if (val === "view" || val === "drag" || val === "play" || val === "hidden" || val === "link") {
          return val;
        }
      }
      if (target.closest("input, textarea, select")) {
        return "hidden";
      }
      if (target.closest("a, button, [role='button'], summary")) {
        return "link";
      }
      return "default";
    };

    const onPointerOver = (e: PointerEvent) => {
      setMode(resolveModeFromTarget(e.target));
    };

    const onPointerLeave = () => {
      isVisible = false;
      setVisible(false);
    };

    const render = () => {
      // Smooth lagging lerp for ring, crisp fast follow for dot
      dotPos.x += (targetPos.x - dotPos.x) * 0.55;
      dotPos.y += (targetPos.y - dotPos.y) * 0.55;

      ringPos.x += (targetPos.x - ringPos.x) * 0.16;
      ringPos.y += (targetPos.y - ringPos.y) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);
    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [active]);

  if (!active) return null;

  const isLabeled = mode === "view" || mode === "drag" || mode === "play";
  const labelText =
    mode === "view" ? "View" : mode === "drag" ? "Drag" : mode === "play" ? "Play" : "";

  const ringSizeClass = isLabeled
    ? "h-20 w-20 bg-white text-black border-white"
    : mode === "link"
      ? "h-14 w-14 bg-white/15 border-white"
      : mode === "hidden"
        ? "h-0 w-0 opacity-0 border-transparent"
        : "h-9 w-9 bg-transparent border-white/80";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[var(--z-cursor)] mix-blend-difference transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2 w-2 rounded-full bg-white transition-transform duration-150 will-change-transform"
        style={{
          opacity: isLabeled || mode === "hidden" ? 0 : 1,
        }}
      />

      {/* Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color,opacity] duration-200 ease-out will-change-transform ${ringSizeClass}`}
      >
        {isLabeled ? (
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-black">
            {labelText}
          </span>
        ) : null}
      </div>
    </div>
  );
}
