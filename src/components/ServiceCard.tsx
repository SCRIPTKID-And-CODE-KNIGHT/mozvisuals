import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingDialog } from "./BookingDialog";
import { Megaphone, Sparkles, FileText, Monitor } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string;
}

const services: Service[] = [
  {
    id: "advertising-marketing",
    title: "Advertising & Marketing Design",
    description: "Compelling designs that drive results",
    icon: Megaphone,
    details: "Strategic advertising and marketing design solutions including campaign materials, promotional graphics, and eye-catching advertisements that capture attention and convert.",
  },
  {
    id: "branding-identity",
    title: "Branding & Identity Design",
    description: "Build a memorable brand identity",
    icon: Sparkles,
    details: "Complete branding and identity design services including logos, brand guidelines, color palettes, typography, and cohesive visual identity systems that make your brand unforgettable.",
  },
  {
    id: "print-publication",
    title: "Print & Publication Design",
    description: "Professional print materials that impress",
    icon: FileText,
    details: "High-quality print and publication design including brochures, magazines, catalogs, business cards, flyers, and other printed materials with attention to detail and print specifications.",
  },
  {
    id: "digital-web",
    title: "Digital & Web Graphics",
    description: "Modern digital designs for online presence",
    icon: Monitor,
    details: "Contemporary digital and web graphics including website visuals, social media content, digital banners, email templates, and all your online design needs optimized for digital platforms.",
  },
];

export const ServiceCard = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState("");

  const handleBookNow = (service: Service) => {
    setBookingService(service.title);
    setBookingOpen(true);
  };

  return (
    <>
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Book a Service</h2>
            <p className="text-muted-foreground">Choose the service you need</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedService === service.id;
              
              return (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-soft ${
                    isSelected ? "ring-2 ring-primary shadow-soft" : ""
                  }`}
                  onClick={() => setSelectedService(isSelected ? null : service.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  
                  {isSelected && (
                    <CardContent className="animate-fade-in">
                      <p className="text-sm text-muted-foreground mb-4">
                        {service.details}
                      </p>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookNow(service);
                        }}
                        className="w-full bg-gradient-accent hover:opacity-90"
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <BookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        serviceName={bookingService}
      />
    </>
  );
};
