
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProfileSettings() {
  const { toast } = useToast();
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const username = "admin_user"; // Fixed username

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        // In a real app, we would upload to a server
        // For now we just use FileReader to get a data URL
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result as string);
          setUploading(false);
          
          toast({
            title: "Image uploaded",
            description: "Your profile picture has been updated.",
            duration: 3000,
          });
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const saveChanges = () => {
    // In a real app, this would save to a backend
    // For now we just update the state and show a toast
    setUploading(true);
    
    // Simulate a delay for the save action
    setTimeout(() => {
      setUploading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
        duration: 3000,
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile information and how it appears to others.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileImage} />
            <AvatarFallback className="bg-purple-200 text-purple-700">
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          
          <div className="absolute bottom-0 right-0">
            <Label 
              htmlFor="profile-image" 
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-purple-300 text-purple-700 shadow-sm hover:bg-purple-200"
            >
              <Camera className="h-4 w-4" />
              <span className="sr-only">Upload profile picture</span>
            </Label>
            <Input 
              id="profile-image" 
              type="file" 
              accept="image/*" 
              className="sr-only" 
              onChange={handleImageUpload} 
              disabled={uploading}
            />
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-base font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">Upload a new avatar</p>
          {uploading && <p className="text-xs text-purple-500">Uploading...</p>}
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input 
              id="username" 
              value={username} 
              readOnly 
              className="bg-muted cursor-not-allowed" 
            />
            <p className="text-xs text-muted-foreground mt-1">Username cannot be changed</p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={saveChanges} 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={uploading}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
