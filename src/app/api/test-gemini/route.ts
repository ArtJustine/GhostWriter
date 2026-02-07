import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here") {
        return NextResponse.json({ error: "Gemini API Key is not configured correctly in .env" }, { status: 400 });
    }

    try {
        const ai = new GoogleGenAI({
            apiKey: apiKey,
        });

        // Using gemini-3-flash-preview as per search results
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "Can you respond with a short message confirming that the Gemini 3 Flash API connection is successful? Mention 'GhostWriter' in the response.",
        });

        return NextResponse.json({ success: true, message: response.text });
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to connect to Gemini API" }, { status: 500 });
    }
}
