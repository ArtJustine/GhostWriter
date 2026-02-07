"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Flame, ArrowRight, ArrowLeft, Check, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const [formData, setFormData] = useState({
        businessUrl: "",
        targetAudience: "",
        email: "",
        password: "",
        personas: [
            { name: "Persona 1", description: "" },
            { name: "Persona 2", description: "" },
            { name: "Persona 3", description: "" },
            { name: "Persona 4", description: "" },
            { name: "Persona 5", description: "" },
        ],
    });

    const nextStep = () => {
        if (step === 1 && (!formData.businessUrl || !formData.targetAudience)) {
            toast.error("Please fill in all fields");
            return;
        }
        setStep((s) => s + 1);
    };
    const prevStep = () => setStep((s) => s - 1);

    const handlePersonaChange = (index: number, field: string, value: string) => {
        const newPersonas = [...formData.personas];
        newPersonas[index] = { ...newPersonas[index], [field]: value };
        setFormData({ ...formData, personas: newPersonas });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Please provide email and password");
            return;
        }

        const loadingToast = toast.loading("Creating your account and workspace...");

        try {
            // 1. Create Firebase User
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const userId = userCredential.user.uid;

            // 2. Save Onboarding Data with linked userId
            const response = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    userId
                }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("ghostwriter_config_id", data.configId);
                localStorage.setItem("ghostwriter_user_id", userId);
                toast.dismiss(loadingToast);
                toast.success("Account created and workspace initialized!");
                router.push("/dashboard");
            } else {
                throw new Error(data.error || "Failed to initialize");
            }
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center orange-glow mb-4">
                        <Flame className="text-white fill-current" />
                    </div>
                    <h1 className="text-2xl font-bold">Configure Your AI Agents</h1>
                    <p className="text-muted-foreground text-sm">Step {step} of 3</p>
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-12 rounded-full transition-all duration-300 ${step >= i ? "bg-primary" : "bg-white/10"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="glass border-white/5">
                                <CardHeader>
                                    <CardTitle>Business Context</CardTitle>
                                    <CardDescription>Tell us about what you're building.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="url">Business URL</Label>
                                        <Input
                                            id="url"
                                            placeholder="https://example.com"
                                            className="bg-white/5 border-white/10"
                                            value={formData.businessUrl}
                                            onChange={(e) => setFormData({ ...formData, businessUrl: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="audience">Target Audience Details</Label>
                                        <Textarea
                                            id="audience"
                                            placeholder="Who are you trying to reach? (e.g., Marketing Directors at SaaS companies)"
                                            className="bg-white/5 border-white/10 min-h-[120px]"
                                            value={formData.targetAudience}
                                            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                                        />
                                    </div>
                                    <Button onClick={nextStep} className="w-full bg-primary hover:bg-primary/90">
                                        Continue <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="glass border-white/5">
                                <CardHeader>
                                    <CardTitle>Define Your Personas</CardTitle>
                                    <CardDescription>Create 5 distinct personas for your content engine.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                                        {formData.personas.map((persona, index) => (
                                            <div key={index} className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-primary font-semibold">Persona {index + 1}</Label>
                                                </div>
                                                <Input
                                                    placeholder="Persona Name (e.g., Tech Founder)"
                                                    className="bg-white/5 border-white/10"
                                                    value={persona.name}
                                                    onChange={(e) => handlePersonaChange(index, "name", e.target.value)}
                                                />
                                                <Textarea
                                                    placeholder="Persona Bio/Tone of Voice"
                                                    className="bg-white/5 border-white/10 text-sm"
                                                    value={persona.description}
                                                    onChange={(e) => handlePersonaChange(index, "description", e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={prevStep} className="flex-1 border-white/10">
                                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                                        </Button>
                                        <Button onClick={nextStep} className="flex-1 bg-primary hover:bg-primary/90">
                                            Almost Done <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="glass border-white/5">
                                <CardHeader>
                                    <CardTitle>Create Your Account</CardTitle>
                                    <CardDescription>Secure your workspace and AI agents.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="bg-white/5 border-white/10"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="bg-white/5 border-white/10"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                    <div className="pt-4 space-y-4">
                                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm text-muted-foreground italic flex items-start gap-3">
                                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            By creating an account, we will immediately initialize your Ghostwriter, Scraper, and SDR agents based on your data.
                                        </div>
                                        <div className="flex gap-4">
                                            <Button variant="outline" onClick={prevStep} className="flex-1 border-white/10">
                                                Back
                                            </Button>
                                            <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90">
                                                Create Account & Launch
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
