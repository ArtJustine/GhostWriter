import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { GhostwriterSkill, ScraperSkill, SDRSkill } from "@/lib/agents/skills";

export async function POST(req: Request) {
    try {
        const { businessUrl, targetAudience, personas, userId } = await req.json();

        const config = await db.userConfig.create({
            data: {
                userId,
                businessUrl,
                targetAudience,
                onboarded: true,
                personas: {
                    create: personas.map((p: any) => ({
                        name: p.name,
                        description: p.description,
                    })),
                },
            },
            include: {
                personas: true
            }
        });

        // Trigger initial content generation from agents
        try {
            await GhostwriterSkill.researchAndWrite(config.id);
            await ScraperSkill.findLeads(config.id);
            await SDRSkill.writeEmails(config.id);
        } catch (e) {
            console.error("Failed to trigger initial skills:", e);
        }

        return NextResponse.json({ success: true, configId: config.id });
    } catch (error) {
        console.error("Onboarding Error:", error);
        return NextResponse.json({ error: "Failed to save configuration" }, { status: 500 });
    }
}
