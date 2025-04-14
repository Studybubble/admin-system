
import { Event } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { 
  CalendarDays, 
  ChevronDown, 
  ChevronUp, 
  Clock,
  MapPin, 
  Pencil, 
  Trash, 
  Users 
} from "lucide-react";
import { isEventFull, formatTimeDisplay } from "@/utils/eventUtils";

interface EventRowProps {
  event: Event & { maxAttendees?: number };
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function EventRow({ event, isExpanded, onToggleExpand }: EventRowProps) {
  return (
    <TableRow 
      className={`cursor-pointer hover:bg-muted/50 ${isEventFull(event) ? 'bg-purple-100' : ''}`}
      onClick={onToggleExpand}
    >
      <TableCell className="font-medium flex items-center gap-2">
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
        {event.title}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          {event.date}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          {formatTimeDisplay(event.time)}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {event.location}
        </div>
      </TableCell>
      <TableCell>
        {event.isFree ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Free
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Paid
          </Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          {event.maxAttendees ? (
            <span className="flex items-center">
              {event.attendees.length}/{event.maxAttendees}
              {isEventFull(event) && (
                <Badge className="ml-2 bg-red-500">Full</Badge>
              )}
            </span>
          ) : (
            <span>{event.attendees.length}</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Link to={`/events/${event.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
