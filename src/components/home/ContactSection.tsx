"use client";

import React from "react";
import Image from "next/image";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/shared/ContactForm";
import { PLATFORM_PROFILES, SITE } from "@/data/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden section-pad hairline-t bg-[radial-gradient(ellipse_75%_65%_at_18%_25%,rgba(182,255,74,0.08),rgba(11,16,28,0.75)_55%,#05060A_100%)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-6 h-[340px] w-[340px] sm:h-[460px] sm:w-[460px] opacity-[0.05]"
      >
        <Image
          src="/brand/logo-mark-dark.svg"
          alt=""
          width={460}
          height={460}
          unoptimized
          className="h-full w-full -rotate-12"
        />
      </div>
      <div className="container-editorial relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <p className="text-eyebrow">10 · Start Your Project</p>
            <HeadingReveal as="h2" id="contact-heading" className="text-h1">
              Let&apos;s build something that brings you clients.
            </HeadingReveal>
            <FadeUp>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Tell us about your project and we will reply within {SITE.responseTime}. New
                website enquiries go through this form or a booked call — or message us on your
                preferred marketplace if you found us there.
              </p>
            </FadeUp>
          </div>

          <FadeUp className="space-y-6 border-t border-[var(--border-subtle)] pt-6">
            <div className="space-y-1.5">
              <p className="text-eyebrow">Prefer email?</p>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-[44px] items-center font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
              >
                {SITE.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 text-xs font-mono uppercase tracking-[0.12em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <span>Book a 30-minute call</span>
                <span aria-hidden="true">↗</span>
              </a>
              {PLATFORM_PROFILES.map((p) => (
                <a
                  key={p.label}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-4 text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  <span>{p.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </FadeUp>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
