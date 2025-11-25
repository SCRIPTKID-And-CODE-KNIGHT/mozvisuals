import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Facebook } from "lucide-react";

const socialLinks = [
  {
    name: "TikTok",
    url: "https://tiktok.com/@/moz_visuals_",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/255755974083",
    icon: MessageCircle,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/moz_visuals_",
    icon: Instagram,
  },
  {
    name: "Facebook",
    url: "https://facebook.com/moz visuals",
    icon: Facebook,
  },
];

export const SocialLinks = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8">Connect With Me</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col gap-2 transition-all hover:shadow-soft hover:scale-105 hover:border-primary"
                >
                  <Icon className="transition-transform group-hover:scale-110" />
                  <span className="text-sm font-medium">{social.name}</span>
                </Button>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
