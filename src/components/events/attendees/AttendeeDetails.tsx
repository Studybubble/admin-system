
import React from 'react';
import { Attendee, Event } from "@/data/mockData";
import { TableCell, TableRow } from "@/components/ui/table";
import { AttendeeEventsList } from './AttendeeEventsList';

interface AttendeeDetailsProps {
  attendee: Attendee;
  events?: Event[];
}

export function AttendeeDetails({ attendee, events = [] }: AttendeeDetailsProps) {
  return (
    <TableRow className="bg-muted/20">
      <TableCell colSpan={7} className="py-2 px-4">
        <AttendeeEventsList attendeeId={attendee.id} events={events} />
      </TableCell>
    </TableRow>
  );
}
