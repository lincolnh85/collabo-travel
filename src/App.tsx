
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TripDetails from "./pages/TripDetails";
import Calendar from "./pages/Calendar";
import MyTrips from "./pages/MyTrips";
import Profile from "./pages/Profile";
import CalendarSettings from "./pages/CalendarSettings";

const queryClient = new QueryClient();

const App = () => {
  // Add dark mode to body
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/trips" element={<MyTrips />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar-settings" element={<CalendarSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
