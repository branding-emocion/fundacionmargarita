"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, MessageCircle, Mail, HeartIcon } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/Nosotros", label: "Nosotros" },
    { href: "/Historias", label: "Historias de Vida" },
    { href: "/Alianzas", label: "Alianzas" },
    { href: "/Blog", label: "Blog" },
    { href: "/Noticias", label: "Noticias" },
    { href: "/Contacto", label: "Contacto" },
  ];

  const buttons = [
    {
      href: "https://wa.me/51960544941",
      icon: MessageCircle,
      label: "WhatsApp",
      className: "bg-green-500 hover:bg-green-600 text-white",
      external: true,
    },
    {
      href: "/Donar",
      icon: HeartIcon,
      label: "Donaciones",
      className: "bg-red-500 hover:bg-red-600 text-white",
      external: false,
    },
    {
      href: "/Contacto",
      icon: Mail,
      label: "Contacto",
      className: "bg-blue-500 hover:bg-blue-600 text-white",
      external: false,
    },
  ];

  return (
    <motion.header
      className="sticky top-0 bottom-1 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={"/logo.jpg"} alt="Logo" width={160} height={52} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8   ">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Donate Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link href="/Donar">
                <Heart className="w-4 h-4 mr-1" />
                DONAR
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={(e) => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                className="bg-accent hover:bg-accent/90   w-full  "
              >
                <Link href="/Donar">
                  <Heart className="w-4 h-4 mr-2" />
                  DONAR
                </Link>
              </Button>
            </div>
          </motion.nav>
        )}
      </div>

      <div className="fixed right-4 top-[70vh] z-40 flex flex-col gap-3">
        {buttons.map((button, index) => {
          const Icon = button.icon;
          const ButtonComponent = (
            <motion.button
              key={index}
              className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:cursor-pointer hover:scale-110 ${button.className}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={button.label}
            >
              <Icon className="w-5 h-5" />
            </motion.button>
          );

          return button.external ? (
            <a
              key={button.href}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ButtonComponent}
            </a>
          ) : (
            <Link key={button.href} href={button.href}>
              {ButtonComponent}
            </Link>
          );
        })}
      </div>
    </motion.header>
  );
}
