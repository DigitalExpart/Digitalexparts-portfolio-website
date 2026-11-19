import type { Metadata } from "next";
import { STATS, TOOLS_MARQUEE } from "@/data/home";
import { PLATFORM_PROFILES, SITE } from "@/data/site";
import {
  HeadingReveal,
  FadeUp,
  WordScrubHighlight,
} from "@/components/motion/TextReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: {
    absolute: "About Digital Experts | Web Design & Development Team",
  },
  description:
    "Meet Digital Experts, a remote team of 25+ specialists led by Jumat Bello (Isaac Clara on Fiverr) with 6+ years across web, AI automation, 2D/3D, editing & AI video.",
};

const BELIEFS = [
  {
    index: "01",
    title: "Clear scope, honest pricing.",
    body: "You know what you get and what it costs before we start.",
  },
  {
    index: "02",
    title: "Fast, plain communication.",
    body: "No jargon, no disappearing.",
  },
  {
    index: "03",
    title: "Built to last.",
    body: "Sites you can edit yourself and that keep loading fast.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-[calc(var(--header-height)+3.5rem)] pb-20 sm:pb-28">
      {/* Hero */}
      <section className="container-editorial space-y-8 pb-16 sm:pb-20">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          <span>05 · About Digital Experts</span>
          <span aria-hidden="true">·</span>
          <span className="text-[var(--accent)]">The people and principles behind Digital Experts</span>
        </div>

        <HeadingReveal
          as="h1"
          trigger="enter"
          delay={0.08}
          className="text-h1 max-w-5xl"
        >
          We are Digital Experts, a remote web design and development studio.
        </HeadingReveal>

        <FadeUp trigger="enter" delay={0.22} className="max-w-3xl">
          <p className="text-lead text-[var(--text-secondary)]">
            Websites, brands, email campaigns and AI video, delivered by one specialist or a
            full team, whichever your project needs.
          </p>
        </FadeUp>
      </section>

      {/* Our Story */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-2">
            <p className="text-eyebrow">Our Story</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Built for founders and small businesses everywhere
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
            <p>
              Digital Experts builds websites, AI automations and creative work for founders and
              growing businesses worldwide. Across {SITE.yearsExperience}, our team of{" "}
              {SITE.teamSize} has completed more than 200 orders for more than 100 unique clients
              on Fiverr (4.7 rating from 57 reviews), alongside 416 hours of direct contracts on
              Upwork.
            </p>
            <p>
              We recommend the platform that fits each client — Wix, Squarespace, WordPress and
              Webflow when you want speed, custom React code when you need unique web architecture,
              and React Native or Flutter for iOS &amp; Android mobile apps — paired with UI/UX,
              branding, custom illustration, 2D/3D animation, video editing, AI automation, email
              marketing and AI video (short movies, AI UGC, commercials, product ads and YouTube).
            </p>
            <p className="text-[var(--text-primary)] font-medium">
              Everything is 100% remote across all time zones — with replies within{" "}
              {SITE.responseTime}.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-eyebrow">Meet the Founder</p>
            <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-elevated)] p-6 text-center">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                [FOUNDER PHOTO]
              </span>
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Add a real photo of {SITE.owner} in public/images/ to build instant trust.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <WordScrubHighlight
              text={`Hi, I'm ${SITE.owner}, founder of Digital Experts. I design and build websites and lead a remote team of ${SITE.teamSize} — designers, developers, AI automation engineers, 2D/3D animators, illustrators, video editors and AI video producers. I have been doing this for ${SITE.yearsExperience}. I handle small projects directly and bring in specialists when a build needs more hands.`}
              className="font-display text-[clamp(1.45rem,2.7vw,2.35rem)] font-semibold leading-[1.25] tracking-[-0.02em]"
            />
          </div>
        </div>
      </section>

      {/* Who is Who: Isaac Clara, Jumat Bello and Digital Experts (#names) */}
      <section
        id="names"
        aria-labelledby="names-heading"
        className="container-editorial scroll-mt-24 border-t border-[var(--border-subtle)] py-14 sm:py-20 space-y-8"
      >
        <div className="space-y-3 max-w-3xl">
          <p className="text-eyebrow">Name Clarity</p>
          <h2 id="names-heading" className="text-h2">
            Who is who: {SITE.fiverrBrand}, {SITE.owner} and {SITE.brand}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            If you found us on Fiverr, Upwork or Google, you may have seen different names. Here
            is the short version, so you always know who you are dealing with.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-7 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
              Studio
            </span>
            <h3 className="font-display text-2xl font-bold">{SITE.brand}</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Digital Experts is the studio. It is the name behind all our work and the name on
              this website (with handles &amp; email under Digital Exparts).
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-7 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
              Founder · Upwork
            </span>
            <h3 className="font-display text-2xl font-bold">{SITE.owner}</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Jumat Bello is the founder. It is the name I use on Upwork and in direct contracts.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-7 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
              Fiverr Brand
            </span>
            <h3 className="font-display text-2xl font-bold">{SITE.fiverrBrand}</h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Isaac Clara is the brand I have built on Fiverr over the years. Isaac is one of
              my names, and my assistant, {SITE.fiverrAssistant}, looks after the Fiverr inbox so
              your messages get answered quickly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent-soft)] p-6">
          <p className="max-w-2xl text-sm sm:text-base text-[var(--text-primary)]">
            Same studio, same team, same standards, whichever name you found first. If you ever
            want to confirm who you are working with, message us from the contact page and we
            will happily verify it.
          </p>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={SITE.fiverrUrl} external variant="primary" size="sm">
              View our Fiverr profile ↗
            </MagneticButton>
            <MagneticButton href={SITE.upworkUrl} external variant="secondary" size="sm">
              View our Upwork profile ↗
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* What we believe + Verified Stats + Platforms */}
      <section className="container-editorial border-t border-[var(--border-subtle)] py-14 sm:py-20 space-y-12">
        <div className="space-y-4">
          <p className="text-eyebrow">What We Believe</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {BELIEFS.map((b) => (
              <div key={b.index} className="space-y-2 border-t border-[var(--border-subtle)] pt-5">
                <span className="font-mono text-xs text-[var(--accent)]">{b.index}</span>
                <h3 className="font-display text-xl font-bold">{b.title}</h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:grid-cols-4 sm:p-8">
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-[var(--accent)]">
              6+ yrs
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              Over 6 years of delivery
            </p>
          </div>
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-[var(--accent)]">
              25+
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              Multi-disciplinary specialists
            </p>
          </div>
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-[var(--accent)]">
              &lt; 1 hr
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              Typical reply within {SITE.responseTime}
            </p>
          </div>
          <div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-[var(--accent)]">
              24/7
            </p>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
              Remote across every time zone
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:grid-cols-4 sm:p-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl sm:text-4xl font-bold text-[var(--accent)]">
                {s.decimals ? s.value.toFixed(s.decimals) : `${s.value}${s.suffix}`}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-eyebrow">Platforms and Tools</p>
          <div className="flex flex-wrap gap-2.5">
            {TOOLS_MARQUEE.map((tool) => (
              <span
                key={tool.name}
                className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2 text-sm text-[var(--text-primary)]"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-7 sm:p-10">
          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Ready to talk about your project?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Message {SITE.email}, book a 30-minute call, or reach us on Fiverr or Upwork.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/contact" variant="primary" size="md">
              Start your project →
            </MagneticButton>
            <MagneticButton href={SITE.calendlyUrl} external variant="secondary" size="md">
              Book a 30-minute call ↗
            </MagneticButton>
            {PLATFORM_PROFILES.map((p) => (
              <MagneticButton key={p.label} href={p.href} external variant="ghost" size="md">
                {p.label} ↗
              </MagneticButton>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
