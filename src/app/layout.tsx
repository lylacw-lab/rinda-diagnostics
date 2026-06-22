import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./../context/CartContext";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rinda Diagnostics | Premium Medical Supplies & Laboratory Equipment",
  description: "High-grade medical infrastructure, diagnostic kits, and laboratory tools engineered for clinical efficiency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <CartProvider>
          {/* Global Clinical Navigation Header */}
          <Header />
          
          {/* Main App Page Target Area */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Global Corporate Profile Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}