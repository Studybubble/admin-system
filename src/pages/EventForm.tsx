
import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { EventBasicInfo } from '@/components/event-form/EventBasicInfo';
import { EventDateTimeInputs } from '@/components/event-form/EventDateTimeInputs';
import { EventPriceToggle } from '@/components/event-form/EventPriceToggle';
import { EventImageUpload } from '@/components/event-form/EventImageUpload';
import { EventSuccessDialog } from '@/components/events/EventSuccessDialog';
import { EventFormHeader } from '@/components/event-form/EventFormHeader';
import { EventFormActions } from '@/components/event-form/EventFormActions';
import { useEventForm } from '@/hooks/useEventForm';

export function EventForm() {
  const {
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
  } = useEventForm();
  
  return (
    <DashboardLayout>
      <EventFormHeader isEditMode={isEditMode} />
      
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
              existingImageUrl={formData.imageUrl}
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
        
        <EventFormActions 
          isSubmitting={isSubmitting} 
          isEditMode={isEditMode} 
        />
      </form>
      
      <EventSuccessDialog 
        isOpen={showSuccessDialog}
        setIsOpen={setShowSuccessDialog}
        eventTitle={formData.title}
        isEdit={isEditMode}
      />
    </DashboardLayout>
  );
}

export default EventForm;
