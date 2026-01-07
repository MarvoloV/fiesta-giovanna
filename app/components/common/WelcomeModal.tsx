"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/common/ui/AppIcon";

interface WelcomeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const WelcomeModal = ({ isOpen = true, onClose }: WelcomeModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    }
  }, [isOpen]);

  const handleClose = (enableMusic: boolean) => {
    setShowModal(false);

    if (enableMusic) {
      const musicEvent = new CustomEvent("enableMusic", {
        detail: { enabled: true },
      });
      window.dispatchEvent(musicEvent);
    }

    if (onClose) {
      onClose();
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-background p-4 animate-in fade-in duration-500">
      <div className="relative max-w-2xl w-full bg-card rounded-lg shadow-celebration p-8 md:p-12 animate-in zoom-in duration-500">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-countdown">
          <Icon
            name="SparklesIcon"
            size={32}
            className="text-primary-foreground"
            variant="solid"
          />
        </div>

        {/* Content */}
        <div className="text-center space-y-6 mt-4">
          <h1 className="font-script text-5xl md:text-7xl text-primary animate-in slide-in-from-top duration-700">
            ¡Estás Invitado!
          </h1>

          <div className="space-y-2">
            <h2 className="font-headline text-3xl md:text-4xl text-foreground animate-in slide-in-from-bottom duration-700 delay-100"></h2>
            <p className="font-body text-lg md:text-xl text-muted-foreground animate-in slide-in-from-bottom duration-700 delay-200">
              A celebrar mis 50 años
            </p>
          </div>

          <div className="border-t border-b border-border py-6 my-6 animate-in fade-in duration-700 delay-300">
            <p className="font-body text-base md:text-lg text-foreground leading-relaxed">
              Te invito a compartir conmigo esta noche especial llena de
              alegría, música y buenos momentos. Tu presencia hará esta
              celebración aún más memorable.
            </p>
          </div>

          {/* Music CTA */}
          <div className="bg-muted rounded-lg p-6 animate-in slide-in-from-bottom duration-700 delay-400">
            <div className="flex justify-center">
              <button
                onClick={() => handleClose(true)}
                className="px-10 py-4 text-lg md:text-xl bg-primary text-primary-foreground font-cta font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-celebration"
              >
                Ver invitación
              </button>
            </div>
          </div>

          {/* Decorative Footer */}
          <div className="flex items-center justify-center gap-2 text-primary animate-in fade-in duration-700 delay-500">
            <Icon name="HeartIcon" size={20} variant="solid" />
            <span className="font-script text-lg">Con cariño</span>
            <Icon name="HeartIcon" size={20} variant="solid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
