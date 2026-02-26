"use client";

import Image from "next/image";

const logos = [
    { name: "TechStart", src: "/logos/techstart.png" },
    { name: "GrowthCo", src: "/logos/growthco.png" },
    { name: "ScaleUp", src: "/logos/scaleup.png" },
    { name: "FutureStack", src: "/logos/futurestack.png" },
    { name: "CloudNine", src: "/logos/cloudnine.png" },
    { name: "NexusAI", src: "/logos/nexusai.png" },
    { name: "BrightWave", src: "/logos/brightwave.png" },
];

export function LogoMarquee() {
    // Duplicate the logos array to create seamless infinite loop
    const allLogos = [...logos, ...logos];

    return (
        <section className="border-y border-white/5 bg-navy-900/50 py-10 overflow-hidden">
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-gray-500">
                Trusted by innovative businesses
            </p>

            {/* Marquee container */}
            <div className="relative">
                {/* Left fade */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-navy-900/80 to-transparent" />
                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-navy-900/80 to-transparent" />

                {/* Scrolling track */}
                <div className="flex animate-marquee items-center gap-16">
                    {allLogos.map((logo, i) => (
                        <div
                            key={`${logo.name}-${i}`}
                            className="flex h-12 w-36 flex-shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                        >
                            <Image
                                src={logo.src}
                                alt={`${logo.name} logo`}
                                width={144}
                                height={48}
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
