import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, Download, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { lang, showToast } = useStore();
  const [showAppBanner, setShowAppBanner] = useState(true);

  return (
    <footer className="bg-[#5C451C] text-stone-100 border-t border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-stone-950 border border-amber-500/40 flex items-center justify-center shrink-0">
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
              <div>
                <h3 className="text-lg font-black text-white">
                  {lang === 'ar' ? 'عسل نهل' : 'Nahl Honey'}
                </h3>
                <p className="text-xs text-amber-300 font-semibold">
                  {lang === 'ar' ? 'شركة نهل للتجارة' : 'Nahl Trading Company'}
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-200/90 leading-relaxed">
              {lang === 'ar'
                ? 'الشركة الرائدة في مجال إنتاج وتعبئة وتغليف عسل النحل ومشتقاته. نوفر منتجات طبيعية صحية مطابقة للمواصفة القياسية المصرية بأسعار عادلة للمستهلك والتجار.'
                : 'The leading company in producing and packaging pure natural bee honey and its derivatives, compliant with Egyptian Quality Standards.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-extrabold text-white mb-4">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-200/90 font-medium">
              <li>
                <Link
                  to="/category/honey"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'عسل النحل الطبيعي' : 'Natural Bee Honey'}
                </Link>
              </li>
              <li>
                <Link
                  to="/category/derivatives"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'مشتقات العسل' : 'Honey Derivatives'}
                </Link>
              </li>
              <li>
                <Link
                  to="/category/tahini-oils"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'الطحينة والزيوت' : 'Tahini & Natural Oils'}
                </Link>
              </li>
              <li>
                <Link
                  to="/category/dates"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'التمور الفاخرة' : 'Premium Dates'}
                </Link>
              </li>
              <li>
                <Link
                  to="/category/bulk"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'المنتجات السايبة والجملة' : 'Bulk & Wholesale'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service & Policies */}
          <div>
            <h4 className="text-base font-extrabold text-white mb-4">
              {lang === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-200/90 font-medium">
              <li>
                <Link
                  to="/about"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link
                  to="/policy/privacy"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link
                  to="/policy/returns"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'سياسة الإرجاع' : 'Return Policy'}
                </Link>
              </li>
              <li>
                <Link
                  to="/policy/shipping"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'سياسة الشحن' : 'Shipping Policy'}
                </Link>
              </li>
              <li>
                <Link
                  to="/policy/terms"
                  className="hover:text-amber-300 transition-colors"
                >
                  {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-base font-extrabold text-white mb-4">
              {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-stone-300">
                    {lang === 'ar' ? 'خدمة العملاء' : 'Customer Support'}
                  </span>
                  <a
                    href="tel:01011878508"
                    className="font-bold text-white hover:text-amber-300 tabular-nums"
                  >
                    01011878508
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs text-stone-300">
                    {lang === 'ar' ? 'المشتريات والجملة' : 'Sales & Wholesale'}
                  </span>
                  <a
                    href="tel:01118831877"
                    className="font-bold text-white hover:text-amber-300 tabular-nums"
                  >
                    01118831877
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <Link
                  to="/contact"
                  className="text-stone-200 hover:text-amber-300 font-medium"
                >
                  {lang === 'ar'
                    ? 'عرض الموقع على الخريطة (القاهرة)'
                    : 'View Location on Map (Cairo)'}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & App Download Pill */}
        <div className="mt-10 pt-6 border-t border-amber-200/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-300">
          <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
          <div className="flex items-center gap-4">
            <Link to="/policy/privacy" className="hover:text-white">
              {lang === 'ar' ? 'الخصوصية' : 'Privacy'}
            </Link>
            <span>·</span>
            <Link to="/policy/terms" className="hover:text-white">
              {lang === 'ar' ? 'الشروط' : 'Terms'}
            </Link>
            <span>·</span>
            <Link to="/checkout" className="hover:text-white">
              {lang === 'ar' ? 'إتمام الطلب' : 'Checkout'}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom App Download Bar inside Footer (matches screenshot without covering page content) */}
      {showAppBanner && (
        <div className="max-w-md mx-auto mb-6 px-4">
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-[#3A2B12] border border-amber-500/40 text-white shadow-lg">
            <button
              type="button"
              onClick={() => setShowAppBanner(false)}
              aria-label={lang === 'ar' ? 'إغلاق إشعار التطبيق' : 'Close app banner'}
              className="text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                showToast(
                  lang === 'ar'
                    ? 'جاري تجهيز رابط تحميل تطبيق عسل نهل للأندرويد والآيفون'
                    : 'Preparing Nahl Honey mobile app download link'
                );
                setShowAppBanner(false);
              }}
              className="px-4 py-1.5 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تنزيل التطبيق' : 'Download App'}</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <p className="text-xs font-extrabold text-amber-400 leading-none">
                  {lang === 'ar' ? 'عسل نهل' : 'Nahl Honey'}
                </p>
                <p className="text-[11px] text-stone-300 mt-0.5">
                  {lang === 'ar' ? 'حمّل التطبيق الآن!' : 'Get the mobile app!'}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-950 border border-amber-500/40 flex items-center justify-center text-[#E5A812] font-black text-xs">
                ن
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Customer Service Button */}
      <Link
        to="/contact"
        aria-label={
          lang === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'
        }
        className="fixed bottom-5 left-5 z-30 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </footer>
  );
};
