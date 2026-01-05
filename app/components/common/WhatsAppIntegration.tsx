"use client";

import { useState } from "react";
import Icon from "@/components/common/ui/AppIcon";

interface WhatsAppIntegrationProps {
  phoneNumber?: string;
  variant?: "floating" | "inline" | "button";
  message?: string;
  className?: string;
}

const WhatsAppIntegration = ({
  phoneNumber = "+1234567890",
  variant = "floating",
  message = "Hola Giovanna, tengo una pregunta sobre la celebración...",
  className = "",
}: WhatsAppIntegrationProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const messageTemplates = [
    {
      id: "directions",
      label: "📍 Pedir Direcciones",
      text: "Hola Giovanna, ¿me puedes compartir las direcciones exactas del lugar?",
    },
    {
      id: "questions",
      label: "❓ Hacer Pregunta",
      text: "Hola Giovanna, tengo una pregunta sobre la celebración...",
    },
    {
      id: "share",
      label: "🎉 Compartir Emoción",
      text: "¡Hola Giovanna! Estoy muy emocionado/a por tu celebración de 50 años. ¡Nos vemos pronto!",
    },
  ];

  const openWhatsApp = (customMessage?: string) => {
    const encodedMessage = encodeURIComponent(customMessage || message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsExpanded(false);
  };

  if (variant === "floating") {
    return (
      <div className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-[100]">
        {isExpanded && (
          <div className="mb-4 bg-card rounded-lg shadow-celebration p-4 w-72 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-cta text-sm font-semibold text-foreground">
                Contactar por WhatsApp
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
            <div className="space-y-2">
              {messageTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => openWhatsApp(template.text)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-muted hover:bg-primary/10 transition-all duration-200 text-sm font-body text-foreground hover:text-primary"
                >
                  {template.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-countdown hover:scale-110 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.5)]"
          aria-label="Abrir WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </button>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        {messageTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => openWhatsApp(template.text)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-cta font-semibold rounded-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 shadow-celebration"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="hidden sm:inline">{template.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => openWhatsApp()}
      className={`flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-cta font-semibold rounded-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 shadow-celebration ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      Contactar por WhatsApp
    </button>
  );
};

export default WhatsAppIntegration;
