
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
  SidebarHeader
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
    <Sidebar className="bg-purple-100">
      <SidebarHeader className="bg-purple-100">
        <div className="flex items-center justify-start px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-purple-100 text-purple-700">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Hello, {name}</p>
              <p className="text-xs text-muted-foreground capitalize">{role} Account</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-purple-500 hover:bg-purple-200 ml-auto"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-purple-100">
        <SidebarGroup>
          <SidebarGroupLabel>{role === "admin" ? "Admin Menu" : "User Menu"}</SidebarGroupLabel>
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
    </Sidebar>
  );
}
