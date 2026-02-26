export interface Service {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    deliverables: string[];
    timeline: string;
    features: string[];
}

export const services: Service[] = [
    {
        id: "web-development",
        title: "Web Development",
        tagline: "Custom websites & web apps that convert visitors into customers",
        description:
            "We build high-performance, responsive websites and web applications tailored to your business goals. From landing pages to complex SaaS platforms, our Digital Experts craft pixel-perfect experiences that load fast, rank well, and drive real results.",
        icon: "🌐",
        deliverables: [
            "Custom responsive website design & development",
            "E-commerce storefronts (Shopify, WooCommerce, custom)",
            "Landing pages optimized for conversions",
            "Progressive Web Apps (PWAs)",
            "CMS integration (WordPress, Headless CMS)",
            "Performance optimization & Core Web Vitals",
        ],
        timeline: "2–8 weeks depending on scope",
        features: [
            "Mobile-first responsive design",
            "SEO-optimized architecture",
            "Fast loading speeds (sub-2s)",
            "Analytics & conversion tracking",
            "Ongoing maintenance & support",
        ],
    },
    {
        id: "email-marketing",
        title: "Email Marketing",
        tagline: "Automated email campaigns that nurture leads and boost revenue",
        description:
            "Our Digital Experts design and automate email campaigns that engage your audience at every touchpoint. From welcome sequences to re-engagement flows, we build systems that work around the clock to grow your revenue.",
        icon: "📧",
        deliverables: [
            "Email campaign strategy & planning",
            "Custom email template design",
            "Marketing automation flows (welcome, nurture, win-back)",
            "List segmentation & personalization",
            "A/B testing & optimization",
            "Monthly performance reporting",
        ],
        timeline: "1–4 weeks for initial setup",
        features: [
            "Automated drip campaigns",
            "Behavioral trigger emails",
            "Advanced segmentation",
            "Deliverability optimization",
            "ROI tracking & analytics",
        ],
    },
    {
        id: "ai-automation",
        title: "AI Automation",
        tagline: "Intelligent workflows that save time and scale your operations",
        description:
            "We implement AI-powered automation to streamline your business processes. Our Digital Experts build custom chatbots, workflow automations, and integrations that reduce manual work and help you scale without adding headcount.",
        icon: "🤖",
        deliverables: [
            "Custom AI chatbots (website & social media)",
            "Workflow automation (Zapier, Make, n8n, custom)",
            "AI-powered lead qualification & routing",
            "Document processing & data extraction",
            "CRM & tool integrations",
            "Custom GPT/LLM solutions",
        ],
        timeline: "1–6 weeks depending on complexity",
        features: [
            "24/7 automated customer support",
            "Intelligent lead scoring",
            "Process automation dashboards",
            "Multi-platform integration",
            "Continuous learning & optimization",
        ],
    },
];
