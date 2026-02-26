"use client";

export function AnimatedBlobs() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {/* Top-right blob */}
            <div
                className="animate-blob-float absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-20"
                style={{
                    background:
                        "radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(34,211,238,0.1) 60%, transparent 80%)",
                }}
            />
            {/* Bottom-left blob */}
            <div
                className="animate-blob-float-delayed absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full opacity-15"
                style={{
                    background:
                        "radial-gradient(circle, rgba(34,211,238,0.3) 0%, rgba(37,99,235,0.1) 60%, transparent 80%)",
                }}
            />
            {/* Center-right blob */}
            <div
                className="animate-blob-float-slow absolute right-1/4 top-1/2 h-80 w-80 rounded-full opacity-10"
                style={{
                    background:
                        "radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)",
                }}
            />
        </div>
    );
}
