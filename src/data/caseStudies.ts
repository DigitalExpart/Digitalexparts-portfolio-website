export interface CaseStudy {
    id: string;
    title: string;
    industry: string;
    services: string[];
    outcome: string;
    description: string;
    metrics: { label: string; value: string }[];
    gradient: string;
}

export const caseStudies: CaseStudy[] = [
    {
        id: "ecommerce-redesign",
        title: "E-Commerce Store Redesign",
        industry: "Retail & Fashion",
        services: ["Web Development"],
        outcome: "156% increase in online conversions within 3 months",
        description:
            "Complete redesign and rebuild of a fashion e-commerce platform, focusing on mobile experience, page speed, and conversion optimization.",
        metrics: [
            { label: "Conversion Rate", value: "+156%" },
            { label: "Page Speed", value: "1.2s" },
            { label: "Revenue Growth", value: "+89%" },
        ],
        gradient: "from-blue-600 to-cyan-500",
    },
    {
        id: "saas-email-automation",
        title: "SaaS Onboarding Email Flow",
        industry: "Technology / SaaS",
        services: ["Email Marketing"],
        outcome: "42% improvement in trial-to-paid conversion",
        description:
            "Designed and automated a 14-email onboarding sequence with behavioral triggers, reducing churn and boosting activation rates.",
        metrics: [
            { label: "Trial Conversion", value: "+42%" },
            { label: "Open Rate", value: "68%" },
            { label: "Churn Reduction", value: "-31%" },
        ],
        gradient: "from-purple-600 to-pink-500",
    },
    {
        id: "ai-customer-support",
        title: "AI-Powered Support Chatbot",
        industry: "Financial Services",
        services: ["AI Automation"],
        outcome: "70% of support tickets resolved automatically",
        description:
            "Built a custom AI chatbot integrated with their CRM to handle common queries, route complex issues, and collect leads 24/7.",
        metrics: [
            { label: "Auto-Resolved", value: "70%" },
            { label: "Response Time", value: "<5s" },
            { label: "Cost Savings", value: "$8K/mo" },
        ],
        gradient: "from-emerald-600 to-teal-500",
    },
    {
        id: "lead-gen-landing",
        title: "Lead Generation Landing Pages",
        industry: "Real Estate",
        services: ["Web Development", "Email Marketing"],
        outcome: "3x more qualified leads per month",
        description:
            "Built high-converting landing pages with integrated email capture, automated follow-ups, and CRM syncing for a real estate agency.",
        metrics: [
            { label: "Lead Volume", value: "3x" },
            { label: "Cost per Lead", value: "-45%" },
            { label: "Follow-up Rate", value: "100%" },
        ],
        gradient: "from-orange-500 to-amber-500",
    },
    {
        id: "workflow-automation",
        title: "Business Process Automation",
        industry: "Healthcare",
        services: ["AI Automation"],
        outcome: "200+ hours saved per month on manual tasks",
        description:
            "Automated patient intake, appointment scheduling, and document processing using custom AI workflows integrated with existing systems.",
        metrics: [
            { label: "Hours Saved", value: "200+/mo" },
            { label: "Error Rate", value: "-95%" },
            { label: "Staff Satisfaction", value: "+78%" },
        ],
        gradient: "from-rose-500 to-red-500",
    },
    {
        id: "email-revenue-boost",
        title: "Email Revenue Recovery Campaign",
        industry: "E-Commerce",
        services: ["Email Marketing", "AI Automation"],
        outcome: "$120K in recovered revenue in 90 days",
        description:
            "Implemented abandoned cart flows, browse-abandonment triggers, and AI-personalized product recommendations via email.",
        metrics: [
            { label: "Recovered Revenue", value: "$120K" },
            { label: "Cart Recovery", value: "28%" },
            { label: "Email ROI", value: "42x" },
        ],
        gradient: "from-indigo-600 to-blue-500",
    },
];
