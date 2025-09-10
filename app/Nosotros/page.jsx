import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Target,
  Award,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">
      <header className="relative bg-gradient-to-r from-[#25adee] via-blue-700 to-[#f10783] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Heart className="w-5 h-5 text-white" />
              <span className="text-sm font-medium text-white">Desde 2015</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
              Fundación <span className="text-pink-200">Margarita</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium mb-6 max-w-2xl mx-auto text-balance">
              Devolviendo sonrisas y transformando vidas
            </p>
            <div className="flex items-center justify-center gap-2 text-pink-200">
              <Sparkles className="w-5 h-5" />
              <span className="text-lg font-medium">
                Incontables sonrisas recuperadas{" "}
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Historia de la Fundación */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Nuestra Historia</span>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Un legado de amor y servicio
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                La Fundación Margarita fue creada por el{" "}
                <strong className="text-blue-900">
                  Dr. Walter Zegarra Carranza
                </strong>{" "}
                el
                <strong className="text-[#f10783]">
                  {" "}
                  04 de agosto del 2015
                </strong>
                , en honor al recuerdo de su querida madre
                <strong className="text-[#f10783]"> Margarita Carranza</strong>,
                quien le inculcó el ejemplo de solidaridad y servicio a los más
                necesitados.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nació con el fin de ayudar a personas de escasos o nulos
                recursos económicos a través de la cirugía reconstructiva,
                especializándose en el tratamiento de niños con{" "}
                <strong className="text-blue-900">
                  labio fisurado y paladar hendido
                </strong>
                , brindándoles un desarrollo integral y la oportunidad de
                sonreír nuevamente.
              </p>
            </div>
          </div>
        </section>

        {/* El Fundador */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
              <Stethoscope className="w-5 h-5" />
              <span className="font-semibold">El Fundador</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Dr. Walter Zegarra Carranza
            </h2>
            <p className="text-xl text-[#f10783] font-semibold mt-2">
              "El Apóstol de la Sonrisa"
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Con su entrega, dedicación y pasión por los pacientes
                  fisurados, el Dr. Walter viajó hasta
                  <strong className="text-blue-900">
                    {" "}
                    México en los años 90
                  </strong>{" "}
                  para estudiar la especialidad de cirugía plástica.
                </p>
                <p className="leading-relaxed">
                  Tuvo la oportunidad de conocer al{" "}
                  <strong className="text-[#f10783]">
                    Dr. Fernandez Ortiz Monasterio
                  </strong>
                  , una eminencia mundial que fue su mentor en cirugía
                  reconstructiva labio palatino.
                </p>
                <p className="leading-relaxed">
                  Años más tarde, se unió a la Asociación Internacional del Club
                  de Leones, creando el programa
                  <strong className="text-blue-900"> "PROLAPAR"</strong>{" "}
                  (Programa de Labio y Paladar).
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#25adee] to-[#f10783] rounded-2xl shadow-lg p-8 text-white">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Más de 11,000</h3>
                <p className="text-xl mb-2">Intervenciones Quirúrgicas</p>
                <p className="text-blue-100">
                  Miles de sonrisas devueltas a niños de todo el Perú
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Misión, Visión y Objetivos */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Nuestro Propósito</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Misión, Visión y Objetivos
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <Card className="border-pink-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-pink-100 rounded-full p-3">
                    <Heart className="w-6 h-6 text-[#f10783]" />
                  </div>
                  <h3 className="text-2xl font-bold text-pink-900">Misión</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Brindar y facilitar intervenciones quirúrgicas y
                  rehabilitación a pacientes con Labio Fisurado y Paladar
                  Hendido de escasos recursos económicos, para mejorar la salud
                  y condición de vida a través del apoyo de profesionales
                  calificados.
                </p>
              </CardContent>
            </Card>

            {/* Visión */}
            <Card className="border-blue-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Users className="w-6 h-6 text-[#25adee]" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">Visión</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Convertirnos en una institución líder en brindar atención
                  oportuna y de calidad en el tratamiento y rehabilitación de
                  pacientes con Labio Fisurado y Paladar Hendido, contribuyendo
                  en la mejora de la salud y condición humana.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Objetivos */}
          <div className="mt-8">
            <Card className="border-green-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-green-100 rounded-full p-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">
                    Objetivos
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <Heart className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>Beneficiar</strong> a personas de bajos recursos
                        en cirugía, recuperación y rehabilitación
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <div className="text-center">
                      <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <Stethoscope className="w-6 h-6 text-[#25adee]" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>Brindar</strong> seguimiento post operatorio
                        oportuno y desarrollo permanente
                      </p>
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
                    <div className="text-center">
                      <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-[#f10783]" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong>Promover</strong> alianzas estratégicas con
                        entidades públicas y privadas
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Aliados Estratégicos */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Nuestros Aliados</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Trabajamos en equipo
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-100">
            <p className="text-lg text-gray-700 mb-6">
              En colaboración constante con nuestros aliados estratégicos para
              seguir encaminados en esta ardua labor:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 px-4 py-2"
              >
                Municipalidad Provincial de Trujillo
              </Badge>
              <Badge
                variant="secondary"
                className="bg-pink-100 text-pink-800 px-4 py-2"
              >
                Sol TV
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 px-4 py-2"
              >
                Emtrafesa
              </Badge>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 px-4 py-2"
              >
                TRC
              </Badge>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-800 px-4 py-2"
              >
                Club de Leones Trujillo por una Sonrisa
              </Badge>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-[#25adee] to-[#f10783] rounded-2xl shadow-xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Siempre buscando VERLOS SONREÍR
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a nuestra misión de devolver sonrisas y cambiar vidas. Cada
            donación cuenta, cada sonrisa importa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/Donar" className="hover:cursor-pointer">
              <button className="bg-white text-[#25adee] px-8 py-3 rounded-full hover:cursor-pointer font-semibold hover:bg-blue-50 transition-colors">
                Hacer una Donación
              </button>
            </Link>
            <Link href="/Historias" className="hover:cursor-pointer">
              <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:cursor-pointer font-semibold hover:bg-white/10 transition-colors">
                Conocer más historias
              </button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
