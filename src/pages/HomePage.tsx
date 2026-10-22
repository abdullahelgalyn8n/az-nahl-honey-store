import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  ArrowLeft,
  Award,
  Users,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { TierSelector } from '../components/TierSelector';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { theme, lang } = useStore();
  const isDark = theme === 'dark';
  const [activeSlide, setActiveSlide] = useState(0);

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  const bestSellers = PRODUCTS.filter(
    (p) => p.badgeAr === 'الأكثر مبيعاً' || p.badgeAr === 'نادر جداً'
  ).slice(0, 4);

  const slides = [
    {
      image: '/assets/banners/hero-main.jpg',
      badgeAr: 'خصومات موسمية تصل إلى 50%',
      badgeEn: 'Seasonal Discounts up to 50% Off',
      titleAr: 'عسل نهل الطبيعي .. من المنحل إلى مائدتك مباشرة',
      titleEn: 'Nahl Pure Natural Honey .. Straight From the Apiary to Your Table',
      subtitleAr:
        'تشكيلة فاخرة من عسل النحل الخام، الطحينة الصافية 100%، الزيوت المعصورة على البارد، والتمور المختارة بأسعار المستهلك والجملة والوكلاء.',
      subtitleEn:
        'Premium selection of raw bee honey, 100% pure sesame tahini, cold-pressed oils, and handpicked dates with Consumer, Wholesale, and Agent pricing.',
      ctaTextAr: 'اطلب الآن من المتجر',
      ctaTextEn: 'Shop Collection Now',
      ctaLink: '/shop',
    },
    {
      image: '/assets/banners/about-hero.jpg',
      badgeAr: 'أسعار خاصة للتجار والموزعين',
      badgeEn: 'Special B2B & Wholesale Rates',
      titleAr: 'المنتجات السايبة والجملة للمصانع وتجار التجزئة',
      titleEn: 'Bulk Containers & Wholesale Supply for Factories & Retailers',
      subtitleAr:
        'نوفر جراكن عسل النحل (28 كجم) وجرادل الطحينة وزيت السمسم وزيت الزيتون البكر بأعلى معايير الجودة والمواصفات القياسية المصرية.',
      subtitleEn:
        'We supply 28kg honey jerrycans, pure tahini buckets, and cold-pressed oils compliant with Egyptian Quality Standards.',
      ctaTextAr: 'تصفح المنتجات السايبة',
      ctaTextEn: 'Browse Bulk Products',
      ctaLink: '/category/bulk',
    },
  ];

  const currentSlide = slides[activeSlide];

  return (
    <div className="space-y-12 md:space-y-16 pb-16">
      {/* 1. Hero Promotional Banner */}
      <section className="relative w-full overflow-hidden bg-[#2B1F0A]">
        <div className="relative h-[340px] sm:h-[420px] md:h-[520px] w-full">
          <img
            src={currentSlide.image}
            alt={lang === 'ar' ? currentSlide.titleAr : currentSlide.titleEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Measured gradient scrim for guaranteed text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 flex items-end md:items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 md:pb-0">
              <div className="max-w-2xl space-y-4">
                <span className="inline-block px-3.5 py-1 rounded-lg bg-[#E5A812] text-stone-950 font-black text-xs shadow-sm">
                  {lang === 'ar'
                    ? currentSlide.badgeAr
                    : currentSlide.badgeEn}
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                  {lang === 'ar'
                    ? currentSlide.titleAr
                    : currentSlide.titleEn}
                </h1>
                <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-xl">
                  {lang === 'ar'
                    ? currentSlide.subtitleAr
                    : currentSlide.subtitleEn}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    to={currentSlide.ctaLink}
                    className="px-6 py-3 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-sm inline-flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <span>
                      {lang === 'ar'
                        ? currentSlide.ctaTextAr
                        : currentSlide.ctaTextEn}
                    </span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm backdrop-blur-xs transition-colors"
                  >
                    {lang === 'ar'
                      ? 'طلبات الجملة والوكلاء'
                      : 'Wholesale Inquiries'}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <button
            type="button"
            onClick={() =>
              setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
            }
            aria-label={lang === 'ar' ? 'الشريحة السابقة' : 'Previous slide'}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
            }
            aria-label={lang === 'ar' ? 'الشريحة التالية' : 'Next slide'}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx
                    ? 'w-6 bg-[#E5A812]'
                    : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Pricing Tier Selector ("حدد شريحتك") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl border p-6 md:p-8 ${
            isDark
              ? 'bg-[#1D1A16] border-stone-800/90'
              : 'bg-amber-50/50 border-amber-200/80 shadow-xs'
          }`}
        >
          <TierSelector />
        </div>
      </section>

      {/* 3. Trust Guarantees Strip */}
      <section
        className={`w-full border-y py-6 ${
          isDark
            ? 'bg-[#252019] border-stone-800'
            : 'bg-white border-stone-200/90 shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Truck className="w-6 h-6" />,
              titleAr: 'شحن مجاني',
              titleEn: 'Free Shipping',
              descAr: 'للطلبات فوق 500 جنيه والمنتجات السايبة',
              descEn: 'On orders over 500 EGP & bulk items',
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              titleAr: 'جودة مضمونة',
              titleEn: 'Guaranteed Quality',
              descAr: '100% عسل طبيعي مفحوص معملياً',
              descEn: '100% Lab-tested pure natural honey',
            },
            {
              icon: <Headphones className="w-6 h-6" />,
              titleAr: 'دعم على مدار الساعة',
              titleEn: '24/7 Support',
              descAr: 'خدمة عملاء ومبيعات جملة متميزة',
              descEn: 'Dedicated retail & wholesale support',
            },
            {
              icon: <CreditCard className="w-6 h-6" />,
              titleAr: 'دفع آمن',
              titleEn: 'Secure Payment',
              descAr: 'الدفع عند الاستلام وطرق دفع متعددة',
              descEn: 'Cash on delivery & flexible payment',
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  isDark
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {item.icon}
              </div>
              <div>
                <h3
                  className={`text-sm md:text-base font-extrabold ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}
                >
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? 'text-stone-400' : 'text-stone-600'
                  }`}
                >
                  {lang === 'ar' ? item.descAr : item.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Browse Categories ("تصفح الأقسام") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black">
            <span className={isDark ? 'text-white' : 'text-stone-900'}>
              {lang === 'ar' ? 'تصفح ' : 'Browse '}
            </span>
            <span className="text-[#E5A812]">
              {lang === 'ar' ? 'الأقسام' : 'Categories'}
            </span>
          </h2>
          <p
            className={`text-sm mt-1.5 ${
              isDark ? 'text-stone-400' : 'text-stone-600'
            }`}
          >
            {lang === 'ar'
              ? 'اكتشف مجموعتنا المتنوعة من المنتجات الطبيعية عالية الجودة'
              : 'Discover our diverse range of high-quality natural products'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group relative h-60 rounded-2xl overflow-hidden border border-stone-800/40 shadow-md block"
            >
              <img
                src={cat.image}
                alt={lang === 'ar' ? cat.nameAr : cat.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {lang === 'ar' ? cat.nameAr : cat.nameEn}
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                      {lang === 'ar' ? cat.descriptionAr : cat.descriptionEn}
                    </p>
                    <span className="inline-block mt-1.5 text-xs font-bold text-amber-400 tabular-nums">
                      {cat.count} {lang === 'ar' ? 'منتج' : 'Products'}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#E5A812] text-stone-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Featured Products ("منتجات مميزة") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">
              <span className={isDark ? 'text-white' : 'text-stone-900'}>
                {lang === 'ar' ? 'منتجات ' : 'Featured '}
              </span>
              <span className="text-[#E5A812]">
                {lang === 'ar' ? 'مميزة' : 'Products'}
              </span>
            </h2>
            <p
              className={`text-sm mt-1 ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {lang === 'ar'
                ? 'أفضل منتجاتنا الطبيعية المختارة بعناية من المناحل والمزارع المصرية'
                : 'Our finest natural products carefully selected from Egyptian farms'}
            </p>
          </div>

          <Link
            to="/shop"
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold inline-flex items-center gap-2 transition-colors ${
              isDark
                ? 'bg-[#221F1B] border-stone-800 text-stone-200 hover:border-amber-500 hover:text-amber-400'
                : 'bg-white border-stone-300 text-stone-800 hover:border-amber-600 hover:text-amber-800 shadow-2xs'
            }`}
          >
            <span>{lang === 'ar' ? 'عرض الكل' : 'View All'}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Best Sellers & Rare Honey Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl border p-6 md:p-8 ${
            isDark
              ? 'bg-[#1F1B16] border-stone-800'
              : 'bg-white border-stone-200/90 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                {lang === 'ar'
                  ? 'الأكثر طلباً ومبيعاً'
                  : 'Customer Favorites'}
              </span>
              <h2
                className={`text-xl md:text-2xl font-black mt-0.5 ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {lang === 'ar'
                  ? 'نخبة الأعسال الملكية والمنتجات الأكثر مبيعاً'
                  : 'Royal Honey & Best-Selling Selection'}
              </h2>
            </div>

            <Link
              to="/category/honey"
              className="text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <span>
                {lang === 'ar' ? 'تصفح قسم عسل النحل' : 'Explore Honey Section'}
              </span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. About Nahl Trading Split Section (from Home screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`rounded-3xl border p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
            isDark
              ? 'bg-[#1D1A16] border-stone-800'
              : 'bg-amber-50/40 border-stone-200/90'
          }`}
        >
          {/* Text Side */}
          <div className="space-y-5">
            <span
              className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
                isDark
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </span>

            <h2 className="text-2xl md:text-4xl font-black leading-tight">
              <span className={isDark ? 'text-white' : 'text-stone-900'}>
                {lang === 'ar'
                  ? 'شركة نهل للتجارة '
                  : 'Nahl Trading Company '}
              </span>
              <span className="text-[#E5A812] block mt-1">
                {lang === 'ar'
                  ? 'الرائدة في عالم العسل'
                  : 'Pioneers in the World of Honey'}
              </span>
            </h2>

            <p
              className={`text-sm md:text-base leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar'
                ? 'شركة نهل هي شركة رائدة في مجال إنتاج وتعبئة وتغليف عسل النحل ومشتقاته. نعمل بشغف لتوفير منتجات طبيعية صحية مطابقة للمواصفة القياسية المصرية بأسعار عادلة للمستهلك المصري والعربي.'
                : 'Nahl Trading is a leading company in producing, filling, and packaging natural bee honey and its derivatives. We work passionately to provide healthy natural products compliant with Egyptian Quality Standards at fair prices.'}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                {
                  icon: <Leaf className="w-4 h-4 text-amber-500" />,
                  textAr: 'منتجات طبيعية 100%',
                  textEn: '100% Natural Products',
                },
                {
                  icon: <Award className="w-4 h-4 text-amber-500" />,
                  textAr: 'جودة معتمدة ومفحوصة',
                  textEn: 'Certified Lab Quality',
                },
                {
                  icon: <Users className="w-4 h-4 text-amber-500" />,
                  textAr: '+5000 عميل وتاجر سعيد',
                  textEn: '5000+ Happy Clients',
                },
                {
                  icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
                  textAr: 'أسعار منافسة للجملة والقطاعي',
                  textEn: 'Competitive B2B & Retail Pricing',
                },
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-bold">
                  {feat.icon}
                  <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>
                    {lang === 'ar' ? feat.textAr : feat.textEn}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-xs md:text-sm inline-flex items-center gap-2 shadow-sm"
              >
                <span>{lang === 'ar' ? 'اقرأ المزيد عنا' : 'Read More About Us'}</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-amber-500/20 shadow-xl">
              <img
                src="/assets/banners/beekeeper.jpg"
                alt={lang === 'ar' ? 'مناحل شركة نهل' : 'Nahl Honey Apiaries'}
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            <div
              className={`absolute -bottom-4 right-6 px-5 py-3 rounded-2xl border shadow-xl flex items-center gap-3 ${
                isDark
                  ? 'bg-[#221F1B] border-amber-500/40 text-white'
                  : 'bg-white border-amber-300 text-stone-900'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#E5A812] text-stone-950 flex items-center justify-center font-black text-sm">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xl font-black text-[#E5A812] tabular-nums leading-none">
                  +10
                </span>
                <span className="text-xs font-bold opacity-80">
                  {lang === 'ar' ? 'سنوات خبرة' : 'Years of Experience'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
