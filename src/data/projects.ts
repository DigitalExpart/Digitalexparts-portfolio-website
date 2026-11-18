export type ProjectCategory = "Websites" | "UI/UX" | "Branding" | "Email" | "AI Video";

export interface ProjectItem {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  year: string;
  client: string;
  engagementModel: "Solo" | "Solo + Vetted Team";
  role: string;
  tools: string[];
  timeline: string;
  posterImage: string;
  mobilePosterImage?: string;
  videoPreview?: string;
  accentHue: string;
  challenge: string;
  process: string[];
  results: string[];
  metrics: { label: string; value: string }[];
  galleryImages: string[];
}

export const PROJECT_CATEGORIES: Array<"All" | ProjectCategory> = [
  "All",
  "Websites",
  "UI/UX",
  "Branding",
  "Email",
  "AI Video",
];

/**
 * Single source of truth for all portfolio case studies.
 * To add a project: append a new ProjectItem object below and add its poster image under /public/images/projects/.
 */
export const PROJECTS: ProjectItem[] = [
  {
    slug: "kinetik-pay",
    index: "01",
    title: "Kinetik Pay",
    tagline: "Interactive fintech launch site & pricing architecture that lifted demo bookings by 64%.",
    category: "Websites",
    year: "2026",
    client: "Kinetik Financial Inc.",
    engagementModel: "Solo",
    role: "Lead Designer & Full-Stack Developer",
    tools: ["Next.js", "TypeScript", "GSAP", "Tailwind CSS", "Vercel"],
    timeline: "4 weeks",
    posterImage: "/images/projects/kinetik-pay.jpg",
    accentHue: "#B6FF4A",
    challenge:
      "Kinetik had strong API technology for cross-border treasury teams, but their legacy template site buried the value proposition under dense jargon and took 5+ seconds to load on mobile.",
    process: [
      "Audited funnel drop-off and rewrote hero and pricing copy around tangible CFO outcomes.",
      "Designed an interactive fee-comparison calculator and clean dark-editorial visual language in Figma.",
      "Built the production app in Next.js with GSAP ScrollTrigger choreography and sub-second page loads.",
    ],
    results: [
      "64% increase in qualified demo bookings within 45 days of launch.",
      "98 Mobile Lighthouse Performance score and 41% lower bounce rate on paid traffic.",
    ],
    metrics: [
      { label: "Demo Conversion", value: "+64%" },
      { label: "Mobile Lighthouse", value: "98" },
      { label: "Build Turnaround", value: "4 wks" },
    ],
    galleryImages: [
      "/images/projects/kinetik-pay.jpg",
      "/images/projects/pulseboard-crm.jpg",
    ],
  },
  {
    slug: "vespera-atelier",
    index: "02",
    title: "Vespera Atelier",
    tagline: "Complete visual identity, packaging system & Squarespace flagship for a botanical house.",
    category: "Branding",
    year: "2026",
    client: "Vespera Botanicals",
    engagementModel: "Solo + Vetted Team",
    role: "Creative Direction, Identity & Web Build",
    tools: ["Figma", "Illustrator", "Squarespace", "Custom CSS"],
    timeline: "6 weeks",
    posterImage: "/images/projects/vespera-atelier.jpg",
    accentHue: "#D4FF70",
    challenge:
      "Vespera needed an unmistakable luxury identity and direct-to-consumer storefront ready before their seasonal retail rollout — without paying traditional agency retainers.",
    process: [
      "Led brand positioning, custom wordmark typography, and tactile monochrome packaging specs.",
      "Brought in a vetted 3D packaging specialist from my team to render studio product visuals.",
      "Implemented an editorial Squarespace storefront with bespoke CSS transitions and easy team editing.",
    ],
    results: [
      "Sold out the initial 1,200-unit launch batch inside 72 hours.",
      "In-house marketing team ships new seasonal drops independently with zero developer tickets.",
    ],
    metrics: [
      { label: "Launch Sellout", value: "72 hrs" },
      { label: "Avg. Order Value", value: "+28%" },
      { label: "Team Size", value: "2 specialists" },
    ],
    galleryImages: [
      "/images/projects/vespera-atelier.jpg",
      "/images/projects/sora-roastery.jpg",
    ],
  },
  {
    slug: "pulseboard-crm",
    index: "03",
    title: "Pulseboard CRM",
    tagline: "Zero-to-one dark UI design system and onboarding UX for a client-retainer platform.",
    category: "UI/UX",
    year: "2025",
    client: "Pulseboard Software",
    engagementModel: "Solo",
    role: "Principal Product Designer",
    tools: ["Figma", "Design Tokens", "Interactive Prototypes", "React"],
    timeline: "5 weeks",
    posterImage: "/images/projects/pulseboard-crm.jpg",
    accentHue: "#82FF9E",
    challenge:
      "Early adopters loved Pulseboard's reporting engine, yet 48% abandoned workspace setup during onboarding due to cluttered navigation and inconsistent form states.",
    process: [
      "Mapped every onboarding friction point across 14 user session recordings.",
      "Created a token-driven component library (65+ reusable components) with keyboard-first workflows.",
      "Replaced a 7-step setup wizard with a guided 3-minute live preview workspace.",
    ],
    results: [
      "Onboarding completion jumped from 52% to 86% within two sprints.",
      "Cut front-end UI handoff ambiguity in half using shared Figma-to-Tailwind tokens.",
    ],
    metrics: [
      { label: "Onboarding Rate", value: "86%" },
      { label: "UI Components", value: "65+" },
      { label: "Setup Time", value: "-55%" },
    ],
    galleryImages: [
      "/images/projects/pulseboard-crm.jpg",
      "/images/projects/kinetik-pay.jpg",
    ],
  },
  {
    slug: "sora-roastery",
    index: "04",
    title: "Sora Roastery",
    tagline: "Automated Klaviyo retention flows & modular campaign kit driving 42% repeat orders.",
    category: "Email",
    year: "2025",
    client: "Sora Specialty Coffee",
    engagementModel: "Solo + Vetted Team",
    role: "Design Lead & Lifecycle Strategist",
    tools: ["Klaviyo", "Figma", "HTML Email", "Shopify"],
    timeline: "3 weeks",
    posterImage: "/images/projects/sora-roastery.jpg",
    accentHue: "#E4FF5A",
    challenge:
      "Sora had steady first-time buyers from social ads, but lacked automated post-purchase touchpoints and sent inconsistent plain-text blasts that rarely converted.",
    process: [
      "Partnered with my vetted copywriter and email specialist to architect 5 core lifecycle flows.",
      "Designed a crisp dark-and-cream modular email system tested across Apple Mail, Gmail, and Outlook.",
      "Set up behavioral brew-cycle replenishment reminders timed to bag weight and roast cadence.",
    ],
    results: [
      "Email-attributed revenue rose from 14% to 33% of total monthly store sales.",
      "42% increase in 90-day repeat subscription conversions.",
    ],
    metrics: [
      { label: "Repeat Orders", value: "+42%" },
      { label: "Email Revenue", value: "33%" },
      { label: "Open Rate Avg", value: "51.4%" },
    ],
    galleryImages: [
      "/images/projects/sora-roastery.jpg",
      "/images/projects/vespera-atelier.jpg",
    ],
  },
  {
    slug: "aether-robotics",
    index: "05",
    title: "Aether Robotics",
    tagline: "AI-directed launch film, motion storyboard & social cutdown suite for Series A reveal.",
    category: "AI Video",
    year: "2026",
    client: "Aether Automation Labs",
    engagementModel: "Solo + Vetted Team",
    role: "Creative Director & AI Motion Producer",
    tools: ["AI Video Pipeline", "After Effects", "Sound Design", "Figma"],
    timeline: "2 weeks",
    posterImage: "/images/projects/aether-robotics.jpg",
    accentHue: "#B6FF4A",
    challenge:
      "Aether needed a cinematic 60-second launch film and 8 vertical ad variants before their fundraising announcement — with a two-week runway and no time for a physical studio shoot.",
    process: [
      "Directed visual style frames and scene pacing alongside a vetted motion artist on my roster.",
      "Generated high-precision hardware and lighting sequences via our hybrid AI video workflow.",
      "Composited crisp kinetic typography, custom sound beds, and delivered 16:9 + 9:16 exports.",
    ],
    results: [
      "Over 180K organic launch views across LinkedIn and X in the first week.",
      "Delivered at roughly 25% of the cost and timeline of a traditional live-action shoot.",
    ],
    metrics: [
      { label: "Launch Views", value: "180K+" },
      { label: "Delivery Speed", value: "14 days" },
      { label: "Ad Formats", value: "9 variants" },
    ],
    galleryImages: [
      "/images/projects/aether-robotics.jpg",
      "/images/projects/kinetik-pay.jpg",
    ],
  },
  {
    slug: "northline-logistics",
    index: "06",
    title: "Northline Logistics",
    tagline: "High-speed Webflow + WordPress hybrid platform built with a 3-person vetted sprint team.",
    category: "Websites",
    year: "2025",
    client: "Northline Freight Group",
    engagementModel: "Solo + Vetted Team",
    role: "Technical Lead & UX Architect",
    tools: ["Webflow", "WordPress", "GSAP", "HubSpot"],
    timeline: "5 weeks",
    posterImage: "/images/projects/northline-logistics.jpg",
    accentHue: "#9AFF54",
    challenge:
      "Northline operated across four regional portals with fragmented branding, slow quoting forms, and no unified analytics pipeline into HubSpot.",
    process: [
      "Unified all regional service lines under one clean editorial site structure.",
      "Assembled a dedicated developer and copywriter from my vetted team for parallel sprint delivery.",
      "Built an interactive freight quote estimator wired directly to HubSpot deal stages.",
    ],
    results: [
      "Reduced quote request drop-off by 39% across desktop and mobile.",
      "Unified 4 regional domains into one maintainable CMS workflow.",
    ],
    metrics: [
      { label: "Quote Leads", value: "+51%" },
      { label: "Drop-off Cut", value: "-39%" },
      { label: "Regions Unified", value: "4" },
    ],
    galleryImages: [
      "/images/projects/northline-logistics.jpg",
      "/images/projects/pulseboard-crm.jpg",
    ],
  },
];
