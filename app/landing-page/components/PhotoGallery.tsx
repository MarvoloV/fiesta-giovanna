"use client";

import { useState, useEffect } from "react";
import AppImage from "@/components/common/ui/AppImage";
import Icon from "@/components/common/ui/AppIcon";

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const PhotoGallery = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const photos: Photo[] = [
    {
      id: 1,
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_1596bff3e-1763297438325.png",
      alt: "Mujer hispana de mediana edad sonriendo en celebración familiar con decoraciones festivas de fondo",
      caption: "Celebraciones familiares llenas de amor",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1597992619310-838ebc5cc6ab",
      alt: "Grupo de amigos y familiares brindando con copas en fiesta nocturna con luces cálidas",
      caption: "Momentos especiales con amigos",
    },
    {
      id: 3,
      src: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb7551b-1763293899118.png",
      alt: "Mujer latina elegante con vestido dorado sonriendo en evento festivo con decoración brillante",
      caption: "Noches de alegría y música",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1575400002558-d0163016985f",
      alt: "Familia multigeneracional reunida alrededor de mesa con pastel de cumpleaños iluminado con velas",
      caption: "Tradiciones que nos unen",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1731596152912-249a2511f966",
      alt: "Personas bailando en fiesta con luces de colores y ambiente festivo nocturno",
      caption: "Bailando hasta el amanecer",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1731848357870-323465735036",
      alt: "Multitud de personas con manos levantadas en celebración con confeti dorado cayendo",
      caption: "Celebrando la vida juntos",
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-card rounded-lg animate-pulse"
              />
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
              name="PhotoIcon"
              size={32}
              className="text-primary"
              variant="solid"
            />
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-foreground">
              Recuerdos Especiales
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground">
            Momentos que han marcado mi vida
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer animate-in zoom-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <AppImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="font-body text-sm text-foreground">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-[200] bg-background/95 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Cerrar"
            >
              <Icon name="XMarkIcon" size={24} className="text-foreground" />
            </button>
            <div className="max-w-4xl w-full">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <AppImage
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center font-body text-lg text-foreground">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        )}

        {/* Decorative Element */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-primary">
            <Icon name="CameraIcon" size={20} variant="solid" />
            <span className="font-script text-lg">
              Creando nuevos recuerdos juntos
            </span>
            <Icon name="CameraIcon" size={20} variant="solid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
