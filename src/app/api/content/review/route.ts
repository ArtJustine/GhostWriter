import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { contentId, action } = await req.json();

        if (action === "approve") {
            await db.content.update({
                where: { id: contentId },
                data: { status: "READY" }
            });
            return NextResponse.json({ success: true, message: "Content approved and marked as READY." });
        }

        if (action === "delete") {
            await db.content.delete({
                where: { id: contentId }
            });
            return NextResponse.json({ success: true, message: "Content deleted." });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
