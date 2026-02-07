"use client";

import {
    LayoutDashboard,
    PenTool,
    Users,
    Settings,
    Flame,
    Mail,
    Zap,
    LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Medium Factory",
        url: "/medium-factory",
        icon: PenTool,
    },
    {
        title: "SEO & Podcast",
        url: "/seo-podcast",
        icon: Zap,
    },
    {
        title: "Lead Center",
        url: "/lead-center",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("ghostwriter_config_id");
            localStorage.removeItem("ghostwriter_user_id");
            router.push("/login");
        } catch (error: any) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-white/5">
            <SidebarHeader className="h-16 flex flex-row items-center justify-center group-data-[collapsible=icon]:px-0 px-6 border-b border-white/5 overflow-hidden">
                <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center transition-all duration-300">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0 orange-glow shadow-[0_0_15px_-3px_rgba(255,140,0,0.5)]">
                        <Flame className="text-white w-5 h-5 fill-current" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-foreground group-data-[collapsible=icon]:hidden whitespace-nowrap">
                        GhostWriter<span className="text-primary italic">.ai</span>
                    </span>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-3 group-data-[collapsible=icon]:px-1.5 mt-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40 px-3 mb-2 group-data-[collapsible=icon]:hidden">
                        Main Workspace
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.title}
                                            className={`
                                                transition-all duration-300 h-11 px-3
                                                group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0
                                                ${isActive
                                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                                    : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                                                }
                                            `}
                                        >
                                            <Link href={item.url} className="flex items-center gap-3">
                                                <item.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : ""}`} />
                                                <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40 px-3 mb-2 group-data-[collapsible=icon]:hidden">
                        Pulse Agents
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-orange-500/5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" title="Ghostwriter Skill" />
                                    <span className="text-xs font-semibold text-orange-200/60 group-data-[collapsible=icon]:hidden italic">
                                        Ghostwriter
                                    </span>
                                </div>
                            </SidebarMenuItem>
                            <SidebarMenuItem className="mt-1">
                                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-amber-500/5 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" title="Lead Scraper" />
                                    <span className="text-xs font-semibold text-amber-200/60 group-data-[collapsible=icon]:hidden italic">
                                        Scraper
                                    </span>
                                </div>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-white/5 mt-auto bg-black/50">
                <div className="flex items-center justify-between gap-3 group-data-[collapsible=icon]:flex-col">
                    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                            <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
                            <span className="text-xs font-bold truncate">Art Gonzales</span>
                            <span className="text-[9px] text-primary font-bold uppercase">Pro Tier</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        className="w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
