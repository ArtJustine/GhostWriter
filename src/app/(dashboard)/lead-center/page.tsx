"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Mail, CheckCircle, Globe, Search, MoreHorizontal, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export default function LeadCenterPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [stats, setStats] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const configId = localStorage.getItem("ghostwriter_config_id");
        if (!configId) return;

        try {
            const response = await fetch(`/api/dashboard?configId=${configId}`);
            const result = await response.json();
            if (result.success) {
                setLeads(result.config.leads);
                setStats(result.stats);
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

    if (loading) return <div className="flex items-center justify-center h-96"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Lead Center</h1>
                    <p className="text-muted-foreground">Prospects found by your Scraper agent.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10">Export CSV</Button>
                    <Button className="bg-primary hover:bg-primary/90">
                        <Search className="w-4 h-4 mr-2" /> Start New Search
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="glass border-white/5">
                    <CardContent className="pt-6">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Total Leads</span>
                        <div className="text-3xl font-bold mt-1">{stats.totalLeads || 0}</div>
                    </CardContent>
                </Card>
                <Card className="glass border-white/5">
                    <CardContent className="pt-6">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Validated</span>
                        <div className="text-3xl font-bold mt-1 text-emerald-500">{stats.validatedLeads || 0}</div>
                    </CardContent>
                </Card>
                <Card className="glass border-white/5">
                    <CardContent className="pt-6">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Emails Sent</span>
                        <div className="text-3xl font-bold mt-1 text-primary">0</div>
                    </CardContent>
                </Card>
                <Card className="glass border-white/5">
                    <CardContent className="pt-6">
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Accuracy</span>
                        <div className="text-3xl font-bold mt-1 text-amber-500">92%</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass border-white/5">
                <CardHeader>
                    <CardTitle>Recent Leads</CardTitle>
                    <CardDescription>Latest prospects discovered across LinkedIn and company websites.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-white/[0.02] border-y border-white/5">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Name</th>
                                    <th className="px-6 py-4 font-semibold">Position</th>
                                    <th className="px-6 py-4 font-semibold">Company</th>
                                    <th className="px-6 py-4 font-semibold">Verification</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {leads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                                            No leads discovered yet. Running scraper...
                                        </td>
                                    </tr>
                                ) : leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{lead.name}</span>
                                                <span className="text-xs text-muted-foreground">{lead.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{lead.position}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-3 h-3 text-muted-foreground" />
                                                {lead.company}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.validated ? (
                                                <div className="flex items-center gap-1.5 text-emerald-500">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="text-xs">Validated</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-amber-500">
                                                    <ShieldCheck className="w-4 h-4" />
                                                    <span className="text-xs cursor-pointer hover:underline" onClick={() => toast.info("Verifying email...")}>Verify Now</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-primary/20 hover:text-primary">
                                                    <Mail className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
