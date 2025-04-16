
import React, { useState } from 'react';
import { Attendee, Event } from "@/data/mockData";
import { AttendeeRow } from './attendees/AttendeeRow';
import { AttendeeDetails } from './attendees/AttendeeDetails';

interface AttendeesListProps {
  attendees: Attendee[];
  events?: Event[];
}

export function AttendeesList({ attendees, events = [] }: AttendeesListProps) {
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
      <div className="space-y-3">
        <div className="grid grid-cols-7 px-4 py-2 bg-gray-50 rounded-md text-sm font-medium text-muted-foreground">
          <div className="w-[40px]"></div>
          <div>Attendee</div>
          <div>Username</div>
          <div>Email</div>
          <div>Type</div>
          <div>Payment Status</div>
          <div>Registered On</div>
        </div>
        
        <div className="space-y-2">
          {attendees.map((attendee) => (
            <React.Fragment key={attendee.id}>
              <AttendeeRow
                attendee={attendee}
                isExpanded={expandedAttendees.has(attendee.id)}
                onToggleExpand={() => toggleAttendeeExpansion(attendee.id)}
              />
              
              {expandedAttendees.has(attendee.id) && (
                <div className="ml-8 mt-1 bg-muted/20 p-4 rounded-md border border-gray-100">
                  <AttendeeDetails attendee={attendee} events={events} />
                </div>
              )}
            </React.Fragment>
          ))}
          {attendees.length === 0 && (
            <div className="text-center py-4 text-muted-foreground bg-white rounded-md border border-gray-100">
              No attendees registered yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
