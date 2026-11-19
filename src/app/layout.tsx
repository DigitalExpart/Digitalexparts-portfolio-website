import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { SITE } from "@/data/site";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "Digital Experts | Web Design, Development & AI Video Studio",
    template: "%s | Digital Experts",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.brand,
    title: "Digital Experts | Web Design, Development & AI Video Studio",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Experts | Web Design, Development & AI Video Studio",
    description: SITE.description,
  },
};

const PRELOADER_BOOT_SCRIPT = `
try {
  var seen = sessionStorage.getItem('de_preloader_seen') === '1';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.dataset.preloader = (seen || reduced) ? 'done' : 'active';
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sameAs = [SITE.fiverrUrl, SITE.upworkUrl, SITE.behanceUrl];
  const baseUrl = SITE.siteUrl.replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#studio`,
    name: SITE.brand,
    alternateName: SITE.alternateName,
    url: `${baseUrl}/`,
    description:
      "Remote web design, development, email marketing and AI video studio.",
    email: SITE.email,
    areaServed: "Worldwide",
    founder: {
      "@type": "Person",
      "@id": `${baseUrl}/#founder`,
      name: SITE.owner,
      alternateName: SITE.fiverrBrand,
      sameAs,
    },
    sameAs,
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
