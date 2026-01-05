"use client";

import { useState, useEffect } from "react";
import Icon from "../../components/common/ui/AppIcon";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendanceConfirmed: boolean;
}

const SuccessModal = ({
  isOpen,
  onClose,
  attendanceConfirmed,
}: SuccessModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isOpen || !isHydrated) return null;

  const handleDownloadCalendar = () => {
    const event = {
      title: "Celebración 50 Años - Giovanna",
      description: "Celebración del 50 aniversario de Giovanna Huarancca",
      location: "Caserio San Martin Av Grau D17",
      start: "20260117T190000",
      end: "20260118T020000",
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "celebracion-giovanna.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      "¡Acabo de confirmar mi asistencia a la celebración de 50 años de Giovanna! 🎉\n\nFecha: Sábado, 17 de Enero de 2026\nHora: 9:00 PM\nLugar: Caserio San Martin Av Grau D17\n\n¡Nos vemos allí!",
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-background/95 p-4 animate-in fade-in duration-500">
      <div className="relative max-w-2xl w-full bg-card rounded-2xl shadow-celebration p-8 md:p-12 animate-in zoom-in duration-500">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors"
          aria-label="Cerrar"
        >
          <Icon name="XMarkIcon" size={20} className="text-foreground" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-in zoom-in duration-700">
            <Icon
              name={attendanceConfirmed ? "CheckCircleIcon" : "HeartIcon"}
              size={48}
              className="text-primary"
              variant="solid"
            />
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-4">
            {attendanceConfirmed
              ? "¡Confirmación Recibida!"
              : "¡Gracias por Responder!"}
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            {attendanceConfirmed
              ? "Tu asistencia ha sido confirmada exitosamente. ¡Estamos emocionados de celebrar juntos!"
              : "Lamentamos que no puedas asistir. ¡Esperamos verte en la próxima celebración!"}
          </p>
        </div>

        {attendanceConfirmed && (
          <>
            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <button
                onClick={handleDownloadCalendar}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-cta font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-celebration"
              >
                <Icon name="CalendarDaysIcon" size={24} variant="solid" />
                Agregar al Calendario
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white font-cta font-semibold rounded-lg hover:bg-[#20BA5A] transition-all duration-300 hover:scale-105 shadow-celebration"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Compartir con Amigos
              </button>
            </div>

            {/* Party Preparation Tips */}
            <div className="bg-muted rounded-lg p-6">
              <h3 className="font-cta text-lg text-foreground mb-4 flex items-center gap-2">
                <Icon
                  name="LightBulbIcon"
                  size={20}
                  className="text-primary"
                  variant="solid"
                />
                Consejos para la Celebración
              </h3>
              <ul className="space-y-2 font-body text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckIcon"
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span>
                    Llega puntual a las 9:00 PM para no perderte ningún momento
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckIcon"
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span>
                    Trae tu mejor energía y ganas de bailar toda la noche
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckIcon"
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span>Recuerda: tu presencia es el mejor regalo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon
                    name="CheckIcon"
                    size={16}
                    className="text-primary mt-1 flex-shrink-0"
                  />
                  <span>
                    Contacta por WhatsApp si necesitas direcciones o tienes
                    preguntas
                  </span>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Decorative Element */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-primary">
            <Icon name="HeartIcon" size={20} variant="solid" />
            <span className="font-script text-lg">¡Gracias!</span>
            <Icon name="HeartIcon" size={20} variant="solid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
