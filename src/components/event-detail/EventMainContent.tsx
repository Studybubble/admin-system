
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Event } from "@/data/mockData";

interface EventMainContentProps {
  event: Event;
}

export function EventMainContent({ event }: EventMainContentProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      <div className="md:col-span-2">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <EventInfoCard event={event} />
        <EventStatsCard event={event} />
      </div>
    </div>
  );
}

function EventInfoCard({ event }: { event: Event }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CalendarDays className="mr-2 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Time</p>
              <p className="font-medium">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{event.location}</p>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Registered Attendees</p>
              <p className="font-medium">{event.attendees.length}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EventStatsCard({ event }: { event: Event }) {
  // Calculate stats
  const guestAttendees = event.attendees.filter(a => a.userType === 'guest').length;
  const normalAttendees = event.attendees.filter(a => a.userType === 'normal').length;
  const paidAttendees = event.attendees.filter(a => a.paymentStatus === 'paid').length;
  const freeAttendees = event.attendees.filter(a => a.paymentStatus === 'free').length;

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium mb-3">Attendee Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span>Guest Users:</span>
            <Badge variant="outline">{guestAttendees}</Badge>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Normal Users:</span>
            <Badge variant="outline">{normalAttendees}</Badge>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Paid Tickets:</span>
            <Badge variant="outline">{paidAttendees}</Badge>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Free Tickets:</span>
            <Badge variant="outline">{freeAttendees}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
