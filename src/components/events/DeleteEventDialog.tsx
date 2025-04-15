
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEvents } from "@/context/EventsContext";
import { useToast } from "@/hooks/use-toast";

interface DeleteEventDialogProps {
  eventId: string;
  eventTitle: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function DeleteEventDialog({
  eventId,
  eventTitle,
  isOpen,
  setIsOpen,
}: DeleteEventDialogProps) {
  const { updateEvent } = useEvents();
  const { toast } = useToast();

  const handleDelete = () => {
    // In a real app, this would make an API call to delete the event
    // For now, we'll just simulate this by updating the context
    updateEvent(eventId, { isDeleted: true });
    
    // Show a toast notification
    toast({
      title: "Event Deleted",
      description: `${eventTitle} has been deleted`,
      variant: "destructive",
    });
    
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the event "{eventTitle}". 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
