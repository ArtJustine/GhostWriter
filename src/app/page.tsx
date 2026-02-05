"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // For now, just redirect to onboarding
    router.push("/onboarding");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-xl" />
        <p className="text-muted-foreground">Initializing GhostWriter...</p>
      </div>
    </div>
  );
}
