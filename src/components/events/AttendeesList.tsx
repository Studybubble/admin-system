
import { Attendee, Event } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ChevronDown, ChevronRight, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  // Find events for each attendee
  const getEventForAttendee = (attendeeId: string) => {
    if (!events || events.length === 0) return null;
    
    return events.find(event => 
      event.attendees.some(a => a.id === attendeeId)
    );
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
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback />
                    </Avatar>
                    {attendee.name}
                  </TableCell>
                  <TableCell>{attendee.userType === "normal" ? `@${attendee.name.toLowerCase().split(' ').join('_')}` : "-"}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={attendee.userType === "guest" ? 
                        "bg-purple-50 text-purple-700 border-purple-200 rounded-full px-3 py-1" : 
                        "bg-gray-50 text-gray-700 border-gray-200 rounded-full px-3 py-1"}
                    >
                      {attendee.userType === "guest" ? "Guest" : "Normal"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {attendee.paymentStatus === "free" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Free
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(attendee.registeredAt).toLocaleDateString()}</TableCell>
                </TableRow>
                
                {expandedAttendees.has(attendee.id) && (
                  <TableRow className="bg-muted/20">
                    <TableCell colSpan={7} className="py-2 px-4">
                      <div className="pl-8">
                        <p className="text-sm font-medium mb-2">Registered Events:</p>
                        <div className="space-y-2">
                          {getEventForAttendee(attendee.id) ? (
                            <div className="flex items-center gap-2 text-sm bg-white p-2 rounded border">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{getEventForAttendee(attendee.id)?.title}</span>
                              <span className="text-xs text-muted-foreground">
                                ({getEventForAttendee(attendee.id)?.date})
                              </span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">No event information available</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
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
