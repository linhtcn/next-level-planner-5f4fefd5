import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { UserProfile } from "@/types/growth-plan";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Rocket, Briefcase, Target, Clock } from "lucide-react";

interface OnboardingFormProps {
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "DevOps Engineer",
  "Data Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer",
  "Mobile Developer",
];

const levels = ["Junior", "Middle", "Senior", "Lead", "Principal"];

export const OnboardingForm = ({ onSubmit, onBack }: OnboardingFormProps) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    role: "",
    currentLevel: "",
    dailyTime: 2,
    targetGoal: "",
    targetLevel: "",
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const handleSubmit = () => {
    onSubmit(profile);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return profile.role && profile.currentLevel;
      case 2:
        return profile.targetLevel && profile.targetGoal;
      case 3:
        return profile.dailyTime > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const steps = [
    { icon: Briefcase, title: "Vị trí hiện tại" },
    { icon: Target, title: "Mục tiêu" },
    { icon: Clock, title: "Thời gian" },
    { icon: Rocket, title: "Xác nhận" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  i + 1 <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <s.icon className="w-5 h-5" />
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                    i + 1 < step ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold mb-2">
                    Vị trí hiện tại của bạn
                  </h2>
                  <p className="text-muted-foreground">
                    Cho chúng tôi biết về công việc hiện tại
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={profile.role}
                      onValueChange={(value) =>
                        setProfile({ ...profile, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Level hiện tại</Label>
                    <Select
                      value={profile.currentLevel}
                      onValueChange={(value) =>
                        setProfile({ ...profile, currentLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold mb-2">
                    Mục tiêu 6 tháng
                  </h2>
                  <p className="text-muted-foreground">
                    Bạn muốn đạt được gì trong 6 tháng tới?
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetLevel">Level mục tiêu</Label>
                    <Select
                      value={profile.targetLevel}
                      onValueChange={(value) =>
                        setProfile({ ...profile, targetLevel: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn level mục tiêu" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal">Mục tiêu cụ thể</Label>
                    <Input
                      id="goal"
                      placeholder="VD: Thăng tiến lên Senior Developer"
                      value={profile.targetGoal}
                      onChange={(e) =>
                        setProfile({ ...profile, targetGoal: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold mb-2">
                    Thời gian học mỗi ngày
                  </h2>
                  <p className="text-muted-foreground">
                    Bạn có thể dành bao nhiêu giờ mỗi ngày để phát triển?
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="text-center">
                    <span className="text-6xl font-display font-bold gradient-text">
                      {profile.dailyTime}
                    </span>
                    <span className="text-2xl text-muted-foreground ml-2">
                      giờ/ngày
                    </span>
                  </div>

                  <Slider
                    value={[profile.dailyTime]}
                    onValueChange={(value) =>
                      setProfile({ ...profile, dailyTime: value[0] })
                    }
                    max={8}
                    min={0.5}
                    step={0.5}
                    className="w-full"
                  />

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>30 phút</span>
                    <span>8 giờ</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl font-bold mb-2">
                    Xác nhận thông tin
                  </h2>
                  <p className="text-muted-foreground">
                    AI sẽ tạo lộ trình dựa trên thông tin này
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="glass-card p-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Role</span>
                    <span className="font-medium">{profile.role}</span>
                  </div>
                  <div className="glass-card p-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Level hiện tại</span>
                    <span className="font-medium">{profile.currentLevel}</span>
                  </div>
                  <div className="glass-card p-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Level mục tiêu</span>
                    <span className="font-medium text-primary">
                      {profile.targetLevel}
                    </span>
                  </div>
                  <div className="glass-card p-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Mục tiêu</span>
                    <span className="font-medium">{profile.targetGoal}</span>
                  </div>
                  <div className="glass-card p-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Thời gian/ngày</span>
                    <span className="font-medium">{profile.dailyTime} giờ</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <Button variant="ghost" onClick={handlePrev}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              {step === 4 ? (
                <>
                  Tạo lộ trình
                  <Rocket className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Tiếp tục
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
