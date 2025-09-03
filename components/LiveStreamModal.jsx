"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLiveStream } from "@/hooks/useLiveStream";

export default function LiveStreamModal() {
  const { getStreamToShow, closeModal, isModalOpen, openModal } =
    useLiveStream();
  const [currentStream, setCurrentStream] = useState(null);

  useEffect(() => {
    const checkForActiveStream = () => {
      const streamToShow = getStreamToShow();

      console.log("streamToShow", streamToShow);

      if (streamToShow && !isModalOpen) {
        setCurrentStream(streamToShow);
        openModal();
      }
    };

    checkForActiveStream();
    const interval = setInterval(checkForActiveStream, 30000);

    return () => clearInterval(interval);
  }, [getStreamToShow, openModal, isModalOpen]);

  const handleClose = () => {
    closeModal();
    setCurrentStream(null);
  };

  const handleWatchNow = () => {
    if (currentStream?.url) {
      window.open(currentStream.url, "_blank");
    }
    handleClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!currentStream || !isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <DialogTitle className="text-lg font-bold">
                ¡Directo en Vivo!
              </DialogTitle>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              EN VIVO
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Banner Image */}
          {currentStream.bannerImage && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentStream.bannerImage || "/placeholder.svg"}
                alt={currentStream.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl mb-1">
                  {currentStream.title}
                </h3>
              </div>
            </div>
          )}

          {/* Stream Info */}
          <div className="space-y-3">
            {!currentStream.bannerImage && (
              <h3 className="font-bold text-xl text-foreground">
                {currentStream.title}
              </h3>
            )}

            {/* Timing Info */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Fecha activa: {formatDate(currentStream.activeDate)}</span>
            </div>

            {/* Description */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                🎥 No te pierdas este directo exclusivo. ¡Únete ahora y
                participa en tiempo real!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleWatchNow}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver Ahora
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="px-6 bg-transparent"
            >
              <X className="w-4 h-4 mr-2" />
              Cerrar
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Este modal se muestra automáticamente cuando hay un directo activo
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
