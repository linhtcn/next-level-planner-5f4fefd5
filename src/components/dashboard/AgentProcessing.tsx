import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Target, Calendar, TrendingUp, Users, CheckCircle2, Loader2 } from "lucide-react";
import { AgentStatus } from "@/types/growth-plan";

interface AgentProcessingProps {
  onComplete: () => void;
}

const agents: { id: string; name: string; icon: React.ElementType; description: string; color: string }[] = [
  {
    id: "skill-gap",
    name: "Skill Gap Agent",
    icon: Brain,
    description: "Đang phân tích khoảng cách kỹ năng...",
    color: "text-agent-skill",
  },
  {
    id: "goal-planning",
    name: "Goal Planning Agent",
    icon: Target,
    description: "Đang tạo mục tiêu SMART 6 tháng...",
    color: "text-agent-goal",
  },
  {
    id: "daily-breakdown",
    name: "Daily Breakdown Agent",
    icon: Calendar,
    description: "Đang chia nhỏ thành 180 ngày...",
    color: "text-agent-daily",
  },
  {
    id: "progress-tracker",
    name: "Progress Tracker Agent",
    icon: TrendingUp,
    description: "Đang thiết lập hệ thống theo dõi...",
    color: "text-agent-progress",
  },
  {
    id: "hr-summary",
    name: "HR Summary Agent",
    icon: Users,
    description: "Đang chuẩn bị báo cáo đánh giá...",
    color: "text-agent-hr",
  },
];

export const AgentProcessing = ({ onComplete }: AgentProcessingProps) => {
  const [currentAgent, setCurrentAgent] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, AgentStatus>>(
    agents.reduce((acc, agent) => ({
      ...acc,
      [agent.id]: { name: agent.name, status: "idle", progress: 0 },
    }), {})
  );

  useEffect(() => {
    const processAgent = async (index: number) => {
      if (index >= agents.length) {
        setTimeout(onComplete, 500);
        return;
      }

      const agent = agents[index];
      
      // Start processing
      setStatuses((prev) => ({
        ...prev,
        [agent.id]: { ...prev[agent.id], status: "processing", progress: 0 },
      }));

      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        setStatuses((prev) => ({
          ...prev,
          [agent.id]: { ...prev[agent.id], progress: i },
        }));
      }

      // Complete
      setStatuses((prev) => ({
        ...prev,
        [agent.id]: { ...prev[agent.id], status: "complete", progress: 100 },
      }));

      setCurrentAgent(index + 1);
      setTimeout(() => processAgent(index + 1), 300);
    };

    processAgent(0);
  }, [onComplete]);

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold mb-4">
            AI Agents đang làm việc
          </h2>
          <p className="text-muted-foreground text-lg">
            5 AI Agents đang phối hợp để tạo lộ trình phát triển cho bạn
          </p>
        </motion.div>

        <div className="space-y-4">
          {agents.map((agent, index) => {
            const status = statuses[agent.id];
            const isActive = index === currentAgent;
            const isComplete = status.status === "complete";
            const Icon = agent.icon;

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-6 transition-all duration-500 ${
                  isActive ? "border-primary glow-effect" : ""
                } ${isComplete ? "border-primary/50" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isComplete
                        ? "bg-primary/20"
                        : isActive
                        ? "bg-primary/10"
                        : "bg-secondary"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-7 h-7 text-primary" />
                    ) : isActive ? (
                      <Loader2 className={`w-7 h-7 ${agent.color} animate-spin`} />
                    ) : (
                      <Icon className={`w-7 h-7 ${agent.color} opacity-50`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      {isComplete && (
                        <span className="text-xs text-primary font-medium">
                          Hoàn thành
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {agent.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${status.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
