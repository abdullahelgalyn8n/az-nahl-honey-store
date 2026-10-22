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

const RouteUrlInspectorBar: React.FC = () => {
  const location = useLocation();
  const { theme, lang, showToast } = useStore();
  const isDark = theme === 'dark';

  const currentUrl = `${location.pathname}${location.search}`;

  const quickRoutes = [
    { path: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
    { path: '/shop', labelAr: 'المتجر', labelEn: 'Shop' },
    {
      path: '/product/15-kg-jerrycan-of-sesame-oil',
      labelAr: 'منتج: زيت السمسم 15ك',
      labelEn: 'Product: Sesame Oil 15kg',
    },
    { path: '/about', labelAr: 'من نحن', labelEn: 'About' },
    { path: '/contact', labelAr: 'تواصل معنا', labelEn: 'Contact' },
    { path: '/checkout', labelAr: 'الدفع', labelEn: 'Checkout' },
  ];

  return (
    <div
      className={`w-full border-b text-xs transition-colors ${
        isDark
          ? 'bg-[#1A1713] border-stone-800/80 text-stone-300'
          : 'bg-stone-100/90 border-stone-200/90 text-stone-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Current Dedicated Page Link */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`inline-flex items-center gap-1 font-bold shrink-0 ${
              isDark ? 'text-amber-400' : 'text-amber-800'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'رابط الصفحة:' : 'Page URL:'}</span>
          </span>
          <code
            dir="ltr"
            className={`px-2 py-0.5 rounded font-mono text-[11px] truncate max-w-[220px] sm:max-w-xs border ${
              isDark
                ? 'bg-black/40 border-stone-800 text-amber-300'
                : 'bg-white border-stone-300 text-stone-900'
            }`}
          >
            https://nahl.store{currentUrl}
          </code>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              showToast(
                lang === 'ar'
                  ? `تم نسخ الرابط: ${currentUrl}`
                  : `Copied link: ${currentUrl}`
              );
            }}
            aria-label={lang === 'ar' ? 'نسخ رابط الصفحة' : 'Copy page URL'}
            className={`p-1 rounded hover:bg-amber-500/20 transition-colors cursor-pointer ${
              isDark ? 'text-stone-400 hover:text-amber-300' : 'text-stone-600 hover:text-amber-800'
            }`}
            title={lang === 'ar' ? 'نسخ الرابط' : 'Copy URL'}
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Route Switcher Pills */}
        <div className="hidden xl:flex items-center gap-1.5">
          <span className="text-[11px] opacity-70 ml-1">
            {lang === 'ar' ? 'انتقال سريع للروابط:' : 'Quick Links:'}
          </span>
          {quickRoutes.map((r) => {
            const active = location.pathname === r.path;
            return (
              <Link
                key={r.path}
                to={r.path}
                className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${
                  active
                    ? 'bg-[#E5A812] text-stone-950'
                    : isDark
                    ? 'bg-stone-800/70 text-stone-300 hover:text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:border-amber-500'
                }`}
              >
                {lang === 'ar' ? r.labelAr : r.labelEn}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

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
