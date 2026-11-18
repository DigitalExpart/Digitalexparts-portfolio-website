import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TransitionLink } from "@/components/motion/PageTransitionProvider";
import { CaseStudyParallax } from "@/components/work/CaseStudyParallax";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — ${project.category}`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Digital Expert`,
      description: project.tagline,
      images: [{ url: project.posterImage, width: 1280, height: 720, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const currentIdx = PROJECTS.findIndex((p) => p.slug === slug);
  if (currentIdx === -1) {
    notFound();
  }

  const project = PROJECTS[currentIdx];
  const nextProject = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <article className="pt-[calc(var(--header-height)+3rem)] pb-20 sm:pb-28">
      {/* Case Study Hero */}
      <header className="container-editorial space-y-10 pb-12 sm:pb-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <TransitionLink
            href="/work"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-secondary)] hover:text-[var(--accent)]"
          >
            <span aria-hidden="true">←</span>
            <span>All work</span>
          </TransitionLink>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-primary)]">
              {project.category}
            </span>
            <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--accent-soft)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
              {project.engagementModel}
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              {project.year}
            </span>
          </div>
        </div>

        <div className="space-y-6 max-w-5xl">
          <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-display">
            {project.title}
          </HeadingReveal>
          <FadeUp trigger="enter" delay={0.2}>
            <p className="text-lead text-[var(--text-secondary)] max-w-3xl">
              {project.tagline}
            </p>
          </FadeUp>
        </div>

        {/* Hero Visual */}
        <CaseStudyParallax
          src={project.posterImage}
          alt={`${project.title} flagship hero preview`}
          priority
        />

        {/* Role, Tools, Client & Timeline Strip */}
        <div className="grid grid-cols-1 gap-6 border-y border-[var(--border-subtle)] py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-eyebrow">Client</p>
            <p className="mt-2 font-display text-lg font-semibold">{project.client}</p>
          </div>
          <div>
            <p className="text-eyebrow">Role &amp; Model</p>
            <p className="mt-2 font-display text-lg font-semibold">{project.role}</p>
            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
              {project.engagementModel}
            </p>
          </div>
          <div>
            <p className="text-eyebrow">Timeline</p>
            <p className="mt-2 font-display text-lg font-semibold">{project.timeline}</p>
          </div>
          <div>
            <p className="text-eyebrow">Tools &amp; Stack</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 text-xs text-[var(--text-primary)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Metrics Highlights */}
      <section aria-label="Key project outcomes" className="container-editorial py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-8"
            >
              <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[var(--accent)]">
                {metric.value}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge, Process & Results */}
      <section className="container-editorial space-y-16 py-12 sm:py-16">
        {/* Challenge */}
        <div className="grid grid-cols-1 gap-6 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-eyebrow">01 · The Challenge</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
              What needed fixing
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-base sm:text-xl leading-relaxed text-[var(--text-secondary)]">
              {project.challenge}
            </p>
          </div>
        </div>

        {/* Process */}
        <div className="grid grid-cols-1 gap-6 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-eyebrow">02 · The Process</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
              How it came together
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {project.process.map((step, i) => (
              <div
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/65 p-5 sm:p-6"
              >
                <span className="font-mono text-xs text-[var(--accent)] mt-1">
                  0{i + 1}
                </span>
                <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-6 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-eyebrow">03 · Results</p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
              Measurable impact
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {project.results.map((res) => (
              <div
                key={res}
                className="flex items-start gap-3.5 border-b border-[var(--border-subtle)] pb-4 text-base sm:text-lg text-[var(--text-primary)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span>{res}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-label="Project gallery" className="container-editorial space-y-6 py-8">
        <p className="text-eyebrow">04 · Gallery &amp; Frames</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {project.galleryImages.map((imgUrl, idx) => (
            <CaseStudyParallax
              key={`${imgUrl}-${idx}`}
              src={imgUrl}
              alt={`${project.title} gallery frame ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Next Project Link */}
      <section aria-label="Next case study" className="container-editorial pt-16 sm:pt-20">
        <div className="border-t border-[var(--border-subtle)] pt-12">
          <p className="text-eyebrow mb-6">Next Case Study</p>
          <TransitionLink
            href={`/work/${nextProject.slug}`}
            data-cursor="view"
            className="group grid grid-cols-1 items-center gap-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-10 transition-colors hover:border-[var(--accent)] lg:grid-cols-12"
          >
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                <span>{nextProject.index}</span>
                <span>·</span>
                <span>{nextProject.category}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-2">
                {nextProject.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl">
                {nextProject.tagline}
              </p>
            </div>

            <div className="lg:col-span-5 relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
              <Image
                src={nextProject.posterImage}
                alt={`${nextProject.title} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105"
              />
            </div>
          </TransitionLink>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <MagneticButton href="/work" variant="secondary" size="md">
              ← Back to all work
            </MagneticButton>
            <MagneticButton href="/contact" variant="primary" size="md">
              Start a similar project →
            </MagneticButton>
          </div>
        </div>
      </section>
    </article>
  );
}
