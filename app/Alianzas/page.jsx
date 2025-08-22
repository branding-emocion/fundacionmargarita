"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, Building, Heart, Users, Award, Globe } from "lucide-react";

export default function AlianzasPage() {
  const alianzas = [
    {
      nombre: "Smile Train",
      tipo: "Organización Internacional",
      descripcion:
        "Organización mundial líder en tratamiento de labio fisurado y paladar hendido",
      icono: Globe,
    },
    {
      nombre: "Clínica Zegarra",
      tipo: "Centro Médico",
      descripcion:
        "Centro médico especializado en cirugía plástica reconstructiva",
      icono: Building,
    },
    {
      nombre: "Arzobispado de Trujillo",
      tipo: "Institución Religiosa",
      descripcion:
        "Apoyo espiritual y logístico para nuestras campañas médicas",
      icono: Heart,
    },
    {
      nombre: "Hospital Belén de Trujillo",
      tipo: "Hospital Público",
      descripcion: "Facilidades hospitalarias para cirugías y recuperación",
      icono: Building,
    },
    {
      nombre: "Universidad Católica",
      tipo: "Institución Educativa",
      descripcion: "Formación de profesionales y apoyo en investigación",
      icono: Award,
    },
    {
      nombre: "Club de Leones Trujillo",
      tipo: "Organización de Servicio",
      descripcion: "Apoyo financiero y logístico para campañas médicas",
      icono: Users,
    },
  ];

  const convenios = [
    {
      titulo: "Convenio de Cooperación Médica",
      descripcion:
        "Acuerdos con hospitales públicos para el uso de instalaciones y equipos médicos especializados.",
    },
    {
      titulo: "Programa de Voluntariado Médico",
      descripcion:
        "Red de cirujanos plásticos, anestesiólogos y especialistas que donan su tiempo y conocimiento.",
    },
    {
      titulo: "Alianza Educativa",
      descripcion:
        "Programas de formación y capacitación con universidades para formar nuevos especialistas.",
    },
    {
      titulo: "Apoyo Logístico",
      descripcion:
        "Colaboración con organizaciones locales para transporte, alojamiento y alimentación de pacientes.",
    },
  ];

  const equipoMedico = [
    { especialidad: "Cirujanos Plásticos", cantidad: "15+" },
    { especialidad: "Anestesiólogos", cantidad: "8+" },
    { especialidad: "Odontólogos", cantidad: "5+" },
    { especialidad: "Terapistas de Lenguaje", cantidad: "6+" },
    { especialidad: "Psicólogos", cantidad: "4+" },
    { especialidad: "Nutricionistas", cantidad: "3+" },
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
              Nuestras <span className="text-accent">Alianzas</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Trabajamos en conjunto con organizaciones, instituciones y
              profesionales comprometidos con nuestra misión de devolver
              sonrisas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alianzas Estratégicas */}
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
                <Handshake className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Alianzas Estratégicas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestros socios estratégicos nos permiten ampliar nuestro alcance
              y mejorar la calidad de atención que brindamos a los niños.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alianzas.map((alianza, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-0">
                    <alianza.icono className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-primary text-lg mb-2">
                      {alianza.nombre}
                    </h3>
                    <p className="text-sm text-accent font-medium mb-3">
                      {alianza.tipo}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {alianza.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Convenios */}
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
              Tipos de Convenios
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diferentes modalidades de colaboración que nos permiten brindar
              atención integral
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {convenios.map((convenio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <CardContent className="p-0">
                    <h3 className="font-bold text-primary text-lg mb-3">
                      {convenio.titulo}
                    </h3>
                    <p className="text-muted-foreground">
                      {convenio.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo de Voluntariado Médico */}
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
              Equipo de Voluntariado Médico
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Profesionales de la salud que donan su tiempo y conocimiento para
              nuestra causa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipoMedico.map((especialidad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-bold text-primary mb-2">
                      {especialidad.especialidad}
                    </h3>
                    <p className="text-2xl font-bold text-accent">
                      {especialidad.cantidad}
                    </p>
                    <p className="text-sm text-muted-foreground">Voluntarios</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto de las Alianzas */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">
                El Poder de Trabajar Juntos
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nuestras alianzas estratégicas han sido fundamentales para el
                  crecimiento y el impacto de la Fundación Margarita. Gracias a
                  estas colaboraciones, hemos podido:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Realizar más de 11,000 cirugías exitosas
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Expandir nuestros servicios a nivel nacional
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mejorar la calidad de atención médica
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Formar nuevos especialistas en el área
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Equipo médico colaborando"
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>
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
              ¿Quieres Ser Nuestro Aliado?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Si eres una organización, institución o profesional interesado en
              unirte a nuestra misión, nos encantaría conocerte.
            </p>
            <motion.a
              href="/contacto"
              className="inline-flex items-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Handshake className="w-5 h-5 mr-2" />
              Contáctanos
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
