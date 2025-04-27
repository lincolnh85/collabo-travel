import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AvailabilityStatus } from "@/lib/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface AvailabilityCalendarProps {
  startDate?: Date;
  endDate?: Date;
  onSave?: (dates: Array<{date: Date; status: AvailabilityStatus}>) => void;
}

const AvailabilityCalendar = ({ startDate, endDate, onSave }: AvailabilityCalendarProps) => {
  const [selectedDates, setSelectedDates] = useState<Record<string, AvailabilityStatus>>({});
  const [currentStatus, setCurrentStatus] = useState<AvailabilityStatus>("available");
  
  const today = new Date();
  const defaultStartDate = startDate || new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
  const defaultEndDate = endDate || new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() + 14);

  const formatDateKey = (date: Date) => date.toISOString().split('T')[0];
  
  const handleDateClick = (date: Date) => {
    const dateKey = formatDateKey(date);
    const currentDateStatus = selectedDates[dateKey];
    
    let newStatus: AvailabilityStatus | null = null;
    
    if (currentDateStatus === currentStatus) {
      // If the same status is clicked again, remove the status
      newStatus = null;
    } else {
      // Otherwise, set the new status
      newStatus = currentStatus;
    }
    
    setSelectedDates(prev => ({
      ...prev,
      ...(newStatus === null 
        ? { [dateKey]: undefined } 
        : { [dateKey]: newStatus })
    }));
  };
  
  const handleSave = () => {
    if (onSave) {
      const formattedDates = Object.entries(selectedDates)
        .filter(([_, status]) => status !== undefined)
        .map(([dateStr, status]) => ({
          date: new Date(dateStr),
          status: status as AvailabilityStatus
        }));
      onSave(formattedDates);
    }
  };
  
  const statusColors: Record<AvailabilityStatus, string> = {
    available: "bg-green-100 text-green-800 border-green-200",
    unavailable: "bg-red-100 text-red-800 border-red-200",
    flexible: "bg-amber-100 text-amber-800 border-amber-200"
  };
  
  // Custom day rendering to show availability status
  const renderDay = (day: Date, currentMonth: Date) => {
    const dateKey = formatDateKey(day);
    const status = selectedDates[dateKey];
    
    return (
      <div 
        className={cn(
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center",
          status && statusColors[status]
        )}
      >
        {day.getDate()}
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-travel-800">Mark Your Availability</CardTitle>
        <CardDescription>
          Select dates when you're available or unavailable for this trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-center mb-4">
            <ToggleGroup type="single" value={currentStatus} onValueChange={(value) => value && setCurrentStatus(value as AvailabilityStatus)}>
              <ToggleGroupItem value="available" aria-label="Available" className="flex gap-1 items-center">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Available</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="unavailable" aria-label="Unavailable" className="flex gap-1 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Unavailable</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="flexible" aria-label="Flexible" className="flex gap-1 items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>Flexible</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="bg-muted p-3 rounded-md mb-4 text-sm">
            Click on dates to mark your availability status. Click again with the same status to remove.
          </div>
        </div>
        <Calendar
          mode="multiple"
          selected={[]}
          onDayClick={handleDateClick}
          month={defaultStartDate}
          numberOfMonths={2}
          className="rounded-md border"
          components={{
            Day: ({ day, displayMonth }) => renderDay(day, displayMonth)
          }}
          fromDate={today}
          fixedWeeks
        />
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Save Availability</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
