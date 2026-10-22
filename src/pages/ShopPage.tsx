import React, { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutGrid,
  List,
  RotateCcw,
  Filter,
  SlidersHorizontal,
  PackageCheck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, CategorySlug, PRODUCTS } from '../data/products';
import { filterAndSortProducts, SortOption } from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';
import { TierSelector } from '../components/TierSelector';

export const ShopPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { theme, lang, selectedTier } = useStore();
  const isDark = theme === 'dark';

  const activeCategory: CategorySlug =
    categorySlug &&
    CATEGORIES.some((c) => c.slug === categorySlug)
      ? (categorySlug as CategorySlug)
      : 'all';

  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(7563);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleCategorySelect = (slug: CategorySlug) => {
    if (slug === 'all') {
      navigate('/shop');
    } else {
      navigate(`/category/${slug}`);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setMaxPrice(7563);
    setSortBy('default');
    setOnlyInStock(false);
    setSearchParams({});
    if (categorySlug) {
      navigate('/shop');
    }
  };

  const filteredProducts = filterAndSortProducts(PRODUCTS, {
    searchQuery,
    category: activeCategory,
    maxPrice,
    sortBy,
    tier: selectedTier,
    onlyInStock,
  });

  const activeCategoryInfo = CATEGORIES.find((c) => c.slug === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb & Page Title */}
      <div className="mb-8">
        <nav
          aria-label="Breadcrumb"
          className={`flex items-center gap-2 text-xs font-bold mb-2 ${
            isDark ? 'text-stone-400' : 'text-stone-600'
          }`}
        >
          <Link to="/" className="hover:text-amber-500">
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-amber-500">
            {lang === 'ar' ? 'المتجر' : 'Shop'}
          </Link>
          {activeCategoryInfo && (
            <>
              <span>/</span>
              <span className="text-amber-500">
                {lang === 'ar'
                  ? activeCategoryInfo.nameAr
                  : activeCategoryInfo.nameEn}
              </span>
            </>
          )}
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1
              className={`text-2xl md:text-4xl font-black ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}
            >
              {activeCategoryInfo
                ? lang === 'ar'
                  ? activeCategoryInfo.nameAr
                  : activeCategoryInfo.nameEn
                : lang === 'ar'
                ? 'المتجر'
                : 'Full Store Catalog'}
            </h1>
            <p
              className={`text-sm mt-1 ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}
            >
              {activeCategoryInfo
                ? lang === 'ar'
                  ? activeCategoryInfo.descriptionAr
                  : activeCategoryInfo.descriptionEn
                : lang === 'ar'
                ? 'تصفح جميع منتجاتنا الطبيعية من العسل ومشتقاته والطحينة والزيوت والتمور'
                : 'Browse all our natural honey, derivatives, pure tahini, cold-pressed oils, and dates'}
            </p>
          </div>

          {/* Compact Tier Selector Bar */}
          <div className="w-full md:w-auto md:min-w-[440px]">
            <TierSelector compact />
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters (Right side in RTL, 3 columns) */}
        <aside
          className={`lg:col-span-3 rounded-2xl border p-5 space-y-6 lg:sticky lg:top-28 ${
            isDark
              ? 'bg-[#221F1B] border-stone-800 text-white'
              : 'bg-white border-stone-200/90 text-stone-900 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2 font-black text-base">
              <Filter className="w-4 h-4 text-amber-500" />
              <h2>{lang === 'ar' ? 'تصفية المنتجات' : 'Filter Products'}</h2>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{lang === 'ar' ? 'إعادة ضبط' : 'Reset'}</span>
            </button>
          </div>

          {/* Search Input */}
          <div>
            <label
              htmlFor="shop-search-input"
              className={`block text-xs font-bold mb-2 ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar' ? 'البحث' : 'Search'}
            </label>
            <div className="relative">
              <input
                id="shop-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'ar' ? 'ابحث عن منتج...' : 'Search product name...'
                }
                className={`w-full py-2 pr-3 pl-9 rounded-xl border text-xs font-medium focus:outline-none ${
                  isDark
                    ? 'bg-[#181512] border-stone-700 text-white placeholder-stone-500 focus:border-amber-400'
                    : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-500 focus:bg-white focus:border-amber-600'
                }`}
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Filter Pills (functional interactive buttons) */}
          <div>
            <span
              className={`block text-xs font-bold mb-2.5 ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar' ? 'التصنيف' : 'Category'}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#E5A812] text-stone-950 shadow-xs'
                    : isDark
                    ? 'bg-[#181512] text-stone-300 hover:bg-stone-800 border border-stone-800'
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200/80 border border-stone-200'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All'} ({PRODUCTS.length})
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeCategory === cat.slug
                      ? 'bg-[#E5A812] text-stone-950 shadow-xs'
                      : isDark
                      ? 'bg-[#181512] text-stone-300 hover:bg-stone-800 border border-stone-800'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {lang === 'ar' ? cat.nameAr : cat.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <label
                htmlFor="price-range-slider"
                className={isDark ? 'text-stone-300' : 'text-stone-700'}
              >
                {lang === 'ar' ? 'السعر الأقصى' : 'Max Price'}
              </label>
              <span className="text-amber-500 font-extrabold tabular-nums">
                {maxPrice.toLocaleString('en-US')}{' '}
                {lang === 'ar' ? 'جنيه' : 'EGP'}
              </span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min={50}
              max={7563}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#E5A812] cursor-pointer"
            />
            <div
              className={`flex justify-between text-[11px] mt-1 tabular-nums ${
                isDark ? 'text-stone-400' : 'text-stone-500'
              }`}
            >
              <span>0 {lang === 'ar' ? 'جنيه' : 'EGP'}</span>
              <span>7563 {lang === 'ar' ? 'جنيه' : 'EGP'}</span>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <span
              className={`block text-xs font-bold mb-2.5 ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}
            >
              {lang === 'ar' ? 'الترتيب' : 'Sort By'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  id: 'default' as SortOption,
                  labelAr: 'الافتراضي',
                  labelEn: 'Default',
                },
                {
                  id: 'price-asc' as SortOption,
                  labelAr: 'الأقل سعراً',
                  labelEn: 'Lowest Price',
                },
                {
                  id: 'price-desc' as SortOption,
                  labelAr: 'الأعلى سعراً',
                  labelEn: 'Highest Price',
                },
                {
                  id: 'newest' as SortOption,
                  labelAr: 'الأحدث',
                  labelEn: 'Newest',
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSortBy(opt.id)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    sortBy === opt.id
                      ? 'bg-[#E5A812] text-stone-950 shadow-xs'
                      : isDark
                      ? 'bg-[#181512] text-stone-300 hover:bg-stone-800 border border-stone-800'
                      : 'bg-stone-100 text-stone-800 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {lang === 'ar' ? opt.labelAr : opt.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Availability Toggle */}
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-amber-500" />
                {lang === 'ar' ? 'المتوفر فقط بالمخزون' : 'In-Stock Only'}
              </span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 accent-[#E5A812] rounded cursor-pointer"
              />
            </label>
          </div>
        </aside>

        {/* Product Catalog Grid (9 columns) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Toolbar */}
          <div
            className={`flex flex-wrap items-center justify-between gap-4 px-4 py-3 rounded-2xl border ${
              isDark
                ? 'bg-[#221F1B] border-stone-800'
                : 'bg-white border-stone-200/90 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2 text-xs md:text-sm font-bold">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>
                {lang === 'ar'
                  ? `عرض ${filteredProducts.length} منتج`
                  : `Showing ${filteredProducts.length} products`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label={lang === 'ar' ? 'عرض شبكي' : 'Grid view'}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#E5A812] text-stone-950'
                    : isDark
                    ? 'bg-[#181512] text-stone-400 hover:text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-label={lang === 'ar' ? 'عرض قائمة' : 'List view'}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#E5A812] text-stone-950'
                    : isDark
                    ? 'bg-[#181512] text-stone-400 hover:text-white'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <div
              className={`rounded-3xl border p-12 text-center ${
                isDark
                  ? 'bg-[#221F1B] border-stone-800'
                  : 'bg-white border-stone-200'
              }`}
            >
              <p className="text-lg font-extrabold mb-2">
                {lang === 'ar'
                  ? 'لا توجد منتجات مطابقة لمعايير البحث'
                  : 'No products match your filter criteria'}
              </p>
              <p
                className={`text-xs mb-6 ${
                  isDark ? 'text-stone-400' : 'text-stone-500'
                }`}
              >
                {lang === 'ar'
                  ? 'جرّب تغيير التصنيف أو زيادة الحد الأقصى للسعر.'
                  : 'Try changing the category or increasing the maximum price.'}
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#E5A812] text-stone-950 font-extrabold text-xs cursor-pointer"
              >
                {lang === 'ar' ? 'عرض جميع المنتجات' : 'Show All Products'}
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="list"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
