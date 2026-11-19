export type ProjectCategory =
  | "Websites"
  | "Mobile Apps"
  | "UI/UX"
  | "Branding"
  | "Email"
  | "AI Video";

export interface ProjectItem {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  serviceSlug: string;
  isConcept?: boolean;
  year: string;
  client: string;
  engagementModel: "Solo" | "Solo + Team";
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
  "Mobile Apps",
  "UI/UX",
  "Branding",
  "Email",
  "AI Video",
];

/**
 * Single source of truth for portfolio case studies.
 * Sample projects are transparently flagged `isConcept: true` until replaced by NDA-cleared client case studies.
 */
export const PROJECTS: ProjectItem[] = [
  {
    slug: "kinetik-pay",
    index: "01",
    title: "Kinetik Pay",
    tagline: "Custom Next.js fintech launch site & interactive pricing flow (Studio Concept).",
    category: "Websites",
    serviceSlug: "web-design-development",
    isConcept: true,
    year: "2026",
    client: "Studio Concept · Fintech",
    engagementModel: "Solo",
    role: "Lead Designer & Developer",
    tools: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/kinetik-pay.jpg",
    accentHue: "#B6FF4A",
    challenge:
      "Demonstrating how a technical treasury product can present transparent pricing and conversion-focused messaging without template clutter or slow mobile load times.",
    process: [
      "Structured the landing page around immediate clarity, proof points and direct call/demo actions.",
      "Built an interactive fee-comparison layout with clean Figma-to-React component tokens.",
      "Engineered responsive motion choreography with GSAP ScrollTrigger and mobile performance guardrails.",
    ],
    results: [
      "Concept blueprint showing sub-second static page delivery and crisp mobile typography.",
      "Full production client case study details available on request.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Stack", value: "Next.js" },
      { label: "Model", value: "Solo" },
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
    tagline: "Botanical brand identity, packaging direction & Squarespace storefront (Studio Concept).",
    category: "Branding",
    serviceSlug: "graphic-design-branding",
    isConcept: true,
    year: "2026",
    client: "Studio Concept · Skincare",
    engagementModel: "Solo + Team",
    role: "Creative Direction, Identity & Web Build",
    tools: ["Figma", "Brand Guidelines", "Squarespace", "Custom CSS"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/vespera-atelier.jpg",
    accentHue: "#D4FF70",
    challenge:
      "Crafting a cohesive identity system and direct-to-consumer storefront that looks bespoke while remaining straightforward for an internal founder team to update.",
    process: [
      "Defined monochrome packaging typography, embossed box specs and visual direction.",
      "Paired brand collateral with a tailored Squarespace storefront using bespoke CSS layout styling.",
      "Documented reusable brand guidelines and social launch templates.",
    ],
    results: [
      "Unified brand identity across packaging, social assets and editable Squarespace storefront.",
      "Full client branding examples shared on request.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Platform", value: "Squarespace" },
      { label: "Model", value: "Team" },
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
    tagline: "High-fidelity Figma UI/UX system & interactive onboarding flow (Studio Concept).",
    category: "UI/UX",
    serviceSlug: "ui-ux-design",
    isConcept: true,
    year: "2025",
    client: "Studio Concept · B2B SaaS",
    engagementModel: "Solo",
    role: "UI/UX Designer",
    tools: ["Figma", "Design System", "Clickable Prototype", "React"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/pulseboard-crm.jpg",
    accentHue: "#82FF9E",
    challenge:
      "Simplifying dense multi-step SaaS onboarding and dashboard navigation into clear screens developers can implement without guesswork.",
    process: [
      "Mapped user flows and simplified initial workspace setup into clear progressive steps.",
      "Built reusable Figma components covering buttons, inputs, tables and dark-mode states.",
      "Delivered clickable desktop and mobile prototypes ready for developer handoff.",
    ],
    results: [
      "Complete developer-ready Figma library and clear user-journey documentation.",
      "Live NDA product UI examples shared on request.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Deliverable", value: "Figma Kit" },
      { label: "Model", value: "Solo" },
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
    tagline: "Responsive email templates & automated Klaviyo lifecycle flows (Studio Concept).",
    category: "Email",
    serviceSlug: "email-marketing",
    isConcept: true,
    year: "2025",
    client: "Studio Concept · Ecommerce",
    engagementModel: "Solo + Team",
    role: "Email Design & Automation Lead",
    tools: ["Klaviyo", "Mailchimp", "Figma", "HTML Email"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/sora-roastery.jpg",
    accentHue: "#E4FF5A",
    challenge:
      "Designing editorial email layouts and automated sequences that render cleanly across desktop and mobile mail clients and keep customers coming back.",
    process: [
      "Mapped welcome, abandoned cart and post-purchase re-engagement lifecycle flows.",
      "Designed modular responsive email blocks tested across dark and light email clients.",
      "Structured list segmentation and clean campaign handoff templates.",
    ],
    results: [
      "Reusable responsive template kit built for Mailchimp, Klaviyo or HubSpot deployment.",
      "Client campaign metrics available on request.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Stack", value: "Klaviyo" },
      { label: "Model", value: "Team" },
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
    tagline: "Scripted AI video launch teaser & multi-format social ad suite (Studio Concept).",
    category: "AI Video",
    serviceSlug: "ai-video-production",
    isConcept: true,
    year: "2026",
    client: "Studio Concept · Hardware",
    engagementModel: "Solo + Team",
    role: "Creative Director & AI Video Producer",
    tools: ["AI Video Tools", "Storyboard", "Voiceover", "Captions"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/aether-robotics.jpg",
    accentHue: "#B6FF4A",
    challenge:
      "Producing studio-grade product launch video and paid social cutdowns quickly without coordinating a physical film crew or location shoot.",
    process: [
      "Drafted script, shot pacing and visual storyboard aligned with brand lighting.",
      "Generated core visual scenes and voiceover tracks using modern AI video pipelines.",
      "Edited, captioned and exported native 16:9 and 9:16 cuts for web and social.",
    ],
    results: [
      "Multi-aspect launch video workflow ready for Instagram, TikTok, YouTube and paid ads.",
      "Additional AI video reels shared on request.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Formats", value: "16:9 & 9:16" },
      { label: "Model", value: "Team" },
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
    tagline: "Wix, WordPress & Webflow multi-platform build blueprint (Studio Concept).",
    category: "Websites",
    serviceSlug: "wix-squarespace-wordpress-webflow",
    isConcept: true,
    year: "2025",
    client: "Studio Concept · B2B Services",
    engagementModel: "Solo + Team",
    role: "No-Code & Web Architect",
    tools: ["Webflow", "WordPress", "Wix Studio", "SEO Setup"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/northline-logistics.jpg",
    accentHue: "#9AFF54",
    challenge:
      "Replacing fragmented legacy service pages with one fast, structured CMS website that internal staff can update independently.",
    process: [
      "Audited content hierarchy and selected a clean no-code CMS architecture.",
      "Built custom page layouts beyond stock templates with responsive breakpoints.",
      "Delivered short Loom training walkthroughs for easy self-service editing.",
    ],
    results: [
      "Clear quote-intake journey paired with self-editable CMS collections.",
      "Real client no-code builds shared on request or via Fiverr/Upwork profiles.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Platform", value: "Webflow / WP" },
      { label: "Model", value: "Team" },
    ],
    galleryImages: [
      "/images/projects/northline-logistics.jpg",
      "/images/projects/pulseboard-crm.jpg",
    ],
  },
  {
    slug: "velo-mobile-app",
    index: "07",
    title: "Velo Mobile",
    tagline: "iOS & Android instant booking & fintech wallet app built in React Native (Studio Concept).",
    category: "Mobile Apps",
    serviceSlug: "mobile-app-development",
    isConcept: true,
    year: "2026",
    client: "Studio Concept · iOS & Android",
    engagementModel: "Solo + Team",
    role: "Mobile App Designer & React Native Engineer",
    tools: ["React Native", "TypeScript", "Flutter", "Supabase", "Stripe"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/velo-mobile-app.jpg",
    accentHue: "#B6FF4A",
    challenge:
      "Designing and engineering a cross-platform mobile experience combining instant hotel & service booking, peer transfers and live analytics with smooth native 60fps gestures on iOS and Android.",
    process: [
      "Mapped thumb-friendly navigation ergonomics, biometric auth and instant checkout flows in Figma.",
      "Engineered reusable React Native & Flutter components backed by Supabase real-time state and Stripe payments.",
      "Optimized startup speed, push notification deep-links and iOS App Store & Google Play release pipelines.",
    ],
    results: [
      "Single shared mobile architecture targeting both iOS App Store and Google Play with native gesture feel.",
      "Live client iOS & Android app demos available on request.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Platforms", value: "iOS & Android" },
      { label: "Stack", value: "React Native" },
    ],
    galleryImages: [
      "/images/projects/velo-mobile-app.jpg",
      "/images/projects/pulseboard-crm.jpg",
    ],
  },
  {
    slug: "nexaflow-automation",
    index: "08",
    title: "NexaFlow AI",
    tagline: "AI lead qualification engine, CRM sync & automated booking workflows (Studio Concept).",
    category: "Websites",
    serviceSlug: "ai-automation",
    isConcept: true,
    year: "2026",
    client: "Studio Concept · AI Automation",
    engagementModel: "Solo",
    role: "AI Automation Architect",
    tools: ["Next.js API", "n8n", "Make", "OpenAI API", "Calendly"],
    timeline: "Concept Case Study",
    posterImage: "/images/projects/nexaflow-automation.jpg",
    accentHue: "#9DFF4A",
    challenge:
      "Replacing manual lead qualification, delayed follow-up emails and disconnected spreadsheets with an end-to-end automated pipeline connecting website forms, AI chat and CRM records.",
    process: [
      "Audited enquiry routing bottlenecks and designed an automated triage workflow in n8n and Make.",
      "Integrated structured LLM enrichment, instant Slack/email routing and Calendly booking webhooks.",
      "Delivered webhook error alerts and clear operational documentation for easy monitoring.",
    ],
    results: [
      "End-to-end automated qualification & instant response flow wired directly from site to inbox and calendar.",
      "Custom workflow walkthroughs available on request.",
    ],
    metrics: [
      { label: "Status", value: "Concept" },
      { label: "Engine", value: "n8n / Make" },
      { label: "Reply SLA", value: "< 1 min bot" },
    ],
    galleryImages: [
      "/images/projects/nexaflow-automation.jpg",
      "/images/projects/kinetik-pay.jpg",
    ],
  },
];
