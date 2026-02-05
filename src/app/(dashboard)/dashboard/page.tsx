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
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const configId = localStorage.getItem("ghostwriter_config_id");
        if (!configId) {
            setLoading(false);
            return;
        }

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

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const approveContent = async (id: string) => {
        try {
            const res = await fetch("/api/content/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contentId: id, action: "approve" })
            });
            if (res.ok) {
                toast.success("Content marked as READY");
                fetchData();
            }
        } catch (e) {
            toast.error("Failed to approve");
        }
    };

    if (loading) return <div className="flex items-center justify-center h-96"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    if (!data) return (
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <p className="text-muted-foreground">No workspace configuration found.</p>
            <Button onClick={() => window.location.href = '/onboarding'}>Start Onboarding</Button>
        </div>
    );

    const tasks = [
        {
            id: 1,
            title: "Review Articles",
            description: `You have ${data.stats.pendingArticles} articles waiting for approval.`,
            count: data.stats.pendingArticles,
            icon: PenTool,
            status: "PENDING",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            id: 2,
            title: "Review Emails",
            description: `Agent has drafted ${data.stats.pendingEmails} personalized emails.`,
            count: data.stats.pendingEmails,
            icon: Mail,
            status: "PENDING",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            id: 3,
            title: "Validate Leads",
            description: `${data.stats.totalLeads} leads found needing verification.`,
            count: data.stats.totalLeads,
            icon: Users,
            status: "READY",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        }
    ];

    const pendingReview = data.config.contents.filter((c: any) => c.status === "PENDING");

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Workspace Dashboard</h1>
                    <p className="text-muted-foreground italic">
                        Targeting {data.config.targetAudience} for {data.config.businessUrl}
                    </p>
                </div>
                <div className="flex gap-2">
                    {data.config.personas.map((p: any) => (
                        <Badge key={p.id} variant="secondary" className="bg-white/5 border-white/10 text-[10px]">
                            {p.name}
                        </Badge>
                    ))}
                </div>
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
                            Recent Generation
                        </h2>
                        <Button variant="ghost" size="sm" className="text-xs text-primary underline-offset-4 hover:underline">
                            View All
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {pendingReview.length === 0 ? (
                            <div className="p-12 text-center glass rounded-2xl border-dashed border-white/10">
                                <p className="text-muted-foreground">All caught up! No pending content.</p>
                            </div>
                        ) : pendingReview.slice(0, 5).map((content: any) => (
                            <Card key={content.id} className="bg-white/[0.02] border-white/5 overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-5 space-y-3">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                                                        {content.type}
                                                    </Badge>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                                        {new Date(content.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold leading-tight">{content.title}</h3>
                                            </div>
                                            <Badge className="shrink-0 bg-orange-500/20 text-orange-400 border-none">
                                                PENDING
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 italic">
                                            "{content.body}"
                                        </p>
                                        {content.persona && (
                                            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                                <Users className="w-3 h-3" />
                                                Persona: <span className="text-foreground font-medium">{content.persona.name}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex border-t border-white/5 divide-x divide-white/5">
                                        <Button
                                            variant="ghost"
                                            className="flex-1 rounded-none h-11 text-xs hover:bg-emerald-500/10 hover:text-emerald-500"
                                            onClick={() => approveContent(content.id)}
                                        >
                                            <ThumbsUp className="w-3.5 h-3.5 mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className="flex-1 rounded-none h-11 text-xs hover:bg-primary/10 hover:text-primary"
                                            onClick={() => copyToClipboard(content.body)}
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
                                <p className="text-sm font-medium">System fully operational.</p>
                                <p className="text-xs text-muted-foreground max-w-xs">
                                    Your agents are monitoring trends for <span className="text-primary font-bold">{data.config.targetAudience}</span>.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-white/5 p-4 rounded-xl text-left border border-white/5">
                                    <span className="text-[10px] text-muted-foreground uppercase">Articles</span>
                                    <p className="text-xl font-bold">{data.config.contents.filter((c: any) => c.type === "ARTICLE").length}</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl text-left border border-white/5">
                                    <span className="text-[10px] text-muted-foreground uppercase">Leads Found</span>
                                    <p className="text-xl font-bold">{data.stats.totalLeads}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
