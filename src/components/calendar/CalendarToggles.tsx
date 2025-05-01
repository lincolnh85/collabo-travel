
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CalendarTogglesProps {
  selectedCalendars: {
    trips: boolean;
    deadlines: boolean;
    google: boolean;
    apple: boolean;
    outlook: boolean;
  };
  toggleCalendar: (calendarType: string) => void;
}

const CalendarToggles = ({ selectedCalendars, toggleCalendar }: CalendarTogglesProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-medium text-earthy-200">Travel</div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="trips" 
            checked={selectedCalendars.trips} 
            onCheckedChange={() => toggleCalendar('trips')}
          />
          <Label htmlFor="trips" className="flex items-center text-earthy-300">
            <div className="w-3 h-3 rounded-full bg-travel-500 mr-2"></div>
            Trips
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="deadlines" 
            checked={selectedCalendars.deadlines} 
            onCheckedChange={() => toggleCalendar('deadlines')}
          />
          <Label htmlFor="deadlines" className="flex items-center text-earthy-300">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            Deadlines
          </Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="font-medium text-earthy-200">Personal</div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="google" 
            checked={selectedCalendars.google} 
            onCheckedChange={() => toggleCalendar('google')}
          />
          <Label htmlFor="google" className="flex items-center text-earthy-300">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            Google
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="apple" 
            checked={selectedCalendars.apple} 
            onCheckedChange={() => toggleCalendar('apple')}
          />
          <Label htmlFor="apple" className="flex items-center text-earthy-300">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            Apple
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="outlook" 
            checked={selectedCalendars.outlook} 
            onCheckedChange={() => toggleCalendar('outlook')}
          />
          <Label htmlFor="outlook" className="flex items-center text-earthy-300">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Outlook
          </Label>
        </div>
      </div>
    </div>
  );
};

export default CalendarToggles;
