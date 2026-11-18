import type { Metadata } from "next";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { WorkGalleryClient } from "@/components/work/WorkGalleryClient";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore selected Digital Expert projects across websites, no-code platforms, UI/UX design, branding, email marketing, and AI video.",
};

export default function WorkPage() {
  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      <section className="container-editorial space-y-12 sm:space-y-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-4xl">
            <p className="text-eyebrow">02 · Portfolio Archive</p>
            <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-display">
              Selected work that ships results.
            </HeadingReveal>
          </div>

          <FadeUp trigger="enter" delay={0.2} className="max-w-md space-y-3">
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Filter by discipline below. Each build notes whether it ran as a solo sprint with{" "}
              {SITE.owner} or alongside a vetted specialist pod.
            </p>
          </FadeUp>
        </div>

        <WorkGalleryClient />

        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 sm:flex-row sm:items-center sm:p-12">
          <div className="space-y-2 max-w-xl">
            <p className="text-eyebrow">Have a project in mind?</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Let&apos;s scope your next build — solo or with a tailored team.
            </h2>
          </div>
          <MagneticButton href="/contact" variant="primary" size="lg">
            <span>Discuss your project</span>
            <span aria-hidden="true">→</span>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
