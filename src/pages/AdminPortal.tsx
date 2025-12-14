import { useState, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { TeamMembersList } from "@/components/admin/TeamMembersList";
import { MemberDetailView } from "@/components/admin/MemberDetailView";
import { Leaderboard } from "@/components/admin/Leaderboard";
import { 
  generateMockTeamMembers, 
  generateTeamStats, 
  generateDepartmentSummaries 
} from "@/data/mock-team";

const AdminPortal = () => {
  const navigate = useNavigate();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  
  const members = useMemo(() => generateMockTeamMembers(12), []);
  const stats = useMemo(() => generateTeamStats(members), [members]);
  const departments = useMemo(() => generateDepartmentSummaries(members), [members]);

  const handleViewMember = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const handleBackFromMember = () => {
    setSelectedMemberId(null);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    // Navigate back to home page
    navigate("/");
  };

  const selectedMember = members.find(m => m.id === selectedMemberId);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar onLogout={handleLogout} onNavigate={handleBackFromMember} />
        
        <SidebarInset className="flex-1 overflow-auto">
          {/* Mobile trigger button */}
          <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border/50 bg-card/50 backdrop-blur-xl px-4 md:hidden">
            <SidebarTrigger className="md:hidden" />
          </div>
          
          {selectedMember ? (
            <MemberDetailView 
              member={selectedMember} 
              onBack={handleBackFromMember} 
            />
          ) : (
            <Routes>
              <Route 
                index 
                element={
                  <AdminDashboard 
                    stats={stats} 
                    departments={departments}
                    onViewMember={handleViewMember}
                  />
                } 
              />
              <Route 
                path="members" 
                element={
                  <TeamMembersList 
                    members={members} 
                    onViewMember={handleViewMember}
                  />
                } 
              />
              <Route 
                path="leaderboard" 
                element={
                  <Leaderboard 
                    members={members} 
                    onViewMember={handleViewMember}
                  />
                } 
              />
            </Routes>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminPortal;
