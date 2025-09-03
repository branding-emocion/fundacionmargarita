"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ExternalLink,
  Play,
} from "lucide-react";
import Link from "next/link";

function BannerSkeleton() {
  return (
    <div className="relative w-full h-[80vh] bg-gradient-to-br from-cyan-100 to-pink-100 overflow-hidden animate-pulse">
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
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const activeBanners = banners.filter((banner) => banner.isActive);

  useEffect(() => {
    if (currentIndex >= activeBanners.length && activeBanners.length > 0) {
      setCurrentIndex(0);
    }
  }, [activeBanners, currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying || activeBanners.length <= 1) return;

    const currentBanner = activeBanners[currentIndex];

    if (currentBanner?.mediaType === "video") {
      return; // Don't set interval for videos
    }

    // Only set autoplay interval for images (5 seconds)
    const autoplayInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);

    return () => clearInterval(autoplayInterval);
  }, [isAutoPlaying, activeBanners, currentIndex]);

  useEffect(() => {
    setIsVideoPlaying(false);
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeBanners.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    return (
      videoExtensions.some((ext) => url.toLowerCase().includes(ext)) ||
      url.includes("youtube.com") ||
      url.includes("youtu.be")
    );
  };

  const getMediaUrl = (banner) => {
    if (!banner) return null;
    if (banner.mediaType === "video") {
      return banner.videoUrl || banner.imageUrl;
    }
    return banner.imageUrl;
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getYouTubeEmbedUrl = (videoId) => {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 1000);
  };

  if (isLoading) {
    return <BannerSkeleton />;
  }

  if (activeBanners.length === 0) {
    return (
      <div className="relative w-full h-[80vh] bg-gradient-to-br from-cyan-100 to-pink-100 overflow-hidden flex items-center justify-center">
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
  if (!currentBanner) {
    return <BannerSkeleton />;
  }

  const mediaUrl = getMediaUrl(currentBanner);

  return (
    <div
      className="relative w-full h-[80vh] bg-gradient-to-br from-cyan-100 to-pink-100 overflow-hidden shadow-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {currentBanner.mediaType === "video" && mediaUrl ? (
        <div className="absolute inset-0">
          {mediaUrl.includes("youtube") || mediaUrl.includes("youtu.be") ? (
            <iframe
              className="w-full h-full object-cover"
              src={getYouTubeEmbedUrl(getYouTubeVideoId(mediaUrl))}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={() => {
                console.log("[v0] YouTube iframe loaded");
                setIsVideoPlaying(true);
              }}
            />
          ) : isVideoUrl(mediaUrl) ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop={false}
              playsInline
              onPlay={handleVideoPlay}
              onEnded={handleVideoEnded}
              onLoadStart={() => console.log("[v0] Video loading started")}
              onCanPlay={() => console.log("[v0] Video can play")}
              onError={(e) => console.log("[v0] Video error:", e)}
            >
              <source src={mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${mediaUrl})` }}
            >
              <div className="bg-black/50 rounded-full p-4">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-pink-900/50"></div>
        </div>
      ) : mediaUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mediaUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-pink-900/50"></div>
        </div>
      ) : null}

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl text-white">
            {currentBanner.mediaType === "video" && (
              <div className="flex items-center gap-2 mb-2 text-pink-300">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Video</span>
              </div>
            )}

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

      {activeBanners.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
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
