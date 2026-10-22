import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Shield, RotateCcw, Truck, FileCheck, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { TierSelector } from '../components/TierSelector';

export const PolicyAndAccountPage: React.FC<{ mode: 'policy' | 'account' }> = ({
  mode,
}) => {
  const { policySlug } = useParams<{ policySlug?: string }>();
  const { theme, lang, wishlist } = useStore();
  const isDark = theme === 'dark';

  if (mode === 'account') {
    const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12">
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-black ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}
          >
            {lang === 'ar'
              ? 'حسابي وبوابة الأسعار والمفضلة'
              : 'My Account, Pricing Tier & Wishlist'}
          </h1>
          <p
            className={`text-sm mt-1 ${
              isDark ? 'text-stone-400' : 'text-stone-600'
            }`}
          >
            {lang === 'ar'
              ? 'تحكم في شريحتك السعرية (مستهلك / تجار الجملة / الوكلاء) وتصفح منتجاتك المفضلة'
              : 'Manage your active pricing tier and saved wishlist products'}
          </p>
        </div>

        <div
          className={`p-6 md:p-8 rounded-3xl border ${
            isDark
              ? 'bg-[#221F1B] border-stone-800'
              : 'bg-white border-stone-200 shadow-xs'
          }`}
        >
          <TierSelector />
        </div>

        <div>
          <h2
            className={`text-xl font-black mb-5 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}
          >
            <Heart className="w-5 h-5 text-rose-500" />
            <span>
              {lang === 'ar' ? 'قائمة المفضلة' : 'Saved Wishlist'} (
              {wishlistedProducts.length})
            </span>
          </h2>

          {wishlistedProducts.length === 0 ? (
            <div
              className={`p-10 rounded-3xl border text-center ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800 text-stone-300'
                  : 'bg-white border-stone-200 text-stone-600'
              }`}
            >
              <p className="text-sm font-bold mb-4">
                {lang === 'ar'
                  ? 'لم تقم بإضافة منتجات إلى المفضلة بعد.'
                  : 'You have not added any products to your wishlist yet.'}
              </p>
              <Link
                to="/shop"
                className="inline-block px-6 py-2.5 rounded-xl bg-[#E5A812] text-stone-950 font-black text-xs"
              >
                {lang === 'ar' ? 'تصفح المتجر' : 'Browse Shop'}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {wishlistedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  const policies: Record<
    string,
    {
      titleAr: string;
      titleEn: string;
      icon: React.ReactNode;
      sectionsAr: { h: string; p: string }[];
      sectionsEn: { h: string; p: string }[];
    }
  > = {
    privacy: {
      titleAr: 'سياسة الخصوصية',
      titleEn: 'Privacy Policy',
      icon: <Shield className="w-6 h-6 text-[#E5A812]" />,
      sectionsAr: [
        {
          h: 'حماية بيانات العملاء والتجار',
          p: 'تلتزم شركة نهل للتجارة بحماية كافة البيانات الشخصية والتجارية الخاصة بعملائنا الكرام وتجار الجملة والوكلاء، ولا يتم مشاركتها مع أي طرف ثالث إلا لغرض توصيل الشحنات.',
        },
        {
          h: 'البيانات التي نجمعها',
          p: 'نجمع فقط البيانات اللازمة لتجهيز وشحن الطلبات مثل الاسم ورقم الهاتف والعنوان ونوع الشريحة السعرية لتقديم أفضل العروض.',
        },
      ],
      sectionsEn: [
        {
          h: 'Customer & B2B Data Protection',
          p: 'Nahl Trading Co. is committed to protecting all personal and commercial data of our customers, wholesalers, and agents.',
        },
        {
          h: 'Information We Collect',
          p: 'We only collect information required for order fulfillment and shipping, such as name, phone number, and delivery address.',
        },
      ],
    },
    returns: {
      titleAr: 'سياسة الإرجاع والاستبدال',
      titleEn: 'Return & Refund Policy',
      icon: <RotateCcw className="w-6 h-6 text-[#E5A812]" />,
      sectionsAr: [
        {
          h: 'ضمان الجودة والاسترجاع المجاني',
          p: 'جميع منتجات عسل نهل مضمونة 100% ومفحوصة معملياً. يحق للعميل معاينة الطلب عند الاستلام واسترجاع أو استبدال أي منتج خلال 14 يوماً في حال وجود أي ملاحظة على الجودة أو التغليف.',
        },
        {
          h: 'إجراءات الاسترجاع السريع',
          p: 'تواصل مع خدمة العملاء على رقم 01011878508 وسيتم إرسال مندوب للاستبدال أو رد المبلغ بالكامل دون أي رسوم إضافية.',
        },
      ],
      sectionsEn: [
        {
          h: '100% Quality Guarantee & Free Returns',
          p: 'All Nahl Honey products are lab-certified. Customers may inspect orders upon delivery and return or exchange within 14 days.',
        },
        {
          h: 'Fast Return Process',
          p: 'Contact customer support at 01011878508 for immediate replacement or full refund.',
        },
      ],
    },
    shipping: {
      titleAr: 'سياسة الشحن والتوصيل',
      titleEn: 'Shipping & Delivery Policy',
      icon: <Truck className="w-6 h-6 text-[#E5A812]" />,
      sectionsAr: [
        {
          h: 'التوصيل لجميع محافظات مصر',
          p: 'نقوم بتوصيل طلبات المستهلكين وتوريدات الجملة والجراكن لجميع المحافظات المصرية خلال 24 إلى 72 ساعة عمل في عبوات محكمة الغلق ومؤمنة ضد الكسر.',
        },
        {
          h: 'الشحن المجاني',
          p: 'شحن مجاني بالكامل للطلبات فوق 500 جنيه مصري وكذلك على جراكن وجرادل المنتجات السايبة المختارة.',
        },
      ],
      sectionsEn: [
        {
          h: 'Nationwide Delivery Across Egypt',
          p: 'We deliver consumer and wholesale bulk orders across all Egyptian governorates within 24–72 business hours.',
        },
        {
          h: 'Free Shipping Threshold',
          p: 'Free shipping on all orders above 500 EGP and on selected bulk jerrycans and buckets.',
        },
      ],
    },
    terms: {
      titleAr: 'الشروط والأحكام',
      titleEn: 'Terms & Conditions',
      icon: <FileCheck className="w-6 h-6 text-[#E5A812]" />,
      sectionsAr: [
        {
          h: 'المواصفات القياسية المصرية',
          p: 'تخضع كافة منتجات شركة نهل للتجارة للمواصفات القياسية المصرية الخاصة بعسل النحل الخام ومشتقاته والزيوت الطبيعية والطحينة.',
        },
        {
          h: 'شرائح الأسعار (المستهلك / الجملة / الوكلاء)',
          p: 'تُطبق أسعار الجملة والوكلاء وفقاً للكميات المعتمدة لدى إدارة المبيعات (01118831877)، بينما تتاح أسعار المستهلك للطلبات الفردية والمنزلية بدون حد أدنى.',
        },
      ],
      sectionsEn: [
        {
          h: 'Egyptian Quality Standards',
          p: 'All Nahl Trading products strictly adhere to Egyptian Quality Standards for raw bee honey, natural oils, and pure tahini.',
        },
        {
          h: 'Pricing Tiers (Consumer / Wholesale / Agents)',
          p: 'Wholesale and Agent rates apply to commercial orders, while Consumer rates are available with no minimum order quantity.',
        },
      ],
    },
  };

  const activePolicy = policies[policySlug || 'privacy'] || policies.privacy;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { slug: 'privacy', ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
          { slug: 'returns', ar: 'سياسة الإرجاع', en: 'Return Policy' },
          { slug: 'shipping', ar: 'سياسة الشحن', en: 'Shipping Policy' },
          { slug: 'terms', ar: 'الشروط والأحكام', en: 'Terms & Conditions' },
        ].map((tab) => (
          <Link
            key={tab.slug}
            to={`/policy/${tab.slug}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              (policySlug || 'privacy') === tab.slug
                ? 'bg-[#E5A812] text-stone-950'
                : isDark
                ? 'bg-[#221F1B] text-stone-300 hover:bg-stone-800'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {lang === 'ar' ? tab.ar : tab.en}
          </Link>
        ))}
      </div>

      <div
        className={`p-6 sm:p-10 rounded-3xl border space-y-6 ${
          isDark
            ? 'bg-[#221F1B] border-stone-800 text-white'
            : 'bg-white border-stone-200 text-stone-900 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
          {activePolicy.icon}
          <h1 className="text-2xl sm:text-3xl font-black">
            {lang === 'ar' ? activePolicy.titleAr : activePolicy.titleEn}
          </h1>
        </div>

        <div className="space-y-6">
          {(lang === 'ar'
            ? activePolicy.sectionsAr
            : activePolicy.sectionsEn
          ).map((sec, i) => (
            <div key={i} className="space-y-2">
              <h2 className="text-lg font-extrabold text-amber-500">
                {sec.h}
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-stone-300' : 'text-stone-700'
                }`}
              >
                {sec.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
