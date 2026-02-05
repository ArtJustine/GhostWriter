"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Mic, Search, Globe, FileAudio, ArrowUpRight, BarChart3, Radio } from "lucide-react";

const tasks = [
    {
        title: "Podcast Scripting",
        description: "Generate scripts for your next episode based on Medium articles.",
        icon: Mic,
        status: "READY",
    },
    {
        title: "SEO Analysis",
        description: "Real-time ranking analysis for your top performing keywords.",
        icon: BarChart3,
        status: "ACTIVE",
    }
];

export default function SEOPodcastPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">SEO & Podcast</h1>
                    <p className="text-muted-foreground">Automate your audio content and search engine optimization.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
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
                            <Button variant="secondary" className="w-full bg-white/5 group-hover:bg-primary group-hover:text-white transition-all">
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
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <Radio className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium">The Future of AI Agents - Ep {i}</p>
                                        <p className="text-xs text-muted-foreground">12:45 • Generated 2 days ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="sm">Review Script</Button>
                                    <Button variant="outline" size="sm" className="border-white/10">Listen</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
