
import { Event } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge, CalendarDays, Edit, MapPin, Users } from "lucide-react";

interface EventCardsProps {
  events: Array<Event & { maxAttendees?: number }>;
}

export function EventCards({ events }: EventCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {events.map((event) => (
        <div key={event.id} className="border rounded-lg overflow-hidden bg-card shadow-sm">
          <div className="relative">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <Badge className="absolute top-2 right-2 bg-white text-black">
              {event.isFree ? 'Free' : 'Paid'}
            </Badge>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>{event.attendees.length} attendees</span>
              </div>
            </div>
            {!event.isFree && (
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Price: £{event.price?.toFixed(2) || "0.00"}
              </div>
            )}
            <div className="flex space-x-2">
              <Link to={`/events/${event.id}`} className="flex-1">
                <Button variant="outline" className="w-full">View</Button>
              </Link>
              <Link to={`/events/${event.id}/edit`} className="flex-1">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
