import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
    title: "Our Work | Case Studies & Portfolio",
    description: `See how ${siteConfig.seoCopyName} have helped businesses grow with web development, email marketing, and AI automation. Browse our case studies and results.`,
    openGraph: {
        title: `Our Work | ${siteConfig.brandName}`,
        description: `Browse our portfolio of successful projects and case studies.`,
    },
};

export default function WorkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
