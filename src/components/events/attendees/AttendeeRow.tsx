
import React from 'react';
import { Attendee, Event } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AttendeeRowProps {
  attendee: Attendee;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function AttendeeRow({ attendee, isExpanded, onToggleExpand }: AttendeeRowProps) {
  return (
    <div 
      className="grid grid-cols-7 px-4 py-2 items-center cursor-pointer rounded-md bg-white shadow-sm border border-gray-100 hover:bg-gray-50"
      onClick={onToggleExpand}
    >
      <div className="w-8">
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="font-medium flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback />
        </Avatar>
        {attendee.name}
      </div>
      <div>
        {attendee.userType === "normal" ? 
          `@${attendee.name.toLowerCase().split(' ').join('_')}` : "-"}
      </div>
      <div>{attendee.email}</div>
      <div>
        <Badge 
          variant="outline" 
          className={attendee.userType === "guest" ? 
            "bg-purple-50 text-gray-800 border-purple-200 rounded-full px-3 py-1" : 
            "bg-gray-50 text-gray-700 border-gray-200 rounded-full px-3 py-1"}
        >
          {attendee.userType === "guest" ? "Guest" : "Normal"}
        </Badge>
      </div>
      <div>
        {attendee.paymentStatus === "free" ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Free
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )}
      </div>
      <div>{new Date(attendee.registeredAt).toLocaleDateString()}</div>
    </div>
  );
}
