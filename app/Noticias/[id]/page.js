"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Share2, Heart, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getNoticiaById } from "@/lib/BlogNoticia";

export default function NoticiaDetalle() {
  const params = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarNoticia = async () => {
      try {
        const noticiaData = await getNoticiaById(params.id);
        setNoticia(noticiaData);
      } catch (error) {
        console.error("Error cargando noticia:", error);
        setNoticia(null);
      } finally {
        setLoading(false);
      }
    };

    cargarNoticia();
  }, [params.id]);

  const formatContent = (content) => {
    return content.split("\n").map((paragraph, index) => {
      if (paragraph.trim() === "") return null;

      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h3
            key={index}
            className="text-xl font-bold text-foreground mt-6 mb-3"
          >
            {paragraph.slice(2, -2)}
          </h3>
        );
      }

      if (paragraph.startsWith("- ")) {
        return (
          <li key={index} className="text-muted-foreground mb-2 ml-4">
            {paragraph.slice(2)}
          </li>
        );
      }

      return (
        <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando noticia...</p>
        </div>
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Noticia no encontrada
          </h1>
          <p className="text-muted-foreground mb-6">
            La noticia que buscas no existe o ha sido eliminada.
          </p>
          <Link href="/Noticias">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a noticias
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/5 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/Noticias">
            <Button
              variant="outline"
              className="mb-6 bg-transparent border-border text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a noticias
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <article>
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="w-4 h-4" />
              {noticia?.fechaCreacion?.toDate().toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium ml-4">
                Noticia
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {noticia?.titulo}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={noticia?.imagen || "/placeholder.svg"}
              alt={noticia?.titulo}
              className="w-full h-64 md:h-96 object-cover rounded-xl border border-border"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: noticia?.contenido }} />
          </div>

          {/* Call to Action */}
          <Card className="mt-12 border-border">
            <CardContent className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  ¿Te inspiró esta noticia?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Únete a nosotros y sé parte del cambio que queremos ver en
                  nuestra comunidad
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Heart className="w-4 h-4 mr-2" />
                    Hacer una donación
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Ser voluntario
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
