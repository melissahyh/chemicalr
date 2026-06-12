import React from "react";
import Header from "@/components/Header";
import { Sparkles, Quote } from "lucide-react";

import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#330505]">
      <Header onCategorySelect={() => {}} onCollectionSelect={() => {}} />
      <main className="flex-grow">
        
        {/* Page Hero */}
        <section className="relative py-20 md:py-32 bg-[#F9F6F0] border-b border-[#EFE1D3]">
          <div className="container text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#7F0F1D] font-sans font-semibold">
              The Atelier Story
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-[#330505]">
              About Chemical R
            </h1>
            <p className="text-sm font-sans font-light leading-relaxed text-[#665555] max-w-xl mx-auto">
              Bridging structural precision with custom calligraphy to create fine jewellery designed to last a lifetime.
            </p>
          </div>
        </section>

        {/* Founder & Story Section */}
        <section className="py-16 md:py-28 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Image Frame */}
              <div className="aspect-[4/5] bg-[#F9F6F0] overflow-hidden border border-[#EFE1D3]">
                <img
                  src="/manus-storage/brand-story_f83594da.jpg"
                  alt="Melissa Hui, Founder of Chemical R"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Story Details */}
              <div className="space-y-6">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#665555] font-sans font-semibold flex items-center gap-2">
                  <Sparkles size={14} className="text-[#7F0F1D]" />
                  Meet the Founder
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-[#330505]">
                  Melissa Hui
                </h2>
                <p className="text-sm font-sans font-light leading-relaxed text-[#330505]/90">
                  Chemical R was founded in Singapore by **Melissa Hui**, a designer obsessed with the delicate chemistry between metal, light, and personal legacy. After years in fine arts and product design, Melissa sought to create a brand that moved away from transient fashion cycles, focusing instead on permanent, hand-crafted "modern heirlooms."
                </p>
                
                <div className="border-l-2 border-[#7F0F1D] pl-6 py-2 space-y-2">
                  <Quote size={20} className="text-[#7F0F1D] opacity-45" />
                  <p className="font-serif italic text-base md:text-lg text-[#330505] leading-relaxed">
                    "Jewellery is more than ornament; it is an intimate container of memory. When we craft a piece at Chemical R, we are designing a companion that will absorb your milestones, be passed down generations, and retain its beautiful luster through it all."
                  </p>
                  <span className="block text-[10px] tracking-widest uppercase font-sans font-semibold text-[#665555] mt-1">
                    &mdash; Melissa Hui, Founder
                  </span>
                </div>

                <p className="text-sm font-sans font-light leading-relaxed text-[#330505]/90">
                  Melissa's design philosophy is grounded in Singapore's unique position as a global crossroads—where traditional heritage craftsmanship meets sleek modern minimalism.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Our Craftsmanship Values */}
        <section className="py-16 md:py-24 bg-[#F9F6F0] border-t border-b border-[#EFE1D3]">
          <div className="container">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#665555] font-sans font-light">
                Our Standards
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#330505] font-light mt-1">
                The Atelier Principles
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              
              {/* Value 1 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-serif italic text-3xl text-[#7F0F1D]">01</span>
                <h4 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#330505]">
                  Sustainable High-Purity Gold
                </h4>
                <p className="text-xs font-sans font-light text-[#665555] leading-relaxed">
                  We use 100% recycled gold in our 18K, 20K, and 24K creations. By minimizing our mining footprint, we preserve the Earth's natural beauty while ensuring your jewellery possesses the absolute highest structural integrity.
                </p>
              </div>

              {/* Value 2 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-serif italic text-3xl text-[#7F0F1D]">02</span>
                <h4 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#330505]">
                  Conflict-Free Gemstones
                </h4>
                <p className="text-xs font-sans font-light text-[#665555] leading-relaxed">
                  Every diamond and gemstone selected by Melissa Hui and her team of master gemologists is ethically sourced, conflict-free, and fully traceable, adhering to the highest standards of international transparency.
                </p>
              </div>

              {/* Value 3 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-serif italic text-3xl text-[#7F0F1D]">03</span>
                <h4 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#330505]">
                  Hand-Crafted in Singapore
                </h4>
                <p className="text-xs font-sans font-light text-[#665555] leading-relaxed">
                  We champion the preservation of traditional metalsmithing. Each Chemical R piece is hand-finished in our Singapore studio, ensuring that no two pieces are identical, carrying the distinct imprint of the artisan's touch.
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
