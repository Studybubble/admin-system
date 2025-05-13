
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Plus, 
  Settings,
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
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
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
  const { role } = useUser();
  const navItems = role === "admin" ? adminNavItems : userNavItems;
  
  return (
    <Sidebar className="bg-purple-200">
      <SidebarContent className="bg-purple-200">
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
