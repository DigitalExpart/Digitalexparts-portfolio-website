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
    relatedSlugs: ["wix-squarespace-wordpress-webflow", "ui-ux-design"],
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
    shortTag: "Logos · Identity · Social Creative",
    seoTitle: "Graphic Design & Branding Services | Digital Experts",
    seoDescription:
      "Logos, brand identity, social media graphics and marketing materials that make your business look credible and stay consistent everywhere.",
    pageH1: "Graphic design and branding that makes your business look credible",
    pageTagline: "A look your customers remember and trust.",
    description:
      "Logos, identity and social creative that stay consistent everywhere.",
    intro:
      "We create logos, brand identities and everyday marketing graphics that work together, so every touchpoint looks like it comes from one confident business.",
    bestFor:
      "New businesses and established brands that need a fresh, consistent look.",
    capabilities: [
      "Logo design",
      "Colours, typography and brand guidelines",
      "Social media templates and ad creative",
      "Pitch decks and presentations",
      "Print-ready files",
    ],
    relatedSlugs: ["ui-ux-design", "ai-video-production"],
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
    relatedSlugs: ["wix-squarespace-wordpress-webflow", "ai-video-production"],
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
    shortTag: "Ads · Explainers · Social Clips",
    seoTitle: "AI Video Production for Ads & Social | Digital Experts",
    seoDescription:
      "AI-generated video ads, explainers and social clips, scripted, edited and captioned for your brand. Fast turnaround, no film crew needed.",
    pageH1: "AI video that makes your brand look bigger without a film crew",
    pageTagline: "Scroll-stopping video without the film crew.",
    description:
      "Short ads, explainers and social clips, scripted, generated and edited for your brand.",
    intro:
      "We turn your idea or script into scroll-stopping video using AI tools, then edit, caption and format it for each platform.",
    bestFor:
      "Brands, store owners and agencies that need a steady stream of short video.",
    capabilities: [
      "Script and storyboard",
      "AI scenes, characters and voiceover",
      "UGC-style product ads",
      "Editing, captions, music and sound",
      "Formats for Instagram, TikTok, YouTube and paid ads",
      "Batch production for ongoing campaigns",
    ],
    relatedSlugs: ["graphic-design-branding", "email-marketing"],
    contactOption: "AI video",
    previewImage: "/images/projects/aether-robotics.jpg",
    previewAlt: "AI-generated brand commercial visual frame by Digital Experts",
    accentLabel: "Fast turnaround, no crew needed",
  },
];
