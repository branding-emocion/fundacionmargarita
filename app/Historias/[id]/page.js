"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Smile, ArrowLeft, Calendar } from "lucide-react";

export default function HistoriaIndividualPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number.parseInt(params.id);

  const historias = [
    {
      id: 1,
      nombre: "María Elena",
      edad: "8 años",
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
      historia:
        "Sebastián llegó a nuestra fundación a los 13 años, en plena adolescencia, una etapa particularmente difícil para cualquier joven, pero especialmente desafiante para alguien con labio y paladar fisurado. Había sido operado en su infancia, pero los resultados no fueron óptimos y necesitaba cirugías de revisión. Sebastián estaba pasando por una etapa de rebeldía y baja autoestima, evitaba las actividades sociales y su rendimiento académico había decaído. Nuestro equipo psicológico trabajó intensivamente con él para prepararlo emocionalmente para las cirugías de revisión. Se realizaron dos procedimientos: uno para mejorar la apariencia del labio y otro para optimizar la función del paladar. Pero el verdadero cambio vino con el trabajo de desarrollo personal y liderazgo que realizamos con él. Sebastián participó en nuestros talleres de autoestima y liderazgo juvenil. Gradualmente, no solo mejoró físicamente sino que también ganó confianza en sí mismo. Hoy es presidente del consejo estudiantil de su colegio, participa en debates y ha desarrollado habilidades de liderazgo excepcionales. Sebastián planea estudiar derecho y trabajar en derechos humanos, inspirado por su propia experiencia de superación.",
      imagen: "teenage boy showing leadership and confidence after treatment",
      fechaCirugia: "Septiembre 2023",
      doctor: "Dr. Walter Zegarra Carranza",
      seguimiento: "Alta médica con seguimiento psicológico opcional",
    },
  ];

  const historia = historias.find((h) => h.id === id);

  if (!historia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Historia no encontrada
          </h1>
          <Button onClick={() => router.push("/Historias")}>
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
              onClick={() => router.push("/Historias")}
              variant="ghost"
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a Historias
            </Button>

            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black text-primary mb-4">
                Historia de{" "}
                <span className="text-accent">{historia.nombre}</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                {historia.edad} • Una historia de transformación y esperanza
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
                      src={`/placeholder.svg?height=400&width=600&query=${historia.imagen}`}
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
                    <Button className="w-full">Hacer una Donación</Button>
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
                          src={`/placeholder.svg?height=200&width=300&query=${otraHistoria.imagen}`}
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
                          href={`/Historias/${otraHistoria.id}`}
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
