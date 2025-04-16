
import { Event } from "@/data/mockData";
import { useState } from "react";
import { AttendeesList } from "./AttendeesList";
import { EventRow } from "./EventRow";

interface EventsTableProps {
  events: Array<Event & { maxAttendees?: number }>;
}

export function EventsTable({ events }: EventsTableProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  
  const toggleEventExpansion = (eventId: string) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-9 px-4 py-2 bg-gray-50 rounded-md text-sm font-medium text-muted-foreground">
        <div>Event</div>
        <div>Date</div>
        <div>Time</div>
        <div>Location</div>
        <div>Type</div>
        <div>Price</div>
        <div>Attendees</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>
      
      <div className="space-y-3">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id}>
              <EventRow 
                event={event} 
                isExpanded={expandedEvent === event.id}
                onToggleExpand={() => toggleEventExpansion(event.id)}
              />
              
              {expandedEvent === event.id && (
                <div className="mt-1 bg-muted/30 rounded-md overflow-hidden">
                  <AttendeesList attendees={event.attendees} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground bg-white rounded-md border">
            No events found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}
