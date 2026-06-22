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
  image?: string;
}

const MOCK_CATALOG: MedicalProduct[] = [
  {
    id: "prod-1",
    name: "Rinda-XT Digital Micro-Centrifuge Professional",
    category: "Laboratory equipment",
    sku: "RD-LAB-CEN",
    price: 145000,
    description: "Brushless high-speed diagnostic centrifuge with automated imbalance monitoring and climate protection locks.",
    in_stock: true,
  },
  {
    id: "prod-2",
    name: "Premium Multi-Channel Pipette Kit Pro",
    category: "Laboratory reagents and consumables",
    sku: "RD-LAB-PIP",
    price: 34500,
    description: "Autoclavable high-precision fluid isolation pipettes with an ergonomic finger rest hook geometry.",
    in_stock: true,
  },
  {
    id: "prod-3",
    name: "Specialized Surgical Hemostatic Forceps Kit",
    category: "Surgical consumables",
    sku: "RD-SUR-FOR",
    price: 12800,
    description: "Clinical grade stainless steel surgical clamp kit. Pack of 10 sterile individual sterile packs.",
    in_stock: true,
  },
  {
    id: "prod-4",
    name: "Digital Hemoglobin Analyzer Pro V4",
    category: "Medical equipment",
    sku: "RD-MED-HEM",
    price: 89000,
    description: "Instant capillary blood measurement module with automatic temperature diagnostic adjustments.",
    in_stock: true,
  },
  {
    id: "prod-5",
    name: "Heavy-Duty Industrial Liquid Mixing Module",
    category: "Industrial equipment",
    sku: "RD-IND-MIX",
    price: 380000,
    description: "High-torque multi-speed fluid processing station engineered for industrial chemical synthesis controls.",
    in_stock: false,
  },
  {
    id: "prod-6",
    name: "Sterile Polystyrene Petri Dishes (Pack of 500)",
    category: "Laboratory reagents and consumables",
    sku: "RD-LAB-PET",
    price: 18500,
    description: "Optically clear gas-vented stackable dish layouts engineered for optimal fast tissue cultures.",
    in_stock: true,
  }
];

export default function CatalogPage() {
  const { addToCart, cart } = useCart();
  const [products, setProducts] = useState<MedicalProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All Categories", 
    "Medical equipment", 
    "Surgical consumables", 
    "Laboratory equipment", 
    "Laboratory reagents and consumables", 
    "Industrial equipment"
  ];

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
      {/* Premium Institutional Dark Wine/Slate Hero Section */}
      <section className="w-full bg-gradient-to-r from-slate-900 via-rose-950 to-slate-950 text-white py-16 md:py-24 px-4 shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <span className="bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 backdrop-blur-sm">
            <Beaker className="w-3.5 h-3.5" /> High-Fidelity Enterprise Procurement
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight text-white">
            Specialized Surgical Equipment, Scientific Instruments & Industrial Supplies.
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Rinda Diagnostics outfits healthcare channels, research laboratories, and manufacturing centers with certified surgical equipment and consumables, advanced scientific instruments, and robust industrial supplies built to international regulatory standards.
          </p>
          
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-xs font-semibold text-slate-300">
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" /> Surgical Certified
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" /> Scientific Precision
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" /> Industrial Grade
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" /> Institutional Contracts
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Search Bar & Cross-Browser Scroll-Hidden Sorters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 justify-between items-center">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search catalog by equipment name, category sector, or unique SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-rose-900 focus:bg-white text-sm pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all placeholder:text-slate-400 text-slate-800"
            />
          </div>
          
          {/* Smooth, Scrollbar-Hidden Navigation Pills Wrapper */}
          <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mr-1 hidden lg:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl border whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? "bg-rose-950 border-rose-950 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-950"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Balanced Product Procurement Display Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="w-full py-20 text-center text-sm font-semibold text-slate-500 tracking-wide">
            Assembling procurement inventory rows...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="w-full bg-white border border-dashed border-slate-300 py-16 rounded-2xl text-center max-w-xl mx-auto mt-6">
            <Layers className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700">No matching assets found in this sector</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const basketMatch = cart.find(i => i.id === product.id);
              const inBasketCount = basketMatch ? basketMatch.quantity : 0;

              return (
                <div key={product.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-rose-950 bg-rose-50 px-2.5 py-1 rounded-lg font-semibold">{product.category}</span>
                      <span className="text-slate-400 font-mono">SKU: {product.sku}</span>
                    </div>

                    {/* Image Placeholder Frame Container */}
                    <div className="w-full h-44 bg-slate-50 border border-slate-100 rounded-xl relative overflow-hidden flex items-center justify-center my-2">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Beaker className="w-8 h-8 text-slate-300 mx-auto mb-1 animate-pulse" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Awaiting Image Upload</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-950 transition-colors leading-snug pt-1">
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
                      type="button"
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                      disabled={!product.in_stock}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                        !product.in_stock
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                          : inBasketCount > 0 
                          ? "bg-rose-950 text-white shadow-sm border border-rose-950 hover:bg-rose-900"
                          : "bg-white border border-slate-200 text-rose-950 hover:bg-slate-50"
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
