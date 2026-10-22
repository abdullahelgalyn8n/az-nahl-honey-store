import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShoppingCart,
  Eye,
  Truck,
  Sparkles,
  Scale,
} from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
}) => {
  const {
    theme,
    lang,
    selectedTier,
    getPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    setIsTierModalOpen,
  } = useStore();

  const isDark = theme === 'dark';
  const isWishlisted = wishlist.includes(product.id);
  const price = getPrice(product);

  const tierLabel =
    selectedTier === 'agent'
      ? lang === 'ar'
        ? 'سعر الوكلاء'
        : 'Agent Price'
      : selectedTier === 'wholesale'
      ? lang === 'ar'
        ? 'سعر الجملة'
        : 'Wholesale Price'
      : lang === 'ar'
      ? 'سعر المستهلك'
      : 'Consumer Price';

  const getBadgeStyle = (badge?: Product['badgeAr']) => {
    switch (badge) {
      case 'الأكثر مبيعاً':
        return isDark
          ? 'bg-amber-500 text-stone-950 font-extrabold'
          : 'bg-amber-500 text-stone-950 font-extrabold shadow-sm';
      case 'نادر جداً':
        return 'bg-purple-700 text-white font-bold shadow-sm';
      case 'خصم 15%':
      case 'عرض خاص':
        return 'bg-rose-600 text-white font-bold shadow-sm';
      default:
        return isDark
          ? 'bg-[#D99A0B] text-stone-950 font-bold'
          : 'bg-amber-500 text-stone-950 font-bold shadow-sm';
    }
  };

  if (viewMode === 'list') {
    return (
      <div
        className={`group relative flex flex-col sm:flex-row items-stretch rounded-2xl border overflow-hidden transition-all duration-200 ${
          isDark
            ? 'bg-[#221F1B] border-stone-800 hover:border-amber-500/50'
            : 'bg-white border-stone-200/90 hover:border-amber-500 shadow-sm hover:shadow-md'
        }`}
      >
        {/* Image Container */}
        <div className="relative w-full sm:w-56 shrink-0 bg-[#1B1814] overflow-hidden aspect-square sm:aspect-auto">
          <Link
            to={`/product/${product.slug}`}
            className="block w-full h-full"
          >
            <img
              src={product.image}
              alt={lang === 'ar' ? product.nameAr : product.nameEn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {!product.inStock && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-lg bg-stone-900/90 text-white text-xs font-bold border border-stone-700">
                {lang === 'ar' ? 'غير متوفر حالياً' : 'Out of Stock'}
              </span>
            </div>
          )}

          {product.badgeAr && (
            <span
              className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs ${getBadgeStyle(
                product.badgeAr
              )}`}
            >
              {lang === 'ar' ? product.badgeAr : product.badgeEn}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
              <span
                className={
                  isDark ? 'text-stone-400 font-medium' : 'text-stone-600 font-semibold'
                }
              >
                {lang === 'ar' ? product.categoryNameAr : product.categoryNameEn}
                {' · '}
                {lang === 'ar' ? product.weightAr : product.weightEn}
              </span>

              {product.freeShipping && (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  {lang === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
                </span>
              )}
            </div>

            <Link to={`/product/${product.slug}`}>
              <h3
                className={`text-lg font-bold transition-colors ${
                  isDark
                    ? 'text-white group-hover:text-amber-400'
                    : 'text-stone-900 group-hover:text-amber-700'
                }`}
              >
                {lang === 'ar' ? product.nameAr : product.nameEn}
              </h3>
            </Link>

            <p
              className={`text-sm mt-2 line-clamp-2 leading-relaxed ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {lang === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            {selectedTier ? (
              <div>
                <span
                  className={`block text-[11px] font-medium ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}
                >
                  {tierLabel}
                </span>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-xl font-extrabold tabular-nums ${
                      isDark ? 'text-amber-400' : 'text-amber-700'
                    }`}
                  >
                    {price.toLocaleString('en-US')}{' '}
                    <span className="text-xs font-bold">
                      {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </span>
                  {product.originalConsumerPrice &&
                    selectedTier === 'consumer' && (
                      <span className="text-xs line-through text-stone-400 tabular-nums">
                        {product.originalConsumerPrice} {lang === 'ar' ? 'ج.م' : 'EGP'}
                      </span>
                    )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsTierModalOpen(true)}
                className={`text-xs font-bold underline cursor-pointer ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}
              >
                {lang === 'ar'
                  ? 'حدد شريحتك لعرض السعر'
                  : 'Select tier to view price'}
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                aria-label={lang === 'ar' ? `معاينة سريعة ${product.nameAr}` : `Quick view ${product.nameEn}`}
                className={`px-3 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isDark
                    ? 'border-stone-700 text-stone-200 hover:bg-stone-800'
                    : 'border-stone-300 text-stone-800 hover:bg-stone-100'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>{lang === 'ar' ? 'معاينة' : 'Preview'}</span>
              </button>

              <button
                type="button"
                disabled={!product.inStock}
                onClick={() => addToCart(product.id, 1)}
                className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                  product.inStock
                    ? 'bg-[#E5A812] hover:bg-[#d1970b] text-stone-950 shadow-sm'
                    : 'bg-stone-300 dark:bg-stone-800 text-stone-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 ${
        isDark
          ? 'bg-[#221F1B] border-[#38322A] hover:border-amber-500/60 shadow-lg shadow-black/20'
          : 'bg-white border-stone-200/90 hover:border-amber-500 shadow-sm hover:shadow-md'
      }`}
    >
      {/* Top Image Stage */}
      <div className="relative aspect-[4/4.2] w-full bg-[#1C1814] overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="block w-full h-full focus:outline-none"
        >
          <img
            src={product.image}
            alt={lang === 'ar' ? product.nameAr : product.nameEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="px-3.5 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-bold border border-stone-700">
              {lang === 'ar' ? 'غير متوفر' : 'Out of Stock'}
            </span>
          </div>
        )}

        {/* Top-Right Badge */}
        {product.badgeAr && (
          <span
            className={`absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-md text-[11px] tracking-tight ${getBadgeStyle(
              product.badgeAr
            )}`}
          >
            {lang === 'ar' ? product.badgeAr : product.badgeEn}
          </span>
        )}

        {/* Top-Left Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            isWishlisted
              ? lang === 'ar'
                ? `إزالة ${product.nameAr} من المفضلة`
                : `Remove ${product.nameEn} from wishlist`
              : lang === 'ar'
              ? `إضافة ${product.nameAr} للمفضلة`
              : `Add ${product.nameEn} to wishlist`
          }
          className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-rose-600 text-white'
              : 'bg-white/95 text-stone-700 hover:bg-white hover:text-rose-600'
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
          />
        </button>

        {/* Bottom-Left Free Shipping Tag */}
        {product.freeShipping && (
          <div className="absolute bottom-2.5 left-2.5 z-10 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
            <Truck className="w-3 h-3" />
            <span>{lang === 'ar' ? 'شحن مجاني' : 'Free Shipping'}</span>
          </div>
        )}

        {/* Hover Quick Actions Bar (matches Shop screenshot) */}
        {product.inStock && (
          <div className="absolute inset-x-3 bottom-2.5 z-20 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <button
              type="button"
              onClick={() => setQuickViewProduct(product)}
              className="flex-1 py-2 px-2.5 rounded-lg bg-white/95 hover:bg-white text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5 text-stone-700" />
              <span>{lang === 'ar' ? 'عرض' : 'View'}</span>
            </button>
            <button
              type="button"
              onClick={() => addToCart(product.id, 1)}
              className="flex-1 py-2 px-2.5 rounded-lg bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'إضافة' : 'Add'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-4 flex flex-col justify-between text-right">
        <div>
          {/* Unboxed clean metadata with typographic separator */}
          <div
            className={`flex items-center justify-between text-xs mb-1.5 ${
              isDark ? 'text-stone-400' : 'text-stone-600 font-medium'
            }`}
          >
            <span>
              {lang === 'ar' ? product.categoryNameAr : product.categoryNameEn}
            </span>
            <span className="inline-flex items-center gap-1">
              <Scale className="w-3 h-3 opacity-75" />
              {lang === 'ar' ? product.weightAr : product.weightEn}
            </span>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="block focus:outline-none"
          >
            <h3
              className={`text-sm md:text-[15px] font-bold leading-snug line-clamp-1 transition-colors ${
                isDark
                  ? 'text-white group-hover:text-amber-400'
                  : 'text-stone-900 group-hover:text-amber-700'
              }`}
            >
              {lang === 'ar' ? product.nameAr : product.nameEn}
            </h3>
          </Link>
        </div>

        {/* Price & Action Footer */}
        <div
          className={`mt-3 pt-2.5 border-t flex items-center justify-between gap-2 ${
            isDark ? 'border-stone-800/90' : 'border-stone-200/80'
          }`}
        >
          {selectedTier ? (
            <div className="flex flex-col">
              <span
                className={`text-[10px] font-semibold ${
                  isDark ? 'text-stone-400' : 'text-stone-500'
                }`}
              >
                {tierLabel}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-base font-extrabold tabular-nums ${
                    isDark ? 'text-amber-400' : 'text-amber-800'
                  }`}
                >
                  {price.toLocaleString('en-US')}{' '}
                  <span className="text-[11px] font-bold">
                    {lang === 'ar' ? 'جنيه' : 'EGP'}
                  </span>
                </span>
                {product.originalConsumerPrice &&
                  selectedTier === 'consumer' && (
                    <span className="text-[11px] line-through text-stone-400 tabular-nums">
                      {product.originalConsumerPrice}
                    </span>
                  )}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsTierModalOpen(true)}
              className={`text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition-colors ${
                isDark
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar'
                  ? 'حدد شريحتك لعرض السعر'
                  : 'Select tier for price'}
              </span>
            </button>
          )}

          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product.id, 1)}
            aria-label={
              lang === 'ar'
                ? `إضافة ${product.nameAr} إلى السلة`
                : `Add ${product.nameEn} to cart`
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-all cursor-pointer shrink-0 ${
              product.inStock
                ? isDark
                  ? 'bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/30'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'أضف' : 'Add'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
