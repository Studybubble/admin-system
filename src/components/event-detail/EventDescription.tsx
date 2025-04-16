
import { AlignLeft } from "lucide-react";

interface EventDescriptionProps {
  description: string;
}

export function EventDescription({ description }: EventDescriptionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <AlignLeft className="mr-2 h-5 w-5" />
        <h2 className="text-xl font-semibold">Description</h2>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
