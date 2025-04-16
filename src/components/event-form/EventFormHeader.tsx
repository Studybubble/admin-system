
import React from 'react';

interface EventFormHeaderProps {
  isEditMode: boolean;
}

export function EventFormHeader({ isEditMode }: EventFormHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Event' : 'Create New Event'}</h1>
      <p className="text-muted-foreground">
        {isEditMode ? 'Update your event details below' : 'Fill in the details to create a new event'}
      </p>
    </div>
  );
}
