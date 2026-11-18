"use client";

import React, { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  strength?: number;
  proximityPx?: number;
  cursorMode?: "link" | "view" | "drag" | "play";
  ariaLabel?: string;
}

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type ActionButtonProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export type MagneticButtonProps = LinkButtonProps | ActionButtonProps;

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-[44px] px-5 py-2.5 text-xs tracking-[0.08em]",
  md: "min-h-[48px] px-6 py-3 text-sm tracking-[0.04em]",
  lg: "min-h-[54px] px-8 py-4 text-sm sm:text-base tracking-[0.02em]",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] border border-[var(--accent)] font-semibold",
  secondary:
    "bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[var(--text-primary)] font-medium",
  ghost:
    "bg-white/[0.04] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] font-medium",
};

export function MagneticButton(props: MagneticButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className = "",
    strength = 0.34,
    proximityPx = 80,
    cursorMode = "link",
    ariaLabel,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const el = wrapperRef.current;
    const inner = innerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        let isPulled = false;
        let rafId = 0;
        let pendingX = 0;
        let pendingY = 0;

        const onPointerMove = (e: PointerEvent) => {
          pendingX = e.clientX;
          pendingY = e.clientY;
          if (rafId) return;

          rafId = window.requestAnimationFrame(() => {
            rafId = 0;
            const rect = el.getBoundingClientRect();
            // Distance from pointer to button bounding box edge
            const dxEdge = Math.max(rect.left - pendingX, 0, pendingX - rect.right);
            const dyEdge = Math.max(rect.top - pendingY, 0, pendingY - rect.bottom);
            const edgeDist = Math.hypot(dxEdge, dyEdge);

            if (edgeDist <= proximityPx) {
              isPulled = true;
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const relX = (pendingX - centerX) * strength;
              const relY = (pendingY - centerY) * strength;

              const maxPull = 22;
              const clampedX = Math.max(-maxPull, Math.min(maxPull, relX));
              const clampedY = Math.max(-maxPull, Math.min(maxPull, relY));

              gsap.to(el, {
                x: clampedX,
                y: clampedY,
                duration: 0.38,
                ease: "power3.out",
                overwrite: "auto",
              });
              if (inner) {
                gsap.to(inner, {
                  x: clampedX * 0.35,
                  y: clampedY * 0.35,
                  duration: 0.38,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              }
            } else if (isPulled) {
              isPulled = false;
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.75,
                ease: "elastic.out(1, 0.4)",
                overwrite: "auto",
              });
              if (inner) {
                gsap.to(inner, {
                  x: 0,
                  y: 0,
                  duration: 0.75,
                  ease: "elastic.out(1, 0.4)",
                  overwrite: "auto",
                });
              }
            }
          });
        };

        const onWindowBlur = () => {
          if (!isPulled) return;
          isPulled = false;
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
          if (inner) {
            gsap.to(inner, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)", overwrite: "auto" });
          }
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("blur", onWindowBlur);

        return () => {
          if (rafId) window.cancelAnimationFrame(rafId);
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("blur", onWindowBlur);
          gsap.killTweensOf([el, inner].filter(Boolean));
          gsap.set(el, { clearProps: "x,y" });
          if (inner) gsap.set(inner, { clearProps: "x,y" });
        };
      }
    );

    return () => mm.revert();
  }, [proximityPx, strength]);

  const sharedClassName = [
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full whitespace-nowrap select-none transition-colors duration-300",
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {/* Fill-wipe hover surface for primary CTA (and subtle lift wipe for secondary) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 translate-y-[102%] rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0 ${
          variant === "primary"
            ? "bg-[var(--text-primary)]"
            : "bg-[var(--accent)]"
        }`}
      />
      <span
        ref={innerRef}
        className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-300 ${
          variant === "primary"
            ? "group-hover:text-[var(--bg-primary)] group-focus-visible:text-[var(--bg-primary)]"
            : "group-hover:text-[var(--accent-ink)] group-focus-visible:text-[var(--accent-ink)]"
        }`}
      >
        {children}
      </span>
    </>
  );

  if (typeof props.href === "string") {
    const { href, external, onClick } = props;
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("[");

    return (
      <div ref={wrapperRef} className="inline-block will-change-transform">
        {isExternal ? (
          <a
            href={href}
            target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "noopener noreferrer"}
            aria-label={ariaLabel}
            data-cursor={cursorMode}
            onClick={onClick}
            className={sharedClassName}
          >
            {content}
          </a>
        ) : (
          <TransitionLink
            href={href}
            aria-label={ariaLabel}
            data-cursor={cursorMode}
            onClick={onClick}
            className={sharedClassName}
          >
            {content}
          </TransitionLink>
        )}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="inline-block will-change-transform">
      <button
        type={props.type ?? "button"}
        disabled={props.disabled}
        onClick={props.onClick}
        aria-label={ariaLabel}
        data-cursor={cursorMode}
        className={`${sharedClassName} disabled:pointer-events-none disabled:opacity-50`}
      >
        {content}
      </button>
    </div>
  );
}
