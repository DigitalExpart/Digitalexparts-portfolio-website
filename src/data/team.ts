export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    skills: string[];
    isLead?: boolean;
}

export const team: TeamMember[] = [
    {
        id: "lead",
        name: "You",
        role: "Founder & Lead Developer",
        bio: "Full-stack engineer with a passion for building products that drive results. Leads the team in architecting scalable web solutions and AI integrations.",
        skills: ["React", "Next.js", "Node.js", "AI/ML", "Strategy"],
        isLead: true,
    },
    {
        id: "sarah",
        name: "Sarah Chen",
        role: "UI/UX Designer",
        bio: "Crafts intuitive, conversion-focused interfaces that delight users and drive engagement. Specializes in design systems and accessibility.",
        skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    },
    {
        id: "james",
        name: "James Rodriguez",
        role: "Email Marketing Specialist",
        bio: "Designs and optimizes automated email campaigns that nurture leads through every stage of the funnel. Data-driven and results-obsessed.",
        skills: ["Klaviyo", "Mailchimp", "Copywriting", "Analytics"],
    },
    {
        id: "aisha",
        name: "Aisha Patel",
        role: "AI & Automation Engineer",
        bio: "Builds intelligent automation workflows and AI chatbots that save businesses hundreds of hours. Expert in no-code and custom AI solutions.",
        skills: ["Python", "OpenAI", "Zapier", "Make", "n8n"],
    },
    {
        id: "marcus",
        name: "Marcus Thompson",
        role: "Full-Stack Developer",
        bio: "Develops robust, scalable web applications with a focus on performance and clean architecture. TypeScript enthusiast.",
        skills: ["TypeScript", "React", "PostgreSQL", "AWS"],
    },
];
