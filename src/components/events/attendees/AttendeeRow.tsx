
import React from 'react';
import { Attendee, Event } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AttendeeRowProps {
  attendee: Attendee;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function AttendeeRow({ attendee, isExpanded, onToggleExpand }: AttendeeRowProps) {
  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50"
      onClick={onToggleExpand}
    >
      <TableCell className="p-2 w-8">
        {isExpanded ? (
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
      <TableCell>
        {attendee.userType === "normal" ? 
          `@${attendee.name.toLowerCase().split(' ').join('_')}` : "-"}
      </TableCell>
      <TableCell>{attendee.email}</TableCell>
      <TableCell>
        <Badge 
          variant="outline" 
          className={attendee.userType === "guest" ? 
            "bg-purple-50 text-gray-800 border-purple-200 rounded-full px-3 py-1" : 
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
  );
}
