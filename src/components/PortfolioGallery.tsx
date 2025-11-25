import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Brand Campaign Design",
    category: "Advertising & Marketing Design",
    description: "Complete advertising campaign with eye-catching visuals and compelling messaging that drove 150% engagement increase.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    tags: ["Campaign", "Social Media", "Print"],
  },
  {
    id: "2",
    title: "Corporate Logo & Identity",
    category: "Branding & Identity Design",
    description: "Modern, minimalist brand identity system including logo, color palette, and brand guidelines for tech startup.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop",
    tags: ["Logo", "Branding", "Identity"],
  },
  {
    id: "3",
    title: "Magazine Layout Design",
    category: "Print & Publication Design",
    description: "Editorial design for lifestyle magazine featuring dynamic layouts and typography that enhance readability.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
    tags: ["Magazine", "Editorial", "Layout"],
  },
  {
    id: "4",
    title: "Website Graphics Package",
    category: "Digital & Web Graphics",
    description: "Comprehensive web graphics set including hero images, icons, and UI elements for e-commerce platform.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["Web Design", "UI/UX", "Digital"],
  },
  {
    id: "5",
    title: "Product Launch Campaign",
    category: "Advertising & Marketing Design",
    description: "Multi-channel marketing materials for product launch including billboards, digital ads, and social media content.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=600&fit=crop",
    tags: ["Product Launch", "Marketing", "Multi-channel"],
  },
  {
    id: "6",
    title: "Restaurant Brand Identity",
    category: "Branding & Identity Design",
    description: "Complete brand identity for upscale restaurant including menu design, signage, and packaging materials.",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop",
    tags: ["Restaurant", "Menu", "Packaging"],
  },
  {
    id: "7",
    title: "Annual Report Design",
    category: "Print & Publication Design",
    description: "Professional annual report with data visualization, infographics, and clean typography for corporate client.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    tags: ["Annual Report", "Corporate", "Data Viz"],
  },
  {
    id: "8",
    title: "Social Media Content Pack",
    category: "Digital & Web Graphics",
    description: "Cohesive social media graphics package with templates, stories, and post designs for 30-day campaign.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
    tags: ["Social Media", "Templates", "Content"],
  },
];

const categories = [
  "All",
  "Advertising & Marketing Design",
  "Branding & Identity Design",
  "Print & Publication Design",
  "Digital & Web Graphics",
];

export const PortfolioGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Portfolio</h2>
            <p className="text-muted-foreground">Explore my creative work across different categories</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer overflow-hidden hover:shadow-soft transition-all hover-scale"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {item.category}
                  </Badge>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No portfolio items found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Item Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant="secondary" className="mt-2">
                    {selectedItem.category}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-muted-foreground">{selectedItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
