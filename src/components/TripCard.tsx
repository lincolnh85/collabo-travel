
import { Link } from "react-router-dom";
import { Trip } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  const { id, title, destination, imageUrl, startDate, endDate, status, members } = trip;

  const dateDisplay = () => {
    if (startDate && endDate) {
      const start = format(startDate, "MMM d");
      const end = format(endDate, "MMM d, yyyy");
      return `${start} - ${end}`;
    }
    return "Dates not set";
  };

  const getTripTypeColor = (tripType?: string) => {
    switch (tripType) {
      case 'romantic':
        return "bg-rose-100 text-rose-800";
      case 'relaxing': 
        return "bg-beach-100 text-beach-800";
      case 'city':
        return "bg-travel-100 text-travel-800";
      case 'activity':
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return "bg-green-100 text-green-800";
      case 'planning': 
        return "bg-blue-100 text-blue-800";
      case 'draft':
        return "bg-gray-100 text-gray-800";
      case 'completed':
        return "bg-purple-100 text-purple-800";
      case 'cancelled':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link to={`/trip/${id}`} className="trip-card group">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="trip-card-image group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {trip.tripType && (
            <Badge variant="outline" className={`${getTripTypeColor(trip.tripType)} border-0`}>
              {trip.tripType.charAt(0).toUpperCase() + trip.tripType.slice(1)}
            </Badge>
          )}
          <Badge variant="outline" className={`${getStatusColor(status)} border-0`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-travel-900">{title}</h3>
        {destination && (
          <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {destination}
          </p>
        )}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{dateDisplay()}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            {members.slice(0, 3).map((member) => (
              <Avatar key={member.user.id} className="border-2 border-white h-8 w-8">
                <AvatarImage src={member.user.avatarUrl} alt={member.user.name} />
                <AvatarFallback className="text-xs">{member.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {members.length > 3 && (
              <div className="bg-gray-100 text-gray-600 h-8 w-8 rounded-full border-2 border-white flex items-center justify-center text-xs">
                +{members.length - 3}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{members.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
