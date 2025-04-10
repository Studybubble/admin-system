
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/data/mockData';
import { CalendarDays, Users, Ticket, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  // Calculate summary statistics
  const totalEvents = events.length;
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees.length, 0);
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
  
  // Get next upcoming event
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextEvent = sortedEvents.find(event => new Date(event.date) > new Date()) || sortedEvents[0];
  
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
        <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{event.attendees.length} attendees</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>{event.isFree ? 'Free Event' : 'Paid Event'}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    to={`/events/${event.id}`} 
                    className="text-primary hover:underline text-sm"
                  >
                    View details →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {nextEvent && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Next Upcoming Event</h2>
          <Card>
            <div className="md:flex">
              <img
                src={nextEvent.imageUrl}
                alt={nextEvent.title}
                className="w-full md:w-1/3 h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{nextEvent.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{nextEvent.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    <span>{nextEvent.date} • {nextEvent.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{nextEvent.attendees.length} attendees registered</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link 
                    to={`/events/${nextEvent.id}`} 
                    className="text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-sm"
                  >
                    View Event Details
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
