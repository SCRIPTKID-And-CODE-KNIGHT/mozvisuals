import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock, Upload, Trash2, ArrowLeft, Image } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { value: "advertising", label: "Advertising & Marketing Design" },
  { value: "branding", label: "Branding & Identity Design" },
  { value: "print", label: "Print & Publication Design" },
  { value: "digital", label: "Digital & Web Graphics" },
];

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('verify-admin', {
        body: { password }
      });

      if (error) throw error;

      if (data.valid) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
        toast({ title: "Welcome!", description: "Successfully logged in." });
      } else {
        toast({ title: "Error", description: "Invalid password.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to verify password.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPortfolioItems = async () => {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPortfolioItems(data);
    }
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPortfolioItems();
    }
  }, [isAuthenticated]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !title || !category) {
      toast({ title: "Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    try {
      // Upload image
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(fileName);

      // Insert portfolio item
      const { error: insertError } = await supabase
        .from('portfolio_items')
        .insert({
          title,
          description: description || null,
          category,
          image_url: publicUrl
        });

      if (insertError) throw insertError;

      toast({ title: "Success", description: "Portfolio item added!" });
      setTitle("");
      setDescription("");
      setCategory("");
      setImageFile(null);
      setImagePreview(null);
      fetchPortfolioItems();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (item: PortfolioItem) => {
    try {
      // Extract filename from URL
      const urlParts = item.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      await supabase.storage.from('portfolio').remove([fileName]);

      // Delete from database
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      toast({ title: "Deleted", description: "Portfolio item removed." });
      fetchPortfolioItems();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Portfolio Manager</h1>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              sessionStorage.removeItem('admin_authenticated');
              setIsAuthenticated(false);
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add New Item Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Add New Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description (optional)"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image *</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {imagePreview && (
                    <div className="mt-2 rounded-lg overflow-hidden">
                      <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover" />
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Add to Portfolio"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Portfolio Items List */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Image className="h-5 w-5" />
              Portfolio Items ({portfolioItems.length})
            </h2>
            {portfolioItems.length === 0 ? (
              <Card className="p-8 text-center text-muted-foreground">
                No portfolio items yet. Add your first item!
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {portfolioItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden group">
                    <div className="aspect-video relative">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
