import { CategorySlug, PricingTier, Product } from '../data/products';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'newest';

export interface FilterCriteria {
  searchQuery?: string;
  category?: CategorySlug;
  maxPrice?: number;
  sortBy?: SortOption;
  tier?: PricingTier;
  onlyInStock?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

/**
 * Returns the unit price of a product for the given pricing tier.
 * If tier is null/unselected, defaults to consumer price for sorting/calculation,
 * while UI can prompt the user or display the selected tier price.
 */
export function getProductPriceForTier(
  product: Product,
  tier: PricingTier
): number {
  if (tier === 'agent') return product.prices.agent;
  if (tier === 'wholesale') return product.prices.wholesale;
  return product.prices.consumer;
}

/**
 * Filters and sorts products based on search query, category, max price, stock status, and sort option.
 */
export function filterAndSortProducts(
  products: Product[],
  criteria: FilterCriteria
): Product[] {
  const {
    searchQuery = '',
    category = 'all',
    maxPrice = 8000,
    sortBy = 'default',
    tier = 'consumer',
    onlyInStock = false,
  } = criteria;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (category !== 'all' && product.category !== category) {
      return false;
    }

    if (onlyInStock && !product.inStock) {
      return false;
    }

    const effectivePrice = getProductPriceForTier(product, tier);
    if (effectivePrice > maxPrice) {
      return false;
    }

    if (normalizedQuery) {
      const matchAr = product.nameAr.toLowerCase().includes(normalizedQuery);
      const matchEn = product.nameEn.toLowerCase().includes(normalizedQuery);
      const matchCatAr = product.categoryNameAr
        .toLowerCase()
        .includes(normalizedQuery);
      const matchDescAr = product.descriptionAr
        .toLowerCase()
        .includes(normalizedQuery);
      if (!matchAr && !matchEn && !matchCatAr && !matchDescAr) {
        return false;
      }
    }

    return true;
  });

  if (sortBy === 'price-asc') {
    return [...filtered].sort(
      (a, b) =>
        getProductPriceForTier(a, tier) - getProductPriceForTier(b, tier)
    );
  }

  if (sortBy === 'price-desc') {
    return [...filtered].sort(
      (a, b) =>
        getProductPriceForTier(b, tier) - getProductPriceForTier(a, tier)
    );
  }

  if (sortBy === 'newest') {
    return [...filtered].sort((a, b) => {
      const aNew = a.badgeAr === 'جديد' ? 1 : 0;
      const bNew = b.badgeAr === 'جديد' ? 1 : 0;
      return bNew - aNew;
    });
  }

  return filtered;
}

/**
 * Calculates cart totals including subtotal, shipping fee (free above 500 EGP or if any item has freeShipping), and grand total.
 */
export function calculateCartSummary(
  items: CartItem[],
  products: Product[],
  tier: PricingTier
): {
  subtotal: number;
  shipping: number;
  total: number;
  totalCount: number;
  qualifiesForFreeShipping: boolean;
} {
  let subtotal = 0;
  let totalCount = 0;
  let hasFreeShippingItem = false;

  for (const item of items) {
    if (item.quantity <= 0) continue;
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    const unitPrice = getProductPriceForTier(product, tier);
    subtotal += unitPrice * item.quantity;
    totalCount += item.quantity;
    if (product.freeShipping) {
      hasFreeShippingItem = true;
    }
  }

  const qualifiesForFreeShipping =
    subtotal >= 500 || hasFreeShippingItem || subtotal === 0;
  const shipping = qualifiesForFreeShipping ? 0 : 45;

  return {
    subtotal,
    shipping,
    total: subtotal + shipping,
    totalCount,
    qualifiesForFreeShipping,
  };
}
