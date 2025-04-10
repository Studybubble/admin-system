
import { DashboardLayout } from '@/components/DashboardLayout';
import { events } from '@/data/mockData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeCheck, CalendarDays, Edit, MapPin, Search, Trash, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export function EventsList() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link to="/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="border rounded-lg overflow-hidden bg-card">
            <div className="relative">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-white text-black">
                {event.isFree ? 'Free' : 'Paid'}
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{event.attendees.length} attendees</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link to={`/events/${event.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">View</Button>
                </Link>
                <Link to={`/events/${event.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.date} • {event.time}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>
                  {event.isFree ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Free
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Paid
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{event.attendees.length}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link to={`/events/${event.id}`}>
                      <Button variant="ghost" size="icon">
                        <BadgeCheck className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/events/${event.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}

export default EventsList;
