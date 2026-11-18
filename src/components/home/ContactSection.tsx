"use client";

import React from "react";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/shared/ContactForm";
import { PLATFORM_PROFILES, SITE } from "@/data/site";

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad hairline-t"
    >
      <div className="container-editorial grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <p className="text-eyebrow">10 · Start a Conversation</p>
            <HeadingReveal as="h2" id="contact-heading" className="text-h1">
              Ready to build something sharp?
            </HeadingReveal>
            <FadeUp>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                Tell me what you&apos;re launching. I&apos;ll reply within 24 hours with a clear
                approach, timeline, and whether a solo sprint or vetted team pod makes the most sense.
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
