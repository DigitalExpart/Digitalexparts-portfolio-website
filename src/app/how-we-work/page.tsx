import type { Metadata } from "next";
import { ENGAGEMENT_MODELS, TEAM_ROLES } from "@/data/home";
import { SITE } from "@/data/site";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: {
    absolute: "Hire a Solo Expert or a Full Team | Digital Experts",
  },
  description:
    "Work directly with one expert or tap into a 25+ specialist remote team (6+ years active) across web, AI automation, 2D/3D animation, editing & AI video.",
};

const PROJECT_STEPS = [
  {
    index: "01",
    title: "Scope call",
    body: "We listen, ask questions and agree what success looks like.",
  },
  {
    index: "02",
    title: "Written proposal",
    body: "You get the scope, timeline and price in writing before any work starts.",
  },
  {
    index: "03",
    title: "Build with check-ins",
    body: "You see progress at agreed milestones, not only at the end.",
  },
  {
    index: "04",
    title: "Review and revisions",
    body: "You share feedback at each milestone and we refine cleanly before moving to final sign-off.",
  },
  {
    index: "05",
    title: "Launch and handover",
    body: "We test on every device, launch, and show you how to manage it.",
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      <section className="container-editorial space-y-8 pb-16 sm:pb-20">
        <p className="text-eyebrow">04 · How We Work · One expert or a full team. Your call.</p>
        <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-h1 max-w-5xl">
          Hire one expert or a full team. You choose.
        </HeadingReveal>
        <FadeUp trigger="enter" delay={0.2} className="max-w-3xl">
          <p className="text-lead text-[var(--text-secondary)]">
            Backed by {SITE.yearsExperience} and {SITE.teamSize}, we scale cleanly from a single
            dedicated specialist to a full cross-functional pod — across web, iOS &amp; Android
            mobile apps, AI automation, 2D/3D animation, illustration, video editing and AI video
            — with replies within {SITE.responseTime}.
          </p>
        </FadeUp>
      </section>

      {/* Two Ways To Work With Us */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 sm:py-20 space-y-10">
        <div className="space-y-2">
          <p className="text-eyebrow">Two Ways To Work With Us</p>
          <h2 className="text-h2">Compare solo focus vs. full team pod</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {(["solo", "team"] as const).map((key) => {
            const m = ENGAGEMENT_MODELS[key];
            return (
              <div
                key={key}
                className="flex flex-col justify-between gap-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-9"
              >
                <div className="space-y-4">
                  <span className="inline-block rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-3.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                    {m.badge}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold">{m.label}</h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {m.summary}
                  </p>
                </div>

                <dl className="space-y-4 border-t border-[var(--border-subtle)] pt-5 text-sm">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Best for
                    </dt>
                    <dd className="mt-1 text-[var(--text-primary)]">{m.typicalScope}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Who you work with
                    </dt>
                    <dd className="mt-1 text-[var(--text-primary)]">
                      {key === "solo"
                        ? `${SITE.owner} directly`
                        : "A project lead plus the designers, developers and specialists your project needs"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Communication
                    </dt>
                    <dd className="mt-1 text-[var(--text-primary)]">
                      {key === "solo"
                        ? "Direct and one-to-one"
                        : "One point of contact who coordinates everyone"}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      Pricing &amp; Speed
                    </dt>
                    <dd className="mt-1 text-[var(--accent)] font-medium">
                      {key === "solo"
                        ? "Fixed quote based on scope · One person focused on your project"
                        : "Fixed quote with a clear breakdown by role · Work happens in parallel across roles"}
                    </dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      {/* Roles We Can Bring In */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 sm:py-20 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-eyebrow">Team Roster</p>
          <h2 className="text-h2">Roles we can bring in</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_ROLES.map((role, i) => (
            <div
              key={role.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 space-y-2.5"
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

      {/* How a Project Runs */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 sm:py-20 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-eyebrow">Step By Step</p>
          <h2 className="text-h2">How a project runs</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {PROJECT_STEPS.map((step) => (
            <div
              key={step.index}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 space-y-3"
            >
              <span className="font-mono text-xs text-[var(--accent)]">{step.index}</span>
              <h3 className="font-display text-lg font-bold">{step.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-editorial pt-4">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-7 sm:p-10">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Not sure whether you need one expert or a team?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Tell us about your project and we will recommend the simplest option that gets it
              done well.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="primary" size="md">
              Tell us about your project →
            </MagneticButton>
            <MagneticButton href={SITE.calendlyUrl} external variant="secondary" size="md">
              Book a 30-minute call ↗
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
