import { SocialLinks } from "@/components/SocialLinks";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Creative Partner
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Bringing your vision to life through innovative design and strategic digital marketing
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-soft"
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </header>

      {/* Social Links */}
      <SocialLinks />

      {/* About Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate creative professional specializing in graphic design and digital marketing.
                With years of experience helping brands tell their stories visually and grow their online presence,
                I bring dedication and creativity to every project.
              </p>
              <p>
                My approach combines artistic vision with strategic thinking, ensuring that every design not only
                looks amazing but also serves your business goals. Whether you need a stunning brand identity or
                a comprehensive digital marketing strategy, I'm here to help you succeed.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                  Graphic Design
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                  Digital Marketing
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                  Brand Strategy
                </div>
                <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                  Social Media
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div id="services">
        <ServiceCard />
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Get In Touch</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:hello@example.com" className="hover:text-primary transition-colors">
                    hello@example.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                <a href="https://tiktok.com/@yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  TikTok
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  WhatsApp
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Instagram
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
