"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heart,
  CreditCard,
  Building,
  Smartphone,
  Check,
  Gift,
} from "lucide-react";

export default function DonarPage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("unica");

  const predefinedAmounts = [50, 100, 200, 500, 1000, 2000];

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
              Dona con el <span className="text-accent">Corazón</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tu donación puede cambiar la vida de un niño para siempre.
              Ayúdanos a seguir devolviendo sonrisas y creando historias de
              esperanza.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Métodos de Pago */}
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
              Métodos de Donación
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Múltiples formas seguras y convenientes de hacer tu donación
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: CreditCard,
                titulo: "Tarjeta de Crédito/Débito",
                descripcion: "Visa, Mastercard, American Express",
                seguro: true,
              },
              {
                icon: Building,
                titulo: "Transferencia Bancaria",
                descripcion: "Cuenta Ahorro Soles y Dólares",
                seguro: true,
              },
              {
                icon: Smartphone,
                titulo: "Billeteras Digitales",
                descripcion: "Yape, Plin, BIM",
                seguro: true,
              },
              {
                icon: Heart,
                titulo: "PayPal",
                descripcion: "Donación internacional segura",
                seguro: true,
                isPaypal: true,
              },
            ].map((metodo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <metodo.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-primary mb-2">
                      {metodo.titulo}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {metodo.descripcion}
                    </p>
                    {metodo.seguro && (
                      <div className="flex items-center justify-center space-x-1 text-xs text-accent">
                        <Check className="w-3 h-3" />
                        <span>Seguro y Confiable</span>
                      </div>
                    )}
                    {metodo.isPaypal && (
                      <Button
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() =>
                          window.open(
                            "https://paypal.me/fundacionmargarita",
                            "_blank"
                          )
                        }
                      >
                        Donar con PayPal
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Información Bancaria */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-primary text-center mb-8">
              Información Bancaria
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-bold text-primary mb-4">
                    Fundación Margarita - Cuenta Ahorro Soles
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Banco:</strong> Continental (BBVA)
                    </p>
                    <p>
                      <strong>Titular:</strong> Fundación Margarita
                    </p>
                    <p>
                      <strong>Cuenta Ahorro:</strong> 0011-0254-0402005222-08
                    </p>
                    <p>
                      <strong>CCI:</strong> 011-254-00020052220804
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-bold text-primary mb-4">
                    Fundación Margarita - Cuenta Ahorro Dólares
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Banco:</strong> Continental (BBVA)
                    </p>
                    <p>
                      <strong>Titular:</strong> Fundación Margarita
                    </p>
                    <p>
                      <strong>Cuenta Ahorro:</strong> 0011-0254-0702005222-16
                    </p>
                    <p>
                      <strong>CCI:</strong> 011-254-00020052221607
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-0 text-center">
                  <h3 className="font-bold text-primary mb-4">
                    Donación Internacional - PayPal
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Para donaciones desde el extranjero, puedes usar PayPal de
                    forma segura
                  </p>
                  <Button
                    size="lg"
                    onClick={() =>
                      window.open(
                        "https://paypal.me/fundacionmargarita",
                        "_blank"
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Donar con PayPal
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Después de realizar tu transferencia, envíanos el comprobante a{" "}
                <a
                  href="mailto:donaciones@fundacionmargarita.org"
                  className="text-primary hover:underline"
                >
                  donaciones@fundacionmargarita.org
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Gracias por Ser Parte del Cambio
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Tu generosidad hace posible que sigamos devolviendo sonrisas y
              creando historias de esperanza. Juntos podemos cambiar más vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <Heart className="w-5 h-5 mr-2" />
                Donar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Compartir con Amigos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
