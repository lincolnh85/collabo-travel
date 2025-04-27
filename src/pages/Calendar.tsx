import { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Menu } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { mockTrips } from "@/lib/types";

const mockDeadlines = [
  { id: "d1", title: "Final Payment for Paris Trip", date: new Date("2025-05-20"), tripId: "t1" },
  { id: "d2", title: "Book Activities for Cancun", date: new Date("2025-06-15"), tripId: "t2" },
  { id: "d3", title: "Confirm Hiking Gear", date: new Date("2025-07-25"), tripId: "t3" }
];

const mockPersonalEvents = [
  { id: "e1", title: "Family Dinner", date: new Date("2025-04-28"), calendarType: "google" as const },
  { id: "e2", title: "Dentist Appointment", date: new Date("2025-04-30"), calendarType: "outlook" as const },
  { id: "e3", title: "Team Meeting", date: new Date("2025-05-05"), calendarType: "apple" as const }
];

type CalendarEventType = 'trip' | 'deadline' | 'personal';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: CalendarEventType;
  calendarType?: 'google' | 'apple' | 'outlook';
  tripId?: string;
}

const CalendarPage = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [selectedCalendars, setSelectedCalendars] = useState({
    trips: true,
    deadlines: true,
    google: true,
    apple: true,
    outlook: true
  });

  const allEvents: CalendarEvent[] = [
    ...mockTrips.map(trip => ({
      id: trip.id,
      title: trip.title,
      date: trip.startDate || today,
      type: 'trip' as CalendarEventType,
      tripId: trip.id
    })),
    ...mockDeadlines.map(deadline => ({
      id: deadline.id,
      title: deadline.title,
      date: deadline.date,
      type: 'deadline' as CalendarEventType,
      tripId: deadline.tripId
    })),
    ...mockPersonalEvents.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      type: 'personal' as CalendarEventType,
      calendarType: event.calendarType
    }))
  ];

  const filteredEvents = allEvents.filter(event => {
    if (event.type === 'trip') return selectedCalendars.trips;
    if (event.type === 'deadline') return selectedCalendars.deadlines;
    if (event.calendarType === 'google') return selectedCalendars.google;
    if (event.calendarType === 'apple') return selectedCalendars.apple;
    if (event.calendarType === 'outlook') return selectedCalendars.outlook;
    return false;
  });

  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return filteredEvents.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const toggleCalendar = (calendarType: keyof typeof selectedCalendars) => {
    setSelectedCalendars(prev => ({
      ...prev,
      [calendarType]: !prev[calendarType]
    }));
  };

  const renderDay = (day: Date) => {
    const eventsOnDay = getEventsForDate(day);
    const hasTrip = eventsOnDay.some(e => e.type === 'trip');
    const hasDeadline = eventsOnDay.some(e => e.type === 'deadline');
    const hasPersonal = eventsOnDay.some(e => e.type === 'personal');
    const isToday = day.toDateString() === new Date().toDateString();
    
    return (
      <div className={`relative h-full w-full p-0 font-normal flex flex-col items-stretch ${
        isToday ? 'bg-gray-100 rounded-md' : ''
      }`}>
        <span className="z-10 p-2">{day.getDate()}</span>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-0.5">
          {hasTrip && <div className="h-1 w-full bg-travel-500"></div>}
          {hasDeadline && <div className="h-1 w-full bg-red-500"></div>}
          {hasPersonal && <div className="h-1 w-full bg-purple-500"></div>}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="page-header mb-8">Calendar</h1>
      
      <div className="flex gap-8">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="mb-4 lg:hidden">
              <Menu className="h-4 w-4" />
              <span className="ml-2">Toggle Calendars</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Calendar Visibility</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <CalendarToggles
                selectedCalendars={selectedCalendars}
                toggleCalendar={toggleCalendar}
              />
            </div>
          </DrawerContent>
        </Drawer>

        <div className="hidden lg:block w-72">
          <Card>
            <CardHeader>
              <CardTitle>Calendars</CardTitle>
              <CardDescription>Toggle calendar visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarToggles
                selectedCalendars={selectedCalendars}
                toggleCalendar={toggleCalendar}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl">{format(currentMonth, 'MMMM yyyy')}</CardTitle>
                <CardDescription>Showing all events for this month</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={prevMonth}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                className="rounded-md border w-full"
                classNames={{
                  cell: "h-24 w-full p-0 relative",
                  day: "h-full w-full p-0",
                  head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                  row: "flex w-full",
                  table: "w-full border-collapse",
                }}
                components={{
                  Day: ({ date }) => renderDay(date)
                }}
              />
            </CardContent>
          </Card>

          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>Events on {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
                <CardDescription>
                  {selectedDateEvents.length === 0 
                    ? 'No events scheduled for this day' 
                    : `${selectedDateEvents.length} event${selectedDateEvents.length !== 1 ? 's' : ''} scheduled`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <ul className="space-y-3">
                    {selectedDateEvents.map(event => (
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
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarIcon className="mx-auto h-10 w-10 mb-2 opacity-50" />
                    <p>No events for this date</p>
                    <p className="text-sm">Select another date or add a new event</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const CalendarToggles = ({ 
  selectedCalendars, 
  toggleCalendar 
}: { 
  selectedCalendars: Record<string, boolean>;
  toggleCalendar: (calendarType: string) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-medium">Travel</div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="trips" 
            checked={selectedCalendars.trips} 
            onChange={() => toggleCalendar('trips')}
            className="rounded border-gray-300 text-travel-600 focus:ring-travel-500"
          />
          <label htmlFor="trips" className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-travel-500 mr-2"></div>
            Trips
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="deadlines" 
            checked={selectedCalendars.deadlines} 
            onChange={() => toggleCalendar('deadlines')}
            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
          />
          <label htmlFor="deadlines" className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            Deadlines
          </label>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="font-medium">Personal</div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="google" 
            checked={selectedCalendars.google} 
            onChange={() => toggleCalendar('google')}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="google" className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            Google
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="apple" 
            checked={selectedCalendars.apple} 
            onChange={() => toggleCalendar('apple')}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="apple" className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            Apple
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="outlook" 
            checked={selectedCalendars.outlook} 
            onChange={() => toggleCalendar('outlook')}
            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label htmlFor="outlook" className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Outlook
          </label>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
