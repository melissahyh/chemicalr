import React, { useState, useMemo } from "react";
import { ArrowRight, Filter, SlidersHorizontal, X } from "lucide-react";
import { toast } from "sonner";
import LoadingAnimation from "@/components/LoadingAnimation";
import Header from "@/components/Header";
import ProductDetailDialog from "@/components/ProductDetailDialog";
import SizeGuide from "@/components/SizeGuide";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";
import { Link } from "wouter";
import { useApp } from "@/contexts/AppContext";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  collection: string;
  metalType: string;
  stockStatus: string;
  isBestSeller?: boolean;
  isPersonalized?: boolean;
  image: string;
  hoverImage: string;
  description: string;
  whatsInTheBox: string;
}

export default function Home() {
  const { convertPrice } = useApp();
  // Loading & State
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("Shop All");
  const [selectedCollection, setSelectedCollection] = useState<string>("All");
  
  // Filters State
  const [filterStock, setFilterStock] = useState<string>("All");
  const [filterMetal, setFilterMetal] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Newest");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Selected Product for Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Hover states for product card image swaps
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const allProducts: Product[] = productsData;

  // Handle Menu Navigation Selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedCollection("All"); // Reset collection when picking category
  };

  const handleCollectionSelect = (collection: string) => {
    setSelectedCollection(collection);
    setSelectedCategory("Shop All"); // Reset category when picking collection
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category Filter
    if (selectedCategory !== "Shop All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Collection Filter
    if (selectedCollection !== "All") {
      result = result.filter((p) => p.collection === selectedCollection);
    }

    // Stock Filter
    if (filterStock !== "All") {
      result = result.filter((p) => p.stockStatus === filterStock);
    }

    // Metal Type Filter
    if (filterMetal !== "All") {
      result = result.filter((p) => p.metalType === filterMetal);
    }

    // Sorting
    if (sortBy === "Newest") {
      // Keep original order or simulate by ID descending
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Best Selling") {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [selectedCategory, selectedCollection, filterStock, filterMetal, sortBy, allProducts]);

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const scrollToShop = () => {
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#330505] selection:bg-[#EFE1D3] selection:text-[#7F0F1D]">
      {/* 1. Initial Loading Animation (💞 revolving hearts) */}
      <LoadingAnimation />

      {/* 2. Announcement Banner */}
      {isBannerVisible && (
        <div className="sticky top-0 z-50 bg-[#B5D9EA] text-[#330505] py-2.5 px-4 text-center text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans font-light flex items-center justify-between">
          <div className="flex-1 text-center">
            Complimentary Shipping on Orders Over SGD$150
          </div>
          <button
            onClick={() => setIsBannerVisible(false)}
            className="text-[#330505] hover:text-[#7F0F1D] transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 3. Header/Nav (Sticky) */}
      <Header
        onCategorySelect={handleCategorySelect}
        onCollectionSelect={handleCollectionSelect}
      />

      <main className="flex-grow">
        {/* 4. Hero Section */}
        <section className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden bg-[#EFE1D3]">
          {/* Background Editorial Image */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/manus-storage/hero_09873260.jpg')" }}>
            <div className="absolute inset-0 bg-black/15" /> {/* Subtle editorial dark overlay */}
          </div>
          
          {/* Tagline and CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white mb-3 font-sans font-light animate-fade-in">
              Fine Jewellery Made For Memories
            </span>
            <h2 className="font-serif text-4xl md:text-7xl text-white font-light tracking-wide leading-tight mb-8 drop-shadow-sm">
              Timeless. Refined. Yours.
            </h2>
            <Button
              onClick={scrollToShop}
              className="bg-[#7F0F1D] hover:bg-[#330505] text-white rounded-none px-8 py-6 text-xs tracking-[0.25em] uppercase font-sans transition-all duration-300 transform active:scale-95"
            >
              Shop New Arrivals
            </Button>
          </div>
        </section>

        {/* 5. Featured Collection Grid */}
        <section className="py-16 md:py-24 bg-white border-b border-[#EFE1D3]">
          <div className="container">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#665555] font-sans font-light">
                Curated Series
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#330505] mt-1 font-light italic">
                Shop by Collection
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gold Collection */}
              <div
                onClick={() => handleCollectionSelect("Gold")}
                className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-[#F9F6F0] border border-[#EFE1D3]"
              >
                <img
                  src="/manus-storage/product1_e294e8e5.jpg"
                  alt="Gold Collection"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-serif text-2xl tracking-wide font-light">The Gold Series</h4>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-light mt-1 flex items-center gap-1">
                    Explore Gold <ArrowRight size={12} />
                  </p>
                </div>
              </div>

              {/* Diamonds & Gemstones */}
              <div
                onClick={() => handleCollectionSelect("Diamonds & Gemstones")}
                className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-[#F9F6F0] border border-[#EFE1D3]"
              >
                <img
                  src="/manus-storage/product2_d8309087.jpg"
                  alt="Diamonds & Gemstones"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-serif text-2xl tracking-wide font-light">Diamonds & Gems</h4>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-light mt-1 flex items-center gap-1">
                    Explore Diamonds <ArrowRight size={12} />
                  </p>
                </div>
              </div>

              {/* Vintage Collection */}
              <div
                onClick={() => handleCollectionSelect("Vintage")}
                className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-[#F9F6F0] border border-[#EFE1D3]"
              >
                <img
                  src="/manus-storage/product3_6c337170.jpg"
                  alt="Vintage Collection"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="font-serif text-2xl tracking-wide font-light">Vintage Revival</h4>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-sans font-light mt-1 flex items-center gap-1">
                    Explore Vintage <ArrowRight size={12} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Product Listing & Filter Section */}
        <section id="shop-section" className="py-16 md:py-24 bg-[#F9F6F0]">
          <div className="container">
            
            {/* Category / Filter Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#EFE1D3] pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#665555] font-sans font-light">
                  {selectedCollection !== "All" ? `Collection / ${selectedCollection}` : "Chemical R Atelier"}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl text-[#330505] font-light mt-1">
                  {selectedCategory}
                </h3>
              </div>

              {/* Filter controls */}
              <div className="flex items-center gap-4 text-xs font-sans">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-[#665555] uppercase tracking-wider text-[10px]">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-[#EFE1D3] px-3 py-1.5 text-xs text-[#330505] focus:outline-none focus:border-[#7F0F1D] cursor-pointer"
                  >
                    <option value="Newest">Newest</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Best Selling">Best Selling</option>
                  </select>
                </div>

                {/* Filter Drawer Toggle */}
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="flex items-center gap-2 bg-[#7F0F1D] text-white px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-[#330505] transition-colors"
                >
                  <SlidersHorizontal size={12} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#EFE1D3] space-y-4">
                <p className="font-serif text-2xl italic text-[#665555]">No pieces match your exact criteria.</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("Shop All");
                    setSelectedCollection("All");
                    setFilterStock("All");
                    setFilterMetal("All");
                  }}
                  className="bg-[#7F0F1D] hover:bg-[#330505] text-white rounded-none text-xs tracking-widest uppercase font-sans"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => openProductDetails(product)}
                    className="group cursor-pointer flex flex-col h-full active:scale-[0.99] transition-transform duration-150 p-1 sm:p-2 hover:bg-white hover:shadow-xs border border-transparent hover:border-[#EFE1D3]/40"
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    {/* Image Frame with performance-focused lazy loading */}
                    <div className="relative aspect-square w-full bg-[#F9F6F0] overflow-hidden border border-[#EFE1D3] mb-3 sm:mb-4">
                      {/* Best Seller / Pre-Order Badge */}
                      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 sm:gap-1.5">
                        {product.isBestSeller && (
                          <span className="bg-white text-[#7F0F1D] border border-[#7F0F1D] text-[7px] sm:text-[8px] tracking-widest uppercase px-1.5 py-0.5 sm:px-2 sm:py-0.5 font-sans font-medium shadow-xs">
                            Best Seller
                          </span>
                        )}
                        {product.stockStatus === "Pre-Order" && (
                          <span className="bg-[#7F0F1D] text-white text-[7px] sm:text-[8px] tracking-widest uppercase px-1.5 py-0.5 sm:px-2 sm:py-0.5 font-sans font-medium shadow-xs">
                            Pre-Order
                          </span>
                        )}
                      </div>

                      {/* Image Transitions */}
                      <img
                        src={hoveredProductId === product.id ? product.hoverImage : product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Meta Details */}
                    <div className="flex flex-col flex-grow text-center space-y-1 px-1">
                      <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#665555] font-sans font-light">
                        {product.metalType}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base md:text-lg text-[#330505] font-light leading-snug group-hover:text-[#7F0F1D] transition-colors line-clamp-2 h-10 sm:h-12 overflow-hidden">
                        {product.name}
                      </h4>
                      <p className="font-serif text-xs sm:text-sm text-[#7F0F1D] mt-auto font-medium">
                        {convertPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* Size Guide Section */}
        <section className="py-16 md:py-24 bg-white border-t border-[#EFE1D3]">
          <div className="container max-w-4xl mx-auto">
            <SizeGuide />
          </div>
        </section>

        {/* 7. Brand Story Section */}
        <section className="py-20 md:py-32 bg-[#EFE1D3] border-t border-[#EFE1D3]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Story Content */}
              <div className="space-y-6 max-w-xl">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#7F0F1D] font-sans font-semibold">
                  The Chemical R Legacy
                </span>
                <h3 className="font-serif text-4xl md:text-5xl text-[#330505] font-light leading-tight">
                  Crafting Modern Heirlooms in Singapore
                </h3>
                <blockquote className="border-l-2 border-[#7F0F1D] pl-4 font-serif italic text-[#330505] text-lg leading-relaxed">
                  "We believe jewelry should be something you never take off. A companion to your memory, made to last a lifetime, the kind you'll invest in and pass down."
                </blockquote>
                <p className="text-sm font-sans font-light text-[#330505]/90 leading-relaxed">
                  Founded in the heart of Singapore, Chemical R blends structural geometric precision with custom organic calligraphy. Each piece is hand-crafted with 100% recycled high-purity gold and ethically sourced gemstones, celebrating milestones and personal history.
                </p>
              </div>

              {/* Story Image */}
              <div className="aspect-[4/3] bg-white overflow-hidden border border-[#EFE1D3] shadow-md">
                <img
                  src="/manus-storage/brand-story_f83594da.jpg"
                  alt="Chemical R Brand Story"
                  className="w-full h-full object-cover object-center"
                />
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Filter Drawer / Sidebar Overlay */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="w-full max-w-md bg-white h-full p-8 flex flex-col justify-between shadow-2xl animate-slide-in-right text-[#330505]">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#EFE1D3] pb-4">
              <h3 className="font-serif text-2xl font-light">Refine Selection</h3>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="text-[#330505] hover:text-[#7F0F1D] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content / Filter Controls */}
            <div className="flex-grow py-8 space-y-8 overflow-y-auto">
              {/* Stock Availability */}
              <div className="space-y-3">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#665555] font-sans font-semibold">
                  Availability
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "In-Stock", "Pre-Order"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStock(status)}
                      className={`px-4 py-2 text-xs font-sans tracking-wider border transition-all duration-200 ${
                        filterStock === status
                          ? "bg-[#7F0F1D] text-white border-[#7F0F1D]"
                          : "bg-white text-[#330505] border-[#EFE1D3] hover:border-[#7F0F1D]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Purity */}
              <div className="space-y-3">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#665555] font-sans font-semibold">
                  Metal Purity
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["All", "18K Gold", "20K Gold", "24K Gold"].map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setFilterMetal(metal)}
                      className={`px-4 py-2 text-xs font-sans tracking-wider border transition-all duration-200 ${
                        filterMetal === metal
                          ? "bg-[#7F0F1D] text-white border-[#7F0F1D]"
                          : "bg-white text-[#330505] border-[#EFE1D3] hover:border-[#7F0F1D]"
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="border-t border-[#EFE1D3] pt-6 space-y-3">
              <Button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-[#7F0F1D] hover:bg-[#330505] text-white py-4 rounded-none text-xs tracking-widest uppercase font-sans transition-colors"
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFilterStock("All");
                  setFilterMetal("All");
                  setIsFilterDrawerOpen(false);
                }}
                className="w-full border-[#EFE1D3] text-[#330505] hover:bg-[#F9F6F0] hover:text-[#7F0F1D] py-4 rounded-none text-xs tracking-widest uppercase font-sans transition-colors"
              >
                Reset All
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* Product Detail Dialog (Modal) */}
      <ProductDetailDialog
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        allProducts={allProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

    </div>
  );
}
