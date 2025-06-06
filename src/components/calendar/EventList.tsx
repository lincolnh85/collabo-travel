
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from "@/types/calendar";
import { CalendarIcon } from "lucide-react";

interface EventListProps {
  events: CalendarEvent[];
}

export const getEventColor = (event: CalendarEvent): string => {
  if (event.type === 'trip') return 'bg-travel-500';
  if (event.type === 'deadline') return 'bg-red-500';
  if (event.type === 'personal') {
    switch (event.calendarType) {
      case 'google': return 'bg-blue-500';
      case 'apple': return 'bg-purple-500';
      case 'outlook': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }
  return 'bg-gray-500';
};

const EventList = ({ events }: EventListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <CalendarIcon className="mx-auto h-10 w-10 mb-2 opacity-50" />
        <p>No events for this date</p>
        <p className="text-sm">Select another date or add a new event</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {events.map(event => (
        <li key={event.id} className={`p-3 rounded-md border ${getEventColor(event)}`}>
          <div className="flex justify-between items-center">
            <span className="font-medium">{event.title}</span>
            <Badge variant="outline" className="ml-2">
              {event.type === 'personal' && event.calendarType ? 
                event.calendarType.charAt(0).toUpperCase() + event.calendarType.slice(1) : 
                event.type.charAt(0).toUpperCase() + event.type.slice(1)
              }
            </Badge>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
