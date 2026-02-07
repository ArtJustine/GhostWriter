import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "UserId is required" }, { status: 400 });
    }

    try {
        const config = await db.userConfig.findUnique({
            where: { userId },
            select: { id: true }
        });

        if (!config) {
            return NextResponse.json({ success: false, message: "No config found for this user" });
        }

        return NextResponse.json({ success: true, configId: config.id });
    } catch (error) {
        console.error("User Config Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch user configuration" }, { status: 500 });
    }
}
