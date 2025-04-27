
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trip, VoteStatus } from "@/lib/types";
import { ThumbsDown, ThumbsUp } from "lucide-react";

interface VotingCardProps {
  trip: Trip;
  onVote?: (vote: VoteStatus) => void;
}

const VotingCard = ({ trip, onVote }: VotingCardProps) => {
  const [currentVote, setCurrentVote] = useState<VoteStatus | undefined>(
    trip.members.find(m => m.user.id === "u1")?.vote
  );
  
  const totalVotes = trip.members.filter(m => m.vote && m.vote !== 'pending').length;
  const interestedCount = trip.members.filter(m => m.vote === 'interested').length;
  const interestedPercentage = totalVotes > 0 ? Math.round((interestedCount / totalVotes) * 100) : 0;
  
  const handleVote = (vote: VoteStatus) => {
    if (vote === currentVote) {
      // Unselect if clicking the same option
      setCurrentVote(undefined);
      if (onVote) onVote('pending');
    } else {
      setCurrentVote(vote);
      if (onVote) onVote(vote);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-travel-800">Interest Poll</CardTitle>
        <CardDescription>
          Vote on whether you're interested in this trip
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Interest Level</span>
            <span className="text-sm font-medium">{interestedPercentage}%</span>
          </div>
          <Progress value={interestedPercentage} className="h-2" />
        </div>
        
        <div className="flex justify-center gap-6">
          <Button 
            variant={currentVote === 'interested' ? "default" : "outline"} 
            className={`flex items-center gap-2 min-w-[120px] ${
              currentVote === 'interested' ? 'bg-green-600 hover:bg-green-700' : ''
            }`}
            onClick={() => handleVote('interested')}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Interested</span>
          </Button>
          <Button 
            variant={currentVote === 'uninterested' ? "default" : "outline"} 
            className={`flex items-center gap-2 min-w-[120px] ${
              currentVote === 'uninterested' ? 'bg-red-600 hover:bg-red-700' : ''
            }`}
            onClick={() => handleVote('uninterested')}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>Not for me</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div className="text-sm font-medium mb-2">Responses ({totalVotes}/{trip.members.length})</div>
          <div className="flex flex-wrap gap-2">
            {trip.members.map(member => (
              <div key={member.user.id} className="flex flex-col items-center">
                <div className={`relative ${member.vote ? "" : "opacity-50"}`}>
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage src={member.user.avatarUrl} />
                    <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {member.vote === 'interested' && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                      <ThumbsUp className="h-3 w-3 text-white" />
                    </div>
                  )}
                  {member.vote === 'uninterested' && (
                    <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5">
                      <ThumbsDown className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs mt-1 text-gray-600 text-center max-w-[60px] truncate">
                  {member.user.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VotingCard;
