import Link from "next/link";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-primary/10 text-slate-700 relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 right-8 text-2xl text-primary">💝</div>
        <div className="absolute bottom-8 left-8 text-2xl text-primary">✨</div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <Link href="/" className="flex items-center space-x-2">
                  <Image src={"/logo.jpg"} alt="Logo" width={160} height={52} />
                </Link>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6 max-w-md leading-relaxed">
              Fundación sin fines de lucro dedicada a ayudar a niños de escasos
              recursos con labio fisurado y paladar hendido, devolviendo
              sonrisas y esperanza a cada familia.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-slate-800">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/nosotros"
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/historias"
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Historias de Vida
                </Link>
              </li>
              <li>
                <Link
                  href="/alianzas"
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Alianzas
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/donar"
                  className="text-slate-600 hover:text-primary transition-colors"
                >
                  Donar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-slate-800">
              Contacto
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-slate-200">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-slate-600">+51 944 123 456</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-white rounded-lg border border-slate-200">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-slate-600">
                  info@fundacionmargarita.org
                </span>
              </div>
              <div className="flex items-start space-x-3 p-2 bg-white rounded-lg border border-slate-200">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-slate-600">
                  Trujillo, La Libertad, Perú
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} Fundación Margarita. Todos los
            derechos reservados.
            <span className="block mt-1 text-xs text-slate-500">
              Devolviendo sonrisas desde el corazón
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
