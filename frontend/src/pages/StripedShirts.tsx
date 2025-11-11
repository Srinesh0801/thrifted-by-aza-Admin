import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ShirtCard } from "@/components/ui/ShirtCard";
import { UploadForm } from "@/components/UploadForm";
import { ShirtModal } from "@/components/ui/ShirtModal";
import { Loader2, Shirt } from "lucide-react";

interface ShirtType {
  _id: string;
  name: string;
  brand: string;
  sizes: string[];
  images: string[];
}

const Index = () => {
  const [shirts, setShirts] = useState<ShirtType[]>([]);
  const [selectedShirt, setSelectedShirt] = useState<ShirtType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const API_BASE = "http://192.168.1.23:5000";

  const fetchShirts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<ShirtType[]>(`${API_BASE}/api/striped-shirts`);
      setShirts(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load shirts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShirts();
  }, []);

  const handleUpload = async (formData: FormData) => {
    try {
      setIsUploading(true);
      await axios.post(`${API_BASE}/api/striped-shirts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Shirt uploaded successfully!");
      fetchShirts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload shirt");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this shirt?")) return;
    
    try {
      await axios.delete(`${API_BASE}/api/striped-shirts/${id}`);
      toast.success("Shirt deleted successfully!");
      fetchShirts();
      if (selectedShirt?._id === id) {
        setModalOpen(false);
        setSelectedShirt(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete shirt");
    }
  };

const handleUpdate = async (id: string, data: { name: string; brand: string; sizes: string[] }): Promise<ShirtType> => {
  try {
    const res = await axios.put<ShirtType>(`${API_BASE}/api/striped-shirts/${id}`, data);
    toast.success("Shirt updated successfully!");
    fetchShirts();
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update shirt");
    throw error;
  }
};


  const handleView = (shirt: ShirtType) => {
    setSelectedShirt(shirt);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (shirt: ShirtType) => {
    setSelectedShirt(shirt);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setTimeout(() => setSelectedShirt(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 mb-4">
            <Shirt className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
            Striped Shirt Collection
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your premium striped shirt inventory
          </p>
        </div>

        {/* Upload Form */}
        <div className="mb-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <UploadForm onSubmit={handleUpload} isLoading={isUploading} />
        </div>

        {/* Shirts Grid */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              All Shirts
              {!isLoading && (
                <span className="ml-3 text-lg font-normal text-muted-foreground">
                  ({shirts.length} {shirts.length === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">Loading shirts...</p>
              </div>
            </div>
          ) : shirts.length === 0 ? (
            <div className="text-center py-20 px-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Shirt className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No shirts yet</h3>
              <p className="text-muted-foreground">
                Upload your first striped shirt to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shirts.map((shirt) => (
                <ShirtCard
                  key={shirt._id}
                  shirt={shirt}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ShirtModal
        shirt={selectedShirt}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
        editMode={editMode}
      />
    </div>
  );
};

export default Index;
