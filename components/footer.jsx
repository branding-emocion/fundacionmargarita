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

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Fundación Margarita</h3>
                <p className="text-sm opacity-90">Devolviendo Sonrisas</p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4 max-w-md">
              Fundación sin fines de lucro dedicada a ayudar a niños de escasos
              recursos con labio fisurado y paladar hendido, devolviendo
              sonrisas y esperanza.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 opacity-75 hover:opacity-100 cursor-pointer" />
              <Instagram className="w-5 h-5 opacity-75 hover:opacity-100 cursor-pointer" />
              <Twitter className="w-5 h-5 opacity-75 hover:opacity-100 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nosotros" className="opacity-90 hover:opacity-100">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/historias"
                  className="opacity-90 hover:opacity-100"
                >
                  Historias de Vida
                </Link>
              </li>
              <li>
                <Link href="/alianzas" className="opacity-90 hover:opacity-100">
                  Alianzas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="opacity-90 hover:opacity-100">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/Donar" className="opacity-90 hover:opacity-100">
                  Donar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="opacity-90">+51 944 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="opacity-90">info@fundacionmargarita.org</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="opacity-90">Trujillo, La Libertad, Perú</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2024 Fundación Margarita. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
