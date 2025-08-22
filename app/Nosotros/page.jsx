"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users, Target } from "lucide-react";

export default function NosotrosPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const directivos = [
    { nombre: "Walter Zegarra Carranza", cargo: "Presidente de Directorio" },
    { nombre: "Walter Frank Zegarra Ávila", cargo: "Primer Vicepresidente" },
    { nombre: "Antonio Walter Zegarra Ávila", cargo: "Segundo Vicepresidente" },
    { nombre: "Gisela Lucía Zegarra Ávila", cargo: "Secretaria de Directorio" },
    {
      nombre: "Walter Fernando Zegarra Ávila",
      cargo: "Tesorero de Directorio",
    },
    { nombre: "Andrés Javier Zegarra Zavaleta", cargo: "Gerente General" },
  ];

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
              Nuestra Historia
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Conoce la historia de amor, dedicación y servicio que dio origen a
              la Fundación Margarita
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fundador Section */}
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
                src="/placeholder.svg?height=500&width=400"
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
                El Apóstol de la Sonrisa
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  El doctor Walter Zegarra Carranza, con su entrega, dedicación
                  y pasión por los pacientes fisurados, viajó hasta México en
                  los años 90, a estudiar la especialidad de cirugía plástica,
                  donde tuvo la oportunidad de conocer a una eminencia mundial
                  como fue Dr. Fernando Ortiz Monasterio, quien fuera su mentor
                  en cirugía reconstructiva labio palatina.
                </p>
                <p>
                  Años más tarde, recibe la invitación para pertenecer a la
                  Asociación Internacional del Club de Leones y sugiere crear un
                  programa para atender a estos pacientes conjuntamente con los
                  leones llamado "PROLAPAR" Programa de Labio y Paladar.
                </p>
                <p>
                  En la actualidad las intervenciones quirúrgicas suman más de
                  once mil, por lo que quienes conocen de su labor altruista, la
                  consideran como el "Apóstol de la Sonrisa", por los años de
                  trayectoria que viene devolviendo sonrisas a miles de niños
                  fisurados en el Perú.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historia de la Fundación */}
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
              Historia de la Fundación
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-muted-foreground"
            >
              <p>
                La Fundación Margarita, fue nombrada por el Dr. Walter Zegarra
                Carranza en honor al memorable recuerdo de su querida madre
                MARGARITA, quién le inculco el ejemplo de solidaridad y servicio
                a los más necesitados.
              </p>
              <p>
                La fundación nació el 04 de agosto del 2015, con el fin de
                ayudar a personas de escasos o nulos recursos económicos, a
                través de la cirugía reconstructiva así mismo el Dr. Walter
                Zegarra Carranza fundador y director de la fundación tuvo la
                gran iniciativa de emprender este noble proyecto, visualizando
                la necesidad de desarrollar técnicas y tratamientos de cirugía
                plástica para apoyar a los niños de labio fisurado y paladar
                hendido.
              </p>
              <p>
                A partir del 2019 la Fundación establece convenios con Smile
                Train, la Clínica Zegarra, el Arzobispado de Trujillo, el
                Hospital Belén de Trujillo y la Universidad Católica en favor de
                los niños con labio fisurado.
              </p>
              <p>
                Actualmente la fundación sigue trabajando en conjunto con sus
                aliados estratégicos para brindarles la mejor atención y siempre
                buscando VERLOS SONREIR.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filosofía */}
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
              Nuestra Filosofía
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Card className="text-center p-6 h-full">
                <CardContent className="p-0">
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Misión
                  </h3>
                  <p className="text-muted-foreground">
                    Brindar y facilitar intervenciones quirúrgicas y
                    rehabilitación, a pacientes con Labio y Paladar Hendido de
                    escasos recursos económicos, para mejorar la salud y
                    condición de vida a través del apoyo de profesionales
                    calificados.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center p-6 h-full">
                <CardContent className="p-0">
                  <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Visión
                  </h3>
                  <p className="text-muted-foreground">
                    Convertirnos en una institución líder, en brindar la
                    atención oportuna y de calidad en el tratamiento y
                    rehabilitación de pacientes con Labio y Paladar Fisurado, y
                    así poder contribuir en la mejora de la salud y condición
                    humana.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center p-6 h-full">
                <CardContent className="p-0">
                  <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-4">
                    Valores
                  </h3>
                  <p className="text-muted-foreground">
                    Solidaridad, servicio, excelencia médica, compromiso social
                    y dedicación hacia los más necesitados. Trabajamos con amor
                    y profesionalismo para devolver sonrisas y esperanza.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Directivos */}
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
              Nuestro Directorio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conoce al equipo directivo que lidera nuestra misión de devolver
              sonrisas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directivos.map((directivo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <CardContent className="p-0">
                    <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-primary mb-2">
                      {directivo.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {directivo.cargo}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
