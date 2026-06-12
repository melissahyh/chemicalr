import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#330505]">
      <Header onCategorySelect={() => {}} onCollectionSelect={() => {}} />
      <main className="flex-grow">
        
        {/* Page Hero */}
        <section className="relative py-20 md:py-32 bg-[#F9F6F0] border-b border-[#EFE1D3]">
          <div className="container text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#7F0F1D] font-sans font-semibold">
              Legal Framework
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-[#330505]">
              Terms & Privacy
            </h1>
            <p className="text-sm font-sans font-light leading-relaxed text-[#665555] max-w-xl mx-auto">
              Please review the terms, conditions, and privacy policies governing the Chemical R digital atelier.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-3xl mx-auto space-y-12 text-sm font-sans font-light text-[#665555] leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-light text-[#330505]">1. Overview & Scope</h2>
              <p>
                Welcome to Chemical R. These terms govern your use of our website, product inquiries, and custom consultations. By browsing or purchasing from our platform, you agree to comply with these terms in full.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-light text-[#330505]">2. Handcrafted Nature & Disclosures</h2>
              <p>
                All Chemical R fine jewellery pieces are hand-finished in our Singapore studio under the direction of founder Melissa Hui. Because each piece is unique, minor variations in metal texture, gemstone dimensions, and natural luster are expected and celebrated as part of their bespoke luxury character.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-light text-[#330505]">3. Pricing & Currency</h2>
              <p>
                All pricing displayed on our storefront is in Singapore Dollars (SGD) and is inclusive of prevailing Singapore GST where applicable. Prices are subject to adjustment based on global precious metal market fluctuations.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-light text-[#330505]">4. Privacy Policy & Data Security</h2>
              <p>
                We treat your personal data with absolute discretion. Any information collected during consultation, custom ordering, or checkout is processed securely in compliance with the Singapore Personal Data Protection Act (PDPA). We will never share or sell your details to third parties.
              </p>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
