
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  UserCog, 
  Save, 
  BellRing, 
  Mail, 
  Users, 
  Lock, 
  Edit, 
  Globe,
  CheckCircle
} from "lucide-react";
import { currentUser } from "@/lib/types";
import { toast } from "@/components/ui/sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: "Travel enthusiast looking for new adventures! I love discovering new places and meeting new people.",
    timezone: "America/Los_Angeles",
    language: "English",
    travelPreferences: ["Beach", "Mountains", "City", "Adventure"],
    notificationSettings: {
      emailNotifications: true,
      tripInvites: true,
      friendRequests: true,
      tripUpdates: true,
      dailyDigest: false
    },
    privacySettings: {
      profileVisibility: "friends",
      allowFriendRequests: true,
      showUpcomingTrips: true
    }
  });

  const handleEditToggle = () => {
    if (isEditing) {
      toast.success("Profile updated successfully");
    }
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = (field: string, value: any) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setUserProfile(prev => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [field]: value
      }
    }));
  };

  const handlePrivacyUpdate = (field: string, value: any) => {
    setUserProfile(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          {/* Left Column - Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center pt-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={currentUser.avatarUrl} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing ? (
                <Input 
                  value={userProfile.name}
                  onChange={(e) => handleProfileUpdate('name', e.target.value)}
                  className="text-lg font-bold text-center"
                />
              ) : (
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
              )}
              <p className="text-muted-foreground">{userProfile.email}</p>
              <div className="flex gap-2 mt-3">
                {userProfile.travelPreferences.map((pref) => (
                  <Badge key={pref} variant="outline">{pref}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Bio</Label>
                {isEditing ? (
                  <Textarea
                    value={userProfile.bio}
                    onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm">{userProfile.bio}</p>
                )}
              </div>
              <div>
                <Label>Timezone</Label>
                {isEditing ? (
                  <Input 
                    value={userProfile.timezone}
                    onChange={(e) => handleProfileUpdate('timezone', e.target.value)}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm">{userProfile.timezone}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleEditToggle}
              >
                {isEditing ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Right Column - Tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="preferences">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="preferences">
                  <UserCog className="mr-2 h-4 w-4" />
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <BellRing className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="friends">
                  <Users className="mr-2 h-4 w-4" />
                  Friends
                </TabsTrigger>
              </TabsList>
              
              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Account Preferences</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <select 
                          id="language"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          value={userProfile.language}
                          onChange={(e) => handleProfileUpdate('language', e.target.value)}
                          disabled={!isEditing}
                        >
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                          <option value="German">German</option>
                          <option value="Japanese">Japanese</option>
                        </select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3">Privacy Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <select
                            id="profile-visibility"
                            className="w-28 rounded-md border border-input bg-background px-2 py-1 text-sm"
                            value={userProfile.privacySettings.profileVisibility}
                            onChange={(e) => handlePrivacyUpdate('profileVisibility', e.target.value)}
                            disabled={!isEditing}
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends</option>
                            <option value="private">Private</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="allow-friend-requests">Allow Friend Requests</Label>
                          <Switch 
                            id="allow-friend-requests"
                            checked={userProfile.privacySettings.allowFriendRequests}
                            onCheckedChange={(checked) => handlePrivacyUpdate('allowFriendRequests', checked)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="show-upcoming-trips">Show Upcoming Trips</Label>
                          <Switch 
                            id="show-upcoming-trips"
                            checked={userProfile.privacySettings.showUpcomingTrips}
                            onCheckedChange={(checked) => handlePrivacyUpdate('showUpcomingTrips', checked)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3">Security</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          Change Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                        <p className="text-muted-foreground text-sm">Receive updates via email</p>
                      </div>
                      <Switch 
                        id="email-notifications"
                        checked={userProfile.notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="trip-invites" className="font-medium">Trip Invitations</Label>
                        <p className="text-muted-foreground text-sm">Get notified about new trip invites</p>
                      </div>
                      <Switch 
                        id="trip-invites"
                        checked={userProfile.notificationSettings.tripInvites}
                        onCheckedChange={(checked) => handleNotificationUpdate('tripInvites', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="friend-requests" className="font-medium">Friend Requests</Label>
                        <p className="text-muted-foreground text-sm">Get notified about new friend requests</p>
                      </div>
                      <Switch 
                        id="friend-requests"
                        checked={userProfile.notificationSettings.friendRequests}
                        onCheckedChange={(checked) => handleNotificationUpdate('friendRequests', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="trip-updates" className="font-medium">Trip Updates</Label>
                        <p className="text-muted-foreground text-sm">Get notified when trips are updated</p>
                      </div>
                      <Switch 
                        id="trip-updates"
                        checked={userProfile.notificationSettings.tripUpdates}
                        onCheckedChange={(checked) => handleNotificationUpdate('tripUpdates', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="daily-digest" className="font-medium">Daily Digest</Label>
                        <p className="text-muted-foreground text-sm">Receive a daily summary of activities</p>
                      </div>
                      <Switch 
                        id="daily-digest"
                        checked={userProfile.notificationSettings.dailyDigest}
                        onCheckedChange={(checked) => handleNotificationUpdate('dailyDigest', checked)}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Friends Tab */}
              <TabsContent value="friends">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Friends</h3>
                      <Button size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        Add Friends
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Friend requests section */}
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">FRIEND REQUESTS (2)</h4>
                        <div className="space-y-3">
                          {/* Friend request item */}
                          <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>JD</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Jane Doe</p>
                                <p className="text-xs text-muted-foreground">4 mutual friends</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="default">Accept</Button>
                              <Button size="sm" variant="outline">Decline</Button>
                            </div>
                          </div>
                          
                          {/* Friend request item */}
                          <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>MS</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Mike Smith</p>
                                <p className="text-xs text-muted-foreground">2 mutual friends</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="default">Accept</Button>
                              <Button size="sm" variant="outline">Decline</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Friends list */}
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">YOUR FRIENDS (3)</h4>
                        <div className="space-y-3">
                          {/* Friend item */}
                          <div className="flex items-center justify-between p-3 border-b">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>AB</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Alex Brown</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                  <span>Traveled together 2 times</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">Remove</Button>
                          </div>
                          
                          {/* Friend item */}
                          <div className="flex items-center justify-between p-3 border-b">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>SJ</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">Sarah Johnson</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                  <span>Traveled together 1 time</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">Remove</Button>
                          </div>
                          
                          {/* Friend item */}
                          <div className="flex items-center justify-between p-3 border-b">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>DW</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">David Wilson</p>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span>No trips together yet</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost">Remove</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
