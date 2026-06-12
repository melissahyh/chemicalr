import React from "react";
import { useApp } from "@/contexts/AppContext";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setWishlistOpen,
    toggleWishlist,
    addToCart,
    convertPrice,
  } = useApp();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      metalType: item.metalType,
    });
    toggleWishlist(item); // Remove from wishlist once added to cart
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setWishlistOpen(false)}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-in-right text-[#330505] border-l border-[#EFE1D3]">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#EFE1D3]">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-[#7F0F1D] fill-[#7F0F1D]" />
            <span className="font-serif text-lg tracking-[0.15em] font-light uppercase">
              Your Wishlist ({wishlist.length})
            </span>
          </div>
          <button
            onClick={() => setWishlistOpen(false)}
            className="p-2 -mr-2 text-[#330505] hover:text-[#7F0F1D] transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#F9F6F0] rounded-full flex items-center justify-center border border-[#EFE1D3]">
                <Heart size={24} className="text-[#665555]" />
              </div>
              <p className="font-serif text-lg italic text-[#665555]">Your wishlist is empty.</p>
              <Button
                onClick={() => setWishlistOpen(false)}
                className="bg-[#7F0F1D] hover:bg-[#330505] text-white rounded-none text-xs tracking-widest uppercase font-sans px-6 py-3"
              >
                Discover Pieces
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 border border-[#EFE1D3]/60 bg-[#F9F6F0]/30 hover:bg-[#F9F6F0]/60 transition-colors duration-200"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#F9F6F0] border border-[#EFE1D3] overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-light text-[#330505] line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-[#665555] hover:text-[#7F0F1D] p-1 -mr-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[9px] tracking-wider uppercase text-[#665555] font-sans font-light mt-0.5">
                        {item.metalType}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="font-serif text-sm text-[#7F0F1D] font-medium">
                        {convertPrice(item.price)}
                      </span>

                      <Button
                        onClick={() => handleMoveToCart(item)}
                        className="bg-[#7F0F1D] hover:bg-[#330505] text-white text-[10px] tracking-wider uppercase font-sans px-3 py-1.5 h-auto rounded-none flex items-center gap-1.5"
                      >
                        <ShoppingCart size={12} />
                        Add to Bag
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-[#F9F6F0] border-t border-[#EFE1D3] text-center">
          <p className="text-[10px] font-sans font-light text-[#665555]/80 leading-relaxed">
            Your custom-curated Chemical R heirlooms. Items saved here will persist across your visits to our online atelier.
          </p>
        </div>
      </div>
    </div>
  );
}
