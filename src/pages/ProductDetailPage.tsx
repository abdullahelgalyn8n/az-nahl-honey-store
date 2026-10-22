import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Heart,
  Share2,
  Building2,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, PricingTier } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    theme,
    lang,
    selectedTier,
    setSelectedTier,
    getPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    showToast,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const isDark = theme === 'dark';

  const product =
    PRODUCTS.find((p) => p.slug === slug) ||
    PRODUCTS.find((p) => p.slug === '15-kg-jerrycan-of-sesame-oil') ||
    PRODUCTS[0];

  useEffect(() => {
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const isWishlisted = wishlist.includes(product.id);
  const activePrice = getPrice(product);

  const similarProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    navigate('/checkout');
  };

  const tierButtons: {
    id: Exclude<PricingTier, null>;
    labelAr: string;
    labelEn: string;
    price: number;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'agent',
      labelAr: 'أسعار الوكلاء والموزعين',
      labelEn: 'Agents & Distributors',
      price: product.prices.agent,
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      id: 'consumer',
      labelAr: 'أسعار المستهلك',
      labelEn: 'Consumer Price',
      price: product.prices.consumer,
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      id: 'wholesale',
      labelAr: 'أسعار تجار الجملة والتجزئة',
      labelEn: 'Wholesale & Retail',
      price: product.prices.wholesale,
      icon: <Truck className="w-5 h-5" />,
    },
  ];

  return (
    <div className="pb-16">
      {/* Top Breadcrumb Bar */}
      <div
        className={`w-full border-b py-3.5 ${
          isDark
            ? 'bg-[#221F1B] border-stone-800 text-stone-300'
            : 'bg-stone-100 border-stone-200 text-stone-700'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs font-bold overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-amber-500">
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>‹</span>
          <Link
            to={`/category/${product.category}`}
            className="hover:text-amber-500"
          >
            {lang === 'ar' ? product.categoryNameAr : product.categoryNameEn}
          </Link>
          <span>‹</span>
          <span className={isDark ? 'text-white' : 'text-stone-950'}>
            {lang === 'ar' ? product.nameAr : product.nameEn}
          </span>
        </div>
      </div>

      {/* Main Product Section (Matches PDP Screenshot) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Product Gallery Image (Right column in RTL, 6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div
              className={`relative aspect-square rounded-3xl overflow-hidden border shadow-xl bg-[#1C1814] ${
                isDark ? 'border-stone-800' : 'border-stone-200'
              }`}
            >
              <img
                src={product.largeImage || product.image}
                alt={lang === 'ar' ? product.nameAr : product.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Top Right Brand Overlay */}
              <div className="absolute top-4 right-4 px-3 py-2 rounded-2xl bg-black/80 border border-amber-500/40 text-center backdrop-blur-xs">
                <span className="block text-xs font-black text-[#E5A812]">
                  عسل نهل
                </span>
                <span className="block text-[10px] text-white font-semibold">
                  Nahl honey
                </span>
              </div>

              {/* Top Left Actions */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={
                    lang === 'ar' ? 'إضافة للمفضلة' : 'Add to wishlist'
                  }
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-rose-600 text-white'
                      : 'bg-white/90 text-stone-800 hover:bg-white'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast(
                      lang === 'ar'
                        ? 'تم نسخ رابط صفحة المنتج بنجاح!'
                        : 'Product URL copied to clipboard!'
                    );
                  }}
                  aria-label={lang === 'ar' ? 'مشاركة الرابط' : 'Share URL'}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-md cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase Module (Left column in RTL, 6 cols) */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <div>
              {product.badgeAr && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#E5A812] text-stone-950 font-black text-xs mb-2">
                  {lang === 'ar' ? product.badgeAr : product.badgeEn}
                </span>
              )}
              <p
                className={`text-xs font-bold ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                {lang === 'ar'
                  ? product.categoryNameAr
                  : product.categoryNameEn}{' '}
                · {lang === 'ar' ? product.weightAr : product.weightEn}
              </p>
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl font-black mt-1 ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {lang === 'ar' ? product.nameAr : product.nameEn}
              </h1>
            </div>

            {/* Interactive 3-Tier Price Selector ("اختر شريحتك") */}
            <div>
              <span
                className={`block text-xs font-bold mb-2.5 ${
                  isDark ? 'text-stone-300' : 'text-stone-700'
                }`}
              >
                {lang === 'ar' ? 'اختر شريحتك:' : 'Select Your Tier:'}
              </span>
              <div className="grid grid-cols-3 gap-3">
                {tierButtons.map((tb) => {
                  const isSelected = selectedTier === tb.id;
                  return (
                    <button
                      key={tb.id}
                      type="button"
                      onClick={() => setSelectedTier(tb.id)}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                        isSelected
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                            : 'bg-amber-50 border-amber-600 text-stone-900 shadow-sm ring-2 ring-amber-500/20'
                          : isDark
                          ? 'bg-[#221F1B] border-stone-800 text-stone-300 hover:border-stone-700'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#E5A812] text-stone-950 flex items-center justify-center mb-2 shadow-xs">
                        {tb.icon}
                      </div>
                      <span className="text-[11px] sm:text-xs font-extrabold leading-tight">
                        {lang === 'ar' ? tb.labelAr : tb.labelEn}
                      </span>
                      <span
                        className={`mt-1.5 text-sm font-black tabular-nums ${
                          isSelected
                            ? isDark
                              ? 'text-amber-400'
                              : 'text-amber-800'
                            : isDark
                            ? 'text-stone-400'
                            : 'text-stone-600'
                        }`}
                      >
                        {tb.price.toLocaleString('en-US')}{' '}
                        <span className="text-[10px]">
                          {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Price Display Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div>
                <span
                  className={`block text-xs font-bold ${
                    isDark ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {lang === 'ar'
                    ? 'السعر المعتمد للشريحة المختارة:'
                    : 'Selected Tier Unit Price:'}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span
                    className={`text-3xl font-black tabular-nums ${
                      isDark ? 'text-amber-400' : 'text-amber-800'
                    }`}
                  >
                    {activePrice.toLocaleString('en-US')}{' '}
                    <span className="text-sm font-bold">
                      {lang === 'ar' ? 'جنيه مصري' : 'EGP'}
                    </span>
                  </span>
                  {product.originalConsumerPrice &&
                    selectedTier === 'consumer' && (
                      <span className="text-sm line-through text-stone-400 tabular-nums">
                        {product.originalConsumerPrice}{' '}
                        {lang === 'ar' ? 'ج.م' : 'EGP'}
                      </span>
                    )}
                </div>
              </div>

              <div className="text-left">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    product.inStock
                      ? isDark
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-emerald-100 text-emerald-900'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {product.inStock
                    ? lang === 'ar'
                      ? 'متوفر بالمخزون'
                      : 'In Stock'
                    : lang === 'ar'
                    ? 'غير متوفر حالياً'
                    : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Product Description & Diamond Bullet Benefits (from PDP screenshot) */}
            <div className="space-y-3">
              <p
                className={`text-sm leading-relaxed font-medium ${
                  isDark ? 'text-stone-300' : 'text-stone-700'
                }`}
              >
                {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
              </p>

              <ul className="space-y-2 pt-1">
                {(lang === 'ar' ? product.benefitsAr : product.benefitsEn).map(
                  (benefit, idx) => (
                    <li
                      key={idx}
                      className={`text-sm flex items-start gap-2.5 font-medium ${
                        isDark ? 'text-stone-300' : 'text-stone-700'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="w-2 h-2 bg-orange-500 rotate-45 mt-2 shrink-0 rounded-[1px]"
                      />
                      <span>{benefit}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Quantity Stepper & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {lang === 'ar' ? 'الكمية المطلوبة:' : 'Quantity:'}
                </span>
                <div
                  className={`inline-flex items-center rounded-xl border ${
                    isDark
                      ? 'bg-[#221F1B] border-stone-700 text-white'
                      : 'bg-white border-stone-300 text-stone-900'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label={lang === 'ar' ? 'إنقاص الكمية' : 'Decrease'}
                    className="px-3.5 py-2 hover:text-amber-500 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-sm font-black tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label={lang === 'ar' ? 'زيادة الكمية' : 'Increase'}
                    className="px-3.5 py-2 hover:text-amber-500 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product.id, quantity)}
                  className="py-3.5 px-6 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
                </button>

                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={handleBuyNow}
                  className={`py-3.5 px-6 rounded-xl font-black text-sm flex items-center justify-center gap-2 border transition-colors cursor-pointer disabled:opacity-50 ${
                    isDark
                      ? 'bg-amber-500/15 border-amber-400 text-amber-300 hover:bg-amber-500 hover:text-stone-950'
                      : 'bg-stone-900 border-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'اشتري الآن' : 'Buy It Now'}</span>
                </button>
              </div>
            </div>

            {/* 3 Trust Features Box (from PDP screenshot) */}
            <div
              className={`grid grid-cols-3 gap-2 p-4 rounded-2xl border text-center ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-[#E5A812]" />
                <span className="text-xs font-bold">
                  {lang === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 border-x border-stone-200 dark:border-stone-800">
                <ShieldCheck className="w-5 h-5 text-[#E5A812]" />
                <span className="text-xs font-bold">
                  {lang === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw className="w-5 h-5 text-[#E5A812]" />
                <span className="text-xs font-bold">
                  {lang === 'ar' ? 'إرجاع مجاني' : 'Free Returns'}
                </span>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div
              className={`rounded-2xl border overflow-hidden ${
                isDark ? 'border-stone-800' : 'border-stone-200'
              }`}
            >
              <div
                className={`px-4 py-2.5 text-xs font-extrabold border-b ${
                  isDark
                    ? 'bg-[#221F1B] border-stone-800 text-amber-400'
                    : 'bg-stone-100 border-stone-200 text-stone-800'
                }`}
              >
                {lang === 'ar'
                  ? 'المواصفات الفنية والبطاقة الغذائية'
                  : 'Technical Specifications'}
              </div>
              <div className="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
                {(lang === 'ar'
                  ? product.specificationsAr
                  : product.specificationsEn
                ).map((spec, idx) => (
                  <div
                    key={idx}
                    className={`flex justify-between px-4 py-2.5 ${
                      isDark ? 'bg-[#181512]' : 'bg-white'
                    }`}
                  >
                    <span
                      className={isDark ? 'text-stone-400' : 'text-stone-500'}
                    >
                      {spec.label}
                    </span>
                    <span className="font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products ("منتجات مشابهة") */}
        <div className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800">
          <h2
            className={`text-xl md:text-2xl font-black mb-6 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}
          >
            {lang === 'ar' ? 'منتجات مشابهة' : 'Similar Products'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similarProducts.map((sim) => (
              <ProductCard key={sim.id} product={sim} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
