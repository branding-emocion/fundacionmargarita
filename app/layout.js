import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Main from "./Main";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fundación Margarita - Devolviendo Sonrisas a los Niños",
  description:
    "Fundación Margarita transforma vidas a través de cirugías reconstructivas para niños. Más de 11,000 sonrisas devueltas. Cada cirugía representa una nueva oportunidad, esperanza y sonrisa.",
  keywords: [
    "fundación margarita",
    "cirugías reconstructivas",
    "ayuda a niños",
    "fundación",
    "sonrisas",
    "transformación",
    "esperanza",
    "cirugías gratuitas",
    "labio leporino",
    "paladar hendido",
    "caridad",
    "donaciones",
  ],
  authors: [{ name: "Fundación Margarita" }],
  creator: "Fundación Margarita",
  publisher: "Fundación Margarita",

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://fundacionmargarita.org",
    siteName: "Fundación Margarita",
    title: "Fundación Margarita - Devolviendo Sonrisas a los Niños",
    description:
      "Transformamos vidas a través de cirugías reconstructivas para niños. Más de 11,000 sonrisas devueltas. Cada cirugía representa una nueva oportunidad y esperanza.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fundación Margarita - Devolviendo Sonrisas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundación Margarita - Devolviendo Sonrisas a los Niños",
    description:
      "Transformamos vidas a través de cirugías reconstructivas para niños. Más de 11,000 sonrisas devueltas.",
    images: ["/og-image.jpg"],
    creator: "@FundacionMargarita",
  },

  category: "nonprofit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Main>{children}</Main>
        <Toaster />
      </body>
    </html>
  );
}
