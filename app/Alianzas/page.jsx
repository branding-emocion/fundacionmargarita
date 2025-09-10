"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, Heart, Sparkles } from "lucide-react";
import { useAllianceStore } from "@/lib/alliance-store";

export default function AlianzasPage() {
  const { alliances, fetchAlliances, loading, error } = useAllianceStore();

  useEffect(() => {
    fetchAlliances();
  }, [fetchAlliances]);

  if (loading && alliances.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando alianzas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">
            Error al cargar las alianzas: {error}
          </p>
          <Button onClick={() => fetchAlliances()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="relative bg-gradient-to-r from-[#25adee] via-blue-700 to-[#f10783] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">Desde 2015</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 uppercase">
              Nuestras <span className="text-pink-200">Alianzas</span>
            </h1>

            <div className="flex items-center justify-center gap-2 text-pink-200">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-medium">
                ✨ Trabajamos en conjunto con organizaciones, instituciones y
                profesionales comprometidos con nuestra misión de devolver
                sonrisas. 💝
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Alliances Grid */}
        {alliances.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">
              No hay alianzas disponibles
            </h3>
            <p className="text-muted-foreground">
              Próximamente estaremos agregando nuestras alianzas estratégicas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alliances.map((alliance) => (
              <Card
                key={alliance.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {alliance.logo && (
                        <img
                          src={alliance.logo || " "}
                          alt={`Logo ${alliance.nombre}`}
                          className="aspect-video object-cover mb-4 rounded"
                        />
                      )}
                      <CardTitle className="text-lg">
                        {alliance.nombre}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {alliance.tipo}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {alliance.descripcion}
                  </p>
                  {alliance.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      asChild
                    >
                      <a
                        href={alliance.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visitar Sitio Web
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
