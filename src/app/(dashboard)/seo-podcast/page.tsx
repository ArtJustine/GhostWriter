"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Mic, Search, Globe, FileAudio, ArrowUpRight, BarChart3, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function SEOPodcastPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const configId = localStorage.getItem("ghostwriter_config_id");
        if (!configId) return;

        try {
            const response = await fetch(`/api/dashboard?configId=${configId}`);
            const result = await response.json();
            if (result.success) {
                setData(result);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const tasks = [
        {
            title: "Podcast Scripting",
            description: `Generate scripts based on your ${data?.config?.contents?.filter((c: any) => c.type === 'ARTICLE').length || 0} articles.`,
            icon: Mic,
            status: "READY",
        },
        {
            title: "SEO Analysis",
            description: `Real-time ranking analysis for your content targeting ${data?.config?.targetAudience}.`,
            icon: BarChart3,
            status: "ACTIVE",
        }
    ];

    if (loading) return <div className="flex items-center justify-center h-96"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">SEO & Podcast</h1>
                    <p className="text-muted-foreground">Automate your audio content and search engine optimization.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => toast.info("Audit started...")}>
                    <Zap className="w-4 h-4 mr-2" /> Run SEO Audit
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {tasks.map((task) => (
                    <Card key={task.title} className="glass border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <task.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{task.title}</CardTitle>
                                    <Badge variant="outline" className="text-[10px] uppercase font-bold border-primary/20 text-primary">
                                        {task.status}
                                    </Badge>
                                </div>
                                <CardDescription className="text-sm mt-1">{task.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button
                                variant="secondary"
                                className="w-full bg-white/5 group-hover:bg-primary group-hover:text-white transition-all"
                                onClick={() => toast.success(`${task.title} tool initialized.`)}
                            >
                                Open Tool
                                <ArrowUpRight className="ml-2 w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="glass border-white/5">
                <CardHeader>
                    <CardTitle>Recent Podcast Episodes</CardTitle>
                    <CardDescription>Generated audio and scripts for your personas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                        <Mic className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
                        <p className="text-muted-foreground italic">No podcast episodes generated yet.</p>
                        <Button variant="ghost" className="mt-4 text-primary" onClick={() => toast.info("Opening script builder...")}>Create First Script</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
