import { 
  LayoutDashboard, Users, BarChart3, FileText, Settings, 
  ArrowLeft, TrendingUp, Building2 
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Team Members", url: "/admin/members", icon: Users },
  { title: "Departments", url: "/admin/departments", icon: Building2 },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Reports", url: "/admin/reports", icon: FileText },
];

interface AdminSidebarProps {
  onBackToUser: () => void;
}

export const AdminSidebar = ({ onBackToUser }: AdminSidebarProps) => {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg gradient-text">Admin Portal</h2>
            <p className="text-xs text-muted-foreground">Team Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                      activeClassName="bg-primary/10 text-primary"
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/admin/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                    activeClassName="bg-primary/10 text-primary"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 border-t border-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2" 
          onClick={onBackToUser}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to User View
        </Button>
      </div>
    </Sidebar>
  );
};
