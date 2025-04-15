
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { events } from '@/data/mockData';
import { AttendeesHeader } from '@/components/attendees/AttendeesHeader';
import { AttendeesStats } from '@/components/attendees/AttendeesStats';
import { AttendeesFilters } from '@/components/attendees/AttendeesFilters';
import { AttendeesTable } from '@/components/attendees/AttendeesTable';
import { processAttendeeData, AttendeeWithEvents } from '@/utils/attendeeUtils';

// Process all attendees data once
const allAttendees = processAttendeeData(events);

export function AttendeesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const clearFilters = () => {
    setUserTypeFilter(null);
    setPaymentFilter(null);
    setSortField(null);
    setSortDirection('asc');
    setSearchTerm('');
  };
  
  // Apply filters
  let filteredAttendees = allAttendees.filter(attendee => 
    (attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     attendee.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (userTypeFilter === null || attendee.userType === userTypeFilter) &&
    (paymentFilter === null || attendee.paymentStatus === paymentFilter)
  );
  
  // Apply sorting
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
  
  const hasActiveFilters = userTypeFilter || paymentFilter || sortField || searchTerm;
  
  return (
    <DashboardLayout>
      <AttendeesHeader />
      <AttendeesStats attendees={filteredAttendees} />
      <AttendeesFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        userTypeFilter={userTypeFilter}
        setUserTypeFilter={setUserTypeFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        clearFilters={clearFilters}
        hasActiveFilters={!!hasActiveFilters}
      />
      <AttendeesTable 
        attendees={filteredAttendees}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
    </DashboardLayout>
  );
}

export default AttendeesList;
