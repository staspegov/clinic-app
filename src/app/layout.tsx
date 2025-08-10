import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CIMER Chile — Investigación Clínica y Salud",
  description:
    "CIMER Chile: Líderes en investigación clínica, estudios médicos y atención personalizada. Participa en nuestros estudios y mejora tu calidad de vida.",
  metadataBase: new URL("https://cimerchile.cl"),
  alternates: {
    canonical: "https://cimerchile.cl",
  },
  openGraph: {
    title: "CIMER Chile — Investigación Clínica y Salud",
    description:
      "CIMER Chile: Líderes en investigación clínica, estudios médicos y atención personalizada. Participa en nuestros estudios y mejora tu calidad de vida.",
    url: "https://cimerchile.cl",
    siteName: "CIMER Chile",
    type: "website",
    locale: "es_CL",
    images: [
      {
        url: "https://cimerchile.cl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CIMER Chile — Investigación Clínica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CIMER Chile — Investigación Clínica y Salud",
    description:
      "CIMER Chile: Líderes en investigación clínica, estudios médicos y atención personalizada.",
    creator: "@cimerchile",
    images: ["https://cimerchile.cl/og-image.jpg"],
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Extra meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CIMER Chile" />
        <meta name="theme-color" content="#047857" />

        {/* Bing verification meta tag */}
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
