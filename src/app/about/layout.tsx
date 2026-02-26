import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
    title: "About Us | Meet the Digital Experts",
    description: `Learn about ${siteConfig.brandName} — a focused team of ${siteConfig.seoCopyName} specializing in web development, email marketing, and AI automation.`,
    openGraph: {
        title: `About Us | ${siteConfig.brandName}`,
        description: `Meet the team behind ${siteConfig.brandName}.`,
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
