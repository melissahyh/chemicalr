import React, { createContext, useContext, useState, useEffect } from "react";

export type Currency = "SGD" | "USD" | "GBP";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  metalType: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  metalType: string;
}

interface AppContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  currency: Currency;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  setCurrency: (currency: Currency) => void;
  setCartOpen: (isOpen: boolean) => void;
  setWishlistOpen: (isOpen: boolean) => void;
  convertPrice: (priceInSGD: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CURRENCY_RATES: Record<Currency, number> = {
  SGD: 1.0,
  USD: 0.74,
  GBP: 0.58,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  SGD: "SGD $",
  USD: "USD $",
  GBP: "GBP £",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("chemical_r_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem("chemical_r_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem("chemical_r_currency");
    return (saved as Currency) || "SGD";
  });

  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("chemical_r_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("chemical_r_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("chemical_r_currency", currency);
  }, [currency]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isInWishlist = (id: string) => wishlist.some((i) => i.id === id);

  const setCurrency = (curr: Currency) => setCurrencyState(curr);

  const convertPrice = (priceInSGD: number) => {
    const rate = CURRENCY_RATES[currency];
    const converted = priceInSGD * rate;
    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString("en-SG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        isCartOpen,
        isWishlistOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        setCurrency,
        setCartOpen,
        setWishlistOpen,
        convertPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
