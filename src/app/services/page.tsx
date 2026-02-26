"use client";

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/Container";
import { Button } from "@/components/Button";
import { AnimatedBlobs } from "@/components/AnimatedBlobs";
import { CTABand } from "@/components/CTABand";
import { siteConfig, getWhatsAppLink } from "@/data/site";
import { services } from "@/data/services";

export default function ServicesPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden bg-navy-950 py-20 sm:py-28">
                <AnimatedBlobs />
                <Container className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <span className="mb-4 inline-block rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-sm font-medium text-accent-cyan">
                            What We Do
                        </span>
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Services Designed to Increase{" "}
                            <span className="gradient-text">Leads, Sales, and Efficiency</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300">
                            Our {siteConfig.seoCopyName} deliver end-to-end digital solutions
                            across three core disciplines — each one focused on measurable growth.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Service detail sections */}
            {services.map((service, i) => (
                <section
                    key={service.id}
                    id={service.id}
                    className={`py-20 sm:py-28 ${i % 2 === 0 ? "bg-navy-900/30" : "bg-navy-950"}`}
                >
                    <Container>
                        <div className="grid items-start gap-12 lg:grid-cols-2">
                            {/* Left: Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="mb-4 text-5xl">{service.icon}</div>
                                <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                                    {service.title}
                                </h2>
                                <p className="mt-4 text-lg leading-relaxed text-gray-300">
                                    {service.description}
                                </p>
                                <p className="mt-3 text-sm text-accent-cyan">
                                    ⏱ Typical timeline: {service.timeline}
                                </p>
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Button
                                        href={getWhatsAppLink(
                                            `Hi, I'm interested in your ${service.title} services.`
                                        )}
                                        external
                                        className="bg-gradient-to-r! from-green-500! to-emerald-600!"
                                    >
                                        💬 Discuss This Service
                                    </Button>
                                    <Button href="/work" variant="secondary">
                                        See Related Work
                                    </Button>
                                </div>
                            </motion.div>

                            {/* Right: Deliverables & Features */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-6"
                            >
                                <div className="glass-card rounded-2xl p-6">
                                    <h3 className="mb-4 font-heading text-lg font-semibold text-white">
                                        What You Get
                                    </h3>
                                    <ul className="space-y-3">
                                        {service.deliverables.map((d) => (
                                            <li
                                                key={d}
                                                className="flex items-start gap-3 text-sm text-gray-300"
                                            >
                                                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="glass-card rounded-2xl p-6">
                                    <h3 className="mb-4 font-heading text-lg font-semibold text-white">
                                        Key Features
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((f) => (
                                            <span
                                                key={f}
                                                className="rounded-full border border-accent-blue/20 bg-accent-blue/5 px-3 py-1 text-xs text-accent-cyan"
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </Container>
                </section>
            ))}

            {/* Pricing note */}
            <section className="bg-navy-950 py-16">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-card mx-auto max-w-2xl rounded-2xl p-8 text-center"
                    >
                        <h2 className="font-heading text-2xl font-bold text-white">
                            💡 How Pricing Works
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-gray-400">
                            We don&apos;t believe in one-size-fits-all pricing. Every project is scoped
                            individually based on your goals, complexity, and timeline. After a
                            free consultation, we&apos;ll provide a transparent, fixed-price quote — no
                            hidden fees, no surprises. Most projects start from $500.
                        </p>
                        <div className="mt-6">
                            <Button
                                href={getWhatsAppLink(
                                    "Hi, I'd like to discuss pricing for a project."
                                )}
                                external
                                className="bg-gradient-to-r! from-green-500! to-emerald-600!"
                            >
                                💬 Get a Free Quote
                            </Button>
                        </div>
                    </motion.div>
                </Container>
            </section>

            <CTABand />
        </>
    );
}
