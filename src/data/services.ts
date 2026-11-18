export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortTag: string;
  description: string;
  capabilities: string[];
  previewImage: string;
  previewAlt: string;
  accentLabel: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    index: "01",
    title: "Website Design & Development",
    shortTag: "Custom Code · Next.js · Motion",
    description:
      "Fast, conversion-focused websites built from scratch with editorial typography, smooth WebGL/GSAP motion, and clean semantic code.",
    capabilities: [
      "Bespoke responsive architecture",
      "Next.js, React & TypeScript builds",
      "GSAP & Three.js interactive motion",
      "Technical SEO & Core Web Vitals 90+",
      "Headless CMS & API integrations",
      "Vercel deployment & analytics setup",
    ],
    previewImage: "/images/projects/kinetik-pay.jpg",
    previewAlt: "Custom dark fintech website interface preview",
    accentLabel: "From landing pages to full web apps",
  },
  {
    id: "nocode",
    index: "02",
    title: "No-Code & Low-Code Platforms",
    shortTag: "Wix · Squarespace · WordPress · Webflow",
    description:
      "Launch faster on platforms your team can edit on day one — engineered cleanly without bloated templates or fragile plugins.",
    capabilities: [
      "Webflow custom interactions & CMS",
      "Wix Studio & Velo custom logic",
      "Squarespace bespoke CSS & commerce",
      "WordPress custom themes & WooCommerce",
      "Shopify & Framer high-speed storefronts",
      "Editor training & handover Looms",
    ],
    previewImage: "/images/projects/northline-logistics.jpg",
    previewAlt: "No-code and enterprise web platform layout preview",
    accentLabel: "Editable by your team in minutes",
  },
  {
    id: "ui-ux",
    index: "03",
    title: "UI/UX Design",
    shortTag: "Figma · Product Systems · Flows",
    description:
      "Clear user journeys, interactive prototypes, and scalable design systems that turn complex products into effortless tools.",
    capabilities: [
      "User flows & information architecture",
      "Wireframes & clickable Figma prototypes",
      "Multi-brand component design systems",
      "SaaS dashboards & onboarding UX",
      "Conversion & UX heuristic audits",
      "Developer-ready specs & tokens",
    ],
    previewImage: "/images/projects/pulseboard-crm.jpg",
    previewAlt: "Dark UI analytics dashboard design system preview",
    accentLabel: "Designed for clarity and retention",
  },
  {
    id: "branding",
    index: "04",
    title: "Graphic Design & Branding",
    shortTag: "Identity · Print · Visual Systems",
    description:
      "Cohesive visual identities, pitch decks, and social collateral that help founders and small businesses look unmistakable.",
    capabilities: [
      "Logo marks & visual identity systems",
      "Typography & color architecture",
      "Brand guidelines & asset kits",
      "Investor pitch decks & sales collateral",
      "Packaging & print-ready production",
      "Social & launch campaign templates",
    ],
    previewImage: "/images/projects/vespera-atelier.jpg",
    previewAlt: "Luxury botanical packaging and brand identity preview",
    accentLabel: "Consistent across web, deck & print",
  },
  {
    id: "email",
    index: "05",
    title: "Email Marketing",
    shortTag: "Klaviyo · Mailchimp · Lifecycle",
    description:
      "Modular email templates and automated lifecycle flows designed to welcome leads, nurture trust, and recover revenue.",
    capabilities: [
      "Klaviyo & Mailchimp flow architecture",
      "Welcome, abandoned cart & win-back sequences",
      "Responsive dark/light HTML email templates",
      "Newsletter systems & modular Figma kits",
      "List segmentation & A/B subject testing",
      "Deliverability & domain auth hygiene",
    ],
    previewImage: "/images/projects/sora-roastery.jpg",
    previewAlt: "Editorial email campaign and lifecycle flow preview",
    accentLabel: "Automated revenue while you ship",
  },
  {
    id: "ai-video",
    index: "06",
    title: "AI Video Production",
    shortTag: "Launch Films · Reels · Motion",
    description:
      "Cinematic product teasers, social ads, and brand explainers directed with modern AI video pipelines and crisp human editing.",
    capabilities: [
      "Concept scripting & visual storyboards",
      "AI-generated product & brand scenes",
      "Voiceover synthesis & sound design",
      "Kinetic typography & motion compositing",
      "16:9 launch films & 9:16 social cutdowns",
      "Rapid ad creative iteration packs",
    ],
    previewImage: "/images/projects/aether-robotics.jpg",
    previewAlt: "Cinematic AI-directed robotics launch film frame",
    accentLabel: "Studio film energy at sprint speed",
  },
];
