"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/common/ui/AppIcon";

interface HeroSectionProps {
  onScrollToRSVP: () => void;
  onScrollToDetails: () => void;
}

const HeroSection = ({
  onScrollToRSVP,
  onScrollToDetails,
}: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section
        id="celebracion"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#2C1810] to-background"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-8 animate-pulse">
            <div className="h-24 bg-muted rounded-lg mb-4" />
            <div className="h-32 bg-muted rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="celebracion"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-[#2C1810] to-background"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Decorative Top Element */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
          <Icon
            name="SparklesIcon"
            size={32}
            className="text-primary"
            variant="solid"
          />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
        </div>

        {/* Main Headline */}
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          ¡VEN A CELEBRAR
          <br />
          <span className="text-primary">MIS 50 AÑOS!</span>
        </h1>

        {/* Name in Script Font */}
        <div className="mb-8 animate-in fade-in zoom-in duration-700 delay-200">
          <p className="font-script text-6x sm:text-7xl md:text-8xl lg:text-9xl text-primary mb-2 drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            Giovanna Huarancca
          </p>
        </div>

        {/* Subtitle */}
        <p className="font-body text-lg sm:text-xl md:text-2xl text-foreground mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          Te invito a compartir conmigo esta noche especial llena de alegría,
          música y buenos momentos
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom duration-700 delay-400">
          <button
            onClick={onScrollToDetails}
            className="px-8 py-4 bg-secondary text-secondary-foreground font-cta font-semibold text-lg rounded-lg hover:bg-secondary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Icon name="InformationCircleIcon" size={24} variant="solid" />
            Ver Detalles
          </button>
        </div>

        {/* Decorative Bottom Element */}
        <div className="flex items-center justify-center gap-2 text-primary animate-in fade-in duration-700 delay-500">
          <Icon name="HeartIcon" size={20} variant="solid" />
          <span className="font-script text-lg">17 de Enero, 2026</span>
          <Icon name="HeartIcon" size={20} variant="solid" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDownIcon" size={32} className="text-primary" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
