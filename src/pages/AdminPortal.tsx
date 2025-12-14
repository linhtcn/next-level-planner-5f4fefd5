import { useState, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { TeamMembersList } from "@/components/admin/TeamMembersList";
import { MemberDetailView } from "@/components/admin/MemberDetailView";
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

  const handleBackToUser = () => {
    navigate("/");
  };

  const selectedMember = members.find(m => m.id === selectedMemberId);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar onBackToUser={handleBackToUser} />
        
        <main className="flex-1 overflow-auto">
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
                path="departments" 
                element={
                  <div className="p-6">
                    <h1 className="font-display text-3xl font-bold mb-2">Departments</h1>
                    <p className="text-muted-foreground">Department management coming soon...</p>
                  </div>
                } 
              />
              <Route 
                path="analytics" 
                element={
                  <div className="p-6">
                    <h1 className="font-display text-3xl font-bold mb-2">Analytics</h1>
                    <p className="text-muted-foreground">Advanced analytics coming soon...</p>
                  </div>
                } 
              />
              <Route 
                path="reports" 
                element={
                  <div className="p-6">
                    <h1 className="font-display text-3xl font-bold mb-2">Reports</h1>
                    <p className="text-muted-foreground">HR reports generation coming soon...</p>
                  </div>
                } 
              />
              <Route 
                path="settings" 
                element={
                  <div className="p-6">
                    <h1 className="font-display text-3xl font-bold mb-2">Settings</h1>
                    <p className="text-muted-foreground">Admin settings coming soon...</p>
                  </div>
                } 
              />
            </Routes>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminPortal;
