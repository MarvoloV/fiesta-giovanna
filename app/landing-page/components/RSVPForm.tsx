"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/common/ui/AppIcon";

interface FormData {
  name: string;
  attendance: "yes" | "no" | "";
  guestCount: number;
  dietaryPreferences: string;
  attendees: Array<{ fullName: string; dni: string }>;
}

type FormErrors = Partial<Omit<FormData, "attendees">> & {
  attendees?: string;
};

const RSVPForm = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    attendance: "",
    guestCount: 1,
    dietaryPreferences: "",
    attendees: [{ fullName: "", dni: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (formData.attendance !== "yes") {
      return;
    }

    setFormData((prev) => {
      const nextAttendees = [...prev.attendees];
      if (nextAttendees.length < prev.guestCount) {
        const toAdd = prev.guestCount - nextAttendees.length;
        for (let i = 0; i < toAdd; i += 1) {
          nextAttendees.push({ fullName: "", dni: "" });
        }
      } else if (nextAttendees.length > prev.guestCount) {
        nextAttendees.length = prev.guestCount;
      }

      return { ...prev, attendees: nextAttendees };
    });
  }, [formData.attendance, formData.guestCount]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre";
    }

    if (!formData.attendance) {
      newErrors.attendance = "Por favor selecciona una opción";
    }

    if (formData.attendance === "yes") {
      const hasMissingAttendee = formData.attendees.some(
        (attendee) => !attendee.fullName.trim() || !attendee.dni.trim(),
      );
      if (hasMissingAttendee) {
        newErrors.attendees = "Completa nombre y DNI de cada asistente";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const attendanceText =
      formData.attendance === "yes"
        ? `Asistencia: Si (personas: ${formData.guestCount})`
        : "Asistencia: No";
    const attendeesText =
      formData.attendance === "yes"
        ? `\nAsistentes:\n${formData.attendees
            .map(
              (attendee, index) =>
                `${index + 1}. ${attendee.fullName.trim()} - DNI ${attendee.dni.trim()}`,
            )
            .join("\n")}`
        : "";

    const message = encodeURIComponent(
      `Hola Giovanna, quiero confirmar mi asistencia a tu celebración de 50 años.\n\nNombre: ${formData.name.trim()}\n${attendanceText}${attendeesText}\n`,
    );

    window.open(`https://wa.me/+51975791455?text=${message}`, "_blank");
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAttendeeChange = (
    index: number,
    field: "fullName" | "dni",
    value: string,
  ) => {
    setFormData((prev) => {
      const nextAttendees = [...prev.attendees];
      nextAttendees[index] = { ...nextAttendees[index], [field]: value };
      return { ...prev, attendees: nextAttendees };
    });
    if (errors.attendees) {
      setErrors((prev) => ({ ...prev, attendees: undefined }));
    }
  };

  if (!isHydrated) {
    return (
      <section
        id="confirmar"
        className="py-16 px-4 bg-gradient-to-b from-background to-muted"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-card rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-card rounded-lg max-w-sm mx-auto animate-pulse" />
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-celebration">
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-muted rounded-lg animate-pulse"
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
      id="confirmar"
      className="py-16 px-4 bg-gradient-to-b from-background to-muted"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon
              name="CheckCircleIcon"
              size={32}
              className="text-primary"
              variant="solid"
            />
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-foreground">
              Confirma tu Asistencia
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Por favor completa este formulario para confirmar tu presencia
          </p>
        </div>

        {/* RSVP Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-celebration"
        >
          {/* Name Input */}

          {/* Attendance Selection */}
          <div className="mb-6">
            <label className="block font-cta  uppercase tracking-wider  mb-3 text-white text-2xl text-center">
              ¿Podrás Asistir?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange("attendance", "yes")}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.attendance === "yes"
                    ? "border-primary bg-primary/10 shadow-celebration"
                    : "border-border bg-muted hover:border-primary/50"
                }`}
              >
                <Icon
                  name="CheckCircleIcon"
                  size={32}
                  className={`mx-auto mb-2 ${formData.attendance === "yes" ? "text-primary" : "text-muted-foreground"}`}
                  variant={formData.attendance === "yes" ? "solid" : "outline"}
                />
                <p className="font-cta text-foreground">
                  Asistiré con mucho gusto
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange("attendance", "no")}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.attendance === "no"
                    ? "border-destructive bg-destructive/10 shadow-celebration"
                    : "border-border bg-muted hover:border-destructive/50"
                }`}
              >
                <Icon
                  name="XCircleIcon"
                  size={32}
                  className={`mx-auto mb-2 ${formData.attendance === "no" ? "text-destructive" : "text-muted-foreground"}`}
                  variant={formData.attendance === "no" ? "solid" : "outline"}
                />
                <p className="font-cta text-foreground">No podré asistir</p>
              </button>
            </div>
            {errors.attendance && (
              <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} />
                {errors.attendance}
              </p>
            )}
          </div>

          {/* Guest Count (only if attending) */}
          {formData.attendance === "yes" && (
            <div className="mb-6 animate-in slide-in-from-top duration-300">
              <label
                htmlFor="guestCount"
                className="block font-cta text-sm uppercase tracking-wider text-muted-foreground mb-2"
              >
                ¿Cuántas personas asistirán?
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange(
                      "guestCount",
                      Math.max(1, formData.guestCount - 1),
                    )
                  }
                  className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                  disabled={formData.guestCount <= 1}
                >
                  <Icon
                    name="MinusIcon"
                    size={20}
                    className="text-foreground"
                  />
                </button>
                <div className="flex-1 text-center">
                  <div className="text-4xl font-headline text-primary">
                    {formData.guestCount}
                  </div>
                  <div className="text-sm font-body text-muted-foreground">
                    {formData.guestCount === 1 ? "persona" : "personas"}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange(
                      "guestCount",
                      Math.min(10, formData.guestCount + 1),
                    )
                  }
                  className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                  disabled={formData.guestCount >= 10}
                >
                  <Icon name="PlusIcon" size={20} className="text-foreground" />
                </button>
              </div>
            </div>
          )}

          {/* Attendees Details (only if attending) */}
          {formData.attendance === "yes" && (
            <div className="mb-6 space-y-4 animate-in slide-in-from-top duration-300">
              {formData.attendees.map((attendee, index) => (
                <div
                  key={`attendee-${index}`}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label
                      htmlFor={`attendee-name-${index}`}
                      className="block font-cta text-sm uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      Nombre asistente {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`attendee-name-${index}`}
                      value={attendee.fullName}
                      onChange={(e) =>
                        handleAttendeeChange(index, "fullName", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-muted border-2 border-border rounded-lg font-body text-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`attendee-dni-${index}`}
                      className="block font-cta text-sm uppercase tracking-wider text-muted-foreground mb-2"
                    >
                      DNI asistente {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`attendee-dni-${index}`}
                      value={attendee.dni}
                      onChange={(e) =>
                        handleAttendeeChange(index, "dni", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-muted border-2 border-border rounded-lg font-body text-foreground focus:border-primary focus:outline-none transition-colors"
                      placeholder="DNI"
                    />
                  </div>
                </div>
              ))}
              {errors.attendees && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <Icon name="ExclamationCircleIcon" size={16} />
                  {errors.attendees}
                </p>
              )}
            </div>
          )}

          {/* Dietary Preferences (optional) */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-primary-foreground font-cta font-bold text-lg rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-countdown disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Icon name="ArrowPathIcon" size={24} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Icon name="PaperAirplaneIcon" size={24} variant="solid" />
                Confirmar Asistencia
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;
