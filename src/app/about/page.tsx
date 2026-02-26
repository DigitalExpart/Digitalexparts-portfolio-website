"use client";

import { motion } from "framer-motion";
import { Container, SectionHeading } from "@/components/Container";
import { AnimatedBlobs } from "@/components/AnimatedBlobs";
import { TeamCard } from "@/components/TeamCard";
import { CTABand } from "@/components/CTABand";
import { siteConfig } from "@/data/site";
import { team } from "@/data/team";

const values = [
    {
        icon: "🎯",
        title: "Results-Driven",
        desc: "Every decision we make is guided by measurable outcomes. We don't just build — we build to convert.",
    },
    {
        icon: "🤝",
        title: "Transparent & Collaborative",
        desc: "No black boxes. We keep you in the loop with regular updates, clear timelines, and honest communication.",
    },
    {
        icon: "⚡",
        title: "Agile & Efficient",
        desc: "Small team, big impact. We move fast, iterate quickly, and deliver quality without the overhead of a large agency.",
    },
];

export default function AboutPage() {
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
                            About Us
                        </span>
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            A Small Team of{" "}
                            <span className="gradient-text">Digital Experts</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300">
                            {siteConfig.brandName} is a focused digital agency built by specialists,
                            not generalists. We combine deep expertise in web development, email
                            marketing, and AI automation to deliver solutions that actually move
                            the needle for your business.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Agency Positioning */}
            <section className="bg-navy-900/30 py-20 sm:py-28">
                <Container>
                    <div className="mx-auto max-w-3xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                                Why Choose {siteConfig.brandName}?
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-gray-300">
                                We&apos;re not a 100-person agency with layers of account managers.
                                We&apos;re a lean team of {siteConfig.seoCopyName} who work directly
                                with you. That means faster turnaround, better communication, and
                                solutions that are custom-built — not template-driven.
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-gray-300">
                                Our clients choose us because we focus on outcomes, not outputs.
                                Every website we build, every email we send, and every workflow we
                                automate is designed to drive measurable business growth.
                            </p>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Values */}
            <section className="bg-navy-950 py-20 sm:py-28">
                <Container>
                    <SectionHeading
                        badge="Our Values"
                        title="What Drives Us"
                    />
                    <div className="grid gap-6 sm:grid-cols-3">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="glass-card rounded-2xl p-8 text-center"
                            >
                                <div className="mb-4 text-4xl">{v.icon}</div>
                                <h3 className="font-heading text-xl font-bold text-white">
                                    {v.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-400">
                                    {v.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            <CTABand
                title="Want to Work with Us?"
                subtitle="We're always looking for exciting projects. Let's chat!"
            />

            {/* Team */}
            <section className="bg-navy-900/30 py-20 sm:py-28">
                <Container>
                    <SectionHeading
                        badge="The Team"
                        title={`Meet Our ${siteConfig.seoCopyName}`}
                        subtitle="Each member brings deep expertise in their domain to deliver exceptional results."
                    />
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {team.map((member, i) => (
                            <TeamCard key={member.id} member={member} index={i} />
                        ))}
                    </div>
                </Container>
            </section>

            <CTABand />
        </>
    );
}
