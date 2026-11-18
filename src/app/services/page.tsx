import type { Metadata } from "next";
import Image from "next/image";
import { SERVICES } from "@/data/services";
import { TOOLS_MARQUEE } from "@/data/home";
import { SITE } from "@/data/site";
import { HeadingReveal, FadeUp } from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website design & development, no-code platforms (Wix, Squarespace, WordPress, Webflow), UI/UX design, branding, email marketing, and AI video production.",
};

const SERVICE_CONTACT_QUERY_MAP: Record<string, string> = {
  "web-dev": "Website Design and Development",
  nocode: "No-Code Platform Build",
  "ui-ux": "UI/UX Design",
  branding: "Graphic Design and Branding",
  email: "Email Marketing",
  "ai-video": "AI Video",
};

export default function ServicesPage() {
  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      {/* Hero */}
      <section className="container-editorial space-y-10 pb-16 sm:pb-20">
        <div className="space-y-5 max-w-4xl">
          <p className="text-eyebrow">03 · Capabilities &amp; Stack</p>
          <HeadingReveal as="h1" trigger="enter" delay={0.08} className="text-display">
            Six disciplines. Delivered solo or by pod.
          </HeadingReveal>
          <FadeUp trigger="enter" delay={0.2}>
            <p className="text-lead text-[var(--text-secondary)] max-w-2xl">
              Whether you need one senior specialist to launch fast or a coordinated remote crew
              across web, brand, email, and AI video, everything runs through one clear lead:{" "}
              {SITE.owner}.
            </p>
          </FadeUp>
        </div>

        {/* Quick Jump Pills */}
        <FadeUp trigger="enter" delay={0.28} className="flex flex-wrap gap-2.5">
          {SERVICES.map((svc) => (
            <a
              key={svc.id}
              href={`#${svc.id}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 text-xs font-mono uppercase tracking-[0.1em] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span className="text-[var(--accent)]">{svc.index}</span>
              <span>{svc.title}</span>
            </a>
          ))}
        </FadeUp>
      </section>

      {/* Deep-Dive Disciplines */}
      <section className="container-editorial space-y-12 border-t border-[var(--border-subtle)] pt-14 sm:pt-20">
        {SERVICES.map((svc, idx) => {
          const prefill = encodeURIComponent(
            SERVICE_CONTACT_QUERY_MAP[svc.id] || "Something Else"
          );

          return (
            <article
              key={svc.id}
              id={svc.id}
              className="scroll-mt-24 grid grid-cols-1 gap-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/65 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-[var(--accent)]">
                      {svc.index}
                    </span>
                    <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                      {svc.shortTag}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
                    {svc.title}
                  </h2>

                  <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                    {svc.description}
                  </p>
                </div>

                <div className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
                  <p className="text-eyebrow">What&apos;s included</p>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {svc.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2.5 text-sm text-[var(--text-primary)]"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                        />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <MagneticButton
                    href={`/contact?service=${prefill}`}
                    variant={idx % 2 === 0 ? "primary" : "secondary"}
                    size="md"
                  >
                    <span>Start a {svc.title.split(" ")[0]} project</span>
                    <span aria-hidden="true">→</span>
                  </MagneticButton>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
                  <Image
                    src={svc.previewImage}
                    alt={svc.previewAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)]/70 px-4 py-3 text-xs font-mono text-[var(--text-secondary)]">
                  <span>{svc.accentLabel}</span>
                  <span className="text-[var(--accent)]">Solo / Team</span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Platforms Matrix */}
      <section className="container-editorial mt-16 sm:mt-24 border-t border-[var(--border-subtle)] pt-14 space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-eyebrow">Platforms &amp; Tools</p>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold">
              Built in the right tool for your team.
            </h2>
          </div>
          <MagneticButton href="/work" variant="secondary" size="sm">
            See shipped examples →
          </MagneticButton>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {TOOLS_MARQUEE.map((tool) => (
            <div
              key={tool.name}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4"
            >
              <p className="font-display text-base font-bold text-[var(--text-primary)]">
                {tool.name}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {tool.category}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
