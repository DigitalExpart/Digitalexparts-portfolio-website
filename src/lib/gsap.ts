"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

let registered = false;

export function ensureGsapRegistered() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText, Flip };
