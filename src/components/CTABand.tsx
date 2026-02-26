"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { Container } from "./Container";
import { getWhatsAppLink, siteConfig } from "@/data/site";

interface CTABandProps {
    title?: string;
    subtitle?: string;
}

export function CTABand({
    title = "Ready to Grow Your Business?",
    subtitle = `Get in touch with our ${siteConfig.seoCopyName} team and let's discuss your next project.`,
}: CTABandProps) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-accent-blue to-blue-700 py-16 sm:py-20">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 25% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(34,211,238,0.3) 0%, transparent 50%)",
                    }}
                />
            </div>

            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative text-center"
                >
                    <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                        {title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
                        {subtitle}
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            href={getWhatsAppLink()}
                            external
                            variant="primary"
                            size="lg"
                            className="bg-white! text-accent-blue! shadow-xl hover:bg-gray-100!"
                        >
                            💬 Chat on WhatsApp
                        </Button>
                        <Button href="/contact" variant="secondary" size="lg" className="border-white/50! text-white!">
                            View All Contact Options
                        </Button>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
