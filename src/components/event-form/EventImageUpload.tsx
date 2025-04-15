
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus } from 'lucide-react';
import { useState } from 'react';

interface EventImageUploadProps {
  existingImageUrl?: string | null;
  onImageChange: (file: File | null) => void;
  initialImage: File | null;
}

export function EventImageUpload({ existingImageUrl, onImageChange, initialImage }: EventImageUploadProps) {
  const [image, setImage] = useState<File | null>(initialImage);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <Label>Event Image</Label>
      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center h-64">
        {image || existingImageUrl ? (
          <div className="relative w-full h-full">
            <img 
              src={image ? URL.createObjectURL(image) : existingImageUrl || ''} 
              alt="Event preview" 
              className="w-full h-full object-contain"
            />
            <Button 
              type="button" 
              variant="outline" 
              className="absolute bottom-2 right-2"
              onClick={handleRemoveImage}
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
  );
}
