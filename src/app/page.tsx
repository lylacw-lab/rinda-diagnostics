"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "./../context/CartContext";
import { supabase } from "./../utils/supabase";
import { 
  Beaker, 
  Layers, 
  CheckCircle2, 
  ShoppingCart, 
  Search, 
  SlidersHorizontal
} from "lucide-react";

interface MedicalProduct {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  description: string;
  in_stock: boolean;
}

const MOCK_CATALOG: MedicalProduct[] = [
  {
    id: "prod-1",
    name: "Rinda-XT Digital Micro-Centrifuge",
    category: "Laboratory Equipment",
    sku: "RD-CEN-092",
    price: 145000,
    description: "Brushless high-speed diagnostic centrifuge with automated imbalance monitoring lid lock protection.",
    in_stock: true,
  },
  {
    id: "prod-2",
    name: "Premium Multi-Channel Pipette Kit",
    category: "Consumables & Liquids",
    sku: "RD-PIP-441",
    price: 34500,
    description: "Autoclavable high-precision fluid isolation pipettes with an ergonomic finger rest hook.",
    in_stock: true,
  },
  {
    id: "prod-3",
    name: "Rapid Diagnostic Multi-Panel Assay Strips",
    category: "Diagnostic Reagents",
    sku: "RD-ASY-119",
    price: 12800,
    description: "Clinical grade pathogen screen panels. Pack of 100 sterile individual test cassettes.",
    in_stock: true,
  },
  {
    id: "prod-4",
    name: "Heavy-Duty Biohazard Disposal Container (15L)",
    category: "Clinical Infrastructure",
    sku: "RD-BIO-772",
    price: 4500,
    description: "Puncture-resistant high-density polypropylene containment block with airtight lid seal.",
    in_stock: true,
  },
  {
    id: "prod-5",
    name: "Digital Hemoglobin Analyzer Pro V4",
    category: "Diagnostic Reagents",
    sku: "RD-HEM-301",
    price: 89000,
    description: "Instant capillary blood measurement module with automatic temperature adjustments.",
    in_stock: false,
  },
  {
    id: "prod-6",
    name: "Sterile Polystyrene Petri Dishes (Pack of 500)",
    category: "Consumables & Liquids",
    sku: "RD-PET-882",
    price: 18500,
    description: "Optically clear gas-vented stackable dish layouts engineered for optimal tissue cultures.",
    in_stock: true,
  }
];

export default function CatalogPage() {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState<MedicalProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);

  const categories = ["All Categories", ...Array.from(new Set(MOCK_CATALOG.map(p => p.category)))];

  useEffect(() => {
    async function fetchCatalog() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("name", { ascending: true });

        if (error || !data || data.length === 0) {
          setProducts(MOCK_CATALOG);
        } else {
          setProducts(data as MedicalProduct[]);
        }
      } catch (err) {
        setProducts(MOCK_CATALOG);
      } finally {
        setLoading(false);
      }
    }
    fetchCatalog();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20">
      {/* Brand Hero Banner Layout */}
      <section className="w-full bg-gradient-to-r from-pink-700 via-pink-600 to-pink-800 text-white py-16 md:py-24 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <span className="bg-pink-500/30 text-pink-100 border border-pink-400/30 text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Beaker className="w-3.5 h-3.5" /> High-Fidelity Medical Infrastructure
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Engineered Accuracy for Clinical Procurement.
          </h1>
          <p className="text-pink-100/90 max-w-2xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Rinda Diagnostics outfits laboratory channels, clinical research centers, and hospital infrastructures with verified supplies built to standard.
          </p>
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs font-semibold text-pink-100">
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-pink-300 flex-shrink-0" /> Verified Batch Quality
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-pink-300 flex-shrink-0" /> Local Duty Compliant
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-pink-300 flex-shrink-0" /> Cold-Chain Tracked
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-pink-300 flex-shrink-0" /> Instant SLA Quotations
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Search Bar & Filtration Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search catalog by equipment name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-pink-500 focus:bg-white text-sm pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden lg:block mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? "bg-pink-600 border-pink-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-pink-300 hover:text-pink-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Supply Item Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="w-full py-20 text-center text-sm font-semibold text-slate-500 tracking-wide">
            Assembling clinical asset rows...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="w-full bg-white border border-dashed border-slate-300 py-16 rounded-2xl text-center max-w-xl mx-auto mt-6">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No matching medical supplies found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const basketMatch = cart.find(i => i.id === product.id);
              const inBasketCount = basketMatch ? basketMatch.quantity : 0;

              return (
                <div key={product.id} className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-pink-600 bg-pink-50 px-2.5 py-1 rounded-lg">{product.category}</span>
                      <span className="text-slate-400 font-mono">SKU: {product.sku}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-pink-600 transition-colors leading-snug pt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    <div className="pt-1">
                      {product.in_stock ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                          ● Dispatch Available
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                          ✕ Backorder Pipeline (3-5 Days)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">Unit Price</span>
                      <span className="text-lg font-extrabold text-slate-900 block mt-1">Ksh {product.price.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                      disabled={!product.in_stock}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                        !product.in_stock
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                          : inBasketCount > 0 
                          ? "bg-pink-600 text-white shadow-sm border border-pink-600 hover:bg-pink-700"
                          : "bg-white border border-pink-200 text-pink-600 hover:bg-pink-50"
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {inBasketCount > 0 ? `In Basket (${inBasketCount})` : "Add to Order"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
