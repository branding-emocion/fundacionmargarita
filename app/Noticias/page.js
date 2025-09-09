"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Heart, Users, Loader2 } from "lucide-react";
import Link from "next/link";
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

  const getExcerpt = (contenido, maxLength = 150) => {
    if (contenido.length <= maxLength) return contenido;
    return contenido.substring(0, maxLength) + "...";
  };

  const formatDate = (date) => {
    if (!date) return "Fecha no disponible";
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Cargando noticias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Mantente informado
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Noticias de Nuestra Fundación
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Descubre las últimas novedades, logros y actividades que estamos
            realizando para transformar vidas en nuestra comunidad
          </p>
        </div>
      </div>

      {/* Noticias Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {noticias.length === 0 ? (
          <div className="text-center py-16">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Próximamente
            </h3>
            <p className="text-muted-foreground">
              Estamos preparando noticias emocionantes para compartir contigo
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Últimas Noticias
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {noticias.map((noticia, index) => (
                <Card
                  key={noticia.id}
                  className="group border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={noticia.imagen || "/placeholder.svg"}
                      alt={noticia.titulo}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Noticia
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6 bg-card">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {formatDate(noticia.createdAt)}
                    </div>

                    <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {noticia.titulo}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {getExcerpt(noticia.contenido)}
                    </p>

                    <Link href={`/Noticias/${noticia.id}`}>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 bg-transparent"
                      >
                        Leer más
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  ¿Quieres ser parte del cambio?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Únete a nuestra comunidad de voluntarios y donantes. Juntos
                  podemos crear un impacto positivo y duradero en la vida de
                  muchas personas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/Donar">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground hover:cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Hacer una donación
                    </Button>
                  </Link>
                  <Link href="/Contacto">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent hover:cursor-pointer"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Ser voluntario
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
