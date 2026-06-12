import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Box, Heart } from "lucide-react";
import { toast } from "sonner";
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

interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailDialog({
  product,
  isOpen,
  onClose,
  allProducts,
  onSelectProduct,
}: ProductDetailDialogProps) {
  if (!product) return null;

  const { addToCart, toggleWishlist, isInWishlist, convertPrice } = useApp();

  // Inject JSON-LD structured data dynamically for premium SEO
  useEffect(() => {
    if (isOpen && product) {
      const schemaId = `product-schema-${product.id}`;
      let script = document.getElementById(schemaId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = schemaId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": [product.image, product.hoverImage],
        "description": product.description,
        "sku": product.id,
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": "SGD",
          "price": product.price,
          "availability": product.stockStatus === "In-Stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
          "itemCondition": "https://schema.org/NewCondition"
        }
      });

      return () => {
        const scriptToRemove = document.getElementById(schemaId);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [isOpen, product]);

  // Find complementary products (same collection or same category, excluding current product)
  const recommendations = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      metalType: product.metalType,
    });
    toast.success(`${product.name} added to your bag!`);
  };

  const handleWishlistToggle = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      metalType: product.metalType,
    });
    if (isInWishlist(product.id)) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white border border-[#EFE1D3] text-[#330505] p-4 sm:p-6 md:p-10 overflow-y-auto max-h-[95vh] sm:max-h-[90vh] rounded-none">
        <DialogHeader className="border-b border-[#EFE1D3] pb-3 sm:pb-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#665555] font-sans font-light">
              {product.category} &mdash; {product.metalType}
            </span>
            {product.stockStatus === "Pre-Order" && (
              <span className="bg-[#7F0F1D] text-white text-[8px] sm:text-[9px] tracking-widest uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 font-sans font-medium shrink-0">
                Pre-Order
              </span>
            )}
          </div>
          <DialogTitle className="font-serif text-xl sm:text-2xl md:text-4xl text-[#330505] mt-1.5 sm:mt-2 font-light leading-tight">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Left Column: Product Image Showcase */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square w-full bg-[#F9F6F0] overflow-hidden border border-[#EFE1D3]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="aspect-square bg-[#F9F6F0] overflow-hidden border border-[#EFE1D3]">
                <img
                  src={product.hoverImage}
                  alt={`${product.name} alternate`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="aspect-square bg-[#F9F6F0] flex flex-col items-center justify-center border border-[#EFE1D3] p-2 sm:p-4 text-center">
                <Box size={20} className="text-[#7F0F1D] mb-1 sm:mb-2 shrink-0" />
                <span className="text-[8px] sm:text-[10px] font-sans tracking-wider uppercase text-[#665555] leading-tight">Dimensions Checked</span>
                <span className="text-[10px] sm:text-xs font-serif italic text-[#330505] mt-0.5 sm:mt-1">True-to-Picture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Price */}
              <div className="border-b border-[#EFE1D3] pb-4 flex items-center justify-between">
                <span className="font-serif text-2xl sm:text-3xl text-[#7F0F1D] font-light">
                  {convertPrice(product.price)}
                </span>
                <button
                  onClick={handleWishlistToggle}
                  className="p-2.5 border border-[#EFE1D3] hover:border-[#7F0F1D] transition-colors duration-300 rounded-none group"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={18}
                    className={`transition-colors duration-300 ${
                      isInWishlist(product.id)
                        ? "text-[#7F0F1D] fill-[#7F0F1D]"
                        : "text-[#665555] group-hover:text-[#7F0F1D]"
                    }`}
                  />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#665555] font-sans font-semibold">
                  The Story
                </h4>
                <p className="text-sm font-sans font-light text-[#330505] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* What's in the Box */}
              <div className="bg-[#F9F6F0] p-4 border border-[#EFE1D3] space-y-2">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-[#665555] font-sans font-semibold flex items-center gap-2">
                  <Box size={14} className="text-[#7F0F1D]" />
                  What's in the Box
                </h4>
                <p className="text-xs font-sans font-light text-[#330505] leading-relaxed">
                  {product.whatsInTheBox}
                </p>
              </div>

              {/* Luxury Guarantee */}
              <div className="space-y-1 text-xs font-sans font-light text-[#665555]">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#7F0F1D]" />
                  <span>Free insured Singapore shipping (SGD $150+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#7F0F1D]" />
                  <span>Crafted with sustainable & ethically sourced gold</span>
                </div>
              </div>
            </div>

            {/* CTA Button with touch optimization */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-[#7F0F1D] hover:bg-[#330505] text-white py-4 sm:py-6 rounded-none text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98] cursor-pointer"
            >
              <ShoppingCart size={14} className="sm:size-[16px]" />
              {product.stockStatus === "Pre-Order" ? "Pre-Order Now" : "Secure Your Piece"}
            </Button>
          </div>
        </div>

        {/* Bottom Section: You May Also Like */}
        {recommendations.length > 0 && (
          <div className="border-t border-[#EFE1D3] mt-8 sm:mt-12 pt-6 sm:pt-8">
            <h3 className="font-serif text-lg sm:text-xl text-center text-[#330505] mb-4 sm:mb-6 font-light italic">
              You May Also Like
            </h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onSelectProduct(rec)}
                  className="group cursor-pointer text-center space-y-1.5 sm:space-y-2 p-1 hover:bg-[#F9F6F0]/50 transition-colors"
                >
                  <div className="aspect-square w-full bg-[#F9F6F0] overflow-hidden border border-[#EFE1D3]">
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-[9px] sm:text-[10px] tracking-wider font-sans font-light text-[#330505] line-clamp-1 group-hover:text-[#7F0F1D] transition-colors">
                    {rec.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-serif text-[#7F0F1D] font-medium">
                    SGD ${rec.price.toLocaleString("en-SG", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
