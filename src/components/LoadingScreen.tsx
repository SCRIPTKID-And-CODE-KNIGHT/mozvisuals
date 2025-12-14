import { useState, useEffect } from "react";
import profileImage from "@/assets/profile.jpeg";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onLoadingComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-8">
        <div className="absolute inset-0 rounded-full bg-accent/50 blur-xl animate-pulse" />
        <div className="absolute inset-0 rounded-full bg-primary/30 blur-md" />
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
          <img
            src={profileImage}
            alt="MPZ Visuals"
            className="w-full h-full object-cover object-top animate-scale-in"
          />
        </div>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-foreground animate-fade-in">
        MOZ VISUALS
      </h1>
      <div className="mt-8 w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-[loading_2s_ease-in-out]" />
      </div>
    </div>
  );
};

export default LoadingScreen;
