
import { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { RoleSwitcher } from './RoleSwitcher';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold text-black">
                Event Management Dashboard
              </h1>
              <div></div>
            </div>
            {children}
          </div>
        </main>
        <RoleSwitcher />
      </div>
    </SidebarProvider>
  );
}
