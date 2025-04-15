
import { Attendee } from "@/data/mockData";
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
import { ChevronDown, ChevronRight, User } from "lucide-react";

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
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Registered On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendees.map((attendee, index) => (
              <>
                <TableRow 
                  key={attendee.id}
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
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    {attendee.name}
                  </TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={attendee.userType === "guest" ? 
                      "bg-purple-50 text-purple-700 border-purple-200" : 
                      "bg-gray-50 text-gray-700 border-gray-200"}>
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
                    <TableCell colSpan={6} className="py-2 px-4">
                      <div className="ml-6 border-l-2 border-muted pl-4 py-1">
                        <p className="text-sm text-muted-foreground">
                          This attendee registered for this event on {new Date(attendee.registeredAt).toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            {attendees.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
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
