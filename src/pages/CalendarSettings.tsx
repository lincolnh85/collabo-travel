
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CalendarSettings = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Calendar Settings</h1>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Calendar Integrations</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="google-calendar">Google Calendar</Label>
                    <Switch id="google-calendar" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="apple-calendar">Apple Calendar</Label>
                    <Switch id="apple-calendar" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="outlook-calendar">Outlook Calendar</Label>
                    <Switch id="outlook-calendar" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <Switch id="email-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <Switch id="push-notifications" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarSettings;
