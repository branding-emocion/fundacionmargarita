"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Smile } from "lucide-react";
import Link from "next/link";

export default function HistoriasPage() {
  const historias = [
    {
      id: 1,
      nombre: "María Elena",
      edad: "8 años",
      resumen:
        "María nació con labio fisurado bilateral. Después de dos cirugías realizadas por nuestro equipo médico, ahora puede sonreír con confianza...",
      historia:
        "María nació con labio fisurado bilateral, una condición que afectaba no solo su apariencia física sino también su capacidad para alimentarse adecuadamente. Sus padres, preocupados por su futuro, llegaron a nuestra fundación cuando María tenía apenas 6 meses de edad. Después de una evaluación completa por nuestro equipo multidisciplinario, se programaron dos cirugías reconstructivas. La primera cirugía se realizó cuando María cumplió 10 meses, enfocándose en la reparación del labio. El procedimiento fue un éxito total, y la recuperación fue más rápida de lo esperado. La segunda intervención se llevó a cabo cuando María tenía 18 meses, completando la reconstrucción. Hoy, a los 8 años, María es una niña completamente normal que puede sonreír con confianza y ha mejorado significativamente su autoestima. Sus padres nos cuentan que ahora participa activamente en las actividades escolares, tiene muchos amigos y sueña con ser doctora para ayudar a otros niños como ella. Su transformación no solo ha sido física, sino también emocional y social.",
      imagen:
        "young girl with beautiful smile after cleft lip surgery, confident and happy",
      fechaCirugia: "Marzo 2023",
      doctor: "Dr. Walter Zegarra Carranza",
      seguimiento: "Controles regulares cada 6 meses",
    },
    {
      id: 2,
      nombre: "Carlos Andrés",
      edad: "12 años",
      resumen:
        "Carlos tenía paladar hendido que le impedía hablar claramente. Gracias a la cirugía reconstructiva y terapia de lenguaje...",
      historia:
        "Carlos llegó a nuestra fundación a los 3 años con paladar hendido severo que le impedía hablar claramente y dificultaba su alimentación. Su familia había recorrido varios hospitales sin encontrar una solución definitiva. En nuestra fundación, Carlos recibió atención integral que incluyó no solo la cirugía reconstructiva, sino también terapia de lenguaje pre y post operatoria. La cirugía se realizó en dos etapas: la primera para cerrar el paladar primario y la segunda para completar la reconstrucción del paladar secundario. Durante todo el proceso, Carlos recibió apoyo psicológico para manejar la ansiedad y fortalecer su autoestima. Después de 3 años de tratamiento y terapias, Carlos ahora puede comunicarse sin problemas. Su rendimiento escolar mejoró notablemente y desarrolló una pasión por la lectura. Su sueño es ser maestro y ayudar a otros niños como él. Carlos se ha convertido en un ejemplo de perseverancia y hoy es uno de nuestros embajadores juveniles, compartiendo su historia para inspirar a otras familias.",
      imagen: "boy speaking clearly and confidently after cleft palate surgery",
      fechaCirugia: "Agosto 2020",
      doctor: "Dr. Walter Zegarra Carranza",
      seguimiento: "Alta médica con controles anuales",
    },
    {
      id: 3,
      nombre: "Ana Sofía",
      edad: "6 años",
      resumen:
        "Ana llegó a nosotros muy tímida debido a su condición. Después del tratamiento integral que incluye cirugía, terapia psicológica...",
      historia:
        "Ana Sofía llegó a nuestra fundación cuando tenía 4 años, acompañada de sus padres que estaban muy preocupados por el impacto emocional que su condición estaba teniendo en ella. Ana había desarrollado una timidez extrema y se negaba a interactuar con otros niños. Nuestro equipo psicológico trabajó con ella antes, durante y después de la cirugía para ayudarla a procesar sus emociones y desarrollar confianza en sí misma. La cirugía reconstructiva fue exitosa, pero el verdadero cambio vino con el trabajo terapéutico integral. Gradualmente, Ana comenzó a abrirse, primero con nuestro equipo, luego con su familia y finalmente con sus compañeros de escuela. Hoy, a los 6 años, Ana es una niña extrovertida que disfruta cantando y bailando. Participa en el coro de su escuela y ha desarrollado un talento especial para las artes escénicas. Sus padres no pueden creer la transformación y están eternamente agradecidos por el apoyo integral que recibió su hija.",
      imagen: "little girl singing and dancing happily after treatment",
      fechaCirugia: "Enero 2024",
      doctor: "Dr. Walter Zegarra Carranza",
      seguimiento: "Controles semestrales y terapia psicológica",
    },
    {
      id: 4,
      nombre: "Diego",
      edad: "10 años",
      resumen:
        "Diego y su familia viajaron desde una zona rural muy alejada. La cirugía cambió completamente su vida...",
      historia:
        "Diego y su familia viajaron más de 12 horas desde una zona rural muy alejada de la sierra peruana para llegar a nuestra fundación. La familia había ahorrado durante años para poder costear el viaje y el tratamiento. Diego, de 8 años en ese momento, tenía labio y paladar fisurado bilateral, una condición compleja que requería múltiples intervenciones. Su familia se quedó en nuestra casa de acogida durante todo el proceso de tratamiento. Diego necesitó tres cirugías espaciadas a lo largo de 18 meses. Durante este tiempo, también recibió terapia de lenguaje y apoyo nutricional, ya que llegó con desnutrición leve. La transformación de Diego fue extraordinaria. No solo mejoró físicamente, sino que su rendimiento escolar se disparó una vez que pudo comunicarse claramente. Ahora puede comer sin dificultades y su confianza ha crecido enormemente. Su familia regresó a su comunidad, pero mantienen contacto regular con nosotros. Diego se ha convertido en un líder en su escuela rural y sueña con estudiar medicina para regresar y ayudar a su comunidad.",
      imagen: "boy from rural area smiling after successful surgery",
      fechaCirugia: "Junio 2022",
      doctor: "Dr. Walter Zegarra Carranza",
      seguimiento: "Controles anuales y telemedicina",
    },
    {
      id: 5,
      nombre: "Valentina",
      edad: "4 años",
      resumen:
        "Valentina es la paciente más pequeña que hemos atendido este año. Su cirugía fue un éxito total...",
      historia:
        "Valentina llegó a nosotros cuando tenía apenas 8 meses de edad, siendo una de las pacientes más pequeñas que hemos atendido. Sus padres, primerizos y muy jóvenes, estaban abrumados por el diagnóstico y las implicaciones del tratamiento. Nuestro equipo no solo se enfocó en el tratamiento médico de Valentina, sino también en educar y apoyar a sus padres durante todo el proceso. La primera cirugía se realizó cuando Valentina cumplió 12 meses, siguiendo estrictamente los protocolos internacionales para bebés. La recuperación fue excelente y Valentina pudo comenzar a alimentarse normalmente por primera vez en su vida. Una segunda intervención menor se realizó cuando tenía 2 años para perfeccionar los resultados. Hoy, a los 4 años, Valentina es una niña completamente normal que puede alimentarse sin problemas, habla claramente para su edad y tiene un desarrollo completamente normal. Sus padres se han convertido en voluntarios de la fundación, ayudando a otras familias jóvenes que pasan por la misma experiencia. Valentina representa la importancia de la intervención temprana y el apoyo integral a las familias.",
      imagen: "very young girl eating happily after cleft surgery",
      fechaCirugia: "Febrero 2023",
      doctor: "Dr. Walter Zegarra Carranza",
      seguimiento: "Controles regulares hasta los 18 años",
    },
    {
      id: 6,
      nombre: "Sebastián",
      edad: "14 años",
      resumen:
        "Sebastián llegó a nosotros en su adolescencia, una etapa difícil para cualquier joven. Después del tratamiento...",
      historia:
        "Sebastián llegó a nuestra fundación a los 13 años, en plena adolescencia, una etapa particularmente difícil para cualquier joven, pero especialmente desafiante para alguien con labio y paladar fisurado. Había sido operado en su infancia, pero los resultados no fueron óptimos y necesitaba cirugías de revisión. Sebastián estaba pasando por una etapa de rebeldía y baja autoestima, evitaba las actividades sociales y su rendimiento académico había decaído. Nuestro equipo psicológico trabajó intensivamente con él para prepararlo emocionalmente para las cirugías de revisión. Se realizaron dos procedimientos: uno para mejorar la apariencia del labio y otro para optimizar la función del paladar. Pero el verdadero cambio vino con el trabajo de desarrollo personal y liderazgo que realizamos con él. Sebastián participó en nuestros talleres de autoestima y liderazgo juvenil. Gradualmente, no solo mejoró físicamente sino que también ganó confianza en sí mismo. Hoy es presidente del consejo estudiantil de su colegio, participa en debates y ha desarrollado habilidades de liderazgo excepcionales. Sebastián planea estudiar derecho y trabajar en derechos humanos, inspirado por su propia experiencia de superación.",
      imagen: "teenage boy showing leadership and confidence after treatment",
      fechaCirugia: "Septiembre 2023",
      doctor: "Dr. Walter Zegarra Carranza",
      seguimiento: "Alta médica con seguimiento psicológico opcional",
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
                key={historia.id}
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
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {historia.resumen}
                    </p>
                    <Link href={`/historias/${historia.id}`}>
                      <motion.span
                        className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        Leer historia completa →
                      </motion.span>
                    </Link>
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
