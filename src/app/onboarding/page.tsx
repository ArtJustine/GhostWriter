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

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    const [formData, setFormData] = useState({
        businessUrl: "",
        targetAudience: "",
        personas: [
            { name: "Persona 1", description: "" },
            { name: "Persona 2", description: "" },
            { name: "Persona 3", description: "" },
            { name: "Persona 4", description: "" },
            { name: "Persona 5", description: "" },
        ],
    });

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    const handlePersonaChange = (index: number, field: string, value: string) => {
        const newPersonas = [...formData.personas];
        newPersonas[index] = { ...newPersonas[index], [field]: value };
        setFormData({ ...formData, personas: newPersonas });
    };

    const handleSubmit = async () => {
        toast.loading("Setting up your workspace...");

        // Simulate API call
        setTimeout(() => {
            toast.dismiss();
            toast.success("Workspace ready!");
            router.push("/dashboard");
        }, 2000);
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
                                    <CardTitle>Ready to Launch?</CardTitle>
                                    <CardDescription>Your AI agents are ready to start researching and writing.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 text-center">
                                    <div className="p-6 rounded-full bg-primary/10 w-24 h-24 mx-auto flex items-center justify-center">
                                        <Check className="w-12 h-12 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-medium">Everything is set up!</p>
                                        <p className="text-sm text-muted-foreground">
                                            We'll initialize your Ghostwriter, Scraper, and SDR skills immediately.
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" onClick={prevStep} className="flex-1 border-white/10">
                                            Back
                                        </Button>
                                        <Button onClick={handleSubmit} className="flex-1 bg-primary hover:bg-primary/90">
                                            Finalize Setup
                                        </Button>
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
