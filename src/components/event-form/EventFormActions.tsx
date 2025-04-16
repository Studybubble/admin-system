
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface EventFormActionsProps {
  isSubmitting: boolean;
  isEditMode: boolean;
}

export function EventFormActions({ isSubmitting, isEditMode }: EventFormActionsProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate('/events')}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEditMode ? 'Update Event' : 'Create Event'}
      </Button>
    </div>
  );
}
