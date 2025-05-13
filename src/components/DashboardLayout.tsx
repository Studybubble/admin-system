
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { LogOut } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { User } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const { name, role } = useUser();
  const isDashboard = location.pathname === "/" || location.pathname === "/dashboard";

  const handleSignOut = () => {
    console.log("Sign out clicked");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <div className="bg-purple-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-purple-200 text-purple-700">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Hello, {name}</p>
                <p className="text-xs text-muted-foreground capitalize">{role} Account</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-purple-500 hover:bg-purple-100"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <div className="container p-4 md:p-6">
            {isDashboard && (
              <h1 className="text-2xl font-bold text-black mb-6">
                Event Management Dashboard
              </h1>
            )}
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
