
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { events, Event } from '@/data/mockData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Badge,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Edit,
  Filter,
  MapPin,
  Pencil,
  Search,
  Trash,
  Users,
  Clock,
} from 'lucide-react';
import { Badge as UIBadge } from '@/components/ui/badge';

// Adding maxAttendees to simulate event capacity for UI demonstration
const eventsWithCapacity = events.map(event => ({
  ...event,
  maxAttendees: event.id === "1" ? 50 : (event.id === "2" ? 30 : (event.id === "3" ? 25 : undefined))
}));

export function EventsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>("all");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
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
  
  const toggleEventExpansion = (eventId: string) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };
  
  // Function to check if event is at full capacity
  const isEventFull = (event: Event & { maxAttendees?: number }) => {
    return event.maxAttendees !== undefined && event.attendees.length >= event.maxAttendees;
  };
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link to="/events/create">
          <Button>Create New Event</Button>
        </Link>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[160px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Event Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <Input
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full md:w-[160px]"
              />
              <span>to</span>
              <Input
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full md:w-[160px]"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map((event) => (
              <>
                <TableRow 
                  key={event.id}
                  className={`cursor-pointer hover:bg-muted/50 ${isEventFull(event) ? 'bg-purple-100' : ''}`}
                  onClick={() => toggleEventExpansion(event.id)}
                >
                  <TableCell className="font-medium flex items-center gap-2">
                    {expandedEvent === event.id ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                    {event.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {event.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {event.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    {event.isFree ? (
                      <UIBadge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Free
                      </UIBadge>
                    ) : (
                      <UIBadge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Paid
                      </UIBadge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {event.maxAttendees ? (
                        <span className="flex items-center">
                          {event.attendees.length}/{event.maxAttendees}
                          {isEventFull(event) && (
                            <UIBadge className="ml-2 bg-red-500">Full</UIBadge>
                          )}
                        </span>
                      ) : (
                        <span>{event.attendees.length}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/events/${event.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedEvent === event.id && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={6} className="p-0">
                      <div className="p-4">
                        <h3 className="text-md font-medium mb-3">Registered Attendees</h3>
                        <div className="bg-white border rounded-md">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Attendee</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Registered On</TableHead>
                                <TableHead>Payment Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {event.attendees.map((attendee, index) => (
                                <TableRow key={attendee.id}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell className="font-medium">{attendee.name}</TableCell>
                                  <TableCell>{attendee.email}</TableCell>
                                  <TableCell>
                                    <UIBadge variant="outline" className={attendee.userType === "guest" ? 
                                      "bg-purple-50 text-purple-700 border-purple-200" : 
                                      "bg-gray-50 text-gray-700 border-gray-200"}>
                                      {attendee.userType === "guest" ? "Guest" : "Normal"}
                                    </UIBadge>
                                  </TableCell>
                                  <TableCell>{new Date(attendee.registeredAt).toLocaleDateString()}</TableCell>
                                  <TableCell>
                                    {attendee.paymentStatus === "free" ? (
                                      <UIBadge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        Free
                                      </UIBadge>
                                    ) : (
                                      <UIBadge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        Paid
                                      </UIBadge>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                              {event.attendees.length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                                    No attendees registered yet
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            
            {filteredEvents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No events found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="hidden grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
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
    </DashboardLayout>
  );
}

export default EventsList;
