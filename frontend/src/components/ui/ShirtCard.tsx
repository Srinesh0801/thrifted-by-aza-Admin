import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Shirt {
  _id: string;
  name: string;
  brand: string;
  sizes: string[];
  images: string[];
}

interface ShirtCardProps {
  shirt: Shirt;
  onView: (shirt: Shirt) => void;
  onEdit: (shirt: Shirt) => void;
  onDelete: (id: string) => void;
}

export const ShirtCard = ({ shirt, onView, onEdit, onDelete }: ShirtCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(shirt);
          }}
        >
          <Edit className="h-4 w-4 text-primary" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(shirt._id);
          }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      
      <div 
        className="cursor-pointer overflow-hidden"
        onClick={() => onView(shirt)}
      >
        <div className="relative aspect-square bg-muted">
          <img
            src={shirt.images[0]}
            alt={shirt.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {shirt.images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs font-medium">
              +{shirt.images.length - 1}
            </div>
          )}
        </div>
        
        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-foreground truncate">{shirt.name}</h3>
          <p className="text-sm text-muted-foreground">Brand: {shirt.brand}</p>
          <div className="flex flex-wrap gap-1.5">
            {shirt.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
              >
                {size}
              </span>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
