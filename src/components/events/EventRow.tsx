
import { Event } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  Pencil, 
  Trash, 
  Users 
} from "lucide-react";
import { isEventFull, formatTimeDisplay } from "@/utils/eventUtils";
import { useState } from "react";
import { DeleteEventDialog } from "./DeleteEventDialog";

interface EventRowProps {
  event: Event & { maxAttendees?: number };
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function EventRow({ event, isExpanded, onToggleExpand }: EventRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isEventFullStatus = isEventFull(event);
  
  return (
    <>
      <div 
        className={`grid grid-cols-9 px-4 py-3 items-center cursor-pointer 
          ${isExpanded ? 'bg-purple-50' : 'bg-white hover:bg-gray-50'} 
          ${isEventFullStatus ? 'bg-purple-100' : ''}`}
        onClick={onToggleExpand}
      >
        <div className="font-medium flex items-center gap-2">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
          {event.title}
        </div>
        <div>
          {event.date}
        </div>
        <div>
          {formatTimeDisplay(event.time)}
        </div>
        <div>
          {event.location}
        </div>
        <div>
          {event.isFree ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Free
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Paid
            </Badge>
          )}
        </div>
        <div>
          {event.isFree ? (
            "-"
          ) : (
            <span className="font-medium">£{event.price?.toFixed(2) || "0.00"}</span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            {event.maxAttendees ? (
              <span className="flex items-center">
                {event.attendees.length}/{event.maxAttendees}
                {isEventFullStatus && (
                  <Badge className="ml-2 bg-red-500">Full</Badge>
                )}
              </span>
            ) : (
              <span>{event.attendees.length}</span>
            )}
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Link to={`/events/${event.id}/edit`}>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-600"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <DeleteEventDialog 
        eventId={event.id}
        eventTitle={event.title}
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </>
  );
}
