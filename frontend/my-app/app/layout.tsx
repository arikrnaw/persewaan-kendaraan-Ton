import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Mino Store - Toko Sepatu Online",
  description: "Toko sepatu online terpercaya dengan kualitas terbaik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${montserrat.variable} antialiased`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
