
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Calendar } from "lucide-react";
import { AttendeeWithEvents } from '@/utils/attendeeUtils';
import { useEvents } from '@/context/EventsContext';

interface AttendeeEventsRowProps {
  attendee: AttendeeWithEvents;
}

export function AttendeeEventsRow({ attendee }: AttendeeEventsRowProps) {
  const { events } = useEvents();
  
  // Get the latest event data from context
  const getLatestEventInfo = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return null;
    
    return {
      title: event.title,
      date: event.date,
      isFree: event.isFree,
      price: event.price
    };
  };
  
  // Map updated event data
  const updatedEvents = attendee.events.map(event => {
    const latestInfo = getLatestEventInfo(event.id);
    return latestInfo ? { ...event, ...latestInfo } : event;
  }).filter(Boolean);

  return (
    <TableRow className="bg-muted/20">
      <TableCell colSpan={8} className="py-2 px-4">
        <div className="pl-8">
          <p className="text-sm font-medium mb-2">Registered Events:</p>
          <div className="space-y-2">
            {updatedEvents.length > 0 ? (
              updatedEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-2 text-sm bg-white p-2 rounded border">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">{event.title}</span>
                  <span className="text-xs text-muted-foreground">({event.date})</span>
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
              <p className="text-sm text-muted-foreground">No events found</p>
            )}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
