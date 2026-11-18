import type { Metadata } from "next";
import { ENGAGEMENT_MODELS, STATS, TEAM_ROLES } from "@/data/home";
import { PLATFORM_PROFILES, SITE } from "@/data/site";
import {
  HeadingReveal,
  FadeUp,
  WordScrubHighlight,
} from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${SITE.owner} and learn how Digital Expert delivers senior solo sprints and vetted remote team launches worldwide.`,
};

const PRINCIPLES = [
  {
    index: "01",
    title: "Plain language over buzzwords",
    body: "You never get buried in vague agency jargon. Every milestone, tool recommendation, and metric is explained clearly so you can make fast decisions.",
  },
  {
    index: "02",
    title: "Right-sized engagement",
    body: "Some launches only need one senior builder for two weeks; others need design, dev, copy, email, and AI video moving in parallel. You only pay for the horsepower your scope requires.",
  },
  {
    index: "03",
    title: "Performance & handover built in",
    body: "Every site ships responsive from 375px to 1920px, keyboard accessible, SEO-ready, and paired with clean walkthrough videos so your team owns it confidently.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      {/* Hero */}
      <section className="container-editorial space-y-8 pb-16 sm:pb-24">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          <span>04 · About {SITE.brand}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[var(--accent)]">Led by {SITE.owner}</span>
          <span aria-hidden="true">·</span>
          <span>{SITE.location}</span>
        </div>

        <HeadingReveal
          as="h1"
          trigger="enter"
          delay={0.08}
          className="text-display max-w-5xl"
        >
          Senior solo focus, backed by a vetted remote bench.
        </HeadingReveal>

        <FadeUp trigger="enter" delay={0.22} className="max-w-3xl">
          <p className="text-lead text-[var(--text-secondary)]">
            {SITE.brand} was created for founders, small businesses, and agencies tired of
            choosing between unreliable solo generalists and slow, overpriced traditional agencies.
          </p>
        </FadeUp>
      </section>

      {/* Scroll-Highlight Manifesto */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-eyebrow">Studio Philosophy</p>
          </div>
          <div className="lg:col-span-9">
            <WordScrubHighlight
              text={`Hi, I'm ${SITE.owner}. Whether I'm building your flagship site one-on-one or leading a sprint pod of designers, developers, copywriters, email specialists, and AI motion artists — you always talk directly to the person responsible for shipping the work.`}
              className="font-display text-[clamp(1.65rem,3.2vw,2.9rem)] font-semibold leading-[1.2] tracking-[-0.025em]"
            />
          </div>
        </div>
      </section>

      {/* Solo vs Team Deep Comparison */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-16 sm:py-20 space-y-10">
        <div className="space-y-3 max-w-3xl">
          <p className="text-eyebrow">Two Ways To Work Together</p>
          <h2 className="text-h2">Built to scale up or down around your launch.</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {(["solo", "team"] as const).map((key) => {
            const model = ENGAGEMENT_MODELS[key];
            return (
              <div
                key={key}
                className="flex flex-col justify-between gap-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-9"
              >
                <div className="space-y-4">
                  <span className="inline-block rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-3.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                    {model.badge}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">
                    {model.label}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {model.summary}
                  </p>
                </div>

                <ul className="space-y-2.5 border-t border-[var(--border-subtle)] pt-5">
                  {model.howItWorks.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4 text-xs font-mono text-[var(--text-secondary)]">
                  <span>Turnaround: {model.turnaround}</span>
                  <span className="text-[var(--text-primary)]">{model.idealFor}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Vetted Roster */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-16 sm:py-20 space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-eyebrow">The Vetted Bench</p>
            <h2 className="text-h2">Five specialist roles ready on demand.</h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--text-secondary)]">
            Zero random outsourcing — every collaborator is someone {SITE.owner} has shipped live
            client work with repeatedly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_ROLES.map((role, i) => (
            <div
              key={role.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--accent)]">0{i + 1}</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {role.tools}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold">{role.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{role.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Principles & Snapshot Numbers */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-16 sm:py-20 space-y-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.index} className="space-y-3 border-t border-[var(--border-subtle)] pt-5">
              <span className="font-mono text-xs text-[var(--accent)]">{p.index}</span>
              <h3 className="font-display text-xl font-bold">{p.title}</h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:grid-cols-4 sm:p-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl sm:text-4xl font-bold text-[var(--accent)]">
                {String(s.value).padStart(s.padLength, "0")}
                {s.suffix}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Direct CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-7 sm:p-10">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Want to see if we&apos;re a fit?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Reach out via {SITE.email}, book a quick intro call, or hire directly on Fiverr or
              Upwork.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="primary" size="md">
              Start a project →
            </MagneticButton>
            <MagneticButton href={SITE.calendlyUrl} external variant="secondary" size="md">
              Book 30-min call ↗
            </MagneticButton>
            {PLATFORM_PROFILES.map((p) => (
              <MagneticButton
                key={p.label}
                href={p.href}
                external
                variant="ghost"
                size="md"
              >
                {p.label} ↗
              </MagneticButton>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
