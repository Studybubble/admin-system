
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { events, Event } from '@/data/mockData';
import { Button } from "@/components/ui/button";
import { EventFilters } from '@/components/events/EventFilters';
import { EventsTable } from '@/components/events/EventsTable';
import { EventCards } from '@/components/events/EventCards';

// Adding maxAttendees to simulate event capacity for UI demonstration
const eventsWithCapacity = events.map(event => ({
  ...event,
  maxAttendees: event.id === "1" ? 50 : (event.id === "2" ? 30 : (event.id === "3" ? 25 : undefined))
}));

export function EventsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>("all");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const filteredEvents = eventsWithCapacity.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = filterType === "all" || 
      (filterType === 'free' && event.isFree) || 
      (filterType === 'paid' && !event.isFree);
      
    const eventDate = new Date(event.date);
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
    
    const matchesDateRange = 
      (!startDateObj || eventDate >= startDateObj) &&
      (!endDateObj || eventDate <= endDateObj);
      
    return matchesSearch && matchesType && matchesDateRange;
  });
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link to="/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>
      
      <EventFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      
      <EventsTable events={filteredEvents} />
      
      <EventCards events={filteredEvents} />
    </DashboardLayout>
  );
}

export default EventsList;
