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
    <footer className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 text-4xl">💝</div>
        <div className="absolute top-8 right-8 text-3xl">✨</div>
        <div className="absolute bottom-4 left-1/4 text-2xl">💫</div>
        <div className="absolute bottom-8 right-1/4 text-3xl">🌟</div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
                  Fundación Margarita
                </h3>
                <p className="text-sm opacity-90 font-medium">
                  ✨ Devolviendo Sonrisas ✨
                </p>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-6 max-w-md leading-relaxed">
              💝 Fundación sin fines de lucro dedicada a ayudar a niños de
              escasos recursos con labio fisurado y paladar hendido, devolviendo
              sonrisas y esperanza a cada familia. 🌟
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer hover:scale-110">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer hover:scale-110">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all cursor-pointer hover:scale-110">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">🔗 Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/nosotros"
                  className="opacity-90 hover:opacity-100 hover:text-secondary transition-all flex items-center space-x-2"
                >
                  <span>👥</span>
                  <span>Nosotros</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/historias"
                  className="opacity-90 hover:opacity-100 hover:text-secondary transition-all flex items-center space-x-2"
                >
                  <span>📖</span>
                  <span>Historias de Vida</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/alianzas"
                  className="opacity-90 hover:opacity-100 hover:text-secondary transition-all flex items-center space-x-2"
                >
                  <span>🤝</span>
                  <span>Alianzas</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="opacity-90 hover:opacity-100 hover:text-secondary transition-all flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>Contacto</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/donar"
                  className="opacity-90 hover:opacity-100 hover:text-secondary transition-all flex items-center space-x-2"
                >
                  <span>💝</span>
                  <span>Donar</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">📞 Contacto</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
                <Phone className="w-4 h-4 text-secondary" />
                <span className="opacity-90">+51 944 123 456</span>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
                <Mail className="w-4 h-4 text-secondary" />
                <span className="opacity-90">info@fundacionmargarita.org</span>
              </div>
              <div className="flex items-start space-x-3 p-2 bg-white/10 rounded-lg">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary" />
                <span className="opacity-90">Trujillo, La Libertad, Perú</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gradient-to-r from-transparent via-white/30 to-transparent mt-8 pt-8 text-center">
          <p className="text-sm opacity-90">
            💝 &copy; 2024 Fundación Margarita. Todos los derechos reservados.
            <span className="block mt-1 text-xs opacity-75">
              ✨ Devolviendo sonrisas desde el corazón ✨
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
