import { db } from "@/lib/db";

export class GhostwriterSkill {
    static async researchAndWrite(userConfigId: string) {
        const config = await db.userConfig.findUnique({
            where: { id: userConfigId },
            include: { personas: true }
        });

        if (!config || !config.personas.length) return;

        // Simulate different topics based on target audience
        const topics = [
            `How to scale outreach for ${config.targetAudience}`,
            `The impact of AI on ${config.targetAudience}`,
            `Why most strategies for ${config.targetAudience} fail in 2026`,
            `Automation secrets for ${config.targetAudience}`,
            `The future of personalized engagement with ${config.targetAudience}`
        ];

        for (let i = 0; i < config.personas.length; i++) {
            const persona = config.personas[i];
            const topic = topics[i % topics.length];

            await db.content.create({
                data: {
                    title: topic,
                    body: `Deep dive into ${topic} written in the voice of a ${persona.name}. We explore how ${config.businessUrl || 'our solution'} solves key pain points for ${config.targetAudience}...`,
                    type: "ARTICLE",
                    status: "PENDING",
                    personaId: persona.id,
                    userConfigId: userConfigId
                }
            });
        }
    }
}

export class ScraperSkill {
    static async findLeads(userConfigId: string) {
        const config = await db.userConfig.findUnique({ where: { id: userConfigId } });
        if (!config) return;

        // Simulate finding real-looking leads
        const mockLeads = [
            { name: "Alex Rivera", email: "arivera@growthscale.com", position: "Marketing Director", company: "GrowthScale" },
            { name: "Sarah Chen", email: "sarah.c@techpivot.io", position: "CTO", company: "TechPivot" },
            { name: "Marcus Thorne", email: "mthorne@enterprise-now.net", position: "Head of Sales", company: "EnterpriseNow" },
            { name: "Elena Vance", email: "elena@startup-labs.co", position: "Founder", company: "StartupLabs" },
            { name: "James Wilson", email: "j.wilson@corp-align.com", position: "VP of Product", company: "CorpAlign" }
        ];

        for (const lead of mockLeads) {
            await db.lead.create({
                data: {
                    ...lead,
                    validated: Math.random() > 0.3,
                    userConfigId: userConfigId
                }
            });
        }
    }
}

export class SDRSkill {
    static async writeEmails(userConfigId: string) {
        const leads = await db.lead.findMany({
            where: { userConfigId, validated: true }
        });

        for (const lead of leads) {
            await db.content.create({
                data: {
                    title: `Hyper-Personalized Outreach: ${lead.name}`,
                    body: `Hi ${lead.name},\n\nI was researching ${lead.company || 'your company'} and noticed your role as ${lead.position}. Given your focus on growth, I thought you'd find our work interesting...`,
                    type: "EMAIL",
                    status: "PENDING",
                    userConfigId: userConfigId
                }
            });
        }
    }
}
