
import { Event } from "@/data/mockData";
import { useState } from "react";
import { AttendeesList } from "./AttendeesList";
import { EventRow } from "./EventRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="overflow-x-auto rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Attendees</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => (
              <>
                <EventRow 
                  key={event.id}
                  event={event} 
                  isExpanded={expandedEvent === event.id}
                  onToggleExpand={() => toggleEventExpansion(event.id)}
                />
                
                {expandedEvent === event.id && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={7} className="p-0">
                      <AttendeesList attendees={event.attendees} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No events found matching your filters
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
