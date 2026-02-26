"use client";

import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
    children: ReactNode;
    variant?: ButtonVariant;
    href?: string;
    external?: boolean;
    onClick?: () => void;
    className?: string;
    size?: "sm" | "md" | "lg";
    ariaLabel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-gradient-to-r from-accent-blue to-blue-600 text-white shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:scale-105",
    secondary:
        "border-2 border-accent-blue/50 text-white hover:bg-accent-blue/10 hover:border-accent-blue hover:scale-105",
    ghost:
        "text-gray-300 hover:text-white hover:bg-white/5",
};

const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

export function Button({
    children,
    variant = "primary",
    href,
    external = false,
    onClick,
    className = "",
    size = "md",
    ariaLabel,
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-navy-900";

    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
        if (external) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={combinedStyles}
                    aria-label={ariaLabel}
                >
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className={combinedStyles} aria-label={ariaLabel}>
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={combinedStyles}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}
