
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from '@/components/DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const isDashboard = location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger />
              {isDashboard ? (
                <h1 className="text-2xl font-bold text-black">
                  Event Management Dashboard
                </h1>
              ) : (
                <div></div>
              )}
              <div></div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
