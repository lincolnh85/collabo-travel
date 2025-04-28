
import { useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarEvent, CalendarEventType } from "@/types/calendar";
import { CalendarView } from "@/components/calendar/CalendarView";
import { EventPanel } from "@/components/calendar/EventPanel";
import { CalendarTogglePanel } from "@/components/calendar/CalendarTogglePanel";
import { mockTrips } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

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
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  // Properly cast the types to CalendarEventType to match the interface
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

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="page-header mb-6">Calendar</h1>
        
        <div className="flex mb-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSettings} 
            className="mr-2"
            aria-label={isSettingsOpen ? "Close view settings" : "Open view settings"}
          >
            {isSettingsOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </Button>
          <h2 className="text-lg font-medium">Your Calendar</h2>
        </div>

        <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
          {isSettingsOpen && (
            <>
              <ResizablePanel 
                defaultSize={20} 
                minSize={15} 
                maxSize={30} 
                className={cn(
                  "bg-white transition-all duration-300 ease-in-out",
                  isSettingsOpen ? "block" : "hidden"
                )}
              >
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-4">View Settings</h3>
                  <CalendarTogglePanel 
                    selectedCalendars={selectedCalendars} 
                    toggleCalendar={toggleCalendar}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}
          <ResizablePanel defaultSize={isSettingsOpen ? 80 : 100}>
            <div className="p-6 bg-white h-full">
              <CalendarView
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                getEventsForDate={getEventsForDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
                goToToday={goToToday}
              />

              {selectedDate && (
                <EventPanel
                  selectedDate={selectedDate}
                  events={selectedDateEvents}
                />
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default CalendarPage;
