import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, Grid } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-white/5 bg-background/50 px-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="-ml-1" />
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <Grid className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Workspace</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="h-10 w-64 rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 text-sm focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            />
                        </div>
                        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-auto bg-[#050505]">
                    <div className="p-6 md:p-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </>
    );
}
