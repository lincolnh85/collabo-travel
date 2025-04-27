
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockTrips } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import VotingCard from "@/components/VotingCard";
import { toast } from "sonner";
import { Calendar, Clock, DollarSign, MapPin, MessageSquare, Plus, Users } from "lucide-react";

const TripDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the trip by id from mock data
  const trip = mockTrips.find(t => t.id === id);
  
  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Trip Not Found</h1>
          <p className="text-gray-500 mb-6">The trip you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    );
  }

  const renderStatus = (status: string) => {
    const statusColors: Record<string, string> = {
      'planning': "bg-blue-100 text-blue-800 border-blue-200",
      'confirmed': "bg-green-100 text-green-800 border-green-200",
      'completed': "bg-purple-100 text-purple-800 border-purple-200",
      'cancelled': "bg-red-100 text-red-800 border-red-200",
      'draft': "bg-gray-100 text-gray-800 border-gray-200",
    };
    
    return (
      <Badge variant="outline" className={`${statusColors[status] || "bg-gray-100"} border-0`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  const handleVote = (vote: any) => {
    toast.success(`You voted "${vote === 'interested' ? 'Interested' : 'Not interested'}"`, {
      description: "Your response has been recorded.",
    });
  };
  
  const handleAvailabilitySave = (dates: any) => {
    toast.success("Availability saved", {
      description: `You've marked ${dates.length} dates with your availability.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Trip header */}
      <div 
        className="bg-cover bg-center h-64 md:h-80 relative"
        style={{ backgroundImage: `url(${trip.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {renderStatus(trip.status)}
                  {trip.tripType && (
                    <Badge variant="outline" className="bg-white/20 text-white border-0">
                      {trip.tripType.charAt(0).toUpperCase() + trip.tripType.slice(1)}
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-1">{trip.title}</h1>
                {trip.destination && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{trip.destination}</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button className="bg-white text-travel-700 hover:bg-travel-50">
                  <Users className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                {/* Trip details */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">About this trip</h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-travel-100 text-travel-800 p-2 rounded-lg">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Dates</p>
                        <p className="font-medium">
                          {trip.startDate && trip.endDate ? (
                            <>
                              {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              {" - "}
                              {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </>
                          ) : (
                            "Dates not finalized"
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-travel-100 text-travel-800 p-2 rounded-lg">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                        <p className="font-medium">
                          {trip.startDate && trip.endDate ? (
                            `${Math.ceil((trip.endDate.getTime() - trip.startDate.getTime()) / (1000 * 60 * 60 * 24))} days`
                          ) : (
                            "TBD"
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-travel-100 text-travel-800 p-2 rounded-lg">
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Budget</p>
                        <p className="font-medium">
                          {trip.budget ? (
                            `${trip.budget.min} - ${trip.budget.max} ${trip.budget.currency}`
                          ) : (
                            "Not set"
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-travel-100 text-travel-800 p-2 rounded-lg">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Participants</p>
                        <p className="font-medium">
                          {trip.members.filter(m => m.status === "joined").length} confirmed
                          {trip.members.filter(m => m.status === "invited").length > 0 && (
                            <> / {trip.members.filter(m => m.status === "invited").length} invited</>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {trip.description && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p className="text-gray-600">{trip.description}</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Travelers</h2>
                  <div className="space-y-4">
                    {trip.members.map(member => (
                      <div key={member.user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-gray-200">
                            <AvatarImage src={member.user.avatarUrl} />
                            <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.user.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Badge variant="outline" className="text-xs py-0 px-1">
                                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                              </Badge>
                              <span>•</span>
                              <span>
                                {member.status === "joined" ? "Going" : 
                                 member.status === "invited" ? "Invited" : "Declined"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          {member.paid && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-0">
                              Paid
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite More Friends
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <VotingCard trip={trip} onVote={handleVote} />
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Next Steps</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-travel-100 text-travel-800 flex items-center justify-center text-xs font-medium mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Vote on the trip</p>
                        <p className="text-sm text-gray-500">Show your interest in this destination</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-travel-100 text-travel-800 flex items-center justify-center text-xs font-medium mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Mark your availability</p>
                        <p className="text-sm text-gray-500">Let others know when you can travel</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-travel-100 text-travel-800 flex items-center justify-center text-xs font-medium mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Join the group chat</p>
                        <p className="text-sm text-gray-500">Discuss details with other travelers</p>
                      </div>
                    </li>
                  </ul>
                  <Button className="w-full mt-4">View Full Checklist</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="itinerary" className="animate-fade-in">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Trip Itinerary</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
              
              <div className="text-center py-8">
                <p className="text-gray-500">No activities have been added yet.</p>
                <p className="text-gray-500 mb-4">Be the first to suggest something!</p>
                <Button>Add First Activity</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="availability" className="animate-fade-in">
            <AvailabilityCalendar 
              startDate={trip.startDate} 
              endDate={trip.endDate}
              onSave={handleAvailabilitySave}
            />
          </TabsContent>
          
          <TabsContent value="budget" className="animate-fade-in">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Budget Tracker</h2>
              <div className="text-center py-8">
                <p className="text-gray-500">Budget tracking will be available soon.</p>
                <p className="text-gray-500 mb-4">Check back later for this feature!</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TripDetails;
