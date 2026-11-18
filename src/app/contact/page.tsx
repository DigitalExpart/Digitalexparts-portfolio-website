import type { Metadata } from "next";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/shared/ContactForm";
import { PLATFORM_PROFILES, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a project inquiry, book a 30-minute discovery call, or reach Digital Expert via email, Fiverr, or Upwork.",
};

interface ContactPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { service } = await searchParams;

  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      <section className="container-editorial grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <p className="text-eyebrow">05 · Start a Project</p>
            <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-h1">
              Let&apos;s scope your next launch.
            </HeadingReveal>
            <FadeUp trigger="enter" delay={0.2}>
              <p className="text-lead text-[var(--text-secondary)]">
                Share what you&apos;re building, your ideal timeline, and budget range. You&apos;ll
                hear back directly from {SITE.owner} within 24 hours.
              </p>
            </FadeUp>
          </div>

          <FadeUp trigger="enter" delay={0.28} className="space-y-6 border-t border-[var(--border-subtle)] pt-8">
            <div className="space-y-1.5">
              <p className="text-eyebrow">Prefer email?</p>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-[44px] items-center font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
              >
                {SITE.email}
              </a>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 space-y-3">
              <p className="text-eyebrow">Quick intro call</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Want to walk through goals live before scoping? Grab a 30-minute slot.
              </p>
              <a
                href={SITE.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-4 text-xs font-mono uppercase tracking-[0.12em] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                <span>Book a 30-minute call</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="space-y-2.5">
              <p className="text-eyebrow">Or hire via platforms</p>
              <div className="flex flex-wrap gap-3">
                {PLATFORM_PROFILES.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <span>{p.label}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                {SITE.timezoneNote} · Based in {SITE.location}
              </p>
            </div>
          </FadeUp>
        </div>

        <div className="lg:col-span-7">
          <ContactForm defaultService={service} />
        </div>
      </section>
    </div>
  );
}
