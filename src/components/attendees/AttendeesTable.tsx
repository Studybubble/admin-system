
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, ChevronDown, ChevronRight, ArrowUpDown } from "lucide-react";
import { AttendeeEvent, AttendeeWithEvents } from '@/utils/attendeeUtils';

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
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleSort('name')}
              >
                Name
                {sortField === 'name' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleSort('email')}
              >
                Email
                {sortField === 'email' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleSort('userType')}
              >
                User Type
                {sortField === 'userType' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleSort('paymentStatus')}
              >
                Payment
                {sortField === 'paymentStatus' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleSort('registeredAt')}
              >
                Registered On
                {sortField === 'registeredAt' && (
                  <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Events Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No attendees found matching the current filters
              </TableCell>
            </TableRow>
          ) : (
            attendees.map((attendee) => (
              <React.Fragment key={attendee.id}>
                <TableRow 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleAttendeeExpansion(attendee.id)}
                >
                  <TableCell className="p-2 w-8">
                    {expandedAttendees.has(attendee.id) ? (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback />
                    </Avatar>
                    <span className="font-medium">{attendee.name}</span>
                  </TableCell>
                  <TableCell>
                    {attendee.userType === "normal" ? `@${attendee.name.toLowerCase().split(' ').join('_')}` : "-"}
                  </TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={attendee.userType === 'guest' 
                        ? "bg-[#1A1F2C] text-white border-[#1A1F2C] rounded-full px-3 py-1" 
                        : "bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1"}
                    >
                      {attendee.userType === 'guest' ? 'Guest' : 'Normal'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={attendee.paymentStatus === 'free' 
                      ? "bg-green-50 text-green-700 border-green-200" 
                      : "bg-amber-50 text-amber-700 border-amber-200"}>
                      {attendee.paymentStatus === 'free' ? 'Free' : 'Paid'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(attendee.registeredAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{attendee.events?.length || 0}</Badge>
                  </TableCell>
                </TableRow>
                
                {expandedAttendees.has(attendee.id) && (
                  <AttendeeEventsRow attendee={attendee} />
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper component for the expanded events row
function AttendeeEventsRow({ attendee }: { attendee: AttendeeWithEvents }) {
  return (
    <TableRow className="bg-muted/20">
      <TableCell colSpan={8} className="py-2 px-4">
        <div className="pl-8">
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
      </TableCell>
    </TableRow>
  );
}
