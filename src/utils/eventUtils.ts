
import { Event } from "@/data/mockData";

// Function to check if event is at full capacity
export const isEventFull = (event: Event & { maxAttendees?: number }) => {
  return event.maxAttendees !== undefined && event.attendees.length >= event.maxAttendees;
};

// Function to format time display
export const formatTimeDisplay = (time: string) => {
  // If there's no time or it already contains a dash (range), return as is
  if (!time || time.includes('-')) {
    return time;
  }
  return `${time} onwards`;
};
