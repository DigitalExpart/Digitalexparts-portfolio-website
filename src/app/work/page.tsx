"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { AnimatedBlobs } from "@/components/AnimatedBlobs";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTABand } from "@/components/CTABand";
import { siteConfig } from "@/data/site";
import { caseStudies } from "@/data/caseStudies";

export default function WorkPage() {
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
                            Our Portfolio
                        </span>
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Real Projects,{" "}
                            <span className="gradient-text">Real Results</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300">
                            Explore how our {siteConfig.seoCopyName} have helped businesses across
                            industries achieve measurable growth through web development, email
                            marketing, and AI automation.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Case Studies Grid */}
            <section className="bg-navy-900/30 py-20 sm:py-28">
                <Container>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {caseStudies.map((study, i) => (
                            <CaseStudyCard key={study.id} study={study} index={i} />
                        ))}
                    </div>
                </Container>
            </section>

            <CTABand
                title="Want Results Like These?"
                subtitle="Tell us about your project and we'll show you what's possible."
            />
        </>
    );
}
