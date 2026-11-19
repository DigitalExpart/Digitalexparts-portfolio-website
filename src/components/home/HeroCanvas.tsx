"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMediaCapabilities } from "@/hooks/useMediaCapabilities";

interface HeroCanvasProps {
  onHoldingChange?: (holding: boolean) => void;
}

interface SpringLine {
  line: THREE.Line;
  geometry: THREE.BufferGeometry;
  material: THREE.LineBasicMaterial;
  basePoints: Float32Array;
  offsets: Float32Array;
  velocities: Float32Array;
  segmentCount: number;
  baseColor: THREE.Color;
  accentColor: THREE.Color;
}

interface RippleWave {
  x: number;
  y: number;
  radius: number;
  strength: number;
  maxRadius: number;
}

export default function HeroCanvas({ onHoldingChange }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { prefersReducedMotion } = useMediaCapabilities();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.innerWidth >= 768,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const isMobile =
      window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    const maxDpr = isMobile ? 1.25 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 11;

    // Track world-space viewport bounds at z = 0
    const viewBounds = { halfW: 8, halfH: 5 };
    const updateSize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      const vFov = (camera.fov * Math.PI) / 180;
      const visibleH = 2 * Math.tan(vFov / 2) * camera.position.z;
      const visibleW = visibleH * camera.aspect;
      viewBounds.halfW = visibleW / 2;
      viewBounds.halfH = visibleH / 2;
    };
    updateSize();

    // 1. Original Kinetic 3D Geometric Centerpiece (Wireframe Icosahedron + Orbital Ring)
    const centerpieceGroup = new THREE.Group();
    const coreGeo = new THREE.IcosahedronGeometry(isMobile ? 1.45 : 1.85, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0c0f18,
      transparent: true,
      opacity: 0.72,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);

    const wireGeo = new THREE.EdgesGeometry(coreGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x3b4254,
      transparent: true,
      opacity: 0.52,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);

    const ringGeo = new THREE.TorusGeometry(isMobile ? 2.25 : 2.85, 0.012, 8, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xb6ff4a,
      transparent: true,
      opacity: 0.24,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.36;
    ringMesh.rotation.y = -Math.PI * 0.18;

    centerpieceGroup.add(coreMesh, wireMesh, ringMesh);
    centerpieceGroup.position.set(isMobile ? 0 : 1.15, 0, -1.2);
    scene.add(centerpieceGroup);

    // 2. Sweeping Spring-Physics Lines
    const lineCount = isMobile ? 4 : 6;
    const segmentCount = isMobile ? 30 : 48;
    const springLines: SpringLine[] = [];

    const buildLineBase = (idx: number, total: number, halfW: number, halfH: number) => {
      const arr = new Float32Array((segmentCount + 1) * 3);
      const tNorm = idx / Math.max(1, total - 1);
      const yOffset = (tNorm - 0.5) * halfH * 1.45;
      const tilt = (tNorm - 0.5) * 2.2 + 0.55;

      for (let i = 0; i <= segmentCount; i++) {
        const u = i / segmentCount;
        const x = (u - 0.5) * halfW * 2.35;
        const wave = Math.sin(u * Math.PI * 1.6 + idx * 0.9) * 0.85;
        const y = yOffset + (u - 0.5) * tilt * 2.4 + wave;
        const z = -0.4 + Math.cos(u * Math.PI + idx) * 0.35;
        arr[i * 3] = x;
        arr[i * 3 + 1] = y;
        arr[i * 3 + 2] = z;
      }
      return arr;
    };

    for (let l = 0; l < lineCount; l++) {
      const basePoints = buildLineBase(l, lineCount, viewBounds.halfW, viewBounds.halfH);
      const positions = new Float32Array(basePoints);
      const offsets = new Float32Array((segmentCount + 1) * 2);
      const velocities = new Float32Array((segmentCount + 1) * 2);

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const baseColor = new THREE.Color(l % 2 === 0 ? 0x3f4659 : 0x2d3342);
      const accentColor = new THREE.Color(0xb6ff4a);
      const material = new THREE.LineBasicMaterial({
        color: baseColor.clone(),
        transparent: true,
        opacity: l % 2 === 0 ? 0.55 : 0.36,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);
      springLines.push({
        line,
        geometry,
        material,
        basePoints,
        offsets,
        velocities,
        segmentCount,
        baseColor,
        accentColor,
      });
    }

    // 3. Ambient Interactive Particle Field
    const particleCount = isMobile ? 110 : 250;
    const pBase = new Float32Array(particleCount * 3);
    const pPos = new Float32Array(particleCount * 3);
    const pVel = new Float32Array(particleCount * 2);
    const pSeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * viewBounds.halfW * 2.2;
      const y = (Math.random() - 0.5) * viewBounds.halfH * 2.2;
      const z = (Math.random() - 0.5) * 4.5 - 1.5;
      pBase[i * 3] = x;
      pBase[i * 3 + 1] = y;
      pBase[i * 3 + 2] = z;
      pPos[i * 3] = x;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = z;
      pSeeds[i] = Math.random() * Math.PI * 2;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe6eaf2,
      size: isMobile ? 0.045 : 0.042,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Visual Expanding Ripple Rings
    const rippleRingGeo = new THREE.RingGeometry(0.97, 1.0, 64);
    const rippleRingMat = new THREE.MeshBasicMaterial({
      color: 0xb6ff4a,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const rippleRingMesh = new THREE.Mesh(rippleRingGeo, rippleRingMat);
    rippleRingMesh.position.z = 0.2;
    scene.add(rippleRingMesh);

    // Pointer + Hold-to-Ripple State
    const pointer = {
      x: 0,
      y: 0,
      worldX: 999,
      worldY: 999,
      active: false,
      holding: false,
      holdPower: 0,
    };
    const activeRipples: RippleWave[] = [];
    let holdPulseTimer = 0;

    const updatePointerCoords = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = -(((clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
      pointer.x = nx;
      pointer.y = ny;
      pointer.worldX = nx * viewBounds.halfW;
      pointer.worldY = ny * viewBounds.halfH;
      pointer.active = true;
    };

    const spawnRipple = (wx: number, wy: number, strength: number) => {
      activeRipples.push({
        x: wx,
        y: wy,
        radius: 0.25,
        strength,
        maxRadius: Math.max(viewBounds.halfW, viewBounds.halfH) * 1.85,
      });
      if (activeRipples.length > 4) {
        activeRipples.shift();
      }
      rippleRingMesh.position.x = wx;
      rippleRingMesh.position.y = wy;
      rippleRingMesh.scale.setScalar(0.35);
      rippleRingMat.opacity = 0.52;
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerCoords(e.clientX, e.clientY);
    };

    const onPointerDown = (e: PointerEvent) => {
      // Do not trigger hold state if clicking directly on interactive CTA links/buttons
      if (e.target instanceof Element && e.target.closest("a, button")) {
        return;
      }
      updatePointerCoords(e.clientX, e.clientY);
      pointer.holding = true;
      holdPulseTimer = 0;
      onHoldingChange?.(true);
      spawnRipple(pointer.worldX, pointer.worldY, 1.35);
    };

    const endHold = () => {
      if (!pointer.holding) return;
      pointer.holding = false;
      onHoldingChange?.(false);
      // Release burst ripple
      spawnRipple(pointer.worldX, pointer.worldY, 1.85 + pointer.holdPower * 1.1);
      pointer.holdPower = 0;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      endHold();
    };

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", endHold, { passive: true });
    window.addEventListener("pointercancel", endHold, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const onResize = () => {
      updateSize();
      for (let l = 0; l < springLines.length; l++) {
        springLines[l].basePoints = buildLineBase(
          l,
          lineCount,
          viewBounds.halfW,
          viewBounds.halfH
        );
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Offscreen & Tab Visibility Pause
    let isVisible = true;
    let isInViewport = true;
    let rafId = 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry?.isIntersecting ?? true;
      },
      { threshold: 0.02 }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let lastTime = performance.now();
    let elapsed = 0;

    const animate = (now: number) => {
      rafId = window.requestAnimationFrame(animate);
      if (!isVisible || !isInViewport) {
        lastTime = now;
        return;
      }

      const dt = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;
      elapsed += dt;

      const scrollRatio = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));

      if (pointer.holding) {
        pointer.holdPower = Math.min(1.5, pointer.holdPower + dt * 1.4);
        holdPulseTimer += dt;
        if (holdPulseTimer > 0.38) {
          holdPulseTimer = 0;
          spawnRipple(pointer.worldX, pointer.worldY, 1.1 + pointer.holdPower * 0.5);
        }
      }

      // Advance active shockwaves
      for (let r = activeRipples.length - 1; r >= 0; r--) {
        const rip = activeRipples[r];
        rip.radius += dt * 11.5;
        rip.strength *= Math.pow(0.45, dt);
        if (rip.radius > rip.maxRadius || rip.strength < 0.04) {
          activeRipples.splice(r, 1);
        }
      }

      if (rippleRingMat.opacity > 0.005) {
        rippleRingMesh.scale.addScalar(dt * 10.5);
        rippleRingMat.opacity *= Math.pow(0.18, dt);
      } else {
        rippleRingMat.opacity = 0;
      }

      // Centerpiece parallax, scroll depth rotation & hold glow (responsive on desktop and mobile)
      const targetRotY =
        (pointer.active ? pointer.x * 0.45 : Math.sin(elapsed * 0.35) * 0.2) +
        scrollRatio * 0.85;
      const targetRotX =
        (pointer.active ? -pointer.y * 0.32 : Math.cos(elapsed * 0.28) * 0.14) +
        scrollRatio * 0.42;
      centerpieceGroup.rotation.y += (targetRotY + elapsed * 0.14 - centerpieceGroup.rotation.y) * 0.06;
      centerpieceGroup.rotation.x += (targetRotX - centerpieceGroup.rotation.x) * 0.06;
      centerpieceGroup.position.y += (scrollRatio * 1.35 - centerpieceGroup.position.y) * 0.08;
      ringMesh.rotation.z += dt * (pointer.holding ? 1.15 : 0.25 + scrollRatio * 0.4);

      const pulseBoost = pointer.holding ? 1 + pointer.holdPower * 0.12 : 1;
      centerpieceGroup.scale.lerp(new THREE.Vector3(pulseBoost, pulseBoost, pulseBoost), 0.1);
      ringMat.opacity = pointer.holding ? 0.62 : 0.24;
      wireMat.color.lerpColors(
        new THREE.Color(0x3b4254),
        new THREE.Color(0xb6ff4a),
        pointer.holding ? 0.55 : 0.08
      );

      // Update Spring Lines
      const springK = 52;
      const damping = 5.4;
      const repelRadius = isMobile ? 2.4 : 3.2;

      for (let l = 0; l < springLines.length; l++) {
        const sl = springLines[l];
        const posAttr = sl.geometry.getAttribute("position") as THREE.BufferAttribute;
        const posArr = posAttr.array as Float32Array;
        let maxActivity = 0;

        for (let i = 0; i <= sl.segmentCount; i++) {
          const i2 = i * 2;
          const i3 = i * 3;

          const bx = sl.basePoints[i3];
          const by = sl.basePoints[i3 + 1] + Math.sin(elapsed * 0.9 + i * 0.22 + l) * 0.09;
          const bz = sl.basePoints[i3 + 2];

          const px = bx + sl.offsets[i2];
          const py = by + sl.offsets[i2 + 1];

          let fx = -sl.offsets[i2] * springK;
          let fy = -sl.offsets[i2 + 1] * springK;

          // Pointer repulsion
          if (pointer.active) {
            const dx = px - pointer.worldX;
            const dy = py - pointer.worldY;
            const dist = Math.hypot(dx, dy);
            if (dist < repelRadius && dist > 0.001) {
              const force = ((1 - dist / repelRadius) ** 2) * (pointer.holding ? 110 : 62);
              fx += (dx / dist) * force;
              fy += (dy / dist) * force;
              maxActivity = Math.max(maxActivity, 1 - dist / repelRadius);
            }
          }

          // Ripple wave impulses
          for (let r = 0; r < activeRipples.length; r++) {
            const rip = activeRipples[r];
            const dx = px - rip.x;
            const dy = py - rip.y;
            const dist = Math.hypot(dx, dy);
            const band = Math.abs(dist - rip.radius);
            if (band < 1.2 && dist > 0.001) {
              const waveForce = (1 - band / 1.2) * rip.strength * 75;
              fx += (dx / dist) * waveForce;
              fy += (dy / dist) * waveForce;
              maxActivity = Math.max(maxActivity, 0.9);
            }
          }

          sl.velocities[i2] = (sl.velocities[i2] + fx * dt) * Math.exp(-damping * dt);
          sl.velocities[i2 + 1] =
            (sl.velocities[i2 + 1] + fy * dt) * Math.exp(-damping * dt);

          sl.offsets[i2] += sl.velocities[i2] * dt;
          sl.offsets[i2 + 1] += sl.velocities[i2 + 1] * dt;

          posArr[i3] = bx + sl.offsets[i2];
          posArr[i3 + 1] = by + sl.offsets[i2 + 1];
          posArr[i3 + 2] = bz;
        }

        posAttr.needsUpdate = true;
        sl.material.color.lerpColors(sl.baseColor, sl.accentColor, Math.min(1, maxActivity * 0.85));
      }

      // Update Particles
      const pAttr = particleGeo.getAttribute("position") as THREE.BufferAttribute;
      const pArr = pAttr.array as Float32Array;
      const pRadius = isMobile ? 2.1 : 2.8;

      for (let i = 0; i < particleCount; i++) {
        const i2 = i * 2;
        const i3 = i * 3;
        const seed = pSeeds[i];

        const bx = pBase[i3] + Math.sin(elapsed * 0.32 + seed) * 0.18;
        const by = pBase[i3 + 1] + Math.cos(elapsed * 0.27 + seed) * 0.18;

        let dxOff = pArr[i3] - bx;
        let dyOff = pArr[i3 + 1] - by;

        let fx = -dxOff * 18;
        let fy = -dyOff * 18;

        if (pointer.active) {
          const dx = pArr[i3] - pointer.worldX;
          const dy = pArr[i3 + 1] - pointer.worldY;
          const dist = Math.hypot(dx, dy);
          if (dist < pRadius && dist > 0.001) {
            const f = (1 - dist / pRadius) * (pointer.holding ? 38 : 20);
            fx += (dx / dist) * f;
            fy += (dy / dist) * f;
          }
        }

        for (let r = 0; r < activeRipples.length; r++) {
          const rip = activeRipples[r];
          const dx = pArr[i3] - rip.x;
          const dy = pArr[i3 + 1] - rip.y;
          const dist = Math.hypot(dx, dy);
          const band = Math.abs(dist - rip.radius);
          if (band < 1.1 && dist > 0.001) {
            const wf = (1 - band / 1.1) * rip.strength * 32;
            fx += (dx / dist) * wf;
            fy += (dy / dist) * wf;
          }
        }

        pVel[i2] = (pVel[i2] + fx * dt) * Math.exp(-4.8 * dt);
        pVel[i2 + 1] = (pVel[i2 + 1] + fy * dt) * Math.exp(-4.8 * dt);

        dxOff += pVel[i2] * dt;
        dyOff += pVel[i2 + 1] * dt;

        pArr[i3] = bx + dxOff;
        pArr[i3 + 1] = by + dyOff;
      }
      pAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointerup", endHold);
      window.removeEventListener("pointercancel", endHold);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerleave", onPointerLeave);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      rippleRingGeo.dispose();
      rippleRingMat.dispose();
      for (const sl of springLines) {
        sl.geometry.dispose();
        sl.material.dispose();
      }
      renderer.dispose();
    };
  }, [prefersReducedMotion, onHoldingChange]);

  // Static editorial geometric fallback when reduced motion is enabled
  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 62% 48%, rgba(182, 255, 74, 0.12), transparent 45%), linear-gradient(125deg, transparent 42%, rgba(244,245,247,0.06) 42.2%, transparent 42.5%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 touch-pan-y select-none overflow-hidden"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
