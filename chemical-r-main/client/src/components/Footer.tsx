import React from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Footer() {
  return (
    <footer className="bg-[#330505] text-white py-16 border-t border-[#7F0F1D]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Logo & Brand statement */}
          <div className="space-y-4 md:col-span-2">
            <h2 className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-[#EFE1D3] font-light">
              CHEMICAL <span className="italic font-normal font-serif text-[#7F0F1D]">R</span>
            </h2>
            <p className="text-xs font-sans font-light text-[#EFE1D3]/70 max-w-sm leading-relaxed">
              Singapore's premier fine jewellery destination. Creating sustainable, modern heirlooms designed to accompany your lifetime of memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#EFE1D3] font-sans font-semibold">
              Shop & Explore
            </h4>
            <ul className="space-y-2 text-xs font-sans font-light text-[#EFE1D3]/80">
              <li>
                <Link href="/">
                  <span className="cursor-pointer hover:text-[#7F0F1D] transition-colors">
                    Shop All
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="cursor-pointer hover:text-[#7F0F1D] transition-colors">
                    New Arrivals
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <span className="cursor-pointer hover:text-[#7F0F1D] transition-colors">
                    Shipping & Returns
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Region */}
          <div className="space-y-4">
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-[#EFE1D3] font-sans font-semibold">
              Connect
            </h4>
            <div className="flex space-x-4 text-xs font-sans font-light text-[#EFE1D3]/80">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7F0F1D] transition-colors">
                Instagram
              </a>
              <span>&bull;</span>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#7F0F1D] transition-colors">
                TikTok
              </a>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 text-[10px] tracking-wider uppercase font-sans font-medium rounded-full text-[#EFE1D3]">
                SGD 🇸🇬
              </span>
            </div>
          </div>

        </div>

        <div className="border-t border-[#EFE1D3]/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-[10px] font-sans font-light text-[#EFE1D3]/50 gap-4">
          <span>&copy; 2026 Chemical R. All Rights Reserved.</span>
          <div className="flex space-x-6">
            <Link href="/terms">
              <span className="cursor-pointer hover:text-[#EFE1D3] transition-colors">
                Terms & Privacy
              </span>
            </Link>
            <Link href="/contact">
              <span className="cursor-pointer hover:text-[#EFE1D3] transition-colors">
                Contact
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
