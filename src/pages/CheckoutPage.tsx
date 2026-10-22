import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
  FileText,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

const EGYPT_GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'الدقهلية',
  'الشرقية',
  'المنوفية',
  'القليوبية',
  'البحيرة',
  'الغربية',
  'بورسعيد',
  'دمياط',
  'الإسماعيلية',
  'السويس',
  'كفر الشيخ',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'البحر الأحمر',
  'الوادي الجديد',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
];

export const CheckoutPage: React.FC = () => {
  const {
    theme,
    lang,
    cart,
    cartSummary,
    getPrice,
    selectedTier,
    clearCart,
  } = useStore();
  const isDark = theme === 'dark';

  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    governorate: 'القاهرة',
    address: '',
    companyName: '',
    notes: '',
    paymentMethod: 'cod',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    customerName: string;
    phone: string;
    governorate: string;
    address: string;
    total: number;
    itemCount: number;
  } | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !customer.fullName.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      setFormError(
        lang === 'ar'
          ? 'يرجى إدخال الاسم بالكامل ورقم الهاتف والعنوان التفصيلي لإتمام الطلب.'
          : 'Please enter your full name, phone number, and delivery address.'
      );
      return;
    }

    setFormError(null);
    const orderNum = `NAHL-${Math.floor(10000 + Math.random() * 90000)}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      customerName: customer.fullName.trim(),
      phone: customer.phone.trim(),
      governorate: customer.governorate,
      address: customer.address.trim(),
      total: cartSummary.total,
      itemCount: cartSummary.totalCount,
    });
    clearCart();
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div
          className={`p-8 md:p-10 rounded-3xl border text-center space-y-6 ${
            isDark
              ? 'bg-[#221F1B] border-stone-800 text-white'
              : 'bg-white border-stone-200 text-stone-900 shadow-lg'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-extrabold text-emerald-500 uppercase">
              {lang === 'ar' ? 'تم تأكيد الطلب بنجاح' : 'Order Confirmed'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              {lang === 'ar'
                ? `شكراً لثقتك في عسل نهل، ${confirmedOrder.customerName}!`
                : `Thank you for ordering from Nahl Honey, ${confirmedOrder.customerName}!`}
            </h1>
            <p
              className={`text-sm mt-2 ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {lang === 'ar'
                ? `رقم طلبك هو #${confirmedOrder.orderNumber} — جاري تجهيز الشحنة للتوصيل.`
                : `Order #${confirmedOrder.orderNumber} — Preparing shipment for delivery.`}
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border text-right space-y-2 text-xs sm:text-sm ${
              isDark
                ? 'bg-[#181512] border-stone-800'
                : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div className="flex justify-between">
              <span className="opacity-70">
                {lang === 'ar' ? 'رقم الفاتورة:' : 'Order ID:'}
              </span>
              <span className="font-black text-amber-500 tabular-nums">
                {confirmedOrder.orderNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">
                {lang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}
              </span>
              <span className="font-bold tabular-nums">
                {confirmedOrder.phone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">
                {lang === 'ar' ? 'عنوان التوصيل:' : 'Delivery Address:'}
              </span>
              <span className="font-bold">
                {confirmedOrder.governorate} - {confirmedOrder.address}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-base font-black">
              <span>
                {lang === 'ar'
                  ? 'المبلغ المطلوب عند الاستلام:'
                  : 'Total Amount Due (COD):'}
              </span>
              <span className="text-amber-500 tabular-nums">
                {confirmedOrder.total.toLocaleString('en-US')}{' '}
                {lang === 'ar' ? 'جنيه' : 'EGP'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-[#E5A812] text-stone-950 font-black text-xs sm:text-sm"
            >
              {lang === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
            </Link>
            <Link
              to="/"
              className={`px-6 py-3 rounded-xl border font-bold text-xs sm:text-sm ${
                isDark
                  ? 'border-stone-700 hover:bg-stone-800'
                  : 'border-stone-300 hover:bg-stone-100'
              }`}
            >
              {lang === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:underline mb-2"
        >
          <ArrowRight className="w-4 h-4" />
          <span>{lang === 'ar' ? 'العودة للمتجر' : 'Back to Shop'}</span>
        </Link>
        <h1
          className={`text-2xl sm:text-3xl font-black ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}
        >
          {lang === 'ar'
            ? 'إتمام الطلب وبيانات الشحن'
            : 'Checkout & Delivery Details'}
        </h1>
      </div>

      {cart.length === 0 ? (
        <div
          className={`p-12 rounded-3xl border text-center ${
            isDark
              ? 'bg-[#221F1B] border-stone-800 text-white'
              : 'bg-white border-stone-200 text-stone-900'
          }`}
        >
          <ShoppingBag className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h2 className="text-lg font-black mb-2">
            {lang === 'ar' ? 'سلة التسوق فارغة' : 'Your Cart is Empty'}
          </h2>
          <Link
            to="/shop"
            className="inline-block mt-3 px-6 py-2.5 rounded-xl bg-[#E5A812] text-stone-950 font-black text-xs"
          >
            {lang === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form (7 cols) */}
          <form
            onSubmit={handlePlaceOrder}
            className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border space-y-5 ${
              isDark
                ? 'bg-[#221F1B] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-stone-900 shadow-xs'
            }`}
          >
            <h2 className="text-lg font-black flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              <span>
                {lang === 'ar'
                  ? 'بيانات المستلم والعنوان'
                  : 'Recipient & Shipping Information'}
              </span>
            </h2>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-500 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-bold mb-1.5"
                >
                  {lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'} *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={customer.fullName}
                  onChange={(e) =>
                    setCustomer({ ...customer, fullName: e.target.value })
                  }
                  placeholder={
                    lang === 'ar' ? 'الاسم الثلاثي' : 'Enter full name'
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-[#161411] border-stone-700 text-white'
                      : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-bold mb-1.5"
                >
                  {lang === 'ar'
                    ? 'رقم الموبايل (يدعم واتساب)'
                    : 'Mobile Phone'} *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                  placeholder="010xxxxxxxx"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-[#161411] border-stone-700 text-white'
                      : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkout-gov"
                  className="block text-xs font-bold mb-1.5"
                >
                  {lang === 'ar' ? 'المحافظة' : 'Governorate'} *
                </label>
                <select
                  id="checkout-gov"
                  value={customer.governorate}
                  onChange={(e) =>
                    setCustomer({ ...customer, governorate: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-[#161411] border-stone-700 text-white'
                      : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                >
                  {EGYPT_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="checkout-company"
                  className="block text-xs font-bold mb-1.5"
                >
                  {lang === 'ar'
                    ? 'اسم المحل / الشركة (اختياري للجملة)'
                    : 'Store / Company Name (Optional)'}
                </label>
                <input
                  id="checkout-company"
                  type="text"
                  value={customer.companyName}
                  onChange={(e) =>
                    setCustomer({ ...customer, companyName: e.target.value })
                  }
                  placeholder={
                    lang === 'ar'
                      ? 'لطلبات الجملة والوكلاء'
                      : 'For wholesale orders'
                  }
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-[#161411] border-stone-700 text-white'
                      : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="checkout-address"
                className="block text-xs font-bold mb-1.5"
              >
                {lang === 'ar' ? 'العنوان بالتفصيل' : 'Detailed Address'} *
              </label>
              <input
                id="checkout-address"
                type="text"
                value={customer.address}
                onChange={(e) =>
                  setCustomer({ ...customer, address: e.target.value })
                }
                placeholder={
                  lang === 'ar'
                    ? 'المنطقة، اسم الشارع، رقم العقار، علامة مميزة'
                    : 'District, street, building number, landmark'
                }
                className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                  isDark
                    ? 'bg-[#161411] border-stone-700 text-white'
                    : 'bg-stone-50 border-stone-300 text-stone-900'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-sm shadow-md cursor-pointer"
            >
              {lang === 'ar'
                ? `تأكيد الطلب الآن (${cartSummary.total.toLocaleString(
                    'en-US'
                  )} جنيه)`
                : `Confirm Order (${cartSummary.total.toLocaleString(
                    'en-US'
                  )} EGP)`}
            </button>
          </form>

          {/* Summary (5 cols) */}
          <div
            className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border space-y-5 ${
              isDark
                ? 'bg-[#221F1B] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-stone-900 shadow-xs'
            }`}
          >
            <h2 className="text-lg font-black">
              {lang === 'ar' ? 'ملخص الفاتورة' : 'Order Summary'}
            </h2>
            <span className="inline-block px-3 py-1 rounded-lg bg-amber-500/15 text-amber-500 text-xs font-bold">
              {selectedTier === 'agent'
                ? lang === 'ar'
                  ? 'شريحة أسعار الوكلاء والموزعين'
                  : 'Agent Pricing Tier'
                : selectedTier === 'wholesale'
                ? lang === 'ar'
                  ? 'شريحة أسعار تجار الجملة'
                  : 'Wholesale Pricing Tier'
                : lang === 'ar'
                ? 'شريحة أسعار المستهلك'
                : 'Consumer Pricing Tier'}
            </span>

            <div className="divide-y divide-stone-200 dark:divide-stone-800 max-h-80 overflow-y-auto">
              {cart.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId);
                if (!product) return null;
                const price = getPrice(product);
                return (
                  <div
                    key={item.productId}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={product.image}
                        alt={product.nameAr}
                        className="w-11 h-11 rounded-lg object-cover bg-stone-900"
                      />
                      <div>
                        <p className="font-bold">
                          {lang === 'ar' ? product.nameAr : product.nameEn}
                        </p>
                        <p className="opacity-70 tabular-nums">
                          {item.quantity} × {price} {lang === 'ar' ? 'ج.م' : 'EGP'}
                        </p>
                      </div>
                    </div>
                    <span className="font-extrabold tabular-nums">
                      {(price * item.quantity).toLocaleString('en-US')}{' '}
                      {lang === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-75">
                  {lang === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}
                </span>
                <span className="font-bold tabular-nums">
                  {cartSummary.subtotal.toLocaleString('en-US')}{' '}
                  {lang === 'ar' ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-75">
                  {lang === 'ar' ? 'الشحن والتوصيل:' : 'Shipping:'}
                </span>
                <span className="font-bold text-emerald-500">
                  {cartSummary.shipping === 0
                    ? lang === 'ar'
                      ? 'شحن مجاني'
                      : 'FREE'
                    : `${cartSummary.shipping} ${lang === 'ar' ? 'ج.م' : 'EGP'}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-800 text-lg font-black">
                <span>{lang === 'ar' ? 'الإجمالي الكلي:' : 'Total:'}</span>
                <span className="text-amber-500 tabular-nums">
                  {cartSummary.total.toLocaleString('en-US')}{' '}
                  {lang === 'ar' ? 'جنيه' : 'EGP'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-bold">
              <div className="p-3 rounded-xl bg-amber-500/10 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {lang === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {lang === 'ar' ? 'فحص الطلب عند الاستلام' : 'Inspect on Delivery'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
