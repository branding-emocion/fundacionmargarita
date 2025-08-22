"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Smile } from "lucide-react";

export default function HistoriasPage() {
  const historias = [
    {
      nombre: "María Elena",
      edad: "8 años",
      historia:
        "María nació con labio fisurado bilateral. Después de dos cirugías realizadas por nuestro equipo médico, ahora puede sonreír con confianza y ha mejorado significativamente su autoestima. Sus padres nos cuentan que ahora participa activamente en las actividades escolares.",
      imagen:
        "young girl with beautiful smile after cleft lip surgery, confident and happy",
    },
    {
      nombre: "Carlos Andrés",
      edad: "12 años",
      historia:
        "Carlos tenía paladar hendido que le impedía hablar claramente. Gracias a la cirugía reconstructiva y terapia de lenguaje, ahora puede comunicarse sin problemas. Su sueño es ser maestro y ayudar a otros niños como él.",
      imagen: "boy speaking clearly and confidently after cleft palate surgery",
    },
    {
      nombre: "Ana Sofía",
      edad: "6 años",
      historia:
        "Ana llegó a nosotros muy tímida debido a su condición. Después del tratamiento integral que incluye cirugía, terapia psicológica y seguimiento, ahora es una niña extrovertida que disfruta cantando y bailando.",
      imagen: "little girl singing and dancing happily after treatment",
    },
    {
      nombre: "Diego",
      edad: "10 años",
      historia:
        "Diego y su familia viajaron desde una zona rural muy alejada. La cirugía cambió completamente su vida. Ahora puede comer sin dificultades y su rendimiento escolar ha mejorado notablemente.",
      imagen: "boy from rural area smiling after successful surgery",
    },
    {
      nombre: "Valentina",
      edad: "4 años",
      historia:
        "Valentina es la paciente más pequeña que hemos atendido este año. Su cirugía fue un éxito total y ahora puede alimentarse normalmente. Sus padres están muy agradecidos por la nueva oportunidad de vida que le hemos dado.",
      imagen: "very young girl eating happily after cleft surgery",
    },
    {
      nombre: "Sebastián",
      edad: "14 años",
      historia:
        "Sebastián llegó a nosotros en su adolescencia, una etapa difícil para cualquier joven. Después del tratamiento, no solo mejoró físicamente sino que también ganó confianza en sí mismo. Ahora es líder en su colegio.",
      imagen: "teenage boy showing leadership and confidence after treatment",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
              Historias de <span className="text-accent">Vida</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Cada sonrisa cuenta una historia de esperanza, transformación y
              nuevas oportunidades. Conoce las historias reales de los niños que
              hemos ayudado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Más de 11,000 Sonrisas Devueltas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cada cirugía representa una nueva oportunidad, una nueva esperanza
              y una nueva sonrisa. Estas son algunas de las historias que nos
              motivan a seguir adelante cada día.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historias Grid */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {historias.map((historia, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=500&query=${historia.imagen}`}
                      alt={historia.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Smile className="w-6 h-6 text-accent mr-2" />
                      <div>
                        <h3 className="font-bold text-primary text-lg">
                          {historia.nombre}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {historia.edad}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {historia.historia}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios de Padres */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Testimonios de Familias
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Las palabras de agradecimiento de las familias son nuestro mayor
              reconocimiento
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                testimonio:
                  "Gracias a la Fundación Margarita, mi hija puede sonreír sin complejos. El Dr. Zegarra y su equipo son ángeles en la tierra.",
                padre: "Rosa María, madre de Ana Sofía",
              },
              {
                testimonio:
                  "No tengo palabras para agradecer todo lo que han hecho por mi hijo. Ahora puede hablar claramente y es un niño feliz.",
                padre: "Juan Carlos, padre de Diego",
              },
              {
                testimonio:
                  "La atención fue excepcional desde el primer día. Nos trataron como familia y nos dieron esperanza cuando más la necesitábamos.",
                padre: "María Elena, madre de Valentina",
              },
            ].map((testimonio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <CardContent className="p-0">
                    <div className="text-4xl text-primary mb-4">"</div>
                    <p className="text-muted-foreground mb-4 italic">
                      {testimonio.testimonio}
                    </p>
                    <p className="font-semibold text-primary">
                      — {testimonio.padre}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold mb-4">
              Ayúdanos a Crear Más Historias
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Cada donación nos permite escribir una nueva historia de
              esperanza. Únete a nuestra misión de devolver sonrisas.
            </p>
            <motion.a
              href="/Donar"
              className="inline-flex items-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5 mr-2" />
              Hacer una Donación
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
