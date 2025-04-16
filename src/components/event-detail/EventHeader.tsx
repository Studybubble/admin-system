
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "@/data/mockData";

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <div className="flex items-center mt-1">
          <Badge className={event.isFree ? "bg-green-500" : "bg-blue-500"}>
            {event.isFree ? 'Free Event' : 'Paid Event'}
          </Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Link to={`/events/edit/${event.id}`}>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Event
          </Button>
        </Link>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Attendees
        </Button>
      </div>
    </div>
  );
}
