"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Heart,
  CreditCard,
  Building,
  Smartphone,
  Check,
  QrCode,
  Sparkles,
} from "lucide-react";

export default function DonarPage() {
  const [showQRModal, setShowQRModal] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      <header className="relative bg-gradient-to-r from-[#25adee] via-blue-700 to-[#f10783] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">Desde 2015</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 uppercase">
              Dona con el <span className="text-pink-200"> Corazón</span>
            </h1>

            <div className="flex items-center justify-center gap-2 text-pink-200">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-medium">
                ✨ Tu donación puede cambiar la vida de un niño para siempre.
                Ayúdanos a seguir devolviendo sonrisas y creando historias de
                esperanza. 💝
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>

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
                hasQR: true,
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
                      <div className="flex items-center justify-center space-x-1 text-xs text-accent mb-3">
                        <Check className="w-3 h-3" />
                        <span>Seguro y Confiable</span>
                      </div>
                    )}
                    {metodo.hasQR && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="mt-2 w-full bg-gradient-to-r from-primary to-accent"
                          >
                            <QrCode className="w-4 h-4 mr-2" />
                            Ver QR para Donar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-primary text-center">
                              Dona con Yape o Plin
                            </DialogTitle>
                            <DialogDescription className="text-center">
                              Escanea este código QR con tu app de Yape o Plin
                              para donar de forma rápida y segura
                            </DialogDescription>
                          </DialogHeader>

                          <div className="text-center space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <img
                                src="/QR.png"
                                alt="QR Code para donaciones"
                                className="w-64 h-64 mx-auto"
                              />
                            </div>

                            <div className="text-sm text-muted-foreground">
                              <p className="font-semibold text-primary">
                                Número: 987 654 321
                              </p>
                              <p>Fundación Margarita</p>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-primary to-accent">
                              <Heart className="w-4 h-4 mr-2" />
                              ¡Gracias por tu donación!
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
