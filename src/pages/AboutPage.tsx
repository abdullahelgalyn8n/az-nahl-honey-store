import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Eye,
  Target,
  Leaf,
  Package,
  Store,
  Truck,
  Award,
  Users,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { theme, lang } = useStore();
  const isDark = theme === 'dark';

  return (
    <div className="pb-16">
      {/* 1. Hero Banner (Matches About Screenshot) */}
      <section className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden">
        <img
          src="/assets/banners/about-hero.jpg"
          alt={lang === 'ar' ? 'شركة نهل للتجارة' : 'Nahl Trading Company'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-900/80 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3">
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              {lang === 'ar' ? 'شركة نهل للتجارة' : 'Nahl Trading Company'}
            </h1>
            <p className="text-sm sm:text-base text-stone-200 mt-2 max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'شركة نهل للتجارة - الشركة الرائدة في مجال إنتاج وتعبئة وتغليف عسل النحل ومشتقاته والطحينة والزيوت الطبيعية.'
                : 'Nahl Trading Co. - The leading company in producing, filling, and packaging pure natural bee honey and its derivatives.'}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Golden KPI Stats Strip */}
      <section className="bg-[#E5A812] text-stone-950 py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            {
              value: '10+',
              labelAr: 'سنوات خبرة',
              labelEn: 'Years of Experience',
            },
            {
              value: '5000+',
              labelAr: 'عميل سعيد',
              labelEn: 'Happy Clients',
            },
            {
              value: '50+',
              labelAr: 'منتج طبيعي',
              labelEn: 'Natural Products',
            },
            {
              value: '100%',
              labelAr: 'جودة مضمونة',
              labelEn: 'Guaranteed Quality',
            },
          ].map((stat, idx) => (
            <div key={idx}>
              <span className="block text-2xl sm:text-3xl md:text-4xl font-black tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold opacity-85 mt-1 block">
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Story ("قصتنا: من المنحل إلى مائدتك") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Text Side */}
          <div className="space-y-5">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                isDark
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {lang === 'ar' ? 'قصتنا' : 'Our Story'}
            </span>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {lang === 'ar'
                ? 'من المنحل إلى مائدتك'
                : 'From the Apiary to Your Table'}
            </h2>
            <p
              className={`text-sm md:text-base leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar'
                ? 'شركة نهل هي شركة رائدة في مجال إنتاج وتعبئة وتغليف عسل النحل ومشتقاته. نعمل بشغف لتوفير منتجات طبيعية صحية مطابقة للمواصفة القياسية المصرية بأسعار عادلة للمستهلك المصري والعربي.'
                : 'Nahl is a pioneer in producing and packaging bee honey and its derivatives. We work with passion to deliver healthy natural products compliant with Egyptian Quality Standards at fair prices.'}
            </p>
            <p
              className={`text-sm md:text-base leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar'
                ? 'نؤمن بأن الطبيعة تقدم لنا أفضل ما لديها، ونحن ملتزمون بالحفاظ على هذه الجودة من المنحل وحتى مائدتك. نستخدم أحدث التقنيات في التعبئة والتغليف مع الحفاظ على الطرق التقليدية في إنتاج العسل الخام.'
                : 'We believe nature gives us its best, and we are committed to preserving this purity from the hive to your table using modern hygienic packaging while respecting traditional beekeeping.'}
            </p>

            {/* 6 Checkmarks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                {
                  ar: 'عسل طبيعي 100% بدون إضافات',
                  en: '100% Pure Honey with Zero Additives',
                },
                {
                  ar: 'مطابق للمواصفات القياسية المصرية',
                  en: 'Compliant with Egyptian Quality Standards',
                },
                {
                  ar: 'من مناحل مصرية معتمدة',
                  en: 'From Certified Egyptian Apiaries',
                },
                {
                  ar: 'توصيل لجميع المحافظات',
                  en: 'Delivery Across All Governorates',
                },
                {
                  ar: 'أسعار منافسة للجملة والقطاعي',
                  en: 'Competitive Wholesale & Retail Pricing',
                },
                {
                  ar: 'ضمان استرجاع المنتج',
                  en: 'Full Money-Back Quality Guarantee',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E5A812] shrink-0" />
                  <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>
                    {lang === 'ar' ? item.ar : item.en}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <Link
                to="/contact"
                className="inline-block px-6 py-3 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-xs sm:text-sm shadow-sm"
              >
                {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <img
              src="/assets/banners/beekeeper.jpg"
              alt={lang === 'ar' ? 'نحال شركة نهل' : 'Nahl Beekeeper'}
              className="w-full rounded-3xl shadow-xl border border-stone-800/20 object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Packaging & Quality ("تعبئة وتغليف بأعلى المعايير") */}
      <section
        className={`py-12 md:py-16 border-y ${
          isDark
            ? 'bg-[#252019] border-stone-800'
            : 'bg-amber-50/50 border-stone-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/assets/banners/packaging.jpg"
              alt={
                lang === 'ar'
                  ? 'خطوط التعبئة والتغليف'
                  : 'Modern Packaging Facility'
              }
              className="w-full rounded-3xl shadow-xl border border-stone-800/20 object-cover"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                isDark
                  ? 'bg-amber-500/15 text-amber-400'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {lang === 'ar' ? 'التعبئة والتغليف' : 'Filling & Packaging'}
            </span>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl font-black ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {lang === 'ar'
                ? 'تعبئة وتغليف بأعلى المعايير'
                : 'Filling & Packaging to the Highest Standards'}
            </h2>
            <p
              className={`text-sm md:text-base leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar'
                ? 'نستخدم أحدث التقنيات في التعبئة والتغليف للحفاظ على جودة العسل ومشتقاته. مصنعنا مجهز بخطوط إنتاج حديثة تضمن النظافة والجودة في كل مرحلة.'
                : 'We utilize state-of-the-art filling and packaging lines to preserve the bio-active quality of honey and its derivatives.'}
            </p>
            <p
              className={`text-sm md:text-base leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar'
                ? 'جميع منتجاتنا مطابقة للمواصفات القياسية المصرية ومعتمدة من الجهات الرقابية المختصة.'
                : 'All our products comply with Egyptian Quality Standards and are certified by regulatory authorities.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Vision & Goals ("رؤيتنا وأهدافنا") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`p-6 md:p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#221F1B] border-stone-800'
                : 'bg-white border-stone-200/90 shadow-xs'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-[#E5A812] flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-black mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {lang === 'ar'
                ? 'أن نكون الخيار الأول للمستهلك المصري والعربي في منتجات العسل الطبيعي ومشتقاته، وأن نساهم في نشر ثقافة الغذاء الصحي الطبيعي.'
                : 'To be the premier choice for Egyptian and Arab consumers in natural honey products and promote healthy organic nutrition.'}
            </p>
          </div>

          <div
            className={`p-6 md:p-8 rounded-3xl border ${
              isDark
                ? 'bg-[#221F1B] border-stone-800'
                : 'bg-white border-stone-200/90 shadow-xs'
            }`}
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-[#E5A812] flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl font-black mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {lang === 'ar' ? 'أهدافنا' : 'Our Goals'}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {lang === 'ar'
                ? 'توفير منتج طبيعي صحي مطابق للمواصفة القياسية المصرية بأسعار عادلة للمستهلك المصري والعربي، مع الالتزام بأعلى معايير الجودة.'
                : 'Delivering healthy natural products compliant with national standards at fair prices for consumers, retailers, and distributors.'}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Our Services ("خدماتنا") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <div className="text-center mb-8">
          <h2
            className={`text-2xl md:text-3xl font-black ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}
          >
            {lang === 'ar' ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p
            className={`text-sm mt-1 ${
              isDark ? 'text-stone-400' : 'text-stone-600'
            }`}
          >
            {lang === 'ar'
              ? 'نقدم مجموعة متنوعة من الخدمات لتلبية احتياجات عملائنا وتجار الجملة'
              : 'Comprehensive services tailored to consumers and B2B partners'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <Leaf className="w-6 h-6" />,
              titleAr: 'إنتاج العسل',
              titleEn: 'Honey Production',
              descAr: 'إنتاج عسل النحل الطبيعي من مناحل مصرية معتمدة',
              descEn: 'Pure honey harvested from certified Egyptian apiaries',
            },
            {
              icon: <Package className="w-6 h-6" />,
              titleAr: 'التعبئة والتغليف',
              titleEn: 'Packaging & Private Label',
              descAr:
                'تعبئة وتغليف المنتجات الطبيعية مثل التمور والطحينة والزيوت',
              descEn: 'Hygienic packaging of honey, dates, tahini, and oils',
            },
            {
              icon: <Store className="w-6 h-6" />,
              titleAr: 'عروض الجملة',
              titleEn: 'Wholesale Offers',
              descAr:
                'أسعار مخفضة لأصحاب محلات العطارة والبقالة والسوبر ماركت',
              descEn: 'Discounted rates for grocery stores and supermarkets',
            },
            {
              icon: <Truck className="w-6 h-6" />,
              titleAr: 'التوصيل',
              titleEn: 'Nationwide Delivery',
              descAr: 'توصيل المنتجات لجميع المحافظات المصرية بسرعة وأمان',
              descEn: 'Fast and safe delivery across all Egyptian governorates',
            },
          ].map((srv, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border text-center ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-white border-stone-200/90 shadow-xs'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-[#E5A812] flex items-center justify-center mx-auto mb-4">
                {srv.icon}
              </div>
              <h3
                className={`text-base font-black mb-1.5 ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {lang === 'ar' ? srv.titleAr : srv.titleEn}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                {lang === 'ar' ? srv.descAr : srv.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Golden Values Strip ("قيمنا") */}
      <section className="bg-[#E5A812] text-stone-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-8">
            {lang === 'ar' ? 'قيمنا' : 'Our Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <Award className="w-8 h-8 mx-auto" />
              <h3 className="text-lg font-black">
                {lang === 'ar' ? 'الجودة' : 'Quality'}
              </h3>
              <p className="text-xs sm:text-sm font-bold opacity-85">
                {lang === 'ar'
                  ? 'نلتزم بأعلى معايير الجودة في جميع منتجاتنا'
                  : 'Committed to the highest quality standards in every jar'}
              </p>
            </div>
            <div className="space-y-2">
              <Users className="w-8 h-8 mx-auto" />
              <h3 className="text-lg font-black">
                {lang === 'ar' ? 'الثقة' : 'Trust'}
              </h3>
              <p className="text-xs sm:text-sm font-bold opacity-85">
                {lang === 'ar'
                  ? 'نبني علاقات طويلة الأمد مع عملائنا قائمة على الثقة'
                  : 'Building long-term relationships based on transparency'}
              </p>
            </div>
            <div className="space-y-2">
              <Leaf className="w-8 h-8 mx-auto" />
              <h3 className="text-lg font-black">
                {lang === 'ar' ? 'الطبيعة' : 'Nature'}
              </h3>
              <p className="text-xs sm:text-sm font-bold opacity-85">
                {lang === 'ar'
                  ? 'نحافظ على الطبيعة ونقدم منتجات طبيعية 100%'
                  : 'Preserving nature and delivering 100% pure products'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom Inquiry CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 text-center space-y-4">
        <h2
          className={`text-2xl md:text-3xl font-black ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}
        >
          {lang === 'ar' ? 'هل لديك استفسار؟' : 'Have a Question?'}
        </h2>
        <p
          className={`text-sm ${
            isDark ? 'text-stone-400' : 'text-stone-600'
          }`}
        >
          {lang === 'ar'
            ? 'نحن هنا لمساعدتك. تواصل معنا الآن للاستفسار عن منتجاتنا أو للطلبيات الخاصة'
            : 'We are here to help. Contact us now for product inquiries or special B2B orders'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-xl bg-[#E5A812] hover:bg-[#d4990c] text-stone-950 font-black text-xs sm:text-sm"
          >
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </Link>
          <a
            href="https://wa.me/201011878508"
            target="_blank"
            rel="noreferrer"
            className={`px-6 py-3 rounded-xl border font-bold text-xs sm:text-sm inline-flex items-center gap-2 ${
              isDark
                ? 'border-stone-700 text-white hover:bg-stone-800'
                : 'border-stone-300 text-stone-800 hover:bg-stone-100'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            <span>{lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Us'}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
