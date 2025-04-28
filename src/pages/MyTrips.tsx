
import { Trip } from "@/lib/types";
import { mockTrips } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const MyTrips = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Trips</h1>
        <div className="space-y-4">
          {mockTrips.map((trip) => (
            <TripListCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TripListCard = ({ trip }: { trip: Trip }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6 flex gap-6">
        <img 
          src={trip.imageUrl} 
          alt={trip.title}
          className="w-48 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
              {trip.destination && (
                <p className="text-gray-600 flex items-center gap-1 mb-2">
                  <MapPin className="h-4 w-4" />
                  {trip.destination}
                </p>
              )}
              {trip.startDate && trip.endDate && (
                <p className="text-gray-600 flex items-center gap-1 mb-2">
                  <Calendar className="h-4 w-4" />
                  {format(trip.startDate, "MMM d")} - {format(trip.endDate, "MMM d, yyyy")}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {trip.tripType && (
                <Badge variant="secondary">
                  {trip.tripType.charAt(0).toUpperCase() + trip.tripType.slice(1)}
                </Badge>
              )}
              <Badge>{trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}</Badge>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex -space-x-2">
              {trip.members.slice(0, 4).map((member) => (
                <Avatar key={member.user.id} className="border-2 border-white h-8 w-8">
                  <AvatarImage src={member.user.avatarUrl} alt={member.user.name} />
                  <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {trip.members.length > 4 && (
                <div className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs">
                  +{trip.members.length - 4}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="h-4 w-4" />
              <span>{trip.members.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyTrips;
