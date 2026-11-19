export interface EngagementModel {
  id: "solo" | "team";
  label: string;
  badge: string;
  headline: string;
  summary: string;
  howItWorks: string[];
  typicalScope: string;
  speedLabel: string;
  idealFor: string;
}

export interface TeamRole {
  title: string;
  focus: string;
  tools: string;
}

export interface StatItem {
  value: number;
  decimals?: number;
  padLength?: number;
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
  country: string;
  projectType: string;
  source: "Review from Fiverr" | "Review from Upwork";
  price?: string;
  duration?: string;
  metaNote?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export const HERO_COPY = {
  availabilityLabel: "Taking on new projects · Replies within 1 hour",
  headline: "Websites, brands, AI automation and video that turn visitors into clients.",
  subhead:
    "Digital Experts is a remote studio with over 6 years experience and 25+ specialists across Wix, Squarespace, WordPress, Webflow and custom React code — plus AI automation, UI/UX, branding, 2D/3D animation, illustration, video editing, email and AI video.",
  primaryCta: "Start your project",
  secondaryCta: "Book a 30-minute call",
  canvasHint: "Hold to ripple · Press and hold the lines",
  trustHeading: "Over 6 years active · 25+ team",
  trustItems: [
    "200+ Fiverr orders · 4.7 rating (57 reviews)",
    "100+ clients · 416 Upwork hours",
    "Replies within 1 hour",
  ],
  nameClarityLine:
    "You may know us as Isaac Clara on Fiverr or Jumat Bello on Upwork. Same studio, same standards.",
  nameClarityCta: "See how it fits together",
};

export const INTRO_COPY = {
  eyebrow: "01 · About Digital Experts",
  statement:
    "Over 6 years of delivery with a 25+ specialist remote team. Digital Experts helps founders and growing businesses launch sharp websites on Wix, Squarespace, WordPress, Webflow or custom React code — paired with AI automation, UI/UX, branding, 2D/3D animation, illustration, video editing, email marketing and AI video.",
  ctaLabel: "More about us",
};

export const ENGAGEMENT_MODELS: Record<"solo" | "team", EngagementModel> = {
  solo: {
    id: "solo",
    label: "Work with one expert",
    badge: "Direct · 1-on-1",
    headline: "Jumat directly — fast, focused, one-to-one.",
    summary:
      "Small project? You work directly with one specialist from kickoff to launch. Communication is direct and one-to-one with a fixed quote based on scope.",
    howItWorks: [
      "Direct and one-to-one communication with Jumat Bello from day one.",
      "Fixed quote based on scope agreed in writing before work starts.",
      "One person focused cleanly on your project from wireframe to launch.",
    ],
    typicalScope:
      "Landing pages, single-site builds on Wix, Squarespace or WordPress, logos, email setup.",
    speedLabel: "One person focused on your project",
    idealFor: "Founders and small businesses needing rapid, single-track delivery.",
  },
  team: {
    id: "team",
    label: "Work with the team",
    badge: "25+ Specialists Pod",
    headline: "25+ specialists backing your project with one point of contact.",
    summary:
      "Bigger build? We pull in specialists from our 25+ member team — designers, developers, AI automation engineers, 2D/3D animators, illustrators, video editors and email experts — working in parallel while you talk to one lead.",
    howItWorks: [
      "One point of contact who coordinates our 25+ specialist roster for you.",
      "Work happens in parallel across web, AI automation, branding, 2D/3D, editing, email & AI video.",
      "Fixed quote with a clear breakdown by role before work begins.",
    ],
    typicalScope:
      "Full websites with AI automation, SaaS launches, e-commerce brands, multi-channel ad & video campaigns.",
    speedLabel: "25+ specialists · Parallel delivery",
    idealFor: "Multi-track launches, growing businesses and agency partners.",
  },
};

export const TEAM_ROLES: TeamRole[] = [
  {
    title: "Web & UI/UX Designer",
    focus: "Clear user flows, wireframes & high-fidelity Figma screens",
    tools: "Figma · Prototypes",
  },
  {
    title: "Front-End & Back-End Developer",
    focus: "Custom React, Next.js, APIs, forms, bookings & deployments",
    tools: "React · Next.js · APIs",
  },
  {
    title: "No-Code Platform Specialist",
    focus: "Wix Studio, Squarespace, WordPress, WooCommerce & Webflow",
    tools: "Wix · WP · Webflow",
  },
  {
    title: "AI Automation Engineer",
    focus: "AI chatbots, n8n/Make/Zapier workflows, CRM sync & API agents",
    tools: "n8n · Make · AI APIs",
  },
  {
    title: "Graphic Designer & Illustrator",
    focus: "Logos, brand guidelines, custom illustrations & social ad creative",
    tools: "Identity · Illustration",
  },
  {
    title: "2D/3D Animator & Video Editor",
    focus: "2D/3D animation, product renders, YouTube & commercial editing",
    tools: "2D/3D · Post-Production",
  },
  {
    title: "AI Video Producer",
    focus: "AI short movies, AI UGC, product commercials, product ads & YouTube",
    tools: "AI Video · Ads · Films",
  },
  {
    title: "Email Specialist",
    focus: "Responsive templates, lifecycle flows & segmentation",
    tools: "Mailchimp · Klaviyo · HubSpot",
  },
];

export const STATS: StatItem[] = [
  {
    value: 200,
    padLength: 3,
    suffix: "+",
    label: "Orders completed",
    detail: "Delivered on Fiverr across websites, fixes, deployments and creative builds.",
  },
  {
    value: 100,
    padLength: 3,
    suffix: "+",
    label: "Unique clients",
    detail: "Founders, small businesses and partner agencies served remotely worldwide.",
  },
  {
    value: 4.7,
    decimals: 1,
    suffix: "",
    label: "Average rating",
    detail: "Verified 4.7 rating from 57 client reviews on Fiverr (Isaac Clara).",
  },
  {
    value: 416,
    padLength: 3,
    suffix: "",
    label: "Hours worked on Upwork",
    detail: "Across 16 Upwork jobs alongside direct studio engagements.",
  },
];

export const TOOLS_MARQUEE: ToolLogoItem[] = [
  { name: "Wix", category: "No-Code" },
  { name: "Squarespace", category: "No-Code" },
  { name: "WordPress", category: "CMS" },
  { name: "Webflow", category: "Visual Dev" },
  { name: "Shopify", category: "Commerce" },
  { name: "Figma", category: "UI/UX" },
  { name: "React", category: "Front-End" },
  { name: "Next.js", category: "Full-Stack" },
  { name: "Make & n8n", category: "AI Automation" },
  { name: "2D & 3D Animation", category: "Motion" },
  { name: "Illustration", category: "Custom Art" },
  { name: "Video Editing", category: "Post-Prod" },
  { name: "AI Video Tools", category: "AI Video" },
  { name: "Mailchimp", category: "Email" },
  { name: "Klaviyo", category: "Retention" },
  { name: "HubSpot", category: "CRM & Email" },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    subtitle: "Reply within 1 hour · Scope & price",
    description:
      "We reply within 1 hour, learn your goals, audience and deadline, then agree scope and price in writing before work starts.",
    deliverables: [
      "Response within 1 hour + 30-minute Calendly scope call",
      "Honest platform, AI automation & solo-or-team recommendation",
      "Written scope, timeline and fixed quote",
    ],
  },
  {
    index: "02",
    title: "Design and build",
    subtitle: "Progress at milestones",
    description:
      "We design the pages, configure automations or animate and edit video — sharing progress at milestones so there are no surprises.",
    deliverables: [
      "Wireframes, visual direction or storyboards",
      "Custom code, no-code, AI workflows or 2D/3D motion",
      "Milestone check-ins and revision rounds",
    ],
  },
  {
    index: "03",
    title: "Launch and grow",
    subtitle: "Tested & handed over",
    description:
      "We test on every device, launch, hand over training and stay available for updates, automation tuning and ongoing creative.",
    deliverables: [
      "Cross-device QA, speed & SEO foundation checks",
      "Short training videos so you can edit on your own",
      "Ongoing support for updates, AI automation, 2D/3D, editing & AI video",
    ],
  },
];

