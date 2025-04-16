
import { Attendee, Event } from "@/data/mockData";

export interface AttendeeEvent {
  id: string;
  title: string;
  date: string;
  isFree: boolean;
  price?: number;
}

export interface AttendeeWithEvents extends Attendee {
  events: AttendeeEvent[];
}

export const processAttendeeData = (events: Event[]): AttendeeWithEvents[] => {
  const uniqueAttendees = new Map();
  
  events.forEach(event => {
    event.attendees.forEach(attendee => {
      const key = attendee.email;
      
      if (!uniqueAttendees.has(key)) {
        uniqueAttendees.set(key, {
          ...attendee,
          events: [{
            id: event.id,
            title: event.title,
            date: event.date,
            isFree: event.isFree,
            price: event.price
          }]
        });
      } else {
        const existingAttendee = uniqueAttendees.get(key);
        existingAttendee.events.push({
          id: event.id,
          title: event.title,
          date: event.date,
          isFree: event.isFree,
          price: event.price
        });
        uniqueAttendees.set(key, existingAttendee);
      }
    });
  });
  
  return Array.from(uniqueAttendees.values());
};

export const formatAttendeeEvents = (attendeeId: string, events: Event[]) => {
  if (!events || events.length === 0) return [];
  
  return events.filter(event => 
    event.attendees.some(a => a.id === attendeeId)
  ).map(event => ({
    id: event.id,
    title: event.title,
    date: event.date,
    isFree: event.isFree,
    price: event.price
  }));
};

// Helper function to refresh attendee events with the latest event data
export const refreshAttendeeEvents = (
  attendee: AttendeeWithEvents, 
  events: Array<Event>
): AttendeeWithEvents => {
  // Get the latest event data for each event the attendee is registered for
  const updatedEvents = attendee.events.map(attendeeEvent => {
    const latestEvent = events.find(e => e.id === attendeeEvent.id);
    if (!latestEvent) return attendeeEvent;
    
    return {
      id: latestEvent.id,
      title: latestEvent.title,
      date: latestEvent.date,
      isFree: latestEvent.isFree,
      price: latestEvent.price
    };
  });
  
  return {
    ...attendee,
    events: updatedEvents
  };
};
