
import React, { useState } from 'react';
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
import { Badge } from "@/components/ui/badge";
import {
  DownloadIcon,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ChevronRight,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const processAttendeeData = () => {
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

const allAttendees = processAttendeeData();

export function AttendeesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedAttendees, setExpandedAttendees] = useState<Set<string>>(new Set());
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const toggleAttendeeExpansion = (attendeeId: string) => {
    const newExpanded = new Set(expandedAttendees);
    if (newExpanded.has(attendeeId)) {
      newExpanded.delete(attendeeId);
    } else {
      newExpanded.add(attendeeId);
    }
    setExpandedAttendees(newExpanded);
  };
  
  let filteredAttendees = allAttendees.filter(attendee => 
    (attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     attendee.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (userTypeFilter === null || attendee.userType === userTypeFilter) &&
    (paymentFilter === null || attendee.paymentStatus === paymentFilter)
  );
  
  if (sortField) {
    filteredAttendees = [...filteredAttendees].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      if (sortField === 'registeredAt') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }
      
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  const clearFilters = () => {
    setUserTypeFilter(null);
    setPaymentFilter(null);
    setSortField(null);
    setSortDirection('asc');
    setSearchTerm('');
  };
  
  const guestCount = filteredAttendees.filter(a => a.userType === 'guest').length;
  const normalCount = filteredAttendees.filter(a => a.userType === 'normal').length;
  const paidCount = filteredAttendees.filter(a => a.paymentStatus === 'paid').length;
  const freeCount = filteredAttendees.filter(a => a.paymentStatus === 'free').length;
  
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Attendees</h1>
        <Button>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export Attendees
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border rounded-lg p-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">Total Attendees</h2>
          <p className="text-2xl font-bold">{filteredAttendees.length}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">Guest Users</h2>
          <p className="text-2xl font-bold">{guestCount}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">Normal Users</h2>
          <p className="text-2xl font-bold">{normalCount}</p>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <h2 className="text-sm font-medium text-muted-foreground mb-1">Paid / Free</h2>
          <p className="text-2xl font-bold">{paidCount} / {freeCount}</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search attendees..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>User Type</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setUserTypeFilter(null)}>
                  All Users
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserTypeFilter('guest')}>
                  Guest Users
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserTypeFilter('normal')}>
                  Normal Users
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>Payment</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setPaymentFilter(null)}>
                  All Payments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPaymentFilter('paid')}>
                  Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPaymentFilter('free')}>
                  Free
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(userTypeFilter || paymentFilter || sortField || searchTerm) && (
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer" 
                  onClick={() => handleSort('name')}
                >
                  Name
                  {sortField === 'name' && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>Username</TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer" 
                  onClick={() => handleSort('email')}
                >
                  Email
                  {sortField === 'email' && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer" 
                  onClick={() => handleSort('userType')}
                >
                  User Type
                  {sortField === 'userType' && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer" 
                  onClick={() => handleSort('paymentStatus')}
                >
                  Payment
                  {sortField === 'paymentStatus' && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer" 
                  onClick={() => handleSort('registeredAt')}
                >
                  Registered On
                  {sortField === 'registeredAt' && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>Events Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No attendees found matching the current filters
                </TableCell>
              </TableRow>
            ) : (
              filteredAttendees.map((attendee) => (
                <React.Fragment key={attendee.id}>
                  <TableRow 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleAttendeeExpansion(attendee.id)}
                  >
                    <TableCell className="p-2 w-8">
                      {expandedAttendees.has(attendee.id) ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback />
                      </Avatar>
                      <span className="font-medium">{attendee.name}</span>
                    </TableCell>
                    <TableCell>
                      {attendee.userType === "normal" ? `@${attendee.name.toLowerCase().split(' ').join('_')}` : "-"}
                    </TableCell>
                    <TableCell>{attendee.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={attendee.userType === 'guest' 
                          ? "bg-purple-50 text-purple-700 border-purple-200 rounded-full px-3 py-1" 
                          : "bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1"}
                      >
                        {attendee.userType === 'guest' ? 'Guest' : 'Normal'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={attendee.paymentStatus === 'free' 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-amber-50 text-amber-700 border-amber-200"}>
                        {attendee.paymentStatus === 'free' ? 'Free' : 'Paid'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(attendee.registeredAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{attendee.events?.length || 0}</Badge>
                    </TableCell>
                  </TableRow>
                  
                  {expandedAttendees.has(attendee.id) && (
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={8} className="py-2 px-4">
                        <div className="pl-8">
                          <p className="text-sm font-medium mb-2">Registered Events:</p>
                          <div className="space-y-2">
                            {attendee.events && attendee.events.length > 0 ? (
                              attendee.events.map((event, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm bg-white p-2 rounded border">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <span className="font-medium">{event.title}</span>
                                  <span className="text-xs text-muted-foreground">({event.date})</span>
                                  {!event.isFree && (
                                    <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200">
                                      ${event.price}
                                    </Badge>
                                  )}
                                  {event.isFree && (
                                    <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
                                      Free
                                    </Badge>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No events found</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}

export default AttendeesList;
