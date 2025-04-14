
import { Event } from "@/data/mockData";

// Function to check if event is at full capacity
export const isEventFull = (event: Event & { maxAttendees?: number }) => {
  return event.maxAttendees !== undefined && event.attendees.length >= event.maxAttendees;
};

// Function to format time display
export const formatTimeDisplay = (time: string) => {
  // Check if time contains a range (has a dash)
  return time.includes('-') ? time : `${time} onwards`;
};
