"use client";

import { useState, useEffect } from "react";
import Icon from "../../components/common/ui/AppIcon";

const ProhibidoSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const rules = [
    {
      icon: "FaceFrownIcon",
      title: "Prohibido NO Divertirse",
      description:
        "Esta noche es para celebrar y disfrutar al máximo. ¡Las caras largas quedan en casa!",
      emoji: "🎉",
    },
    {
      icon: "BeakerIcon",
      title: "Prohibido Traer Cerveza",
      description: "La cerveza habra aqui. No traigas de fuera.",
      emoji: "",
    },
    {
      icon: "ClockIcon",
      title: "Prohibido Llegar Tarde",
      description:
        "La fiesta empieza a las 9:00 PM en punto. ¡No te pierdas ni un momento de diversión!",
      emoji: "⏰",
    },
    {
      icon: "MusicalNoteIcon",
      title: "Prohibido NO Bailar",
      description:
        "Habrá música toda la noche. Prepara tus mejores pasos de baile.",
      emoji: "💃",
    },
  ];

  if (!isHydrated) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-card rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-card rounded-lg max-w-sm mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="h-32 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4 px-6 py-3 bg-destructive/10 rounded-full">
            <Icon
              name="NoSymbolIcon"
              size={32}
              className="text-destructive"
              variant="solid"
            />
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-destructive">
              ¡Prohibido!
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Reglas importantes para esta celebración especial
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {rules.map((rule, index) => (
            <div
              key={rule.title}
              className="group bg-card rounded-xl p-6 md:p-8 shadow-celebration hover:shadow-countdown transition-all duration-300 hover:scale-105 animate-in zoom-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                  <Icon
                    name={rule.icon as any}
                    size={32}
                    className="text-destructive"
                    variant="solid"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-cta text-xl text-foreground font-semibold">
                      {rule.title}
                    </h3>
                    <span className="text-2xl">{rule.emoji}</span>
                  </div>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun Message */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-primary/10 rounded-2xl p-8 max-w-2xl">
            <Icon
              name="FaceSmileIcon"
              size={48}
              className="text-primary mx-auto mb-4"
              variant="solid"
            />
            <p className="font-script text-2xl md:text-3xl text-primary mb-2">
              Recuerda...
            </p>
            <p className="font-body text-lg text-foreground">
              Esta es una noche para crear recuerdos inolvidables. ¡Ven con toda
              la energía y las ganas de celebrar mis 50 años de vida!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProhibidoSection;
