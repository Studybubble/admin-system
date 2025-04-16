
import React, { useState } from 'react';
import { Attendee } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AttendeeRow } from './attendees/AttendeeRow';
import { AttendeeDetails } from './attendees/AttendeeDetails';

interface AttendeesListProps {
  attendees: Attendee[];
}

export function AttendeesList({ attendees }: AttendeesListProps) {
  const [expandedAttendees, setExpandedAttendees] = useState<Set<string>>(new Set());
  
  const toggleAttendeeExpansion = (attendeeId: string) => {
    const newExpanded = new Set(expandedAttendees);
    if (newExpanded.has(attendeeId)) {
      newExpanded.delete(attendeeId);
    } else {
      newExpanded.add(attendeeId);
    }
    setExpandedAttendees(newExpanded);
  };
  
  return (
    <div className="p-4">
      <h3 className="text-md font-medium mb-3">Registered Attendees</h3>
      <div className="bg-white border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Attendee</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Registered On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendees.map((attendee) => (
              <React.Fragment key={attendee.id}>
                <AttendeeRow
                  attendee={attendee}
                  isExpanded={expandedAttendees.has(attendee.id)}
                  onToggleExpand={() => toggleAttendeeExpansion(attendee.id)}
                />
                
                {expandedAttendees.has(attendee.id) && (
                  <AttendeeDetails attendee={attendee} />
                )}
              </React.Fragment>
            ))}
            {attendees.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No attendees registered yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
