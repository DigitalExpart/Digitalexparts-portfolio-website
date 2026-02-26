"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { AnimatedBlobs } from "@/components/AnimatedBlobs";
import { siteConfig, getWhatsAppLink } from "@/data/site";

const messageChecklist = [
    "A brief description of your project or idea",
    "Your target audience or industry",
    "Your preferred timeline and budget range",
    "Any examples or references you like",
    "Whether you need web dev, email marketing, AI automation, or a combination",
];

export default function ContactPage() {
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
                            Get In Touch
                        </span>
                        <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Let&apos;s Build Your Website and{" "}
                            <span className="gradient-text">Automate Your Growth</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-300">
                            Ready to take the next step? Reach out through WhatsApp for the
                            fastest response, or find us on Upwork and Fiverr.
                        </p>
                    </motion.div>
                </Container>
            </section>

            {/* Contact cards */}
            <section className="bg-navy-900/30 py-20 sm:py-28">
                <Container>
                    <div className="grid gap-6 md:grid-cols-3">
                        {/* WhatsApp - Primary */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="glass-card col-span-1 rounded-2xl p-8 text-center md:col-span-3 lg:col-span-1"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
                                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <h2 className="font-heading text-2xl font-bold text-white">
                                Chat on WhatsApp
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Fastest way to reach us. We typically reply within 1–2 hours
                                during business hours.
                            </p>
                            <span className="mb-4 mt-3 inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                                ⚡ Fastest Response
                            </span>
                            <div className="mt-4">
                                <Button
                                    href={getWhatsAppLink()}
                                    external
                                    size="lg"
                                    className="w-full bg-gradient-to-r! from-green-500! to-emerald-600!"
                                >
                                    💬 Start WhatsApp Chat
                                </Button>
                            </div>
                        </motion.div>

                        {/* Upwork */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="glass-card rounded-2xl p-8 text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-700">
                                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                                </svg>
                            </div>
                            <h2 className="font-heading text-xl font-bold text-white">
                                Hire on Upwork
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                View our profile, reviews, and hire us for your next project through
                                Upwork&apos;s secure platform.
                            </p>
                            <div className="mt-6">
                                <Button
                                    href={siteConfig.upworkUrl}
                                    external
                                    variant="secondary"
                                    className="w-full"
                                >
                                    View Upwork Profile →
                                </Button>
                            </div>
                        </motion.div>

                        {/* Fiverr */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="glass-card rounded-2xl p-8 text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-lime-600">
                                <span className="text-2xl font-bold text-white">F</span>
                            </div>
                            <h2 className="font-heading text-xl font-bold text-white">
                                Order on Fiverr
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Browse our service packages and place an order directly through
                                Fiverr&apos;s trusted marketplace.
                            </p>
                            <div className="mt-6">
                                <Button
                                    href={siteConfig.fiverrUrl}
                                    external
                                    variant="secondary"
                                    className="w-full"
                                >
                                    View Fiverr Profile →
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Message checklist */}
            <section className="bg-navy-950 py-20 sm:py-28">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-2xl"
                    >
                        <div className="glass-card rounded-2xl p-8">
                            <h2 className="font-heading text-2xl font-bold text-white text-center">
                                📋 What to Include in Your Message
                            </h2>
                            <p className="mt-3 text-center text-sm text-gray-400">
                                Help us give you the best response by including these details:
                            </p>
                            <ul className="mt-6 space-y-3">
                                {messageChecklist.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-sm text-gray-300"
                                    >
                                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/20 text-xs font-bold text-accent-cyan">
                                            {i + 1}
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 text-center">
                                <Button
                                    href={getWhatsAppLink()}
                                    external
                                    className="bg-gradient-to-r! from-green-500! to-emerald-600!"
                                >
                                    💬 Send Us a Message
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </section>

            {/* Email placeholder */}
            <section className="bg-navy-900/30 py-16">
                <Container>
                    <div className="text-center">
                        <p className="text-sm text-gray-400">
                            Prefer email?{" "}
                            <a
                                href={`mailto:${siteConfig.email}`}
                                className="font-medium text-accent-cyan transition-colors hover:text-white"
                            >
                                {siteConfig.email}
                            </a>
                        </p>
                    </div>
                </Container>
            </section>
        </>
    );
}
