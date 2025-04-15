
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { EventBasicInfo } from '@/components/event-form/EventBasicInfo';
import { EventDateTimeInputs } from '@/components/event-form/EventDateTimeInputs';
import { EventPriceToggle } from '@/components/event-form/EventPriceToggle';
import { EventImageUpload } from '@/components/event-form/EventImageUpload';
import { useEvents } from '@/context/EventsContext';

export function EventForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { events, updateEvent } = useEvents();
  
  const existingEvent = isEditMode ? events.find(e => e.id === id) : null;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '09:00',
    endTime: '',
    location: '',
    isFree: true,
    price: 0,
    image: null as File | null,
  });

  useEffect(() => {
    if (existingEvent) {
      const timeParts = existingEvent.time?.split(' - ') || ['09:00', ''];
      
      setFormData({
        title: existingEvent.title || '',
        description: existingEvent.description || '',
        date: existingEvent.date ? new Date(existingEvent.date) : new Date(),
        time: timeParts[0].trim() || '09:00',
        endTime: timeParts[1]?.trim() || '',
        location: existingEvent.location || '',
        isFree: existingEvent.isFree ?? true,
        price: existingEvent.price || 0,
        image: null,
      });
    }
  }, [existingEvent]);
  
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
  
  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, image: file }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format the time string based on whether endTime exists
    const formattedTime = formData.endTime 
      ? `${formData.time} - ${formData.endTime}`
      : formData.time;
      
    // Format date to string (YYYY-MM-DD)
    const formattedDate = formData.date.toISOString().split('T')[0];
      
    // Create the updated event data
    const updatedEventData = {
      title: formData.title,
      description: formData.description,
      date: formattedDate,
      time: formattedTime,
      location: formData.location,
      isFree: formData.isFree,
      price: !formData.isFree ? Number(formData.price) : undefined,
    };
    
    setTimeout(() => {
      if (isEditMode && id) {
        // Update existing event
        updateEvent(id, updatedEventData);
        
        toast({
          title: "Event Updated",
          description: `Successfully updated ${formData.title}`,
        });
      } else {
        // Create new event logic would go here (not part of this task)
        toast({
          title: "Event Created",
          description: `Successfully created ${formData.title}`,
        });
      }
      
      setIsSubmitting(false);
      navigate('/events');
    }, 1000);
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
            <EventBasicInfo 
              title={formData.title}
              description={formData.description}
              location={formData.location}
              onInputChange={handleChange}
            />
            
            <EventDateTimeInputs
              date={formData.date}
              startTime={formData.time}
              endTime={formData.endTime}
              onDateChange={handleDateChange}
              onInputChange={handleChange}
            />
          </div>
          
          <div className="space-y-4">
            <EventImageUpload 
              existingImageUrl={existingEvent?.imageUrl}
              onImageChange={handleImageChange}
              initialImage={formData.image}
            />
            
            <EventPriceToggle 
              isFree={formData.isFree}
              price={formData.price}
              onSwitchChange={handleSwitchChange}
              onPriceChange={handleChange}
            />
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
