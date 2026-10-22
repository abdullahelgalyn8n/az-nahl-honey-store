import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { TierSelector } from './TierSelector';

export const CartDrawer: React.FC = () => {
  const {
    theme,
    lang,
    cart,
    removeFromCart,
    updateQuantity,
    cartSummary,
    isCartOpen,
    setIsCartOpen,
    getPrice,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isTierModalOpen,
    setIsTierModalOpen,
  } = useStore();

  const navigate = useNavigate();
  const isDark = theme === 'dark';

  return (
    <>
      {/* Slide-Over Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div
            role="dialog"
            aria-label={lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
            className={`w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-r ${
              isDark
                ? 'bg-[#181512] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {/* Header */}
            <div
              className={`p-5 border-b flex items-center justify-between ${
                isDark ? 'border-stone-800' : 'border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-extrabold">
                  {lang === 'ar' ? 'سلة المشتريات' : 'Shopping Cart'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold tabular-nums">
                  {cartSummary.totalCount}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label={lang === 'ar' ? 'إغلاق السلة' : 'Close cart'}
                className="p-2 rounded-xl hover:bg-stone-500/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div
              className={`px-5 py-3 text-xs font-bold border-b flex items-center gap-2 ${
                cartSummary.qualifiesForFreeShipping
                  ? isDark
                    ? 'bg-emerald-950/50 border-emerald-800/50 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : isDark
                  ? 'bg-amber-950/40 border-amber-800/40 text-amber-300'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <Truck className="w-4 h-4 shrink-0" />
              {cartSummary.qualifiesForFreeShipping ? (
                <span>
                  {lang === 'ar'
                    ? 'تهانينا! طلبك مؤهل للشحن المجاني السريع'
                    : 'Congrats! Your order qualifies for FREE shipping'}
                </span>
              ) : (
                <span>
                  {lang === 'ar'
                    ? `أضف منتجات بقيمة ${
                        500 - cartSummary.subtotal
                      } ج.م للحصول على شحن مجاني!`
                    : `Add ${
                        500 - cartSummary.subtotal
                      } EGP more for FREE shipping!`}
                </span>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-base font-bold mb-1">
                    {lang === 'ar'
                      ? 'سلة المشتريات فارغة حالياً'
                      : 'Your shopping cart is empty'}
                  </p>
                  <p
                    className={`text-xs mb-6 max-w-xs ${
                      isDark ? 'text-stone-400' : 'text-stone-500'
                    }`}
                  >
                    {lang === 'ar'
                      ? 'تصفح تشكيلتنا الفاخرة من عسل النحل الطبيعي والطحينة والزيوت والتمور.'
                      : 'Browse our premium collection of natural honey, tahini, oils, and dates.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-extrabold text-xs cursor-pointer"
                  >
                    {lang === 'ar' ? 'تصفح المتجر الآن' : 'Explore Shop'}
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.productId);
                  if (!product) return null;
                  const unitPrice = getPrice(product);
                  return (
                    <div
                      key={item.productId}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl border ${
                        isDark
                          ? 'bg-[#221F1B] border-stone-800'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.nameAr}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-900 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-sm font-bold hover:text-amber-500 truncate block"
                        >
                          {lang === 'ar' ? product.nameAr : product.nameEn}
                        </Link>
                        <span
                          className={`text-xs font-extrabold tabular-nums block mt-0.5 ${
                            isDark ? 'text-amber-400' : 'text-amber-700'
                          }`}
                        >
                          {unitPrice.toLocaleString('en-US')}{' '}
                          {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </span>

                        <div className="flex items-center justify-between mt-2">
                          <div
                            className={`inline-flex items-center rounded-lg border ${
                              isDark
                                ? 'border-stone-700 bg-[#181512]'
                                : 'border-stone-300 bg-white'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                              aria-label={
                                lang === 'ar' ? 'إنقاص الكمية' : 'Decrease quantity'
                              }
                              className="p-1.5 hover:text-amber-500 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              aria-label={
                                lang === 'ar' ? 'زيادة الكمية' : 'Increase quantity'
                              }
                              className="p-1.5 hover:text-amber-500 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.productId)}
                            aria-label={
                              lang === 'ar' ? 'حذف المنتج' : 'Remove item'
                            }
                            className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Totals & Checkout CTA */}
            {cart.length > 0 && (
              <div
                className={`p-5 border-t space-y-4 ${
                  isDark
                    ? 'bg-[#1D1A16] border-stone-800'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span
                      className={isDark ? 'text-stone-400' : 'text-stone-600'}
                    >
                      {lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}
                    </span>
                    <span className="font-bold tabular-nums">
                      {cartSummary.subtotal.toLocaleString('en-US')}{' '}
                      {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={isDark ? 'text-stone-400' : 'text-stone-600'}
                    >
                      {lang === 'ar' ? 'مصاريف الشحن' : 'Shipping'}
                    </span>
                    <span className="font-bold tabular-nums text-emerald-500">
                      {cartSummary.shipping === 0
                        ? lang === 'ar'
                          ? 'مجاني'
                          : 'FREE'
                        : `${cartSummary.shipping} ${
                            lang === 'ar' ? 'ج.م' : 'EGP'
                          }`}
                    </span>
                  </div>
                  <div
                    className={`pt-2 border-t flex justify-between text-base font-black ${
                      isDark ? 'border-stone-800' : 'border-stone-200'
                    }`}
                  >
                    <span>{lang === 'ar' ? 'الإجمالي الكلي' : 'Total'}</span>
                    <span className="text-amber-500 tabular-nums">
                      {cartSummary.total.toLocaleString('en-US')}{' '}
                      {lang === 'ar' ? 'جنيه' : 'EGP'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>
                      {lang === 'ar'
                        ? 'إتمام الطلب والدفع عند الاستلام'
                        : 'Proceed to Checkout (COD)'}
                    </span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            role="dialog"
            aria-label={quickViewProduct.nameAr}
            className={`relative w-full max-w-2xl rounded-3xl border overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 ${
              isDark
                ? 'bg-[#221F1B] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              aria-label={lang === 'ar' ? 'إغلاق المعاينة' : 'Close preview'}
              className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square bg-[#1B1814]">
              <img
                src={quickViewProduct.largeImage || quickViewProduct.image}
                alt={quickViewProduct.nameAr}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-500">
                  {lang === 'ar'
                    ? quickViewProduct.categoryNameAr
                    : quickViewProduct.categoryNameEn}{' '}
                  ·{' '}
                  {lang === 'ar'
                    ? quickViewProduct.weightAr
                    : quickViewProduct.weightEn}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {lang === 'ar'
                    ? quickViewProduct.nameAr
                    : quickViewProduct.nameEn}
                </h3>
                <p
                  className={`text-xs mt-2 leading-relaxed ${
                    isDark ? 'text-stone-300' : 'text-stone-600'
                  }`}
                >
                  {lang === 'ar'
                    ? quickViewProduct.descriptionAr
                    : quickViewProduct.descriptionEn}
                </p>

                <ul className="mt-3 space-y-1.5">
                  {(lang === 'ar'
                    ? quickViewProduct.benefitsAr
                    : quickViewProduct.benefitsEn
                  )
                    .slice(0, 3)
                    .map((b, i) => (
                      <li
                        key={i}
                        className="text-xs flex items-start gap-1.5 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-stone-400">
                    {lang === 'ar' ? 'السعر الحالي:' : 'Current Price:'}
                  </span>
                  <span className="text-2xl font-black text-amber-500 tabular-nums">
                    {getPrice(quickViewProduct).toLocaleString('en-US')}{' '}
                    <span className="text-xs">
                      {lang === 'ar' ? 'جنيه' : 'EGP'}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(quickViewProduct.id, 1);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-extrabold text-xs cursor-pointer"
                  >
                    {lang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
                  </button>
                  <Link
                    to={`/product/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold ${
                      isDark
                        ? 'border-stone-700 hover:bg-stone-800'
                        : 'border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {lang === 'ar' ? 'صفحة المنتج' : 'Full Details'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tier Selection Modal */}
      {isTierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            role="dialog"
            aria-label={
              lang === 'ar' ? 'تحديد الشريحة السعرية' : 'Select Pricing Tier'
            }
            className={`relative w-full max-w-2xl rounded-3xl border p-6 md:p-8 shadow-2xl ${
              isDark
                ? 'bg-[#1D1A16] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            <button
              type="button"
              onClick={() => setIsTierModalOpen(false)}
              aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-stone-500/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-amber-500 text-xs font-extrabold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>
                {lang === 'ar'
                  ? 'نظام التسعير الذكي من شركة نهل للتجارة'
                  : 'Smart B2B & Retail Pricing System'}
              </span>
            </div>

            <TierSelector />

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsTierModalOpen(false)}
                className="px-8 py-2.5 rounded-xl bg-[#E5A812] text-stone-950 font-extrabold text-xs cursor-pointer"
              >
                {lang === 'ar' ? 'تأكيد ومتابعة التسوق' : 'Confirm & Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
