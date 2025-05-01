
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TripCard from "@/components/TripCard";
import { mockTrips } from "@/lib/types";
import { Calendar, MapPin, Plus, User } from "lucide-react";
import CreateTripModal from "@/components/CreateTripModal";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const upcomingTrips = mockTrips.filter(trip => 
    trip.status === "planning" || trip.status === "confirmed"
  );
  
  const invitations = mockTrips.filter(trip => 
    trip.members.some(m => m.user.id === "u1" && m.status === "invited")
  );

  const handleCreateTrip = (tripData: any) => {
    console.log("Creating trip with data:", tripData);
    setCreateModalOpen(false);
    toast.success("Trip created successfully!", {
      description: `Your trip to ${tripData.destination || "your destination"} has been created.`,
    });
    // In a real app, you would create the trip and then navigate to it
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-travel-600 to-travel-800 rounded-xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Welcome to CollaboTravel</h1>
            <p className="text-travel-50 mb-6 max-w-2xl">
              Plan trips together with friends, vote on destinations, and coordinate your travel plans in one place.
            </p>
            <Button 
              onClick={() => setCreateModalOpen(true)}
              className="bg-white text-travel-800 hover:bg-travel-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Trip
            </Button>
          </div>
          <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 bg-travel-400/20 rounded-full w-64 h-64"></div>
          <div className="absolute right-20 top-10 transform -translate-y-1/4 bg-travel-400/20 rounded-full w-32 h-32"></div>
        </div>
        
        {/* Content sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Invitations */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-earthy-200 mb-4 flex items-center">
              <User className="mr-2 h-5 w-5 text-travel-500" />
              Invitations
            </h2>
            
            {invitations.length > 0 ? (
              <div className="space-y-4">
                {invitations.map(trip => (
                  <div key={trip.id} className="bg-earthy-800/70 p-4 rounded-lg border border-earthy-700 shadow-sm">
                    <div className="flex items-start">
                      <img 
                        src={trip.imageUrl} 
                        alt={trip.title} 
                        className="h-16 w-16 rounded object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-earthy-200">{trip.title}</h3>
                        <p className="text-sm text-earthy-400 mb-2">
                          {trip.creator.name} invited you
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default" className="bg-travel-600 hover:bg-travel-700">
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="border-earthy-600 text-earthy-300 hover:bg-earthy-700">
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-earthy-800/70 p-6 rounded-lg border border-earthy-700 text-center">
                <p className="text-earthy-400">No pending invitations</p>
              </div>
            )}
          </div>
          
          {/* Calendar Preview */}
          <div className="animate-fade-in" style={{animationDelay: "0.1s"}}>
            <h2 className="text-2xl font-bold text-earthy-200 mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-travel-500" />
              Upcoming Travel
            </h2>
            <div className="bg-earthy-800/70 p-6 rounded-lg border border-earthy-700 shadow-sm">
              {upcomingTrips.length > 0 ? (
                <div className="space-y-3">
                  {upcomingTrips.slice(0, 3).map(trip => (
                    <div key={trip.id} className="flex items-center border-b border-earthy-700 pb-3 last:border-0">
                      <div className="w-2 h-2 rounded-full bg-travel-500 mr-2"></div>
                      <div className="flex-1">
                        <div className="font-medium text-earthy-200">{trip.title}</div>
                        <div className="text-sm text-earthy-400 flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{trip.destination || "Location TBD"}</span>
                        </div>
                      </div>
                      <div className="text-sm text-earthy-400">
                        {trip.startDate && new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {trip.startDate && trip.endDate && " - "}
                        {trip.endDate && new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-earthy-400">No upcoming trips</p>
              )}
              <Button
                variant="outline"
                className="w-full mt-4 border-dashed border-earthy-600 text-earthy-300 hover:text-earthy-200 hover:bg-earthy-700"
                onClick={() => setCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Schedule a Trip
              </Button>
            </div>
          </div>
        </div>
        
        {/* Your Trips */}
        <div className="mb-12 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-earthy-200">Your Trips</h2>
            <Button 
              variant="outline" 
              onClick={() => setCreateModalOpen(true)}
              className="text-earthy-300 border-earthy-600 hover:bg-earthy-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Button>
          </div>
          
          {mockTrips.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {mockTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-earthy-800/70 rounded-lg border border-earthy-700">
              <h3 className="text-lg font-medium text-earthy-200 mb-2">No trips yet</h3>
              <p className="text-earthy-400 mb-4">Create your first trip to get started</p>
              <Button onClick={() => setCreateModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Trip
              </Button>
            </div>
          )}
        </div>
        
        {/* Popular Destinations */}
        <div className="animate-fade-in" style={{animationDelay: "0.3s"}}>
          <h2 className="text-2xl font-bold text-earthy-200 mb-6">Popular Destinations</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {popularDestinations.map(destination => (
              <div key={destination.name} className="group relative rounded-lg overflow-hidden h-48 shadow-md">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-semibold">{destination.name}</h3>
                  <p className="text-xs text-white/90">{destination.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <CreateTripModal 
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateTrip}
      />
    </div>
  );
};

const popularDestinations = [
  {
    name: "Paris",
    country: "France",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
  },
  {
    name: "Bali",
    country: "Indonesia",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop"
  },
  {
    name: "Tokyo",
    country: "Japan",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2071&auto=format&fit=crop"
  },
  {
    name: "New York",
    country: "United States",
    imageUrl: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?q=80&w=2069&auto=format&fit=crop"
  }
];

export default Index;
