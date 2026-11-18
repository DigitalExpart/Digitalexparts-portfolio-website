"use client";

import React, { useEffect, useRef } from "react";

interface ProjectHoverShaderProps {
  imageSrc: string;
  active: boolean;
  pointerUv: { x: number; y: number };
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_hover;
  uniform vec2 u_resolution;
  uniform vec2 u_texSize;
  varying vec2 v_uv;

  vec2 coverUv(vec2 uv, vec2 res, vec2 tex) {
    float rs = res.x / max(1.0, res.y);
    float ts = tex.x / max(1.0, tex.y);
    vec2 newUv = uv;
    if (rs > ts) {
      float scale = ts / rs;
      newUv.y = (uv.y - 0.5) * scale + 0.5;
    } else {
      float scale = rs / ts;
      newUv.x = (uv.x - 0.5) * scale + 0.5;
    }
    return newUv;
  }

  void main() {
    vec2 uv = vec2(v_uv.x, 1.0 - v_uv.y);
    vec2 baseUv = coverUv(uv, u_resolution, u_texSize);

    // Aspect-corrected radial distance from pointer for ripple displacement
    vec2 diff = uv - u_mouse;
    diff.x *= u_resolution.x / max(1.0, u_resolution.y);
    float dist = length(diff);

    float wave = sin(dist * 26.0 - u_time * 5.2) * exp(-dist * 4.2);
    float strength = 0.015 * u_hover;
    vec2 offset = normalize(diff + 0.0001) * wave * strength;

    // Subtle RGB refraction split on ripple crest
    float r = texture2D(u_texture, baseUv + offset * 1.15).r;
    float g = texture2D(u_texture, baseUv + offset).g;
    float b = texture2D(u_texture, baseUv + offset * 0.85).b;

    // Gentle kinetic scan glint
    float scan = smoothstep(0.98, 1.0, sin((uv.y - u_time * 0.35) * 18.0)) * 0.08 * u_hover;

    gl_FragColor = vec4(vec3(r, g, b) + vec3(0.71, 1.0, 0.29) * scan, 1.0);
  }
`;

export function ProjectHoverShader({
  imageSrc,
  active,
  pointerUv,
}: ProjectHoverShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef(pointerUv);
  const activeRef = useRef(active);

  useEffect(() => {
    pointerRef.current = pointerUv;
  }, [pointerUv]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uHover = gl.getUniformLocation(program, "u_hover");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTexSize = gl.getUniformLocation(program, "u_texSize");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let texReady = false;
    let texW = 16;
    let texH = 9;
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      if (disposed) return;
      texW = img.naturalWidth || 16;
      texH = img.naturalHeight || 9;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      texReady = true;
    };

    const syncSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };
    syncSize();

    let disposed = false;
    let hoverVal = 0;
    let smoothX = 0.5;
    let smoothY = 0.5;
    let rafId = 0;
    const start = performance.now();

    const render = (now: number) => {
      if (disposed) return;
      rafId = window.requestAnimationFrame(render);
      if (!texReady) return;

      syncSize();
      const targetHover = activeRef.current ? 1 : 0;
      hoverVal += (targetHover - hoverVal) * 0.1;
      smoothX += (pointerRef.current.x - smoothX) * 0.14;
      smoothY += (pointerRef.current.y - smoothY) * 0.14;

      gl.uniform2f(uMouse, smoothX, smoothY);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uHover, hoverVal);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uTexSize, texW, texH);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [imageSrc]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
