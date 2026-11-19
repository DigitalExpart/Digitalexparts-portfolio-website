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
  brand: "Digital Expert",
  brandUpper: "DIGITAL EXPERT",
  owner: "[YOUR NAME]",
  email: "[YOUR EMAIL]",
  location: "[LOCATION]",
  timezoneNote: "Remote · Serving clients worldwide",
  calendlyUrl: "[CALENDLY URL]",
  fiverrUrl: "https://www.fiverr.com/clara_success?public_mode=true",
  upworkUrl: "https://www.upwork.com/freelancers/~01e12863196bfb5563?mp_source=share",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://digital-expert.example.com",
  tagline: "One-stop digital partner — solo speed or a vetted team.",
  description:
    "Digital Expert is a remote digital studio led by [YOUR NAME], delivering websites, no-code builds, UI/UX, branding, email marketing, and AI video production worldwide.",
  availability: {
    active: true,
    label: "Available for projects",
  },
} as const;

export const NAV_LINKS: NavItem[] = [
  {
    index: "01",
    label: "Home",
    href: "/",
    description: "Overview, capabilities & solo/team engagement",
  },
  {
    index: "02",
    label: "Work",
    href: "/work",
    description: "Selected websites, brands, email & AI video",
  },
  {
    index: "03",
    label: "Services",
    href: "/services",
    description: "Six disciplines across code, no-code & creative",
  },
  {
    index: "04",
    label: "About",
    href: "/about",
    description: "Meet [YOUR NAME] & how the vetted team scales",
  },
  {
    index: "05",
    label: "Contact",
    href: "/contact",
    description: "Start a project brief or book a 30-minute call",
  },
];

export const PLATFORM_PROFILES: ExternalProfile[] = [
  {
    label: "Fiverr",
    href: SITE.fiverrUrl,
    handle: "Top-tier packages",
  },
  {
    label: "Upwork",
    href: SITE.upworkUrl,
    handle: "Direct contracts",
  },
];

export const SOCIAL_LINKS: ExternalProfile[] = [
  { label: "LinkedIn", href: "[LINKEDIN URL]" },
  { label: "X / Twitter", href: "[X URL]" },
  { label: "Dribbble", href: "[DRIBBBLE URL]" },
  { label: "Behance", href: "https://www.behance.net/bellojumato" },
];

export function isPlaceholderHref(href: string): boolean {
  return href.startsWith("[") && href.endsWith("]");
}
