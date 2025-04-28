
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import CalendarToggles from "./CalendarToggles";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-mobile";

interface CalendarTogglePanelProps {
  selectedCalendars: {
    trips: boolean;
    deadlines: boolean;
    google: boolean;
    apple: boolean;
    outlook: boolean;
  };
  toggleCalendar: (calendarType: string) => void;
}

export const CalendarTogglePanel = ({
  selectedCalendars,
  toggleCalendar,
}: CalendarTogglePanelProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Calendar Settings</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <CalendarToggles
              selectedCalendars={selectedCalendars}
              toggleCalendar={toggleCalendar}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Card className="w-60 p-6 flex-shrink-0 h-fit">
      <h3 className="font-medium text-lg mb-4">Calendar Settings</h3>
      <CalendarToggles
        selectedCalendars={selectedCalendars}
        toggleCalendar={toggleCalendar}
      />
    </Card>
  );
};
