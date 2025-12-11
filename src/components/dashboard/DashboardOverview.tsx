import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Target, Calendar, TrendingUp, Award, CheckCircle2, 
  Clock, Flame, ChevronRight, Brain, BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GrowthPlan, DailyTask } from "@/types/growth-plan";
import { DailyTasksView } from "./DailyTasksView";
import { OKRsView } from "./OKRsView";
import { ProgressChart } from "./ProgressChart";

interface DashboardOverviewProps {
  plan: GrowthPlan;
  onUpdateTask: (taskId: string, completed: boolean) => void;
}

export const DashboardOverview = ({ plan, onUpdateTask }: DashboardOverviewProps) => {
  const [activeView, setActiveView] = useState<"overview" | "daily" | "okrs" | "progress">("overview");

  const todayTasks = plan.dailyTasks.filter((task) => task.day === 1);
  const completedTasks = plan.dailyTasks.filter((task) => task.completed).length;
  const totalTasks = plan.dailyTasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const currentWeek = plan.weeklyPlans[0];

  if (activeView === "daily") {
    return <DailyTasksView plan={plan} onUpdateTask={onUpdateTask} onBack={() => setActiveView("overview")} />;
  }

  if (activeView === "okrs") {
    return <OKRsView plan={plan} onBack={() => setActiveView("overview")} />;
  }

  if (activeView === "progress") {
    return <ProgressChart plan={plan} onBack={() => setActiveView("overview")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold gradient-text">
                AI Growth Planner
              </h1>
              <p className="text-sm text-muted-foreground">
                {plan.profile.role} • {plan.profile.currentLevel} → {plan.profile.targetLevel}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass-card px-4 py-2 flex items-center gap-2">
                <Flame className="w-5 h-5 text-agent-progress" />
                <span className="font-semibold">{plan.consistencyScore}%</span>
                <span className="text-sm text-muted-foreground">Consistency</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Ngày hiện tại", value: "1/180", icon: Calendar, color: "text-agent-daily" },
            { label: "Tasks hoàn thành", value: `${completedTasks}/${totalTasks}`, icon: CheckCircle2, color: "text-primary" },
            { label: "Giờ học/ngày", value: `${plan.profile.dailyTime}h`, icon: Clock, color: "text-agent-skill" },
            { label: "OKRs hoàn thành", value: "0/6", icon: Target, color: "text-agent-goal" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
              <p className="text-2xl font-display font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold">Nhiệm vụ hôm nay</h2>
                <p className="text-sm text-muted-foreground">Ngày 1 - Khởi đầu hành trình</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setActiveView("daily")}>
                Xem tất cả
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {todayTasks.map((task) => (
                <TaskCard key={task.id} task={task} onToggle={onUpdateTask} />
              ))}
            </div>
          </motion.div>

          {/* This Week Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-agent-skill" />
              <h2 className="font-display text-xl font-bold">Tuần 1</h2>
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Focus</p>
              <p className="font-medium">{currentWeek.focus}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Goals tuần này:</p>
              {currentWeek.goals.map((goal, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <span className="text-xs text-primary">{i + 1}</span>
                  </div>
                  <p className="text-sm">{goal}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setActiveView("progress")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-agent-progress" />
                <h2 className="font-display text-xl font-bold">Tiến độ tổng</h2>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Hoàn thành</span>
                <span className="font-medium">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>

            <p className="text-sm text-muted-foreground">
              {completedTasks} / {totalTasks} nhiệm vụ đã hoàn thành
            </p>
          </motion.div>

          {/* OKRs Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 glass-card p-6 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setActiveView("okrs")}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-agent-goal" />
                <h2 className="font-display text-xl font-bold">6-Month OKRs</h2>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {plan.okrs.slice(0, 2).map((okr, i) => (
                <div key={i} className="bg-secondary/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Tháng {okr.month}</span>
                    <span className="text-xs text-primary">{okr.progress}%</span>
                  </div>
                  <p className="font-medium text-sm mb-2">{okr.objective}</p>
                  <Progress value={okr.progress} className="h-1" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const TaskCard = ({ 
  task, 
  onToggle 
}: { 
  task: DailyTask; 
  onToggle: (id: string, completed: boolean) => void;
}) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
        task.completed
          ? "bg-primary/10 border-primary/30"
          : "bg-secondary/50 border-border hover:border-primary/30"
      }`}
      onClick={() => onToggle(task.id, !task.completed)}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
            task.completed
              ? "bg-primary border-primary"
              : "border-muted-foreground"
          }`}
        >
          {task.completed && <CheckCircle2 className="w-3 h-3 text-primary-foreground" />}
        </div>
        <div className="flex-1">
          <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
            {task.title}
          </p>
          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
              {task.skill}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.duration} phút
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
