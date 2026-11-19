import type { Metadata } from "next";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { FaqSection } from "@/components/home/FaqSection";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: "Web Design, Development & AI Video FAQ | Digital Experts",
  },
  description:
    "Straight answers about Digital Experts, Isaac Clara and Jumat Bello, Wix/Squarespace/WordPress/Webflow vs React builds, pricing, timelines and AI video.",
};

export default function FaqPage() {
  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      <section className="container-editorial space-y-6 pb-12 sm:pb-16">
        <p className="text-eyebrow">06 · FAQ · Clear answers before you start</p>
        <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-h1 max-w-4xl">
          Questions before you start?
        </HeadingReveal>
        <FadeUp trigger="enter" delay={0.2} className="max-w-2xl">
          <p className="text-lead text-[var(--text-secondary)]">
            Everything you might want to know about our studio names, platforms, timelines,
            revisions and working solo or with our team.
          </p>
        </FadeUp>
      </section>

      <div className="border-t border-[var(--border-subtle)] pt-8">
        <FaqSection showHeader={false} />
      </div>

      <section className="container-editorial pt-14">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 sm:p-10">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Still have a question?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Send a message to {SITE.email} or book a quick 30-minute scope call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="primary" size="md">
              Start your project →
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
