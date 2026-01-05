"use client";

import { useState, useEffect } from "react";

interface SectionAnchorNavProps {
  isOpen?: boolean;
}

const SectionAnchorNav = ({ isOpen = false }: SectionAnchorNavProps) => {
  const [activeSection, setActiveSection] = useState<string>("celebracion");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sections = [
    { id: "celebracion", label: "Celebración", icon: "SparklesIcon" },
    { id: "detalles", label: "Detalles", icon: "CalendarIcon" },
    { id: "confirmar", label: "Confirmar", icon: "CheckCircleIcon" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("celebracion");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 0);
      }

      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile: Dot Navigation */}
      <nav className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-card shadow-celebration rounded-full px-6 py-3 flex items-center gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-primary scale-125"
                : "bg-muted hover:bg-primary/50"
            }`}
            aria-label={section.label}
          />
        ))}
      </nav>

      {/* Desktop: Labeled Navigation */}
      <nav className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-10 z-[100] flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center gap-3 transition-all duration-300 ${
              activeSection === section.id
                ? "opacity-100"
                : "opacity-60 hover:opacity-100"
            }`}
            aria-label={section.label}
          >
            <span
              className={`text-sm font-cta transition-all duration-300 ${
                activeSection === section.id
                  ? "text-primary translate-x-0 opacity-100"
                  : "text-foreground translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-primary scale-125 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  : "bg-muted group-hover:bg-primary/50"
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  );
};

export default SectionAnchorNav;
