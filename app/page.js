"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Heart,
  Users,
  Award,
  Handshake,
  ArrowRight,
  Smile,
  Newspaper,
  BookOpen,
  Calendar,
  Clock,
} from "lucide-react";
import { useBanners } from "@/hooks/useBanners";
import { BannerCarousel } from "@/components/Carrousel";
import { useEffect, useState } from "react";
import { getBlogs, getNoticias } from "@/lib/BlogNoticia";
import { useAllianceStore } from "@/lib/alliance-store";
import { historiasService } from "@/lib/historias";

export default function HomePage() {
  const [noticias, setNoticias] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    alliances,
    fetchAlliances,
    loading: alliancesLoading,
  } = useAllianceStore();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [noticiasData, blogsData, historiasData] = await Promise.all([
          getNoticias(),
          getBlogs(),
          historiasService.getAll(),
          fetchAlliances(),
        ]);

        setNoticias(noticiasData.slice(0, 3));
        setBlogs(blogsData.slice(0, 3));
        setHistorias(historiasData.slice(0, 3));
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [fetchAlliances]);
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const { banners, isLoading } = useBanners();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BannerCarousel banners={banners} isLoading={isLoading} />

      {/* Quick Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { number: "11,000+", label: "Cirugías Realizadas", icon: Smile },
              { number: "9", label: "Años de Experiencia", icon: Award },
              { number: "100+", label: "Voluntarios Médicos", icon: Users },
              {
                number: "15+",
                label: "Alianzas Estratégicas",
                icon: Handshake,
              },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/Nosotros.jpg"
                alt="Dr. Walter Zegarra Carranza"
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">
                Conoce Nuestra Historia
              </h2>
              <p className="text-muted-foreground mb-6">
                Fundada en 2015 por el Dr. Walter Zegarra Carranza, conocido
                como el "Apóstol de la Sonrisa", nuestra fundación nació del
                amor y dedicación hacia los niños con labio fisurado y paladar
                hendido.
              </p>
              <p className="text-muted-foreground mb-8">
                Nombrada en honor a su querida madre Margarita, quien le inculcó
                el ejemplo de solidaridad y servicio a los más necesitados.
              </p>
              <Button asChild>
                <Link href="/nosotros">
                  Leer Historia Completa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stories Preview */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Historias que Inspiran
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada sonrisa cuenta una historia de esperanza, transformación y
              nuevas oportunidades.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {historias?.map((story, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`${story.imagen}`}
                      alt={`${story.nombre}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-2">
                      {story.nombre}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {story.resumen}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button asChild variant="outline">
              <Link href="/Historias">
                Ver Todas las Historias
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Falta la seccion de alianzas  */}

      {/* Alianzas Section */}
      <section className="py-16 bg-gradient-to-br from-secondary/5 to-primary/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Handshake className="w-8 h-8 text-primary" />
              Nuestras Alianzas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trabajamos junto a organizaciones comprometidas con el cambio
              social y el desarrollo comunitario
            </p>
          </div>

          {alliancesLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : alliances.length === 0 ? (
            <div className="text-center py-12">
              <Handshake className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
                Próximamente nuestras alianzas
              </h3>
              <p className="text-muted-foreground">
                Estamos trabajando en establecer alianzas estratégicas para
                ampliar nuestro impacto
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {alliances.slice(0, 3).map((alianza) => (
                <Card
                  key={alianza.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-card/50 backdrop-blur-sm border-primary/10"
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                    {alianza.logo ? (
                      <img
                        src={alianza.logo || "/placeholder.svg"}
                        alt={`Logo ${alianza.nombre}`}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Handshake className="w-16 h-16 text-primary/50" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {alianza.nombre}
                    </h3>
                    {alianza.tipo && (
                      <div className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium mb-3">
                        {alianza.tipo}
                      </div>
                    )}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {alianza.descripcion}
                    </p>
                    {alianza.link && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                        asChild
                      >
                        <a
                          href={alianza.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visitar sitio web
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-card/50 backdrop-blur-sm"
            >
              <Link href="/alianzas">
                Ver todas las alianzas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Misión</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Tu donación puede cambiar la vida de un niño. Ayúdanos a seguir
              devolviendo sonrisas y creando historias de esperanza.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/Donar">
                  <Heart className="w-5 h-5 mr-2" />
                  Hacer Donación
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/Contacto">Ser Voluntario</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Newspaper className="w-8 h-8 text-primary" />
              Últimas Noticias
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mantente informado sobre nuestras actividades más recientes y el
              impacto en la comunidad
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {noticias.map((noticia) => (
                <Card
                  key={noticia.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={noticia.imagen || ""}
                      alt={noticia.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {noticia.titulo}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {noticia.contenido
                        ?.replace(/<[^>]*>/g, "")
                        .substring(0, 120)}
                      ...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(noticia.fechaCreacion)}
                      </div>
                      <Link href={`/Noticias/${noticia.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:text-primary-foreground hover:bg-primary"
                        >
                          Leer más
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/noticias">
                Ver todas las noticias
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              Últimos Artículos del Blog
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reflexiones, historias inspiradoras y perspectivas sobre el
              desarrollo social y comunitario
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Card
                  key={blog.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.imagen || ""}
                      alt={blog.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.titulo}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {blog.contenido
                        ?.replace(/<[^>]*>/g, "")
                        .substring(0, 120)}
                      ...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDate(blog.fechaCreacion)}
                      </div>
                      <Link href={`/Blog/${blog.id}`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary hover:text-primary-foreground hover:bg-primary"
                        >
                          Leer más
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                Ver todos los artículos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
