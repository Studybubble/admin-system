
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Plus, 
  Settings,
  LogOut,
  User,
  Wallet,
  Search
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
import { useUser } from "@/context/UserContext";

const adminNavItems = [
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

const userNavItems = [
  {
    title: "Dashboard",
    url: "/user",
    icon: LayoutDashboard,
  },
  {
    title: "Discover Events",
    url: "/user/discover",
    icon: Search,
  },
  {
    title: "My Events",
    url: "/user/events",
    icon: CalendarDays,
  },
  {
    title: "My Wallet",
    url: "/user/wallet",
    icon: Wallet,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const { name, role } = useUser();
  const navItems = role === "admin" ? adminNavItems : userNavItems;
  
  const handleSignOut = () => {
    console.log("Sign out clicked");
  };

  return (
    <Sidebar 
      className={
        role === "user" 
          ? "bg-gradient-to-b from-baby-blue-50 via-baby-blue-50 to-baby-blue-100" 
          : "bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200"
      }
    >
      <SidebarHeader>
        <div className="flex items-center justify-start px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-baby-blue-100 text-blue-700">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-blue-800">Hello, {name}</p>
              <p className="text-xs text-blue-600 capitalize">{role} Account</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-blue-600 hover:bg-baby-blue-100 ml-auto"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent 
        className={
          role === "user" 
            ? "bg-gradient-to-b from-baby-blue-50 via-baby-blue-50 to-baby-blue-100" 
            : "bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200"
        }
      >
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-700">{role === "admin" ? "Admin Menu" : "User Menu"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="text-blue-800 hover:bg-baby-blue-100">
                      <item.icon className="h-5 w-5 text-blue-700" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter 
        className={
          role === "user" 
            ? "bg-gradient-to-b from-baby-blue-50 via-baby-blue-50 to-baby-blue-100 text-blue-800" 
            : "bg-gradient-to-b from-purple-50 via-purple-100 to-purple-200 text-purple-700"
        }
      >
        <div className="px-4 py-2 text-xs text-blue-700">
          User Dashboard v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
