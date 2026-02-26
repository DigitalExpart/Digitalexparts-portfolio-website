"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "./Button";
import { getWhatsAppLink, siteConfig } from "@/data/site";

interface HeroSlide {
    image: string;
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    highlights: string[];
}

const slides: HeroSlide[] = [
    {
        image: "/hero-web-dev.png",
        badge: "🌐 Web Development",
        title: "Custom Websites That ",
        highlight: "Convert Visitors Into Customers",
        subtitle:
            "We build high-performance, responsive websites and web apps tailored to your business goals — designed for speed, SEO, and measurable growth.",
        highlights: [
            "Mobile-first responsive design",
            "SEO-optimized architecture",
            "Sub-2 second load times",
        ],
    },
    {
        image: "/hero-email-marketing.png",
        badge: "📧 Email Marketing",
        title: "Automated Campaigns That ",
        highlight: "Nurture Leads & Boost Revenue",
        subtitle:
            "From welcome sequences to win-back flows, our Digital Experts design email systems that work around the clock to grow your revenue.",
        highlights: [
            "40%+ average open rates",
            "Behavioral trigger sequences",
            "ROI-focused automation",
        ],
    },
    {
        image: "/hero-ai-automation.png",
        badge: "🤖 AI Automation",
        title: "Intelligent Workflows That ",
        highlight: "Save Time & Scale Operations",
        subtitle:
            "We implement AI-powered chatbots, workflow automation, and smart integrations that reduce manual work and help you scale without adding headcount.",
        highlights: [
            "24/7 AI-powered support",
            "200+ hours saved monthly",
            "Custom GPT solutions",
        ],
    },
];

export function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const goToSlide = useCallback(
        (index: number) => {
            setDirection(index > current ? 1 : -1);
            setCurrent(index);
        },
        [current]
    );

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[current];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
        }),
    };

    return (
        <section className="relative min-h-[92vh] overflow-hidden bg-navy-950">
            {/* Background image */}
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slide.image}
                        alt={slide.badge}
                        fill
                        className="object-cover"
                        priority={current === 0}
                        sizes="100vw"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/30" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                <div className="w-full py-20 sm:py-28 lg:py-36">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="max-w-3xl"
                        >
                            <span className="mb-6 inline-block rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-sm font-medium text-accent-cyan backdrop-blur-sm">
                                {slide.badge}
                            </span>

                            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                                {slide.title}
                                <span className="gradient-text">{slide.highlight}</span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
                                {slide.subtitle}
                            </p>

                            {/* Highlights */}
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
                                {slide.highlights.map((h) => (
                                    <div
                                        key={h}
                                        className="flex items-center gap-2 text-sm text-gray-300"
                                    >
                                        <svg
                                            className="h-4 w-4 text-accent-cyan"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        {h}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Button
                                    href={getWhatsAppLink()}
                                    external
                                    size="lg"
                                    className="bg-gradient-to-r! from-green-500! to-emerald-600! shadow-green-500/25!"
                                >
                                    💬 Chat on WhatsApp
                                </Button>
                                <Button href="/work" variant="secondary" size="lg">
                                    View Our Work →
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Slide indicators */}
                    <div className="mt-12 flex items-center gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`h-2 rounded-full transition-all duration-500 ${i === current
                                        ? "w-10 bg-accent-cyan"
                                        : "w-2 bg-white/30 hover:bg-white/50"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                        <span className="ml-4 text-xs text-gray-500">
                            {current + 1} / {slides.length}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
