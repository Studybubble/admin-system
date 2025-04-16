
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/data/mockData';
import { CalendarDays, Users, Ticket, Clock } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useEffect, useState } from 'react';

export function Dashboard() {
  // Calculate summary statistics
  const totalEvents = events.length;
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees.length, 0);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
  
  // Add state for image loading
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Pre-load the image
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/bee12fff-e4d9-4656-bd23-674e34d8c978.png";
    img.onload = () => setImageLoaded(true);
  }, []);

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
        <Card>
          <AspectRatio ratio={16/6}>
            {!imageLoaded ? (
              <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center text-slate-400">
                Loading image...
              </div>
            ) : (
              <img 
                src="/lovable-uploads/bee12fff-e4d9-4656-bd23-674e34d8c978.png"
                alt="Oxford Skyline Watercolor"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            )}
          </AspectRatio>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
