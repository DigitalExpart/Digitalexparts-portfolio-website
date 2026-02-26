"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { getWhatsAppLink } from "@/data/site";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
    study: CaseStudy;
    index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="group overflow-hidden rounded-2xl border border-white/5 bg-navy-900/50 transition-shadow hover:shadow-2xl hover:shadow-accent-blue/10"
        >
            {/* Gradient header */}
            <div
                className={`h-48 bg-gradient-to-br ${study.gradient} flex items-end p-6 opacity-90 transition-opacity group-hover:opacity-100`}
            >
                <div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {study.industry}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-white">
                    {study.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                    {study.outcome}
                </p>

                {/* Service tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                    {study.services.map((svc) => (
                        <span
                            key={svc}
                            className="rounded-full border border-accent-blue/20 bg-accent-blue/5 px-2.5 py-0.5 text-xs text-accent-cyan"
                        >
                            {svc}
                        </span>
                    ))}
                </div>

                {/* Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                    {study.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                            <div className="text-sm font-bold text-accent-cyan">
                                {metric.value}
                            </div>
                            <div className="text-xs text-gray-500">{metric.label}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-5">
                    <Button
                        href={getWhatsAppLink(
                            `Hi, I saw your "${study.title}" case study and want a similar project.`
                        )}
                        external
                        variant="ghost"
                        size="sm"
                    >
                        Ask for similar project →
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
