import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Menu,
  X,
  Heart,
  Layers,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    lang,
    toggleLang,
    cartSummary,
    setIsCartOpen,
    selectedTier,
    setIsTierModalOpen,
    wishlist,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Close menus on route change
  useEffect(() => {
    setIsShopMenuOpen(false);
    setIsMobileMenuOpen(false);
    setShowSuggestions(false);
  }, [location.pathname, location.search]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    } else {
      navigate('/shop');
    }
  };

  const matchingProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.nameAr.includes(searchQuery.trim()) ||
          p.nameEn.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          p.categoryNameAr.includes(searchQuery.trim())
      ).slice(0, 5)
    : [];

  const tierBadgeText =
    selectedTier === 'agent'
      ? lang === 'ar'
        ? 'شريحة الوكلاء'
        : 'Agents Tier'
      : selectedTier === 'wholesale'
      ? lang === 'ar'
        ? 'شريحة الجملة'
        : 'Wholesale Tier'
      : selectedTier === 'consumer'
      ? lang === 'ar'
        ? 'شريحة المستهلك'
        : 'Consumer Tier'
      : lang === 'ar'
      ? 'حدد شريحتك'
      : 'Select Tier';

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Slim Top Announcement Bar */}
      <div
        className={`w-full py-1.5 px-4 text-xs font-bold border-b transition-colors ${
          isDark
            ? 'bg-[#2C2415] text-amber-300 border-amber-500/20'
            : 'bg-amber-100/90 text-amber-950 border-amber-300/70'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-4 truncate text-[11px] sm:text-xs">
            <span className="truncate">
              {lang === 'ar'
                ? 'نهل .. الحصول على المنتج الطبيعي أصبح أسهل'
                : 'Nahl .. Getting 100% natural honey is now easier'}
            </span>
            <span className="hidden md:inline opacity-60">•</span>
            <span className="hidden md:inline">
              {lang === 'ar'
                ? 'شحن مجاني للطلبات فوق 500 جنيه لجميع المحافظات'
                : 'Free shipping on orders over 500 EGP nationwide'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsTierModalOpen(true)}
            className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold transition-colors cursor-pointer ${
              isDark
                ? 'bg-amber-400/20 text-amber-300 hover:bg-amber-400/30'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{tierBadgeText}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full border-b transition-colors ${
          isDark
            ? 'bg-[#12100E]/95 border-stone-800 text-white'
            : 'bg-white/95 border-stone-200 text-stone-900 shadow-xs'
        } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-6">
          {/* Zone 1: Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-stone-950 border border-amber-500/40 flex items-center justify-center shadow-sm group-hover:border-amber-400 transition-colors">
              {/* Honeycomb SVG Emblem */}
              <svg
                viewBox="0 0 40 40"
                className="w-7 h-7 text-[#E5A812]"
                fill="currentColor"
              >
                <polygon points="20,4 27,8 27,16 20,20 13,16 13,8" />
                <polygon
                  points="28,17 35,21 35,29 28,33 21,29 21,21"
                  opacity="0.85"
                />
                <polygon
                  points="12,17 19,21 19,29 12,33 5,29 5,21"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg md:text-xl font-black tracking-tight leading-none whitespace-nowrap ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {lang === 'ar' ? 'عسل نهل' : 'Nahl Honey'}
              </span>
              <span
                className={`text-[11px] font-semibold mt-1 whitespace-nowrap ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}
              >
                {lang === 'ar' ? 'منتجات طبيعية 100%' : '100% Natural Products'}
              </span>
            </div>
          </Link>

          {/* Zone 2: Primary Navigation Links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center gap-6 text-sm font-bold"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `py-2 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? isDark
                      ? 'border-amber-400 text-amber-400'
                      : 'border-amber-600 text-amber-700'
                    : isDark
                    ? 'border-transparent text-stone-300 hover:text-white'
                    : 'border-transparent text-stone-700 hover:text-stone-950'
                }`
              }
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </NavLink>

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsShopMenuOpen(true)}
              onMouseLeave={() => setIsShopMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => navigate('/shop')}
                aria-expanded={isShopMenuOpen}
                className={`py-2 inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors border-b-2 cursor-pointer ${
                  location.pathname.startsWith('/shop') ||
                  location.pathname.startsWith('/category')
                    ? isDark
                      ? 'border-amber-400 text-amber-400'
                      : 'border-amber-600 text-amber-700'
                    : isDark
                    ? 'border-transparent text-stone-300 hover:text-white'
                    : 'border-transparent text-stone-700 hover:text-stone-950'
                }`}
              >
                <span>{lang === 'ar' ? 'المتجر' : 'Shop'}</span>
                <ChevronDown className="w-4 h-4 opacity-75" />
              </button>

              {isShopMenuOpen && (
                <div
                  className={`absolute top-full right-0 w-64 pt-2 z-50`}
                >
                  <div
                    className={`rounded-2xl border p-2 shadow-xl ${
                      isDark
                        ? 'bg-[#1D1A16] border-stone-800 text-stone-200'
                        : 'bg-white border-stone-200 text-stone-800'
                    }`}
                  >
                    <Link
                      to="/shop"
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isDark
                          ? 'hover:bg-amber-500/15 hover:text-amber-400'
                          : 'hover:bg-amber-50 hover:text-amber-800'
                      }`}
                    >
                      <span>
                        {lang === 'ar' ? 'جميع المنتجات' : 'All Products'}
                      </span>
                      <span className="opacity-60 tabular-nums">
                        ({PRODUCTS.length})
                      </span>
                    </Link>
                    <div
                      className={`my-1 border-t ${
                        isDark ? 'border-stone-800' : 'border-stone-100'
                      }`}
                    />
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          isDark
                            ? 'hover:bg-amber-500/15 hover:text-amber-400'
                            : 'hover:bg-amber-50 hover:text-amber-800'
                        }`}
                      >
                        <span>
                          {lang === 'ar' ? cat.nameAr : cat.nameEn}
                        </span>
                        <span className="opacity-60 tabular-nums">
                          ({cat.count})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `py-2 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? isDark
                      ? 'border-amber-400 text-amber-400'
                      : 'border-amber-600 text-amber-700'
                    : isDark
                    ? 'border-transparent text-stone-300 hover:text-white'
                    : 'border-transparent text-stone-700 hover:text-stone-950'
                }`
              }
            >
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `py-2 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  isActive
                    ? isDark
                      ? 'border-amber-400 text-amber-400'
                      : 'border-amber-600 text-amber-700'
                    : isDark
                    ? 'border-transparent text-stone-300 hover:text-white'
                    : 'border-transparent text-stone-700 hover:text-stone-950'
                }`
              }
            >
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </NavLink>
          </nav>

          {/* Search Bar */}
          <div
            ref={searchRef}
            className="hidden md:block relative flex-1 max-w-sm lg:max-w-md"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={
                  lang === 'ar'
                    ? 'ابحث عن عسل، طحينة، زيت، تمور...'
                    : 'Search for honey, tahini, oil, dates...'
                }
                aria-label={
                  lang === 'ar' ? 'ابحث عن منتجات' : 'Search products'
                }
                className={`w-full py-2 pr-4 pl-10 rounded-xl border text-xs md:text-sm transition-all focus:outline-none ${
                  isDark
                    ? 'bg-[#1D1A16] border-stone-800 text-white placeholder-stone-400 focus:border-amber-400'
                    : 'bg-stone-100/90 border-stone-300 text-stone-900 placeholder-stone-500 focus:bg-white focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20'
                }`}
              />
              <button
                type="submit"
                aria-label={lang === 'ar' ? 'بحث' : 'Search'}
                className={`absolute left-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md cursor-pointer ${
                  isDark
                    ? 'text-stone-400 hover:text-amber-400'
                    : 'text-stone-600 hover:text-amber-700'
                }`}
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Instant Search Results Dropdown */}
            {showSuggestions && matchingProducts.length > 0 && (
              <div
                className={`absolute top-full inset-x-0 mt-2 rounded-2xl border p-2 shadow-xl z-50 ${
                  isDark
                    ? 'bg-[#1D1A16] border-stone-800'
                    : 'bg-white border-stone-200'
                }`}
              >
                {matchingProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    to={`/product/${prod.slug}`}
                    onClick={() => setShowSuggestions(false)}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${
                      isDark ? 'hover:bg-stone-800/70' : 'hover:bg-stone-100'
                    }`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.nameAr}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 bg-stone-900"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-bold truncate ${
                          isDark ? 'text-white' : 'text-stone-900'
                        }`}
                      >
                        {lang === 'ar' ? prod.nameAr : prod.nameEn}
                      </p>
                      <p
                        className={`text-[11px] ${
                          isDark ? 'text-stone-400' : 'text-stone-500'
                        }`}
                      >
                        {lang === 'ar'
                          ? prod.categoryNameAr
                          : prod.categoryNameEn}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-extrabold tabular-nums ${
                        isDark ? 'text-amber-400' : 'text-amber-700'
                      }`}
                    >
                      {prod.prices.consumer} {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Zone 3: Controls & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle (White Mode / Dark Mode) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark
                  ? lang === 'ar'
                    ? 'تفعيل الوضع الفاتح (الوايت مود)'
                    : 'Switch to Light Mode'
                  : lang === 'ar'
                  ? 'تفعيل الوضع الداكن'
                  : 'Switch to Dark Mode'
              }
              title={
                isDark
                  ? lang === 'ar'
                    ? 'الوضع الفاتح'
                    : 'Light Mode'
                  : lang === 'ar'
                  ? 'الوضع الداكن'
                  : 'Dark Mode'
              }
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isDark
                  ? 'bg-[#1D1A16] border-stone-800 text-amber-400 hover:bg-stone-800'
                  : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-amber-50 hover:border-amber-400'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4" />
                  <span className="hidden xl:inline">
                    {lang === 'ar' ? 'وايت مود' : 'Light'}
                  </span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-amber-700" />
                  <span className="hidden xl:inline">
                    {lang === 'ar' ? 'دارك مود' : 'Dark'}
                  </span>
                </>
              )}
            </button>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={
                lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'
              }
              className={`hidden sm:inline-flex px-2.5 py-2 rounded-xl border text-xs font-bold items-center gap-1 transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#1D1A16] border-stone-800 text-stone-200 hover:bg-stone-800'
                  : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-stone-200/70'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Account / Wholesale Portal Link */}
            <Link
              to="/account"
              aria-label={
                lang === 'ar' ? 'حسابي وبوابة التجار' : 'My Account & B2B Portal'
              }
              className={`hidden sm:flex p-2 rounded-xl border transition-colors relative ${
                isDark
                  ? 'bg-[#1D1A16] border-stone-800 text-stone-200 hover:bg-stone-800 hover:text-amber-400'
                  : 'bg-stone-100 border-stone-300 text-stone-800 hover:bg-stone-200/70 hover:text-amber-700'
              }`}
            >
              <User className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={lang === 'ar' ? 'سلة المشتريات' : 'Shopping Cart'}
              className="relative px-3 py-2 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'السلة' : 'Cart'}
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-stone-950 text-amber-400 text-[11px] font-black tabular-nums">
                {cartSummary.totalCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={lang === 'ar' ? 'القائمة' : 'Menu'}
              className={`lg:hidden p-2 rounded-xl border cursor-pointer ${
                isDark
                  ? 'border-stone-800 text-stone-200'
                  : 'border-stone-300 text-stone-800'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-4 py-4 space-y-4 ${
              isDark
                ? 'bg-[#161411] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'ar' ? 'ابحث عن منتجات...' : 'Search products...'
                }
                className={`w-full py-2.5 pr-4 pl-10 rounded-xl border text-sm ${
                  isDark
                    ? 'bg-[#221F1B] border-stone-700 text-white'
                    : 'bg-stone-100 border-stone-300 text-stone-900'
                }`}
              />
              <button
                type="submit"
                aria-label={lang === 'ar' ? 'بحث' : 'Search'}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            <nav className="flex flex-col space-y-1 text-sm font-bold">
              <Link
                to="/"
                className="px-3 py-2.5 rounded-xl hover:bg-amber-500/10"
              >
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <Link
                to="/shop"
                className="px-3 py-2.5 rounded-xl hover:bg-amber-500/10"
              >
                {lang === 'ar' ? 'المتجر الكامل' : 'Full Shop'}
              </Link>
              <div className="pr-4 space-y-1 border-r-2 border-amber-500/30 mr-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className={`block px-3 py-1.5 text-xs font-semibold rounded-lg ${
                      isDark ? 'text-stone-300' : 'text-stone-700'
                    }`}
                  >
                    {lang === 'ar' ? cat.nameAr : cat.nameEn} ({cat.count})
                  </Link>
                ))}
              </div>
              <Link
                to="/about"
                className="px-3 py-2.5 rounded-xl hover:bg-amber-500/10"
              >
                {lang === 'ar' ? 'من نحن' : 'About Us'}
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2.5 rounded-xl hover:bg-amber-500/10"
              >
                {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Link>
              <Link
                to="/account"
                className="px-3 py-2.5 rounded-xl hover:bg-amber-500/10 flex items-center justify-between"
              >
                <span>
                  {lang === 'ar'
                    ? 'حسابي والمفضلة'
                    : 'My Account & Wishlist'}
                </span>
                <Heart className="w-4 h-4 text-rose-500" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
