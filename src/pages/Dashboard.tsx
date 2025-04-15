
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/data/mockData';
import { CalendarDays, Users, Ticket, Clock } from 'lucide-react';

export function Dashboard() {
  // Calculate summary statistics
  const totalEvents = events.length;
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees.length, 0);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
  
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">Across all time periods</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttendees}</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">Events yet to happen</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Type Split</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.filter(e => e.isFree).length} / {events.length}</div>
            <p className="text-xs text-muted-foreground">Free / Paid events</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="relative">
            <div 
              className="w-full h-64 md:h-80" 
              style={{
                background: "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 1000 600" 
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Oxford skyline silhouette - artistic style */}
                <g stroke="#33220D" strokeWidth="2.5" fill="none">
                  {/* Left spire */}
                  <path d="M100,400 L100,200 L130,100 L160,200 L160,400" fill="#e2d1c3" opacity="0.8" />
                  
                  {/* Left tower */}
                  <path d="M180,400 L180,150 L220,150 L220,400" fill="#FDE1D3" opacity="0.7" />
                  <path d="M180,150 L200,120 L220,150" fill="#FDE1D3" opacity="0.7" />
                  
                  {/* Central tower with dome */}
                  <path d="M300,400 L300,200 L380,200 L380,400" fill="#FEF7CD" opacity="0.8" />
                  <path d="M280,200 L340,120 L400,200" fill="#FEF7CD" opacity="0.8" />
                  
                  {/* Bridge between buildings */}
                  <path d="M400,280 L450,280 L450,320 L400,320" fill="#D3E4FD" opacity="0.6" />

                  {/* Right building with arches */}
                  <path d="M450,400 L450,180 L550,180 L550,400" fill="#F1F0FB" opacity="0.7" />
                  <path d="M470,250 C470,230 490,230 490,250" stroke="#33220D" fill="none" />
                  <path d="M510,250 C510,230 530,230 530,250" stroke="#33220D" fill="none" />
                  
                  {/* Right tower */}
                  <path d="M600,400 L600,150 L650,150 L650,400" fill="#fde1d3" opacity="0.8" />
                  <path d="M600,150 L625,100 L650,150" fill="#fde1d3" opacity="0.8" />
                  
                  {/* Far right dome */}
                  <path d="M700,400 L700,250 L800,250 L800,400" fill="#D6BCFA" opacity="0.6" />
                  <path d="M700,250 Q750,180 800,250" fill="#D6BCFA" opacity="0.6" />

                  {/* Background buildings - silhouettes */}
                  <path d="M50,400 L50,300 L70,280 L90,300 L90,400" fill="#e2d1c3" opacity="0.3" />
                  <path d="M830,400 L830,280 L870,280 L870,400" fill="#F1F0FB" opacity="0.3" />
                  <path d="M830,280 L850,250 L870,280" fill="#F1F0FB" opacity="0.3" />
                  <path d="M880,400 L880,320 L900,300 L920,320 L920,400" fill="#FDE1D3" opacity="0.3" />
                  
                  {/* Base line */}
                  <path d="M50,400 L950,400" stroke="#33220D" strokeWidth="3" />
                </g>
                
                {/* Abstract color spots for artistic effect */}
                <circle cx="200" cy="250" r="40" fill="#FEF7CD" opacity="0.2" />
                <circle cx="350" cy="300" r="60" fill="#FDE1D3" opacity="0.2" />
                <circle cx="500" cy="220" r="50" fill="#D3E4FD" opacity="0.2" />
                <circle cx="650" cy="280" r="45" fill="#D6BCFA" opacity="0.2" />
                <circle cx="750" cy="350" r="35" fill="#F1F0FB" opacity="0.2" />
              </svg>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
