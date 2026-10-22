import React, { createContext, useContext, useState, useEffect } from 'react';
import { PricingTier, PRODUCTS, Product } from '../data/products';
import {
  CartItem,
  calculateCartSummary,
  getProductPriceForTier,
} from '../utils/storeLogic';

export type ThemeMode = 'light' | 'dark';
export type Language = 'ar' | 'en';

interface StoreContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  lang: Language;
  toggleLang: () => void;
  selectedTier: PricingTier;
  setSelectedTier: (tier: PricingTier) => void;
  cart: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSummary: ReturnType<typeof calculateCartSummary>;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isTierModalOpen: boolean;
  setIsTierModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  getPrice: (product: Product) => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Default to 'light' mode so the user immediately sees the fixed high-contrast White Mode,
  // with instant 1-click toggle to the original Dark Mode!
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('nahl_theme');
    return saved === 'dark' || saved === 'light' ? saved : 'light';
  });

  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('nahl_lang');
    return saved === 'en' ? 'en' : 'ar';
  });

  // Default to 'consumer' or allow user to switch anytime; let's default to 'consumer' so prices are immediately visible and organized, while also allowing null or switching!
  // Wait: in the screenshots, cards show "حدد شريحتك لعرض السعر" until a tier is clicked, OR once a tier is clicked it shows the exact price. Let's support both! By default let's set 'consumer' or allow toggling "إخفاء الأسعار / تغيير الشريحة" so users see both behaviors! Wait—even better: on product cards, if `selectedTier` is set, it shows the price for that tier AND a small badge of the active tier, and if `selectedTier` is null, it shows "حدد شريحتك لعرض السعر" (with a 1-click inline tier selector or modal!). Let's initialize `selectedTier` to `'consumer'` so prices are organized and visible right away, with a button to switch between المستهلك / تجار الجملة والتجزئة / الوكلاء والموزعين or reset!
  const [selectedTier, setSelectedTierState] = useState<PricingTier>(() => {
    const saved = localStorage.getItem('nahl_tier');
    if (saved === 'consumer' || saved === 'wholesale' || saved === 'agent') {
      return saved;
    }
    return 'consumer';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nahl_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nahl_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTierModalOpen, setIsTierModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('nahl_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('nahl_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    if (selectedTier) {
      localStorage.setItem('nahl_tier', selectedTier);
    } else {
      localStorage.removeItem('nahl_tier');
    }
  }, [selectedTier]);

  useEffect(() => {
    localStorage.setItem('nahl_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nahl_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setThemeMode = (mode: ThemeMode) => {
    setTheme(mode);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const setSelectedTier = (tier: PricingTier) => {
    setSelectedTierState(tier);
    if (tier) {
      const tierLabels: Record<Exclude<PricingTier, null>, string> = {
        consumer:
          lang === 'ar'
            ? 'تم تفعيل شريحة أسعار المستهلك'
            : 'Consumer pricing activated',
        wholesale:
          lang === 'ar'
            ? 'تم تفعيل شريحة أسعار تجار الجملة والتجزئة'
            : 'Wholesale & Retail pricing activated',
        agent:
          lang === 'ar'
            ? 'تم تفعيل شريحة أسعار الوكلاء والموزعين'
            : 'Agents & Distributors pricing activated',
      };
      showToast(tierLabels[tier]);
    }
  };

  const addToCart = (productId: string, quantity = 1) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product || !product.inStock) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });

    showToast(
      lang === 'ar'
        ? `تمت إضافة "${product.nameAr}" إلى السلة`
        : `Added "${product.nameEn}" to cart`
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      if (product) {
        showToast(
          exists
            ? lang === 'ar'
              ? `تمت إزالة "${product.nameAr}" من المفضلة`
              : `Removed from wishlist`
            : lang === 'ar'
            ? `تمت إضافة "${product.nameAr}" إلى المفضلة`
            : `Added to wishlist`
        );
      }
      return next;
    });
  };

  const cartSummary = calculateCartSummary(cart, PRODUCTS, selectedTier);

  const getPrice = (product: Product) =>
    getProductPriceForTier(product, selectedTier);

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        setThemeMode,
        lang,
        toggleLang,
        selectedTier,
        setSelectedTier,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSummary,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        isTierModalOpen,
        setIsTierModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
        getPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};
