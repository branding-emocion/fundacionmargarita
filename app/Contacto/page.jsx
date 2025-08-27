"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Heart,
  Smile,
  Star,
} from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    alert(
      "¡Mensaje enviado correctamente! 😊 Nos pondremos en contacto contigo pronto para ayudarte a devolver sonrisas."
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <section className="py-20 bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-10 left-10 text-accent/30"
          >
            <Heart className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{
              rotate: -360,
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 text-secondary/40"
          >
            <Smile className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-1/4 text-accent/25"
          >
            <Star className="w-10 h-10" />
          </motion.div>
          <motion.div
            animate={{
              x: [0, 30, 0],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 text-primary/30"
          >
            <Heart className="w-14 h-14" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <Smile className="w-16 h-16 text-accent mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              ¡Contáctanos!
            </h1>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para ayudarte a devolver sonrisas. Si necesitas
              información sobre nuestros servicios, quieres ser voluntario o
              tienes alguna consulta, ¡no dudes en contactarnos! 💝
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Múltiples Formas de Conectar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Elige la forma que más te convenga para ponerte en contacto con
              nosotros
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                titulo: "Teléfono",
                info: "+51 944 123 456",
                descripcion: "Lunes a Viernes 8:00 AM - 6:00 PM",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                icon: Mail,
                titulo: "Email",
                info: "info@fundacionmargarita.org",
                descripcion: "Respuesta en 24 horas",
                color: "text-accent",
                bgColor: "bg-accent/10",
              },
              {
                icon: MapPin,
                titulo: "Dirección",
                info: "Trujillo, La Libertad",
                descripcion: "Perú",
                color: "text-secondary",
                bgColor: "bg-secondary/10",
              },
              {
                icon: Clock,
                titulo: "Horarios",
                info: "Lun - Vie: 8:00 - 18:00",
                descripcion: "Sáb: 8:00 - 12:00",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
            ].map((contacto, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <Card
                  className={`text-center p-6 hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-primary/30 ${contacto.bgColor}`}
                >
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                      }}
                      className={`w-16 h-16 ${contacto.color} mx-auto mb-4 p-2 rounded-full ${contacto.bgColor} border-2 border-current/20`}
                    >
                      <contacto.icon className="w-full h-full" />
                    </motion.div>
                    <h3 className={`font-bold ${contacto.color} mb-2 text-lg`}>
                      {contacto.titulo}
                    </h3>
                    <p className="font-semibold text-foreground mb-1">
                      {contacto.info}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {contacto.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-card via-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-8 h-8 text-accent" />
                </motion.div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Envíanos un Mensaje
                </h2>
              </div>

              <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Nombre Completo *
                      </label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="telefono"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Teléfono
                      </label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Tu número de teléfono"
                        className="border-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="asunto"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Asunto *
                    </label>
                    <Input
                      id="asunto"
                      name="asunto"
                      type="text"
                      required
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Mensaje *
                    </label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      required
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensaje con Amor 💝
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Smile className="w-8 h-8 text-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ¿Cómo Podemos Ayudarte?
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      titulo: "Solicitar Ayuda Médica",
                      descripcion:
                        "Si tu hijo necesita cirugía de labio fisurado o paladar hendido",
                    },
                    {
                      titulo: "Ser Voluntario",
                      descripcion:
                        "Únete a nuestro equipo de profesionales voluntarios",
                    },
                    {
                      titulo: "Alianzas Estratégicas",
                      descripcion:
                        "Colabora con nosotros como organización o empresa",
                    },
                    {
                      titulo: "Información General",
                      descripcion:
                        "Consultas sobre nuestros programas y servicios",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                          rotate: 360,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-primary">
                          {item.titulo}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.descripcion}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Card className="p-6 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 border-2 border-accent/30">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Star className="w-6 h-6 text-accent" />
                    </motion.div>
                    <h4 className="font-bold text-accent text-lg">
                      Atención de Emergencia
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Para casos de emergencia médica, contáctanos directamente:
                  </p>
                  <div className="space-y-2">
                    <motion.div
                      className="flex items-center space-x-2 p-2 rounded bg-accent/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Phone className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-accent">
                        +51 944 123 456
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-2 p-2 rounded bg-accent/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Mail className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-accent">
                        emergencia@fundacionmargarita.org
                      </span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-secondary" />
                  <h4 className="font-bold text-secondary text-lg">
                    Ubicación
                  </h4>
                </div>
                <Card className="bg-gradient-to-br from-secondary/10 to-primary/5 border-secondary/30 p-4">
                  <p className="text-sm text-muted-foreground">
                    Nos encontramos en Trujillo, La Libertad, Perú. Nuestras
                    instalaciones están ubicadas estratégicamente para brindar
                    fácil acceso a las familias que necesitan nuestros
                    servicios. 🏥💝
                  </p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
