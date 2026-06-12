import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    toast.success("Thank you for contacting us! Melissa Hui or our concierge team will get back to you within 24 hours.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#330505]">
      <main className="flex-grow">
        
        {/* Page Hero */}
        <section className="relative py-20 md:py-32 bg-[#F9F6F0] border-b border-[#EFE1D3]">
          <div className="container text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#7F0F1D] font-sans font-semibold">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-[#330505]">
              Contact Our Atelier
            </h1>
            <p className="text-sm font-sans font-light leading-relaxed text-[#665555] max-w-xl mx-auto">
              Whether you are looking to place a custom order or have questions about our collections, our concierge is here to assist.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Left Column: Contact Details */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-light text-[#330505]">Chemical R Atelier</h2>
                  <p className="text-sm font-sans font-light text-[#665555] leading-relaxed">
                    We welcome inquiries regarding custom gold purities, bespoke engravings, and private appointments with our founder, Melissa Hui, at our Singapore showroom.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#7F0F1D] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-xs tracking-wider uppercase font-sans font-semibold">Atelier Showroom</h4>
                      <p className="text-sm font-sans font-light text-[#665555] mt-1">
                        10 Duxton Hill, Level 3<br />
                        Singapore 089594<br />
                        <span className="text-xs italic">(By Appointment Only)</span>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <Mail className="text-[#7F0F1D] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-xs tracking-wider uppercase font-sans font-semibold">Email Us</h4>
                      <p className="text-sm font-sans font-light text-[#665555] mt-1">
                        concierge@chemicalr.com
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <Phone className="text-[#7F0F1D] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-xs tracking-wider uppercase font-sans font-semibold">Call / WhatsApp</h4>
                      <p className="text-sm font-sans font-light text-[#665555] mt-1">
                        +65 8765 4321
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="bg-[#F9F6F0] p-6 md:p-10 border border-[#EFE1D3]">
                <h3 className="font-serif text-2xl font-light text-[#330505] mb-6">Send an Inquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-sans font-semibold text-[#665555]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-[#EFE1D3] px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#7F0F1D]"
                      placeholder="Melissa Hui"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-sans font-semibold text-[#665555]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#EFE1D3] px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#7F0F1D]"
                      placeholder="melissa@example.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-sans font-semibold text-[#665555]">
                      Message / Custom Request Details
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-[#EFE1D3] px-4 py-3 text-sm font-sans focus:outline-none focus:border-[#7F0F1D]"
                      placeholder="Please share details about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#7F0F1D] hover:bg-[#330505] text-white py-4 text-xs tracking-widest uppercase font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    <span>Send Message</span>
                  </button>

                </form>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
