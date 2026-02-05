"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PenTool, Check, X, ExternalLink, Copy, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function MediumFactoryPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const configId = localStorage.getItem("ghostwriter_config_id");
        if (!configId) return;

        try {
            const response = await fetch(`/api/dashboard?configId=${configId}`);
            const result = await response.json();
            if (result.success) {
                setArticles(result.config.contents.filter((c: any) => c.type === "ARTICLE"));
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

    const approveArticle = async (id: string) => {
        try {
            const res = await fetch("/api/content/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contentId: id, action: "approve" })
            });
            if (res.ok) {
                toast.success("Article approved!");
                fetchData();
            }
        } catch (e) {
            toast.error("Failed to approve");
        }
    };

    if (loading) return <div className="flex items-center justify-center h-96"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Medium Factory</h1>
                    <p className="text-muted-foreground">Manage your AI-generated articles and persona-driven content.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => toast.info("Agent is researching now...")}>
                    <PenTool className="w-4 h-4 mr-2" /> Generate New Batch
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium"
                    />
                </div>
                <Button variant="outline" className="h-11 border-white/10 hover:bg-white/5">
                    <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
            </div>

            <div className="grid gap-6">
                {articles.length === 0 ? (
                    <div className="p-12 text-center glass rounded-2xl border-dashed border-white/10">
                        <p className="text-muted-foreground italic">No articles generated yet. Click "Generate" to start.</p>
                    </div>
                ) : articles.map((article) => (
                    <Card key={article.id} className="glass border-white/5 overflow-hidden group hover:border-primary/20 transition-all">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row">
                                <div className="flex-1 p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Badge className={article.status === "READY" ? "bg-emerald-500/20 text-emerald-400 border-none px-2" : "bg-orange-500/20 text-orange-400 border-none px-2"}>
                                            {article.status}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest italic">{article.persona?.name || 'Global'}</span>
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors cursor-pointer">{article.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                        {article.body}
                                    </p>
                                </div>
                                <div className="md:w-48 bg-white/[0.02] border-l border-white/5 p-6 flex flex-row md:flex-col justify-center gap-3">
                                    {article.status === "PENDING" && (
                                        <Button
                                            onClick={() => approveArticle(article.id)}
                                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                                        >
                                            <Check className="w-4 h-4 mr-2" /> Approve
                                        </Button>
                                    )}
                                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5" onClick={() => {
                                        navigator.clipboard.writeText(article.body);
                                        toast.success("Ready for Medium!");
                                    }}>
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
