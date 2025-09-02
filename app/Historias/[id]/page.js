"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Smile, ArrowLeft, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { historiasService } from "@/lib/historias";
import Link from "next/link";

export default function HistoriaIndividualPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [historias, setHistorias] = useState([]);
  const [historia, setHistoria] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadHistorias = async () => {
    try {
      setLoading(true);
      const data = await historiasService.getAll();
      setHistorias(data);

      setHistoria(data.find((h) => h.id == id));
    } catch (error) {
      toast("No se pudieron cargar las historias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistorias();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section Skeleton */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-10 w-32 mb-6" />
              <div className="text-center">
                <Skeleton className="h-12 md:h-16 w-full mb-4" />
                <Skeleton className="h-6 w-64 mx-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Story Content Skeleton */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Story Skeleton */}
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <Skeleton className="w-8 h-8 rounded mr-3" />
                        <div>
                          <Skeleton className="h-6 w-32 mb-2" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Skeleton */}
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-48 mb-4" />
                      <div className="space-y-3">
                        <div>
                          <Skeleton className="h-3 w-24 mb-1" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                        <div>
                          <Skeleton className="h-3 w-16 mb-1" />
                          <Skeleton className="h-4 w-28" />
                        </div>
                        <div>
                          <Skeleton className="h-3 w-20 mb-1" />
                          <Skeleton className="h-4 w-36" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-20 mb-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <Skeleton className="w-12 h-12 rounded mx-auto mb-4" />
                      <Skeleton className="h-5 w-40 mx-auto mb-2" />
                      <Skeleton className="h-3 w-full mb-4" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Stories Skeleton */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-8 w-64 mb-8 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="aspect-video w-full" />
                    <CardContent className="p-4">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-20 mb-3" />
                      <Skeleton className="h-4 w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!historia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Historia no encontrada
          </h1>
          <Button onClick={() => router.push("/historias")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Historias
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Button
              onClick={() => router.push("/historias")}
              variant="ghost"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Historias
            </Button>

            <div className="text-center">
              <h1 className="text-4xl uppercase md:text-6xl font-black text-primary mb-4">
                Historia de <br />
                <span className="text-accent ">{historia.nombre}</span>
              </h1>
              <span> {historia.edad && `Edad ${historia.edad}`}</span>

              <p className="text-lg text-muted-foreground">
                • Una historia de transformación y esperanza
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main Story */}
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={historia.imagen}
                      alt={historia.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Smile className="w-8 h-8 text-accent mr-3" />
                      <div>
                        <h2 className="text-2xl font-bold text-primary">
                          {historia.nombre}
                        </h2>
                        <p className="text-muted-foreground">{historia.edad}</p>
                      </div>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {historia.historia}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar with Details */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-primary mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Detalles del Tratamiento
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Fecha de Cirugía
                        </p>
                        <p className="font-medium">{historia.fechaCirugia}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Doctor</p>
                        <p className="font-medium">{historia.doctor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Seguimiento
                        </p>
                        <p className="font-medium">{historia.seguimiento}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-primary mb-4 flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      Impacto
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Esta historia representa una de las más de 11,000 sonrisas
                      que hemos devuelto gracias al apoyo de donantes y
                      voluntarios como tú.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6 text-center">
                    <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-primary mb-2">
                      Ayúdanos a Crear Más Historias
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Tu donación puede cambiar la vida de otro niño
                    </p>
                    <Link href="/Donar">
                      <Button className="w-full">Hacer una Donación</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Otras Historias de Esperanza
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {historias
                .filter((h) => h.id !== historia.id)
                .slice(0, 2)
                .map((otraHistoria) => (
                  <motion.div
                    key={otraHistoria.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={otraHistoria.imagen}
                          alt={otraHistoria.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-primary mb-2">
                          {otraHistoria.nombre}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {otraHistoria.edad}
                        </p>
                        <motion.a
                          href={`/historias/${otraHistoria.id}`}
                          className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors text-sm"
                          whileHover={{ x: 5 }}
                        >
                          Leer historia →
                        </motion.a>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
