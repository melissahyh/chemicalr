import React from "react";
import { useApp } from "@/contexts/AppContext";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    convertPrice,
  } = useApp();

  if (!isCartOpen) return null;

  // Free shipping threshold is SGD $150
  const FREE_SHIPPING_THRESHOLD = 150;
  const cartSubtotalSGD = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const percentToFreeShipping = Math.min((cartSubtotalSGD / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - cartSubtotalSGD;

  const handleCheckout = () => {
    toast.success("Redirecting securely to Shopify checkout...");
    setTimeout(() => {
      window.location.href = "https://kinnstudio.com/checkout";
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-in-right text-[#330505] border-l border-[#EFE1D3]">
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#EFE1D3]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#7F0F1D]" />
            <span className="font-serif text-lg tracking-[0.15em] font-light uppercase">
              Your Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 -mr-2 text-[#330505] hover:text-[#7F0F1D] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress (CRO Booster) */}
        {cart.length > 0 && (
          <div className="bg-[#F9F6F0] border-b border-[#EFE1D3] p-5 space-y-2">
            <p className="text-[10px] tracking-wider uppercase text-[#665555] font-sans font-medium text-center">
              {percentToFreeShipping >= 100 ? (
                <span className="text-[#7F0F1D] font-semibold">🎉 You've unlocked Free Insured Shipping!</span>
              ) : (
                <>
                  Spend another <span className="font-semibold">{convertPrice(remainingForFreeShipping)}</span> for free insured Singapore shipping
                </>
              )}
            </p>
            <div className="w-full bg-[#EFE1D3] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#7F0F1D] h-full transition-all duration-500 ease-out"
                style={{ width: `${percentToFreeShipping}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#F9F6F0] rounded-full flex items-center justify-center border border-[#EFE1D3]">
                <ShoppingBag size={24} className="text-[#665555]" />
              </div>
              <p className="font-serif text-lg italic text-[#665555]">Your shopping bag is empty.</p>
              <Button
                onClick={() => setCartOpen(false)}
                className="bg-[#7F0F1D] hover:bg-[#330505] text-white rounded-none text-xs tracking-widest uppercase font-sans px-6 py-3"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
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
                          onClick={() => removeFromCart(item.id)}
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
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#EFE1D3] bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#665555] hover:text-[#7F0F1D] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-2.5 text-xs font-sans text-[#330505] font-light">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#665555] hover:text-[#7F0F1D] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="font-serif text-sm text-[#7F0F1D] font-medium">
                        {convertPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {cart.length > 0 && (
          <div className="border-t border-[#EFE1D3] p-6 bg-[#F9F6F0] space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-xs tracking-widest uppercase text-[#665555] font-medium">Subtotal</span>
              <span className="font-serif text-xl text-[#7F0F1D] font-semibold">{convertPrice(cartSubtotalSGD)}</span>
            </div>
            <p className="text-[9px] font-sans font-light text-[#665555]/80 leading-relaxed">
              Taxes and insured Singapore shipping calculated at checkout. Pieces are handcrafted on demand in our Duxton Hill studio.
            </p>
            <Button
              onClick={handleCheckout}
              className="w-full bg-[#7F0F1D] hover:bg-[#330505] text-white py-6 rounded-none text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
