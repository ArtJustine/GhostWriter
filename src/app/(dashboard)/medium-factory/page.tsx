"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PenTool, Check, X, ExternalLink, Copy, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function MediumFactoryPage() {
    const [articles, setArticles] = useState([
        {
            id: "a1",
            title: "The Rise of Autonomous AI Agents in 2026",
            persona: "Tech Visionary",
            status: "PENDING",
            date: "Feb 4, 2026",
            excerpt: "We are entering a new era where agents don't just suggest, they execute. This article dives deep into the architecture of modern agentic systems...",
        },
        {
            id: "a2",
            title: "How to Scale Your SaaS with Zero Ad Spend",
            persona: "Growth Hacker",
            status: "READY",
            date: "Feb 3, 2026",
            excerpt: "Organic growth is not dead. It's just evolved. Learn how we used automated content distribution to reach 100k MRR in 6 months...",
        },
        {
            id: "a3",
            title: "Why Developer Experience is the New Marketing",
            persona: "Software Architect",
            status: "PENDING",
            date: "Feb 4, 2026",
            excerpt: "If your API is hard to use, no amount of marketing will save it. Documentation is your best sales tool...",
        }
    ]);

    const approveArticle = (id: string) => {
        setArticles(articles.map(a => a.id === id ? { ...a, status: "READY" } : a));
        toast.success("Article approved!");
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Medium Factory</h1>
                    <p className="text-muted-foreground">Manage your AI-generated articles and persona-driven content.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <PenTool className="w-4 h-4 mr-2" /> Generate New Batch
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                </div>
                <Button variant="outline" className="h-11 border-white/10">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
            </div>

            <div className="grid gap-6">
                {articles.map((article) => (
                    <Card key={article.id} className="glass border-white/5 overflow-hidden group">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                <div className="flex-1 p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge className={article.status === "READY" ? "bg-emerald-500/20 text-emerald-400 border-none" : "bg-orange-500/20 text-orange-400 border-none"}>
                                            {article.status}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">{article.date}</span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs font-medium text-primary uppercase tracking-wider">{article.persona}</span>
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors cursor-pointer">{article.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {article.excerpt}
                                    </p>
                                </div>
                                <div className="md:w-48 bg-white/[0.02] border-l border-white/5 p-6 flex flex-row md:flex-col justify-center gap-3">
                                    {article.status === "PENDING" && (
                                        <Button
                                            onClick={() => approveArticle(article.id)}
                                            className="w-full bg-emerald-600 hover:bg-emerald-500"
                                        >
                                            <Check className="w-4 h-4 mr-2" /> Approve
                                        </Button>
                                    )}
                                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                                        <Copy className="w-4 h-4 mr-2" /> Copy
                                    </Button>
                                    <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                                        <ExternalLink className="w-4 h-4 mr-2" /> Preview
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
