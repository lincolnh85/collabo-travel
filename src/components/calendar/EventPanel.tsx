
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { CalendarEvent } from "@/types/calendar";
import EventList from "./EventList";

interface EventPanelProps {
  selectedDate: Date;
  events: CalendarEvent[];
}

export const EventPanel = ({ selectedDate, events }: EventPanelProps) => {
  return (
    <Card className="mt-6 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium">
          Events for {format(selectedDate, "MMMM d, yyyy")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {events.length} {events.length === 1 ? "event" : "events"} scheduled
        </p>
      </div>
      
      <EventList events={events} />
    </Card>
  );
};
