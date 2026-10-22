import React from 'react';
import { Building2, UserCheck, Truck, CheckCircle2 } from 'lucide-react';
import { PricingTier } from '../data/products';
import { useStore } from '../context/StoreContext';

interface TierSelectorProps {
  compact?: boolean;
  className?: string;
}

export const TierSelector: React.FC<TierSelectorProps> = ({
  compact = false,
  className = '',
}) => {
  const { selectedTier, setSelectedTier, theme, lang } = useStore();
  const isDark = theme === 'dark';

  const tiers: {
    id: Exclude<PricingTier, null>;
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    discountBadgeAr: string;
    discountBadgeEn: string;
    icon: React.ReactNode;
    accentColor: string;
  }[] = [
    {
      id: 'agent',
      titleAr: 'أسعار الوكلاء والموزعين',
      titleEn: 'Agents & Distributors',
      subtitleAr: 'للطلبيات الكبيرة والتوريدات والوكلاء المعتمدين',
      subtitleEn: 'For bulk supply orders and authorized distributors',
      discountBadgeAr: 'خصم حتى 22%',
      discountBadgeEn: 'Up to 22% Off',
      icon: <Building2 className="w-5 h-5" />,
      accentColor: 'from-amber-500 to-yellow-600',
    },
    {
      id: 'consumer',
      titleAr: 'أسعار المستهلك',
      titleEn: 'Consumer Prices',
      subtitleAr: 'للأفراد والعائلات والطلبات المنزلية المباشرة',
      subtitleEn: 'For individuals, families, and home orders',
      discountBadgeAr: 'سعر التجزئة الرسمي',
      discountBadgeEn: 'Standard Retail',
      icon: <UserCheck className="w-5 h-5" />,
      accentColor: 'from-orange-500 to-amber-500',
    },
    {
      id: 'wholesale',
      titleAr: 'أسعار تجار الجملة والتجزئة',
      titleEn: 'Wholesale & Retailers',
      subtitleAr: 'لأصحاب محلات العطارة والبقالة والسوبر ماركت',
      subtitleEn: 'For grocery stores, supermarkets, and spice shops',
      discountBadgeAr: 'خصم حتى 15%',
      discountBadgeEn: 'Up to 15% Off',
      icon: <Truck className="w-5 h-5" />,
      accentColor: 'from-orange-600 to-amber-600',
    },
  ];

  if (compact) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier.id)}
              className={`relative flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? isDark
                    ? 'bg-amber-500/15 border-amber-400 text-amber-300 shadow-sm'
                    : 'bg-amber-50 border-amber-600 text-stone-900 shadow-sm ring-1 ring-amber-600/30'
                  : isDark
                  ? 'bg-[#221F1B] border-stone-800 text-stone-300 hover:border-stone-700'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-amber-400 hover:bg-stone-50/70'
              }`}
            >
              {isSelected && (
                <span className="absolute top-2 left-2 text-amber-500">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              )}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white bg-gradient-to-br ${tier.accentColor} shadow-sm`}
              >
                {tier.icon}
              </div>
              <span className="text-xs font-bold leading-snug">
                {lang === 'ar' ? tier.titleAr : tier.titleEn}
              </span>
              <span
                className={`mt-1 text-[11px] font-medium ${
                  isSelected
                    ? isDark
                      ? 'text-amber-400'
                      : 'text-amber-800'
                    : isDark
                    ? 'text-stone-400'
                    : 'text-stone-500'
                }`}
              >
                {lang === 'ar' ? tier.discountBadgeAr : tier.discountBadgeEn}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-center mb-5">
        <h2
          className={`text-xl md:text-2xl font-extrabold ${
            isDark ? 'text-white' : 'text-stone-900'
          }`}
        >
          {lang === 'ar' ? 'حدد شريحتك السعرية' : 'Select Your Pricing Tier'}
        </h2>
        <p
          className={`text-sm mt-1 ${
            isDark ? 'text-stone-400' : 'text-stone-600'
          }`}
        >
          {lang === 'ar'
            ? 'اختر الفئة المناسبة لك لعرض الأسعار المخصصة لطلباتك في جميع أقسام المتجر'
            : 'Choose your customer category to view tailored prices across the entire catalog'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {tiers.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier.id)}
              className={`group relative flex flex-col items-center p-5 rounded-2xl border transition-all cursor-pointer text-center ${
                isSelected
                  ? isDark
                    ? 'bg-gradient-to-b from-amber-500/20 to-[#221F1B] border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-gradient-to-b from-amber-50/90 to-white border-amber-600 shadow-md ring-2 ring-amber-500/20'
                  : isDark
                  ? 'bg-[#221F1B] border-stone-800 hover:border-amber-500/50 hover:bg-[#28241F]'
                  : 'bg-white border-stone-200/90 hover:border-amber-500 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div
                  className={`absolute top-3 left-3 flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md ${
                    isDark
                      ? 'bg-amber-400/20 text-amber-300'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'مفعّل' : 'Active'}</span>
                </div>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-white bg-gradient-to-br ${tier.accentColor} shadow-md group-hover:scale-105 transition-transform`}
              >
                {tier.icon}
              </div>

              <h3
                className={`text-base font-bold ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}
              >
                {lang === 'ar' ? tier.titleAr : tier.titleEn}
              </h3>

              <p
                className={`text-xs mt-1 leading-relaxed ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}
              >
                {lang === 'ar' ? tier.subtitleAr : tier.subtitleEn}
              </p>

              <span
                className={`mt-3 text-xs font-bold underline underline-offset-4 ${
                  isSelected
                    ? isDark
                      ? 'text-amber-400'
                      : 'text-amber-700'
                    : isDark
                    ? 'text-stone-400 group-hover:text-amber-400'
                    : 'text-stone-700 group-hover:text-amber-700'
                }`}
              >
                {lang === 'ar' ? tier.discountBadgeAr : tier.discountBadgeEn}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={() =>
            setSelectedTier(selectedTier === null ? 'consumer' : null)
          }
          className={`text-xs underline transition-colors cursor-pointer ${
            isDark
              ? 'text-stone-400 hover:text-amber-400'
              : 'text-stone-600 hover:text-amber-800'
          }`}
        >
          {selectedTier === null
            ? lang === 'ar'
              ? 'إظهار أسعار المستهلك الافتراضية'
              : 'Show default consumer prices'
            : lang === 'ar'
            ? 'إخفاء الأسعار المؤقتة (وضع الاستعلام)'
            : 'Hide prices (Inquiry mode)'}
        </button>
      </div>
    </div>
  );
};
