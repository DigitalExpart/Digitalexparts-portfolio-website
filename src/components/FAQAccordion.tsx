"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQ } from "@/data/faqs";

interface FAQAccordionProps {
    faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                    <div
                        key={faq.id}
                        className="overflow-hidden rounded-xl border border-white/5 bg-navy-900/50"
                    >
                        <button
                            onClick={() => setOpenId(isOpen ? null : faq.id)}
                            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/5"
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${faq.id}`}
                        >
                            <span className="pr-4 font-heading text-base font-semibold text-white sm:text-lg">
                                {faq.question}
                            </span>
                            <motion.svg
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="h-5 w-5 flex-shrink-0 text-accent-cyan"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </motion.svg>
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    id={`faq-answer-${faq.id}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    role="region"
                                >
                                    <div className="border-t border-white/5 px-6 py-5">
                                        <p className="text-sm leading-relaxed text-gray-400">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
