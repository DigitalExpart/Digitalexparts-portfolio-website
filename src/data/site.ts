export const siteConfig = {
    brandName: "Digital Exparts",
    seoCopyName: "Digital Experts",
    whatsappNumber: "2348156638480",
    email: "bellojumatomosanya@gmail.com",
    upworkUrl: "https://www.upwork.com/agencies/digitalexparts",
    fiverrUrl: "https://www.fiverr.com/digitalexparts",
    siteUrl: "https://digitalexparts.com",
    defaultWhatsAppMessage:
        "Hi Digital Exparts, I found your website and I want to discuss a project.",
};

export function getWhatsAppLink(customMessage?: string) {
    const msg = customMessage || siteConfig.defaultWhatsAppMessage;
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}
