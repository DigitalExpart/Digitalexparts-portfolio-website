export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export const faqs: FAQ[] = [
    {
        id: "faq-1",
        question: "How long does a typical project take?",
        answer:
            "Project timelines vary based on scope and complexity. A landing page might take 1–2 weeks, while a full web application could take 4–8 weeks. Email marketing setup typically takes 1–4 weeks, and AI automation projects range from 1–6 weeks. We'll provide a detailed timeline during our initial consultation.",
    },
    {
        id: "faq-2",
        question: "How does your pricing work?",
        answer:
            "We offer flexible pricing based on project scope rather than fixed packages. After understanding your goals, we'll provide a transparent quote with clear deliverables. We work with businesses of all sizes and can often find a structure that fits your budget.",
    },
    {
        id: "faq-3",
        question: "What industries do you work with?",
        answer:
            "We serve clients across diverse industries including e-commerce, SaaS, real estate, healthcare, financial services, and more. Our Digital Experts adapt strategies and solutions to fit the unique requirements and compliance needs of each industry.",
    },
    {
        id: "faq-4",
        question: "Do you offer ongoing support after launch?",
        answer:
            "Absolutely. We provide ongoing maintenance, optimization, and support plans to ensure your website, email campaigns, and automations continue performing at their best. Many of our clients work with us on a monthly retainer for continuous improvement.",
    },
];
