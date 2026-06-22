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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-pink-100 shadow-sm">
      {/* Top Clinical Notification Banner */}
      <div className="w-full bg-pink-600 text-white text-xs py-2 px-4 flex justify-between items-center font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
          <span>Authorized Medical devices & clinical Lab Supplier</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PhoneCall className="w-3 h-3" />
          <span>Support: +255 787 594 111</span>
        </div>
      </div>
      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex justify-between items-center">
        {/* Expanded High-Fidelity Logo Identity Module */}
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
            className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors hidden sm:block"
          >
            Browse Catalog
          </Link>
          
          {/* Basket Shopping Module */}
          <Link 
            href="/checkout" 
            className="relative flex items-center gap-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 px-4 py-2.5 rounded-xl transition-all font-medium text-sm group"
          >
            <ShoppingBag className="w-4 h-4 text-pink-600 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Order Basket</span>
            
            {/* Live Tally Notification */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
