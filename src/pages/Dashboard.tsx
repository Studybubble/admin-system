
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/data/mockData';
import { CalendarDays, Users, Ticket, Clock, ChartBar } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useEffect, useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

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

  // Create data for the days of the week chart
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Count events by day of the week
  const eventsByDay = events.reduce((acc, event) => {
    const day = getDayOfWeek(event.date);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Create data array for the chart with consistent day ordering
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartData = daysOfWeek.map(day => ({
    day,
    events: eventsByDay[day] || 0
  }));

  const chartConfig = {
    events: {
      label: "Events",
      theme: {
        light: "#9b87f5", // Using purple-400 color
        dark: "#9b87f5"
      }
    }
  };

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

      <div className="mt-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Distribution by Weekday</CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="day"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => (
                        <ChartTooltipContent 
                          active={active} 
                          payload={payload}
                          formatter={(value) => [`${value} events`, "Events"]}
                        />
                      )}
                    />
                    <Bar 
                      dataKey="events" 
                      name="Events" 
                      radius={[4, 4, 0, 0]} 
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
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
