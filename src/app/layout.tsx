import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { siteConfig } from "@/data/site";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} | Web Development, Email Marketing & AI Automation`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: `${siteConfig.seoCopyName} in web development, email marketing, and AI automation. We build digital solutions that increase leads, sales, and efficiency for your business.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} | Digital Experts in Web Dev, Email & AI`,
    description: `${siteConfig.seoCopyName} in web development, email marketing, and AI automation. We build digital solutions that grow your business.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.brandName,
  alternateName: siteConfig.seoCopyName,
  url: siteConfig.siteUrl,
  description: `${siteConfig.seoCopyName} in web development, email marketing, and AI automation.`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `https://wa.me/${siteConfig.whatsappNumber}`,
  },
  sameAs: [siteConfig.upworkUrl, siteConfig.fiverrUrl],
};

// JSON-LD Service Schema
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      name: "Web Development",
      description:
        "Custom websites and web applications that convert visitors into customers.",
      provider: { "@type": "Organization", name: siteConfig.brandName },
    },
    {
      "@type": "Service",
      name: "Email Marketing",
      description:
        "Automated email campaigns that nurture leads and boost revenue.",
      provider: { "@type": "Organization", name: siteConfig.brandName },
    },
    {
      "@type": "Service",
      name: "AI Automation",
      description:
        "Intelligent workflows and chatbots that save time and scale operations.",
      provider: { "@type": "Organization", name: siteConfig.brandName },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-navy-950 font-body text-white antialiased`}
      >
        <Navbar />
        <main className="pt-[73px]">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
