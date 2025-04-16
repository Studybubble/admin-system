import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Plus, 
  Settings,
  LogOut,
  User
} from "lucide-react";
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
  SidebarFooter
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    url: "/events",
    icon: CalendarDays,
  },
  {
    title: "Create Event",
    url: "/events/create",
    icon: Plus,
  },
  {
    title: "Attendees",
    url: "/attendees",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const handleSignOut = () => {
    console.log("Sign out clicked");
  };

  return (
    <Sidebar className="bg-gradient-to-b from-purple-50 via-purple-100 to-[#1E3A8A]">
      <SidebarHeader>
        <div className="flex items-center justify-start px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-purple-200 text-purple-700">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Hello, Admin</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-purple-500 hover:bg-purple-100 ml-auto"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-purple-50 via-purple-100 to-[#1E3A8A]">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gradient-to-b from-purple-50 via-purple-100 to-sky-200">
        <div className="px-4 py-2 text-xs text-purple-700">
          Events Admin Dashboard v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
