
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { events as initialEvents, Event } from '@/data/mockData';

interface EventsContextType {
  events: Array<Event & { maxAttendees?: number }>;
  updateEvent: (id: string, updatedEvent: Partial<Event>) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState(initialEvents.map(event => ({
    ...event,
    maxAttendees: event.id === "1" ? 50 : (event.id === "2" ? 30 : (event.id === "3" ? 25 : undefined))
  })));

  const updateEvent = (id: string, updatedEvent: Partial<Event>) => {
    setEvents(currentEvents => 
      currentEvents.map(event => 
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  return (
    <EventsContext.Provider value={{ events, updateEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
