// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Heart, Smile } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { historiasService } from "@/lib/historias";

// export default function HistoriasPage() {
//   const [historias, setHistorias] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loadHistorias = async () => {
//     try {
//       setLoading(true);
//       const data = await historiasService.getAll();
//       setHistorias(data);
//     } catch (error) {
//       toast("No se pudieron cargar las historias");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadHistorias();
//   }, []);

//   const fadeInUp = {
//     initial: { opacity: 0, y: 60 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.6 },
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl md:text-6xl font-black text-primary mb-6">
//               Historias de <span className="text-accent">Vida</span>
//             </h1>
//             <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//               Cada sonrisa cuenta una historia de esperanza, transformación y
//               nuevas oportunidades. Conoce las historias reales de los niños que
//               hemos ayudado.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Historias Grid */}
//       <section className="py-10 bg-card">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {historias.map((historia, index) => (
//               <motion.div
//                 key={historia.id}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full p-0">
//                   <div className="aspect-video overflow-hidden">
//                     <img
//                       src={historia.imagen}
//                       alt={historia.nombre}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <CardContent className="p-4">
//                     <div className="flex items-center mb-3">
//                       <Smile className="w-6 h-6 text-accent mr-2" />
//                       <div>
//                         <h3 className="font-bold text-primary text-lg uppercase">
//                           {historia.nombre}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">
//                           {historia.edad}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="text-muted-foreground leading-relaxed mb-4">
//                       {historia.resumen}
//                     </p>
//                     <Link href={`/Historias/${historia.id}`}>
//                       <motion.span
//                         className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors cursor-pointer"
//                         whileHover={{ x: 5 }}
//                       >
//                         Leer historia completa →
//                       </motion.span>
//                     </Link>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonios de Padres */}
//       {/* <section className="py-16">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-3xl font-bold text-primary mb-4">
//               Testimonios de Familias
//             </h2>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               Las palabras de agradecimiento de las familias son nuestro mayor
//               reconocimiento
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 testimonio:
//                   "Gracias a la Fundación Margarita, mi hija puede sonreír sin complejos. El Dr. Zegarra y su equipo son ángeles en la tierra.",
//                 padre: "Rosa María, madre de Ana Sofía",
//               },
//               {
//                 testimonio:
//                   "No tengo palabras para agradecer todo lo que han hecho por mi hijo. Ahora puede hablar claramente y es un niño feliz.",
//                 padre: "Juan Carlos, padre de Diego",
//               },
//               {
//                 testimonio:
//                   "La atención fue excepcional desde el primer día. Nos trataron como familia y nos dieron esperanza cuando más la necesitábamos.",
//                 padre: "María Elena, madre de Valentina",
//               },
//             ].map((testimonio, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <Card className="p-6 text-center h-full">
//                   <CardContent className="p-0">
//                     <div className="text-4xl text-primary mb-4">"</div>
//                     <p className="text-muted-foreground mb-4 italic">
//                       {testimonio.testimonio}
//                     </p>
//                     <p className="font-semibold text-primary">
//                       — {testimonio.padre}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section> */}

//       {/* CTA Section */}
//       <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
//         <div className="container mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-3xl font-bold mb-4">
//               Ayúdanos a Crear Más Historias
//             </h2>
//             <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
//               Cada donación nos permite escribir una nueva historia de
//               esperanza. Únete a nuestra misión de devolver sonrisas.
//             </p>
//             <motion.a
//               href="/Donar"
//               className="inline-flex items-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Heart className="w-5 h-5 mr-2" />
//               Hacer una Donación
//             </motion.a>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Smile } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { historiasService } from "@/lib/historias";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function HistoriasPage() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHistorias = async () => {
    try {
      setLoading(true);
      const data = await historiasService.getAll();
      setHistorias(data);
    } catch (error) {
      toast("No se pudieron cargar las historias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistorias();
  }, []);

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

      {/* Historias Grid */}
      <section className="py-10 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden h-full p-0">
                      <div className="aspect-video overflow-hidden">
                        <Skeleton className="w-full h-full" />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <Skeleton className="w-6 h-6 mr-2" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-24 mb-1" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                        <Skeleton className="h-4 w-32" />
                      </CardContent>
                    </Card>{" "}
                  </motion.div>
                ))
              : historias.map((historia, index) => (
                  <motion.div
                    key={historia.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full p-0">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={historia.imagen || "/placeholder.svg"}
                          alt={historia.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center mb-3">
                          <Smile className="w-6 h-6 text-accent mr-2" />
                          <div>
                            <h3 className="font-bold text-primary text-lg uppercase">
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
                        <Link href={`/Historias/${historia.id}`}>
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
      {/* <section className="py-16">
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
      </section> */}

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
