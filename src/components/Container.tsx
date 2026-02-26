"use client";

import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}

interface SectionHeadingProps {
    badge?: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
    light?: boolean;
}

export function SectionHeading({
    badge,
    title,
    subtitle,
    centered = true,
    light = false,
}: SectionHeadingProps) {
    return (
        <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
            {badge && (
                <span className="mb-4 inline-block rounded-full border border-accent-blue/30 bg-accent-blue/10 px-4 py-1.5 text-sm font-medium text-accent-cyan">
                    {badge}
                </span>
            )}
            <h2
                className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-navy-900" : "text-white"
                    }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mx-auto mt-4 max-w-2xl text-lg ${light ? "text-navy-700" : "text-gray-400"
                        }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
