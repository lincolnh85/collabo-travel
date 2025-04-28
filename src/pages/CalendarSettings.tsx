
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import { 
  Bell, 
  Calendar, 
  Save, 
  Clock, 
  Globe, 
  AlertCircle, 
  CalendarDays,
  Check,
  Mail
} from "lucide-react";

const CalendarSettings = () => {
  const [formState, setFormState] = useState({
    integrations: {
      googleCalendar: false,
      appleCalendar: false,
      outlookCalendar: false
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      tripReminders: true,
      dailySummary: false,
      weeklyDigest: true
    },
    displayPreferences: {
      defaultView: "month",
      showWeekends: true,
      showDeclinedEvents: false,
      workingHours: {
        start: "09:00",
        end: "17:00"
      },
      timezone: "America/Los_Angeles"
    }
  });

  const handleIntegrationChange = (integration: string, value: boolean) => {
    setFormState(prev => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [integration]: value
      }
    }));

    if (value) {
      // Simulate SSO login flow
      simulateSSO(integration);
    }
  };

  const simulateSSO = (provider: string) => {
    toast.loading(`Connecting to ${getProviderName(provider)}...`);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success(`Successfully connected to ${getProviderName(provider)}`);
      
      // Update the state to reflect successful connection
      setFormState(prev => ({
        ...prev,
        integrations: {
          ...prev.integrations,
          [provider]: true
        }
      }));
    }, 2000);
  };

  const getProviderName = (provider: string) => {
    switch(provider) {
      case "googleCalendar": return "Google Calendar";
      case "appleCalendar": return "Apple Calendar";
      case "outlookCalendar": return "Outlook Calendar";
      default: return provider;
    }
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setFormState(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: value
      }
    }));
  };

  const handleDisplayPrefChange = (setting: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      displayPreferences: {
        ...prev.displayPreferences,
        [setting]: value
      }
    }));
  };

  const handleWorkingHoursChange = (field: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      displayPreferences: {
        ...prev.displayPreferences,
        workingHours: {
          ...prev.displayPreferences.workingHours,
          [field]: value
        }
      }
    }));
  };

  const saveSettings = () => {
    toast.success("Calendar settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Calendar Settings</h1>
          <Button onClick={saveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
            <TabsTrigger value="integrations">
              <Calendar className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="display">
              <CalendarDays className="mr-2 h-4 w-4" />
              Display
            </TabsTrigger>
          </TabsList>

          {/* Calendar Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Calendar Integrations</h2>
                <CardDescription>
                  Connect your existing calendars to sync events automatically
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Google Calendar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#DB4437">
                        <path d="M22 12.0002C22 10.153 21.5255 8.49954 20.6455 7.06604L14.4 11.9982L16.7 14.0002L23.0909 9.06829C22.9628 9.67489 22.7843 10.2675 22.5564 10.8407C22.0866 12.0006 21.4062 13.0584 20.5592 13.959C19.7122 14.8597 18.7123 15.5905 17.6044 16.1152C16.4965 16.64 15.3016 16.9487 14.091 17.0228C12.8803 17.097 11.6685 16.9352 10.5124 16.5469C9.35633 16.1586 8.27863 15.5514 7.34368 14.7618C6.40873 13.9721 5.63428 13.0162 5.0637 11.9491C4.49313 10.882 4.1378 9.7227 4.022 8.5338C3.9062 7.34489 4.03476 6.14857 4.40131 5.01065C4.76786 3.87274 5.36399 2.81406 6.15529 1.89791C6.94658 0.981756 7.91849 0.222155 9.00758 0.66669C10.0967 -0.088816 11.2916 -0.222003 12.5 0.182449V7.00024L6.4 11.9342C7.311 13.8412 9.011 15.4002 11.2 16.0002C16.667 17.3333 22 12.0002 22 12.0002Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Google Calendar</h3>
                      <p className="text-sm text-muted-foreground">
                        {formState.integrations.googleCalendar 
                          ? "Connected" 
                          : "Sync your Google Calendar events"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {formState.integrations.googleCalendar && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Connected
                      </div>
                    )}
                    
                    <Button 
                      variant={formState.integrations.googleCalendar ? "outline" : "default"} 
                      onClick={() => handleIntegrationChange("googleCalendar", !formState.integrations.googleCalendar)}
                    >
                      {formState.integrations.googleCalendar ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>

                {/* Apple Calendar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#000000">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09998 22C7.78998 22.05 6.79998 20.67 5.95998 19.47C4.24998 17 2.93998 12.45 4.69998 9.39C5.56998 7.87 7.12998 6.91 8.81998 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.35 4.26 13 3.5Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Apple Calendar</h3>
                      <p className="text-sm text-muted-foreground">
                        {formState.integrations.appleCalendar 
                          ? "Connected" 
                          : "Sync your Apple Calendar events"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {formState.integrations.appleCalendar && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Connected
                      </div>
                    )}
                    
                    <Button 
                      variant={formState.integrations.appleCalendar ? "outline" : "default"} 
                      onClick={() => handleIntegrationChange("appleCalendar", !formState.integrations.appleCalendar)}
                    >
                      {formState.integrations.appleCalendar ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>

                {/* Outlook Calendar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="#0078D4">
                        <path d="M22.2419 4.98865V18.2428C22.2419 19.081 21.5779 19.9192 20.7396 19.9192H11.0779V12.4583H13.6195L13.9834 9.43871H11.0779V7.53549C11.0779 6.67728 11.3386 6.10728 12.5556 6.10728H14.0834V3.4144C13.7837 3.37413 12.8423 3.29359 11.7418 3.29359C9.4474 3.29359 7.87067 4.7204 7.87067 7.22432V9.43871H5.32288V12.4583H7.87067V19.9192H3.24481C2.40673 19.9192 1.74268 19.081 1.74268 18.2428V4.98865C1.74268 4.15057 2.40673 3.48652 3.24481 3.48652H20.7396C21.5779 3.48652 22.2419 4.15057 22.2419 4.98865Z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Outlook Calendar</h3>
                      <p className="text-sm text-muted-foreground">
                        {formState.integrations.outlookCalendar 
                          ? "Connected" 
                          : "Sync your Outlook Calendar events"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {formState.integrations.outlookCalendar && (
                      <div className="flex items-center text-green-600 text-sm">
                        <Check className="h-4 w-4 mr-1" />
                        Connected
                      </div>
                    )}
                    
                    <Button 
                      variant={formState.integrations.outlookCalendar ? "outline" : "default"} 
                      onClick={() => handleIntegrationChange("outlookCalendar", !formState.integrations.outlookCalendar)}
                    >
                      {formState.integrations.outlookCalendar ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    <div>
                      <h4 className="font-medium text-amber-800">Calendar Permissions</h4>
                      <p className="text-sm text-amber-700">
                        CollaboTravel only has read access to your calendar events. We use this information to help you avoid scheduling conflicts when planning trips with friends.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Notification Settings</h2>
                <CardDescription>
                  Configure how and when you receive calendar notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                      <p className="text-muted-foreground text-sm">Receive calendar updates via email</p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={formState.notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                      <p className="text-muted-foreground text-sm">Receive push notifications in your browser</p>
                    </div>
                    <Switch 
                      id="push-notifications"
                      checked={formState.notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="trip-reminders" className="font-medium">Trip Reminders</Label>
                      <p className="text-muted-foreground text-sm">Get reminders about upcoming trips</p>
                    </div>
                    <Switch 
                      id="trip-reminders"
                      checked={formState.notifications.tripReminders}
                      onCheckedChange={(checked) => handleNotificationChange('tripReminders', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="daily-summary" className="font-medium">Daily Summary</Label>
                      <p className="text-muted-foreground text-sm">Receive a daily summary of your calendar</p>
                    </div>
                    <Switch 
                      id="daily-summary"
                      checked={formState.notifications.dailySummary}
                      onCheckedChange={(checked) => handleNotificationChange('dailySummary', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest" className="font-medium">Weekly Digest</Label>
                      <p className="text-muted-foreground text-sm">Get a weekly summary of upcoming events</p>
                    </div>
                    <Switch 
                      id="weekly-digest"
                      checked={formState.notifications.weeklyDigest}
                      onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-start gap-2 w-full bg-muted p-4 rounded-md">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <h3 className="font-medium">Email Notification Preferences</h3>
                    <div className="grid gap-2">
                      <Label htmlFor="email-pref">Notification Email</Label>
                      <Input id="email-pref" defaultValue="user@example.com" />
                    </div>
                    <Button size="sm" variant="outline">Update Email</Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Display Preferences</h2>
                <CardDescription>
                  Customize how your calendar appears
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Default View */}
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default View</Label>
                  <select 
                    id="default-view"
                    value={formState.displayPreferences.defaultView}
                    onChange={(e) => handleDisplayPrefChange('defaultView', e.target.value)}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                  >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="agenda">Agenda</option>
                  </select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Working Hours */}
                  <div className="space-y-2">
                    <Label>Working Hours</Label>
                    <div className="flex items-center gap-2">
                      <div>
                        <Label htmlFor="start-time" className="text-xs text-muted-foreground">Start</Label>
                        <Input 
                          id="start-time" 
                          type="time"
                          value={formState.displayPreferences.workingHours.start}
                          onChange={(e) => handleWorkingHoursChange('start', e.target.value)}
                        />
                      </div>
                      <div className="pt-5">to</div>
                      <div>
                        <Label htmlFor="end-time" className="text-xs text-muted-foreground">End</Label>
                        <Input 
                          id="end-time" 
                          type="time"
                          value={formState.displayPreferences.workingHours.end}
                          onChange={(e) => handleWorkingHoursChange('end', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timezone */}
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <div className="relative">
                      <select 
                        id="timezone"
                        value={formState.displayPreferences.timezone}
                        onChange={(e) => handleDisplayPrefChange('timezone', e.target.value)}
                        className="w-full rounded-md border border-input bg-transparent px-3 py-2 pr-10"
                      >
                        <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                        <option value="America/Denver">Mountain Time (US & Canada)</option>
                        <option value="America/Chicago">Central Time (US & Canada)</option>
                        <option value="America/New_York">Eastern Time (US & Canada)</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                      </select>
                      <Globe className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <p className="text-xs text-muted-foreground">Your current timezone will be used for calendar events</p>
                  </div>
                </div>

                <Separator />

                {/* Display Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-weekends" className="font-medium">Show Weekends</Label>
                      <p className="text-muted-foreground text-sm">Display Saturday and Sunday in calendar views</p>
                    </div>
                    <Switch 
                      id="show-weekends"
                      checked={formState.displayPreferences.showWeekends}
                      onCheckedChange={(checked) => handleDisplayPrefChange('showWeekends', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-declined" className="font-medium">Show Declined Events</Label>
                      <p className="text-muted-foreground text-sm">Display events you've declined</p>
                    </div>
                    <Switch 
                      id="show-declined"
                      checked={formState.displayPreferences.showDeclinedEvents}
                      onCheckedChange={(checked) => handleDisplayPrefChange('showDeclinedEvents', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CalendarSettings;
