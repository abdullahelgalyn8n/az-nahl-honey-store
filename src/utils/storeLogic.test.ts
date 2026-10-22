import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import {
  getProductPriceForTier,
  filterAndSortProducts,
  calculateCartSummary,
} from './storeLogic';

test('getProductPriceForTier returns correct price per tier', () => {
  const sesameOil = PRODUCTS.find(
    (p) => p.slug === '15-kg-jerrycan-of-sesame-oil'
  )!;
  assert.ok(sesameOil, 'Sesame oil product should exist');
  assert.equal(getProductPriceForTier(sesameOil, 'consumer'), 4200);
  assert.equal(getProductPriceForTier(sesameOil, 'wholesale'), 3850);
  assert.equal(getProductPriceForTier(sesameOil, 'agent'), 3550);
  assert.equal(getProductPriceForTier(sesameOil, null), 4200);
});

test('filterAndSortProducts filters by category and search query', () => {
  const datesOnly = filterAndSortProducts(PRODUCTS, { category: 'dates' });
  assert.ok(datesOnly.length >= 4, 'Should have at least 4 dates products');
  assert.ok(datesOnly.every((p) => p.category === 'dates'));

  const searchSesame = filterAndSortProducts(PRODUCTS, {
    searchQuery: 'سمسم',
  });
  assert.ok(searchSesame.length >= 4);
});

test('filterAndSortProducts sorts ascending and descending accurately', () => {
  const sortedAsc = filterAndSortProducts(PRODUCTS, {
    category: 'dates',
    sortBy: 'price-asc',
    tier: 'consumer',
  });
  for (let i = 1; i < sortedAsc.length; i++) {
    assert.ok(sortedAsc[i].prices.consumer >= sortedAsc[i - 1].prices.consumer);
  }

  const sortedDesc = filterAndSortProducts(PRODUCTS, {
    category: 'dates',
    sortBy: 'price-desc',
    tier: 'consumer',
  });
  for (let i = 1; i < sortedDesc.length; i++) {
    assert.ok(
      sortedDesc[i].prices.consumer <= sortedDesc[i - 1].prices.consumer
    );
  }
});

test('calculateCartSummary computes subtotal and free shipping over 500 EGP', () => {
  const smallHoney = PRODUCTS.find((p) => p.slug === 'clover-flower-honey-200g')!;
  // 1 bottle at consumer price (60 EGP) -> shipping should be 45 EGP
  const summary1 = calculateCartSummary(
    [{ productId: smallHoney.id, quantity: 1 }],
    PRODUCTS,
    'consumer'
  );
  assert.equal(summary1.subtotal, 60);
  assert.equal(summary1.shipping, 45);
  assert.equal(summary1.total, 105);
  assert.equal(summary1.qualifiesForFreeShipping, false);

  // 10 bottles at consumer price (600 EGP) -> qualifies for free shipping
  const summary2 = calculateCartSummary(
    [{ productId: smallHoney.id, quantity: 10 }],
    PRODUCTS,
    'consumer'
  );
  assert.equal(summary2.subtotal, 600);
  assert.equal(summary2.shipping, 0);
  assert.equal(summary2.total, 600);
  assert.equal(summary2.qualifiesForFreeShipping, true);
});
