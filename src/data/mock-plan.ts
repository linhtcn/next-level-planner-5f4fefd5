import { GrowthPlan, UserProfile } from "@/types/growth-plan";

export const generateMockPlan = (profile: UserProfile): GrowthPlan => {
  const skills = [
    { name: "System Design", currentLevel: 4, targetLevel: 8, priority: "high" as const },
    { name: "Code Review", currentLevel: 5, targetLevel: 8, priority: "high" as const },
    { name: "Leadership", currentLevel: 3, targetLevel: 7, priority: "medium" as const },
    { name: "Communication", currentLevel: 5, targetLevel: 8, priority: "medium" as const },
    { name: "Technical Writing", currentLevel: 4, targetLevel: 7, priority: "low" as const },
  ];

  const okrs = [
    {
      month: 1,
      objective: "Nắm vững kiến thức nền tảng System Design",
      keyResults: [
        "Hoàn thành 10 bài học System Design fundamentals",
        "Thực hành thiết kế 3 hệ thống đơn giản",
        "Viết 2 blog posts về kiến thức đã học",
      ],
      progress: 0,
    },
    {
      month: 2,
      objective: "Phát triển kỹ năng Code Review chuyên sâu",
      keyResults: [
        "Review 20 Pull Requests với feedback chi tiết",
        "Xây dựng checklist Code Review cá nhân",
        "Mentor 1 junior developer trong team",
      ],
      progress: 0,
    },
    {
      month: 3,
      objective: "Nâng cao năng lực Leadership trong dự án",
      keyResults: [
        "Lead 1 feature từ design đến deployment",
        "Tổ chức 4 buổi knowledge sharing với team",
        "Cải thiện sprint velocity 15%",
      ],
      progress: 0,
    },
    {
      month: 4,
      objective: "Xây dựng hệ thống phức tạp đầu tiên",
      keyResults: [
        "Thiết kế và implement microservice architecture",
        "Đạt 80% test coverage cho hệ thống mới",
        "Document đầy đủ technical decisions",
      ],
      progress: 0,
    },
    {
      month: 5,
      objective: "Mở rộng ảnh hưởng kỹ thuật trong công ty",
      keyResults: [
        "Trình bày 2 tech talks nội bộ",
        "Contribute vào coding standards của công ty",
        "Xây dựng 1 internal tool cho team",
      ],
      progress: 0,
    },
    {
      month: 6,
      objective: "Chuẩn bị và đạt được promotion",
      keyResults: [
        "Hoàn thành portfolio với 5 dự án highlight",
        "Nhận 3 endorsements từ senior engineers",
        "Pass technical interview level Senior",
      ],
      progress: 0,
    },
  ];

  const weeklyPlans = Array.from({ length: 26 }, (_, weekIndex) => {
    const week = weekIndex + 1;
    const monthIndex = Math.floor(weekIndex / 4);
    const focusAreas = [
      "System Design Fundamentals",
      "Design Patterns & Architecture",
      "Code Review Best Practices",
      "Leadership & Mentoring",
      "Advanced System Design",
      "Career Preparation",
    ];

    return {
      week,
      focus: focusAreas[monthIndex] || "Continuous Learning",
      tasks: [],
      goals: [
        `Hoàn thành ${3 + Math.floor(Math.random() * 2)} tasks chính trong tuần`,
        `Dành ${profile.dailyTime * 5}h cho học tập`,
        "Review lại kiến thức đã học cuối tuần",
      ],
    };
  });

  // Generate 180 days of tasks
  const taskTemplates = [
    { title: "Học System Design", skill: "System Design", duration: 60 },
    { title: "Đọc Clean Code chapter", skill: "Code Review", duration: 45 },
    { title: "Practice coding problems", skill: "Problem Solving", duration: 90 },
    { title: "Watch tech talk video", skill: "System Design", duration: 30 },
    { title: "Write technical blog", skill: "Technical Writing", duration: 60 },
    { title: "Review team PRs", skill: "Code Review", duration: 45 },
    { title: "Mentor session", skill: "Leadership", duration: 30 },
    { title: "Read engineering articles", skill: "System Design", duration: 30 },
  ];

  const dailyTasks = Array.from({ length: 180 }, (_, dayIndex) => {
    const day = dayIndex + 1;
    const tasksPerDay = Math.floor(profile.dailyTime * 60 / 45); // ~45 min per task
    
    return Array.from({ length: Math.min(tasksPerDay, 4) }, (_, taskIndex) => {
      const template = taskTemplates[(dayIndex + taskIndex) % taskTemplates.length];
      return {
        id: `task-${day}-${taskIndex}`,
        day,
        date: new Date(Date.now() + dayIndex * 24 * 60 * 60 * 1000).toISOString(),
        title: `${template.title} - Day ${day}`,
        description: `Nhiệm vụ ${taskIndex + 1} cho ngày ${day}: ${template.title.toLowerCase()}`,
        skill: template.skill,
        duration: template.duration,
        completed: false,
        resources: ["documentation.com", "video-tutorial.com"],
      };
    });
  }).flat();

  return {
    id: `plan-${Date.now()}`,
    userId: "user-1",
    profile,
    skills,
    okrs,
    weeklyPlans,
    dailyTasks,
    consistencyScore: 100,
    startDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
};
