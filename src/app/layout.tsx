import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Lounge Private Itaú — Reservas",
  description: "Sistema de reservas do Lounge Private Itaú",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Itaú
              </p>
              <h1 className="text-lg font-semibold">Lounge Private — Reservas</h1>
            </div>
            <nav className="flex gap-1 rounded-lg bg-zinc-100 p-1 text-sm font-medium dark:bg-zinc-800">
              <Link
                href="/"
                className="rounded-md px-3 py-1.5 hover:bg-white hover:shadow-sm dark:hover:bg-zinc-700"
              >
                Agenda
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-1.5 hover:bg-white hover:shadow-sm dark:hover:bg-zinc-700"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
