
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useEvents } from '@/context/EventsContext';

export function useEventForm() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const { events, updateEvent, addEvent } = useEvents();
  
  const existingEvent = isEditMode ? events.find(e => e.id === id) : null;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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
    imageUrl: '',
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
        imageUrl: existingEvent.imageUrl || '',
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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ 
          ...prev, 
          image: file,
          imageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
    }
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
    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formattedDate,
      time: formattedTime,
      location: formData.location,
      isFree: formData.isFree,
      price: !formData.isFree ? Number(formData.price) : 0,
      imageUrl: formData.imageUrl || '/placeholder.svg',
      attendees: existingEvent?.attendees || []
    };
    
    setTimeout(() => {
      if (isEditMode && id) {
        // Update existing event
        updateEvent(id, eventData);
        
        toast({
          title: "Event Updated",
          description: `Successfully updated ${formData.title}`,
        });
      } else {
        // Create new event
        addEvent(eventData);
        
        toast({
          title: "Event Created",
          description: `Successfully created ${formData.title}`,
        });
      }
      
      setIsSubmitting(false);
      setShowSuccessDialog(true);
    }, 1000); // Simulated delay for better UX
  };

  return {
    formData,
    isEditMode,
    isSubmitting,
    showSuccessDialog,
    setShowSuccessDialog,
    handleChange,
    handleSwitchChange,
    handleDateChange,
    handleImageChange,
    handleSubmit
  };
}
