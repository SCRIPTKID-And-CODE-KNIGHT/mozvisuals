import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom" | "fade";
  delay?: number;
  duration?: number;
}

export const ScrollReveal = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 600,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animations = {
    "fade-up": "translate-y-10 opacity-0",
    "fade-down": "-translate-y-10 opacity-0",
    "fade-left": "translate-x-10 opacity-0",
    "fade-right": "-translate-x-10 opacity-0",
    "zoom": "scale-95 opacity-0",
    "fade": "opacity-0",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        !isVisible && animations[animation],
        isVisible && "translate-x-0 translate-y-0 scale-100 opacity-100",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
