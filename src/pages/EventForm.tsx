
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, ImagePlus, Info, Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export function EventForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const existingEvent = isEditMode ? events.find(e => e.id === id) : null;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: existingEvent?.title || '',
    description: existingEvent?.description || '',
    date: existingEvent?.date ? new Date(existingEvent.date) : new Date(),
    time: existingEvent?.time?.split(' - ')[0].trim() || '09:00',
    endTime: existingEvent?.time?.split(' - ')[1]?.trim() || '',
    location: existingEvent?.location || '',
    isFree: existingEvent?.isFree ?? true,
    price: existingEvent?.price || 0,
    image: null as File | null,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked) => {
    setFormData(prev => ({ ...prev, isFree: checked }));
  };
  
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, date }));
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: isEditMode ? "Event Updated" : "Event Created",
        description: `Successfully ${isEditMode ? 'updated' : 'created'} ${formData.title}`,
      });
      setIsSubmitting(false);
      navigate('/events');
    }, 1500);
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Event' : 'Create New Event'}</h1>
        <p className="text-muted-foreground">
          {isEditMode ? 'Update your event details below' : 'Fill in the details to create a new event'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter event title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
                rows={5}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter event location"
                  className="pl-8"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-1/2 space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="w-1/2 space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time (Optional)</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
            
            {!formData.isFree && (
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  required={!formData.isFree}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Event Image</Label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-64">
                {formData.image || existingEvent?.imageUrl ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={formData.image ? URL.createObjectURL(formData.image) : existingEvent?.imageUrl} 
                      alt="Event preview" 
                      className="w-full h-full object-contain"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="absolute bottom-2 right-2"
                      onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <>
                    <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop your image here, or click to browse</p>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById('image')?.click()}>
                      Select Image
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="free-event">Free Event</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle if this is a free event
                  </p>
                </div>
                <Switch
                  id="free-event"
                  checked={formData.isFree}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
            
            {!formData.isFree && (
              <div className="rounded-md bg-blue-50 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Paid Event</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>This event will be marked as paid. Please specify the price above.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/events')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default EventForm;
