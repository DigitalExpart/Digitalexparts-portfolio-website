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
  location: "[LOCATION]",
  yearStarted: "[YEAR STARTED]",
  yearsExperience: "[YEARS OF EXPERIENCE]",
  teamSize: "[TEAM SIZE]",
  responseTime: "[ONE BUSINESS DAY]",
  timezoneNote: "Fully remote · Working across all time zones",
  calendlyUrl: "[BOOKING LINK]",
  fiverrUrl: "https://www.fiverr.com/clara_success?public_mode=true",
  upworkUrl: "https://www.upwork.com/freelancers/~01e12863196bfb5563?mp_source=share",
  behanceUrl: "https://www.behance.net/bellojumato",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://digital-exparts.example.com",
  tagline: "Websites, brands and AI video that turn visitors into clients.",
  shortLockup: "Web. Design. Email. AI Video.",
  nameLine:
    "Digital Experts is the studio of Jumat Bello, also known as Isaac Clara on Fiverr.",
  description:
    "Remote studio for web design and development on Wix, Squarespace, WordPress, Webflow and custom code, plus UI/UX, email marketing and AI video.",
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
    description: "Web, no-code, branding, email & AI video",
  },
  {
    index: "04",
    label: "How we work",
    href: "/how-we-work",
    description: "Hire one solo expert or a coordinated team",
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
    label: "Fiverr (Isaac Clara)",
    href: SITE.fiverrUrl,
    handle: "4.7 rating · 57 reviews",
  },
  {
    label: "Upwork (Jumat Bello)",
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
