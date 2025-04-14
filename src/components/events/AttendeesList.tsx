
import { Attendee } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AttendeesListProps {
  attendees: Attendee[];
}

export function AttendeesList({ attendees }: AttendeesListProps) {
  return (
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
            {attendees.map((attendee, index) => (
              <TableRow key={attendee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{attendee.name}</TableCell>
                <TableCell>{attendee.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={attendee.userType === "guest" ? 
                    "bg-purple-50 text-purple-700 border-purple-200" : 
                    "bg-gray-50 text-gray-700 border-gray-200"}>
                    {attendee.userType === "guest" ? "Guest" : "Normal"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(attendee.registeredAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {attendee.paymentStatus === "free" ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Free
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Paid
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {attendees.length === 0 && (
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
  );
}
