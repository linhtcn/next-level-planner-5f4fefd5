import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, CheckCircle2, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrowthPlan, DailyTask } from "@/types/growth-plan";

interface DailyTasksViewProps {
  plan: GrowthPlan;
  onUpdateTask: (taskId: string, completed: boolean) => void;
  onBack: () => void;
}

export const DailyTasksView = ({ plan, onUpdateTask, onBack }: DailyTasksViewProps) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);

  const daysInWeek = Array.from({ length: 7 }, (_, i) => (selectedWeek - 1) * 7 + i + 1);
  const currentDayTasks = plan.dailyTasks.filter((task) => task.day === selectedDay);
  const weekPlan = plan.weeklyPlans.find((w) => w.week === selectedWeek);

  const completedToday = currentDayTasks.filter((t) => t.completed).length;
  const totalToday = currentDayTasks.length;

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
              <h1 className="font-display text-xl font-bold">Kế hoạch 180 ngày</h1>
              <p className="text-sm text-muted-foreground">
                Tuần {selectedWeek} • {weekPlan?.focus}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            disabled={selectedWeek === 1}
            onClick={() => setSelectedWeek((w) => w - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Tuần trước
          </Button>
          <span className="font-display font-semibold">Tuần {selectedWeek} / 26</span>
          <Button
            variant="ghost"
            size="sm"
            disabled={selectedWeek === 26}
            onClick={() => setSelectedWeek((w) => w + 1)}
          >
            Tuần sau
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Day Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-6"
        >
          {daysInWeek.map((day) => {
            const dayTasks = plan.dailyTasks.filter((t) => t.day === day);
            const dayCompleted = dayTasks.filter((t) => t.completed).length;
            const isSelected = day === selectedDay;
            const isComplete = dayCompleted === dayTasks.length && dayTasks.length > 0;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 p-4 rounded-xl border transition-all duration-300 min-w-[80px] ${
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : isComplete
                    ? "bg-primary/10 border-primary/30"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <p className={`text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  Ngày
                </p>
                <p className="text-2xl font-display font-bold">{day}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {isComplete ? (
                    <CheckCircle2 className={`w-3 h-3 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                  ) : (
                    <span className={`text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {dayCompleted}/{dayTasks.length}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Day Stats */}
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-agent-daily" />
              <div>
                <p className="font-medium">Ngày {selectedDay}</p>
                <p className="text-sm text-muted-foreground">
                  {completedToday} / {totalToday} nhiệm vụ hoàn thành
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-display font-bold gradient-text">
                {totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tasks List */}
        <div className="space-y-3">
          {currentDayTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                task.completed
                  ? "bg-primary/10 border-primary/30"
                  : "bg-card border-border hover:border-primary/30"
              }`}
              onClick={() => onUpdateTask(task.id, !task.completed)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-primary border-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {task.completed && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-lg ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </p>
                  <p className="text-muted-foreground mt-1">{task.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span className="px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground">
                      {task.skill}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.duration} phút
                    </span>
                  </div>

                  {task.resources && task.resources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Tài liệu:</p>
                      <div className="flex flex-wrap gap-2">
                        {task.resources.map((resource, i) => (
                          <a
                            key={i}
                            href="#"
                            className="text-xs text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {resource}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};
