import React from "react";
import { Truck, ShieldCheck, RefreshCw } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Shipping() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#330505]">
      <Header onCategorySelect={() => {}} onCollectionSelect={() => {}} />
      <main className="flex-grow">
        
        {/* Page Hero */}
        <section className="relative py-20 md:py-32 bg-[#F9F6F0] border-b border-[#EFE1D3]">
          <div className="container text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#7F0F1D] font-sans font-semibold">
              Atelier Concierge
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-[#330505]">
              Shipping & Returns
            </h1>
            <p className="text-sm font-sans font-light leading-relaxed text-[#665555] max-w-xl mx-auto">
              Our priority is ensuring your exquisite pieces reach you safely and securely.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-4xl mx-auto space-y-16">
            
            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1 flex items-center gap-3">
                <Truck className="text-[#7F0F1D]" size={24} />
                <h2 className="font-serif text-2xl font-light">Delivery Services</h2>
              </div>
              <div className="md:col-span-2 space-y-4 text-sm font-sans font-light text-[#665555] leading-relaxed">
                <p>
                  We provide fully insured complimentary shipping on all orders over **SGD $150** within Singapore. For orders under SGD $150, a flat courier rate of SGD $10 applies.
                </p>
                <div className="border border-[#EFE1D3] p-4 bg-[#F9F6F0] text-xs text-[#330505] space-y-2">
                  <p className="font-semibold">Estimated Delivery Timelines:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>**In-Stock Items:** Dispatched within 2-3 business days.</li>
                    <li>**Pre-Order Items:** Crafted and shipped within 4-6 weeks.</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr className="border-[#EFE1D3]" />

            {/* Insurance Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1 flex items-center gap-3">
                <ShieldCheck className="text-[#7F0F1D]" size={24} />
                <h2 className="font-serif text-2xl font-light">Secure Insurance</h2>
              </div>
              <div className="md:col-span-2 space-y-4 text-sm font-sans font-light text-[#665555] leading-relaxed">
                <p>
                  All Chemical R packages are shipped via secure, signature-required courier services. Every package is fully insured from our atelier doors until it is signed for by you, guaranteeing absolute peace of mind.
                </p>
              </div>
            </div>

            <hr className="border-[#EFE1D3]" />

            {/* Returns Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1 flex items-center gap-3">
                <RefreshCw className="text-[#7F0F1D]" size={24} />
                <h2 className="font-serif text-2xl font-light">Atelier Returns</h2>
              </div>
              <div className="md:col-span-2 space-y-4 text-sm font-sans font-light text-[#665555] leading-relaxed">
                <p>
                  We want you to be completely enamored with your selection. Chemical R offers complimentary returns or exchanges within **14 days** of delivery for all unworn, unaltered pieces in their original packaging.
                </p>
                <p className="text-xs italic text-[#7F0F1D]">
                  Please note: Custom-sized rings, personalized items (such as the Dear Kaia Nameplate), and pre-ordered custom pieces are final sale and cannot be returned or exchanged.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
