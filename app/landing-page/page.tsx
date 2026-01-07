import type { Metadata } from "next";
import LandingPageInteractive from "./components/LandingPageInteractive";

export const metadata: Metadata = {
  title: "🎊 Celebración 50 Años - Giovanna Huarancca 🎊",
  description:
    "Te invito a celebrar mis 50 años de vida. Sábado 17 de enero de 2026 a las 9:00 PM en Caserio San Martin Av Grau D17. Confirma tu asistencia y únete a esta noche especial llena de alegría, música y buenos momentos.",
};

export default function LandingPage() {
  return <LandingPageInteractive />;
}
