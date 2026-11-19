export interface NavItem {
  index: string;
  label: string;
  href: string;
  description: string;
}

export interface ExternalProfile {
  label: string;
  href: string;
  handle?: string;
}

export const SITE = {
  brand: "Digital Experts",
  brandUpper: "DIGITAL EXPERTS",
  alternateName: "Digital Exparts",
  owner: "Jumat Bello",
  fiverrBrand: "Isaac Clara",
  fiverrAssistant: "Clara",
  email: "digita.exparts@gmail.com",
  yearsExperience: "over 6 years",
  yearsExperienceShort: "6+ years",
  teamSize: "25+ specialists",
  responseTime: "1 hour",
  timezoneNote: "Fully remote · Replies within 1 hour across all time zones",
  calendlyUrl: "https://calendly.com/digitalexparts/30min",
  fiverrUrl: "https://www.fiverr.com/clara_success?public_mode=true",
  upworkUrl: "https://www.upwork.com/freelancers/~01e12863196bfb5563?mp_source=share",
  behanceUrl: "https://www.behance.net/bellojumato",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://digital-exparts.example.com",
  tagline: "Websites, mobile apps, AI automation and video that turn visitors into clients.",
  shortLockup: "Web · Mobile Apps · AI · 2D/3D · Video",
  nameLine:
    "Digital Experts is the studio of Jumat Bello, also known as Isaac Clara on Fiverr.",
  description:
    "Remote studio (6+ years, 25+ team) for websites (Next.js, React, Wix, WordPress, Webflow), iOS & Android mobile apps, AI automation, 2D/3D animation & AI video.",
  availability: {
    active: true,
    label: "Taking on new projects",
  },
  proof: {
    fiverrOrders: "200+",
    fiverrClients: "100+",
    fiverrReviews: "57",
    fiverrRating: "4.7",
    upworkJobs: "16",
    upworkHours: "416",
  },
} as const;

export const NAV_LINKS: NavItem[] = [
  {
    index: "01",
    label: "Home",
    href: "/",
    description: "Websites, brands & AI video overview",
  },
  {
    index: "02",
    label: "Work",
    href: "/work",
    description: "Real projects, UI/UX concepts & results",
  },
  {
    index: "03",
    label: "Services",
    href: "/services",
    description: "Web, mobile apps, AI automation, 2D/3D & video",
  },
  {
    index: "04",
    label: "How we work",
    href: "/how-we-work",
    description: "Hire one solo expert or a 25+ specialist team",
  },
  {
    index: "05",
    label: "About",
    href: "/about",
    description: "Who is who: Jumat Bello & Isaac Clara",
  },
  {
    index: "06",
    label: "FAQ",
    href: "/faq",
    description: "Clear answers on scope, pricing & timelines",
  },
  {
    index: "07",
    label: "Contact",
    href: "/contact",
    description: "Start your project or book a 30-minute call",
  },
];

export const PLATFORM_PROFILES: ExternalProfile[] = [
  {
    label: "Fiverr",
    href: SITE.fiverrUrl,
    handle: "4.7 rating · 57 reviews",
  },
  {
    label: "Upwork",
    href: SITE.upworkUrl,
    handle: "16 jobs · 416 hours",
  },
];

export const SOCIAL_LINKS: ExternalProfile[] = [
  { label: "LinkedIn", href: "[LINKEDIN URL]" },
  { label: "Behance", href: SITE.behanceUrl },
  { label: "Dribbble", href: "[DRIBBBLE URL]" },
  { label: "X / Twitter", href: "[X URL]" },
];

export function isPlaceholderHref(href: string): boolean {
  return href.includes("[") && href.includes("]");
}
