export interface ServiceItem {
  id: string;
  slug: string;
  index: string;
  title: string;
  shortTag: string;
  seoTitle: string;
  seoDescription: string;
  pageH1: string;
  pageTagline: string;
  description: string;
  intro: string;
  bestFor: string;
  capabilities: string[];
  relatedSlugs: [string, string];
  contactOption: string;
  previewImage: string;
  previewAlt: string;
  accentLabel: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    slug: "web-design-development",
    index: "01",
    title: "Website Design & Development",
    shortTag: "React · Next.js · WordPress",
    seoTitle: "Web Design & Development Services | Digital Experts",
    seoDescription:
      "Custom website design and development in React, Next.js and WordPress. Fast, mobile-friendly sites built to rank and convert. Get a quote.",
    pageH1: "Website design and development that brings in customers",
    pageTagline: "Fast, custom websites built to be found and built to convert.",
    description:
      "Custom sites in React and Next.js, built fast, accessible and ready to be found.",
    intro:
      "We design and build fast, mobile-friendly websites in React, Next.js and WordPress, with clean code, solid SEO foundations and a structure you can grow.",
    bestFor:
      "Businesses that have outgrown a template or need a custom feature.",
    capabilities: [
      "Custom front end and back end development",
      "WordPress themes and headless CMS",
      "Responsive design for every device",
      "Speed, accessibility and on-page SEO setup",
      "Forms, bookings, payments and integrations",
      "Launch support and ongoing maintenance",
    ],
    relatedSlugs: ["web-design-development", "ai-automation"],
    contactOption: "Website design and development",
    previewImage: "/images/projects/kinetik-pay.jpg",
    previewAlt: "Custom React and Next.js website interface built by Digital Experts",
    accentLabel: "React, Next.js & custom builds",
  },
  {
    id: "nocode",
    slug: "wix-squarespace-wordpress-webflow",
    index: "02",
    title: "No-Code Website Builds",
    shortTag: "Wix · Squarespace · WordPress · Webflow",
    seoTitle: "Wix, Squarespace & Webflow Expert | Digital Experts",
    seoDescription:
      "Hire a Wix, Squarespace, WordPress and Webflow expert. Professional no-code websites that look custom, load fast and are easy for you to edit.",
    pageH1: "Wix, Squarespace, WordPress and Webflow websites built by an expert",
    pageTagline: "Wix, Squarespace, WordPress and Webflow, done properly.",
    description:
      "Wix, Squarespace, WordPress and Webflow sites that look custom and stay easy to edit.",
    intro:
      "Not every project needs custom code. We build polished sites on the platform that fits your budget and your team, then show you how to update them yourself.",
    bestFor:
      "Founders and small businesses who want a professional site quickly and want to manage it themselves.",
    capabilities: [
      "An honest platform recommendation",
      "Custom design beyond the template",
      "Wix and Wix Studio builds",
      "Squarespace design and styling",
      "WordPress themes, plugins and WooCommerce",
      "Webflow builds with interactions and CMS",
      "Migration between platforms",
      "Training videos so you can edit on your own",
    ],
    relatedSlugs: ["web-design-development", "ui-ux-design"],
    contactOption: "Wix, Squarespace, WordPress or Webflow build",
    previewImage: "/images/projects/northline-logistics.jpg",
    previewAlt: "Wix, Squarespace, WordPress and Webflow site build showcase",
    accentLabel: "Easy for your team to edit",
  },
  {
    id: "ui-ux",
    slug: "ui-ux-design",
    index: "03",
    title: "UI/UX Design",
    shortTag: "Figma · Flows · Prototypes",
    seoTitle: "UI/UX Design Services for Websites & Apps | Digital Experts",
    seoDescription:
      "Clear user flows, wireframes and high-fidelity Figma designs for websites and apps, with clickable prototypes ready for development.",
    pageH1: "UI/UX design that makes your website or app easy to use",
    pageTagline: "Design people understand at a glance.",
    description:
      "Clear flows and polished screens, signed off with you before anything is built.",
    intro:
      "Good design guides people to act. We map the user journey, design every screen in Figma and hand over files developers can build from.",
    bestFor:
      "Startups, product teams and agencies that need design before a build.",
    capabilities: [
      "User flows and sitemaps",
      "Wireframes",
      "High-fidelity screens for desktop and mobile",
      "Design systems and component libraries",
      "Clickable prototypes",
      "Developer handoff",
    ],
    relatedSlugs: ["web-design-development", "graphic-design-branding"],
    contactOption: "UI/UX design",
    previewImage: "/images/projects/pulseboard-crm.jpg",
    previewAlt: "High-fidelity Figma UI/UX product screens designed by Digital Experts",
    accentLabel: "Clickable Figma systems",
  },
  {
    id: "branding",
    slug: "graphic-design-branding",
    index: "04",
    title: "Graphic Design & Branding",
    shortTag: "Logos · Identity · Illustration · Social",
    seoTitle: "Graphic Design, Illustration & Branding Services | Digital Experts",
    seoDescription:
      "Logos, brand identity, custom illustrations, social media graphics and marketing materials that make your business credible and consistent everywhere.",
    pageH1: "Graphic design and branding that makes your business look credible",
    pageTagline: "A look your customers remember and trust.",
    description:
      "Logos, brand identity, illustrations and social creative that stay consistent everywhere.",
    intro:
      "We create logos, brand identities, custom illustrations and everyday marketing graphics that work together, so every touchpoint looks like it comes from one confident business.",
    bestFor:
      "New businesses and established brands that need a fresh, consistent look.",
    capabilities: [
      "Logo design and visual systems",
      "Colours, typography and brand guidelines",
      "Custom brand illustrations & social icons",
      "Social media templates and ad creative",
      "Pitch decks and presentations",
      "Print-ready files",
    ],
    relatedSlugs: ["2d-3d-animation-illustration-video-editing", "ui-ux-design"],
    contactOption: "Graphic design and branding",
    previewImage: "/images/projects/vespera-atelier.jpg",
    previewAlt: "Brand identity and packaging visual direction by Digital Experts",
    accentLabel: "Cohesive across every channel",
  },
  {
    id: "email",
    slug: "email-marketing",
    index: "05",
    title: "Email Marketing",
    shortTag: "Mailchimp · Klaviyo · HubSpot",
    seoTitle: "Email Marketing Design & Automation | Digital Experts",
    seoDescription:
      "Responsive email templates, welcome sequences and automated flows built in Mailchimp, Klaviyo and HubSpot to bring customers back.",
    pageH1: "Email marketing that gets opened, clicked and remembered",
    pageTagline: "Emails that earn the open, the click and the sale.",
    description:
      "Templates, automations and campaigns built in Mailchimp, Klaviyo and HubSpot.",
    intro:
      "We design and build emails that look right on every device and set up the automations that keep selling after you hit send.",
    bestFor:
      "Online stores and service businesses with an email list they are not using well.",
    capabilities: [
      "Responsive email design and coding",
      "Welcome, abandoned cart and re-engagement flows",
      "Newsletter design",
      "List segmentation setup",
      "Platform setup in your email tool",
      "Testing, reporting and improvement ideas",
    ],
    relatedSlugs: ["ai-automation", "ai-video-production"],
    contactOption: "Email marketing",
    previewImage: "/images/projects/sora-roastery.jpg",
    previewAlt: "Responsive email marketing campaign preview by Digital Experts",
    accentLabel: "Lifecycle flows & campaigns",
  },
  {
    id: "ai-video",
    slug: "ai-video-production",
    index: "06",
    title: "AI Video Production",
    shortTag: "Short Movies · AI UGC · Product Ads · YouTube",
    seoTitle: "AI Video Production: Short Movies, AI UGC & Product Ads | Digital Experts",
    seoDescription:
      "AI short movies, AI UGC, product commercials, product ads, explainers and YouTube videos — scripted, generated, edited and captioned by Digital Experts.",
    pageH1: "AI short movies, UGC, product commercials and YouTube video without a film crew",
    pageTagline: "Short movies, AI UGC, commercials, YouTube & editing.",
    description:
      "AI short movies, AI UGC, product commercials, product ads and YouTube videos, scripted and edited end-to-end.",
    intro:
      "We turn your idea or script into scroll-stopping video — covering AI short movies, AI UGC ads, studio-look product commercials, paid product ads, YouTube videos and social reels, fully edited, voiced and captioned.",
    bestFor:
      "Brands, store owners, creators and agencies shipping commercials, AI UGC, short movies and YouTube video fast.",
    capabilities: [
      "AI short movies & narrative film storytelling",
      "AI UGC videos & creator-style talking ads",
      "Product commercials & high-converting product ads",
      "YouTube videos, explainers & social shorts",
      "Full video editing, captions, colour, music & sound",
      "Multi-platform formatting and batch campaign production",
    ],
    relatedSlugs: ["2d-3d-animation-illustration-video-editing", "ai-automation"],
    contactOption: "AI video (short movies, UGC, ads & YouTube)",
    previewImage: "/images/projects/aether-robotics.jpg",
    previewAlt: "AI-generated brand commercial and short movie frame by Digital Experts",
    accentLabel: "Short movies, UGC, ads & YouTube",
  },
  {
    id: "animation-editing",
    slug: "2d-3d-animation-illustration-video-editing",
    index: "07",
    title: "2D/3D Animation, Illustration & Video Editing",
    shortTag: "2D Motion · 3D Renders · Art · Video Editing",
    seoTitle: "2D & 3D Animation, Illustration & Video Editing | Digital Experts",
    seoDescription:
      "Custom 2D animation, 3D product animation, bespoke illustration and professional YouTube & commercial video editing by our specialist studio team.",
    pageH1: "2D & 3D animation, custom illustration and sharp video editing",
    pageTagline: "Bespoke motion, illustration and post-production editing.",
    description:
      "2D motion graphics, 3D product renders, custom illustrations and full commercial or YouTube editing.",
    intro:
      "Our specialist animators, illustrators and video editors craft custom 2D/3D motion, original brand illustrations and tightly paced edits for YouTube, product launches and paid campaigns.",
    bestFor:
      "Product teams, YouTube channels and growing brands wanting custom visuals and reliable post-production.",
    capabilities: [
      "2D animation, explainers, motion graphics & logo stings",
      "3D animation, product showcases & camera flythroughs",
      "Custom 2D/3D illustration, characters & editorial art",
      "Video editing for YouTube, commercials, podcasts & reels",
      "Colour grading, sound design, captions & pacing",
      "Lottie/web-ready animations & campaign cutdowns",
    ],
    relatedSlugs: ["ai-video-production", "graphic-design-branding"],
    contactOption: "2D/3D animation, illustration & video editing",
    previewImage: "/images/projects/vespera-atelier.jpg",
    previewAlt: "Custom 2D and 3D animation, illustration and editing direction by Digital Experts",
    accentLabel: "2D/3D motion, art & editing",
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    index: "08",
    title: "AI Automation & Workflows",
    shortTag: "AI Agents · Make · n8n · Zapier · APIs",
    seoTitle: "AI Automation & Workflow Integrations | Digital Experts",
    seoDescription:
      "AI automation, website chatbots, lead qualification and custom Make, n8n, Zapier & API workflows that save your business hours every week.",
    pageH1: "AI automation that captures leads and eliminates repetitive busywork",
    pageTagline: "Practical AI workflows wired into your website and CRM.",
    description:
      "AI chatbots, lead routing, CRM sync and Make/n8n/Zapier automations tailored to your stack.",
    intro:
      "We connect your website, forms, calendar and CRM using reliable AI agents and workflow automation, so every enquiry gets an instant response and manual copy-pasting disappears.",
    bestFor:
      "Founders, service businesses and online stores automating lead handling, customer support and internal operations.",
    capabilities: [
      "AI website chat assistants & lead qualification bots",
      "Make, n8n and Zapier multi-step workflows",
      "CRM, Calendly, form & Slack/email automations",
      "Custom OpenAI & LLM API integrations in Next.js or backends",
      "Automated client onboarding & follow-up sequences",
      "Clean handover documentation and error alerts",
    ],
    relatedSlugs: ["web-design-development", "email-marketing"],
    contactOption: "AI automation and workflows",
    previewImage: "/images/projects/pulseboard-crm.jpg",
    previewAlt: "AI automation workflow and connected dashboard system built by Digital Experts",
    accentLabel: "AI bots, APIs & Make/n8n flows",
  },
];
