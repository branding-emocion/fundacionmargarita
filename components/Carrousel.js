"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";

function BannerSkeleton() {
  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-cyan-100 to-pink-100 rounded-2xl overflow-hidden animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 px-8">
          <div className="h-8 bg-cyan-200 rounded-lg w-3/4 mx-auto"></div>
          <div className="h-4 bg-cyan-200 rounded w-full"></div>
          <div className="h-4 bg-cyan-200 rounded w-2/3 mx-auto"></div>
          <div className="flex gap-4 justify-center mt-6">
            <div className="h-12 bg-pink-200 rounded-lg w-32"></div>
            <div className="h-12 bg-cyan-200 rounded-lg w-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BannerCarousel({ banners = [], isLoading = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const activeBanners = banners.filter((banner) => banner.isActive);

  useEffect(() => {
    if (!isAutoPlaying || activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeBanners.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeBanners.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  if (isLoading) {
    return <BannerSkeleton />;
  }

  if (activeBanners.length === 0) {
    return (
      <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-cyan-100 to-pink-100 rounded-2xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-cyan-600">
          <Heart className="w-16 h-16 mx-auto mb-4 text-pink-400" />
          <h2 className="text-2xl font-bold mb-2">¡Próximamente!</h2>
          <p className="text-lg">
            Estamos preparando contenido especial para ti
          </p>
        </div>
      </div>
    );
  }

  const currentBanner = activeBanners[currentIndex];

  return (
    <div
      className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-cyan-100 to-pink-100 rounded-2xl overflow-hidden shadow-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Imagen de fondo */}
      {currentBanner.imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentBanner.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-pink-900/50"></div>
        </div>
      )}

      {/* Contenido del banner */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl text-white">
            {currentBanner.title && (
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-balance leading-tight">
                {currentBanner.title}
              </h1>
            )}

            {currentBanner.description && (
              <p className="text-lg md:text-xl mb-8 text-pretty leading-relaxed opacity-95">
                {currentBanner.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/donar">
                <Button
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Donar Ahora
                </Button>
              </Link>

              {currentBanner.linkUrl && (
                <Link href={currentBanner.linkUrl}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                  >
                    Más Información
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      {activeBanners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Indicadores */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
