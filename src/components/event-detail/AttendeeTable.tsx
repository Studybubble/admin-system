
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Attendee } from "@/data/mockData";

interface AttendeeTableProps {
  attendees: Attendee[];
}

export function AttendeeTable({ attendees }: AttendeeTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Registered On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No attendees found in this category
              </TableCell>
            </TableRow>
          ) : (
            attendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell className="font-medium">{attendee.name}</TableCell>
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
