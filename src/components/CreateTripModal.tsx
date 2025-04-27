
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TripType } from "@/lib/types";
import { Calendar as CalendarIcon, MapPin, Pencil, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tripData: any) => void;
}

const CreateTripModal = ({ isOpen, onClose, onSubmit }: CreateTripModalProps) => {
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    title: "",
    description: "",
    destination: "",
    tripType: "relaxing" as TripType,
    dateRange: {
      from: null as Date | null,
      to: null as Date | null,
    },
    budget: {
      min: 0,
      max: 1000,
      currency: "USD",
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTripData({
      ...tripData,
      budget: {
        ...tripData.budget,
        [name]: parseFloat(value) || 0,
      },
    });
  };

  const handleDateChange = (range: { from: Date; to: Date | null }) => {
    setTripData({
      ...tripData,
      dateRange: range,
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const handleSubmit = () => {
    // Transform the data as needed before submission
    const formattedData = {
      ...tripData,
      startDate: tripData.dateRange.from,
      endDate: tripData.dateRange.to,
    };
    onSubmit(formattedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Create New Trip</DialogTitle>
          <DialogDescription>
            {step === 1 && "Let's start with some basic information about your trip."}
            {step === 2 && "Now tell us about when and where you're planning to go."}
            {step === 3 && "Finally, set your budget and review trip details."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Step 1: Basic Trip Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label htmlFor="title" className="block mb-1.5">Trip Name</Label>
                <div className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="title"
                    name="title"
                    placeholder="Summer Getaway 2025"
                    value={tripData.title}
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="block mb-1.5">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell your friends what this trip is about..."
                  value={tripData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div>
                <Label className="block mb-3">Trip Type</Label>
                <RadioGroup 
                  defaultValue={tripData.tripType}
                  onValueChange={(value) => 
                    setTripData({ ...tripData, tripType: value as TripType })
                  }
                  className="grid grid-cols-2 gap-2"
                >
                  <div>
                    <RadioGroupItem 
                      value="romantic" 
                      id="romantic" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="romantic"
                      className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        tripData.tripType === "romantic" && "border-travel-500"
                      )}
                    >
                      <span className="text-base">Romantic</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="relaxing" 
                      id="relaxing" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="relaxing"
                      className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        tripData.tripType === "relaxing" && "border-travel-500"
                      )}
                    >
                      <span className="text-base">Relaxing</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="city" 
                      id="city" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="city"
                      className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        tripData.tripType === "city" && "border-travel-500"
                      )}
                    >
                      <span className="text-base">City</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem 
                      value="activity" 
                      id="activity" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="activity"
                      className={cn("flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        tripData.tripType === "activity" && "border-travel-500"
                      )}
                    >
                      <span className="text-base">Activity</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Location & Dates */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label htmlFor="destination" className="block mb-1.5">Destination</Label>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="Paris, France"
                    value={tripData.destination}
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label className="block mb-1.5">Date Range</Label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !tripData.dateRange.from && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tripData.dateRange.from ? (
                          tripData.dateRange.to ? (
                            <>
                              {format(tripData.dateRange.from, "LLL dd, yyyy")} -{" "}
                              {format(tripData.dateRange.to, "LLL dd, yyyy")}
                            </>
                          ) : (
                            format(tripData.dateRange.from, "LLL dd, yyyy")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={tripData.dateRange.from || new Date()}
                        selected={tripData.dateRange as any}
                        onSelect={handleDateChange as any}
                        numberOfMonths={2}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget & Collaborators */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label className="block mb-3">Budget Range (USD)</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min" className="text-sm text-muted-foreground">Minimum</Label>
                    <Input
                      id="min"
                      name="min"
                      type="number"
                      placeholder="0"
                      value={tripData.budget.min}
                      onChange={handleBudgetChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="max" className="text-sm text-muted-foreground">Maximum</Label>
                    <Input
                      id="max"
                      name="max"
                      type="number"
                      placeholder="1000"
                      value={tripData.budget.max}
                      onChange={handleBudgetChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="block mb-1.5">Invite Collaborators</Label>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter email addresses (comma separated)"
                    className="flex-1"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  You can also invite friends after creating the trip
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack}>
            {step > 1 ? "Back" : "Cancel"}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {step} of 3
            </span>
            <Button onClick={handleNext}>
              {step < 3 ? "Next" : "Create Trip"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripModal;