// Verbatim client reviews from the verified Fiverr profile (no paraphrasing or invented quotes)
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "rev-erantoine",
    quote:
      "I can give nothing but 5 Stars. I have used them on several projects. They are now building a very big and complex web app for me. HIGHLY RECOMMENDED BY ME!!",
    author: "erantoine",
    country: "United States",
    projectType: "Deployments & DevOps · 5 weeks",
    source: "Review from Fiverr",
    price: "$1,000–$2,500",
  },
  {
    id: "rev-muamer9987",
    quote:
      "Did a phenomenal job. Created exactly what I needed and the website looks amazing. 10/10 would recommend and will work with him again in the future.",
    author: "muamer9987",
    country: "United States",
    projectType: "Custom Websites · 11 days",
    source: "Review from Fiverr",
    price: "$400–$600",
    metaNote: "Ongoing collaboration",
  },
  {
    id: "rev-otttepanda",
    quote:
      "clara has gone above and beyond for what ive wanted in my website, she has put in the time and effort for when ive needed it in a rush, id highly recommend her. she has helped me so much and im happy i reached out to her and shes given me the results i didnt expect :)!",
    author: "otttepanda",
    country: "United Kingdom",
    projectType: "Website Design & Build",
    source: "Review from Fiverr",
  },
  {
    id: "rev-nelboyd",
    quote:
      "Isaac was able to do everything I needed for my website. He's knowledgeable and was courteous and professional. He integrated everything seamlessly. I'd definitely work with him again.",
    author: "nelboyd",
    country: "United States",
    projectType: "Website Builders Design · 7 days",
    source: "Review from Fiverr",
    price: "$50–$100",
  },
  {
    id: "rev-hanlou246",
    quote:
      "Isaac was excellent at communicating. He responded to my queries very quickly. I am very pleased with his work. He really knows his stuff and helped me make my brand look much more professional. Thank you very much Isaac.- very much appreciated.",
    author: "hanlou246",
    country: "United Kingdom",
    projectType: "Website Builders Design · 7 days",
    source: "Review from Fiverr",
    price: "$50",
  },
  {
    id: "rev-humblecakes",
    quote: "one of the best gigs I've worked with on fiverr, thanks",
    author: "humblecakes",
    country: "United Kingdom",
    projectType: "Website Builders Design · 3 days",
    source: "Review from Fiverr",
    price: "$50–$100",
  },
  {
    id: "rev-jmstout",
    quote: "amazing to work with",
    author: "Jmstout",
    country: "United States",
    projectType: "Custom Websites · 2 days",
    source: "Review from Fiverr",
    price: "$1,000–$2,500",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "names-who-is-who",
    tag: "Names",
    question: "Why do I see the names Isaac Clara and Jumat Bello?",
    answer:
      "They are the same studio. Digital Experts is the team. Jumat Bello is the founder and the name used on Upwork. Isaac Clara is the brand built on Fiverr over the years, and the Fiverr inbox is looked after by assistant Clara so messages get quick replies. The work is delivered by Digital Experts whichever profile you found.",
  },
  {
    id: "solo-or-team",
    tag: "Team",
    question: "Do you work alone or with a team?",
    answer:
      "Both. Digital Experts has over 6 years of delivery experience and a remote team of 25+ specialists. Small projects can be handled one-to-one with Jumat directly, while larger builds bring in specialist developers, UI/UX designers, AI automation engineers, 2D/3D animators, illustrators, video editors and email specialists — all through one point of contact.",
  },
  {
    id: "platform-choice",
    tag: "Platforms",
    question:
      "Which platform is best for my website: Wix, Squarespace, WordPress, Webflow or custom code?",
    answer:
      "It depends on your goals and budget. Wix and Squarespace suit fast, affordable, easy-to-edit sites. WordPress suits content-heavy sites and online stores. Webflow gives designers fine control over layout and motion. Custom code suits products with unique features. We will recommend the simplest option that meets your needs.",
  },
  {
    id: "pricing",
    tag: "Pricing",
    question: "How much does a website cost?",
    answer:
      "It depends on the number of pages, the platform and any custom features. We give a fixed written quote after a short conversation, so you know the price before work begins.",
  },
  {
    id: "timelines",
    tag: "Timelines",
    question: "How long does a project take?",
    answer:
      "Timelines depend on scope and platform — from focused multi-day landing page builds to multi-week custom web apps and team launches. We agree the timeline in writing before we start.",
  },
  {
    id: "self-editing",
    tag: "Handover",
    question: "Can I edit the website myself afterwards?",
    answer:
      "Yes. We build on platforms and structures you can manage, and we show you how to update text, images and pages with short training videos.",
  },
  {
    id: "redesign-migrate",
    tag: "Migrations",
    question: "Can you redesign or move my existing website?",
    answer:
      "Yes. We can redesign a site on its current platform or migrate it between Wix, Squarespace, WordPress and Webflow, keeping your content and your search rankings in mind.",
  },
  {
    id: "getting-started",
    tag: "Kickoff",
    question: "What do you need from me to start?",
    answer:
      "Your goals, your logo and brand colours if you have them, any content you already have, and examples of sites you like. If you do not have content yet, we can help plan it.",
  },
  {
    id: "fiverr-upwork-orders",
    tag: "Marketplaces",
    question: "Can I still order through Fiverr or Upwork?",
    answer:
      "Yes. If you found us there you can keep working with us there. New enquiries from this website go through the contact form or a booked call.",
  },
  {
    id: "timezones",
    tag: "Remote",
    question: "Do you work with clients in my country and time zone?",
    answer:
      "Yes. We are fully remote and work with clients in any time zone, with set times for calls and updates so you are never waiting in the dark.",
  },
  {
    id: "ai-video-included",
    tag: "AI Video & Editing",
    question: "What types of AI video, 2D/3D animation and video editing do you handle?",
    answer:
      "We produce AI short movies, AI UGC videos, product commercials, paid product ads and YouTube videos — including scripts, storyboards, AI scenes, voiceover, 2D/3D animation, custom illustration, full video editing, colour grading, captions and sound in platform-ready formats.",
  },
  {
    id: "ai-automation-included",
    tag: "AI Automation",
    question: "What can you automate with AI workflows?",
    answer:
      "We build AI website chat assistants, lead capture and Calendly qualification flows, CRM and email syncs, and custom workflows using Make, n8n, Zapier and LLM APIs — so enquiries get fast answers and repetitive manual tasks run automatically.",
  },
];
