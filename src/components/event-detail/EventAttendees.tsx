
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { Attendee } from "@/data/mockData";
import { AttendeeTable } from "./AttendeeTable";

interface EventAttendeesProps {
  attendees: Attendee[];
}

export function EventAttendees({ attendees }: EventAttendeesProps) {
  return (
    <div className="mb-6">
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            <h2 className="text-xl font-semibold">Attendees</h2>
          </div>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="normal">Normal</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <AttendeeTable attendees={attendees} />
        </TabsContent>
        
        <TabsContent value="guests" className="mt-0">
          <AttendeeTable attendees={attendees.filter(a => a.userType === 'guest')} />
        </TabsContent>
        
        <TabsContent value="normal" className="mt-0">
          <AttendeeTable attendees={attendees.filter(a => a.userType === 'normal')} />
        </TabsContent>
        
        <TabsContent value="paid" className="mt-0">
          <AttendeeTable attendees={attendees.filter(a => a.paymentStatus === 'paid')} />
        </TabsContent>
        
        <TabsContent value="free" className="mt-0">
          <AttendeeTable attendees={attendees.filter(a => a.paymentStatus === 'free')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
