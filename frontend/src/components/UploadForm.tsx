import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const sizesOptions = ["XS", "S", "M", "L", "XL", "XXL"];

interface UploadFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export const UploadForm = ({ onSubmit, isLoading }: UploadFormProps) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!files.length || !name || !brand || !selectedSizes.length) {
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("sizes", selectedSizes.join(","));

    await onSubmit(formData);
    
    // Reset form
    setName("");
    setBrand("");
    setSelectedSizes([]);
    setFiles([]);
  };

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Upload New Shirt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter shirt name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border-input"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand" className="text-foreground font-medium">Brand</Label>
            <Input
              id="brand"
              type="text"
              placeholder="Enter brand name"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="bg-background border-input"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-foreground font-medium">Sizes</Label>
            <div className="flex flex-wrap gap-3">
              {sizesOptions.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() => toggleSize(size)}
                  />
                  <label
                    htmlFor={size}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-foreground font-medium">Images</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-background"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              
              {files.length === 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <ImageIcon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">
                      Drag & drop images here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">or</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Browse Files
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {files.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full aspect-square object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary flex items-center justify-center transition-colors duration-200"
                  >
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium"
            disabled={isLoading || !files.length || !name || !brand || !selectedSizes.length}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Shirt
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
