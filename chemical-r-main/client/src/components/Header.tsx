import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Search, Menu, X, ChevronDown, Heart, Globe } from "lucide-react";
import { toast } from "sonner";
import { useApp, Currency } from "@/contexts/AppContext";

interface HeaderProps {
  onCategorySelect: (category: string) => void;
  onCollectionSelect: (collection: string) => void;
}

export default function Header({ onCategorySelect, onCollectionSelect }: HeaderProps) {
  const [, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"shop" | "collections" | "currency" | null>(null);
  const { cart, wishlist, currency, setCurrency, setCartOpen, setWishlistOpen } = useApp();

  const shopCategories = [
    "Shop All",
    "Charms / Pendants",
    "Necklaces",
    "Bracelets",
    "Earrings",
    "Rings",
    "Gift Cards",
  ];

  const collections = [
    "New",
    "Vintage",
    "Gold",
    "Silver",
    "Diamonds & Gemstones",
  ];

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setLocation("/");
    // Scroll to products section smoothly
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCollectionClick = (collection: string) => {
    onCollectionSelect(collection);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setLocation("/");
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchClick = () => {
    toast.info("Search functionality is currently integrated with Shopify's storefront search.");
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const handleWishlistClick = () => {
    setWishlistOpen(true);
  };

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
    setActiveDropdown(null);
    toast.success(`Currency switched to ${curr}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EFE1D3] transition-all duration-300 shadow-xs">
      <div className="container h-16 md:h-20 flex items-center justify-between px-4 md:px-8">
        
        {/* Mobile Hamburger Menu with enhanced touch target */}
        <button
          className="md:hidden text-[#330505] hover:text-[#7F0F1D] transition-all duration-300 p-3 -ml-3 flex items-center justify-center rounded-full hover:bg-[#F9F6F0]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Left Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-sans font-light">
          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("shop")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center space-x-1 py-4 text-[#330505] hover:text-[#7F0F1D] transition-colors">
              <span>Shop</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "shop" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "shop" && (
              <div className="absolute top-full left-0 w-56 bg-white border border-[#EFE1D3] py-4 shadow-lg animate-fade-in">
                {shopCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full text-left px-6 py-2 text-xs tracking-wider text-[#330505] hover:bg-[#EFE1D3] hover:text-[#7F0F1D] transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("collections")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center space-x-1 py-4 text-[#330505] hover:text-[#7F0F1D] transition-colors">
              <span>Collections</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "collections" ? "rotate-180" : ""}`} />
            </button>
            {activeDropdown === "collections" && (
              <div className="absolute top-full left-0 w-56 bg-white border border-[#EFE1D3] py-4 shadow-lg animate-fade-in">
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => handleCollectionClick(collection)}
                    className="w-full text-left px-6 py-2 text-xs tracking-wider text-[#330505] hover:bg-[#EFE1D3] hover:text-[#7F0F1D] transition-colors"
                  >
                    {collection}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/about">
            <span className="cursor-pointer text-[#330505] hover:text-[#7F0F1D] transition-colors py-4">About</span>
          </Link>
        </nav>

        {/* Centered Brand Logo */}
        <div className="flex-1 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex justify-center">
          <Link href="/">
            <span className="cursor-pointer flex flex-col items-center">
              <h1 className="font-serif text-xl md:text-3xl tracking-[0.25em] text-[#330505] font-light">
                CHEMICAL <span className="italic font-normal font-serif text-[#7F0F1D]">R</span>
              </h1>
              <span className="text-[8px] tracking-[0.35em] uppercase text-[#665555] -mt-1 hidden md:block">
                SINGAPORE
              </span>
            </span>
          </Link>
        </div>

        {/* Right Icons with touch optimization & App Context integration */}
        <div className="flex items-center space-x-1.5 md:space-x-4 text-[#330505]">
          {/* Currency Switcher Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("currency")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="hover:text-[#7F0F1D] transition-all duration-300 p-2 md:p-2.5 rounded-full hover:bg-[#F9F6F0] flex items-center gap-1 text-[10px] tracking-wider uppercase font-sans font-light">
              <Globe size={16} />
              <span className="hidden md:inline">{currency}</span>
            </button>
            {activeDropdown === "currency" && (
              <div className="absolute top-full right-0 w-32 bg-white border border-[#EFE1D3] py-2 shadow-lg animate-fade-in z-50">
                {(["SGD", "USD", "GBP"] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => handleCurrencyChange(curr)}
                    className={`w-full text-left px-4 py-1.5 text-xs tracking-wider font-sans transition-colors ${
                      currency === curr
                        ? "bg-[#EFE1D3] text-[#7F0F1D] font-medium"
                        : "text-[#330505] hover:bg-[#F9F6F0] hover:text-[#7F0F1D]"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearchClick}
            className="hover:text-[#7F0F1D] transition-all duration-300 p-2 md:p-2.5 rounded-full hover:bg-[#F9F6F0]"
            aria-label="Search"
          >
            <Search size={16} className="md:size-[18px]" />
          </button>

          <button
            onClick={handleWishlistClick}
            className="hover:text-[#7F0F1D] transition-all duration-300 p-2 md:p-2.5 rounded-full hover:bg-[#F9F6F0] flex items-center gap-1 relative"
            aria-label="Wishlist"
          >
            <Heart size={16} className={`md:size-[18px] ${wishlist.length > 0 ? "text-[#7F0F1D] fill-[#7F0F1D]" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 md:static text-[8px] sm:text-[9px] font-sans font-medium bg-[#7F0F1D] text-white w-4 h-4 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={handleCartClick}
            className="hover:text-[#7F0F1D] transition-all duration-300 p-2 md:p-2.5 rounded-full hover:bg-[#F9F6F0] flex items-center gap-1 relative"
            aria-label="Cart"
          >
            <ShoppingBag size={16} className="md:size-[18px]" />
            <span className="absolute -top-0.5 -right-0.5 md:static text-[8px] sm:text-[9px] font-sans font-medium bg-[#7F0F1D] text-white w-4 h-4 flex items-center justify-center rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Slide-Out Drawer (Full Height, Elegant Backdrop) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer Body */}
          <div className="relative w-[85%] max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-in-left text-[#330505] border-r border-[#EFE1D3]">
            {/* Drawer Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#EFE1D3]">
              <span className="font-serif text-lg tracking-[0.2em] font-light">ATELIER MENU</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-[#330505] hover:text-[#7F0F1D] transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-grow overflow-y-auto py-6 px-6 space-y-8">
              {/* Shop Categories Mobile */}
              <div className="space-y-4">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#665555] font-sans font-semibold">
                  Shop Categories
                </p>
                <div className="flex flex-col space-y-3">
                  {shopCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className="text-left text-sm text-[#330505] hover:text-[#7F0F1D] transition-all duration-200 font-sans font-light py-1"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-[#EFE1D3]/50" />

              {/* Collections Mobile */}
              <div className="space-y-4">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[#665555] font-sans font-semibold">
                  Collections
                </p>
                <div className="flex flex-col space-y-3">
                  {collections.map((collection) => (
                    <button
                      key={collection}
                      onClick={() => handleCollectionClick(collection)}
                      className="text-left text-sm text-[#330505] hover:text-[#7F0F1D] transition-all duration-200 font-sans font-light py-1"
                    >
                      {collection}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-[#EFE1D3]/50" />

              {/* General Links */}
              <div className="flex flex-col space-y-4">
                <Link href="/about">
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm tracking-[0.15em] uppercase text-[#330505] hover:text-[#7F0F1D] transition-colors font-sans font-medium py-1"
                  >
                    About Melissa Hui
                  </span>
                </Link>
                <Link href="/shipping">
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm tracking-[0.15em] uppercase text-[#330505] hover:text-[#7F0F1D] transition-colors font-sans font-medium py-1"
                  >
                    Shipping & Returns
                  </span>
                </Link>
                <Link href="/contact">
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm tracking-[0.15em] uppercase text-[#330505] hover:text-[#7F0F1D] transition-colors font-sans font-medium py-1"
                  >
                    Contact Showroom
                  </span>
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 bg-[#F9F6F0] border-t border-[#EFE1D3] text-center space-y-2">
              <span className="text-[10px] tracking-[0.2em] text-[#665555] font-sans font-light block">
                CHEMICAL R SINGAPORE
              </span>
              <span className="text-[9px] text-[#665555]/60 font-sans font-light block">
                &copy; 2026 Atelier
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
