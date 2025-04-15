
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { EventBasicInfo } from '@/components/event-form/EventBasicInfo';
import { EventDateTimeInputs } from '@/components/event-form/EventDateTimeInputs';
import { EventPriceToggle } from '@/components/event-form/EventPriceToggle';
import { EventImageUpload } from '@/components/event-form/EventImageUpload';

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
  
  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, image: file }));
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
