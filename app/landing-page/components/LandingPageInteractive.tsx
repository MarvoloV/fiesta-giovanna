"use client";

import { useState, useRef } from "react";
import HeroSection from "./HeroSection";
import CountdownTimer from "./CountdownTimer";
import EventDetails from "./EventDetails";
import ProhibidoSection from "./ProhibidoSection";
import PhotoGallery from "./PhotoGallery";
import RSVPForm from "./RSVPForm";
import TestimonialsSection from "./TestimonialsSection";
import WelcomeModal from "@/components/common/WelcomeModal";
import SectionAnchorNav from "@/components/common/SectionAnchorNav";
import WhatsAppIntegration from "@/components/common/WhatsAppIntegration";
import MusicControls from "@/components/common/MusicControls";

const LandingPageInteractive = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const rsvpRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const offset = 80;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />

      {/* Music Controls */}
      <MusicControls />

      {/* Section Anchor Navigation */}
      <SectionAnchorNav />

      {/* WhatsApp Integration */}
      <WhatsAppIntegration phoneNumber="+51975791455" variant="floating" />

      {/* Main Content */}
      <main className="min-h-screen">
        <HeroSection
          onScrollToRSVP={() => scrollToSection(rsvpRef)}
          onScrollToDetails={() => scrollToSection(detailsRef)}
        />

        <CountdownTimer />

        <div ref={detailsRef}>
          <EventDetails />
        </div>

        <ProhibidoSection />

        <div ref={rsvpRef}>
          <RSVPForm />
        </div>
      </main>
    </>
  );
};

export default LandingPageInteractive;
