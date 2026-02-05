import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const configId = searchParams.get("configId");

        if (!configId) {
            return NextResponse.json({ error: "Missing configId" }, { status: 400 });
        }

        const config = await db.userConfig.findUnique({
            where: { id: configId },
            include: {
                personas: true,
                contents: {
                    orderBy: { createdAt: "desc" },
                    take: 20,
                    include: { persona: true }
                },
                leads: {
                    orderBy: { createdAt: "desc" },
                    take: 50
                }
            }
        });

        if (!config) {
            return NextResponse.json({ error: "Config not found" }, { status: 404 });
        }

        // Separate content by type and status for easier UI consumption
        const stats = {
            pendingArticles: config.contents.filter(c => c.type === "ARTICLE" && c.status === "PENDING").length,
            pendingEmails: config.contents.filter(c => c.type === "EMAIL" && c.status === "PENDING").length,
            totalLeads: config.leads.length,
            validatedLeads: config.leads.filter(l => l.validated).length,
        };

        return NextResponse.json({
            success: true,
            config,
            stats
        });
    } catch (error) {
        console.error("Dashboard Fetch Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
