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
} from "lucide-react";

export default function HomePage() {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
                Donde nace tu <span className="text-accent">felicidad</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Devolvemos sonrisas a niños con labio fisurado y paladar
                hendido. Más de 11,000 cirugías realizadas con amor y
                dedicación.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-primary hover:bg-primary/90"
                >
                  <Link href="/Donar">
                    <Heart className="w-5 h-5 mr-2" />
                    Donar Ahora
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/nosotros">
                    Conoce Nuestra Historia
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/niño.jpg"
                  alt="Niño sonriendo después de cirugía"
                  className="w-full max-h-[700px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              {/* Floating emoji */}
              <motion.div
                className="absolute -top-4 -right-4 text-6xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                😊
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

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
                src="/placeholder.svg?height=400&width=500"
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
            {[
              {
                name: "María, 8 años",
                story:
                  "Después de su cirugía, María puede sonreír con confianza y ha mejorado su autoestima significativamente.",
                image: "young girl smiling confidently after cleft lip surgery",
              },
              {
                name: "Carlos, 12 años",
                story:
                  "La cirugía de paladar hendido le permitió a Carlos hablar claramente por primera vez en su vida.",
                image: "boy speaking clearly after cleft palate surgery",
              },
              {
                name: "Ana, 6 años",
                story:
                  "Con su nueva sonrisa, Ana ahora participa activamente en actividades escolares y sociales.",
                image:
                  "little girl participating in school activities, happy and confident",
              },
            ].map((story, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=300&query=${story.image}`}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-2">
                      {story.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {story.story}
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
              <Link href="/historias">
                Ver Todas las Historias
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
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
                <Link href="/contacto">Ser Voluntario</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
