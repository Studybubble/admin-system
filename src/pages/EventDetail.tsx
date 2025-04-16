
import { DashboardLayout } from '@/components/DashboardLayout';
import { useParams } from 'react-router-dom';
import { useEvents } from '@/context/EventsContext';
import { EventHeader } from '@/components/event-detail/EventHeader';
import { EventMainContent } from '@/components/event-detail/EventMainContent';
import { EventDescription } from '@/components/event-detail/EventDescription';
import { EventAttendees } from '@/components/event-detail/EventAttendees';
import { EventNotFound } from '@/components/event-detail/EventNotFound';

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <DashboardLayout>
        <EventNotFound />
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <EventHeader event={event} />
      <EventMainContent event={event} />
      <EventDescription description={event.description} />
      <EventAttendees attendees={event.attendees} />
    </DashboardLayout>
  );
}

export default EventDetail;
