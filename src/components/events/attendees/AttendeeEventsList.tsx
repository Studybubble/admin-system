
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useEvents } from "@/context/EventsContext";

interface AttendeeEventsListProps {
  attendeeId: string;
}

export function AttendeeEventsList({ attendeeId }: AttendeeEventsListProps) {
  // Use the events context to always get fresh data
  const { events } = useEvents();
  
  // Find events for this attendee
  const getEventsForAttendee = () => {
    if (!events || events.length === 0) return [];
    
    return events.filter(event => 
      event.attendees.some(a => a.id === attendeeId)
    );
  };

  const attendeeEvents = getEventsForAttendee();

  return (
    <div className="pl-8">
      <p className="text-sm font-medium mb-2">Registered Events:</p>
      <div className="space-y-2">
        {attendeeEvents.length > 0 ? (
          attendeeEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-2 text-sm bg-white p-2 rounded border">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{event.title}</span>
              <span className="text-xs text-muted-foreground">
                ({event.date})
              </span>
              {!event.isFree && (
                <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200">
                  £{event.price?.toFixed(2) || "0.00"}
                </Badge>
              )}
              {event.isFree && (
                <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
                  Free
                </Badge>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No registered events found</p>
        )}
      </div>
    </div>
  );
}
