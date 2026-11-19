"use client";

import React, { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SITE } from "@/data/site";

export const CONTACT_SERVICES = [
  "Website design and development",
  "Mobile app design and development",
  "Wix, Squarespace, WordPress or Webflow build",
  "UI/UX design",
  "Graphic design and branding",
  "Email marketing",
  "AI video (short movies, UGC, ads & YouTube)",
  "2D/3D animation, illustration & video editing",
  "AI automation and workflows",
  "Something else",
] as const;

export const CONTACT_BUDGETS = [
  "Under $500",
  "$500 to $2K",
  "$2K to $5K",
  "$5K+",
  "Not sure yet",
] as const;

interface FormValues {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  website: string; // honeypot
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  service: CONTACT_SERVICES[0],
  budget: CONTACT_BUDGETS[1],
  message: "",
  website: "",
};

function FloatingUnderline({ active, hasError }: { active: boolean; hasError?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-300 ease-[var(--ease-expo)] ${
        hasError ? "bg-[var(--status-error)] scale-x-100" : "bg-[var(--accent)]"
      } ${active ? "scale-x-100" : hasError ? "scale-x-100" : "scale-x-0"}`}
    />
  );
}

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const matchedService =
    defaultService &&
    CONTACT_SERVICES.find(
      (s) => s.toLowerCase() === defaultService.trim().toLowerCase()
    );

  const [values, setValues] = useState<FormValues>({
    ...INITIAL_VALUES,
    service: matchedService || INITIAL_VALUES.service,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");

  const checkPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (status !== "success" || !checkPathRef.current) return;
    ensureGsapRegistered();
    const path = checkPathRef.current;
    const length = path.getTotalLength();
    gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.65, ease: "power3.out", delay: 0.1 }
    );
  }, [status]);

  const validateField = (field: keyof FormValues, val: string): string | undefined => {
    if (field === "name" && val.trim().length < 2) {
      return "Please enter your name";
    }
    if (field === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
      if (!ok) return "Please enter a valid email";
    }
    if (field === "message" && val.trim().length < 20) {
      return `Please tell us a little more, at least 20 characters (${val.trim().length}/20)`;
    }
    return undefined;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const nextErr = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: nextErr }));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setFocusedField(null);
    const err = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError("");

    const nextErrors: FormErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      message: validateField("message", values.message),
    };

    const hasError = Object.values(nextErrors).some(Boolean);
    if (hasError) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body?.error ||
            `Could not send enquiry right now. Please email ${SITE.email} directly.`
        );
      }

      setStatus("success");
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : `Could not send right now. Please email ${SITE.email}.`
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-6 rounded-3xl border border-[var(--accent)]/40 bg-[var(--bg-elevated)] p-8 sm:p-12"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent-soft)]">
          <svg viewBox="0 0 36 36" className="h-8 w-8" fill="none" aria-hidden="true">
            <path
              ref={checkPathRef}
              d="M8 18.5L15 25.5L28.5 11.5"
              stroke="#B6FF4A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Thanks, we have your message.
          </h3>
          <p className="max-w-lg text-sm sm:text-base text-[var(--text-secondary)]">
            We will reply within {SITE.responseTime}. Need to add more context right away? Email{" "}
            {SITE.email}.
          </p>
        </div>

        <MagneticButton
          variant="secondary"
          size="md"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </MagneticButton>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-7 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/75 p-6 sm:p-10"
    >
      {/* Honeypot anti-spam field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      {/* Your name & Your email */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <div className="relative pt-4">
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onFocus={() => setFocusedField("name")}
            onBlur={() => handleBlur("name")}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className="peer w-full border-b border-[var(--border-strong)] bg-transparent py-3 text-base text-[var(--text-primary)] outline-none placeholder-transparent"
            placeholder="Your name"
          />
          <label
            htmlFor="contact-name"
            className={`pointer-events-none absolute left-0 transition-all duration-200 ${
              focusedField === "name" || values.name
                ? "top-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]"
                : "top-7 text-sm text-[var(--text-secondary)]"
            }`}
          >
            Your name *
          </label>
          <FloatingUnderline active={focusedField === "name"} hasError={Boolean(errors.name)} />
          {errors.name ? (
            <p id="contact-name-error" role="alert" className="mt-2 text-xs text-[var(--status-error)]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="relative pt-4">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onFocus={() => setFocusedField("email")}
            onBlur={() => handleBlur("email")}
            onChange={(e) => handleChange("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className="peer w-full border-b border-[var(--border-strong)] bg-transparent py-3 text-base text-[var(--text-primary)] outline-none placeholder-transparent"
            placeholder="Your email"
          />
          <label
            htmlFor="contact-email"
            className={`pointer-events-none absolute left-0 transition-all duration-200 ${
              focusedField === "email" || values.email
                ? "top-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]"
                : "top-7 text-sm text-[var(--text-secondary)]"
            }`}
          >
            Your email *
          </label>
          <FloatingUnderline active={focusedField === "email"} hasError={Boolean(errors.email)} />
          {errors.email ? (
            <p id="contact-email-error" role="alert" className="mt-2 text-xs text-[var(--status-error)]">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      {/* What do you need? & Budget */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <div className="relative pt-4">
          <label
            htmlFor="contact-service"
            className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]"
          >
            What do you need?
          </label>
          <select
            id="contact-service"
            name="service"
            value={values.service}
            onFocus={() => setFocusedField("service")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => handleChange("service", e.target.value)}
            className="mt-1 w-full min-h-[46px] border-b border-[var(--border-strong)] bg-[var(--bg-elevated)] py-2.5 text-sm sm:text-base text-[var(--text-primary)] outline-none"
          >
            {CONTACT_SERVICES.map((svc) => (
              <option key={svc} value={svc} className="bg-[#0B0D14] text-white">
                {svc}
              </option>
            ))}
          </select>
          <FloatingUnderline active={focusedField === "service"} />
        </div>

        <div className="relative pt-4">
          <label
            htmlFor="contact-budget"
            className="block font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]"
          >
            Budget
          </label>
          <select
            id="contact-budget"
            name="budget"
            value={values.budget}
            onFocus={() => setFocusedField("budget")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => handleChange("budget", e.target.value)}
            className="mt-1 w-full min-h-[46px] border-b border-[var(--border-strong)] bg-[var(--bg-elevated)] py-2.5 text-sm sm:text-base text-[var(--text-primary)] outline-none"
          >
            {CONTACT_BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-[#0B0D14] text-white">
                {b}
              </option>
            ))}
          </select>
          <FloatingUnderline active={focusedField === "budget"} />
        </div>
      </div>

      {/* Tell us about your project */}
      <div className="relative pt-5">
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          value={values.message}
          onFocus={() => setFocusedField("message")}
          onBlur={() => handleBlur("message")}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
          className="peer w-full resize-y border-b border-[var(--border-strong)] bg-transparent py-3 text-base text-[var(--text-primary)] outline-none placeholder-transparent"
          placeholder="Tell us about your project"
        />
        <label
          htmlFor="contact-message"
          className={`pointer-events-none absolute left-0 transition-all duration-200 ${
            focusedField === "message" || values.message
              ? "top-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--accent)]"
              : "top-7 text-sm text-[var(--text-secondary)]"
          }`}
        >
          Tell us about your project (at least 20 characters) *
        </label>
        <FloatingUnderline active={focusedField === "message"} hasError={Boolean(errors.message)} />
        <div className="mt-2 flex items-center justify-between gap-2">
          {errors.message ? (
            <p id="contact-message-error" role="alert" className="text-xs text-[var(--status-error)]">
              {errors.message}
            </p>
          ) : (
            <p id="contact-message-hint" className="text-xs text-[var(--text-muted)]">
              Share your goals, platform preference, deadline, or whether you want one expert or a full team.
            </p>
          )}
          <span className="font-mono text-[11px] tabular-nums text-[var(--text-muted)]">
            {values.message.trim().length} chars
          </span>
        </div>
      </div>

      {status === "error" && serverError ? (
        <div
          role="alert"
          className="rounded-xl border border-[var(--status-error)]/40 bg-[var(--status-error)]/10 px-4 py-3 text-sm text-[var(--status-error)]"
        >
          {serverError}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <MagneticButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "submitting"}
        >
          <span>{status === "submitting" ? "Sending enquiry..." : "Send enquiry"}</span>
          <span aria-hidden="true">→</span>
        </MagneticButton>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[var(--text-secondary)]">
          <a
            href={SITE.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
          >
            <span>Book a 30-minute call</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </form>
  );
}
