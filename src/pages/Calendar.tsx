
import { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockTrips } from "@/lib/types";

// Mock data for deadlines and calendar events
const mockDeadlines = [
  { id: "d1", title: "Final Payment for Paris Trip", date: new Date("2025-05-20"), tripId: "t1" },
  { id: "d2", title: "Book Activities for Cancun", date: new Date("2025-06-15"), tripId: "t2" },
  { id: "d3", title: "Confirm Hiking Gear", date: new Date("2025-07-25"), tripId: "t3" }
];

const mockPersonalEvents = [
  { id: "e1", title: "Family Dinner", date: new Date("2025-04-28"), calendarType: "google" },
  { id: "e2", title: "Dentist Appointment", date: new Date("2025-04-30"), calendarType: "outlook" },
  { id: "e3", title: "Team Meeting", date: new Date("2025-05-05"), calendarType: "apple" }
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

  // Combine all calendar events
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

  // Filter events based on selected calendars
  const filteredEvents = allEvents.filter(event => {
    if (event.type === 'trip') return selectedCalendars.trips;
    if (event.type === 'deadline') return selectedCalendars.deadlines;
    if (event.calendarType === 'google') return selectedCalendars.google;
    if (event.calendarType === 'apple') return selectedCalendars.apple;
    if (event.calendarType === 'outlook') return selectedCalendars.outlook;
    return false;
  });

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Go to today
  const goToToday = () => {
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // Get events for the selected date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return filteredEvents.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Toggle calendar visibility
  const toggleCalendar = (calendarType: keyof typeof selectedCalendars) => {
    setSelectedCalendars(prev => ({
      ...prev,
      [calendarType]: !prev[calendarType]
    }));
  };

  // Custom day rendering to show events
  const renderDay = (day: Date) => {
    const eventsOnDay = getEventsForDate(day);
    const hasTrip = eventsOnDay.some(e => e.type === 'trip');
    const hasDeadline = eventsOnDay.some(e => e.type === 'deadline');
    const hasPersonal = eventsOnDay.some(e => e.type === 'personal');
    
    return (
      <div className="relative h-9 w-9 p-0 font-normal flex items-center justify-center">
        <span className="z-10">{day.getDate()}</span>
        {(hasTrip || hasDeadline || hasPersonal) && (
          <div className="absolute bottom-1 flex gap-0.5 justify-center">
            {hasTrip && <div className="w-1.5 h-1.5 rounded-full bg-travel-500"></div>}
            {hasDeadline && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
            {hasPersonal && <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
          </div>
        )}
      </div>
    );
  };

  // Get event color based on type
  const getEventColor = (event: CalendarEvent) => {
    switch (event.type) {
      case 'trip':
        return "bg-travel-100 text-travel-800 border-travel-200";
      case 'deadline':
        return "bg-red-100 text-red-800 border-red-200";
      case 'personal':
        if (event.calendarType === 'google') return "bg-blue-100 text-blue-800 border-blue-200";
        if (event.calendarType === 'apple') return "bg-purple-100 text-purple-800 border-purple-200";
        if (event.calendarType === 'outlook') return "bg-green-100 text-green-800 border-green-200";
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="page-header mb-8">Calendar</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar sidebar with filters */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Calendars</CardTitle>
              <CardDescription>Toggle calendar visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>
        
        {/* Main calendar area */}
        <div className="lg:col-span-9 space-y-6">
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
                className="rounded-md border pointer-events-auto"
                components={{
                  Day: ({ date }) => renderDay(date)
                }}
              />
            </CardContent>
          </Card>
          
          {/* Events for selected date */}
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

export default CalendarPage;
