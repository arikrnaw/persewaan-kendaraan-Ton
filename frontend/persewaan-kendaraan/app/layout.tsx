import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Persewaan Kendaraan - Transaction Management",
  description: "Sistem manajemen transaksi persewaan kendaraan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  );
}
