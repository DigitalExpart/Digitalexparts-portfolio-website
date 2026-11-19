import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found" };
  }
  return {
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES.filter((s) =>
    service.relatedSlugs.includes(s.slug)
  );
  const matchingProjects = PROJECTS.filter(
    (p) => p.serviceSlug === service.slug
  ).slice(0, 2);
  const fallbackProjects =
    matchingProjects.length >= 2
      ? matchingProjects
      : [
          ...matchingProjects,
          ...PROJECTS.filter((p) => p.serviceSlug !== service.slug),
        ].slice(0, 2);

  const prefill = encodeURIComponent(service.contactOption);

  return (
    <article className="pt-[calc(var(--header-height)+3rem)] pb-20 sm:pb-28">
      <header className="container-editorial space-y-8 pb-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TransitionLink
            href="/services"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-secondary)] hover:text-[var(--accent)]"
          >
            <span aria-hidden="true">←</span>
            <span>All services</span>
          </TransitionLink>
          <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
            {service.pageTagline}
          </span>
        </div>

        <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-h1 max-w-5xl">
          {service.pageH1}
        </HeadingReveal>

        <FadeUp trigger="enter" delay={0.2} className="max-w-3xl">
          <p className="text-lead text-[var(--text-secondary)]">{service.intro}</p>
        </FadeUp>

        <div className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          <Image
            src={service.previewImage}
            alt={service.previewAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
        </div>
      </header>

      {/* Included & Best For */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 space-y-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-4">
            <p className="text-eyebrow">What&apos;s Included</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Scope &amp; deliverables
            </h2>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                Best for
              </p>
              <p className="text-sm sm:text-base text-[var(--text-primary)]">
                {service.bestFor}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {service.capabilities.map((cap, idx) => (
                <li
                  key={cap}
                  className="flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 p-5 text-sm sm:text-base text-[var(--text-primary)]"
                >
                  <span className="font-mono text-xs text-[var(--accent)] mt-0.5">
                    0{idx + 1}
                  </span>
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow">Related Work</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
              Examples in this discipline
            </h2>
          </div>
          <TransitionLink
            href="/work"
            className="inline-flex min-h-[44px] items-center text-xs font-mono uppercase tracking-[0.12em] text-[var(--accent)] underline underline-offset-4"
          >
            See all work →
          </TransitionLink>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fallbackProjects.map((proj) => (
            <TransitionLink
              key={proj.slug}
              href={`/work/${proj.slug}`}
              data-cursor="view"
              className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 space-y-4 hover:border-[var(--accent)] transition-colors"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border-subtle)]">
                <Image
                  src={proj.posterImage}
                  alt={`${proj.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold group-hover:text-[var(--accent)]">
                  {proj.title}
                </h3>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {proj.category}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{proj.tagline}</p>
            </TransitionLink>
          ))}
        </div>
      </section>

      {/* Two Most Related Services & FAQ Link */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-eyebrow">Related Services</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
              Often paired with
            </h2>
          </div>
          <MagneticButton href="/faq" variant="ghost" size="sm">
            Read the full FAQ →
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {relatedServices.map((rel) => (
            <TransitionLink
              key={rel.slug}
              href={`/services/${rel.slug}`}
              className="group flex flex-col justify-between gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 hover:border-[var(--accent)] transition-colors"
            >
              <div className="space-y-2">
                <span className="font-mono text-xs text-[var(--accent)]">{rel.index}</span>
                <h3 className="font-display text-2xl font-bold group-hover:text-[var(--accent)]">
                  {rel.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{rel.description}</p>
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--text-primary)]">
                Explore service →
              </span>
            </TransitionLink>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-editorial pt-4">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-7 sm:p-10">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Ready to build with Digital Experts?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Get a clear fixed quote and timeline for {service.title.toLowerCase()}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={`/contact?service=${prefill}`} variant="primary" size="md">
              Tell us what you need →
            </MagneticButton>
            <MagneticButton href={SITE.calendlyUrl} external variant="secondary" size="md">
              Book a 30-minute call ↗
            </MagneticButton>
          </div>
        </div>
      </section>
    </article>
  );
}
