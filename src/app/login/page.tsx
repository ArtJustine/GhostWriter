"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Flame, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;

            // Fetch user config to store in localStorage (or use a global state/session)
            const response = await fetch(`/api/user-config?userId=${userId}`);
            const data = await response.json();

            if (data.success && data.configId) {
                localStorage.setItem("ghostwriter_config_id", data.configId);
                localStorage.setItem("ghostwriter_user_id", userId);
                toast.success("Welcome back!");
                router.push("/dashboard");
            } else {
                // If no config found, maybe they didn't finish onboarding?
                toast.error("Account found but workspace not initialized.");
                router.push("/onboarding");
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="flex flex-col items-center mb-8">
                    <Link href="/">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center orange-glow mb-4">
                            <Flame className="text-white fill-current" />
                        </div>
                    </Link>
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">Sign in to your GhostWriter account</p>
                </div>

                <Card className="glass border-white/5">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="bg-white/5 border-white/10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                                {loading ? "Signing in..." : "Login"} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/onboarding" className="text-primary hover:underline">
                                Start Onboarding
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
