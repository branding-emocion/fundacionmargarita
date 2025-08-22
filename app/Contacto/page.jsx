"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, Heart } from "lucide-react";

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
      "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto."
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
    <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
              Contáctanos
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Si necesitas información sobre
              nuestros servicios, quieres ser voluntario o tienes alguna
              consulta, no dudes en contactarnos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Información de Contacto */}
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
              Información de Contacto
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Múltiples formas de ponerte en contacto con nosotros
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                titulo: "Teléfono",
                info: "+51 944 123 456",
                descripcion: "Lunes a Viernes 8:00 AM - 6:00 PM",
              },
              {
                icon: Mail,
                titulo: "Email",
                info: "info@fundacionmargarita.org",
                descripcion: "Respuesta en 24 horas",
              },
              {
                icon: MapPin,
                titulo: "Dirección",
                info: "Trujillo, La Libertad",
                descripcion: "Perú",
              },
              {
                icon: Clock,
                titulo: "Horarios",
                info: "Lun - Vie: 8:00 - 18:00",
                descripcion: "Sáb: 8:00 - 12:00",
              },
            ].map((contacto, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-0">
                    <contacto.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-primary mb-2">
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

      {/* Formulario de Contacto */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">
                Envíanos un Mensaje
              </h2>
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
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </motion.div>

            {/* Información Adicional */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  ¿Cómo Podemos Ayudarte?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Solicitar Ayuda Médica
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Si tu hijo necesita cirugía de labio fisurado o paladar
                        hendido
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Ser Voluntario
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Únete a nuestro equipo de profesionales voluntarios
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Alianzas Estratégicas
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Colabora con nosotros como organización o empresa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Información General
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Consultas sobre nuestros programas y servicios
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <CardContent className="p-0">
                  <h4 className="font-bold text-primary mb-3">
                    Atención de Emergencia
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Para casos de emergencia médica, contáctanos directamente:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">
                        +51 944 123 456
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-primary">
                        emergencia@fundacionmargarita.org
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-bold text-primary mb-3">Ubicación</h4>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Nos encontramos en Trujillo, La Libertad, Perú. Nuestras
                    instalaciones están ubicadas estratégicamente para brindar
                    fácil acceso a las familias que necesitan nuestros
                    servicios.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
