"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Terminal, AlertCircle, CheckCircle2 } from "lucide-react";

export default function GeminiTestPage() {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const testConnection = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("/api/test-gemini");
            const data = await response.json();

            if (data.success) {
                setResult(data.message);
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto py-10">
            <Card className="glass border-orange-500/20 shadow-xl shadow-orange-500/5 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />
                <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-500">System Diagnostic</span>
                    </div>
                    <CardTitle className="text-3xl font-bold">Gemini 3 Flash Connection</CardTitle>
                    <CardDescription>
                        Testing high-volume backend configuration for GhostWriter.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                        <div className="flex items-start gap-3">
                            <Terminal className="w-5 h-5 text-orange-400 mt-1" />
                            <div className="text-sm text-stone-300 font-mono">
                                <p className="text-orange-200">Checking @google/genai SDK connectivity...</p>
                                <p className="text-stone-500 mt-1">$ GET /api/test-gemini</p>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={testConnection}
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-900/20"
                    >
                        {loading ? "Establishing Secure Connection..." : "Perform Sample API Call"}
                    </Button>

                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {result && (
                        <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-semibold text-emerald-500">Response Received</span>
                            </div>
                            <p className="text-stone-200 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4 py-1">
                                "{result}"
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
