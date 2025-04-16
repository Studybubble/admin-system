
import { Button } from "@/components/ui/button";
import { TicketX } from "lucide-react";
import { Link } from "react-router-dom";

export function EventNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <TicketX className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
      <p className="text-muted-foreground mb-4">The event you're looking for doesn't exist or has been removed.</p>
      <Link to="/events">
        <Button>Back to Events</Button>
      </Link>
    </div>
  );
}
