import { useState, useEffect } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { AgentProcessing } from "@/components/dashboard/AgentProcessing";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { UserProfile, GrowthPlan } from "@/types/growth-plan";
import { generateMockPlan } from "@/data/mock-plan";

type AppState = "landing" | "onboarding" | "processing" | "dashboard";

const getPlanStorageKey = (email: string) => `user_growth_plan_${email}`;

const UserDashboard = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [growthPlan, setGrowthPlan] = useState<GrowthPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing plan on mount
  useEffect(() => {
    // Get current user
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user || !user.email) {
      setIsLoading(false);
      return;
    }

    const planKey = getPlanStorageKey(user.email);
    const savedPlan = localStorage.getItem(planKey);
    if (savedPlan) {
      try {
        const plan: GrowthPlan = JSON.parse(savedPlan);
        // Verify plan belongs to current user
        if (plan.userId === user.id || plan.userId === "user-1") {
          setGrowthPlan(plan);
          setUserProfile(plan.profile);
          setAppState("dashboard");
        } else {
          // Plan belongs to different user, clear it
          localStorage.removeItem(planKey);
        }
      } catch (error) {
        console.error("Error loading saved plan:", error);
        localStorage.removeItem(planKey);
      }
    }
    setIsLoading(false);
  }, []);

  const handleGetStarted = () => {
    setAppState("onboarding");
  };

  const handleOnboardingSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState("processing");
  };

  const handleProcessingComplete = () => {
    if (userProfile) {
      // Get current user
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const userId = user?.id || "user-1";
      const userEmail = user?.email || "";
      
      if (!userEmail) {
        console.error("User email not found");
        return;
      }
      
      const plan = generateMockPlan(userProfile);
      // Link plan to current user
      plan.userId = userId;
      setGrowthPlan(plan);
      // Save plan to localStorage using email as key
      const planKey = getPlanStorageKey(userEmail);
      localStorage.setItem(planKey, JSON.stringify(plan));
      setAppState("dashboard");
    }
  };

  const handleUpdateTask = (taskId: string, completed: boolean) => {
    if (!growthPlan) return;

    // Get current user email
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const userEmail = user?.email || "";
    
    if (!userEmail) {
      console.error("User email not found");
      return;
    }

    const updatedPlan = {
      ...growthPlan,
      dailyTasks: growthPlan.dailyTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      ),
    };
    
    // Recalculate consistency score
    const completedTasks = updatedPlan.dailyTasks.filter((t) => t.completed).length;
    const totalTasks = updatedPlan.dailyTasks.length;
    const progressPercent = (completedTasks / totalTasks) * 100;
    updatedPlan.consistencyScore = Math.max(60, 100 - (100 - progressPercent) * 0.4);
    
    setGrowthPlan(updatedPlan);
    // Save updated plan to localStorage using email as key
    const planKey = getPlanStorageKey(userEmail);
    localStorage.setItem(planKey, JSON.stringify(updatedPlan));
  };

  // Show loading state while checking for existing plan
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your plan...</p>
        </div>
      </div>
    );
  }

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

export default UserDashboard;
