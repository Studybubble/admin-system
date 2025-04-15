
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

interface EventDateTimeInputsProps {
  date: Date;
  startTime: string;
  endTime: string;
  onDateChange: (date: Date) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EventDateTimeInputs({ 
  date,
  startTime,
  endTime,
  onDateChange,
  onInputChange
}: EventDateTimeInputsProps) {
  return (
    <>
      <div className="flex space-x-4">
        <div className="w-1/2 space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="w-1/2 space-y-2">
          <Label htmlFor="time">Start Time</Label>
          <Input
            id="time"
            name="time"
            type="time"
            value={startTime}
            onChange={onInputChange}
            className={cn(
              "focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:ring-opacity-50",
              "hover:border-purple-400",
              "text-purple-700"
            )}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="endTime">End Time (Optional)</Label>
        <Input
          id="endTime"
          name="endTime"
          type="time"
          value={endTime}
          onChange={onInputChange}
          className={cn(
            "focus:border-purple-500 focus:ring-purple-500 focus:ring-2 focus:ring-opacity-50",
            "hover:border-purple-400",
            "text-purple-700"
          )}
        />
      </div>
    </>
  );
}
