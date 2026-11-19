import type { Metadata } from "next";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { ContactForm } from "@/components/shared/ContactForm";
import { PLATFORM_PROFILES, SITE } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Digital Experts | Start Your Web or Design Project",
  },
  description:
    "Tell us about your website, design, email or AI video project. Send an enquiry or book a 30-minute call and we will get back to you quickly.",
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
            <p className="text-eyebrow">07 · Contact · Tell us what you need</p>
            <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-h1">
              Tell us about your project
            </HeadingReveal>
            <FadeUp trigger="enter" delay={0.2}>
              <p className="text-lead text-[var(--text-secondary)]">
                The more detail you share, the better your quote. Not ready to write it all
                down? Book a call instead.
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
              <p className="text-eyebrow">Prefer to talk?</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Book a 30-minute scope call directly — no pressure, clear quote after.
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
              <p className="text-eyebrow">Ordering on Fiverr or Upwork? Find us there</p>
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
                Based in {SITE.location} and working with clients in every time zone.
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
