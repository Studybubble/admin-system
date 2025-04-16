import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, ChevronDown, ChevronRight, ArrowUpDown } from "lucide-react";
import { AttendeeWithEvents } from '@/utils/attendeeUtils';

interface AttendeesTableProps {
  attendees: AttendeeWithEvents[];
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: string) => void;
}

export function AttendeesTable({ 
  attendees, 
  sortField, 
  sortDirection, 
  handleSort 
}: AttendeesTableProps) {
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
    <div className="space-y-3">
      <div className="grid grid-cols-8 px-4 py-2 bg-gray-50 rounded-md text-sm font-medium text-muted-foreground">
        <div className="w-8"></div>
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleSort('name')}
        >
          Name
          {sortField === 'name' && (
            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
          )}
        </div>
        <div>Username</div>
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleSort('email')}
        >
          Email
          {sortField === 'email' && (
            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
          )}
        </div>
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleSort('userType')}
        >
          User Type
          {sortField === 'userType' && (
            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
          )}
        </div>
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleSort('paymentStatus')}
        >
          Payment
          {sortField === 'paymentStatus' && (
            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
          )}
        </div>
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleSort('registeredAt')}
        >
          Registered On
          {sortField === 'registeredAt' && (
            <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
          )}
        </div>
        <div>Events Count</div>
      </div>
      
      <div className="space-y-3">
        {attendees.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-white rounded-md border">
            No attendees found matching the current filters
          </div>
        ) : (
          attendees.map((attendee) => (
            <React.Fragment key={attendee.id}>
              <div 
                className={`grid grid-cols-8 px-4 py-3 items-center cursor-pointer 
                  ${expandedAttendees.has(attendee.id) ? 'bg-purple-50' : 'bg-white hover:bg-gray-50'}`}
                onClick={() => toggleAttendeeExpansion(attendee.id)}
              >
                <div className="p-2 w-8">
                  {expandedAttendees.has(attendee.id) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback />
                  </Avatar>
                  <span className="font-medium">{attendee.name}</span>
                </div>
                <div>
                  {attendee.userType === "normal" ? `@${attendee.name.toLowerCase().split(' ').join('_')}` : "-"}
                </div>
                <div>{attendee.email}</div>
                <div>
                  <Badge 
                    variant="outline" 
                    className={attendee.userType === 'guest' 
                      ? "bg-purple-50 text-[#333333] border-purple-200 rounded-full px-3 py-1" 
                      : "bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1"}
                  >
                    {attendee.userType === 'guest' ? 'Guest' : 'Normal'}
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline" className={attendee.paymentStatus === 'free' 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : "bg-amber-50 text-amber-700 border-amber-200"}>
                    {attendee.paymentStatus === 'free' ? 'Free' : 'Paid'}
                  </Badge>
                </div>
                <div>{new Date(attendee.registeredAt).toLocaleDateString()}</div>
                <div>
                  <Badge variant="secondary">{attendee.events?.length || 0}</Badge>
                </div>
              </div>
              
              {expandedAttendees.has(attendee.id) && (
                <div className="bg-muted/20 p-4 rounded-md ml-8 mt-1 border border-gray-100">
                  <AttendeeEventsRow attendee={attendee} />
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

function AttendeeEventsRow({ attendee }: { attendee: AttendeeWithEvents }) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Registered Events:</p>
      <div className="space-y-2">
        {attendee.events && attendee.events.length > 0 ? (
          attendee.events.map((event, index) => (
            <div key={index} className="flex items-center gap-2 text-sm bg-white p-2 rounded border">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{event.title}</span>
              <span className="text-xs text-muted-foreground">({event.date})</span>
              {!event.isFree && (
                <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200">
                  ${event.price}
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
  );
}

export default AttendeesTable;
