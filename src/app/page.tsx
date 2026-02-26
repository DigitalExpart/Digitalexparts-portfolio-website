"use client";

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/Container";
import { Button } from "@/components/Button";
import { AnimatedBlobs } from "@/components/AnimatedBlobs";
import { ServiceCard } from "@/components/ServiceCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { TeamCard } from "@/components/TeamCard";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTABand } from "@/components/CTABand";
import { HeroSlider } from "@/components/HeroSlider";
import { LogoMarquee } from "@/components/LogoMarquee";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { team } from "@/data/team";
import { faqs } from "@/data/faqs";

const metrics = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Happy Clients" },
  { value: "3x", label: "Avg. ROI Increase" },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    desc: "We learn about your business, goals, and challenges through a focused consultation.",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "Our experts craft a tailored plan with clear milestones and deliverables.",
  },
  {
    step: "03",
    title: "Build & Launch",
    desc: "We develop, test, and deploy your solution with regular updates along the way.",
  },
  {
    step: "04",
    title: "Optimize & Grow",
    desc: "We monitor performance, iterate, and scale to drive continuous results.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO SLIDER ============ */}
      <HeroSlider />

      {/* ============ SOCIAL PROOF STRIP ============ */}
      <LogoMarquee />

      {/* ============ SERVICES PREVIEW ============ */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <AnimatedBlobs />
        <Container className="relative z-10">
          <SectionHeading
            badge="Our Services"
            title="Solutions That Drive Real Results"
            subtitle={`Our ${siteConfig.seoCopyName} team delivers measurable outcomes across three core disciplines.`}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/services" variant="secondary">
              Explore All Services →
            </Button>
          </div>
        </Container>
      </section>

      {/* ============ CTA BAND ============ */}
      <CTABand
        title="Have a Project in Mind?"
        subtitle="Let's discuss how we can help you grow. Our team responds within hours."
      />

      {/* ============ METRICS ============ */}
      <section className="bg-navy-950 py-20 sm:py-28">
        <Container>
          <SectionHeading
            badge="Results"
            title="Numbers That Speak for Themselves"
          />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center sm:p-8"
              >
                <div className="font-heading text-3xl font-bold text-accent-cyan sm:text-4xl">
                  {m.value}
                </div>
                <div className="mt-2 text-sm text-gray-400">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ FEATURED CASE STUDIES ============ */}
      <section className="bg-navy-900/30 py-20 sm:py-28">
        <Container>
          <SectionHeading
            badge="Our Work"
            title="Featured Case Studies"
            subtitle="Real projects, real results. See how we've helped businesses grow."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/work" variant="secondary">
              View All Projects →
            </Button>
          </div>
        </Container>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
        <Container className="relative z-10">
          <SectionHeading
            badge="How We Work"
            title="A Simple 4-Step Process"
            subtitle="From idea to launch, we keep things transparent and efficient."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="mb-3 font-heading text-3xl font-bold text-accent-blue/40">
                  {s.step}
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ CTA BAND ============ */}
      <CTABand />

      {/* ============ TEAM PREVIEW ============ */}
      <section className="bg-navy-950 py-20 sm:py-28">
        <Container>
          <SectionHeading
            badge="Our Team"
            title={`Meet the ${siteConfig.seoCopyName}`}
            subtitle="A small team of specialists obsessed with delivering results."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {team.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-navy-900/30 py-20 sm:py-28">
        <Container>
          <SectionHeading
            badge="FAQ"
            title="Common Questions"
            subtitle="Quick answers to help you make a decision."
          />
          <FAQAccordion faqs={faqs} />
        </Container>
      </section>

      {/* ============ FINAL CTA ============ */}
      <CTABand
        title="Let's Start Building Together"
        subtitle="Send us a message on WhatsApp and get a free consultation within 24 hours."
      />
    </>
  );
}
