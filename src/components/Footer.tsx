"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, Award } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-rose-950 mt-auto">
      {/* Trust & Compliance Value Bar */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50 text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Certified Quality Assurance</h4>
              <p className="text-xs text-slate-400 mt-0.5">All products meet international WHO & ISO standards.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50 text-rose-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Cold-Chain Distribution</h4>
              <p className="text-xs text-slate-400 mt-0.5">Secure, climate-controlled logistics for sensitive kits.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/50 text-rose-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Institutional Priority</h4>
              <p className="text-xs text-slate-400 mt-0.5">Bulk credit lines and custom SLA contracts for hospitals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Structural Information Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Summary Column with Corporate Logo Image Layout */}
        <div className="space-y-4 flex flex-col items-start">
          <div className="relative w-64 sm:w-72 md:w-80 h-16 sm:h-20 bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-sm shadow-inner">
            <Image 
              src="/logo.png" 
              alt="Rinda Diagnostics Logo Footer" 
              fill
              sizes="(max-w-7xl) 320px, 80px"
              className="object-contain object-left p-1"
            />
          </div>
          <p className="text-xs font-black text-rose-400 uppercase tracking-widest leading-none pl-1">
            YOUR HEALTH OUR CONCERN
          </p>
          <p className="text-xs leading-relaxed text-slate-400 pl-1">
            A leading premium medical logistics partner providing healthcare centers, universities, and commercial laboratories with high-fidelity analytical infrastructure and daily consumables.
          </p>
        </div>
        {/* Dispatch Headquarters & Contact Column */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
            Supply Headquarters
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Rinda Diagnostics Distribution Hub<br />
            Mombasa Road Commercial Zone, Suite 4B<br />
            Nairobi, Kenya
          </p>
          <p className="text-xs text-rose-400 font-medium pt-1">
            Orders: procurement@rinda-diagnostics.com
          </p>
        </div>

        {/* Operational Schedule & Timelines Column */}
        <div className="space-y-3">
          <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
            Dispatch Operations
          </h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between border-b border-slate-800/50 pb-1">
              <span>Mon — Fri (Bulk Delivery):</span>
              <span className="text-white font-mono">08:00 - 17:00</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/50 pb-1">
              <span>Saturday Dispatch:</span>
              <span className="text-white font-mono">09:00 - 13:00</span>
            </div>
            <div className="flex justify-between text-rose-400 font-medium">
              <span>Emergency Cold-Chain Support:</span>
              <span>24 / 7 Standby</span>
            </div>
          </ul>
        </div>
      </div>

      {/* Licensing Legals Footer Base */}
      <div className="bg-slate-950 py-6 border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Rinda Diagnostics Ltd. All rights reserved.</p>
          <p className="tracking-wide">Licensed Medical Supply Enterprise No. MED-PPB-88392</p>
        </div>
      </div>
    </footer>
  );
}
