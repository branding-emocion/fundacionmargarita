"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ArrowRight,
  BookOpen,
  User,
  Clock,
  Loader2,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { getBlogs } from "@/lib/BlogNoticia";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const blogsData = await getBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error cargando blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const getExcerpt = (contenido, maxLength = 180) => {
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
          <p className="text-muted-foreground">
            Cargando artículos del blog...
          </p>
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
              Blog de Nuestra y<span className="text-pink-200">Fundación</span>
            </h1>

            <div className="flex items-center justify-center gap-2 text-pink-200">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-medium">
                ✨ Compartimos reflexiones, experiencias y aprendizajes sobre
                nuestro trabajo en el desarrollo social y comunitario 💝
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>

      {/* Blog Articles */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Próximamente
            </h3>
            <p className="text-muted-foreground">
              Estamos preparando artículos inspiradores para compartir nuestras
              experiencias contigo
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Últimos Artículos
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
            </div>

            {/* Featured Article */}
            {blogs.length > 0 && (
              <Card className="mb-12 border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={
                        blogs[0].imagen ||
                        "/placeholder.svg?height=400&width=600&query=blog-fundacion"
                      }
                      alt={blogs[0].titulo}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 bg-card">
                    <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(blogs[0].createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Fundación
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />5 min
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Artículo Destacado
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4 line-clamp-2">
                      {blogs[0].titulo}
                    </h3>

                    <p className="text-muted-foreground mb-6 line-clamp-4">
                      {getExcerpt(blogs[0].contenido, 250)}
                    </p>

                    <Link href={`/Blog/${blogs[0].id}`}>
                      <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        Leer artículo completo
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Other Articles Grid */}
            {blogs.length > 1 && (
              <div className="grid md:grid-cols-2 gap-8">
                {blogs.slice(1).map((blog) => (
                  <Card
                    key={blog.id}
                    className="group border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          blog.imagen ||
                          "/placeholder.svg?height=300&width=400&query=blog-fundacion"
                        }
                        alt={blog.titulo}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-secondary/90 text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Blog
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-6 bg-card">
                      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />5 min
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                        {blog.titulo}
                      </h3>

                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <User className="w-4 h-4" />
                        Por Fundación
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {getExcerpt(blog.contenido)}
                      </p>

                      <Link href={`/Blog/${blog.id}`}>
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-all duration-300 bg-transparent"
                        >
                          Leer más
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Newsletter Subscription */}
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
