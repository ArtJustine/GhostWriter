"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Clock,
    Copy,
    ExternalLink,
    PenTool,
    Mail,
    Users,
    TrendingUp,
    MoreVertical,
    ThumbsUp
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardPage() {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const tasks = [
        {
            id: 1,
            title: "Review 5 Medium Articles",
            description: "AI Ghostwriter has generated 5 new articles for your personas.",
            count: 5,
            icon: PenTool,
            status: "PENDING",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            id: 2,
            title: "Approve 20 Cold Emails",
            description: "SDR Agent has drafted personalized emails for newly found leads.",
            count: 20,
            icon: Mail,
            status: "PENDING",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            id: 3,
            title: "Validate 12 New Leads",
            description: "Scraper found potential leads that need manual verification.",
            count: 12,
            icon: Users,
            status: "READY",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        }
    ];

    const recentContent = [
        {
            id: "c1",
            title: "Mastering Next.js 15: The Future of Web Development",
            type: "ARTICLE",
            persona: "Tech Enthusiast",
            date: "2 hours ago",
            preview: "Next.js 15 introduces groundbreaking features that change how we think about server-side rendering...",
            status: "PENDING"
        },
        {
            id: "c2",
            title: "Cold Outreach: Marketing Director at TechCorp",
            type: "EMAIL",
            persona: "Enterprise Lead",
            date: "5 hours ago",
            preview: "Hi [Name], I noticed TechCorp's recent expansion into the Asian market and wanted to share how...",
            status: "PENDING"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Art!</h1>
                <p className="text-muted-foreground">Here's what's happening with your agents today.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {tasks.map((task) => (
                    <Card key={task.id} className="glass overflow-hidden border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                            <div className={`${task.bg} ${task.color} p-2 rounded-lg`}>
                                <task.icon className="w-4 h-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-1">{task.count}</div>
                            <p className="text-xs text-muted-foreground mb-4">
                                {task.description}
                            </p>
                            <Button variant="secondary" size="sm" className="w-full bg-white/5 hover:bg-primary hover:text-white transition-all group">
                                Review Now
                                <TrendingUp className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Pending Review
                        </h2>
                        <Button variant="ghost" size="sm" className="text-xs text-primary underline-offset-4 hover:underline">
                            View All
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {recentContent.map((content) => (
                            <Card key={content.id} className="bg-white/[0.02] border-white/5 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                                                        {content.type}
                                                    </Badge>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{content.date}</span>
                                                </div>
                                                <h3 className="font-semibold leading-none">{content.title}</h3>
                                            </div>
                                            <Badge className="bg-orange-500/20 text-orange-400 border-none">
                                                PENDING
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 italic">
                                            "{content.preview}"
                                        </p>
                                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                            <Users className="w-3 h-3" />
                                            Target Persona: <span className="text-foreground font-medium">{content.persona}</span>
                                        </div>
                                    </div>
                                    <div className="flex border-t border-white/5 divide-x divide-white/5">
                                        <Button
                                            variant="ghost"
                                            className="flex-1 rounded-none h-11 text-xs hover:bg-emerald-500/10 hover:text-emerald-500"
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5 mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="flex-1 rounded-none h-11 text-xs hover:bg-primary/10 hover:text-primary"
                                            onClick={() => copyToClipboard(content.preview)}
                                        >
                                            <Copy className="w-3.5 h-3.5 mr-2" />
                                            Copy
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="flex-1 rounded-none h-11 text-xs border-r-0"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Agent Performance</h2>
                    <Card className="glass border-white/5 h-[calc(100%-44px)] overflow-hidden relative">
                        <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full space-y-6">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-8 border-white/5" />
                                <div className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent border-l-transparent animate-spin-slow" />
                                <div className="flex flex-col items-center">
                                    <span className="text-4xl font-bold">85%</span>
                                    <span className="text-xs text-muted-foreground uppercase">Efficiency</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Your agents are working overtime.</p>
                                <p className="text-xs text-muted-foreground max-w-xs">
                                    Automated research has saved you 12.5 hours this week compared to manual workflows.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-white/5 p-4 rounded-xl text-left">
                                    <span className="text-[10px] text-muted-foreground uppercase">Articles</span>
                                    <p className="text-xl font-bold">142</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl text-left">
                                    <span className="text-[10px] text-muted-foreground uppercase">Leads Found</span>
                                    <p className="text-xl font-bold">893</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
