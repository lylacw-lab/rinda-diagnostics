"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { 
  ArrowLeft, 
  Trash2, 
  Building2, 
  Truck, 
  CreditCard, 
  ChevronRight, 
  Plus, 
  Minus,
  CheckCircle2
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  
  // Procurement Form States
  const [facilityName, setFacilityName] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryRegion, setDeliveryRegion] = useState("Nairobi Central Hub");
  const [paymentMethod, setPaymentMethod] = useState("Corporate Invoice");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = getCartTotal();
  // Standard clinical cold-chain handling fee calculation
  const shippingFee = subtotal > 100000 ? 0 : 3500; 
  const grandTotal = subtotal + shippingFee;

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto my-20 px-4 text-center space-y-6">
        <div className="bg-pink-100 text-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm border border-pink-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Procurement Request Lodged</h2>
        <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
          An automated proforma invoice has been generated for <span className="font-semibold text-slate-800">{facilityName || "your institution"}</span>. Our logistics dispatch desk will call you shortly to confirm delivery timelines.
        </p>
        <button 
          onClick={() => { clearCart(); window.location.href = "/"; }}
          className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-sm"
        >
          Return to Supply Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors mb-6 group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to Supply Catalog
        </Link>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          Procurement Checkout Desk
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white border border-pink-100 p-12 rounded-2xl text-center shadow-sm max-w-md mx-auto">
            <p className="text-sm font-bold text-slate-700">Your procurement basket is empty</p>
            <p className="text-xs text-slate-400 mt-1 mb-6">Select equipment or reagents from our storefront catalog first.</p>
            <Link href="/" className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm">
              Browse Supplies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT AREA: CURRENT BASKET ITEMS LISTING */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                  <span>1. Review Bulk Order Batch</span>
                </h3>
                
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 first:pt-0 last:pb-0">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">{item.name}</h4>
                        <p className="text-xs text-slate-400 font-mono">Unit: Ksh {item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                        {/* Interactive Quantity Adjusters */}
                        <div className="flex items-center border border-slate-200 bg-slate-50 rounded-xl p-1">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-white rounded-lg text-slate-500 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-white rounded-lg text-slate-500 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Final Item Stack Price and Removal Trash Bin */}
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-extrabold text-slate-900 w-24 text-right">
                            Ksh {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button 
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-pink-600 p-1.5 rounded-lg hover:bg-pink-50 transition-all"
                            title="Remove from batch"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
                        {/* RIGHT AREA: PROCUREMENT INTAKE FORM & INVOICE SUMMARY */}
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                // Artificial delivery delay simulation for UX feedback
                await new Promise((resolve) => setTimeout(resolve, 1200));
                setIsSubmitting(false);
                setOrderComplete(true);
              }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Institution Information Details Block */}
              <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-pink-600" />
                  <span>2. Facility Logistics Profile</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Hospital / Laboratory Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Rinda Health Lab Center"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-pink-500 focus:bg-white text-slate-800 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Procurement Officer *
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Full Name"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-pink-500 focus:bg-white text-slate-800 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Official Telephone *
                      </label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+254 7..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-pink-500 focus:bg-white text-slate-800 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Corporate Email *
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="procurement@facility.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-pink-500 focus:bg-white text-slate-800 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Dispatch Logistics Hub
                      </label>
                      <select 
                        value={deliveryRegion}
                        onChange={(e) => setDeliveryRegion(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-pink-500 focus:bg-white text-slate-800 transition-all cursor-pointer"
                      >
                        <option>Nairobi Central Hub</option>
                        <option>Mombasa Transit Node</option>
                        <option>Kisumu Lakeside Cluster</option>
                        <option>Eldoret Highlands Point</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Payment Parameter
                      </label>
                      <select 
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-xs px-3 py-2.5 rounded-xl outline-none focus:border-pink-500 focus:bg-white text-slate-800 transition-all cursor-pointer"
                      >
                        <option>Corporate Invoice (Net 30)</option>
                        <option>Lipa na M-Pesa Till</option>
                        <option>Bank Wire Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proforma Ledger Totals & Submission Actions */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 border-b-4 border-pink-600">
                <h3 className="text-xs font-bold uppercase tracking-widest text-pink-400 pb-2 border-b border-slate-800 flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Proforma Ledger Ledger Summary</span>
                </h3>

                <div className="space-y-2 text-xs font-medium text-slate-400">
                  <div className="flex justify-between">
                    <span>Supply Subtotal:</span>
                    <span className="text-white font-mono">Ksh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Cold-Chain Freight:
                    </span>
                    <span className="text-white font-mono">
                      {shippingFee === 0 ? "FREE (Bulk Waived)" : `Ksh ${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-white font-bold text-sm">Estimated Total:</span>
                    <span className="text-pink-400 text-xl font-black font-mono">
                      Ksh {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed mt-4 group"
                >
                  {isSubmitting ? (
                    <span>Registering Batch Fields...</span>
                  ) : (
                    <>
                      <span>Transmit Procurement Order</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
