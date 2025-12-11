import { useState } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { AgentProcessing } from "@/components/dashboard/AgentProcessing";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { UserProfile, GrowthPlan } from "@/types/growth-plan";
import { generateMockPlan } from "@/data/mock-plan";

type AppState = "landing" | "onboarding" | "processing" | "dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [growthPlan, setGrowthPlan] = useState<GrowthPlan | null>(null);

  const handleGetStarted = () => {
    setAppState("onboarding");
  };

  const handleOnboardingSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState("processing");
  };

  const handleProcessingComplete = () => {
    if (userProfile) {
      const plan = generateMockPlan(userProfile);
      setGrowthPlan(plan);
      setAppState("dashboard");
    }
  };

  const handleUpdateTask = (taskId: string, completed: boolean) => {
    if (!growthPlan) return;

    setGrowthPlan({
      ...growthPlan,
      dailyTasks: growthPlan.dailyTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      ),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {appState === "landing" && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}

      {appState === "onboarding" && (
        <OnboardingForm
          onSubmit={handleOnboardingSubmit}
          onBack={() => setAppState("landing")}
        />
      )}

      {appState === "processing" && (
        <AgentProcessing onComplete={handleProcessingComplete} />
      )}

      {appState === "dashboard" && growthPlan && (
        <DashboardOverview plan={growthPlan} onUpdateTask={handleUpdateTask} />
      )}
    </div>
  );
};

export default Index;
