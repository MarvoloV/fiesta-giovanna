"use client";

import { useState, useEffect } from "react";
import AppImage from "@/components/common/ui/AppImage";
import Icon from "@/components/common/ui/AppIcon";

interface Testimonial {
  id: number;
  name: string;
  relationship: string;
  message: string;
  image: string;
  alt: string;
}

const TestimonialsSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "María Elena",
      relationship: "Hermana",
      message:
        "Giovanna siempre ha sido el alma de nuestra familia. Su alegría y amor incondicional nos une a todos. ¡Celebrar sus 50 años será inolvidable!",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_10ef23bd0-1763294379900.png",
      alt: "Mujer hispana de mediana edad con cabello castaño sonriendo cálidamente en ambiente familiar",
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      relationship: "Amigo de toda la vida",
      message:
        "Conocer a Giovanna ha sido una bendición. Su generosidad y espíritu festivo hacen que cada momento sea especial. ¡Que vengan 50 años más!",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_19c22d09a-1763296451658.png",
      alt: "Hombre latino de mediana edad con camisa casual sonriendo en exterior con luz natural",
    },
    {
      id: 3,
      name: "Rosa Huarancca",
      relationship: "Prima",
      message:
        "Giovanna es más que una prima, es mi confidente y mejor amiga. Su corazón enorme y su risa contagiosa iluminan cada reunión familiar.",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1beb7551b-1763293899118.png",
      alt: "Mujer latina sonriente con vestido elegante en celebración familiar con decoración festiva",
    },
  ];

  if (!isHydrated) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-muted to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-card rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-card rounded-lg max-w-sm mx-auto animate-pulse" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-muted to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon
              name="ChatBubbleLeftRightIcon"
              size={32}
              className="text-primary"
              variant="solid"
            />
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-foreground">
              Lo Que Dicen de Mí
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Palabras de amor de mi familia y amigos
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-xl p-6 shadow-celebration hover:shadow-countdown transition-all duration-300 hover:scale-105 animate-in zoom-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Icon
                  name="ChatBubbleBottomCenterTextIcon"
                  size={32}
                  className="text-primary"
                  variant="solid"
                />
              </div>

              {/* Message */}
              <p className="font-body text-foreground leading-relaxed mb-6">
                "{testimonial.message}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={testimonial.image}
                    alt={testimonial.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-cta text-foreground font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonial.relationship}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Attendance Counter */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-primary/10 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Icon
                name="UserGroupIcon"
                size={32}
                className="text-primary"
                variant="solid"
              />
              <div className="text-5xl font-headline text-primary">47</div>
            </div>
            <p className="font-body text-lg text-foreground">
              personas han confirmado su asistencia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
