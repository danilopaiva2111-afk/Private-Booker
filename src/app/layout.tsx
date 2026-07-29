import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pro One Tennis Coach | Academia de Tênis",
  description:
    "Pro One Tennis Coach — treinamento de tênis de alta performance para todas as idades. Aulas particulares, tennis kids e preparação competitiva. Venha treinar com a gente.",
  keywords: [
    "tênis",
    "aulas de tênis",
    "academia de tênis",
    "tennis coach",
    "professor de tênis",
    "Pro One Tennis Coach",
  ],
  openGraph: {
    title: "Pro One Tennis Coach",
    description:
      "Treinamento de tênis de alta performance para todas as idades.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-ink text-white antialiased font-body selection:bg-lime selection:text-ink">
        {children}
      </body>
    </html>
  );
}
