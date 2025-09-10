"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  ArrowRight,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { NoticiasSkeleton } from "@/components/NoticiasBlog";
import { getNoticias } from "@/lib/BlogNoticia";

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNoticias = async () => {
      try {
        setLoading(true);
        const noticiasData = await getNoticias();
        setNoticias(noticiasData);
      } catch (error) {
        console.error("Error cargando noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNoticias();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
              Noticias y<span className="text-pink-200">Actualidad</span>
            </h1>

            <div className="flex items-center justify-center gap-2 text-pink-200">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-medium">
                ✨ Mantente informado sobre nuestras últimas actividades, logros
                y el impacto que estamos generando en las comunidades que
                servimos. 💝
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>
      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <NoticiasSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia) => (
                <Card
                  key={noticia.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={noticia.imagen || "/placeholder.svg"}
                      alt={noticia.titulo}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {noticia.categoria}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-balance">
                      {noticia.titulo}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-pretty">
                      {noticia.contenido}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(noticia.fechaPublicacion)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{noticia.autor}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group bg-transparent"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Únete a Nuestra Misión
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
            Tu apoyo hace posible que sigamos transformando vidas y construyendo
            un futuro mejor para las familias más vulnerables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="group">
              <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Hacer una Donación
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 group"
            >
              <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Ser Voluntario
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
