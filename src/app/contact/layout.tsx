import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
    title: "Contact Us | Get Started Today",
    description: `Contact ${siteConfig.brandName} via WhatsApp, Upwork, or Fiverr. Our ${siteConfig.seoCopyName} are ready to discuss your web development, email marketing, or AI automation project.`,
    openGraph: {
        title: `Contact | ${siteConfig.brandName}`,
        description: `Get in touch with ${siteConfig.brandName} to discuss your next project.`,
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
