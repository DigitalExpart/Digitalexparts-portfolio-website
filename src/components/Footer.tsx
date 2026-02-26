"use client";

import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/data/site";

const footerLinks = [
    {
        title: "Services",
        links: [
            { label: "Web Development", href: "/services#web-development" },
            { label: "Email Marketing", href: "/services#email-marketing" },
            { label: "AI Automation", href: "/services#ai-automation" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "/about" },
            { label: "Our Work", href: "/work" },
            { label: "Contact", href: "/contact" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-navy-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link
                            href="/"
                            className="font-heading text-xl font-bold text-white"
                        >
                            {siteConfig.brandName}
                        </Link>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400">
                            {siteConfig.seoCopyName} in web development, email marketing, and
                            AI automation. We build digital solutions that grow your business.
                        </p>
                        <div className="mt-4 flex gap-4">
                            <a
                                href={getWhatsAppLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 transition-colors hover:text-green-400"
                                aria-label="WhatsApp"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            <a
                                href={siteConfig.upworkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 transition-colors hover:text-green-400"
                                aria-label="Upwork"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
                                </svg>
                            </a>
                            <a
                                href={siteConfig.fiverrUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 transition-colors hover:text-green-400"
                                aria-label="Fiverr"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.836.312-.836.71v2.995h-.836v-2.652c0-.312-.09-.71-.709-.71h-.852v3.362h-.836V12.03h-.852c-.546 0-.836.312-.836.71v2.995h-.836V11.173h.836v.312c.268-.2.57-.312.924-.312.476 0 .89.234 1.07.624.336-.39.78-.624 1.298-.624.648 0 1.07.312 1.262.78h.85v4.335h-.797v-4.405zm-8.666 0h-.836v1.453c0 .312-.09.71-.709.71h-.852v-2.163h-1.25v-.857h1.25v-1.015h.836v1.015h1.561v.857zm-5.556-.857v4.405H6.95v-2.508c0-.39-.18-.71-.674-.71-.42 0-.836.234-.836.71v2.508h-.836v-4.405h.836v.312c.27-.2.604-.312.958-.312.684 0 1.388.39 1.388 1.388v3.017h.002zm-4.37 0v4.405h-.836v-.312c-.268.2-.57.312-.924.312-.684 0-1.388-.39-1.388-1.388V11.83h.836v2.508c0 .39.18.71.674.71.42 0 .836-.234.836-.71V11.83h.802v.196zM.93 11.83H0v4.405h.836v-2.508c0-.39.18-.71.674-.71.42 0 .836.234.836.71v2.508h.836V13.73c0-.78-.39-1.388-1.07-1.588-.42-.078-.73-.078-1.182-.312z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                                {group.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 transition-colors hover:text-accent-cyan"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 border-t border-white/5 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} {siteConfig.brandName} ({siteConfig.seoCopyName}). All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
