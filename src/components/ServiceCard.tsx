"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { getWhatsAppLink } from "@/data/site";
import type { Service } from "@/data/services";

interface ServiceCardProps {
    service: Service;
    index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="glass-card group rounded-2xl p-6 transition-shadow hover:shadow-2xl hover:shadow-accent-blue/10 sm:p-8"
        >
            <div className="mb-4 text-4xl">{service.icon}</div>
            <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                {service.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {service.tagline}
            </p>
            <ul className="mt-4 space-y-2">
                {service.features.slice(0, 3).map((feature) => (
                    <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-gray-300"
                    >
                        <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-cyan"
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
                        {feature}
                    </li>
                ))}
            </ul>
            <div className="mt-6">
                <Button
                    href={getWhatsAppLink(`Hi, I'm interested in your ${service.title} services.`)}
                    external
                    variant="secondary"
                    size="sm"
                >
                    Get Started →
                </Button>
            </div>
        </motion.div>
    );
}
