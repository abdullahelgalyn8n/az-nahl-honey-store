/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Link,
} from 'react-router-dom';
import { Link2, CheckCircle2, Copy } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PolicyAndAccountPage } from './pages/PolicyAndAccountPage';

const ScrollToTopAndTitle: React.FC = () => {
  const location = useLocation();
  const { lang } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const path = location.pathname;
    if (path === '/') {
      document.title =
        lang === 'ar'
          ? 'عسل نهل | الرئيسية - منتجات طبيعية 100%'
          : 'Nahl Honey | Home - 100% Natural Products';
    } else if (path === '/shop') {
      document.title =
        lang === 'ar'
          ? 'المتجر الكامل | عسل نهل'
          : 'Full Catalog | Nahl Honey';
    } else if (path.startsWith('/category/')) {
      document.title =
        lang === 'ar'
          ? 'تصفح القسم | عسل نهل'
          : 'Category | Nahl Honey';
    } else if (path.startsWith('/product/')) {
      document.title =
        lang === 'ar'
          ? 'تفاصيل المنتج | عسل نهل'
          : 'Product Details | Nahl Honey';
    } else if (path === '/about') {
      document.title =
        lang === 'ar'
          ? 'من نحن | شركة نهل للتجارة'
          : 'About Us | Nahl Trading Co.';
    } else if (path === '/contact') {
      document.title =
        lang === 'ar'
          ? 'تواصل معنا | شركة نهل للتجارة'
          : 'Contact Us | Nahl Trading Co.';
    } else if (path === '/checkout') {
      document.title =
        lang === 'ar'
          ? 'إتمام الطلب | عسل نهل'
          : 'Checkout | Nahl Honey';
    }
  }, [location.pathname, lang]);

  return null;
};

const RouteUrlInspectorBar: React.FC = () => null;

const MainShell: React.FC = () => {
  const { theme, toastMessage } = useStore();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-200 ${
        isDark
          ? 'bg-[#161411] text-[#F5EFE6]'
          : 'bg-[#FAF7F2] text-[#1C1610]'
      }`}
    >
      <ScrollToTopAndTitle />
      <Navbar />
      <RouteUrlInspectorBar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:categorySlug" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/account"
            element={<PolicyAndAccountPage mode="account" />}
          />
          <Route
            path="/policy/:policySlug"
            element={<PolicyAndAccountPage mode="policy" />}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-5 z-50 px-4 py-3 rounded-2xl bg-stone-900 text-white border border-amber-500/40 shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-bounce"
        >
          <CheckCircle2 className="w-4 h-4 text-[#E5A812] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <MainShell />
      </StoreProvider>
    </BrowserRouter>
  );
}
