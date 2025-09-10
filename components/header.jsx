"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
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

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border "
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
    </motion.header>
  );
}
