
export type CalendarEventType = 'trip' | 'deadline' | 'personal';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: CalendarEventType;
  calendarType?: 'google' | 'apple' | 'outlook';
  tripId?: string;
}
