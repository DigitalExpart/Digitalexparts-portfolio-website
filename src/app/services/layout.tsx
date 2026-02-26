import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
    title: "Services | Web Development, Email Marketing & AI Automation",
    description: `${siteConfig.seoCopyName} offer web development, email marketing, and AI automation services designed to increase leads, sales, and operational efficiency.`,
    openGraph: {
        title: `Services | ${siteConfig.brandName}`,
        description: `Explore our web development, email marketing, and AI automation services.`,
    },
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
