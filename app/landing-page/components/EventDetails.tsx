"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/common/ui/AppIcon";

const EventDetails = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const details = [
    {
      icon: "CalendarDaysIcon",
      label: "Fecha",
      value: "Sábado, 17 de Enero de 2026",
      color: "text-primary",
    },
    {
      icon: "ClockIcon",
      label: "Hora",
      value: "9:00 PM",
      color: "text-accent",
    },
    {
      icon: "MapPinIcon",
      label: "Lugar",
      value: "Caserio San Martin Av Grau D17",
      color: "text-secondary",
    },
    {
      icon: "HomeIcon",
      label: "Referencia",
      value: "A 3 cuadras de la comisaría Pueblo Joven",
      color: "text-success",
    },
    {
      icon: "MusicalNoteIcon",
      label: "Música en Vivo",
      value: "Orquesta Max vega 💃🕺",
      color: "text-primary",
    },
  ];

  if (!isHydrated) {
    return (
      <section
        id="detalles"
        className="py-16 px-4 bg-gradient-to-b from-muted to-background"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-card rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-card rounded-lg max-w-sm mx-auto animate-pulse" />
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-celebration">
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-muted rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="detalles"
      className="py-16 px-4 bg-gradient-to-b from-muted to-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon
              name="InformationCircleIcon"
              size={32}
              className="text-primary"
              variant="solid"
            />
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-foreground">
              Detalles del Evento
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Toda la información que necesitas saber
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-celebration hover:shadow-countdown transition-all duration-300">
          <div className="space-y-6">
            {details.map((detail, index) => (
              <div
                key={detail.label}
                className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-300 animate-in slide-in-from-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center ${detail.color}`}
                >
                  <Icon name={detail.icon as any} size={24} variant="solid" />
                </div>
                <div className="flex-1">
                  <h3 className="font-cta text-sm uppercase tracking-wider text-muted-foreground mb-1">
                    {detail.label}
                  </h3>
                  <p className="font-body text-lg md:text-xl text-foreground">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="mt-8 rounded-lg overflow-hidden border-2 border-border">
            <div className="w-full h-64 md:h-80">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Caserio San Martin Av Grau D17"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=-14.042450,-75.736400&z=14&output=embed"
                className="border-0"
              />
            </div>
          </div>

          {/* WhatsApp Directions Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                const message = encodeURIComponent(
                  "Hola Giovanna, ¿me puedes compartir las direcciones exactas del lugar?",
                );
                window.open(
                  `https://wa.me/+51975791455?text=${message}`,
                  "_blank",
                );
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-cta font-semibold rounded-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 shadow-celebration"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Pedir Direcciones
            </button>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-primary">
            <Icon name="MapPinIcon" size={20} variant="solid" />
            <span className="font-script text-lg">
              Te esperamos en Cacerio San Martín
            </span>
            <Icon name="MapPinIcon" size={20} variant="solid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
