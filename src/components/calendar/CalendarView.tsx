
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CalendarEvent } from "@/types/calendar";
import { getEventColor } from "./EventList";

interface CalendarViewProps {
  currentMonth: Date;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
  getEventsForDate: (date: Date) => CalendarEvent[];
  prevMonth: () => void;
  nextMonth: () => void;
  goToToday: () => void;
}

export const CalendarView = ({
  currentMonth,
  selectedDate,
  setSelectedDate,
  getEventsForDate,
  prevMonth,
  nextMonth,
  goToToday,
}: CalendarViewProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get day headers (Monday, Tuesday, etc.)
  const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
          <Button onClick={goToToday} variant="outline" className="ml-4">
            Today
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button onClick={prevMonth} variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button onClick={nextMonth} variant="outline" size="icon">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Calendar header */}
        {dayHeaders.map((day) => (
          <div key={day} className="text-center py-2 font-medium text-sm">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {monthDays.map((day) => {
          const events = getEventsForDate(day);
          const isSelected = selectedDate && 
            selectedDate.getDate() === day.getDate() && 
            selectedDate.getMonth() === day.getMonth() && 
            selectedDate.getFullYear() === day.getFullYear();

          return (
            <div
              key={day.toISOString()}
              onClick={() => setSelectedDate(day)}
              className={`
                h-24 border border-earthy-700 p-1 cursor-pointer transition-colors relative flex flex-col
                ${!isSameMonth(day, monthStart) ? "bg-earthy-800 text-earthy-500" : ""}
                ${isSelected ? "ring-2 ring-primary" : ""}
                ${isToday(day) ? "bg-earthy-800 rounded" : ""}
              `}
            >
              <div className="text-right text-sm">{format(day, "d")}</div>
              <div className="flex-grow flex flex-col gap-1 mt-1 overflow-hidden">
                {events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs text-white px-1 py-0.5 rounded truncate ${getEventColor(event)}`}
                  >
                    {event.title}
                  </div>
                ))}
                {events.length > 3 && (
                  <div className="text-xs text-earthy-400">+{events.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
