
export type TripType = 'romantic' | 'relaxing' | 'city' | 'activity';

export type AvailabilityStatus = 'available' | 'unavailable' | 'flexible';

export type UserRole = 'organizer' | 'member';

export type VoteStatus = 'interested' | 'uninterested' | 'pending';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Trip {
  id: string;
  title: string;
  description?: string;
  destination?: string;
  imageUrl: string;
  startDate?: Date;
  endDate?: Date;
  tripType?: TripType;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'draft' | 'planning' | 'confirmed' | 'completed' | 'cancelled';
  creator: User;
  members: Array<{
    user: User;
    role: UserRole;
    status: 'invited' | 'joined' | 'declined';
    vote?: VoteStatus;
    availability?: Array<{
      date: Date;
      status: AvailabilityStatus;
    }>;
    paid?: boolean;
  }>;
  activities?: Array<{
    id: string;
    title: string;
    description?: string;
    date?: Date;
    location?: string;
    votes: Record<string, VoteStatus>; // userId: voteStatus
  }>;
}

// Mock data for development
export const currentUser: User = {
  id: "u1",
  name: "Current User",
  email: "user@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=68"
};

export const mockTrips: Trip[] = [
  {
    id: "t1",
    title: "Weekend in Paris",
    description: "Exploring the city of lights for a weekend getaway.",
    destination: "Paris, France",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    startDate: new Date("2025-06-15"),
    endDate: new Date("2025-06-17"),
    tripType: "city",
    status: "planning",
    budget: {
      min: 500,
      max: 1000,
      currency: "USD"
    },
    creator: currentUser,
    members: [
      {
        user: currentUser,
        role: "organizer",
        status: "joined",
        vote: "interested"
      },
      {
        user: {
          id: "u2",
          name: "Alex Johnson",
          email: "alex@example.com",
          avatarUrl: "https://i.pravatar.cc/150?img=33"
        },
        role: "member",
        status: "joined",
        vote: "interested"
      },
      {
        user: {
          id: "u3",
          name: "Sam Williams",
          email: "sam@example.com",
          avatarUrl: "https://i.pravatar.cc/150?img=12"
        },
        role: "member",
        status: "invited"
      }
    ]
  },
  {
    id: "t2",
    title: "Beach Week in Cancun",
    description: "Relaxing beach vacation with friends.",
    destination: "Cancun, Mexico",
    imageUrl: "https://images.unsplash.com/photo-1552074283-f2c219807b27?q=80&w=2070&auto=format&fit=crop",
    startDate: new Date("2025-07-10"),
    endDate: new Date("2025-07-17"),
    tripType: "relaxing",
    status: "planning",
    budget: {
      min: 800,
      max: 1500,
      currency: "USD"
    },
    creator: {
      id: "u2",
      name: "Alex Johnson",
      email: "alex@example.com",
      avatarUrl: "https://i.pravatar.cc/150?img=33"
    },
    members: [
      {
        user: currentUser,
        role: "member",
        status: "joined",
        vote: "pending"
      },
      {
        user: {
          id: "u2",
          name: "Alex Johnson",
          email: "alex@example.com",
          avatarUrl: "https://i.pravatar.cc/150?img=33"
        },
        role: "organizer",
        status: "joined",
        vote: "interested"
      }
    ]
  },
  {
    id: "t3",
    title: "Hiking in Yosemite",
    description: "Adventure trip with hiking and camping.",
    destination: "Yosemite, USA",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2080&auto=format&fit=crop",
    startDate: new Date("2025-08-20"),
    endDate: new Date("2025-08-25"),
    tripType: "activity",
    status: "planning",
    creator: {
      id: "u4",
      name: "Jamie Smith",
      email: "jamie@example.com",
      avatarUrl: "https://i.pravatar.cc/150?img=47"
    },
    members: [
      {
        user: currentUser,
        role: "member",
        status: "invited"
      },
      {
        user: {
          id: "u4",
          name: "Jamie Smith",
          email: "jamie@example.com",
          avatarUrl: "https://i.pravatar.cc/150?img=47"
        },
        role: "organizer",
        status: "joined"
      }
    ]
  }
];
