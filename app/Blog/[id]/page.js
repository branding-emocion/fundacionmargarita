"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Share2,
  User,
  Clock,
  BookOpen,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBlogById } from "@/lib/BlogNoticia";

export default function BlogDetalle() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarBlog = async () => {
      try {
        const blogData = await getBlogById(params.id);
        setBlog(blogData);
      } catch (error) {
        console.error("Error cargando blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    cargarBlog();
  }, [params.id]);

  const formatContent = (content) => {
    return content.split("\n").map((paragraph, index) => {
      if (paragraph.trim() === "") return null;

      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <h3
            key={index}
            className="text-xl font-bold text-foreground mt-8 mb-4"
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
        <p
          key={index}
          className="text-muted-foreground mb-6 leading-relaxed text-lg"
        >
          {paragraph}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-muted-foreground mb-6">
            El artículo que buscas no existe o ha sido eliminado.
          </p>
          <Link href="/Blog">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary/10 to-primary/5 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/Blog">
            <Button
              variant="outline"
              className="mb-6 bg-transparent border-border text-foreground hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <article>
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {blog?.fechaCreacion?.toDate().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {blog?.autor || "Equipo de la Fundación"}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {blog?.tiempoLectura || "5 min"}
              </div>
              <span className="bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium">
                Blog
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              {blog?.titulo}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <Button
                size="sm"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={blog?.imagen || "/placeholder.svg"}
              alt={blog?.titulo}
              className="w-full h-64 md:h-96 object-cover rounded-xl border border-border"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog?.contenido }} />
          </div>

          {/* Author Info */}
          <Card className="mt-12 border-border">
            <CardContent className="p-6 bg-card">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">
                    Escrito por {blog?.autor || "Equipo de la Fundación"}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Miembro del equipo de la fundación comprometido con el
                    desarrollo social y comunitario.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Subscription */}
          <Card className="mt-8 border-border">
            <CardContent className="p-8 bg-gradient-to-r from-secondary/10 to-primary/10">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  ¿Te gustó este artículo?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Suscríbete a nuestro blog para recibir más reflexiones y
                  actualizaciones sobre nuestro trabajo
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="flex-1 px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6">
                    <Heart className="w-4 h-4 mr-2" />
                    Suscribirse
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
