import { db } from "@/lib/db";

export class GhostwriterSkill {
    static async researchAndWrite(userConfigId: string) {
        console.log("Ghostwriter Skill: Researching trends...");

        // Simulate browser agent research
        const trends = ["Next.js 15 performance", "AI agent workflows", "Personalized marketing"];

        const config = await db.userConfig.findUnique({
            where: { id: userConfigId },
            include: { personas: true }
        });

        if (!config) return;

        for (const persona of config.personas) {
            await db.content.create({
                data: {
                    title: `Trend Report: ${trends[Math.floor(Math.random() * trends.length)]}`,
                    body: `Written for ${persona.name}. This article explores the latest trends in ${config.targetAudience}...`,
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
        console.log("Scraper Skill: Finding leads...");

        // Mock lead finding
        const leads = [
            { name: "John Doe", email: "john@techcorp.com", position: "Marketing Director" },
            { name: "Jane Smith", email: "jane@startup.io", position: "CEO" }
        ];

        for (const lead of leads) {
            await db.lead.create({
                data: {
                    ...lead,
                    validated: true,
                    userConfigId: userConfigId
                }
            });
        }
    }
}

export class SDRSkill {
    static async writeEmails(userConfigId: string) {
        console.log("SDR Skill: Writing personalized emails...");

        const leads = await db.lead.findMany({
            where: { userConfigId, validated: true }
        });

        for (const lead of leads) {
            await db.content.create({
                data: {
                    title: `Cold Outreach: ${lead.name} (${lead.company || 'Unknown'})`,
                    body: `Hi ${lead.name}, I noticed your position as ${lead.position}...`,
                    type: "EMAIL",
                    status: "PENDING",
                    userConfigId: userConfigId
                }
            });
        }
    }
}
