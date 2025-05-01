
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/types";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar, Home, MapPin, Plus, User } from "lucide-react";
import CreateTripModal from "./CreateTripModal";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCreateTripModal, setShowCreateTripModal] = useState(false);
  const location = useLocation();
  
  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };
  
  const getLinkClasses = (path: string) => {
    return `text-earthy-400 hover:text-earthy-200 px-3 py-2 text-sm font-medium flex items-center gap-1 ${
      isCurrentPath(path) ? "text-earthy-100 font-semibold" : ""
    }`;
  };
  
  return (
    <>
      <nav className="bg-earthy-900 border-b border-earthy-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-earthy-100 text-xl font-bold">Collabo<span className="text-earthy-400">Travel</span></span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link to="/" className={getLinkClasses("/")}>
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link to="/trips" className={getLinkClasses("/trips")}>
                <MapPin className="w-4 h-4" />
                <span>My Trips</span>
              </Link>
              <Link to="/calendar" className={getLinkClasses("/calendar")}>
                <Calendar className="w-4 h-4" />
                <span>Calendar</span>
              </Link>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-earthy-300 border-earthy-600 hover:bg-earthy-800 flex items-center gap-1"
                onClick={() => setShowCreateTripModal(true)}
              >
                <Plus className="w-4 h-4" />
                <span>Create Trip</span>
              </Button>

              <Button variant="ghost" size="icon" className="text-earthy-400 hover:text-earthy-200">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full" size="icon">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/calendar-settings">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Calendar Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center sm:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="inline-flex items-center justify-center p-2 rounded-md text-earthy-400"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {showMobileMenu ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </Button>
            </div>
          </div>
        </div>
        
        {showMobileMenu && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/" className="text-earthy-300 hover:bg-earthy-800 hover:text-earthy-100 block px-3 py-2 text-base font-medium">
                Home
              </Link>
              <Link to="/trips" className="text-earthy-300 hover:bg-earthy-800 hover:text-earthy-100 block px-3 py-2 text-base font-medium">
                My Trips
              </Link>
              <Link to="/calendar" className="text-earthy-300 hover:bg-earthy-800 hover:text-earthy-100 block px-3 py-2 text-base font-medium">
                Calendar
              </Link>
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-earthy-700 hover:bg-earthy-600 text-earthy-100"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowCreateTripModal(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Trip
                </Button>
              </div>
            </div>
            <div className="pt-4 pb-3 border-t border-earthy-700">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-earthy-100">{currentUser.name}</div>
                  <div className="text-sm font-medium text-earthy-400">{currentUser.email}</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto text-earthy-400">
                  <Bell className="h-6 w-6" />
                </Button>
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/profile" className="block px-4 py-2 text-base font-medium text-earthy-400 hover:text-earthy-200 hover:bg-earthy-800 w-full text-left">
                  Profile
                </Link>
                <Link to="/calendar-settings" className="block px-4 py-2 text-base font-medium text-earthy-400 hover:text-earthy-200 hover:bg-earthy-800 w-full text-left">
                  Calendar Settings
                </Link>
                <button className="block px-4 py-2 text-base font-medium text-earthy-400 hover:text-earthy-200 hover:bg-earthy-800 w-full text-left">
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <CreateTripModal 
        isOpen={showCreateTripModal} 
        onClose={() => setShowCreateTripModal(false)} 
        onSubmit={() => {}} // Empty onSubmit function to fix TypeScript error
      />
    </>
  );
};

export default Navbar;
