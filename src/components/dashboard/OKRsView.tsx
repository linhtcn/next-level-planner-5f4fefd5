import { motion } from "framer-motion";
import { ArrowLeft, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GrowthPlan } from "@/types/growth-plan";

interface OKRsViewProps {
  plan: GrowthPlan;
  onBack: () => void;
}

export const OKRsView = ({ plan, onBack }: OKRsViewProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-display text-xl font-bold">6-Month OKRs</h1>
              <p className="text-sm text-muted-foreground">
                Mục tiêu và kết quả then chốt
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold">{plan.profile.targetGoal}</h2>
              <p className="text-muted-foreground">
                {plan.profile.currentLevel} → {plan.profile.targetLevel}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Tiến độ tổng</span>
              <span className="font-medium">
                {Math.round(plan.okrs.reduce((acc, okr) => acc + okr.progress, 0) / plan.okrs.length)}%
              </span>
            </div>
            <Progress 
              value={Math.round(plan.okrs.reduce((acc, okr) => acc + okr.progress, 0) / plan.okrs.length)} 
              className="h-3" 
            />
          </div>
        </motion.div>

        {/* OKRs Timeline */}
        <div className="space-y-6">
          {plan.okrs.map((okr, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start gap-4">
                {/* Month Indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    okr.progress === 100 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary"
                  }`}>
                    <span className="font-display font-bold">T{okr.month}</span>
                  </div>
                  {index < plan.okrs.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2" />
                  )}
                </div>

                {/* OKR Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg font-semibold">
                      Tháng {okr.month}
                    </h3>
                    <span className={`text-sm font-medium ${
                      okr.progress === 100 ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {okr.progress}%
                    </span>
                  </div>

                  {/* Objective */}
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Objective</p>
                    <p className="font-medium">{okr.objective}</p>
                  </div>

                  {/* Key Results */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Key Results:</p>
                    {okr.keyResults.map((kr, krIndex) => (
                      <div 
                        key={krIndex}
                        className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                          okr.progress > (krIndex + 1) * (100 / okr.keyResults.length)
                            ? "bg-primary border-primary"
                            : "border-muted-foreground"
                        }`}>
                          {okr.progress > (krIndex + 1) * (100 / okr.keyResults.length) && (
                            <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <p className="text-sm flex-1">{kr}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <Progress value={okr.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};
