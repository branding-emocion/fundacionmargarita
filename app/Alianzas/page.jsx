"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft } from "lucide-react";
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
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-8 left-8 text-6xl">🤝</div>
          <div className="absolute top-12 right-12 text-4xl">✨</div>
          <div className="absolute bottom-8 left-1/4 text-5xl">💫</div>
          <div className="absolute bottom-12 right-1/3 text-4xl">🌟</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
              Nuestras <span className="text-accent">Alianzas</span> 🤝
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              ✨ Trabajamos en conjunto con organizaciones, instituciones y
              profesionales comprometidos con nuestra misión de devolver
              sonrisas. 💝
            </p>
          </motion.div>
        </div>
      </section>
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
