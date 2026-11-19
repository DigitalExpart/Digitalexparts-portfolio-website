import type { Metadata } from "next";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { WorkGalleryClient } from "@/components/work/WorkGalleryClient";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: {
    absolute: "Portfolio | Websites, Mobile Apps, Branding & AI Video | Digital Experts",
  },
  description:
    "Browse website, iOS & Android mobile app, UI/UX, branding, AI automation, email and AI video projects by Digital Experts.",
};

export default function WorkPage() {
  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      <section className="container-editorial space-y-12 sm:space-y-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-4xl">
            <p className="text-eyebrow">02 · Portfolio · Websites, Mobile Apps &amp; Creative</p>
            <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-h1">
              Websites, mobile apps and campaigns we have built
            </HeadingReveal>
          </div>

          <FadeUp trigger="enter" delay={0.2} className="max-w-md space-y-3">
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              A selection of projects across custom websites, iOS &amp; Android mobile apps, UI/UX,
              branding, AI automation, email marketing and AI video. (Illustrative studio concepts
              are labeled clearly; NDA client work details are shared on request.)
            </p>
          </FadeUp>
        </div>

        <WorkGalleryClient />

        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 sm:flex-row sm:items-center sm:p-12">
          <div className="space-y-2 max-w-xl">
            <p className="text-eyebrow">Want results like these?</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Start your project with Digital Experts — solo or with our full team.
            </h2>
          </div>
          <MagneticButton href="/contact" variant="primary" size="lg">
            <span>Start your project</span>
            <span aria-hidden="true">→</span>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
