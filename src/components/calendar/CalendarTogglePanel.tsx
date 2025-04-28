
import { useState } from "react";
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
            <DrawerTitle>View Settings</DrawerTitle>
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

  // In desktop view, render directly without the Card wrapper
  // since we're now in a sidebar
  return (
    <CalendarToggles
      selectedCalendars={selectedCalendars}
      toggleCalendar={toggleCalendar}
    />
  );
};
