
import React from 'react';
import { Attendee } from "@/data/mockData";
import { TableCell, TableRow } from "@/components/ui/table";
import { AttendeeEventsList } from './AttendeeEventsList';

interface AttendeeDetailsProps {
  attendee: Attendee;
}

export function AttendeeDetails({ attendee }: AttendeeDetailsProps) {
  return (
    <TableRow className="bg-muted/20">
      <TableCell colSpan={7} className="py-2 px-4">
        <AttendeeEventsList attendeeId={attendee.id} />
      </TableCell>
    </TableRow>
  );
}
