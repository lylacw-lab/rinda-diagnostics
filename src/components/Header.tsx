"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./../context/CartContext";
import { ShoppingBag, HeartPulse, PhoneCall } from "lucide-react";

export default function Header() {
  const { getCartCount } = useCart();
  const totalItems = getCartCount();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm">
      {/* Top Authoritative Clinical Banner */}
      <div className="w-full bg-rose-950 text-slate-100 text-xs py-2 px-4 flex justify-between items-center font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Authorized Clinical, Surgical & Lab Infrastructure Supplier</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-200">
          <PhoneCall className="w-3 h-3 text-rose-400" />
          <span>Procurement Desk: +254 700 000000</span>
        </div>
      </div>

      {/* Main Corporate Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex justify-between items-center">
        {/* Brand High-Fidelity Logo Identity Module */}
        <Link href="/" className="flex items-center group transform hover:scale-[1.01] transition-transform">
          <div className="relative w-72 sm:w-80 md:w-96 h-16 sm:h-20 md:h-24">
            <Image 
              src="/logo.png" 
              alt="Rinda Diagnostics Logo" 
              fill
              priority
              sizes="(max-w-7xl) 384px, 96px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Action Controls & Cart Counter */}
        <div className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-semibold text-slate-600 hover:text-rose-900 transition-colors hidden sm:block"
          >
            Browse Catalog
          </Link>
          
          {/* Professional Order Basket Module */}
          <Link 
            href="/checkout" 
            className="relative flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition-all font-semibold text-sm group"
          >
            <ShoppingBag className="w-4 h-4 text-rose-950 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Procurement Basket</span>
            
            {/* Live Counter Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-900 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
