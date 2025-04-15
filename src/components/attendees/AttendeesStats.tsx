
import React from 'react';
import { AttendeeWithEvents } from '@/utils/attendeeUtils';

interface AttendeesStatsProps {
  attendees: AttendeeWithEvents[];
}

export function AttendeesStats({ attendees }: AttendeesStatsProps) {
  const guestCount = attendees.filter(a => a.userType === 'guest').length;
  const normalCount = attendees.filter(a => a.userType === 'normal').length;
  const paidCount = attendees.filter(a => a.paymentStatus === 'paid').length;
  const freeCount = attendees.filter(a => a.paymentStatus === 'free').length;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-card border rounded-lg p-4">
        <h2 className="text-sm font-medium text-muted-foreground mb-1">Total Attendees</h2>
        <p className="text-2xl font-bold">{attendees.length}</p>
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
  );
}
