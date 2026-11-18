export interface EngagementModel {
  id: "solo" | "team";
  label: string;
  badge: string;
  headline: string;
  summary: string;
  howItWorks: string[];
  typicalScope: string;
  turnaround: string;
  idealFor: string;
}

export interface TeamRole {
  title: string;
  focus: string;
  tools: string;
}

export interface StatItem {
  value: number;
  padLength: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface ToolLogoItem {
  name: string;
  category: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  source: "Fiverr" | "Upwork" | "Direct Client";
  projectType: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export const INTRO_COPY = {
  eyebrow: "01 · About Digital Expert",
  statement:
    "Digital Expert is a remote digital studio led by [YOUR NAME]. Depending on what you are shipping, I build directly with you one-on-one or bring in my vetted team of specialists — so founders, small businesses, and agencies get custom websites, no-code builds, branding, email systems, and AI video without agency overhead.",
  ctaLabel: "More about me",
};

export const ENGAGEMENT_MODELS: Record<"solo" | "team", EngagementModel> = {
  solo: {
    id: "solo",
    label: "Working with me directly",
    badge: "Solo Sprint · 1-on-1",
    headline: "Direct execution with zero handoff lag.",
    summary:
      "You work straight with [YOUR NAME] from kickoff to launch. Strategy, design, and build happen in one tight feedback loop — ideal when speed, clarity, and senior focus matter most.",
    howItWorks: [
      "Direct Slack, Loom, and weekly check-ins with no account managers in between.",
      "Single creative and technical vision across UI, copy hierarchy, and code or no-code build.",
      "Rapid iteration cycles with live preview links after every milestone.",
    ],
    typicalScope: "High-converting marketing sites, Webflow/Wix/Squarespace builds, UI/UX sprints, email template kits.",
    turnaround: "1 – 4 weeks",
    idealFor: "Founders, lean startups, and small businesses launching fast.",
  },
  team: {
    id: "team",
    label: "Working with my team",
    badge: "Vetted Pod · Multi-Disciplinary",
    headline: "Full-studio output, led by one point of contact.",
    summary:
      "When your launch needs parallel tracks — brand identity, custom web engineering, lifecycle copy, and AI launch video at the same time — I assemble and direct a vetted pod of specialists I trust.",
    howItWorks: [
      "[YOUR NAME] stays your sole lead — managing timelines, quality bar, and cross-discipline integration.",
      "Specialists work in parallel tracks so branding, development, email, and video finish together.",
      "Transparent milestone pricing with none of the traditional agency retainer bloat.",
    ],
    typicalScope: "Full rebrands + custom sites, multi-region CMS builds, product + email + AI video launch suites.",
    turnaround: "3 – 8 weeks",
    idealFor: "Growing brands, funded launches, and partner agencies scaling delivery.",
  },
};

export const TEAM_ROLES: TeamRole[] = [
  {
    title: "UI/UX & Brand Designer",
    focus: "Visual systems, Figma prototypes & typography",
    tools: "Figma · Illustrator",
  },
  {
    title: "Web & No-Code Developer",
    focus: "Next.js, Webflow, WordPress, Wix & Squarespace",
    tools: "Next.js · Webflow · WP",
  },
  {
    title: "Motion & AI Video Artist",
    focus: "Launch films, 3D reels & kinetic ad variants",
    tools: "AI Video · After Effects",
  },
  {
    title: "Conversion Copywriter",
    focus: "Clear positioning, landing copy & lifecycle sequences",
    tools: "Messaging · UX Copy",
  },
  {
    title: "Email & CRM Specialist",
    focus: "Klaviyo/Mailchimp flows, segmentation & deliverability",
    tools: "Klaviyo · Mailchimp",
  },
];

export const STATS: StatItem[] = [
  {
    value: 64,
    padLength: 3,
    suffix: "+",
    label: "Projects Shipped",
    detail: "Websites, brand identities, lifecycle email systems & AI launch campaigns.",
  },
  {
    value: 7,
    padLength: 3,
    suffix: "+",
    label: "Years Crafting",
    detail: "Hands-on design, front-end engineering, and no-code architecture worldwide.",
  },
  {
    value: 48,
    padLength: 3,
    suffix: "+",
    label: "Happy Clients",
    detail: "Founders, small businesses, and partner agencies across 14+ timezones.",
  },
  {
    value: 15,
    padLength: 3,
    suffix: "+",
    label: "Platforms Mastered",
    detail: "From Next.js and Three.js to Webflow, WordPress, Wix, Shopify & Klaviyo.",
  },
];

export const TOOLS_MARQUEE: ToolLogoItem[] = [
  { name: "Wix Studio", category: "No-Code" },
  { name: "Squarespace", category: "No-Code" },
  { name: "WordPress", category: "CMS" },
  { name: "Webflow", category: "Visual Dev" },
  { name: "Shopify", category: "Commerce" },
  { name: "Framer", category: "Interactive" },
  { name: "Figma", category: "UI/UX" },
  { name: "React", category: "Engineering" },
  { name: "Next.js", category: "Full-Stack" },
  { name: "Mailchimp", category: "Email" },
  { name: "Klaviyo", category: "Retention" },
  { name: "AI Video Suite", category: "Motion" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    subtitle: "Clarity before pixels",
    description:
      "We align on goals, audience, platform constraints, and whether solo focus or a vetted pod fits your timeline best. You leave kickoff with a clear scope and zero guesswork.",
    deliverables: [
      "30-min discovery & goal mapping",
      "Platform & solo/team scope recommendation",
      "Site architecture, wireframes & milestone calendar",
    ],
  },
  {
    index: "02",
    title: "Design & Build",
    subtitle: "Craft meets momentum",
    description:
      "Visual direction, interactive prototypes, clean development, and supporting assets happen in structured weekly drops with async Loom walkthroughs you can review anytime.",
    deliverables: [
      "Custom UI/UX & motion prototyping",
      "Responsive code or clean no-code implementation",
      "Brand, email, or AI video assets built in parallel",
    ],
  },
  {
    index: "03",
    title: "Launch & Grow",
    subtitle: "Built to perform on day one",
    description:
      "Every deliverable goes through mobile QA, accessibility checks, SEO metadata setup, and speed tuning — followed by a smooth handover or ongoing growth sprints.",
    deliverables: [
      "375px–1920px QA, Lighthouse & SEO polish",
      "Custom editor walkthrough videos for your team",
      "Optional post-launch email, CRO & video iteration",
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t-1",
    quote:
      "Working directly with [YOUR NAME] felt effortless. Our new Webflow site went live in three weeks, loads instantly on mobile, and demo bookings jumped the very first month.",
    author: "Elena Vance",
    role: "Co-Founder",
    company: "Kinetik Financial",
    source: "Direct Client",
    projectType: "Website & Motion",
  },
  {
    id: "t-2",
    quote:
      "Ordered a full brand + Squarespace build and got agency-caliber execution without the bloated layers. Communication was sharp from day one and revisions were handled overnight.",
    author: "Marcus Thorne",
    role: "Managing Director",
    company: "Vespera Botanicals",
    source: "Upwork",
    projectType: "Branding + Squarespace",
  },
  {
    id: "t-3",
    quote:
      "Five stars doesn't cover it. [YOUR NAME] redesigned our SaaS onboarding in Figma and delivered clean component tokens our engineers shipped the same sprint.",
    author: "Priya Nair",
    role: "Head of Product",
    company: "Pulseboard",
    source: "Fiverr",
    projectType: "UI/UX Design System",
  },
  {
    id: "t-4",
    quote:
      "The Klaviyo flow overhaul paid for itself within three weeks. The templates look editorial on dark and light clients and our repeat coffee orders climbed 42%.",
    author: "Daniel Sato",
    role: "Founder",
    company: "Sora Roastery",
    source: "Direct Client",
    projectType: "Email Marketing",
  },
  {
    id: "t-5",
    quote:
      "Bringing in [YOUR NAME]'s vetted motion artist alongside our web rebuild saved us two vendors and delivered a launch film that outperformed every paid ad we ran last year.",
    author: "Hannah Lindqvist",
    role: "VP Growth",
    company: "Aether Labs",
    source: "Upwork",
    projectType: "Team Pod · Web & AI Video",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "pricing",
    tag: "Pricing",
    question: "How do you price solo projects versus team projects?",
    answer:
      "Most builds are scoped on a transparent fixed project fee tied to deliverables rather than unpredictable hourly billing. Focused solo engagements (such as a landing page, UI audit, email kit, or single-platform site) start under $2K, while multi-discipline launches involving my vetted team are quoted upfront per milestone.",
  },
  {
    id: "timelines",
    tag: "Timelines",
    question: "How quickly can we kick off and launch?",
    answer:
      "Solo design or no-code sprints typically turn around in 1 to 4 weeks. Larger custom websites, full brand identities, or parallel team launches (web + email + AI video) take 3 to 8 weeks depending on feedback speed and scope.",
  },
  {
    id: "revisions",
    tag: "Revisions",
    question: "How do revisions and feedback rounds work?",
    answer:
      "Every milestone includes dedicated structured revision rounds plus async Loom walkthroughs so nothing gets lost in long threads. Because we align on wireframes and visual direction before full buildout, revisions focus on sharpening details rather than redoing foundations.",
  },
  {
    id: "team",
    tag: "Working with a team",
    question: "Who is on your team if my project needs extra specialists?",
    answer:
      "When a project benefits from parallel expertise, I tap a trusted roster of senior freelancers I have shipped with repeatedly — including a brand/UI designer, full-stack & no-code developer, motion/AI video artist, conversion copywriter, and email specialist. You still work through [YOUR NAME] as one clear lead.",
  },
  {
    id: "platforms",
    tag: "Platforms",
    question: "Which platforms do you build on — custom code or no-code?",
    answer:
      "Both. I recommend what fits your goals and internal team best: Next.js/React for bespoke performance and custom web apps, or Webflow, WordPress, Wix Studio, Squarespace, Shopify, and Framer when your marketing team wants visual day-to-day control.",
  },
];
