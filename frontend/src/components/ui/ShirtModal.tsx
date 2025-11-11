import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, X, Edit2, Save } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Shirt {
  _id: string;
  name: string;
  brand: string;
  sizes: string[];
  images: string[];
}

interface ShirtModalProps {
  shirt: Shirt | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: { name: string; brand: string; sizes: string[] }) => Promise<Shirt>;
  editMode?: boolean;
}

const sizesOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export const ShirtModal = ({ shirt, isOpen, onClose, onUpdate, editMode: initialEditMode }: ShirtModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [editMode, setEditMode] = useState(initialEditMode || false);
  const [editData, setEditData] = useState<{ name: string; brand: string; sizes: string[] }>({
    name: shirt?.name || "",
    brand: shirt?.brand || "",
    sizes: shirt?.sizes || [],
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // 🔹 Reset form when shirt changes
  useEffect(() => {
    if (shirt) {
      setEditData({
        name: shirt.name,
        brand: shirt.brand,
        sizes: shirt.sizes,
      });
      setCurrentImageIndex(0);
      setEditMode(initialEditMode || false);
    }
  }, [shirt, initialEditMode]);

  if (!shirt) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % shirt.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + shirt.images.length) % shirt.images.length);
  };

  const toggleSize = (size: string) => {
    setEditData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

const handleSave = async () => {
  setIsUpdating(true);
  try {
    const updated = await onUpdate(shirt._id, editData);

    // 🔹 immediately update modal state with the new shirt
    setEditData({
      name: updated.name,
      brand: updated.brand,
      sizes: updated.sizes,
    });

    setEditMode(false);
    onClose();
  } finally {
    setIsUpdating(false);
  }
};


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0 bg-card border-border overflow-hidden">
        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Image Carousel */}
          <div className="lg:w-3/5 relative bg-muted flex items-center justify-center">
            {shirt.images.length > 0 && (
              <>
                <img
                  src={shirt.images[currentImageIndex]}
                  alt={`${shirt.name} - ${currentImageIndex + 1}`}
                  className="max-h-[60vh] lg:max-h-[90vh] w-full object-contain"
                />
                
                {shirt.images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium">
                      {currentImageIndex + 1} / {shirt.images.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Details Panel */}
          <div className="lg:w-2/5 p-6 lg:p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-2rem)]">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold text-foreground pr-8">
                {editMode ? "Edit Shirt" : "Shirt Details"}
              </h2>
              <div className="flex gap-2">
                {!editMode && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setEditMode(true);
                      setEditData({
                        name: shirt.name,
                        brand: shirt.brand,
                        sizes: shirt.sizes,
                      });
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {editMode ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-brand">Brand</Label>
                  <Input
                    id="edit-brand"
                    value={editData.brand}
                    onChange={(e) => setEditData({ ...editData, brand: e.target.value })}
                    className="bg-background"
                  />
                </div>

                {/* Sizes in compact grid */}
                <div className="space-y-3">
                  <Label>Sizes</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {sizesOptions.map((size) => (
                      <label key={size} className="flex items-center space-x-1 text-sm cursor-pointer">
                        <Checkbox
                          id={`edit-${size}`}
                          checked={editData.sizes.includes(size)}
                          onCheckedChange={() => toggleSize(size)}
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="flex-1 bg-gradient-to-r from-primary to-primary/80"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <Label className="text-muted-foreground text-sm">Name</Label>
                  <p className="text-lg font-semibold text-foreground mt-1">{shirt.name}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm">Brand</Label>
                  <p className="text-lg font-semibold text-foreground mt-1">{shirt.brand}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm mb-3 block">Available Sizes</Label>
                  <div className="flex flex-wrap gap-2">
                    {shirt.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {shirt.images.length > 1 && (
                  <div>
                    <Label className="text-muted-foreground text-sm mb-3 block">
                      All Images ({shirt.images.length})
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {shirt.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentImageIndex
                              ? "border-primary"
                              : "border-transparent hover:border-border"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
